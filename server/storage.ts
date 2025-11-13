import { type User, type InsertUser, type Feedback, type InsertFeedback, type UpdateFeedback } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllFeedback(): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  updateFeedback(id: string, updates: UpdateFeedback): Promise<Feedback | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private feedback: Map<string, Feedback>;

  constructor() {
    this.users = new Map();
    this.feedback = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedback.values()).sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = randomUUID();
    const newFeedback: Feedback = { 
      ...insertFeedback, 
      id,
      status: "New",
      timestamp: new Date()
    };
    this.feedback.set(id, newFeedback);
    return newFeedback;
  }

  async updateFeedback(id: string, updates: UpdateFeedback): Promise<Feedback | undefined> {
    const existing = this.feedback.get(id);
    if (!existing) {
      return undefined;
    }
    const updated: Feedback = { ...existing, ...updates };
    this.feedback.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
