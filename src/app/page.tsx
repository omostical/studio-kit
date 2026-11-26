import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Search,
  Mail,
} from "lucide-react";
import { Button, IconButton } from "@/components";
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

  .sk-page {
    font-family: var(--font-inter), system-ui, sans-serif;
    color: var(--static-text-strong);
    background: var(--static-fill-background);
    letter-spacing: -0.01em;
  }
  .sk-mono {
    font-family: var(--font-plex-mono), ui-monospace, monospace;
    letter-spacing: -0.02em;
  }
  .sk-display {
    font-family: var(--font-inter), system-ui, sans-serif;
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 0.96;
  }
  .sk-h2 {
    font-family: var(--font-inter), system-ui, sans-serif;
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1.05;
  }

  .sk-nav-link { color: var(--static-text-base); transition: color 0.15s; }
  .sk-nav-link:hover { color: var(--static-text-strong); }

  .sk-card {
    background: var(--static-fill-container);
    border: 1px solid var(--static-stroke-base);
    border-radius: 1rem;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
  .sk-card:hover { transform: translateY(-2px); border-color: var(--static-stroke-strong); }
  .sk-card:hover .sk-arrow { transform: translate(2px, -2px); }

  .sk-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--static-stroke-base);
    border-radius: 999px;
    background: var(--static-fill-highlight-subtle);
    font-size: 12px;
    color: var(--static-text-base);
  }
