import type { Metadata } from "next";
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
    <html lang="en">
      <body className="antialiased bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
