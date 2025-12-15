"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init("phc_9LhkwALp1yKFMroS5JzNMXe7OvkmO4LdepFj5m6zX1X", {
      api_host: "https://us.i.posthog.com",
    });
  }, []);

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
