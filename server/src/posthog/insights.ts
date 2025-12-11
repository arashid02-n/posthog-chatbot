import { posthogClient } from "./client";

/**
 * Fetch analytics data from PostHog for a specific URL
 */
export async function getUrlInsights(url: string) {
  try {
    const response = await posthogClient.post("/insights/", {
      filters: {
        events: [{ id: "pageview" }],
        properties: [{ key: "url", value: url }],
      },
    });

    return {
      chartData: response.data.result || [],
      summary: `Analytics summary for: ${url}`,
    };
  } catch (error) {
    console.error("Failed to fetch insights:", error);
    return {
      chartData: [],
      summary: `No data for ${url}`,
    };
  }
}
