import { db } from "@/adapter";
import type { Context } from "@/context";
import { userTable } from "@/db/schemas/auth";
import { postsTable } from "@/db/schemas/posts";
import { postsUpvoteTable } from "@/db/schemas/upvotes";
import { getISOFormatDateQuery } from "@/lib/utils";
import { loggedIn } from "@/middleware/loggenIn";
import {
  createPostSchema,
  paginationSchema,
  type PaginatedResponse,
  type Post,
  type SuccessResponse,
} from "@/shared/types";
import { zValidator } from "@hono/zod-validator";
import { asc, countDistinct, desc, eq, and, sql } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

export const postRouter = new Hono<Context>()
  .post("/", loggedIn, zValidator("form", createPostSchema), async (c) => {
    const { title, url, content } = c.req.valid("form");
    const user = c.get("user")!;

    const [post] = await db
      .insert(postsTable)
      .values({
        title,
        content,
        url,
        userId: user.id,
      })
      .returning({ id: postsTable.id });

    return c.json<SuccessResponse<{ postId: number }>>(
      {
        success: true,
        message: "Post created",
        data: { postId: post!.id },
      },
      201,
    );
  })
  .get("/", zValidator("query", paginationSchema), async (c) => {
    const { limit, page, sortBy, order, author, site } = c.req.valid("query");
    const user = c.get("user");

    const offset = (page - 1) * limit;

    const sortByColumn =
      sortBy === "points" ? postsTable.points : postsTable.createdAt;
    const sortOrder = order === "desc" ? desc(sortByColumn) : asc(sortByColumn);

    const [count] = await db
      .select({ count: countDistinct(postsTable.id) })
      .from(postsTable)
      .where(
        and(
          author ? eq(postsTable.userId, author) : undefined,
          site ? eq(postsTable.url, site) : undefined,
        ),
      );

    const postQuery = db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        url: postsTable.url,
        points: postsTable.points,
        createdAt: getISOFormatDateQuery(postsTable.createdAt),
        commentCount: postsTable.commentCount,
        author: {
          username: userTable.username,
          id: userTable.id,
        },
        isUpvoted: user
          ? sql<boolean>`CASE WHEN ${postsUpvoteTable.userId} IS NOT NULL THEN true ELSE false END`
          : sql<boolean>`false`,
      })
      .from(postsTable)
      .leftJoin(userTable, eq(postsTable.userId, userTable.id))
      .orderBy(sortOrder)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          author ? eq(postsTable.userId, author) : undefined,
          site ? eq(postsTable.url, site) : undefined,
        ),
      );

    if (user) {
      postQuery.leftJoin(
        postsUpvoteTable,
        and(
          eq(postsUpvoteTable.postId, postsTable.id),
          eq(postsUpvoteTable.userId, user.id),
        ),
      );
    }

    const posts = await postQuery;

    return c.json<PaginatedResponse<Post[]>>(
      {
        data: posts as Post[],
        success: true,
        message: "Posts fetched",
        pagination: {
          page: page,
          totalPages: Math.ceil(count!.count / limit) as number,
        },
      },
      200,
    );
  })
  .post(
    "/:id/upvote",
    loggedIn,
    zValidator("param", z.object({ id: z.number({ coerce: true }) })),
    async (c) => {
      const { id } = c.req.valid("param");
      const user = c.get("user")!;
      let pointsChange: -1 | 1 = 1;

      const points = await db.transaction(async (tx) => {
        // check if already upvoted
        const [existingUpvote] = await tx
          .select()
          .from(postsUpvoteTable)
          .where(
            and(
              eq(postsUpvoteTable.postId, id),
              eq(postsUpvoteTable.userId, user.id),
            ),
          )
          .limit(1);

        pointsChange = existingUpvote ? -1 : 1;

        // update the post
        const [updated] = await tx
          .update(postsTable)
          .set({ points: sql`${postsTable.points} + ${pointsChange}` })
          .where(eq(postsTable.id, id))
          .returning({ points: postsTable.points });

        if (!updated) {
          throw new HTTPException(404, { message: "Post not found" });
        }

        if (existingUpvote) {
          await tx
            .delete(postsUpvoteTable)
            .where(eq(postsUpvoteTable.id, existingUpvote.id));
        } else {
          await tx
            .insert(postsUpvoteTable)
            .values({ postId: id, userId: user.id });
        }

        return updated.points;
      });

      return c.json<SuccessResponse<{ count: number; isUpvoted: boolean }>>(
        {
          success: true,
          message: "Post updated",
          data: { count: points, isUpvoted: pointsChange > 0 },
        },
        200,
      );
    },
  );
