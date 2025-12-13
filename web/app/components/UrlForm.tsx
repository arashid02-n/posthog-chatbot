"use client";

import { useState } from "react";

export default function UrlForm({
  onSubmit,
  loading
}: {
  onSubmit: (data: { url: string; chartType: string }) => void;
  loading: boolean;
}) {
  const [url, setUrl] = useState("");
  const [chartType, setChartType] = useState("");
  const [error, setError] = useState("");

  // Regex to validate URL starting with https:// and ending with .com
  const urlPattern = /^https:\/\/.+\.com$/;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validation
    if (!urlPattern.test(url)) {
      setError("URL must start with https:// and end with .com");
      return;
    }
    if (!chartType) {
      setError("Please enter a chart type from PostHog");
      return;
    }

    setError("");

    // Optional: Register Event in PostHog
    try {
      await fetch("/api/posthog-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "generate_chart_clicked",
          properties: { url, chartType },
        }),
      });
    } catch (err) {
      console.error("Failed to register event", err);
    }

    // Call parent onSubmit
    onSubmit({ url, chartType });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-2xl p-6 md:p-8 rounded-3xl space-y-6 max-w-xl mx-auto transition-transform transform hover:scale-[1.01]"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Generate Your Chart
      </h2>

      {/* URL Input */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Link of your website
        </label>
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
        />
      </div>

      {/* Chart Type Input */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          What type of chart you want from PostHog
        </label>
        <input
          type="text"
          placeholder="Enter chart type from PostHog"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md"
      >
        {loading ? "Analyzing..." : "Generate Chart"}
      </button>
    </form>
  );
}
