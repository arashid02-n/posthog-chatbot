import "./globals.css";
import { ReactNode } from "react";
import Header from "./components/Header";

export const metadata = {
  title: "PostHog Chart Assistant",
  description: "AI-powered analytics chart generator for any website.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
