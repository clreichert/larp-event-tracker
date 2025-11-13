import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertFeedbackSchema, 
  updateFeedbackSchema,
  insertIssueSchema,
  updateIssueSchema,
  updateEncounterSchema,
  updateCombatCheckinSchema
} from "@shared/schema";

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

  app.patch("/api/feedback/:id", async (req, res) => {
    try {
      const validatedData = updateFeedbackSchema.parse(req.body);
      const updatedFeedback = await storage.updateFeedback(req.params.id, validatedData);
      if (!updatedFeedback) {
        return res.status(404).json({ error: "Feedback not found" });
      }
      res.json(updatedFeedback);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  app.get("/api/parties", async (req, res) => {
    try {
      const parties = await storage.getAllParties();
      res.json(parties);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch parties" });
    }
  });

  app.get("/api/parties/:name", async (req, res) => {
    try {
      const party = await storage.getPartyByName(req.params.name);
      if (!party) {
        return res.status(404).json({ error: "Party not found" });
      }
      res.json(party);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch party" });
    }
  });

  app.get("/api/encounters", async (req, res) => {
    try {
      const encounters = await storage.getAllEncounters();
      res.json(encounters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch encounters" });
    }
  });

  app.get("/api/encounters/party/:partyId", async (req, res) => {
    try {
      const encounters = await storage.getEncountersByParty(req.params.partyId);
      res.json(encounters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch encounters" });
    }
  });

  app.patch("/api/encounters/:id", async (req, res) => {
    try {
      const validatedData = updateEncounterSchema.parse(req.body);
      const updatedEncounter = await storage.updateEncounter(req.params.id, validatedData);
      if (!updatedEncounter) {
        return res.status(404).json({ error: "Encounter not found" });
      }
      res.json(updatedEncounter);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  app.get("/api/combat-encounters", async (req, res) => {
    try {
      const combats = await storage.getAllCombatEncounters();
      res.json(combats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch combat encounters" });
    }
  });

  app.get("/api/combat-checkins", async (req, res) => {
    try {
      const checkins = await storage.getAllCombatCheckins();
      res.json(checkins);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch combat checkins" });
    }
  });

  app.get("/api/combat-checkins/:combatId", async (req, res) => {
    try {
      const checkins = await storage.getCombatCheckinsByCombat(req.params.combatId);
      res.json(checkins);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch combat checkins" });
    }
  });

  app.patch("/api/combat-checkins/:id", async (req, res) => {
    try {
      const validatedData = updateCombatCheckinSchema.parse(req.body);
      const updatedCheckin = await storage.updateCombatCheckin(req.params.id, validatedData);
      if (!updatedCheckin) {
        return res.status(404).json({ error: "Combat checkin not found" });
      }
      res.json(updatedCheckin);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  app.get("/api/issues", async (req, res) => {
    try {
      const issues = await storage.getAllIssues();
      res.json(issues);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch issues" });
    }
  });

  app.post("/api/issues", async (req, res) => {
    try {
      const validatedData = insertIssueSchema.parse(req.body);
      const newIssue = await storage.createIssue(validatedData);
      res.status(201).json(newIssue);
    } catch (error) {
      res.status(400).json({ error: "Invalid issue data" });
    }
  });

  app.patch("/api/issues/:id", async (req, res) => {
    try {
      const validatedData = updateIssueSchema.parse(req.body);
      const updatedIssue = await storage.updateIssue(req.params.id, validatedData);
      if (!updatedIssue) {
        return res.status(404).json({ error: "Issue not found" });
      }
      res.json(updatedIssue);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
