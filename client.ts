import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 * Creates a pre-configured axios instance for PostHog API calls.
 */
export const posthogClient = axios.create({
  baseURL: process.env.POSTHOG_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.POSTHOG_API_KEY}`,
  },
});
