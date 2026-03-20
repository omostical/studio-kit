import Link from "next/link";
import { tokens } from "@/tokens";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-12 w-full"
        style={{
          backgroundColor: value,
          borderRadius: "var(--radius-3)",
          border: "1px solid var(--border-default)",
        }}
      />
      <p className="text-xs font-medium truncate" style={{ color: "var(--text-secondary)" }}>{name}</p>
      <p className="text-xs truncate" style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}>{value}</p>
    </div>
  );
}

function DualSwatch({ name, light, dark }: { name: string; light: string; dark: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-12 w-full overflow-hidden" style={{ borderRadius: "var(--radius-3)", border: "1px solid var(--border-default)" }}>
        <div className="flex-1" style={{ backgroundColor: light }} />
        <div className="flex-1" style={{ backgroundColor: dark }} />
      </div>
      <p className="text-xs font-medium truncate" style={{ color: "var(--text-secondary)" }}>{name}</p>
      <p className="text-xs truncate" style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}>{light}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <div className="mb-6 pb-4" style={{ borderBottom: "1px solid var(--border-default)" }}>
        <h2 className="font-semibold" style={{ fontSize: "var(--font-size-18)", color: "var(--text-primary)", letterSpacing: "var(--tracking-tight)" }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function TokenRow({ name, value, preview }: { name: string; value: string; preview?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 py-3 px-4" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      {preview}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{name}</p>
      </div>
      <code
        className="text-xs px-2 py-1 shrink-0"
        style={{
          color: "var(--text-subtle)",
          fontFamily: "var(--font-family-mono)",
          background: "var(--bg-surface)",
          borderRadius: "var(--radius-2)",
          border: "1px solid var(--border-default)",
        }}
      >
        {value}
      </code>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{ borderBottom: "1px solid var(--border-default)", background: "rgba(255,255,255,0.85)", fontFamily: "var(--font-family-sans)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="size-7 flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "var(--bg-fill-brand)", borderRadius: "var(--radius-3)" }}>SK</div>
            <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Studio Kit</span>
          </Link>
          <span style={{ color: "var(--border-strong)" }}>/</span>
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Tokens</span>
        </div>
        <nav className="hidden md:flex items-center gap-7">
          {[
            { href: "/tokens",     label: "Tokens",     active: true  },
            { href: "/components", label: "Components", active: false },
            { href: "/playground", label: "Playground", active: false },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm transition-colors"
              style={{ color: l.active ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: l.active ? 600 : 400 }}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function TokensPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-surface-secondary)", fontFamily: "var(--font-family-sans)" }}>
      <Nav />

      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* Page header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}>
            Source of truth
          </p>
          <h1 className="font-bold mb-3"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "var(--tracking-tightest)", color: "var(--text-primary)", lineHeight: 1.1 }}>
            Design Tokens
          </h1>
          <p style={{ fontSize: "var(--font-size-18)", color: "var(--text-secondary)", lineHeight: "var(--line-height-28)", maxWidth: "540px" }}>
            Colours, typography, spacing, radius, and motion — all sourced from Figma StudioKIT_v1 and mapped to CSS custom properties.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { label: "Colour primitives", value: "70+" },
              { label: "Semantic tokens",   value: "60+" },
              { label: "Typography steps",  value: "14"  },
              { label: "Spacing steps",     value: "16"  },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="font-bold tabular-nums" style={{ fontSize: "var(--font-size-24)", color: "var(--bg-fill-brand)", fontFamily: "var(--font-family-mono)" }}>{value}</span>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dual-swatch legend */}
        <div className="flex items-center gap-3 mb-8 px-4 py-3"
          style={{ background: "var(--alpha-blue-1)", borderRadius: "var(--radius-4)", border: "1px solid var(--border-brand-hh)" }}>
          <div className="flex w-8 h-4 overflow-hidden" style={{ borderRadius: "var(--radius-1)", border: "1px solid var(--border-default)" }}>
            <div className="flex-1 bg-white" />
            <div className="flex-1" style={{ background: "var(--color-neutral-900)" }} />
          </div>
          <span className="text-xs" style={{ color: "var(--text-brand)", fontFamily: "var(--font-family-mono)" }}>
            Dual swatches: left = light mode · right = dark mode
          </span>
        </div>

        {/* ── Colour Primitives ── */}
        <Section title="Colour Primitives">
          {Object.entries(tokens.palette)
            .filter(([, v]) => typeof v === "object")
            .map(([paletteName, scale]) => (
              <div key={paletteName} className="mb-10">
                <h3
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}
                >
                  {paletteName}
                </h3>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {Object.entries(scale as Record<string, string>).map(([step, value]) => (
                    <ColorSwatch key={step} name={step} value={value} />
                  ))}
                </div>
              </div>
            ))}
        </Section>

        {/* ── Semantic Colours ── */}
        <Section title="Semantic Colours">
          {Object.entries(tokens.semantic).map(([groupName, group]) => (
            <div key={groupName} className="mb-10">
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}>
                {groupName}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {Object.entries(group).flatMap(([subKey, sub]) => {
                  if (typeof sub === "object" && "light" in sub) {
                    return [
                      <DualSwatch
                        key={subKey}
                        name={subKey}
                        light={(sub as { light: string; dark: string }).light}
                        dark={(sub as { light: string; dark: string }).dark}
                      />,
                    ];
                  }
                  return Object.entries(sub as Record<string, { light: string; dark: string }>).map(
                    ([name, val]) => (
                      <DualSwatch
                        key={`${subKey}-${name}`}
                        name={`${subKey}/${name}`}
                        light={val.light}
                        dark={val.dark}
                      />
                    )
                  );
                })}
              </div>
            </div>
          ))}
        </Section>

        {/* ── Typography ── */}
        <Section title="Typography">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}>Font Size</h3>
              <div style={{ borderRadius: "var(--radius-5)", border: "1px solid var(--border-default)", overflow: "hidden" }}>
                {Object.entries(tokens.typography.fontSize).map(([name, value]) => (
                  <TokenRow key={name} name={`${name}px`} value={value}
                    preview={<span style={{ fontSize: value, color: "var(--text-primary)" }} className="font-medium leading-none w-16 shrink-0">Aa</span>}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}>Font Weight</h3>
              <div style={{ borderRadius: "var(--radius-5)", border: "1px solid var(--border-default)", overflow: "hidden" }}>
                {Object.entries(tokens.typography.fontWeight).map(([name, value]) => (
                  <TokenRow key={name} name={name} value={String(value)}
                    preview={<span style={{ fontWeight: value, color: "var(--text-primary)" }} className="text-sm w-16 shrink-0">Studio</span>}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}>Line Height</h3>
              <div style={{ borderRadius: "var(--radius-5)", border: "1px solid var(--border-default)", overflow: "hidden" }}>
                {Object.entries(tokens.typography.lineHeight).map(([name, value]) => (
                  <TokenRow key={name} name={`${name}px`} value={value} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}>Letter Spacing</h3>
              <div style={{ borderRadius: "var(--radius-5)", border: "1px solid var(--border-default)", overflow: "hidden" }}>
                {Object.entries(tokens.typography.letterSpacing).map(([name, value]) => (
                  <TokenRow key={name} name={name} value={value}
                    preview={<span style={{ letterSpacing: value, color: "var(--text-primary)" }} className="text-xs w-16 shrink-0">Studio</span>}
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── Spacing ── */}
        <Section title="Spacing — Compact">
          <div style={{ borderRadius: "var(--radius-5)", border: "1px solid var(--border-default)", overflow: "hidden" }}>
            {Object.entries(tokens.spacing.compact).map(([step, px]) => (
              <div key={step} className="flex items-center gap-4 py-3 px-4" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <div
                  className="shrink-0"
                  style={{ width: `${px}px`, height: "16px", minWidth: "4px", background: "var(--bg-fill-brand)", borderRadius: "var(--radius-1)", opacity: 0.5 }}
                />
                <span className="text-sm" style={{ color: "var(--text-secondary)", width: "80px" }}>space-{step}</span>
                <code className="text-xs ml-auto px-2 py-1"
                  style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)", background: "var(--bg-surface)", borderRadius: "var(--radius-2)", border: "1px solid var(--border-default)" }}>
                  {px}px
                </code>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Border Radius ── */}
        <Section title="Border Radius — Default">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {Object.entries(tokens.radius.default).map(([step, px]) => (
              <div key={step} className="flex flex-col items-center gap-3">
                <div
                  className="size-16"
                  style={{
                    borderRadius: `${px}px`,
                    background: "var(--alpha-blue-2)",
                    border: "2px solid var(--bg-fill-brand)",
                  }}
                />
                <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>radius-{step}</span>
                <code className="text-xs" style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}>{px}px</code>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Animation ── */}
        <Section title="Animation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}>Duration</h3>
              <div style={{ borderRadius: "var(--radius-5)", border: "1px solid var(--border-default)", overflow: "hidden" }}>
                {Object.entries(tokens.animation.duration).map(([name, value]) => (
                  <TokenRow key={name} name={name} value={value} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}>Easing</h3>
              <div style={{ borderRadius: "var(--radius-5)", border: "1px solid var(--border-default)", overflow: "hidden" }}>
                {Object.entries(tokens.animation.easing).map(([name, value]) => (
                  <TokenRow key={name} name={name} value={value} />
                ))}
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
