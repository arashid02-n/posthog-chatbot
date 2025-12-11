import { posthogClient } from "./client";

/**
 * Register an event in PostHog
 */
export async function registerEvent(event: string, properties: Record<string, any> = {}) {
  try {
    const response = await posthogClient.post("/capture/", {
      event,
      properties,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to register event:", error);
    return null;
  }
}

/**
 * Optional: fetch events list
 */
export async function getEvents() {
  try {
    const response = await posthogClient.get("/events/");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch events", err);
    return [];
  }
}
