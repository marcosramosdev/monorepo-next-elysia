import { relations } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { sessions } from "./sessionsSchema";
import { accounts } from "./accountsSchema";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));