`;

const stack = [
  "Next.js 16",
  "React 19",
  "TypeScript 5",
  "Tailwind v4",
  "Radix UI",
];

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{animCSS}</style>
      <div className="sk-page min-h-screen">
        {/* ── Nav ────────────────────────────────────────────────────────── */}
        <header
          className="sticky top-0 z-50 backdrop-blur-md"
          style={{
            borderBottom: "1px solid var(--static-stroke-base)",
            background: "color-mix(in srgb, var(--static-fill-background) 85%, transparent)",
          }}
        >
          <div
            className="mx-auto px-6 h-14 flex items-center justify-between"
            style={{ maxWidth: "61.5rem" }}
          >
            <Link href="/" className="flex items-center gap-2.5">
              <div
                className="size-7 flex items-center justify-center bg-static-fill-inverse-background text-static-text-inverse-strong text-xs font-bold shrink-0"
                style={{ borderRadius: "0.5rem" }}
              >
                SK
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: "var(--static-text-strong)" }}
              >
                Studio Kit
              </span>
              <span
                className="sk-mono ml-1 hidden sm:inline-flex items-center px-1.5 py-0.5"
                style={{
                  fontSize: "10px",
                  color: "var(--static-text-subtle)",
                  border: "1px solid var(--static-stroke-base)",
                  borderRadius: "4px",
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
                  className="sk-nav-link text-sm"
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
                className="hidden md:inline-flex items-center justify-center size-8 sk-nav-link"
              >
                <Github className="size-4" />
              </a>
              <Link
                href="/components"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: "var(--static-text-strong)" }}
              >
                Get started <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* ── Hero — clean, no dot grid ──────────────────────────────────── */}
        <section>
          <div
            className="mx-auto px-6 pt-28 pb-24"
            style={{ maxWidth: "61.5rem" }}
          >
            <div
              className="sk-anim sk-d1 sk-pill mb-8 sk-mono"
              style={{ width: "fit-content" }}
            >
              <span className="size-1.5 rounded-full bg-dynamic-fill-primary-default" />
              <span>v0.1.0 — Figma → Production</span>
            </div>

            <h1
              className="sk-anim sk-d2 sk-display mb-7"
              style={{
                fontSize: "clamp(56px, 9vw, 112px)",
                color: "var(--static-text-strong)",
              }}
            >
              Stay creative
              <br />
              with one design
              <br />
              <span className="text-dynamic-text-primary-default">system.</span>
            </h1>

            <p
              className="sk-anim sk-d3 mb-10 max-w-xl"
              style={{
                fontSize: "18px",
                lineHeight: "1.55",
                color: "var(--static-text-base)",
                letterSpacing: "-0.01em",
              }}
            >
              Studio Kit bridges Figma and production — a complete design system
              with semantic tokens, accessible components, and an interactive
              playground.
            </p>

            <div className="sk-anim sk-d4 flex items-center gap-3 flex-wrap">
              <Button asChild size="large">
                <Link href="/components">
                  Browse components <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="large" variant="secondary" appearance="border">
                <Link href="/tokens">View tokens</Link>
              </Button>
            </div>

            <div
              className="sk-anim sk-d5 sk-mono flex flex-wrap items-center gap-x-6 gap-y-2 mt-10"
              style={{ color: "var(--static-text-subtle)", fontSize: "12px" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-dynamic-fill-primary-default" />
                Open source
              </span>
              <span>MIT licensed</span>
              <span>TypeScript first</span>
              <span>Light + dark</span>
              <span>Accessible</span>
            </div>
          </div>
        </section>

        {/* ── Bento feature grid ───────────────────────────────────────────── */}
        <section>
          <div
            className="mx-auto px-6 pb-24"
            style={{ maxWidth: "61.5rem" }}
          >
            <div className="mb-10">
              <p
                className="sk-mono uppercase mb-4"
                style={{
                  fontSize: "12px",
                  color: "var(--static-text-subtle)",
                  letterSpacing: "0.04em",
                }}
              >
                What&apos;s inside
              </p>
              <h2
                className="sk-h2"
                style={{
                  fontSize: "clamp(36px, 5vw, 56px)",
                  color: "var(--static-text-strong)",
                }}
              >
                Everything you need to ship
                <br />
                a design system.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Tokens — wide */}
              <Link
                href="/tokens"
                className="sk-card group block p-8 md:col-span-2"
                style={{ textDecoration: "none" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="sk-mono"
                    style={{ fontSize: "13px", color: "var(--static-text-subtle)" }}
                  >
                    01 — Tokens
                  </span>
                  <ArrowUpRight
                    className="sk-arrow size-4 transition-transform"
                    style={{ color: "var(--static-text-subtle)" }}
                  />
                </div>
                <h3
                  className="font-medium mb-3"
                  style={{
                    fontSize: "24px",
                    color: "var(--static-text-strong)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Design tokens
                </h3>
                <p
                  className="mb-6 max-w-md"
                  style={{
                    fontSize: "15px",
                    color: "var(--static-text-base)",
                    lineHeight: 1.5,
                  }}
                >
                  A complete token system covering colour, typography, spacing
                  and motion — the single source of truth from Figma to
                  production.
                </p>
                <div className="flex gap-1.5">
                  {[
                    "static-fill-background",
                    "static-fill-inverse-background",
                    "dynamic-fill-primary-default",
                    "dynamic-fill-success-default",
                    "dynamic-fill-danger-default",
                  ].map((token) => (
                    <div
                      key={token}
                      title={token}
                      className="size-7"
                      style={{
                        background: `var(--${token})`,
                        borderRadius: "6px",
                        border: "1px solid var(--static-stroke-base)",
                      }}
                    />
                  ))}
                </div>
              </Link>

              {/* Components */}
              <Link
                href="/components"
                className="sk-card group block p-8"
                style={{ textDecoration: "none" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="sk-mono"
                    style={{ fontSize: "13px", color: "var(--static-text-subtle)" }}
                  >
                    02 — Components
                  </span>
                  <ArrowUpRight
                    className="sk-arrow size-4 transition-transform"
                    style={{ color: "var(--static-text-subtle)" }}
                  />
                </div>
                <h3
                  className="font-medium mb-3"
                  style={{
                    fontSize: "24px",
                    color: "var(--static-text-strong)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Components
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--static-text-base)",
                    lineHeight: 1.5,
                  }}
                >
                  Accessible React components on Radix and Tailwind, with full
                  variant matrices.
                </p>
              </Link>

              {/* Playground */}
              <Link
                href="/playground"
                className="sk-card group block p-8"
                style={{ textDecoration: "none" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="sk-mono"
                    style={{ fontSize: "13px", color: "var(--static-text-subtle)" }}
                  >
                    03 — Playground
                  </span>
                  <ArrowUpRight
                    className="sk-arrow size-4 transition-transform"
                    style={{ color: "var(--static-text-subtle)" }}
                  />
                </div>
                <h3
                  className="font-medium mb-3"
                  style={{
                    fontSize: "24px",
                    color: "var(--static-text-strong)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Playground
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--static-text-base)",
                    lineHeight: 1.5,
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
                className="sk-card group block p-8 md:col-span-2"
                style={{ textDecoration: "none" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="sk-mono"
                    style={{ fontSize: "13px", color: "var(--static-text-subtle)" }}
                  >
                    04 — Storybook
                  </span>
                  <ArrowUpRight
                    className="sk-arrow size-4 transition-transform"
                    style={{ color: "var(--static-text-subtle)" }}
                  />
                </div>
                <h3
                  className="font-medium mb-3"
                  style={{
                    fontSize: "24px",
                    color: "var(--static-text-strong)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Storybook
                </h3>
                <p
                  className="max-w-md"
                  style={{
                    fontSize: "15px",
                    color: "var(--static-text-base)",
                    lineHeight: 1.5,
                  }}
                >
                  Every component documented and tested in isolation, with full
                  light/dark theming and a11y addons.
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* ── Component browse ─────────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--static-fill-foreground)",
            borderTop: "1px solid var(--static-stroke-base)",
            borderBottom: "1px solid var(--static-stroke-base)",
          }}
        >
          <div
            className="mx-auto px-6 py-24"
            style={{ maxWidth: "61.5rem" }}
          >
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p
                  className="sk-mono uppercase mb-4"
                  style={{
                    fontSize: "12px",
                    color: "var(--static-text-subtle)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Library
                </p>
                <h2
                  className="sk-h2"
                  style={{
                    fontSize: "clamp(36px, 5vw, 56px)",
                    color: "var(--static-text-strong)",
                  }}
                >
                  Browse components.
                </h2>
              </div>
              <Link
                href="/components"
                className="inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: "var(--static-text-strong)" }}
              >
                See all <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                {
                  title: "Button",
                  meta: "6 variants",
                  preview: <Button size="small">Button</Button>,
                },
                {
                  title: "Input",
                  meta: "3 sizes · 6 states",
                  preview: (
                    <div className="w-full max-w-[180px]">
                      <Input size="small" placeholder="Search…" prefix={<Search />} />
                    </div>
                  ),
                },
                {
                  title: "Badge",
                  meta: "5 variants",
                  preview: (
                    <div className="flex gap-2">
                      <Badge status="info" size="small">New</Badge>
                      <Badge status="positive" size="small">Live</Badge>
                    </div>
                  ),
                },
                {
                  title: "Tag",
                  meta: "Compact label",
                  preview: (
                    <div className="flex gap-2">
                      <Tag>Design</Tag>
                      <Tag>Tokens</Tag>
                    </div>
                  ),
                },
                {
                  title: "Group",
                  meta: "Cancel + Save",
                  preview: (
                    <div className="flex gap-2">
                      <Button variant="secondary" appearance="border" size="small">Cancel</Button>
                      <Button size="small">Save</Button>
                    </div>
                  ),
                },
                {
                  title: "Icon button",
                  meta: "Square action",
                  preview: (
                    <IconButton
                      variant="secondary"
                      appearance="border"
                      size="medium"
                      icon={<Mail />}
                      aria-label="Mail"
                    />
                  ),
                },
                {
                  title: "Form field",
                  meta: "Validation",
                  preview: (
                    <div className="w-full max-w-[180px]">
                      <Input
                        size="small"
                        placeholder="email"
                        defaultValue="wrong@"
                        error="Invalid"
                      />
                    </div>
                  ),
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href="/components"
                  className="sk-card block overflow-hidden"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="flex items-center justify-center p-6"
                    style={{ background: "var(--static-fill-alpha-subtle)", minHeight: 120 }}
                  >
                    {item.preview}
                  </div>
                  <div
                    className="px-4 py-3"
                    style={{ borderTop: "1px solid var(--static-stroke-base)" }}
                  >
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--static-text-strong)", letterSpacing: "-0.01em" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="sk-mono"
                      style={{ fontSize: "11px", color: "var(--static-text-subtle)" }}
                    >
                      {item.meta}
                    </p>
                  </div>
                </Link>
              ))}

              {/* See more tile */}
              <Link
                href="/components"
                className="sk-card flex items-center justify-center text-center p-8"
                style={{
                  background: "var(--static-fill-alpha-subtle)",
                  borderStyle: "dashed",
                  textDecoration: "none",
                  minHeight: 120,
                }}
              >
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: "var(--static-text-strong)" }}
                >
                  See all <ArrowRight className="size-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Stats — DARK like wideset ────────────────────────────────────── */}
        {/* Always dark: data-theme="dark" scopes the dark token values to this band in both themes. */}
        <section
          data-theme="dark"
          style={{ background: "var(--static-fill-foreground)", color: "var(--static-text-strong)" }}
        >
          <div
            className="mx-auto px-6 py-24"
            style={{ maxWidth: "61.5rem" }}
          >
            <p
              className="sk-mono uppercase mb-12"
              style={{
                fontSize: "12px",
                color: "var(--static-text-subtle)",
                letterSpacing: "0.04em",
              }}
            >
              By the numbers
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
              {[
                { value: "315+", label: "Design tokens" },
                { value: "7", label: "Component families" },
                { value: "5×4", label: "Variant × size matrix" },
                { value: "100%", label: "CSS variables" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p
                    className="sk-display mb-2"
                    style={{
                      fontSize: "clamp(48px, 6vw, 72px)",
                      color: "var(--static-text-strong)",
                    }}
                  >
                    {value}
                  </p>
                  <p
                    className="sk-mono"
                    style={{ fontSize: "13px", color: "var(--static-text-subtle)" }}
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
            background: "var(--static-fill-background)",
            borderBottom: "1px solid var(--static-stroke-base)",
          }}
        >
          <div
            className="mx-auto px-6 py-24 text-center"
            style={{ maxWidth: "61.5rem" }}
          >
            <h2
              className="sk-h2 mb-5"
              style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                color: "var(--static-text-strong)",
              }}
            >
              Start building.
            </h2>
            <p
              className="mb-9 mx-auto max-w-md"
              style={{
                fontSize: "16px",
                color: "var(--static-text-base)",
                lineHeight: 1.5,
              }}
            >
              Drop the kit into your Next.js project and start shipping in
              minutes.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Button asChild size="large">
                <Link href="/components">
                  Browse components <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="large" variant="secondary" appearance="border">
                <a
                  href="https://github.com/omostical/studio-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github /> View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Footer — wideset-style multi-col ─────────────────────────────── */}
        <footer data-theme="dark" style={{ background: "var(--static-fill-foreground)" }}>
          <div
            className="mx-auto px-6 py-16"
            style={{ maxWidth: "61.5rem" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
              <div className="col-span-2">
                <Link href="/" className="flex items-center gap-2.5 mb-5">
                  <div
                    className="size-8 flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: "var(--static-fill-inverse-background)",
                      color: "var(--static-text-inverse-strong)",
                      borderRadius: "0.5rem",
                    }}
                  >
                    SK
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--static-text-strong)" }}
                  >
                    Studio Kit
                  </span>
                </Link>
                <p
                  className="text-sm max-w-xs mb-6"
                  style={{ color: "var(--static-text-subtle)", lineHeight: 1.5 }}
                >
                  A complete design system bridging Figma and production. Open
                  source, MIT licensed.
                </p>
                <a
                  href="https://github.com/omostical/studio-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center justify-center size-8"
                  style={{
                    color: "var(--static-text-base)",
                    border: "1px solid var(--static-stroke-base)",
                    borderRadius: "8px",
                  }}
                >
                  <Github className="size-4" />
                </a>
              </div>

              <div>
                <p
                  className="sk-mono uppercase mb-4"
                  style={{
                    fontSize: "11px",
                    color: "var(--static-text-subtle)",
                    letterSpacing: "0.05em",
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
                        className="text-sm transition-opacity hover:opacity-70"
                        style={{ color: "var(--static-text-base)" }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p
                  className="sk-mono uppercase mb-4"
                  style={{
                    fontSize: "11px",
                    color: "var(--static-text-subtle)",
                    letterSpacing: "0.05em",
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
                      className="text-sm transition-opacity hover:opacity-70"
                      style={{ color: "var(--static-text-base)" }}
                    >
                      Storybook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/omostical/studio-kit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-opacity hover:opacity-70"
                      style={{ color: "var(--static-text-base)" }}
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.figma.com/design/yEvYgthP0qWo5EV4QUjZ8Z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-opacity hover:opacity-70"
                      style={{ color: "var(--static-text-base)" }}
                    >
                      Figma
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p
                  className="sk-mono uppercase mb-4"
                  style={{
                    fontSize: "11px",
                    color: "var(--static-text-subtle)",
                    letterSpacing: "0.05em",
                  }}
                >
                  About
                </p>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <span
                      className="text-sm"
                      style={{ color: "var(--static-text-base)" }}
                    >
                      MIT License
                    </span>
                  </li>
                  <li>
                    <span
                      className="text-sm"
                      style={{ color: "var(--static-text-base)" }}
                    >
                      v0.1.0
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              style={{ borderTop: "1px solid var(--static-stroke-base)" }}
            >
              <p
                className="sk-mono"
                style={{ fontSize: "11px", color: "var(--static-text-subtle)" }}
              >
                © {new Date().getFullYear()} Studio Kit. Built with care.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="sk-mono"
                    style={{ fontSize: "11px", color: "var(--static-text-subtle)" }}
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
