import * as React from "react";

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
        border: "1px solid var(--static-stroke-base)",
        borderRadius: "0.75rem",
      }}
    >
      <div
        className={`p-4 sm:p-8 flex flex-wrap gap-4 items-${align === "center" ? "center" : "start"} ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
        style={{
          background: "var(--static-fill-background)",
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
        color: "var(--static-text-subtle)",
        letterSpacing: "0.05em",
      }}
    >
      {children}
    </p>
  );
}
