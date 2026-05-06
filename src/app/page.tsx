import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Palette,
  Puzzle,
  Play,
  Layers,
  Github,
  Search,
  Mail,
} from "lucide-react";
import { Button, IconButton } from "@/components/ui";
import { Badge } from "@/components/Badge";
import { Tag } from "@/components/Tag";
import { Input } from "@/components/Input";

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
  .sk-dot-grid {
    background-image: radial-gradient(var(--border-strong) 1px, transparent 1px);
    background-size: 28px 28px;
    background-position: -14px -14px;
  }
  .sk-fade-bottom {
    -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
            mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  }
  .sk-browse-card { transition: transform 0.2s ease, border-color 0.2s ease; }
  .sk-browse-card:hover { transform: translateY(-2px); border-color: var(--border-strong); }
`;

// ─── Data ──────────────────────────────────────────────────────────────────────
const palettes = [
  {
    name: "Brand",
    swatches: [
      "#EEF1FB", "#D3DAFA", "#ABBAF4", "#7E97EC", "#5B79E3",
      "#4763CF", "#3750AD", "#293D87", "#1C2B61", "#101A3D",
    ],
  },
  {
    name: "Success",
    swatches: [
      "#EEFBF2", "#C8F2D6", "#96E4B4", "#5FD292", "#2EBC72",
      "#1EA55C", "#168748", "#106835", "#0A4923", "#062A14",
    ],
  },
  {
    name: "Danger",
    swatches: [
      "#FCEEF0", "#F7D0D5", "#EFAAB2", "#E3808B", "#D45A67",
      "#C53540", "#A22232", "#7D1624", "#580E1A", "#32060E",
    ],
  },
];

const stack = [
  "Next.js 16",
  "React 19",
  "TypeScript 5",
  "Tailwind v4",
  "Radix UI",
  "Storybook v10",
  "CVA",
];

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{animCSS}</style>
      <div
        className="min-h-screen"
        style={{
          background: "var(--bg-surface-secondary)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-family-sans)",
        }}
      >
        {/* ── Nav ────────────────────────────────────────────────────────── */}
        <header
          className="sticky top-0 z-50 backdrop-blur-md"
          style={{
            borderBottom: "1px solid var(--border-default)",
            background: "rgba(255,255,255,0.85)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div
                className="size-7 flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{
                  background: "var(--bg-fill-brand)",
                  borderRadius: "var(--radius-3)",
                }}
              >
                SK
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Studio Kit
              </span>
              <span
                className="ml-1 hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium"
                style={{
                  color: "var(--text-tertiary)",
                  background: "var(--bg-surface-secondary)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-2)",
                  fontFamily: "var(--font-family-mono)",
                }}
              >
                v0.1.0
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {[
                { href: "/tokens", label: "Tokens" },
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

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/omostical/studio-kit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hidden md:inline-flex items-center justify-center size-8 transition-colors"
                style={{
                  color: "var(--text-secondary)",
                  borderRadius: "var(--radius-3)",
                }}
              >
                <Github className="size-4" />
              </a>
              <Link
                href="/components"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--text-brand)" }}
              >
                Get started <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden sk-dot-grid">
          {/* Fade the grid out toward the bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 50%, var(--bg-surface-secondary) 100%)",
            }}
          />

          <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20">
            {/* Version badge */}
            <div
              className="sk-anim sk-d1 inline-flex items-center gap-2 mb-8 px-3 py-1.5"
              style={{
                background: "var(--alpha-blue-1)",
                border: "1px solid var(--border-brand-hh)",
                borderRadius: "var(--radius-10)",
              }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: "var(--bg-fill-brand)" }}
              />
              <span
                className="text-xs font-medium"
                style={{
                  color: "var(--text-brand)",
                  fontFamily: "var(--font-family-mono)",
                }}
              >
                v0.1.0 — Figma → Production
              </span>
            </div>

            {/* Heading — bumped to clamp(56,9vw,112) */}
            <h1
              className="sk-anim sk-d2 font-bold mb-6"
              style={{
                fontSize: "clamp(56px, 9vw, 112px)",
                letterSpacing: "var(--tracking-tightest)",
                lineHeight: 0.98,
                color: "var(--text-primary)",
              }}
            >
              Design tokens.
              <br />
              <span style={{ color: "var(--bg-fill-brand)" }}>
                Components.
              </span>
              <br />
              One system.
            </h1>

            <p
              className="sk-anim sk-d3 mb-10 max-w-xl"
              style={{
                fontSize: "var(--font-size-18)",
                lineHeight: "var(--line-height-28)",
                color: "var(--text-secondary)",
              }}
            >
              Studio Kit bridges Figma and production — a complete design system
              with semantic tokens, accessible components, and an interactive
              playground.
            </p>

            <div className="sk-anim sk-d4 flex items-center gap-3 flex-wrap mb-4">
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

            {/* Trust strip */}
            <div
              className="sk-anim sk-d5 flex flex-wrap items-center gap-x-6 gap-y-2 mt-8"
              style={{
                color: "var(--text-tertiary)",
                fontFamily: "var(--font-family-mono)",
                fontSize: "12px",
              }}
            >
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: "var(--bg-fill-success)" }}
                />
                Open source
              </span>
              <span>MIT licensed</span>
              <span>TypeScript first</span>
              <span>Light + dark</span>
              <span>Accessible</span>
            </div>
          </div>
        </section>

        {/* ── Multi-color palette strips ──────────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid var(--border-default)",
            borderBottom: "1px solid var(--border-default)",
            background: "var(--bg-surface)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-3">
            {palettes.map(({ name, swatches }) => (
              <div key={name} className="flex items-center gap-5">
                <span
                  className="text-xs shrink-0 w-16"
                  style={{
                    color: "var(--text-subtle)",
                    fontFamily: "var(--font-family-mono)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </span>
                <div
                  className="flex flex-1 overflow-hidden"
                  style={{ height: "20px", borderRadius: "var(--radius-2)" }}
                >
                  {swatches.map((hex, i) => (
                    <div
                      key={i}
                      className="flex-1"
                      style={{ background: hex }}
                      title={`${name.toLowerCase()}-${(i + 1) * 100}`}
                    />
                  ))}
                </div>
                <Link
                  href="/tokens"
                  className="text-xs shrink-0 flex items-center gap-1 transition-opacity hover:opacity-70"
                  style={{
                    color: "var(--text-brand)",
                    fontFamily: "var(--font-family-mono)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Tokens <ArrowRight className="size-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bento feature grid (Phase 2) ─────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none sk-dot-grid sk-fade-bottom opacity-50" />
          <div className="relative max-w-6xl mx-auto px-6 py-24">
            <div className="mb-12">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{
                  color: "var(--text-subtle)",
                  fontFamily: "var(--font-family-mono)",
                }}
              >
                What's inside
              </p>
              <h2
                className="font-bold"
                style={{
                  fontSize: "clamp(32px, 4.5vw, 48px)",
                  letterSpacing: "var(--tracking-tight)",
                  lineHeight: 1.1,
                  color: "var(--text-primary)",
                }}
              >
                Everything you need to ship
                <br />
                a design system.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
              {/* Tokens — wide hero card */}
              <Link
                href="/tokens"
                className="sk-feature-card group block p-8 md:col-span-2 md:row-span-1 transition-colors"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-7)",
                  textDecoration: "none",
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="size-10 flex items-center justify-center"
                    style={{
                      background: "var(--alpha-blue-2)",
                      borderRadius: "var(--radius-4)",
                    }}
                  >
                    <Palette
                      className="size-5"
                      style={{ color: "var(--icon-brand)" }}
                    />
                  </div>
                  <ArrowUpRight
                    className="sk-arrow size-4 transition-transform"
                    style={{ color: "var(--icon-tertiary)" }}
                  />
                </div>
                <h3
                  className="sk-title font-semibold mb-2 transition-colors"
                  style={{
                    fontSize: "var(--font-size-20)",
                    color: "var(--text-primary)",
                  }}
                >
                  Design Tokens
                </h3>
                <p
                  className="mb-5"
                  style={{
                    fontSize: "var(--font-size-14)",
                    color: "var(--text-secondary)",
                    lineHeight: "var(--line-height-24)",
                  }}
                >
                  315+ semantic tokens covering color, type, spacing and motion
                  — the single source of truth from Figma to production.
                </p>
                {/* Mini palette preview */}
                <div className="flex gap-1">
                  {[
                    "#EEF1FB", "#ABBAF4", "#5B79E3", "#3750AD", "#1C2B61",
                  ].map((c) => (
                    <div
                      key={c}
                      className="size-6"
                      style={{
                        background: c,
                        borderRadius: "var(--radius-2)",
                      }}
                    />
                  ))}
                </div>
              </Link>

              {/* Components — small card with rendered preview */}
              <Link
                href="/components"
                className="sk-feature-card group block p-8 md:row-span-1 transition-colors"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-7)",
                  textDecoration: "none",
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="size-10 flex items-center justify-center"
                    style={{
                      background: "var(--alpha-blue-2)",
                      borderRadius: "var(--radius-4)",
                    }}
                  >
                    <Puzzle
                      className="size-5"
                      style={{ color: "var(--icon-brand)" }}
                    />
                  </div>
                  <ArrowUpRight
                    className="sk-arrow size-4 transition-transform"
                    style={{ color: "var(--icon-tertiary)" }}
                  />
                </div>
                <h3
                  className="sk-title font-semibold mb-2 transition-colors"
                  style={{
                    fontSize: "var(--font-size-20)",
                    color: "var(--text-primary)",
                  }}
                >
                  Components
                </h3>
                <p
                  style={{
                    fontSize: "var(--font-size-14)",
                    color: "var(--text-secondary)",
                    lineHeight: "var(--line-height-24)",
                  }}
                >
                  Accessible React components on Radix + Tailwind, with full
                  variant matrices.
                </p>
              </Link>

              {/* Playground */}
              <Link
                href="/playground"
                className="sk-feature-card group block p-8 md:row-span-1 transition-colors"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-7)",
                  textDecoration: "none",
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="size-10 flex items-center justify-center"
                    style={{
                      background: "var(--alpha-blue-2)",
                      borderRadius: "var(--radius-4)",
                    }}
                  >
                    <Play
                      className="size-5"
                      style={{ color: "var(--icon-brand)" }}
                    />
                  </div>
                  <ArrowUpRight
                    className="sk-arrow size-4 transition-transform"
                    style={{ color: "var(--icon-tertiary)" }}
                  />
                </div>
                <h3
                  className="sk-title font-semibold mb-2 transition-colors"
                  style={{
                    fontSize: "var(--font-size-20)",
                    color: "var(--text-primary)",
                  }}
                >
                  Playground
                </h3>
                <p
                  style={{
                    fontSize: "var(--font-size-14)",
                    color: "var(--text-secondary)",
                    lineHeight: "var(--line-height-24)",
                  }}
                >
                  Tweak props, explore variants, copy production-ready code in
                  the browser.
                </p>
              </Link>

              {/* Storybook — wide */}
              <a
                href="https://storybook-static-pi-sable.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="sk-feature-card group block p-8 md:col-span-2 md:row-span-1 transition-colors"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-7)",
                  textDecoration: "none",
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="size-10 flex items-center justify-center"
                    style={{
                      background: "var(--alpha-blue-2)",
                      borderRadius: "var(--radius-4)",
                    }}
                  >
                    <Layers
                      className="size-5"
                      style={{ color: "var(--icon-brand)" }}
                    />
                  </div>
                  <ArrowUpRight
                    className="sk-arrow size-4 transition-transform"
                    style={{ color: "var(--icon-tertiary)" }}
                  />
                </div>
                <h3
                  className="sk-title font-semibold mb-2 transition-colors"
                  style={{
                    fontSize: "var(--font-size-20)",
                    color: "var(--text-primary)",
                  }}
                >
                  Storybook
                </h3>
                <p
                  style={{
                    fontSize: "var(--font-size-14)",
                    color: "var(--text-secondary)",
                    lineHeight: "var(--line-height-24)",
                  }}
                >
                  Every component documented and tested in isolation, with full
                  light/dark theming and a11y addons.
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* ── Component browse grid (Phase 2) ──────────────────────────────── */}
        <section
          className="relative"
          style={{
            background: "var(--bg-surface)",
            borderTop: "1px solid var(--border-default)",
            borderBottom: "1px solid var(--border-default)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{
                    color: "var(--text-subtle)",
                    fontFamily: "var(--font-family-mono)",
                  }}
                >
                  Components
                </p>
                <h2
                  className="font-bold"
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 48px)",
                    letterSpacing: "var(--tracking-tight)",
                    lineHeight: 1.1,
                    color: "var(--text-primary)",
                  }}
                >
                  Browse the library.
                </h2>
              </div>
              <Link
                href="/components"
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--text-brand)" }}
              >
                See all components <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Button */}
              <Link
                href="/components"
                className="sk-browse-card block overflow-hidden"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-6)",
                  textDecoration: "none",
                }}
              >
                <div
                  className="flex items-center justify-center p-8"
                  style={{ background: "var(--bg-surface-secondary)", minHeight: 120 }}
                >
                  <Button variant="primary" size="sm">
                    Button
                  </Button>
                </div>
                <div
                  className="px-4 py-3"
                  style={{ borderTop: "1px solid var(--border-default)" }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Button
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    6 variants × 6 sizes
                  </p>
                </div>
              </Link>

              {/* Input */}
              <Link
                href="/components"
                className="sk-browse-card block overflow-hidden"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-6)",
                  textDecoration: "none",
                }}
              >
                <div
                  className="flex items-center justify-center p-6"
                  style={{ background: "var(--bg-surface-secondary)", minHeight: 120 }}
                >
                  <div className="w-full max-w-[180px]">
                    <Input size="sm" placeholder="Search…" prefix={<Search />} />
                  </div>
                </div>
                <div
                  className="px-4 py-3"
                  style={{ borderTop: "1px solid var(--border-default)" }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Input
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    3 sizes × 6 states
                  </p>
                </div>
              </Link>

              {/* Badge */}
              <Link
                href="/components"
                className="sk-browse-card block overflow-hidden"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-6)",
                  textDecoration: "none",
                }}
              >
                <div
                  className="flex items-center justify-center gap-2 p-8"
                  style={{ background: "var(--bg-surface-secondary)", minHeight: 120 }}
                >
                  <Badge variant="brand" size="sm">New</Badge>
                  <Badge variant="success" size="sm">Live</Badge>
                </div>
                <div
                  className="px-4 py-3"
                  style={{ borderTop: "1px solid var(--border-default)" }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Badge
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    5 variants
                  </p>
                </div>
              </Link>

              {/* Tag */}
              <Link
                href="/components"
                className="sk-browse-card block overflow-hidden"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-6)",
                  textDecoration: "none",
                }}
              >
                <div
                  className="flex items-center justify-center gap-2 p-8"
                  style={{ background: "var(--bg-surface-secondary)", minHeight: 120 }}
                >
                  <Tag>Design</Tag>
                  <Tag>Tokens</Tag>
                </div>
                <div
                  className="px-4 py-3"
                  style={{ borderTop: "1px solid var(--border-default)" }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Tag
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Compact label
                  </p>
                </div>
              </Link>

              {/* Button group */}
              <Link
                href="/components"
                className="sk-browse-card block overflow-hidden"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-6)",
                  textDecoration: "none",
                }}
              >
                <div
                  className="flex items-center justify-center gap-2 p-8"
                  style={{ background: "var(--bg-surface-secondary)", minHeight: 120 }}
                >
                  <Button variant="secondary" size="sm">
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm">
                    Save
                  </Button>
                </div>
                <div
                  className="px-4 py-3"
                  style={{ borderTop: "1px solid var(--border-default)" }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Button Group
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Pairing pattern
                  </p>
                </div>
              </Link>

              {/* Icon button */}
              <Link
                href="/components"
                className="sk-browse-card block overflow-hidden"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-6)",
                  textDecoration: "none",
                }}
              >
                <div
                  className="flex items-center justify-center p-8"
                  style={{ background: "var(--bg-surface-secondary)", minHeight: 120 }}
                >
                  <IconButton
                    variant="secondary"
                    size="md"
                    icon={<Mail />}
                    aria-label="Mail"
                  />
                </div>
                <div
                  className="px-4 py-3"
                  style={{ borderTop: "1px solid var(--border-default)" }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Icon Button
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Square action
                  </p>
                </div>
              </Link>

              {/* Field with error */}
              <Link
                href="/components"
                className="sk-browse-card block overflow-hidden"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-6)",
                  textDecoration: "none",
                }}
              >
                <div
                  className="flex items-center justify-center p-6"
                  style={{ background: "var(--bg-surface-secondary)", minHeight: 120 }}
                >
                  <div className="w-full max-w-[180px]">
                    <Input
                      size="sm"
                      placeholder="email"
                      defaultValue="wrong@"
                      error="Invalid"
                    />
                  </div>
                </div>
                <div
                  className="px-4 py-3"
                  style={{ borderTop: "1px solid var(--border-default)" }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Form Field
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Validation states
                  </p>
                </div>
              </Link>

              {/* See more */}
              <Link
                href="/components"
                className="sk-browse-card flex items-center justify-center text-center p-8"
                style={{
                  background: "var(--bg-surface-secondary)",
                  border: "1px dashed var(--border-default)",
                  borderRadius: "var(--radius-6)",
                  textDecoration: "none",
                  minHeight: 120,
                }}
              >
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: "var(--text-brand)" }}
                >
                  See all components <ArrowRight className="size-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Stats band — DARK ───────────────────────────────────────────── */}
        <section style={{ background: "#101010", color: "#FFF" }}>
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "315+", label: "Design tokens" },
                { value: "7", label: "Component families" },
                { value: "5×4", label: "Variant × size matrix" },
                { value: "100%", label: "CSS custom properties" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p
                    className="font-bold mb-2"
                    style={{
                      fontSize: "clamp(40px, 5vw, 64px)",
                      letterSpacing: "var(--tracking-tightest)",
                      color: "#FFF",
                      lineHeight: 1,
                      fontFamily: "var(--font-family-mono)",
                    }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-neutral-400)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA band ─────────────────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--bg-surface)",
            borderBottom: "1px solid var(--border-default)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-20 text-center">
            <h2
              className="font-bold mb-4"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                letterSpacing: "var(--tracking-tight)",
                lineHeight: 1.1,
                color: "var(--text-primary)",
              }}
            >
              Start building.
            </h2>
            <p
              className="mb-8 mx-auto max-w-md"
              style={{
                fontSize: "var(--font-size-16)",
                color: "var(--text-secondary)",
                lineHeight: "var(--line-height-24)",
              }}
            >
              Drop the kit into your Next.js project and start shipping in
              minutes.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
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
              <a
                href="https://github.com/omostical/studio-kit"
                target="_blank"
                rel="noopener noreferrer"
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
                <Github className="size-4" /> View on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer — multi-column ────────────────────────────────────────── */}
        <footer style={{ background: "#1A1A1A" }}>
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
              {/* Brand col */}
              <div className="col-span-2 md:col-span-2">
                <Link href="/" className="flex items-center gap-2.5 mb-4">
                  <div
                    className="size-8 flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{
                      background: "var(--bg-fill-brand)",
                      borderRadius: "var(--radius-3)",
                    }}
                  >
                    SK
                  </div>
                  <span className="text-sm font-semibold text-white">
                    Studio Kit
                  </span>
                </Link>
                <p
                  className="text-sm max-w-xs mb-6"
                  style={{ color: "var(--color-neutral-400)" }}
                >
                  A complete design system bridging Figma and production. Open
                  source, MIT licensed.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/omostical/studio-kit"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="inline-flex items-center justify-center size-8 transition-colors hover:opacity-80"
                    style={{
                      color: "var(--color-neutral-300)",
                      border: "1px solid var(--color-neutral-800)",
                      borderRadius: "var(--radius-3)",
                    }}
                  >
                    <Github className="size-4" />
                  </a>
                </div>
              </div>

              {/* Product */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{
                    color: "var(--color-neutral-500)",
                    fontFamily: "var(--font-family-mono)",
                  }}
                >
                  Product
                </p>
                <ul className="flex flex-col gap-2.5">
                  {[
                    { href: "/tokens", label: "Tokens" },
                    { href: "/components", label: "Components" },
                    { href: "/playground", label: "Playground" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm transition-colors hover:opacity-80"
                        style={{ color: "var(--color-neutral-300)" }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{
                    color: "var(--color-neutral-500)",
                    fontFamily: "var(--font-family-mono)",
                  }}
                >
                  Resources
                </p>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <a
                      href="https://storybook-static-pi-sable.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors hover:opacity-80"
                      style={{ color: "var(--color-neutral-300)" }}
                    >
                      Storybook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/omostical/studio-kit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors hover:opacity-80"
                      style={{ color: "var(--color-neutral-300)" }}
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.figma.com/design/yEvYgthP0qWo5EV4QUjZ8Z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors hover:opacity-80"
                      style={{ color: "var(--color-neutral-300)" }}
                    >
                      Figma
                    </a>
                  </li>
                </ul>
              </div>

              {/* About */}
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{
                    color: "var(--color-neutral-500)",
                    fontFamily: "var(--font-family-mono)",
                  }}
                >
                  About
                </p>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-neutral-300)" }}
                    >
                      MIT License
                    </span>
                  </li>
                  <li>
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-neutral-300)" }}
                    >
                      v0.1.0
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom row */}
            <div
              className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              style={{ borderTop: "1px solid var(--color-neutral-800)" }}
            >
              <p
                className="text-xs"
                style={{ color: "var(--color-neutral-500)" }}
              >
                © {new Date().getFullYear()} Studio Kit. Built with care.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs"
                    style={{
                      color: "var(--color-neutral-500)",
                      fontFamily: "var(--font-family-mono)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
