import axios from "axios";

/**
 * Create a new PostHog Insight (chart)
 * Uses Personal API Key (phx_*)
 */
export async function createChart(args: {
  name: string;
  event: string;
  chartType?: "line" | "bar" | "pie";
}) {
  try {
    const projectId = process.env.POSTHOG_PROJECT_ID;
    const personalKey = process.env.POSTHOG_PERSONAL_API_KEY;

    if (!projectId || !personalKey) {
      throw new Error("Missing PostHog project ID or personal API key");
    }

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
          display: args.chartType === "bar"
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
        timeout: 10000,
      }
    );

    return {
      success: true,
      insightId: response.data.id,
      url: `https://us.posthog.com/insights/${response.data.short_id}`,
    };
  } catch (err: any) {
    console.error("PostHog create chart error:", err?.response?.data || err.message);

    throw new Error("PostHog chart creation failed");
  }
}

