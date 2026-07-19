import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutomateEase-DM",
  description: "AI marketing automation, made clear and controllable.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
