import axios from "axios";

export async function sendEvent(event: string, properties: Record<string, any> = {}) {
  try {
    const response = await axios.post("https://us.i.posthog.com/capture/", {
      api_key: process.env.POSTHOG_API_KEY,
      event,
      properties
    });

    return response.data;
  } catch (err) {
    console.error("Failed to send event:", err.response?.data || err);
    throw err;
  }
}
