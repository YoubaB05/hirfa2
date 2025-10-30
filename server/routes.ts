import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all categories
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get a single category by ID
  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Get all artisans with optional filters
  app.get("/api/artisans", async (req, res) => {
    try {
      const { category, search, minRating } = req.query;
      
      const filters: {
        category?: string;
        search?: string;
        minRating?: number;
      } = {};

      if (category && typeof category === 'string') {
        filters.category = category;
      }

      if (search && typeof search === 'string') {
        filters.search = search;
      }

      if (minRating && typeof minRating === 'string') {
        const rating = parseFloat(minRating);
        if (!isNaN(rating)) {
          filters.minRating = rating;
        }
      }

      const artisans = await storage.getArtisans(filters);
      res.json(artisans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artisans" });
    }
  });

  // Get a single artisan by ID
  app.get("/api/artisans/:id", async (req, res) => {
    try {
      const artisan = await storage.getArtisan(req.params.id);
      if (!artisan) {
        return res.status(404).json({ message: "Artisan not found" });
      }
      res.json(artisan);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artisan" });
    }
  });

  // Create a contact message
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid contact message data" });
      }
      res.status(500).json({ message: "Failed to send contact message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
