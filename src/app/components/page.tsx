"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { Avatar } from "@/components/Avatar";
import { Badge, type BadgeStatus } from "@/components/Badge";
import { Input } from "@/components/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/Card";
import { Typography, type TypographyVariant } from "@/components/Typography";
import { Switch } from "@/components/Switch";
import { Checkbox } from "@/components/Checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/DropdownMenu";
import { Alert } from "@/components/Alert";
import { Select, SelectItem } from "@/components/Select";
import { Tag, tagColors } from "@/components/Tag";
import { Modal, ModalTrigger, ModalClose, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@/components/Modal";
import { Tooltip } from "@/components/Tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/Tabs";
import { Toast, ToastProvider, useToast } from "@/components/Toast";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/Table";
import { Search, Mail, ArrowRight, Plus, Eye, Pencil, X, MoreHorizontal, RotateCcw, Download, Copy, Trash2 } from "lucide-react";
import { Divider } from "@/components/Divider";
import { ProgressBar } from "@/components/ProgressBar";
import { Thumbnail } from "@/components/Thumbnail";
import { LinkButton } from "@/components/LinkButton";
import { PreviewFrame } from "@/site/PreviewFrame";

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

function MenuOptionsDemo() {
  const [sort, setSort] = useState("newest");
  const [showPaid, setShowPaid] = useState(true);
  const [showFailed, setShowFailed] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" appearance="border">View options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Show</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked={showPaid} onCheckedChange={(v) => setShowPaid(v === true)} onSelect={(e) => e.preventDefault()}>Paid</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showFailed} onCheckedChange={(v) => setShowFailed(v === true)} onSelect={(e) => e.preventDefault()}>Failed</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ToastDemo() {
  const { show } = useToast();
  return (
    <Button onClick={() => show({ status: "positive", title: "Message sent", actionLabel: "Undo" })}>Send message</Button>
  );
}


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
          color: "var(--static-text-subtle)",
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
          color: "var(--static-text-strong)",
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
          color: "var(--static-text-base)",
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
          color: "var(--static-text-strong)",
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
            color: "var(--static-text-subtle)",
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
            color: "var(--static-text-strong)",
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
            color: "var(--static-text-base)",
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

      {/* ─── Avatar ─────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="avatar"
        eyebrow="Data display / 01"
        title="Avatar"
        description="Figma Avatar: Variant (image · initials · icon) × Type (rounded for people, square for organisations) × Size × Selected × Status. Leave variant unset: photo, then initials, then icon."
      >
        <SubBlock id="avatar-variants" title="Variants and type">
          <PreviewFrame>
            <Avatar src="/avatars/sample-person.svg" name="Ada Lovelace" />
            <Avatar name="Ada Lovelace" />
            <Avatar alt="Unknown member" />
            <Avatar type="square" src="/avatars/sample-team.svg" name="Northwind" />
            <Avatar type="square" name="Northwind Traders" />
            <Avatar type="square" alt="Workspace" />
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="avatar-sizes" title="Sizes, status and selected">
          <PreviewFrame>
            {(["xsmall", "small", "medium", "large", "xlarge", "xxlarge"] as const).map((size) => (
              <Avatar key={size} size={size} name="Grace Hopper" status />
            ))}
            <Avatar size="large" src="/avatars/sample-person.svg" name="Ada Lovelace" selected />
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Badge ──────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="badge"
        eyebrow="Data display / 02"
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
        eyebrow="Data display / 03"
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
        eyebrow="Data display / 04"
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

      {/* ─── Tabs ───────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="tabs"
        eyebrow="Navigation / 01"
        title="Tabs"
        description="Figma Tabs: Regular (neutral underline) or Pill, two sizes, optional full width. Arrow keys move between tabs."
      >
        <SubBlock id="tabs-variants" title="Regular and Pill">
          <PreviewFrame align="start">
            <div className="grid w-full gap-gap-14">
              {(["regular", "pill"] as const).map((variant) => (
                <Tabs key={variant} variant={variant} defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="type-body-medium text-static-text-subtle">Overview panel</TabsContent>
                  <TabsContent value="activity" className="type-body-medium text-static-text-subtle">Activity panel</TabsContent>
                  <TabsContent value="settings" className="type-body-medium text-static-text-subtle">Settings panel</TabsContent>
                </Tabs>
              ))}
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Modal ──────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="modal"
        eyebrow="Overlays / 01"
        title="Modal"
        description="Figma Modal with Header and Footer, on Radix Dialog: focus is trapped inside, Escape closes, focus returns to the trigger."
      >
        <SubBlock id="modal-examples" title="Form and confirmation">
          <PreviewFrame>
            <Modal>
              <ModalTrigger asChild><Button>Edit project</Button></ModalTrigger>
              <ModalContent>
                <ModalHeader title="Edit project" description="Changes are visible to everyone on the team." />
                <ModalBody className="grid gap-gap-11">
                  <Input label="Project name" defaultValue="Studio Kit 2.0" />
                  <Input label="Description" optional />
                </ModalBody>
                <ModalFooter>
                  <ModalClose asChild><Button variant="secondary" appearance="border">Cancel</Button></ModalClose>
                  <Button>Save changes</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Modal>
              <ModalTrigger asChild><Button variant="danger" appearance="border">Delete project</Button></ModalTrigger>
              <ModalContent size="small" role="alertdialog">
                <ModalHeader title="Delete project?" description="This deletes 24 files and can't be undone." closeButton={false} />
                <ModalFooter>
                  <ModalClose asChild><Button variant="secondary" appearance="border">Cancel</Button></ModalClose>
                  <Button variant="danger">Delete project</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Tooltip ────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="tooltip"
        eyebrow="Overlays / 02"
        title="Tooltip"
        description="Figma Tooltip: Default (dark) or Inverse (light), with optional description. Shows on hover and keyboard focus."
      >
        <SubBlock id="tooltip-variants" title="Variants (hover or tab to each button)">
          <PreviewFrame>
            <Tooltip content="Edit"><IconButton appearance="border" icon={<Pencil />} aria-label="Edit" /></Tooltip>
            <Tooltip content="Edit" description="Rename or change the cover"><IconButton appearance="border" icon={<Pencil />} aria-label="Edit with description" /></Tooltip>
            <Tooltip content="Close" variant="inverse" side="bottom"><IconButton appearance="border" icon={<X />} aria-label="Close" /></Tooltip>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Dropdown Menu ──────────────────────────────────────────────────── */}
      <ComponentSection
        id="dropdown-menu"
        eyebrow="Overlays / 03"
        title="Dropdown Menu"
        description="Figma Dropdown Menu and Menu Item: actions (destructive last) or options behind a button. Arrow keys move, Enter activates, Escape closes and returns focus to the trigger."
      >
        <SubBlock id="dropdown-menu-actions" title="Row actions">
          <PreviewFrame>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton appearance="border" icon={<MoreHorizontal />} aria-label="More actions for order 1042" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem icon={<RotateCcw />}>Reorder</DropdownMenuItem>
                <DropdownMenuItem icon={<Download />} shortcut="⌘D">Download invoice</DropdownMenuItem>
                <DropdownMenuItem icon={<Copy />} description="Copies the order number">Copy order ID</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="danger" icon={<Trash2 />}>Cancel order</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="dropdown-menu-options" title="Options">
          <PreviewFrame>
            <MenuOptionsDemo />
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Toast ──────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="toast"
        eyebrow="Feedback / 02"
        title="Toast"
        description="Figma Toast: a short message after an action, with one action at most. Wrap the app in ToastProvider and call useToast().show()."
      >
        <SubBlock id="toast-variants" title="Emphasis and status">
          <PreviewFrame align="start">
            <div className="grid w-full gap-gap-7">
              <Toast status="positive" title="Changes saved" actionLabel="Undo" />
              <Toast status="neutral" title="Message archived" />
              <Toast status="error" title="Couldn't upload report.pdf" actionLabel="Retry" />
              <Toast emphasis="low" status="info" title="New version available" description="Reload to get the latest changes." actionLabel="Reload" />
            </div>
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="toast-live" title="Live">
          <PreviewFrame>
            <ToastProvider>
              <ToastDemo />
            </ToastProvider>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Table ──────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="table"
        eyebrow="Data display / 05"
        title="Table"
        description="Figma Column + Table Cell as real table markup: sortable headers, selectable rows, right-aligned tabular numbers."
      >
        <SubBlock id="table-default" title="Medium">
          <PreviewFrame align="start">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead numeric sort="descending">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell description="adam@example.com">Adam Smith</TableCell>
                  <TableCell><Badge status="positive" size="small">Paid</Badge></TableCell>
                  <TableCell numeric>$4,320.10</TableCell>
                </TableRow>
                <TableRow selected>
                  <TableCell description="bola@example.com">Bola Ade</TableCell>
                  <TableCell><Badge status="notice" size="small">Pending</Badge></TableCell>
                  <TableCell numeric>$990.59</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell description="chen@example.com">Chen Li</TableCell>
                  <TableCell><Badge status="negative" size="small">Overdue</Badge></TableCell>
                  <TableCell numeric>$120.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
      {/* ─── Divider ─────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="divider"
        eyebrow="Layout / 02"
        title="Divider"
        description="Figma Divider: Style (solid · dashed) × Weight (thin · default · bold) × Emphasis (base · strong · subtle), with an optional label. Use spacing first."
      >
        <SubBlock id="divider-variants" title="Weights, emphasis and labels">
          <PreviewFrame align="start">
            <div className="grid w-full gap-gap-9">
              <Divider />
              <Divider weight="default" emphasis="strong" />
              <Divider appearance="dashed" weight="bold" emphasis="subtle" />
              <Divider label="March" emphasis="subtle" />
              <Divider label="March" labelPosition="left" />
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Progress Bar ──────────────────────────────────────────────────── */}
      <ComponentSection
        id="progress-bar"
        eyebrow="Feedback / 03"
        title="Progress Bar"
        description="Figma Progress Bar: Type (line · circle) × Progress, plus Success and Error end states. The value is always shown as text too."
      >
        <SubBlock id="progress-bar-line" title="Line">
          <PreviewFrame align="start">
            <div className="grid w-full gap-gap-11">
              <ProgressBar label="Uploading report.pdf" value={60} description="2 of 5 files" />
              <ProgressBar label="Uploading report.pdf" status="success" description="All 5 files uploaded" />
              <ProgressBar label="Uploading report.pdf" value={50} status="danger" description="Upload stopped. Check your connection, then try again." />
            </div>
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="progress-bar-circle" title="Circle">
          <PreviewFrame>
            <ProgressBar type="circle" label="Profile setup" value={30} />
            <ProgressBar type="circle" label="Profile setup" value={80} />
            <ProgressBar type="circle" label="Profile setup" status="success" />
            <ProgressBar type="circle" label="Profile setup" status="danger" />
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Thumbnail ───────────────────────────────────────────────────────── */}
      <ComponentSection
        id="thumbnail"
        eyebrow="Data display / 06"
        title="Thumbnail"
        description="Figma Thumbnail: Type × Size (16 · 20 · 24 · 32 · 40px). Radius follows the size: Control/sm, then md, then lg. Decorative next to a file name."
      >
        <SubBlock id="thumbnail-types" title="Types">
          <PreviewFrame>
            <Thumbnail src="/avatars/sample-team.svg" alt="Team photo" />
            <Thumbnail type="pdf" alt="PDF file" />
            <Thumbnail type="spreadsheet" alt="Spreadsheet" />
            <Thumbnail type="document" alt="Document" />
            <Thumbnail type="video" alt="Video" />
            <Thumbnail type="picture" alt="Picture" />
            <Thumbnail type="icon" alt="Report" />
            <Thumbnail type="text" text="W" alt="Word document" />
            <Thumbnail type="logo" icon={<Mail />} alt="Mail app" />
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="thumbnail-sizes" title="Sizes">
          <PreviewFrame>
            {(["xsmall", "small", "medium", "large", "xlarge"] as const).map((size) => (
              <Thumbnail key={size} size={size} src="/avatars/sample-team.svg" alt={`Team photo, ${size}`} />
            ))}
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Link Button ─────────────────────────────────────────────────────── */}
      <ComponentSection
        id="link-button"
        eyebrow="Actions / 03"
        title="Link Button"
        description="Figma Link Button: Variant × Size (small · large). Its own component, not a Button style. Navigation renders a link with asChild; in-page actions render a button."
      >
        <SubBlock id="link-button-variants" title="Variants and sizes">
          <PreviewFrame>
            <LinkButton asChild suffixIcon={<ArrowRight />}><a href="#link-button">View all</a></LinkButton>
            <LinkButton variant="secondary">Forgot your password?</LinkButton>
            <LinkButton variant="danger">Remove card</LinkButton>
            <LinkButton variant="success" prefixIcon={<Plus />}>Add address</LinkButton>
            <LinkButton size="large">View invoice</LinkButton>
            <LinkButton disabled>Resend code</LinkButton>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

    </>
  );
}
