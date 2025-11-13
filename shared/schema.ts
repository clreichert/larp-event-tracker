import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
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

export const parties = pgTable("parties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
});

export const insertPartySchema = createInsertSchema(parties).omit({
  id: true,
});

export type InsertParty = z.infer<typeof insertPartySchema>;
export type Party = typeof parties.$inferSelect;

export const encounters = pgTable("encounters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  partyId: varchar("party_id").notNull(),
  name: text("name").notNull(),
  time: text("time"),
  location: text("location"),
  activity: text("activity"),
  item: text("item"),
  completed: boolean("completed").notNull().default(false),
  notes: text("notes").default(""),
});

export const insertEncounterSchema = createInsertSchema(encounters).omit({
  id: true,
});

export const updateEncounterSchema = z.object({
  completed: z.boolean().optional(),
  notes: z.string().optional(),
});

export type InsertEncounter = z.infer<typeof insertEncounterSchema>;
export type UpdateEncounter = z.infer<typeof updateEncounterSchema>;
export type Encounter = typeof encounters.$inferSelect;

export const combatEncounters = pgTable("combat_encounters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(),
});

export const insertCombatEncounterSchema = createInsertSchema(combatEncounters).omit({
  id: true,
});

export type InsertCombatEncounter = z.infer<typeof insertCombatEncounterSchema>;
export type CombatEncounter = typeof combatEncounters.$inferSelect;

export const combatCheckins = pgTable("combat_checkins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  combatId: varchar("combat_id").notNull(),
  partyId: varchar("party_id").notNull(),
  encountered: boolean("encountered").notNull().default(false),
  notes: text("notes").default(""),
});

export const insertCombatCheckinSchema = createInsertSchema(combatCheckins).omit({
  id: true,
});

export const updateCombatCheckinSchema = z.object({
  encountered: z.boolean().optional(),
  notes: z.string().optional(),
});

export type InsertCombatCheckin = z.infer<typeof insertCombatCheckinSchema>;
export type UpdateCombatCheckin = z.infer<typeof updateCombatCheckinSchema>;
export type CombatCheckin = typeof combatCheckins.$inferSelect;

export const issues = pgTable("issues", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  party: text("party").notNull(),
  job: text("job").notNull(),
  type: text("type").notNull(),
  priority: text("priority").notNull(),
  status: text("status").notNull(),
  situation: text("situation").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  hasDetails: boolean("has_details").default(false),
});

export const insertIssueSchema = createInsertSchema(issues).omit({
  id: true,
  timestamp: true,
});

export const updateIssueSchema = z.object({
  status: z.string().optional(),
  situation: z.string().optional(),
  hasDetails: z.boolean().optional(),
});

export type InsertIssue = z.infer<typeof insertIssueSchema>;
export type UpdateIssue = z.infer<typeof updateIssueSchema>;
export type Issue = typeof issues.$inferSelect;
