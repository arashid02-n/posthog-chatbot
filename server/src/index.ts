import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

// Load environment variables from .env
dotenv.config();


// Import MCP
import { createMCPServer } from "./mcp/mcpServer";

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(passport.initialize()); // Initialize Passport for OAuth

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Start main server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Main server running on http://localhost:${PORT}`);
});

// ----------------------
// Start MCP server on a separate port
// ----------------------
const MCP_PORT = process.env.MCP_PORT || 3001;
createMCPServer(app); // Mount MCP endpoints on same Express app

app.listen(MCP_PORT, () => {
  console.log(`MCP server running on http://localhost:${MCP_PORT}`);
});
