import axios from "axios";

export async function sendEvent(eventName: string, properties: Record<string, any> = {}) {
  try {
    await axios.post("https://app.posthog.com/capture/", {
      api_key: process.env.POSTHOG_API_KEY,
      event: eventName,
      properties,
    });

    console.log(`Event sent: ${eventName}`, properties);

  } catch (err: any) {
    // Safe error handling
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Unknown PostHog error";

    console.error("Failed to send event:", message);
  }
}
