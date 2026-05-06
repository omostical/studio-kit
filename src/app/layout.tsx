import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

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
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${plexMono.variable}`}
    >
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
