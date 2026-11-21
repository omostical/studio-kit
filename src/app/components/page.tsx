"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { Badge, type BadgeStatus } from "@/components/Badge";
import { Input } from "@/components/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/Card";
import { Typography, type TypographyVariant } from "@/components/Typography";
import { Switch } from "@/components/Switch";
import { Checkbox } from "@/components/Checkbox";
import { Alert } from "@/components/Alert";
import { Select, SelectItem } from "@/components/Select";
import { Tag, tagColors } from "@/components/Tag";
import { Search, Mail, ArrowRight, Plus, Eye, Pencil, X } from "lucide-react";
import { PreviewFrame } from "@/site/PreviewFrame";
import { W } from "@/site/wideset";

const controlVariants = ["primary", "secondary", "danger", "success", "inverse"] as const;
const appearances = ["filled", "border", "ghost"] as const;
const sizes4 = ["xsmall", "small", "medium", "large"] as const;
const badgeStatuses: BadgeStatus[] = ["negative", "notice", "positive", "info", "neutral"];
const typeSamples: TypographyVariant[] = [
  "title-small", "subtitle-large", "subtitle-medium", "subtitle-small",
  "label-strong-medium", "label-strong-small", "label-small",
  "body-large", "body-medium", "body-small", "caption-medium", "number-medium",
];
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);


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

      {/* ─── Button ─────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="button"
        eyebrow="Actions / 01"
        title="Button"
        description="Figma: Variant (5) × Style (filled · border · ghost) × Size (4) × State. Props mirror the Figma properties: variant, appearance, size."
      >
        <SubBlock id="button-variants" title="Variant × Style">
          <PreviewFrame align="start">
            <div className="grid gap-gap-7">
              {appearances.map((appearance) => (
                <div key={appearance} className="flex flex-wrap items-center gap-gap-7">
                  {controlVariants.filter((v) => v !== "inverse").map((variant) => (
                    <Button key={variant} variant={variant} appearance={appearance}>
                      {cap(variant)}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          </PreviewFrame>
        </SubBlock>

        <SubBlock id="button-dark" title="Dark mode and Inverse">
          <PreviewFrame dark align="start">
            <div className="grid gap-gap-7">
              {appearances.map((appearance) => (
                <div key={appearance} className="flex flex-wrap items-center gap-gap-7">
                  {controlVariants.map((variant) =>
                    variant === "inverse" ? (
                      // Inverse is for the opposite surface, so it sits on an inverse background.
                      <span key={variant} className="rounded-control-lg bg-static-fill-inverse-background p-gap-3">
                        <Button variant={variant} appearance={appearance}>{cap(variant)}</Button>
                      </span>
                    ) : (
                      <Button key={variant} variant={variant} appearance={appearance}>
                        {cap(variant)}
                      </Button>
                    )
                  )}
                </div>
              ))}
            </div>
          </PreviewFrame>
        </SubBlock>

        <SubBlock id="button-sizes" title="Sizes">
          <PreviewFrame>
            {sizes4.map((size) => (
              <Button key={size} size={size}>{cap(size)}</Button>
            ))}
          </PreviewFrame>
        </SubBlock>

        <SubBlock id="button-icons" title="States and icons">
          <PreviewFrame>
            <Button prefixIcon={<Plus />}>Create</Button>
            <Button variant="secondary" appearance="border" suffixIcon={<ArrowRight />}>Continue</Button>
            <Button variant="secondary" appearance="border" loading>Saving…</Button>
            <Button disabled>Disabled</Button>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Icon Button ────────────────────────────────────────────────────── */}
      <ComponentSection
        id="icon-button"
        eyebrow="Actions / 02"
        title="Icon Button"
        description="Same Variant × Style × Size model as Button, square. Every icon button needs an aria-label."
      >
        <SubBlock id="icon-button-variants" title="Variant × Style">
          <PreviewFrame align="start">
            <div className="grid gap-gap-7">
              {appearances.map((appearance) => (
                <div key={appearance} className="flex items-center gap-gap-7">
                  {controlVariants.filter((v) => v !== "inverse").map((variant) => (
                    <IconButton key={variant} variant={variant} appearance={appearance} icon={<Pencil />} aria-label={`Edit (${variant} ${appearance})`} />
                  ))}
                </div>
              ))}
            </div>
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="icon-button-sizes" title="Sizes">
          <PreviewFrame>
            {sizes4.map((size) => (
              <IconButton key={size} size={size} appearance="border" icon={<X />} aria-label={`Close (${size})`} />
            ))}
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Input ──────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="input"
        eyebrow="Form / 01"
        title="Input"
        description="Figma Input inside Form Field: label, optional marker, helper text and error message. Large uses 16px text so iOS Safari doesn't zoom."
      >
        <SubBlock id="input-default" title="States">
          <PreviewFrame align="start">
            <div className="grid w-full max-w-sm gap-gap-11">
              <Input label="Email address" placeholder="e.g. hello@example.com" helperText="We'll only use this for receipts." />
              <Input label="Email address" defaultValue="hello@" error="Enter an email address like name@example.com" />
              <Input label="Company" optional placeholder="" />
              <Input label="Email address" defaultValue="hello@example.com" disabled />
            </div>
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="input-affixes" title="Sizes, prefix and suffix">
          <PreviewFrame align="start">
            <div className="grid w-full max-w-sm gap-gap-11">
              <Input size="small" placeholder="Search projects" prefix={<Search />} aria-label="Search projects" />
              <Input size="medium" placeholder="you@example.com" prefix={<Mail />} aria-label="Email" />
              <Input size="large" type="password" placeholder="Password" suffix={<Eye />} aria-label="Password" />
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Select ─────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="select"
        eyebrow="Form / 02"
        title="Select"
        description="Figma Single Select with the Dropdown Menu list. Same field model as Input."
      >
        <SubBlock id="select-default" title="States">
          <PreviewFrame align="start">
            <div className="grid w-full max-w-sm gap-gap-11">
              <Select label="Country" placeholder="Select a country" value={selectVal} onValueChange={setSelectVal} helperText="Used for tax and currency.">
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ng">Nigeria</SelectItem>
                <SelectItem value="us">United States</SelectItem>
              </Select>
              <Select label="Country" error="Choose the country you pay tax in.">
                <SelectItem value="uk">United Kingdom</SelectItem>
              </Select>
              <Select label="Country" defaultValue="uk" disabled>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </Select>
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Checkbox ───────────────────────────────────────────────────────── */}
      <ComponentSection
        id="checkbox"
        eyebrow="Form / 03"
        title="Checkbox"
        description="Figma Type → checked (false · true · indeterminate). Danger only for high-risk choices."
      >
        <SubBlock id="checkbox-states" title="Types and states">
          <PreviewFrame align="start">
            <div className="grid grid-cols-1 gap-gap-9 sm:grid-cols-3">
              <Checkbox label="Unselected" description="Helper description" />
              <Checkbox label="Selected" defaultChecked />
              <Checkbox label="Indeterminate" checked="indeterminate" />
              <Checkbox label="Disabled" disabled />
              <Checkbox label="Disabled selected" disabled checked />
              <Checkbox label="Delete permanently" variant="danger" defaultChecked />
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Switch ─────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="switch"
        eyebrow="Form / 04"
        title="Switch"
        description="Turns a setting on or off immediately. Label the setting, not the state."
      >
        <SubBlock id="switch-default" title="Default">
          <PreviewFrame align="start">
            <div className="grid gap-gap-9">
              <Switch label="Enable notifications" checked={switchOn} onCheckedChange={setSwitchOn} />
              <Switch label="Marketing emails" description="About new products and features." />
              <Switch label="Disabled option" disabled defaultChecked />
            </div>
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="switch-sizes" title="Sizes">
          <PreviewFrame>
            <Switch size="small" aria-label="Small switch" defaultChecked />
            <Switch size="large" aria-label="Large switch" defaultChecked />
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Alert ──────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="alert"
        eyebrow="Feedback / 01"
        title="Alert"
        description="Figma Inline Alert. A message next to the content it's about; the text says the status, colour only reinforces it."
      >
        <SubBlock id="alert-statuses" title="Statuses">
          <PreviewFrame align="start">
            <div className="grid w-full gap-gap-7">
              <Alert status="info" title="Your trial ends in 3 days" description="Add a payment method to keep your projects." actionLabel="Add payment" dismissible />
              <Alert status="success" title="Invoice sent" description="We emailed the invoice to the client." />
              <Alert status="warning" title="Storage almost full" description="You've used 92% of your storage." />
              <Alert status="error" title="Payment failed" description="Check your card details and try again." actionLabel="Update card" />
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Badge ──────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="badge"
        eyebrow="Data display / 01"
        title="Badge"
        description="Figma Status Badge: Status × Emphasis (low · high) × Shape × Size. For categories, use Tag."
      >
        <SubBlock id="badge-variants" title="Status × Emphasis">
          <PreviewFrame align="start">
            <div className="grid gap-gap-7">
              {(["low", "high"] as const).map((emphasis) => (
                <div key={emphasis} className="flex flex-wrap gap-gap-5">
                  {badgeStatuses.map((status) => (
                    <Badge key={status} status={status} emphasis={emphasis}>{cap(status)}</Badge>
                  ))}
                </div>
              ))}
            </div>
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="badge-sizes" title="Sizes and shape">
          <PreviewFrame>
            <Badge size="small" status="info">Small</Badge>
            <Badge size="medium" status="info">Medium</Badge>
            <Badge size="large" status="info">Large</Badge>
            <Badge size="medium" status="info" shape="square">Square</Badge>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Tag ────────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="tag"
        eyebrow="Data display / 02"
        title="Tag"
        description="Figma Tag: 13 category colours × Emphasis (filled · border) × Size × Rounded. Colours mean categories, never status."
      >
        <SubBlock id="tag-types" title="Colours">
          <PreviewFrame align="start">
            <div className="grid gap-gap-7">
              {(["filled", "border"] as const).map((emphasis) => (
                <div key={emphasis} className="flex flex-wrap gap-gap-5">
                  {tagColors.map((color) => (
                    <Tag key={color} color={color} emphasis={emphasis}>{cap(color)}</Tag>
                  ))}
                </div>
              ))}
            </div>
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="tag-sizes" title="Sizes">
          <PreviewFrame>
            <Tag size="small">Small</Tag>
            <Tag size="medium">Medium</Tag>
            <Tag size="large">Large</Tag>
            <Tag size="medium" rounded>Rounded</Tag>
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="tag-dark" title="Dark mode">
          <PreviewFrame dark align="start">
            <div className="flex flex-wrap gap-gap-5">
              {tagColors.map((color) => (
                <Tag key={color} color={color}>{cap(color)}</Tag>
              ))}
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Typography ─────────────────────────────────────────────────────── */}
      <ComponentSection
        id="typography"
        eyebrow="Data display / 03"
        title="Typography"
        description="The Figma text styles, generated from the Typography variables. variant = style name in kebab case."
      >
        <SubBlock id="type-scale" title="Text styles">
          <PreviewFrame align="start">
            <div className="grid w-full gap-gap-7">
              {typeSamples.map((v) => (
                <div key={v} className="grid grid-cols-[180px_1fr] items-baseline gap-gap-9">
                  <Typography variant="caption-medium" tone="subtle">{v}</Typography>
                  <Typography variant={v}>Design systems at scale</Typography>
                </div>
              ))}
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Card ───────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="card"
        eyebrow="Layout / 01"
        title="Card"
        description="Figma Default Card. container={false} groups content without a box."
      >
        <SubBlock id="card-variants" title="With and without container">
          <PreviewFrame align="start">
            <div className="grid w-full grid-cols-1 gap-gap-12 md:grid-cols-2">
              {[true, false].map((container) => (
                <Card key={String(container)} container={container}>
                  <CardHeader>
                    <div>
                      <CardTitle>Sign in</CardTitle>
                      <CardDescription>Use your work email.</CardDescription>
                    </div>
                    <Badge status="info">Beta</Badge>
                  </CardHeader>
                  <CardContent className="grid gap-gap-11">
                    <Input label="Email address" placeholder="e.g. hello@example.com" />
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" appearance="border">Cancel</Button>
                    <Button>Sign in</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>
    </>
  );
}
