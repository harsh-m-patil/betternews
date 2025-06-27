import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { postsTable } from "./posts";
import { relations } from "drizzle-orm";
import { userTable } from "./auth";
import { commentsTable } from "./comments";

export const postsUpvoteTable = pgTable("post_upvotes", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const postsUpvoteRelations = relations(postsUpvoteTable, ({ one }) => ({
  post: one(postsTable, {
    fields: [postsUpvoteTable.postId],
    references: [postsTable.id],
    relationName: "postUpvotes",
  }),
  user: one(userTable, {
    fields: [postsUpvoteTable.userId],
    references: [userTable.id],
    relationName: "user",
  }),
}));

export const commentsUpvoteTable = pgTable("comment_upvotes", {
  id: serial("id").primaryKey(),
  commentId: integer("comment_id").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const commentsUpvoteRelations = relations(
  commentsUpvoteTable,
  ({ one }) => ({
    post: one(commentsTable, {
      fields: [commentsUpvoteTable.commentId],
      references: [commentsTable.id],
      relationName: "commentUpvotes",
    }),
    user: one(userTable, {
      fields: [commentsUpvoteTable.userId],
      references: [userTable.id],
      relationName: "user",
    }),
  }),
);
