// server/src/api/posthogEvent.ts
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 * Send event to PostHog HTTP capture API.
 * Uses write-only API key (api_key in body).
 */
export async function sendEvent(eventName: string, properties: Record<string, any> = {}) {
  const apiKey = process.env.POSTHOG_API_KEY;
  const endpoint = process.env.POSTHOG_API_URL || "https://app.posthog.com"; // default

  if (!apiKey) {
    throw new Error("POSTHOG_API_KEY not set in environment");
  }

  try {
    const url = `${endpoint.replace(/\/$/, "")}/capture/`;
    const payload = {
      api_key: apiKey,
      event: eventName,
      properties,
    };

    const res = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });

    return res.data;
  } catch (err) {
    console.error("Failed to send PostHog event:", err?.response?.data || err.message || err);
    throw err;
  }
}
