import Link from "next/link";
import { tokens } from "@/tokens";

function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-12 w-full rounded-lg border border-black/5 shadow-sm"
        style={{ backgroundColor: value }}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-700">{name}</span>
        <span className="text-xs text-neutral-400 font-mono">{value}</span>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-xl font-semibold text-neutral-900 mb-6 pb-3 border-b border-neutral-100">
        {title}
      </h2>
      {children}
    </section>
  );
}

function TokenRow({ name, value, preview }: { name: string; value: string; preview?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-neutral-50 last:border-0">
      {preview}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-700">{name}</p>
      </div>
      <code className="text-xs text-neutral-400 font-mono bg-neutral-50 px-2 py-1 rounded shrink-0">
        {value}
      </code>
    </div>
  );
}

export default function TokensPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-neutral-100 sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">SK</span>
              </div>
              <span className="text-sm font-semibold text-neutral-900">Studio Kit</span>
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-sm text-neutral-500">Tokens</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tokens" className="text-sm font-medium text-neutral-900">Tokens</Link>
            <Link href="/components" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Components</Link>
            <Link href="/playground" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Playground</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">Design Tokens</h1>
          <p className="text-lg text-neutral-500">
            The single source of truth for colors, typography, spacing, shadows, and motion.
          </p>
        </div>

        {/* Colors */}
        <Section title="Colors">
          {Object.entries(tokens.colors).map(([paletteName, shades]) => (
            <div key={paletteName} className="mb-8">
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                {paletteName}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {Object.entries(shades).map(([shade, value]) => (
                  <ColorSwatch key={shade} name={shade} value={value as string} />
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Font Size</h3>
              <div className="rounded-xl border border-neutral-100 overflow-hidden">
                {Object.entries(tokens.typography.fontSize).map(([name, value]) => (
                  <TokenRow
                    key={name}
                    name={name}
                    value={value}
                    preview={
                      <span style={{ fontSize: value }} className="text-neutral-800 font-medium leading-none w-16 shrink-0">
                        Aa
                      </span>
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Font Weight</h3>
              <div className="rounded-xl border border-neutral-100 overflow-hidden">
                {Object.entries(tokens.typography.fontWeight).map(([name, value]) => (
                  <TokenRow
                    key={name}
                    name={name}
                    value={value}
                    preview={
                      <span style={{ fontWeight: value }} className="text-neutral-800 text-sm w-16 shrink-0">
                        Studio
                      </span>
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Line Height</h3>
              <div className="rounded-xl border border-neutral-100 overflow-hidden">
                {Object.entries(tokens.typography.lineHeight).map(([name, value]) => (
                  <TokenRow key={name} name={name} value={value} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Letter Spacing</h3>
              <div className="rounded-xl border border-neutral-100 overflow-hidden">
                {Object.entries(tokens.typography.letterSpacing).map(([name, value]) => (
                  <TokenRow
                    key={name}
                    name={name}
                    value={value}
                    preview={
                      <span style={{ letterSpacing: value }} className="text-neutral-800 text-xs w-16 shrink-0">
                        Studio
                      </span>
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Spacing */}
        <Section title="Spacing">
          <div className="rounded-xl border border-neutral-100 overflow-hidden">
            {Object.entries(tokens.spacing).map(([name, value]) => (
              <div key={name} className="flex items-center gap-4 py-3 px-4 border-b border-neutral-50 last:border-0">
                <div
                  className="bg-indigo-200 rounded shrink-0"
                  style={{ width: value, height: "20px", minWidth: "4px" }}
                />
                <span className="text-sm font-medium text-neutral-700 w-8">{name}</span>
                <code className="text-xs text-neutral-400 font-mono bg-neutral-50 px-2 py-1 rounded ml-auto">
                  {value}
                </code>
              </div>
            ))}
          </div>
        </Section>

        {/* Border Radius */}
        <Section title="Border Radius">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(tokens.borderRadius).map(([name, value]) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div
                  className="size-16 bg-indigo-100 border-2 border-indigo-300"
                  style={{ borderRadius: value }}
                />
                <span className="text-xs font-medium text-neutral-700">{name}</span>
                <code className="text-xs text-neutral-400 font-mono">{value}</code>
              </div>
            ))}
          </div>
        </Section>

        {/* Shadows */}
        <Section title="Shadows">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Object.entries(tokens.shadows)
              .filter(([, v]) => v !== "none")
              .map(([name, value]) => (
                <div key={name} className="flex flex-col items-center gap-3">
                  <div
                    className="size-20 bg-white rounded-xl"
                    style={{ boxShadow: value }}
                  />
                  <span className="text-xs font-medium text-neutral-700">{name}</span>
                </div>
              ))}
          </div>
        </Section>

        {/* Animation */}
        <Section title="Animation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Duration</h3>
              <div className="rounded-xl border border-neutral-100 overflow-hidden">
                {Object.entries(tokens.animation.duration).map(([name, value]) => (
                  <TokenRow key={name} name={name} value={value} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Easing</h3>
              <div className="rounded-xl border border-neutral-100 overflow-hidden">
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
