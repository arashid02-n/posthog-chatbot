"use client";

import { useState } from "react";
import posthog from "posthog-js";

export default function UrlForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: { url: string; chartType: string }) => void;
  loading: boolean;
}) {
  const [url, setUrl] = useState("");
  const [chartType, setChartType] = useState("");
  const [error, setError] = useState("");

  const urlPattern = /^https:\/\/.+\.com$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!urlPattern.test(url)) {
      setError("URL must start with https:// and end with .com");
      return;
    }

    if (!chartType) {
      setError("Please enter chart type");
      return;
    }

    setError("");

    // ✅ REAL PostHog event from browser
    posthog.capture("generate_chart_clicked", {
      url,
      chartType,
    });

    // Call parent
    onSubmit({ url, chartType });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-2xl p-6 md:p-8 rounded-3xl space-y-6 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Generate Your Chart
      </h2>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Link of your website
        </label>
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          What type of chart you want
        </label>
        <input
          type="text"
          placeholder="line / bar / pie"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
      >
        {loading ? "Analyzing..." : "Generate Chart"}
      </button>
    </form>
  );
}
