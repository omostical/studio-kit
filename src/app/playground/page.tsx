"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, type ButtonAppearance, type ButtonVariant } from "@/components/Button";
import { Badge, type BadgeStatus } from "@/components/Badge";
import { Input } from "@/components/Input";
import { Switch } from "@/components/Switch";
import { ArrowRight, Download } from "lucide-react";

// ── Code snippet ─────────────────────────────────────────────────────────────
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="overflow-hidden bg-static-fill-inverse-background text-static-text-inverse-strong">
      <div className="flex items-center justify-between border-b border-static-stroke-inverse-base px-gap-9 py-gap-6">
        <span className="font-code type-caption-medium text-static-text-inverse-subtle">JSX</span>
        <button onClick={copy} className="type-caption-medium text-static-text-inverse-subtle transition-colors hover:text-static-text-inverse-strong">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-gap-9 font-code text-300 leading-500">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── Controls ─────────────────────────────────────────────────────────────────
function ControlRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-gap-7 border-b border-static-stroke-subtle py-gap-6 last:border-0">
      <span className="type-caption-strong-medium text-static-text-base">{label}</span>
      <div className="flex flex-wrap items-center justify-end gap-gap-3">{children}</div>
    </div>
  );
}

function ToggleGroup<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <>
      {options.map((opt) => (
        <Button
          key={opt}
          size="xsmall"
          variant={value === opt ? "primary" : "secondary"}
          appearance={value === opt ? "filled" : "border"}
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
        >
          {opt}
        </Button>
      ))}
    </>
  );
}

function TextControl({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <Input size="small" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} wrapperClassName="w-36" aria-label={placeholder ?? "Value"} />;
}

function PlaygroundFrame({ preview, controls, code }: { preview: React.ReactNode; controls: React.ReactNode; code: string }) {
  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-container-lg border border-static-stroke-base lg:grid-cols-3">
      <div className="flex min-h-48 items-center justify-center bg-static-fill-background p-gap-18 lg:col-span-2">{preview}</div>
      <div className="border-static-stroke-base bg-static-fill-foreground p-gap-11 lg:border-l">
        <p className="mb-gap-7 type-caption-strong-medium uppercase text-static-text-subtle">Controls</p>
        {controls}
      </div>
      <div className="border-t border-static-stroke-base lg:col-span-3">
        <CodeBlock code={code} />
      </div>
    </div>
  );
}

// ── Button ───────────────────────────────────────────────────────────────────
function ButtonPlayground() {
  const [variant, setVariant] = useState<ButtonVariant>("primary");
  const [appearance, setAppearance] = useState<ButtonAppearance>("filled");
  const [size, setSize] = useState<"xsmall" | "small" | "medium" | "large">("medium");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [prefixIcon, setPrefixIcon] = useState(false);
  const [suffixIcon, setSuffixIcon] = useState(false);
  const [label, setLabel] = useState("Click me");

  const code = `<Button
  variant="${variant}"
  appearance="${appearance}"
  size="${size}"${loading ? "\n  loading" : ""}${disabled ? "\n  disabled" : ""}${prefixIcon ? "\n  prefixIcon={<Download />}" : ""}${suffixIcon ? "\n  suffixIcon={<ArrowRight />}" : ""}
>
  ${label}
</Button>`;

  return (
    <PlaygroundFrame
      code={code}
      preview={
        <div className={variant === "inverse" ? "rounded-container-md bg-static-fill-inverse-background p-gap-12" : ""}>
          <Button
            variant={variant}
            appearance={appearance}
            size={size}
            loading={loading}
            disabled={disabled}
            prefixIcon={prefixIcon ? <Download /> : undefined}
            suffixIcon={suffixIcon ? <ArrowRight /> : undefined}
          >
            {label}
          </Button>
        </div>
      }
      controls={
        <>
          <ControlRow label="Variant">
            <ToggleGroup options={["primary", "secondary", "danger", "success", "inverse"] as const} value={variant} onChange={setVariant} />
          </ControlRow>
          <ControlRow label="Style">
            <ToggleGroup options={["filled", "border", "ghost"] as const} value={appearance} onChange={setAppearance} />
          </ControlRow>
          <ControlRow label="Size">
            <ToggleGroup options={["xsmall", "small", "medium", "large"] as const} value={size} onChange={setSize} />
          </ControlRow>
          <ControlRow label="Label"><TextControl value={label} onChange={setLabel} placeholder="Label" /></ControlRow>
          <ControlRow label="Loading"><Switch size="small" checked={loading} onCheckedChange={setLoading} aria-label="Loading" /></ControlRow>
          <ControlRow label="Disabled"><Switch size="small" checked={disabled} onCheckedChange={setDisabled} aria-label="Disabled" /></ControlRow>
          <ControlRow label="Prefix icon"><Switch size="small" checked={prefixIcon} onCheckedChange={setPrefixIcon} aria-label="Prefix icon" /></ControlRow>
          <ControlRow label="Suffix icon"><Switch size="small" checked={suffixIcon} onCheckedChange={setSuffixIcon} aria-label="Suffix icon" /></ControlRow>
        </>
      }
    />
  );
}

