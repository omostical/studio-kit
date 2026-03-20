import Link from "next/link";
import { ArrowRight, ArrowUpRight, Palette, Puzzle, Play, Layers } from "lucide-react";
import { Button } from "@/components/ui";
import { Badge } from "@/components/Badge";

// ─── Animation keyframes injected via <style> ─────────────────────────────────
const animCSS = `
  @keyframes sk-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .sk-anim {
    opacity: 0;
    animation: sk-fade-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .sk-d1 { animation-delay: 60ms;  }
  .sk-d2 { animation-delay: 140ms; }
  .sk-d3 { animation-delay: 220ms; }
  .sk-d4 { animation-delay: 300ms; }
  .sk-d5 { animation-delay: 380ms; }
  .sk-d6 { animation-delay: 460ms; }
  .sk-feature-card:hover .sk-arrow { transform: translate(2px, -2px); }
  .sk-feature-card:hover .sk-title  { color: var(--text-brand); }
  .sk-nav-link:hover { color: var(--text-primary) !important; }
`;

// ─── Data ──────────────────────────────────────────────────────────────────────
const blueScale = [
  { step: "100", hex: "#EEF1FB" },
  { step: "200", hex: "#D3DAFA" },
  { step: "300", hex: "#ABBAF4" },
  { step: "400", hex: "#7E97EC" },
  { step: "500", hex: "#5B79E3" },
  { step: "600", hex: "#4763CF" },
  { step: "700", hex: "#3750AD" },
  { step: "800", hex: "#293D87" },
  { step: "900", hex: "#1C2B61" },
  { step: "1000", hex: "#101A3D" },
];

const features = [
  {
    num: "01",
    icon: Palette,
    title: "Design Tokens",
    desc: "A complete token system covering colours, typography, spacing, and motion — the single source of truth from Figma to production.",
    href: "/tokens",
  },
  {
    num: "02",
    icon: Puzzle,
    title: "Components",
    desc: "Accessible React components built on Radix UI, styled with Tailwind CSS and class-variance-authority. 5 variants × 4 sizes each.",
    href: "/components",
  },
  {
    num: "03",
    icon: Play,
    title: "Playground",
    desc: "Interact with components live in the browser. Tweak props, explore variants, and copy production-ready code snippets.",
    href: "/playground",
  },
  {
    num: "04",
    icon: Layers,
    title: "Storybook",
    desc: "Every component documented and tested in isolation with the full Storybook interactive experience including light/dark theming.",
    href: "https://storybook-static-pi-sable.vercel.app",
    external: true,
  },
];

