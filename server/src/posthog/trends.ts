import { posthogClient } from "./client";

/**
 * Fetch trend data from PostHog (example: pageviews over time)
 */
export async function getTrends() {
  try {
    const response = await posthogClient.post("/insights/", {
      insight: "TRENDS",
      events: [
        {
          id: "$pageview",
          type: "events",
        },
      ],
      interval: "day",
      date_from: "-7d",
    });

    return {
      chartData: response.data.result || [],
      summary: "Pageview trends for the last 7 days",
    };
  } catch (error: any) {
    const message =
      error?.response?.data?.detail ||
      error?.message ||
      "Failed to fetch trends";

    console.error("PostHog trends error:", message);

    return {
      chartData: [],
      summary: "No trend data available",
    };
  }
}

