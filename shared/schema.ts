import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const feedback = pgTable("feedback", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  feature: text("feature").notNull(),
  comments: text("comments").notNull(),
  status: text("status").notNull().default("New"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  timestamp: true,
  status: true,
});

export const updateFeedbackSchema = z.object({
  status: z.enum(["New", "Reviewed", "Accepted", "Rejected"]),
});

export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type UpdateFeedback = z.infer<typeof updateFeedbackSchema>;
export type Feedback = typeof feedback.$inferSelect;
