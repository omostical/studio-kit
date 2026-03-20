import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio Kit — Design System",
  description: "A modern design system with tokens, components, and an interactive playground.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        className="antialiased"
        style={{
          fontFamily: "var(--font-family-sans)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
