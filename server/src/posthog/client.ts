import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const posthogClient = axios.create({
  baseURL: process.env.POSTHOG_API_URL, 
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.POSTHOG_API_KEY}`,
  },
});
