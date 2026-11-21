import Link from "next/link";
import { color, measurements, typography, textStyles, effectStyles, cssVar } from "@/tokens/generated";

/**
 * Tokens page — everything here is read from src/tokens/generated.ts, which `npm run tokens:build` generates
 * from the StudioKIT 2.0 Figma export. Change Figma → re-export → rebuild, and this page updates.
 */

type ColorGroup = { title: string; prefix: string };
const colorGroups: ColorGroup[] = [
  { title: "Static — fills", prefix: "Static/Fill/" },
  { title: "Static — text", prefix: "Static/Text/" },
  { title: "Static — strokes", prefix: "Static/Stroke/" },
  { title: "Dynamic — fills", prefix: "Dynamic/Fill/" },
  { title: "Dynamic — text", prefix: "Dynamic/Text/" },
  { title: "Dynamic — strokes", prefix: "Dynamic/Stroke/" },
  { title: "Semantic (status)", prefix: "Semantic/" },
  { title: "Non-semantic (categories)", prefix: "Non-Semantic/" },
];

const lightEntries = Object.entries(color.light) as [string, string][];
const darkMap = color.dark as Record<string, string>;

function Swatch({ name }: { name: string }) {
  const light = (color.light as Record<string, string>)[name];
  const dark = darkMap[name];
  return (
    <div className="flex min-w-0 flex-col gap-gap-3">
      <div className="flex h-12 overflow-hidden rounded-control-lg border border-static-stroke-base">
        <div className="flex-1" style={{ backgroundColor: light }} title={`Light ${light}`} />
        <div className="flex-1" style={{ backgroundColor: dark }} title={`Dark ${dark}`} />
      </div>
      <p className="truncate type-caption-strong-medium text-static-text-base" title={name}>{name}</p>
      <p className="truncate font-code type-caption-small text-static-text-subtle">{light} · {dark}</p>
    </div>
  );
}

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-gap-20 scroll-mt-20">
      <div className="mb-gap-12 border-b border-static-stroke-base pb-gap-9">
        <h2 className="type-subtitle-medium text-static-text-strong">{title}</h2>
        {intro && <p className="mt-gap-3 type-body-medium text-static-text-subtle">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function Row({ name, value, preview }: { name: string; value: string; preview?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_auto_120px] items-center gap-gap-9 border-b border-static-stroke-subtle py-gap-5">
      <code className="truncate font-code type-caption-medium text-static-text-base">{name}</code>
      <span className="font-code type-caption-medium text-static-text-subtle">{value}</span>
      <div className="flex justify-end">{preview}</div>
    </div>
  );
}

export default function TokensPage() {
  const m = measurements.desktop as Record<string, string>;
  const mobile = measurements.mobile as Record<string, string>;
  const radius = Object.keys(m).filter((k) => k.startsWith("Corner Radius/"));
  const heights = Object.keys(m).filter((k) => k.startsWith("Components/"));
  const gaps = Object.keys(m).filter((k) => k.startsWith("Gap/")).sort((a, b) => parseFloat(m[a]) - parseFloat(m[b]));
  const t = typography.desktop as Record<string, string>;

  return (
    <div className="min-h-screen bg-static-fill-foreground text-static-text-strong">
      <header className="sticky top-0 z-50 border-b border-static-stroke-subtle bg-static-fill-foreground/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-gap-12">
          <Link href="/" className="flex items-center gap-gap-5">
            <div className="flex size-7 items-center justify-center rounded-control-lg bg-dynamic-fill-primary-default">
              <span className="type-caption-strong-medium text-dynamic-text-onprimary-default">SK</span>
            </div>
            <span className="type-label-strong-small">Studio Kit</span>
          </Link>
          <nav className="flex items-center gap-gap-12">
            <Link href="/tokens" aria-current="page" className="type-label-strong-small text-static-text-strong">Tokens</Link>
            <Link href="/components" className="type-label-small text-static-text-subtle hover:text-static-text-strong">Components</Link>
            <Link href="/playground" className="type-label-small text-static-text-subtle hover:text-static-text-strong">Playground</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-gap-12 py-gap-18">
        <h1 className="mb-gap-7 type-title-small">Design tokens</h1>
        <p className="mb-gap-18 max-w-2xl type-body-large text-static-text-subtle">
          Generated from the Figma StudioKIT 2.0 variables ({lightEntries.length} colour tokens, {Object.keys(m).length} measurements,{" "}
          {Object.keys(t).length} typography values, {Object.keys(textStyles).length} text styles). Each swatch shows Light | Dark.
          Use them as Tailwind classes (<code className="font-code">bg-dynamic-fill-primary-default</code>) or CSS variables (
          <code className="font-code">{cssVar("Dynamic/Fill/Primary/Default")}</code>).
        </p>

        {colorGroups.map((g) => (
          <Section key={g.prefix} id={g.prefix.replace(/\W+/g, "-").toLowerCase()} title={g.title}>
            <div className="grid grid-cols-2 gap-gap-9 sm:grid-cols-3 lg:grid-cols-5">
              {lightEntries
                .filter(([name]) => name.startsWith(g.prefix))
                .map(([name]) => (
                  <Swatch key={name} name={name} />
                ))}
            </div>
          </Section>
        ))}

        <Section id="text-styles" title="Text styles" intro="Tailwind: type-<style>, e.g. type-label-strong-small.">
          {Object.entries(textStyles).map(([name, utility]) => (
            <div key={name} className="grid grid-cols-[220px_1fr] items-baseline gap-gap-9 border-b border-static-stroke-subtle py-gap-5">
              <code className="font-code type-caption-medium text-static-text-subtle">{name}</code>
              <span className={utility}>Design systems at scale</span>
            </div>
          ))}
        </Section>

        <Section id="radius" title="Corner radius" intro="Tailwind: rounded-control-lg, rounded-container-md …">
          {radius.map((k) => (
            <Row key={k} name={k} value={m[k]} preview={<div className="size-10 border-2 border-dynamic-stroke-primary-strong-default bg-dynamic-fill-primary-alpha-strong-default" style={{ borderRadius: cssVar(k) }} />} />
          ))}
        </Section>

        <Section id="heights" title="Component heights" intro="Desktop · Mobile (≤ 767px). Tailwind: h-forms-medium, size-control-small …">
          {heights.map((k) => (
            <Row key={k} name={k} value={`${m[k]} · ${mobile[k]}`} preview={<div className="w-16 rounded-control-sm bg-dynamic-fill-primary-default" style={{ height: cssVar(k) }} />} />
          ))}
        </Section>

        <Section id="spacing" title="Gap scale" intro="Tailwind: p-gap-9, gap-gap-5 …">
          {gaps.map((k) => (
            <Row key={k} name={k} value={m[k]} preview={<div className="h-3 rounded-control-sm bg-dynamic-fill-primary-default" style={{ width: cssVar(k) }} />} />
          ))}
        </Section>

        <Section id="effects" title="Effect styles" intro="Tailwind: shadow-default, shadow-elevation-medium, shadow-focus-base …">
          <div className="grid grid-cols-2 gap-gap-12 sm:grid-cols-4">
            {Object.entries(effectStyles).map(([name, utility]) => (
              <div key={name} className="flex flex-col gap-gap-5">
                <div className={`h-16 rounded-container-md bg-static-fill-container ${utility}`} />
                <code className="font-code type-caption-medium text-static-text-subtle">{name}</code>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
