import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "src/users/schema";

// * generate this `posts` to sql script
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: text('content'),
  published: boolean('published').default(false),
  timestamp: timestamp('timestamp').defaultNow(),
  userId: integer('user_id').references(() => users.id),
});

// * relations
// * use for easy access, it don't use it, database is still correct
// * for accessing
export const postRelations = relations(posts, ({ one }) => ({
  /**
   * varible: one(schema, {
   *   fields: [mainSchema field],
   *   references: [from forign table]
   * })
   */
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));