import axios from "axios";
import { sendEvent } from "../api/posthogEvent";

export async function createChart(args: {
  name: string;
  event: string;
  chartType?: "line" | "bar" | "pie";
}) {
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const personalKey = process.env.POSTHOG_PERSONAL_API_KEY;

  const response = await axios.post(
    `https://us.i.posthog.com/api/projects/${projectId}/insights/`,
    {
      name: args.name,
      description: "Created from MCP chatbot",
      filters: {
        events: [{ id: args.event, type: "events" }],
        insight: "TRENDS",
        display: "ActionsLineGraph",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${personalKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  // 🔥 THIS LINE IS WHAT YOU WERE MISSING
  await sendEvent(args.event, {
    source: "mcp_chatbot",
    chart_name: args.name,
  });

  return {
    success: true,
    insightId: response.data.id,
    url: `https://us.posthog.com/insights/${response.data.short_id}`,
  };
}
