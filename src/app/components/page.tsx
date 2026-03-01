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
import { Search, Mail, ArrowRight, Download, Plus, Trash2, Eye } from "lucide-react";

function ComponentSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
        {description && <p className="text-sm text-neutral-500 mt-1">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function Preview({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-neutral-200 bg-neutral-50 p-8 flex items-center justify-center flex-wrap gap-4 ${className}`}>
      {children}
    </div>
  );
}

export default function ComponentsPage() {
  const [switchOn, setSwitchOn] = useState(false);
  const [selectVal, setSelectVal] = useState("");

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
            <span className="text-sm text-neutral-500">Components</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tokens" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Tokens</Link>
            <Link href="/components" className="text-sm font-medium text-neutral-900">Components</Link>
            <Link href="/playground" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Playground</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">Components</h1>
          <p className="text-lg text-neutral-500">
            Accessible, composable components built with Radix UI and styled with Tailwind CSS.
          </p>
        </div>

        {/* Button */}
        <ComponentSection title="Button" description="The core interactive element. Supports 6 variants, 6 sizes, icons, and a loading state.">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Variants</p>
              <Preview>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="link">Link</Button>
              </Preview>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Sizes</p>
              <Preview className="items-end">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </Preview>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">States &amp; Icons</p>
              <Preview>
                <Button variant="primary" iconLeft={<Download />}>Download</Button>
                <Button variant="outline" iconRight={<ArrowRight />}>Continue</Button>
                <Button variant="primary" loading>Saving...</Button>
                <Button size="icon" variant="outline" aria-label="Add"><Plus /></Button>
                <Button size="icon" variant="danger" aria-label="Delete"><Trash2 /></Button>
                <Button variant="primary" disabled>Disabled</Button>
              </Preview>
            </div>
          </div>
        </ComponentSection>

        {/* Badge */}
        <ComponentSection title="Badge" description="Status indicators and labels. Supports dot indicators and 6 semantic variants.">
          <div className="space-y-4">
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
        </ComponentSection>

        {/* Input */}
        <ComponentSection title="Input" description="Text input with label, hint, error, and icon support.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 flex flex-col gap-4">
              <Input label="Default" placeholder="Enter text..." />
              <Input label="With hint" placeholder="johndoe" hint="3–20 characters, letters only." />
              <Input label="With error" placeholder="you@example.com" error="This email is already taken." defaultValue="john@" />
            </div>
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 flex flex-col gap-4">
              <Input placeholder="Search..." iconLeft={<Search />} />
              <Input label="Password" type="password" placeholder="Enter password" iconRight={<Eye />} />
              <Input placeholder="With both icons" iconLeft={<Mail />} iconRight={<Search />} />
            </div>
          </div>
        </ComponentSection>

        {/* Select */}
        <ComponentSection title="Select" description="Dropdown selection built on Radix UI with label, hint, and error states.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <Select label="Country" placeholder="Select country" value={selectVal} onValueChange={setSelectVal}>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </Select>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <Select label="Role" hint="Determines user permissions." placeholder="Select role">
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </Select>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <Select label="Category" error="Please select a category." placeholder="Select category">
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
              </Select>
            </div>
          </div>
        </ComponentSection>

        {/* Switch */}
        <ComponentSection title="Switch" description="Toggle control with label and description support.">
          <Preview className="flex-col items-start gap-6">
            <Switch size="md" label="Enable notifications" />
            <Switch
              size="md"
              label="Marketing emails"
              description="Receive emails about new products and features."
              checked={switchOn}
              onCheckedChange={setSwitchOn}
            />
            <Switch size="md" label="Disabled option" description="Managed by your organisation." disabled />
            <div className="flex items-center gap-8">
              <Switch size="sm" label="Small" />
              <Switch size="md" label="Medium" />
              <Switch size="lg" label="Large" />
            </div>
          </Preview>
        </ComponentSection>

        {/* Card */}
        <ComponentSection title="Card" description="Container component with header, content, and footer subcomponents.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>A standard card with a subtle shadow and border.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">Card content goes here.</p>
              </CardContent>
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
              <CardContent>
                <p className="text-sm text-neutral-600">Card content goes here.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="primary" iconRight={<ArrowRight />}>Get started</Button>
              </CardFooter>
            </Card>
            <Card variant="ghost">
              <CardHeader>
                <CardTitle>Ghost Card</CardTitle>
                <CardDescription>A low-contrast card for subtle grouping.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">Card content goes here.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline">Learn more</Button>
              </CardFooter>
            </Card>
          </div>
        </ComponentSection>

        {/* Typography */}
        <ComponentSection title="Typography" description="A full type scale built on Inter. 12 semantic variants.">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-8 flex flex-col gap-4">
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="lead">Lead paragraph — introduces the main content of a section.</Typography>
            <Typography variant="body">Body text for regular reading content at a comfortable size.</Typography>
            <Typography variant="small">Small text for secondary information and captions.</Typography>
            <Typography variant="muted">Muted text for metadata like timestamps and labels.</Typography>
            <Typography variant="code">const token = colors.brand[500]</Typography>
          </div>
        </ComponentSection>
      </div>
    </div>
  );
}
