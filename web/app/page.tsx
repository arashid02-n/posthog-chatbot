"use client";

import { useState } from "react";
import UrlForm from "./components/UrlForm";
import ChartCard from "./components/ChartCard";

export default function HomePage() {
  const [chart, setChart] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (data: { url: string; chartType: string }) => {
  setLoading(true);

  const res = await fetch(
    "https://posthog.rashidnazari.com/api/mcp/run",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tool: "create_chart",
        args: {
          name: "Generate Button Clicks",
          event: "generate_chart_clicked",
          chartType: data.chartType,
        },
      }),
    }
  );

  const result = await res.json();
  setChart(result.result);
  setLoading(false);
};

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-6 space-y-10">
      <UrlForm onSubmit={handleAnalyze} loading={loading} />
      {chart && <ChartCard chart={chart} />}
    </div>
  );
}
