import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { postsTable } from "./posts";
import { commentsTable } from "./comments";
import { commentsUpvoteTable, postsUpvoteTable } from "./upvotes";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
});

export const userRelations = relations(userTable, ({ many }) => ({
  posts: many(postsTable, { relationName: "author" }),
  comments: many(commentsTable, { relationName: "author" }),
  postUpvotes: many(postsUpvoteTable, {
    relationName: "postUpvotes",
  }),
  commentUpvotes: many(commentsUpvoteTable, {
    relationName: "commentUpvotes",
  }),
}));
export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
