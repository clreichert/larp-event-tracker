import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFeedbackSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/feedback", async (req, res) => {
    try {
      const feedback = await storage.getAllFeedback();
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch feedback" });
    }
  });

  app.post("/api/feedback", async (req, res) => {
    try {
      const validatedData = insertFeedbackSchema.parse(req.body);
      const newFeedback = await storage.createFeedback(validatedData);
      res.status(201).json(newFeedback);
    } catch (error) {
      res.status(400).json({ error: "Invalid feedback data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
