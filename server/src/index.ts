import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

// Load environment variables from .env
dotenv.config();

// Import routes
import authRoutes from "./auth/auth.routes";

// Import prisma config (Prisma 7)
import { prisma } from "../prisma/prisma.config";

// Import Google strategy (initializes passport strategy)
import "./auth/google.strategy";

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(passport.initialize()); // Initialize Passport for OAuth

// Routes
app.use("/api/auth", authRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Example: simple API using Prisma
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
