import * as React from "react";
import { W } from "./wideset";

export function PreviewFrame({
  children,
  dark = false,
  align = "center",
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        border: `1px solid ${W.gray200}`,
        borderRadius: "0.75rem",
      }}
    >
      <div
        className={`p-8 flex flex-wrap gap-4 items-${align === "center" ? "center" : "start"} ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
        style={{
          background: dark ? W.black : W.gray100,
          minHeight: 140,
        }}
        {...(dark ? { "data-theme": "dark" as const } : {})}
      >
        {children}
      </div>
    </div>
  );
}

export function PreviewLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="uppercase mb-3"
      style={{
        fontFamily: "var(--font-plex-mono), monospace",
        fontSize: "11px",
        color: W.gray500,
        letterSpacing: "0.05em",
      }}
    >
      {children}
    </p>
  );
}
