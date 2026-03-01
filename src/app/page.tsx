import Link from "next/link";
import { ArrowRight, Layers, Palette, Puzzle, Play } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Design Tokens",
    description:
      "A complete token system covering colors, typography, spacing, shadows, and motion — the single source of truth for your design language.",
    href: "/tokens",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Puzzle,
    title: "Components",
    description:
      "Accessible, composable React components built on Radix UI primitives, styled with Tailwind CSS and class-variance-authority.",
    href: "/components",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Play,
    title: "Playground",
    description:
      "Interact with components live in the browser. Tweak props, explore variants, and copy production-ready code snippets.",
    href: "/playground",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Layers,
    title: "Storybook",
    description:
      "Every component is documented and tested in isolation. Run Storybook locally for the full interactive experience.",
    href: "http://localhost:6006",
    color: "bg-orange-50 text-orange-600",
    external: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-neutral-100 sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">SK</span>
            </div>
            <span className="text-sm font-semibold text-neutral-900">Studio Kit</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tokens" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Tokens</Link>
            <Link href="/components" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Components</Link>
            <Link href="/playground" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Playground</Link>
          </nav>
          <a
            href="http://localhost:6006"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Storybook →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 mb-6">
            <span className="size-1.5 rounded-full bg-indigo-500" />
            v0.1.0 — Early Preview
          </span>
          <h1 className="text-6xl font-bold tracking-tight text-neutral-900 leading-tight mb-6">
            Your design system,{" "}
            <span className="text-indigo-600">all in one place.</span>
          </h1>
          <p className="text-xl text-neutral-500 leading-relaxed mb-10 max-w-2xl">
            Studio Kit is a design system library for managing tokens, building components,
            and experimenting with an interactive playground — from Figma to production.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/components"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Browse components
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/tokens"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-lg border border-neutral-200 bg-white text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors"
            >
              View tokens
            </Link>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            const Wrapper = feature.external ? "a" : Link;
            const wrapperProps = feature.external
              ? { href: feature.href, target: "_blank", rel: "noopener noreferrer" }
              : { href: feature.href };

            const cardContent = (
              <>
                <div className={`inline-flex size-11 rounded-xl items-center justify-center mb-5 ${feature.color}`}>
                  <Icon className="size-5" />
                </div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {feature.description}
                </p>
              </>
            );
            const cardClass = "group block rounded-2xl border border-neutral-200 bg-white p-8 hover:border-indigo-200 hover:shadow-md transition-all duration-200";

            return feature.external ? (
              <a key={feature.title} href={feature.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                {cardContent}
              </a>
            ) : (
              <Link key={feature.title} href={feature.href} className={cardClass}>
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stack info */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-6">Built with</p>
          <div className="flex items-center gap-8 flex-wrap">
            {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Radix UI", "Storybook v10", "CVA"].map((tech) => (
              <span key={tech} className="text-sm font-medium text-neutral-600">{tech}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
