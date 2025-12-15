import axios from "axios";

export async function sendEvent(
  eventName: string,
  properties: Record<string, any> = {}
) {
  try {
    await axios.post(
      `${process.env.POSTHOG_HOST}/capture/`,
      {
        api_key: process.env.POSTHOG_API_KEY,
        event: eventName,
        properties: {
          ...properties,
          distinct_id: properties.distinct_id || "mcp_server",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ PostHog event sent:", eventName);
  } catch (err: any) {
    console.error(
      "❌ PostHog ingest failed:",
      err?.response?.data || err.message
    );
  }
}
