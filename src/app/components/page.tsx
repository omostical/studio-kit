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
import { Search as SearchField } from "@/components/Search";
import { Slider } from "@/components/Slider";
import { SegmentedControl, SegmentedControlItem } from "@/components/SegmentedControl";
import { CheckboxGroup } from "@/components/CheckboxGroup";
import { TextArea } from "@/components/TextArea";
import { RadioButton } from "@/components/RadioButton";
import { RadioGroup } from "@/components/RadioGroup";
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
import { Search, Mail, List, LayoutGrid, ArrowRight, Plus, Eye, Pencil, X, MoreHorizontal, RotateCcw, Download, Copy, Trash2, Folder, Home, BarChart3 } from "lucide-react";
import { Divider } from "@/components/Divider";
import { ProgressBar } from "@/components/ProgressBar";
import { Thumbnail } from "@/components/Thumbnail";
import { LinkButton } from "@/components/LinkButton";
import { Chip } from "@/components/Chip";
import { AvatarGroup } from "@/components/AvatarGroup";
import { SplitButton } from "@/components/SplitButton";
import { Breadcrumbs, BreadcrumbItem } from "@/components/Breadcrumbs";
import { Pagination, type PaginationType } from "@/components/Pagination";
import { ProgressStepper, ProgressStep } from "@/components/ProgressStepper";
import { Accordion, AccordionGroup } from "@/components/Accordion";
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
function ChipDemo() {
  const [filters, setFilters] = useState<Record<string, boolean>>({ Paid: true, Pending: false, Failed: false });
  const [tags, setTags] = useState(["Design", "Research", "Billing"]);
  return (
    <div className="grid gap-gap-9">
      <div className="flex flex-wrap gap-gap-5" role="group" aria-label="Filter by status">
        {Object.keys(filters).map((k) => (
          <Chip key={k} pressed={filters[k]} onPressedChange={(p) => setFilters({ ...filters, [k]: p })}>{k}</Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-gap-5">
        {tags.map((t) => (
          <Chip key={t} appearance="border" onRemove={() => setTags(tags.filter((x) => x !== t))}>{t}</Chip>
        ))}
      </div>
    </div>
function PaginationDemo({ type, pageCount }: { type: PaginationType; pageCount: number }) {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  return (
    <Pagination
      className="w-full"
      type={type}
      page={page}
      pageCount={pageCount}
      onPageChange={setPage}
      rowsPerPage={rows}
      onRowsPerPageChange={(n) => {
        setRows(n);
        setPage(1);
      }}
    />
  );
}

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

      {/* ─── Radio Button ───────────────────────────────────────────────────── */}
      <ComponentSection
        id="radio-button"
        eyebrow="Form / 05"
        title="Radio Button"
        description="One option of a set where exactly one can be chosen. Always inside a Radio Group, which holds the value and the label."
      >
        <SubBlock id="radio-button-states" title="Types, sizes and states">
          <PreviewFrame align="start">
            <RadioGroup aria-label="Radio button states" defaultValue="selected" className="grid grid-cols-1 gap-gap-9 sm:grid-cols-3">
              <RadioButton value="unselected" label="Unselected" description="Helper description" />
              <RadioButton value="selected" label="Selected" />
              <RadioButton value="small" size="small" label="Small" />
              <RadioButton value="disabled" label="Disabled" disabled />
              <RadioButton value="danger" variant="danger" label="Danger" />
            </RadioGroup>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Radio Group ────────────────────────────────────────────────────── */}
      <ComponentSection
        id="radio-group"
        eyebrow="Form / 06"
        title="Radio Group"
        description="A labelled set of 2–5 options where exactly one can be chosen. Arrow keys move the selection; use Select for longer lists."
      >
        <SubBlock id="radio-group-orientation" title="Orientation">
          <PreviewFrame align="start">
            <div className="grid w-full gap-gap-12 sm:grid-cols-2">
              <RadioGroup label="Billing period" helperText="You can change this later." defaultValue="monthly">
                <RadioButton value="monthly" label="Monthly" />
                <RadioButton value="yearly" label="Yearly" description="Two months free." />
                <RadioButton value="custom" label="Custom" />
              </RadioGroup>
              <RadioGroup label="Team size" orientation="horizontal" error="Choose a team size to continue.">
                <RadioButton value="1" label="Just me" />
                <RadioButton value="10" label="2–10" />
                <RadioButton value="50" label="11–50" />
              </RadioGroup>
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Text Area ──────────────────────────────────────────────────────── */}
      <ComponentSection
        id="text-area"
        eyebrow="Form / 07"
        title="Text Area"
        description="Multi-line text with the same label, helper text and error as Input. Size it with rows; people can drag it taller."
      >
        <SubBlock id="text-area-states" title="States and sizes">
          <PreviewFrame align="start">
            <div className="grid w-full gap-gap-9 sm:grid-cols-2">
              <TextArea label="Message" placeholder="Tell us what happened" helperText="Up to 500 characters." />
              <TextArea label="Note" optional defaultValue="Delivered to the side door." size="small" />
              <TextArea label="Description" error="Describe the problem so we can reproduce it." />
              <TextArea label="Disabled" disabled defaultValue="Read-only note" size="large" />
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Checkbox Group ─────────────────────────────────────────────────── */}
      <ComponentSection
        id="checkbox-group"
        eyebrow="Form / 08"
        title="Checkbox Group"
        description="A labelled list of checkboxes where people pick any number. Renders a fieldset with a legend; use Multi Select for long lists."
      >
        <SubBlock id="checkbox-group-orientation" title="Orientation">
          <PreviewFrame align="start">
            <div className="grid w-full gap-gap-12 sm:grid-cols-2">
              <CheckboxGroup label="Notify me by" helperText="Pick all that apply.">
                <Checkbox label="Email" defaultChecked />
                <Checkbox label="SMS" />
                <Checkbox label="Push notification" />
              </CheckboxGroup>
              <CheckboxGroup label="Channels" orientation="horizontal" error="Choose at least one channel.">
                <Checkbox label="Web" />
                <Checkbox label="iOS" />
                <Checkbox label="Android" />
              </CheckboxGroup>
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Segmented Control ──────────────────────────────────────────────── */}
      <ComponentSection
        id="segmented-control"
        eyebrow="Form / 09"
        title="Segmented Control"
        description="2–5 options that switch the view or mode of the same content right away. Use Tabs for sections and Radio Group in forms."
      >
        <SubBlock id="segmented-control-sizes" title="Sizes, full width and icons">
          <PreviewFrame align="start">
            <div className="flex w-full flex-col items-start gap-gap-9">
              <SegmentedControl aria-label="Period, small" size="small" defaultValue="week">
                <SegmentedControlItem value="day">Day</SegmentedControlItem>
                <SegmentedControlItem value="week">Week</SegmentedControlItem>
                <SegmentedControlItem value="month">Month</SegmentedControlItem>
              </SegmentedControl>
              <SegmentedControl aria-label="Period" defaultValue="week">
                <SegmentedControlItem value="day">Day</SegmentedControlItem>
                <SegmentedControlItem value="week">Week</SegmentedControlItem>
                <SegmentedControlItem value="month">Month</SegmentedControlItem>
                <SegmentedControlItem value="year" disabled>Year</SegmentedControlItem>
              </SegmentedControl>
              <SegmentedControl aria-label="Period, large" size="large" variant="full-width" defaultValue="month">
                <SegmentedControlItem value="day">Day</SegmentedControlItem>
                <SegmentedControlItem value="week">Week</SegmentedControlItem>
                <SegmentedControlItem value="month">Month</SegmentedControlItem>
              </SegmentedControl>
              <SegmentedControl aria-label="Layout" defaultValue="list">
                <SegmentedControlItem value="list" icon={<List />} aria-label="List view" />
                <SegmentedControlItem value="grid" icon={<LayoutGrid />} aria-label="Grid view" />
              </SegmentedControl>
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Slider ─────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="slider"
        eyebrow="Form / 10"
        title="Slider"
        description="Picks a value or a range by dragging. Arrow keys step; add inputs when people need an exact value."
      >
        <SubBlock id="slider-labels" title="Labels, range and inputs">
          <PreviewFrame align="start">
            <div className="grid w-full gap-gap-12 sm:grid-cols-2">
              <Slider label="Volume" defaultValue={[40]} />
              <Slider label="Price" defaultValue={[20, 80]} minLabel="$0" maxLabel="$100" labelPosition="bottom" />
              <Slider label="Budget" defaultValue={[25, 75]} labelPosition="inputs" />
              <Slider label="Disabled" defaultValue={[60]} disabled />
            </div>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Search ─────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="search"
        eyebrow="Form / 11"
        title="Search"
        description="Input with a search icon, a clear button and an optional shortcut hint, in a search landmark. Say what's searchable in the label."
      >
        <SubBlock id="search-states" title="States and styles">
          <PreviewFrame align="start">
            <div className="grid w-full gap-gap-9 sm:grid-cols-2">
              <SearchField label="Search projects" shortcut="⌘K" />
              <SearchField label="Search members" defaultValue="Ada" />
              <SearchField label="Filter rows" appearance="ghost" size="small" />
              <SearchField label="Search invoices" hideLabel={false} size="large" disabled />
            </div>
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
      {/* ─── Breadcrumbs ────────────────────────────────────────────────────── */}
      <ComponentSection
        id="breadcrumbs"
        eyebrow="Navigation / 02"
        title="Breadcrumbs"
        description="Figma Breadcrumbs and Breadcrumb Item: the trail from the top level to the current page. The last item is the current page (not a link); long trails collapse the middle into a … button."
      >
        <SubBlock id="breadcrumbs-separators" title="Separator">
          <PreviewFrame align="start">
            <div className="grid gap-gap-7">
              {(["arrow", "slash"] as const).map((separator) => (
                <Breadcrumbs key={separator} separator={separator}>
                  <BreadcrumbItem href="#breadcrumbs" icon={<Folder />}>Projects</BreadcrumbItem>
                  <BreadcrumbItem href="#breadcrumbs">Website redesign</BreadcrumbItem>
                  <BreadcrumbItem href="#breadcrumbs">Assets</BreadcrumbItem>
                  <BreadcrumbItem>Logo files</BreadcrumbItem>
                </Breadcrumbs>
              ))}
            </div>
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="breadcrumbs-collapsed" title="Long trail">
          <PreviewFrame align="start">
            <Breadcrumbs>
              {["Workspace", "Projects", "Website redesign", "Assets", "Brand", "Logo files"].map((label, i, all) => (
                <BreadcrumbItem key={label} href={i < all.length - 1 ? "#breadcrumbs" : undefined} icon={i === 0 ? <Home /> : undefined}>
                  {label}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Pagination ─────────────────────────────────────────────────────── */}
      <ComponentSection
        id="pagination"
        eyebrow="Navigation / 03"
        title="Pagination"
        description="Figma Pagination: Less numbers (5 slots), More numbers (9 slots) or Overflow (a page picker), with an optional Rows per page control. Page buttons are named “Page 3”; the current one has aria-current."
      >
        <SubBlock id="pagination-types" title="Type">
          <PreviewFrame align="start">
            <div className="grid w-full gap-gap-9">
              <PaginationDemo type="less-numbers" pageCount={5} />
              <PaginationDemo type="more-numbers" pageCount={99} />
              <PaginationDemo type="overflow" pageCount={45} />
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
      {/* ─── Progress Stepper ───────────────────────────────────────────────── */}
      <ComponentSection
        id="progress-stepper"
        eyebrow="Navigation / 04"
        title="Progress Stepper"
        description="Figma Progress Stepper: the steps of a flow as an ordered list. The current step has aria-current=“step”; each step says its state in text. Completed steps can link back."
      >
        <SubBlock id="progress-stepper-horizontal" title="Horizontal">
          <PreviewFrame align="start">
            <ProgressStepper className="max-w-full">
              <ProgressStep type="completed" label="Account" href="#progress-stepper" />
              <ProgressStep type="active" label="Plan" />
              <ProgressStep label="Billing" />
              <ProgressStep label="Team" />
              <ProgressStep label="Review" />
            </ProgressStepper>
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="progress-stepper-vertical" title="Vertical, with a step to fix">
          <PreviewFrame align="start">
            <ProgressStepper position="vertical" className="w-full max-w-sm">
              <ProgressStep type="completed" label="Account" description="ada@example.com" href="#progress-stepper" />
              <ProgressStep type="danger" label="Billing" description="Add a payment method to continue" href="#progress-stepper" />
              <ProgressStep type="active" label="Team" />
              <ProgressStep label="Review" disabled />
            </ProgressStepper>
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

      {/* ─── Chip ────────────────────────────────────────────────────────────── */}
      <ComponentSection
        id="chip"
        eyebrow="Data display / 07"
        title="Chip"
        description="Figma Chip: Variant × Style × Size, with a prefix and a remove ×. Filter chips toggle (aria-pressed); input chips have a Remove button. Use Tag for read-only labels."
      >
        <SubBlock id="chip-kinds" title="Filter and removable">
          <PreviewFrame>
            <ChipDemo />
          </PreviewFrame>
        </SubBlock>
        <SubBlock id="chip-sizes" title="Sizes and styles">
          <PreviewFrame>
            <Chip size="small">Small</Chip>
            <Chip>Medium</Chip>
            <Chip size="large" prefix={<Search />}>Large</Chip>
            <Chip variant="primary" appearance="border">Border</Chip>
            <Chip disabled>Disabled</Chip>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Avatar Group ────────────────────────────────────────────────────── */}
      <ComponentSection
        id="avatar-group"
        eyebrow="Data display / 08"
        title="Avatar Group"
        description="Figma Avatar Group: Layout (row · grid) × Size, with a +N counter when there are more people. Name the group with its total."
      >
        <SubBlock id="avatar-group-row" title="Row and grid">
          <PreviewFrame>
            {(["xsmall", "small", "medium", "large"] as const).map((size) => (
              <AvatarGroup key={size} size={size} aria-label="12 members" total={12}>
                <Avatar src="/avatars/sample-person.svg" name="Ada Lovelace" />
                <Avatar name="Grace Hopper" />
                <Avatar name="Alan Turing" />
                <Avatar name="Katherine Johnson" />
              </AvatarGroup>
            ))}
            <AvatarGroup layout="grid" aria-label="8 members" total={8} onMoreClick={() => {}} moreLabel="Show all 8 members">
              <Avatar src="/avatars/sample-person.svg" name="Ada Lovelace" />
              <Avatar name="Grace Hopper" />
              <Avatar name="Alan Turing" />
            </AvatarGroup>
          </PreviewFrame>
        </SubBlock>
      </ComponentSection>

      {/* ─── Split Button ────────────────────────────────────────────────────── */}
      <ComponentSection
        id="split-button"
        eyebrow="Actions / 04"
        title="Split Button"
        description="Figma Split Button: Variant × Style (filled · border) × Size. The main part runs the common action; the arrow opens a menu of related alternatives."
      >
        <SubBlock id="split-button-variants" title="Styles and sizes">
          <PreviewFrame>
            <SplitButton menuLabel="More save options" menu={<><DropdownMenuItem>Save as draft</DropdownMenuItem><DropdownMenuItem>Save and duplicate</DropdownMenuItem></>}>Save</SplitButton>
            <SplitButton variant="secondary" appearance="border" size="small" prefixIcon={<Download />} menuLabel="More export options" menu={<><DropdownMenuItem>Export as PDF</DropdownMenuItem><DropdownMenuItem>Export as CSV</DropdownMenuItem></>}>Export</SplitButton>
            <SplitButton variant="secondary" size="large" menuLabel="More send options" menu={<DropdownMenuItem>Schedule send</DropdownMenuItem>}>Send</SplitButton>
          </PreviewFrame>
        </SubBlock>
      {/* ─── Accordion ──────────────────────────────────────────────────────── */}
      <ComponentSection
        id="accordion"
        eyebrow="Navigation / 05"
        title="Accordion"
        description="Figma Accordion and Accordion Group: headings that expand a section. Each heading is a button with aria-expanded; Enter and Space toggle, arrow keys move between headings."
      >
        {[true, false].map((contained) => (
          <SubBlock key={String(contained)} id={contained ? "accordion-contained" : "accordion-dividers"} title={contained ? "Contained" : "Dividers"}>
            <PreviewFrame align="start">
              <AccordionGroup contained={contained} className="w-full max-w-md" defaultValue={contained ? ["breathe"] : []}>
                <Accordion value="breathe" title="Quick way to de-stress in 2 minutes?" icon={<BarChart3 />}>
                  Breathe in for 4 seconds, hold for 4, breathe out for 4, hold for 4. Do it 4 times.
                  <Button variant="secondary" size="small">Start a timer</Button>
                </Accordion>
                <Accordion value="plan" title="Can I change my plan later?" icon={<BarChart3 />}>
                  Yes. Plan changes apply from your next billing date.
                </Accordion>
                <Accordion value="advanced" title="Advanced settings" icon={<BarChart3 />} disabled>
                  Not available on your plan.
                </Accordion>
              </AccordionGroup>
            </PreviewFrame>
          </SubBlock>
        ))}
      </ComponentSection>

    </>
  );
}
