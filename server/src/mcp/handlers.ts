import { createChart } from "../posthog/createChart";
import { getUrlInsights } from "../posthog/insights";
import { getEvents } from "../posthog/events";
import { getTrends } from "../posthog/trends";

/**
 * All MCP tools exposed to Chat interface.
 */
export const mcpHandlers: Record<string, Function> = {
  analyze_url: async ({ url }: any) => {
    return await getUrlInsights(url);
  },

  list_events: async () => {
    return await getEvents();
  },

  trends: async () => {
    return await getTrends();
  },

  create_chart: async (args: {
    name: string;
    event: string;
    chartType?: "line" | "bar" | "pie";
  }) => {
    return await createChart(args);
  },
};

