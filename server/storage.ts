import { 
  type User, 
  type InsertUser, 
  type Feedback, 
  type InsertFeedback, 
  type UpdateFeedback,
  type Party,
  type InsertParty,
  type Encounter,
  type InsertEncounter,
  type UpdateEncounter,
  type CombatEncounter,
  type InsertCombatEncounter,
  type CombatCheckin,
  type InsertCombatCheckin,
  type UpdateCombatCheckin,
  type Issue,
  type InsertIssue,
  type UpdateIssue
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllFeedback(): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  updateFeedback(id: string, updates: UpdateFeedback): Promise<Feedback | undefined>;
  getAllParties(): Promise<Party[]>;
  getPartyByName(name: string): Promise<Party | undefined>;
  createParty(party: InsertParty): Promise<Party>;
  getAllEncounters(): Promise<Encounter[]>;
  getEncountersByParty(partyId: string): Promise<Encounter[]>;
  createEncounter(encounter: InsertEncounter): Promise<Encounter>;
  updateEncounter(id: string, updates: UpdateEncounter): Promise<Encounter | undefined>;
  getAllCombatEncounters(): Promise<CombatEncounter[]>;
  createCombatEncounter(combat: InsertCombatEncounter): Promise<CombatEncounter>;
  getAllCombatCheckins(): Promise<CombatCheckin[]>;
  getCombatCheckinsByCombat(combatId: string): Promise<CombatCheckin[]>;
  createCombatCheckin(checkin: InsertCombatCheckin): Promise<CombatCheckin>;
  updateCombatCheckin(id: string, updates: UpdateCombatCheckin): Promise<CombatCheckin | undefined>;
  getAllIssues(): Promise<Issue[]>;
  createIssue(issue: InsertIssue): Promise<Issue>;
  updateIssue(id: string, updates: UpdateIssue): Promise<Issue | undefined>;
}

import { db } from "./db";
import { users, feedback, parties, encounters, combatEncounters, combatCheckins, issues } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return await db.select().from(feedback).orderBy(desc(feedback.timestamp));
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const result = await db.insert(feedback).values(insertFeedback).returning();
    return result[0];
  }

  async updateFeedback(id: string, updates: UpdateFeedback): Promise<Feedback | undefined> {
    const result = await db.update(feedback).set(updates).where(eq(feedback.id, id)).returning();
    return result[0];
  }

  async getAllParties(): Promise<Party[]> {
    return await db.select().from(parties);
  }

  async getPartyByName(name: string): Promise<Party | undefined> {
    const result = await db.select().from(parties).where(eq(parties.name, name));
    return result[0];
  }

  async createParty(party: InsertParty): Promise<Party> {
    const result = await db.insert(parties).values(party).returning();
    return result[0];
  }

  async getAllEncounters(): Promise<Encounter[]> {
    return await db.select().from(encounters);
  }

  async getEncountersByParty(partyId: string): Promise<Encounter[]> {
    return await db.select().from(encounters).where(eq(encounters.partyId, partyId));
  }

  async createEncounter(encounter: InsertEncounter): Promise<Encounter> {
    const result = await db.insert(encounters).values(encounter).returning();
    return result[0];
  }

  async updateEncounter(id: string, updates: UpdateEncounter): Promise<Encounter | undefined> {
    const result = await db.update(encounters).set(updates).where(eq(encounters.id, id)).returning();
    return result[0];
  }

  async getAllCombatEncounters(): Promise<CombatEncounter[]> {
    return await db.select().from(combatEncounters);
  }

  async createCombatEncounter(combat: InsertCombatEncounter): Promise<CombatEncounter> {
    const result = await db.insert(combatEncounters).values(combat).returning();
    return result[0];
  }

  async getAllCombatCheckins(): Promise<CombatCheckin[]> {
    return await db.select().from(combatCheckins);
  }

  async getCombatCheckinsByCombat(combatId: string): Promise<CombatCheckin[]> {
    return await db.select().from(combatCheckins).where(eq(combatCheckins.combatId, combatId));
  }

  async createCombatCheckin(checkin: InsertCombatCheckin): Promise<CombatCheckin> {
    const result = await db.insert(combatCheckins).values(checkin).returning();
    return result[0];
  }

  async updateCombatCheckin(id: string, updates: UpdateCombatCheckin): Promise<CombatCheckin | undefined> {
    const result = await db.update(combatCheckins).set(updates).where(eq(combatCheckins.id, id)).returning();
    return result[0];
  }

  async getAllIssues(): Promise<Issue[]> {
    return await db.select().from(issues).orderBy(desc(issues.timestamp));
  }

  async createIssue(issue: InsertIssue): Promise<Issue> {
    const result = await db.insert(issues).values(issue).returning();
    return result[0];
  }

  async updateIssue(id: string, updates: UpdateIssue): Promise<Issue | undefined> {
    const result = await db.update(issues).set(updates).where(eq(issues.id, id)).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