// ── Badge ────────────────────────────────────────────────────────────────────
function BadgePlayground() {
  const [status, setStatus] = useState<BadgeStatus>("positive");
  const [emphasis, setEmphasis] = useState<"low" | "high">("low");
  const [shape, setShape] = useState<"round" | "square">("round");
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [label, setLabel] = useState("Active");

  const code = `<Badge status="${status}" emphasis="${emphasis}" shape="${shape}" size="${size}">\n  ${label}\n</Badge>`;
  return (
    <PlaygroundFrame
      code={code}
      preview={<Badge status={status} emphasis={emphasis} shape={shape} size={size}>{label}</Badge>}
      controls={
        <>
          <ControlRow label="Status">
            <ToggleGroup options={["negative", "notice", "positive", "info", "neutral"] as const} value={status} onChange={setStatus} />
          </ControlRow>
          <ControlRow label="Emphasis"><ToggleGroup options={["low", "high"] as const} value={emphasis} onChange={setEmphasis} /></ControlRow>
          <ControlRow label="Shape"><ToggleGroup options={["round", "square"] as const} value={shape} onChange={setShape} /></ControlRow>
          <ControlRow label="Size"><ToggleGroup options={["small", "medium", "large"] as const} value={size} onChange={setSize} /></ControlRow>
          <ControlRow label="Label"><TextControl value={label} onChange={setLabel} placeholder="Label" /></ControlRow>
        </>
      }
    />
  );
}

// ── Input ────────────────────────────────────────────────────────────────────
function InputPlayground() {
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [appearance, setAppearance] = useState<"border" | "ghost">("border");
  const [label, setLabel] = useState("Email address");
  const [placeholder, setPlaceholder] = useState("you@example.com");
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState("");
  const [optional, setOptional] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const code = `<Input
  size="${size}"${appearance !== "border" ? `\n  appearance="${appearance}"` : ""}${label ? `\n  label="${label}"` : ""}${optional ? "\n  optional" : ""}${placeholder ? `\n  placeholder="${placeholder}"` : ""}${helperText ? `\n  helperText="${helperText}"` : ""}${error ? `\n  error="${error}"` : ""}${disabled ? "\n  disabled" : ""}
/>`;

  return (
    <PlaygroundFrame
      code={code}
      preview={
        <div className="w-72">
          <Input
            size={size}
            appearance={appearance}
            label={label || undefined}
            optional={optional}
            placeholder={placeholder}
            helperText={helperText || undefined}
            error={error || undefined}
            disabled={disabled}
          />
        </div>
      }
      controls={
        <>
          <ControlRow label="Size"><ToggleGroup options={["small", "medium", "large"] as const} value={size} onChange={setSize} /></ControlRow>
          <ControlRow label="Style"><ToggleGroup options={["border", "ghost"] as const} value={appearance} onChange={setAppearance} /></ControlRow>
          <ControlRow label="Label"><TextControl value={label} onChange={setLabel} placeholder="Label" /></ControlRow>
          <ControlRow label="Placeholder"><TextControl value={placeholder} onChange={setPlaceholder} placeholder="Placeholder" /></ControlRow>
          <ControlRow label="Helper text"><TextControl value={helperText} onChange={setHelperText} placeholder="Helper text" /></ControlRow>
          <ControlRow label="Error"><TextControl value={error} onChange={setError} placeholder="Error" /></ControlRow>
          <ControlRow label="Optional"><Switch size="small" checked={optional} onCheckedChange={setOptional} aria-label="Optional" /></ControlRow>
          <ControlRow label="Disabled"><Switch size="small" checked={disabled} onCheckedChange={setDisabled} aria-label="Disabled" /></ControlRow>
        </>
      }
    />
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
const tabs = ["Button", "Badge", "Input"] as const;
type Tab = (typeof tabs)[number];

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Button");

  return (
    <div className="min-h-screen bg-static-fill-foreground text-static-text-strong">
      <header className="sticky top-0 z-50 border-b border-static-stroke-subtle bg-static-fill-foreground/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-gap-12">
          <div className="flex items-center gap-gap-9">
            <Link href="/" className="flex items-center gap-gap-5">
              <div className="flex size-7 items-center justify-center rounded-control-lg bg-dynamic-fill-primary-default">
                <span className="type-caption-strong-medium text-dynamic-text-onprimary-default">SK</span>
              </div>
              <span className="type-label-strong-small">Studio Kit</span>
            </Link>
            <span className="text-static-text-subtle">/</span>
            <span className="type-label-small text-static-text-subtle">Playground</span>
          </div>
          <nav className="hidden items-center gap-gap-12 md:flex">
            <Link href="/tokens" className="type-label-small text-static-text-subtle transition-colors hover:text-static-text-strong">Tokens</Link>
            <Link href="/components" className="type-label-small text-static-text-subtle transition-colors hover:text-static-text-strong">Components</Link>
            <Link href="/playground" aria-current="page" className="type-label-strong-small text-static-text-strong">Playground</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-gap-12 py-gap-18">
        <div className="mb-gap-16">
          <h1 className="mb-gap-7 type-title-small">Playground</h1>
          <p className="type-body-large text-static-text-subtle">Try the components live. Change props and copy the generated code.</p>
        </div>

        <div role="tablist" className="mb-gap-14 flex items-center gap-gap-3 border-b border-static-stroke-subtle">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`-mb-px border-b-2 px-gap-9 py-gap-6 type-label-strong-small transition-colors ${
                activeTab === tab
                  ? "border-dynamic-stroke-primary-strong-default text-dynamic-text-primary-default"
                  : "border-transparent text-static-text-subtle hover:text-static-text-strong"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Button" && <ButtonPlayground />}
        {activeTab === "Badge" && <BadgePlayground />}
        {activeTab === "Input" && <InputPlayground />}
      </div>
    </div>
  );
}
