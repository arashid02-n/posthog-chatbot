import express from "express";
import dotenv from "dotenv";
import { analyzeUrl } from "./api/analyze";
import { createMCPServer } from "./mcp/mcpServer";
import { logger } from "./utils/logger";

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

// MCP server mount
createMCPServer(app);

// Convert env string → number
const PORT = Number(process.env.SERVER_PORT) || 4000;

// IMPORTANT: Docker requires listening on 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Backend server running on port ${PORT}`);
});
