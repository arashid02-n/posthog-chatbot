import { getUrlInsights } from "../posthog/insights";

export async function analyzeUrl(url: string) {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL");
  }

  const insights = await getUrlInsights(url);

  return {
    url,
    chartData: insights.chartData,
    summary: insights.summary,
  };
}
