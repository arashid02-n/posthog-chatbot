import axios from "axios";
import { sendEvent } from "../api/posthogEvent";

export async function createChart(args: {
  name: string;
  event: string;
  chartType?: "line" | "bar" | "pie";
}) {
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const personalKey = process.env.POSTHOG_PERSONAL_API_KEY;

  if (!projectId || !personalKey) {
    throw new Error("Missing PostHog credentials");
  }

  // 1️⃣ SEND EVENT FIRST
  await sendEvent(args.event, {
    source: "mcp_chatbot",
    chart_name: args.name,
  });

  // 2️⃣ CREATE INSIGHT
  const response = await axios.post(
    `https://us.i.posthog.com/api/projects/${projectId}/insights/`,
    {
      name: args.name,
      description: "Created from MCP chatbot",
      filters: {
        events: [
          {
            id: args.event,
            type: "events",
          },
        ],
        insight: "TRENDS",
        display:
          args.chartType === "bar"
            ? "ActionsBar"
            : args.chartType === "pie"
            ? "ActionsPie"
            : "ActionsLineGraph",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${personalKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return {
    success: true,
    insightId: response.data.id,
    url: `${process.env.POSTHOG_APP_HOST}/insights/${response.data.short_id}`,
  };
}
