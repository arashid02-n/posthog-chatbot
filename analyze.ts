import { getUrlInsights } from "../posthog/insights";

export async function analyzeUrl(url: string) {
  // Basic validation
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL");
  }

  // Fetch analytics/insights related to this URL from PostHog
  const insights = await getUrlInsights(url);

  return {
    url,
    chartData: insights.chartData,
    summary: insights.summary,
  };
}
