"use client";

import { useState } from "react";

export default function UrlForm({
  onSubmit,
  loading
}: {
  onSubmit: (url: string) => void;
  loading: boolean;
}) {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!url) return;

    // Register Event in PostHog
    try {
      await fetch("/api/posthog-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "generate_chart_clicked", properties: { url } }),
      });
    } catch (err) {
      console.error("Failed to register event", err);
    }

    // Call the main onSubmit function to generate chart
    onSubmit(url);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-6 rounded-xl space-y-4"
    >
      <label className="block text-sm font-medium">
        Enter your website URL
      </label>

      <input
        type="url"
        className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand focus:outline-none"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand text-white py-3 rounded-lg font-semibold hover:bg-brand-light transition"
      >
        {loading ? "Analyzing..." : "Generate Chart"}
      </button>
    </form>
  );
}
