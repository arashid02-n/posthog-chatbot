import express from "express";
import dotenv from "dotenv";
import { analyzeUrl } from "./api/analyze";
import { createMCPServer } from "./mcp/mcpServer";
import { logger } from "./utils/logger";
import { sendEvent } from "./api/posthogEvent"; // <-- PostHog event sender

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

// MCP server mount
createMCPServer(app);

// Convert env string → number
const PORT = Number(process.env.SERVER_PORT) || 4000;

// Docker requires listening on 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Backend server running on port ${PORT}`);
});
