// server/src/index.ts
import express from "express";
import dotenv from "dotenv";
import { analyzeUrl } from "./api/analyze";
import { createMCPServer } from "./mcp/mcpServer";
import { logger } from "./utils/logger";
import { sendEvent } from "./api/posthogEvent";

dotenv.config();

const app = express();
app.use(express.json());

// Analyze API
app.post("/api/analyze", async (req, res) => {
  try {
    const result = await analyzeUrl(req.body.url);
    return res.json(result);
  } catch (err: any) {
    logger.error("Analyze failed", err);
    return res.status(500).json({ error: err.message });
  }
});

// PostHog event API
app.post("/api/posthog-event", async (req, res) => {
  const { event, properties } = req.body;
  if (!event) return res.status(400).json({ error: "Event name required" });

  try {
    await sendEvent(event, properties || {});
    return res.json({ status: "ok" });
  } catch (err: any) {
    logger.error("Failed to send PostHog event", err);
    return res.status(500).json({ error: err.message });
  }
});

// MCP server mount (if present)
createMCPServer(app);

// Convert env string → number, use 0.0.0.0 for Docker
const PORT = Number(process.env.MCP_SERVER_PORT || process.env.SERVER_PORT) || 4000;
app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Backend server running on port ${PORT}`);
});
