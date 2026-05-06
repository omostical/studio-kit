import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { Sidebar } from "@/components/docs/Sidebar";
import { TOC } from "@/components/docs/TOC";
import { W } from "@/components/docs/wideset";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: W.gray100,
        color: W.black,
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        letterSpacing: "-0.01em",
      }}
    >
      {/* ── Top nav ───────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          borderBottom: `1px solid ${W.gray200}`,
          background: "rgba(245,245,245,0.85)",
        }}
      >
        <div className="mx-auto px-6 h-14 flex items-center justify-between max-w-[1400px]">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="size-7 flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: W.black, borderRadius: "0.5rem" }}
            >
              SK
            </div>
            <span className="text-sm font-medium" style={{ color: W.black }}>
              Studio Kit
            </span>
            <span
              className="ml-1 hidden sm:inline-flex items-center px-1.5 py-0.5"
              style={{
                fontFamily: "var(--font-plex-mono), monospace",
                fontSize: "10px",
                color: W.gray500,
                border: `1px solid ${W.gray200}`,
                borderRadius: "4px",
              }}
            >
              v0.1.0
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {[
              { href: "/tokens", label: "Tokens" },
              { href: "/components", label: "Components", active: true },
              { href: "/playground", label: "Playground" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm transition-colors"
                style={{
                  color: l.active ? W.black : W.gray600,
                  fontWeight: l.active ? 500 : 400,
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/omostical/studio-kit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden md:inline-flex items-center justify-center size-8"
              style={{ color: W.gray600 }}
            >
              <Github className="size-4" />
            </a>
            <Link
              href="/playground"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium"
              style={{ color: W.black }}
            >
              Playground <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── 3-col docs grid ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-6 flex gap-10">
        {/* Left sidebar */}
        <aside
          className="hidden lg:block shrink-0 py-10"
          style={{ width: 240 }}
        >
          <div
            className="sticky overflow-y-auto pr-2"
            style={{
              top: "72px",
              maxHeight: "calc(100vh - 88px)",
            }}
          >
            <Sidebar />
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 py-10" style={{ maxWidth: 760 }}>
          {children}
        </main>

        {/* Right TOC */}
        <aside
          className="hidden xl:block shrink-0 py-10"
          style={{ width: 200 }}
        >
          <div
            className="sticky"
            style={{
              top: "72px",
              maxHeight: "calc(100vh - 88px)",
              overflowY: "auto",
            }}
          >
            <TOC />
          </div>
        </aside>
      </div>
    </div>
  );
}
