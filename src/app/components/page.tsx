"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/Card";
import { Typography } from "@/components/Typography";
import { Switch } from "@/components/Switch";
import { Select, SelectItem } from "@/components/Select";
import { Tag } from "@/components/Tag";
import { Search, Mail, ArrowRight, Plus, Eye } from "lucide-react";
import { PreviewFrame, PreviewLabel } from "@/components/docs/PreviewFrame";
import { W } from "@/components/docs/wideset";

// ─── Reusable doc section header ──────────────────────────────────────────────
function ComponentSection({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-24 scroll-mt-20">
      <p
        className="uppercase mb-3"
        style={{
          fontFamily: "var(--font-plex-mono), monospace",
          fontSize: "11px",
          color: W.gray500,
          letterSpacing: "0.05em",
        }}
      >
        {eyebrow}
      </p>
      <h2
        id={`${id}-overview`}
        className="font-medium mb-3"
        style={{
          fontSize: "32px",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: W.black,
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        {title}
      </h2>
      <p
        className="mb-8 max-w-2xl"
        style={{
          fontSize: "15px",
          lineHeight: 1.55,
          color: W.gray600,
        }}
      >
        {description}
      </p>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}

function SubBlock({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3
        id={id}
        className="scroll-mt-20 mb-3 font-medium"
        style={{
          fontSize: "16px",
          letterSpacing: "-0.01em",
          color: W.black,
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ComponentsPage() {
  const [switchOn, setSwitchOn] = useState(false);
  const [selectVal, setSelectVal] = useState("");

  return (
    <>
      {/* Intro */}
      <section id="intro" className="mb-20 scroll-mt-20">
        <p
          className="uppercase mb-3"
          style={{
            fontFamily: "var(--font-plex-mono), monospace",
            fontSize: "11px",
            color: W.gray500,
            letterSpacing: "0.05em",
          }}
        >
          Components
        </p>
        <h1
          className="font-medium mb-4"
          style={{
            fontSize: "clamp(40px, 5vw, 56px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.96,
            color: W.black,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          Component library
        </h1>
        <p
          className="max-w-2xl"
          style={{
            fontSize: "16px",
            lineHeight: 1.55,
            color: W.gray600,
          }}
        >
          Accessible React components built on Radix UI and Tailwind, with
          variant matrices documented per family. Use the left sidebar to
          jump to a component.
        </p>
      </section>

      {/* ── Button ───────────────────────────────────────────────────────── */}
      <ComponentSection
        id="button"
        eyebrow="Actions / 01"
        title="Button"
        description="5 variants × 4 sizes × 5 states. Supports prefix/suffix icons and a loading spinner."
      >
        <SubBlock id="button-variants" title="Variants">
          <PreviewLabel>Light</PreviewLabel>
          <PreviewFrame>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </PreviewFrame>
        </SubBlock>

        <SubBlock id="button-dark" title="Dark mode">
          <PreviewFrame dark>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </PreviewFrame>
        </SubBlock>

        <SubBlock id="button-sizes" title="Sizes">
          <PreviewFrame>
            <Button size="lg">Large</Button>
            <Button size="md">Medium</Button>
            <Button size="sm">Small</Button>
            <Button size="xs">XS</Button>
          </PreviewFrame>
        </SubBlock>

        <SubBlock id="button-icons" title="States and icons">
          <PreviewFrame>
            <Button variant="primary" iconLeft={<Plus />}>
              Create
            </Button>
            <Button variant="secondary" iconRight={<ArrowRight />}>
              Continue
            </Button>
            <Button variant="primary" loading>
              Saving…
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ── Switch ───────────────────────────────────────────────────────── */}
      <ComponentSection
        id="switch"
        eyebrow="Actions / 02"
        title="Switch"
        description="Toggle control with label and optional description. Three sizes."
      >
        <SubBlock id="switch-default" title="Default">
          <PreviewFrame align="start">
            <div className="flex flex-col gap-5 w-full max-w-md">
              <Switch size="md" label="Enable notifications" />
              <Switch
                size="md"
                label="Marketing emails"
                description="Receive emails about new products and features."
                checked={switchOn}
                onCheckedChange={setSwitchOn}
              />
              <Switch
                size="md"
                label="Disabled option"
                description="Managed by your organisation."
                disabled
              />
            </div>
          </PreviewFrame>
        </SubBlock>

        <SubBlock id="switch-sizes" title="Sizes">
          <PreviewFrame>
            <Switch size="sm" label="Small" />
            <Switch size="md" label="Medium" />
            <Switch size="lg" label="Large" />
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ── Input ────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="input"
        eyebrow="Form / 03"
        title="Input"
        description="Text input with label, hint, error state, and prefix/suffix slots."
      >
        <SubBlock id="input-default" title="Default">
          <PreviewFrame align="start">
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <Input label="Default" placeholder="Enter text…" />
              <Input
                label="With hint"
                placeholder="johndoe"
                hint="3–20 characters, letters only."
              />
              <Input
                label="With error"
                placeholder="you@example.com"
                error="This email is already taken."
                defaultValue="john@"
              />
            </div>
          </PreviewFrame>
        </SubBlock>

        <SubBlock id="input-affixes" title="Prefix and suffix">
          <PreviewFrame align="start">
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <Input placeholder="Search…" prefix={<Search />} />
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                suffix={<Eye />}
              />
              <Input
                placeholder="With both icons"
                prefix={<Mail />}
                suffix={<Search />}
              />
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ── Select ───────────────────────────────────────────────────────── */}
      <ComponentSection
        id="select"
        eyebrow="Form / 04"
        title="Select"
        description="Dropdown built on Radix UI with label, hint, and error states."
      >
        <SubBlock id="select-default" title="States">
          <PreviewFrame align="start">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <Select
                label="Country"
                placeholder="Select country"
                value={selectVal}
                onValueChange={setSelectVal}
              >
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </Select>
              <Select
                label="Role"
                hint="Determines user permissions."
                placeholder="Select role"
              >
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </Select>
              <Select
                label="Category"
                error="Please select a category."
                placeholder="Select category"
              >
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
              </Select>
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ── Badge ────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="badge"
        eyebrow="Data display / 05"
        title="Badge"
        description="Status indicators and labels. Includes dot indicators and semantic variants."
      >
        <SubBlock id="badge-variants" title="Variants">
          <PreviewFrame>
            <Badge variant="default">Default</Badge>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="success" dot>
              Active
            </Badge>
            <Badge variant="warning" dot>
              Pending
            </Badge>
            <Badge variant="danger">Error</Badge>
            <Badge variant="outline">Draft</Badge>
          </PreviewFrame>
        </SubBlock>

        <SubBlock id="badge-sizes" title="Sizes">
          <PreviewFrame>
            <Badge size="sm" variant="brand">
              Small
            </Badge>
            <Badge size="md" variant="brand">
              Medium
            </Badge>
            <Badge size="lg" variant="brand">
              Large
            </Badge>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ── Tag ──────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="tag"
        eyebrow="Data display / 06"
        title="Tag"
        description="Non-interactive labelling chip. 5 types × 2 styles × 3 sizes × 2 shapes, with optional leading icon."
      >
        <SubBlock id="tag-types" title="Types and styles">
          <PreviewFrame align="start">
            <Tag type="Primary" style="Solid" icon={<Plus />}>
              Primary
            </Tag>
            <Tag type="Primary" style="Outline" icon={<Plus />}>
              Primary
            </Tag>
            <Tag type="Danger" style="Solid" icon={<Plus />}>
              Danger
            </Tag>
            <Tag type="Danger" style="Outline" icon={<Plus />}>
              Danger
            </Tag>
            <Tag type="Success" style="Solid" icon={<Plus />}>
              Success
            </Tag>
            <Tag type="Warning" style="Outline" icon={<Plus />}>
              Warning
            </Tag>
            <Tag type="Subtle" style="Solid">
              Subtle
            </Tag>
          </PreviewFrame>
        </SubBlock>

        <SubBlock id="tag-sizes" title="Sizes">
          <PreviewFrame>
            <Tag size="lg" icon={<Plus />}>
              Large
            </Tag>
            <Tag size="md" icon={<Plus />}>
              Medium
            </Tag>
            <Tag size="sm" icon={<Plus />}>
              Small
            </Tag>
          </PreviewFrame>
        </SubBlock>

        <SubBlock id="tag-dark" title="Dark mode">
          <PreviewFrame dark>
            <Tag type="Primary" style="Solid" icon={<Plus />}>
              Primary
            </Tag>
            <Tag type="Danger" style="Outline" icon={<Plus />}>
              Danger
            </Tag>
            <Tag type="Success" style="Solid" icon={<Plus />}>
              Success
            </Tag>
            <Tag type="Subtle" style="Solid">
              Subtle
            </Tag>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ── Typography ───────────────────────────────────────────────────── */}
      <ComponentSection
        id="typography"
        eyebrow="Data display / 07"
        title="Typography"
        description="Full type scale built on Geist. 9 semantic variants."
      >
        <SubBlock id="type-scale" title="Scale">
          <PreviewFrame align="start">
            <div className="flex flex-col gap-5 w-full">
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="h2">Heading 2</Typography>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="h4">Heading 4</Typography>
              <div style={{ height: 1, background: W.gray200 }} />
              <Typography variant="lead">
                Lead paragraph — introduces the main content of a section.
              </Typography>
              <Typography variant="body">
                Body text for regular reading content at a comfortable size.
              </Typography>
              <Typography variant="small">
                Small text for secondary information and captions.
              </Typography>
              <Typography variant="muted">
                Muted text for metadata like timestamps and labels.
              </Typography>
              <Typography variant="code">
                const token = colors.brand[500]
              </Typography>
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ── Card ─────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="card"
        eyebrow="Layout / 08"
        title="Card"
        description="Container with header, content, and footer subcomponents. Three variants."
      >
        <SubBlock id="card-variants" title="Variants">
          <PreviewFrame align="start">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <Card variant="default">
                <CardHeader>
                  <CardTitle>Default</CardTitle>
                  <CardDescription>
                    A standard card with a subtle shadow and border.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm" style={{ color: W.gray600 }}>
                    Card content goes here.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                  <Button size="sm" variant="ghost">
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>Elevated</CardTitle>
                    <Badge variant="brand">New</Badge>
                  </div>
                  <CardDescription>
                    A stronger shadow for more visual emphasis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm" style={{ color: W.gray600 }}>
                    Card content goes here.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    size="sm"
                    variant="primary"
                    iconRight={<ArrowRight />}
                  >
                    Get started
                  </Button>
                </CardFooter>
              </Card>
              <Card variant="ghost">
                <CardHeader>
                  <CardTitle>Ghost</CardTitle>
                  <CardDescription>
                    A low-contrast card for subtle grouping.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm" style={{ color: W.gray600 }}>
                    Card content goes here.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="secondary">
                    Learn more
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>
    </>
  );
}