const stack = ["Next.js 16", "React 19", "TypeScript 5", "Tailwind v4", "Radix UI", "Storybook v10", "CVA"];

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{animCSS}</style>
      <div className="min-h-screen" style={{ background: "var(--bg-surface-secondary)", color: "var(--text-primary)", fontFamily: "var(--font-family-sans)" }}>

        {/* ── Nav ────────────────────────────────────────────────────────── */}
        <header
          className="sticky top-0 z-50 backdrop-blur-md"
          style={{ borderBottom: "1px solid var(--border-default)", background: "rgba(255,255,255,0.85)" }}
        >
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div
                className="size-7 flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: "var(--bg-fill-brand)", borderRadius: "var(--radius-3)" }}
              >
                SK
              </div>
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Studio Kit</span>
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {[
                { href: "/tokens",     label: "Tokens" },
                { href: "/components", label: "Components" },
                { href: "/playground", label: "Playground" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="sk-nav-link text-sm transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/components"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "var(--text-brand)" }}
            >
              Get started <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </header>

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(var(--border-strong) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            backgroundPosition: "-14px -14px",
          }}
        >
          {/* Fade the grid out toward the bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0) 50%, var(--bg-surface-secondary) 100%)" }}
          />

          <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">

            {/* Version badge */}
            <div className="sk-anim sk-d1 inline-flex items-center gap-2 mb-8 px-3 py-1.5"
              style={{
                background: "var(--alpha-blue-1)",
                border: "1px solid var(--border-brand-hh)",
                borderRadius: "var(--radius-10)",
              }}
            >
              <span className="size-1.5 rounded-full" style={{ background: "var(--bg-fill-brand)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--text-brand)", fontFamily: "var(--font-family-mono)" }}>
                v0.1.0 — Figma → Production
              </span>
            </div>

            {/* Heading */}
            <h1
              className="sk-anim sk-d2 font-bold leading-none mb-6"
              style={{
                fontSize: "clamp(48px, 7.5vw, 80px)",
                letterSpacing: "var(--tracking-tightest)",
                lineHeight: 1.04,
                color: "var(--text-primary)",
              }}
            >
              Design tokens.<br />
              <span style={{ color: "var(--bg-fill-brand)" }}>Components.</span><br />
              One system.
            </h1>

            {/* Sub */}
            <p
              className="sk-anim sk-d3 mb-10 max-w-xl"
              style={{
                fontSize: "var(--font-size-18)",
                lineHeight: "var(--line-height-28)",
                color: "var(--text-secondary)",
              }}
            >
              Studio Kit bridges Figma and production — a complete design system with
              semantic tokens, accessible components, and an interactive playground.
            </p>

            {/* CTAs */}
            <div className="sk-anim sk-d4 flex items-center gap-3 flex-wrap mb-14">
              <Link
                href="/components"
                className="inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-85"
                style={{
                  height: "48px",
                  padding: "0 var(--space-9)",
                  background: "var(--bg-fill-brand)",
                  color: "var(--text-on-color)",
                  border: "1px solid var(--border-brand)",
                  borderRadius: "var(--radius-6)",
                  fontSize: "var(--font-size-16)",
                  textDecoration: "none",
                }}
              >
                Browse components <ArrowRight size={16} />
              </Link>
              <Link
                href="/tokens"
                className="inline-flex items-center gap-2 font-medium transition-colors hover:opacity-75"
                style={{
                  height: "48px",
                  padding: "0 var(--space-9)",
                  background: "transparent",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "var(--radius-6)",
                  fontSize: "var(--font-size-16)",
                  textDecoration: "none",
                }}
              >
                View tokens
              </Link>
            </div>

            {/* ── Live component preview ── */}
            <div
              className="sk-anim sk-d5 overflow-hidden"
              style={{ border: "1px solid var(--border-default)", borderRadius: "var(--radius-7)" }}
            >
              {/* Browser chrome bar */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  borderBottom: "1px solid var(--border-default)",
                  background: "var(--bg-surface)",
                }}
              >
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full" style={{ background: "var(--bg-fill-error)" }} />
                  <span className="size-2.5 rounded-full" style={{ background: "var(--bg-fill-warning)" }} />
                  <span className="size-2.5 rounded-full" style={{ background: "var(--bg-fill-success)" }} />
                </div>
                <span
                  className="text-xs ml-1"
                  style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-family-mono)" }}
                >
                  button.tsx — live preview
                </span>
                <div className="ml-auto">
                  <Badge variant="brand" size="sm">dark mode</Badge>
                </div>
              </div>

              {/* Dark-themed component preview — renders all button variants using dark tokens */}
              <div
                data-theme="dark"
                className="p-6 flex flex-wrap gap-3 items-center"
                style={{ background: "#1A1A1A" }}
              >
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
                <Button variant="primary" loading>Loading</Button>
                <Button variant="secondary" disabled>Disabled</Button>
              </div>

              {/* Light-themed row */}
              <div
                className="p-6 flex flex-wrap gap-3 items-center"
                style={{
                  borderTop: "1px solid var(--border-default)",
                  background: "var(--bg-surface-secondary)",
                }}
              >
                <span
                  className="text-xs mr-1"
                  style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}
                >
                  light mode
                </span>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Blue palette strip ──────────────────────────────────────────── */}
        <div style={{ borderTop: "1px solid var(--border-default)", borderBottom: "1px solid var(--border-default)" }}>
          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-5">
            <span
              className="text-xs shrink-0"
              style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)", whiteSpace: "nowrap" }}
            >
              Blue — Brand
            </span>
            <div className="flex flex-1 overflow-hidden" style={{ height: "24px", borderRadius: "var(--radius-2)" }}>
              {blueScale.map(({ step, hex }) => (
                <div key={step} className="flex-1" style={{ background: hex }} title={`blue-${step}`} />
              ))}
            </div>
            <Link
              href="/tokens"
              className="text-xs shrink-0 flex items-center gap-1 transition-opacity hover:opacity-70"
              style={{ color: "var(--text-brand)", fontFamily: "var(--font-family-mono)", whiteSpace: "nowrap" }}
            >
              All tokens <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>

        {/* ── Features grid ──────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}
            >
              What's inside
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                letterSpacing: "var(--tracking-tight)",
                lineHeight: 1.15,
                color: "var(--text-primary)",
              }}
            >
              Everything you need to ship<br />a design system.
            </h2>
          </div>

          {/* 2×2 grid separated by 1px lines from the border colour */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-px"
            style={{ background: "var(--border-default)", borderRadius: "var(--radius-7)", overflow: "hidden" }}
          >
            {features.map((f) => {
              const Icon = f.icon;
              const Comp = f.external ? "a" : Link;
              const extra = f.external ? { target: "_blank", rel: "noopener noreferrer" } : {};

              return (
                <Comp
                  key={f.num}
                  href={f.href}
                  {...extra}
                  className="sk-feature-card group block p-8 transition-colors"
                  style={{ background: "var(--bg-surface-secondary)", textDecoration: "none" }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="font-bold tabular-nums leading-none select-none"
                      style={{
                        fontSize: "clamp(40px, 5vw, 56px)",
                        color: "var(--border-default)",
                        fontFamily: "var(--font-family-mono)",
                        letterSpacing: "var(--tracking-tightest)",
                      }}
                    >
                      {f.num}
                    </span>
                    <ArrowUpRight
                      className="sk-arrow size-4 transition-transform"
                      style={{ color: "var(--icon-tertiary)" }}
                    />
                  </div>

                  <div
                    className="mb-5 size-10 flex items-center justify-center"
                    style={{ background: "var(--alpha-blue-2)", borderRadius: "var(--radius-4)" }}
                  >
                    <Icon className="size-5" style={{ color: "var(--icon-brand)" }} />
                  </div>

                  <h3
                    className="sk-title font-semibold mb-2 transition-colors"
                    style={{ fontSize: "var(--font-size-18)", color: "var(--text-primary)" }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "var(--font-size-14)", color: "var(--text-secondary)", lineHeight: "var(--line-height-24)" }}>
                    {f.desc}
                  </p>
                </Comp>
              );
            })}
          </div>
        </section>

        {/* ── Token counts ───────────────────────────────────────────────── */}
        <div style={{ borderTop: "1px solid var(--border-default)" }}>
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "315+", label: "Design tokens" },
              { value: "7",    label: "Component families" },
              { value: "5×4",  label: "Variant × size matrix" },
              { value: "100%", label: "CSS custom properties" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p
                  className="font-bold mb-1"
                  style={{
                    fontSize: "var(--font-size-40)",
                    letterSpacing: "var(--tracking-tightest)",
                    color: "var(--bg-fill-brand)",
                    lineHeight: 1,
                    fontFamily: "var(--font-family-mono)",
                  }}
                >
                  {value}
                </p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tech stack ─────────────────────────────────────────────────── */}
        <footer style={{ background: "#1A1A1A" }}>
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center gap-5 md:gap-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest shrink-0"
              style={{ color: "var(--color-neutral-500)", fontFamily: "var(--font-family-mono)" }}
            >
              Built with
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {stack.map((tech) => (
                <span key={tech} className="text-sm font-medium" style={{ color: "var(--color-neutral-300)" }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
