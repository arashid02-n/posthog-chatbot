import { Express } from "express";
import { mcpHandlers } from "./handlers";

/**
 * Exposes MCP (Model Context Protocol) tool endpoints.
 */
export function createMCPServer(app: Express) {
  app.post("/api/mcp/run", async (req, res) => {
    const { tool, args } = req.body;

    if (!mcpHandlers[tool]) {
      return res.status(400).json({ error: "Unknown MCP tool" });
    }

    try {
      const result = await mcpHandlers[tool](args);
      return res.json({ result });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });
}

