import express from "express";
import dotenv from "dotenv";
import { analyzeUrl } from "./api/analyze";
import { createMCPServer } from "./mcp/mcpServer";
import { logger } from "./utils/logger";

dotenv.config();

const app = express();
app.use(express.json());

// --- REST API endpoint used by Next.js frontend ---
app.post("/api/analyze", async (req, res) => {
  try {
    const result = await analyzeUrl(req.body.url);
    return res.json(result);
  } catch (err: any) {
    logger.error("Analyze failed", err);
    return res.status(500).json({ error: err.message });
  }
});

// --- MCP Server (for Chat Integration) ---
createMCPServer(app);

const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => {
  logger.info(`Backend server running on port ${PORT}`);
});
