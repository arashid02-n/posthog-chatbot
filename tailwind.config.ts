import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4f46e5",
          light: "#6366f1",
          dark: "#4338ca"
        }
      }
    }
  },
  plugins: [],
};

export default config;
