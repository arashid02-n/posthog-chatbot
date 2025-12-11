import { posthogClient } from "../posthog/client";

/**
 * Send an event to PostHog
 * @param eventName Name of the event
 * @param properties Optional properties object
 */
export async function sendEvent(eventName: string, properties: Record<string, any> = {}) {
  try {
    await posthogClient.post("/events/", {
      event: eventName,
      properties,
    });
    console.log(`Event sent: ${eventName}`, properties);
  } catch (error) {
    console.error("Failed to send event:", error);
  }
}
