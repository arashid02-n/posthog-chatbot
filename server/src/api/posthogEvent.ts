import { posthogClient } from "../posthog/client";

/**
 * Send an event to PostHog Cloud
 * @param eventName Name of the event
 * @param properties Optional properties object
 */
export async function sendEvent(eventName: string, properties: Record<string, any> = {}) {
  try {
    // Include project ID in properties
    const payload = {
      event: eventName,
      properties: {
        ...properties,
        project_id: process.env.POSTHOG_PROJECT_ID
      }
    };

    await posthogClient.post("/capture/", payload);
    console.log(`Event sent: ${eventName}`, payload);
  } catch (error) {
    console.error("Failed to send event:", error);
  }
}
