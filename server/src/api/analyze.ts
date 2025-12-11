import { getUrlInsights } from "../posthog/insights";

/**
 * Analyze the URL and return chart data
 */
export async function analyzeUrl(url: string) {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL");
  }

  // Fetch insights from PostHog
  const insights = await getUrlInsights(url);

  return {
    url,
    chartData: insights.chartData,
    summary: insights.summary,
  };
}
