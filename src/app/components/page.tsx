"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/Card";
import { Typography } from "@/components/Typography";
import { Switch } from "@/components/Switch";
import { Select, SelectItem } from "@/components/Select";
import { Tag } from "@/components/Tag";
import {
  Search, Mail, ArrowRight, Plus, Eye,
} from "lucide-react";

// ─── Nav (shared layout) ──────────────────────────────────────────────────────

function Nav({ active }: { active: string }) {
  const links = [
    { href: "/tokens",     label: "Tokens" },
    { href: "/components", label: "Components" },
    { href: "/playground", label: "Playground" },
  ];
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
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{active}</span>
        </div>
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm transition-colors"
              style={{ color: l.href === `/${active.toLowerCase()}` ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: l.href === `/${active.toLowerCase()}` ? 600 : 400 }}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeader({ index, title, description }: { index: string; title: string; description?: string }) {
  return (
    <div className="mb-7 flex items-start gap-4">
      <span
        className="font-bold tabular-nums leading-none mt-0.5 shrink-0"
        style={{
          fontSize: "var(--font-size-13)",
          color: "var(--text-subtle)",
          fontFamily: "var(--font-family-mono)",
        }}
      >
        {index}
      </span>
      <div style={{ borderTop: "1px solid var(--border-default)", paddingTop: "12px", flex: 1 }}>
        <h2 className="font-semibold mb-1" style={{ fontSize: "var(--font-size-20)", color: "var(--text-primary)", letterSpacing: "var(--tracking-tight)" }}>
          {title}
        </h2>
        {description && (
          <p className="text-sm" style={{ color: "var(--text-secondary)", lineHeight: "var(--line-height-20)" }}>{description}</p>
        )}
      </div>
    </div>
  );
}

function Preview({ children, dark = false, className = "" }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  if (dark) {
    return (
      <div className={`overflow-hidden ${className}`} style={{ borderRadius: "var(--radius-6)", border: "1px solid var(--border-default)" }}>
        <div className="px-4 py-2 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#111" }}>
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full" style={{ background: "var(--bg-fill-error)" }} />
            <span className="size-2 rounded-full" style={{ background: "var(--bg-fill-warning)" }} />
            <span className="size-2 rounded-full" style={{ background: "var(--bg-fill-success)" }} />
          </div>
          <span className="text-xs ml-1" style={{ color: "#666", fontFamily: "var(--font-family-mono)" }}>dark mode</span>
        </div>
        <div data-theme="dark" className={`p-7 flex items-center justify-center flex-wrap gap-4`} style={{ background: "#1A1A1A" }}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div
      className={`p-7 flex items-center justify-center flex-wrap gap-4 ${className}`}
      style={{
        background: "var(--bg-surface)",
        borderRadius: "var(--radius-6)",
        border: "1px solid var(--border-default)",
      }}
    >
      {children}
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest mb-3"
      style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}>
      {children}
    </p>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ComponentsPage() {
  const [switchOn, setSwitchOn] = useState(false);
  const [selectVal, setSelectVal] = useState("");

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-surface-secondary)", fontFamily: "var(--font-family-sans)" }}>
      <Nav active="Components" />

      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* Page header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--text-subtle)", fontFamily: "var(--font-family-mono)" }}>
            Component library
          </p>
          <h1 className="font-bold mb-3"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", letterSpacing: "var(--tracking-tightest)", color: "var(--text-primary)", lineHeight: 1.1 }}>
            Components
          </h1>
          <p style={{ fontSize: "var(--font-size-18)", color: "var(--text-secondary)", lineHeight: "var(--line-height-28)", maxWidth: "560px" }}>
            Showing only components with dedicated source files under <code>src/components/*</code>.
            Starter Storybook examples and generic UI scaffolding are intentionally excluded.
          </p>
        </div>

        {/* ── 01 Button ─────────────────────────────────────────────────── */}
        <section className="mb-16">
          <SectionHeader index="01" title="Button" description="5 variants × 4 sizes × 5 states. Prefix/suffix icons and a loading spinner." />
          <div className="space-y-3">
            <div>
              <SubLabel>Variants — light</SubLabel>
              <Preview>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </Preview>
            </div>
            <div>
              <SubLabel>Variants — dark</SubLabel>
              <Preview dark>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </Preview>
            </div>
            <div>
              <SubLabel>Sizes</SubLabel>
              <Preview className="items-end">
                <Button size="lg">Large — 48px</Button>
                <Button size="md">Medium — 40px</Button>
                <Button size="sm">Small — 32px</Button>
                <Button size="xs">XS — 24px</Button>
              </Preview>
            </div>
            <div>
              <SubLabel>States &amp; icons</SubLabel>
              <Preview>
                <Button variant="primary" iconLeft={<Plus />}>Create</Button>
                <Button variant="secondary" iconRight={<ArrowRight />}>Continue</Button>
                <Button variant="primary" loading>Saving...</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="danger" iconLeft={<Plus />}>Danger</Button>
              </Preview>
            </div>
          </div>
        </section>

        {/* ── 02 Tag ────────────────────────────────────────────────────── */}
        <section className="mb-16">
          <SectionHeader
            index="02"
            title="Tag"
            description="A non-interactive labeling chip. 5 types × 2 styles × 3 sizes × 2 shapes, with an optional leading icon."
          />
          <div className="space-y-3">
            <div>
              <SubLabel>Types and styles</SubLabel>
              <Preview className="justify-start">
                <Tag type="Primary" style="Solid" icon={<Plus />}>Primary</Tag>
                <Tag type="Primary" style="Outline" icon={<Plus />}>Primary</Tag>
                <Tag type="Danger" style="Solid" icon={<Plus />}>Danger</Tag>
                <Tag type="Danger" style="Outline" icon={<Plus />}>Danger</Tag>
                <Tag type="Success" style="Solid" icon={<Plus />}>Success</Tag>
                <Tag type="Warning" style="Outline" icon={<Plus />}>Warning</Tag>
                <Tag type="Subtle" style="Solid">Subtle</Tag>
              </Preview>
            </div>
            <div>
              <SubLabel>Sizes and shapes</SubLabel>
              <Preview className="justify-start items-end">
                <Tag size="lg" icon={<Plus />}>Large</Tag>
                <Tag size="md" icon={<Plus />}>Medium</Tag>
                <Tag size="sm" icon={<Plus />}>Small</Tag>
                <Tag shape="Default" icon={<Plus />}>Default shape</Tag>
              </Preview>
            </div>
            <div>
              <SubLabel>Dark mode</SubLabel>
              <Preview dark>
                <Tag type="Primary" style="Solid" icon={<Plus />}>Primary</Tag>
                <Tag type="Danger" style="Outline" icon={<Plus />}>Danger</Tag>
                <Tag type="Success" style="Solid" icon={<Plus />}>Success</Tag>
                <Tag type="Warning" style="Outline" icon={<Plus />}>Warning</Tag>
                <Tag type="Subtle" style="Solid">Subtle</Tag>
              </Preview>
            </div>
          </div>
        </section>

        {/* ── 03 Badge ──────────────────────────────────────────────────── */}
        <section className="mb-16">
          <SectionHeader index="03" title="Badge" description="Status indicators and labels. Dot indicators and semantic variants." />
          <div className="space-y-3">
            <Preview>
              <Badge variant="default">Default</Badge>
              <Badge variant="brand">Brand</Badge>
              <Badge variant="success" dot>Active</Badge>
              <Badge variant="warning" dot>Pending</Badge>
              <Badge variant="danger">Error</Badge>
              <Badge variant="outline">Draft</Badge>
            </Preview>
            <Preview>
              <Badge size="sm" variant="brand">Small</Badge>
              <Badge size="md" variant="brand">Medium</Badge>
              <Badge size="lg" variant="brand">Large</Badge>
            </Preview>
          </div>
        </section>

        {/* ── 04 Input ──────────────────────────────────────────────────── */}
        <section className="mb-16">
          <SectionHeader index="04" title="Input" description="Text input with label, hint, error state, and leading/trailing icons." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-6 flex flex-col gap-4"
              style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-6)", border: "1px solid var(--border-default)" }}>
              <Input label="Default" placeholder="Enter text…" />
              <Input label="With hint" placeholder="johndoe" hint="3–20 characters, letters only." />
              <Input label="With error" placeholder="you@example.com" error="This email is already taken." defaultValue="john@" />
            </div>
            <div className="p-6 flex flex-col gap-4"
              style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-6)", border: "1px solid var(--border-default)" }}>
              <Input placeholder="Search…" prefix={<Search />} />
              <Input label="Password" type="password" placeholder="Enter password" suffix={<Eye />} />
              <Input placeholder="With both icons" prefix={<Mail />} suffix={<Search />} />
            </div>
          </div>
        </section>

        {/* ── 05 Select ─────────────────────────────────────────────────── */}
        <section className="mb-16">
          <SectionHeader index="05" title="Select" description="Dropdown built on Radix UI with label, hint, and error states." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              <div key="a" className="p-6" style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-6)", border: "1px solid var(--border-default)" }}>
                <Select label="Country" placeholder="Select country" value={selectVal} onValueChange={setSelectVal}>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </Select>
              </div>,
              <div key="b" className="p-6" style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-6)", border: "1px solid var(--border-default)" }}>
                <Select label="Role" hint="Determines user permissions." placeholder="Select role">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </Select>
              </div>,
              <div key="c" className="p-6" style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-6)", border: "1px solid var(--border-default)" }}>
                <Select label="Category" error="Please select a category." placeholder="Select category">
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                </Select>
              </div>,
            ]}
          </div>
        </section>

        {/* ── 06 Switch ─────────────────────────────────────────────────── */}
        <section className="mb-16">
          <SectionHeader index="06" title="Switch" description="Toggle control with label and description. Three sizes." />
          <Preview className="flex-col items-start gap-5">
            <Switch size="md" label="Enable notifications" />
            <Switch size="md" label="Marketing emails"
              description="Receive emails about new products and features."
              checked={switchOn} onCheckedChange={setSwitchOn} />
            <Switch size="md" label="Disabled option" description="Managed by your organisation." disabled />
            <div className="flex items-center gap-8 pt-2" style={{ borderTop: "1px solid var(--border-default)", width: "100%" }}>
              <Switch size="sm" label="Small" />
              <Switch size="md" label="Medium" />
              <Switch size="lg" label="Large" />
            </div>
          </Preview>
        </section>

        {/* ── 07 Card ───────────────────────────────────────────────────── */}
        <section className="mb-16">
          <SectionHeader index="07" title="Card" description="Container with header, content, and footer subcomponents. Three variants." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>A standard card with a subtle shadow and border.</CardDescription>
              </CardHeader>
              <CardContent><p className="text-sm" style={{ color: "var(--text-secondary)" }}>Card content goes here.</p></CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
                <Button size="sm" variant="ghost">Cancel</Button>
              </CardFooter>
            </Card>
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>Elevated</CardTitle>
                  <Badge variant="brand">New</Badge>
                </div>
                <CardDescription>A stronger shadow for more visual emphasis.</CardDescription>
              </CardHeader>
              <CardContent><p className="text-sm" style={{ color: "var(--text-secondary)" }}>Card content goes here.</p></CardContent>
              <CardFooter>
                <Button size="sm" variant="primary" iconRight={<ArrowRight />}>Get started</Button>
              </CardFooter>
            </Card>
            <Card variant="ghost">
              <CardHeader>
                <CardTitle>Ghost Card</CardTitle>
                <CardDescription>A low-contrast card for subtle grouping.</CardDescription>
              </CardHeader>
              <CardContent><p className="text-sm" style={{ color: "var(--text-secondary)" }}>Card content goes here.</p></CardContent>
              <CardFooter>
                <Button size="sm" variant="secondary">Learn more</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* ── 08 Typography ─────────────────────────────────────────────── */}
        <section className="mb-16">
          <SectionHeader index="08" title="Typography" description="Full type scale built on Geist. 9 semantic variants." />
          <div className="p-8 flex flex-col gap-5"
            style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-6)", border: "1px solid var(--border-default)" }}>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <div style={{ height: "1px", background: "var(--border-default)" }} />
            <Typography variant="lead">Lead paragraph — introduces the main content of a section.</Typography>
            <Typography variant="body">Body text for regular reading content at a comfortable size.</Typography>
            <Typography variant="small">Small text for secondary information and captions.</Typography>
            <Typography variant="muted">Muted text for metadata like timestamps and labels.</Typography>
            <Typography variant="code">const token = colors.brand[500]</Typography>
          </div>
        </section>

      </div>
    </div>
  );
}
