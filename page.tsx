"use client";

import { useState } from "react";
import UrlForm from "./components/UrlForm";
import ChartCard from "./components/ChartCard";

export default function HomePage() {
  const [chart, setChart] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (websiteUrl: string) => {
    setLoading(true);
    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ url: websiteUrl })
    });

    const data = await res.json();
    setChart(data.chart);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <UrlForm onSubmit={handleAnalyze} loading={loading} />
      {chart && <ChartCard chart={chart} />}
    </div>
  );
}
