"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, type ButtonProps } from "@/components/Button";
import { Badge, type BadgeProps } from "@/components/Badge";
import { Input } from "@/components/Input";
import { Switch } from "@/components/Switch";
import { ArrowRight, Download } from "lucide-react";

// ── Code snippet helper ──────────────────────────────────────────────────────
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative rounded-xl bg-surface-inverse text-text-inverse overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-inverse">
        <span className="text-xs text-text-inverse-secondary font-mono">JSX</span>
        <button
          onClick={handleCopy}
          className="text-xs text-text-inverse-secondary hover:text-text-inverse transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── Control helpers ──────────────────────────────────────────────────────────
function ControlRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border-subtle last:border-0">
      <span className="text-xs font-medium text-text-secondary">{label}</span>
      <div className="flex items-center gap-1.5">{children}</div>
    </div>
  );
}

function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-2 py-1 text-xs rounded-md border transition-colors ${
            value === opt
              ? "bg-fill-brand text-text-on-brand border-border-brand"
              : "bg-surface text-text-secondary border-border hover:border-border-strong"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ── Button Playground ─────────────────────────────────────────────────────────
function ButtonPlayground() {
  const [variant, setVariant] = useState<NonNullable<ButtonProps["variant"]>>("primary");
  const [size, setSize] = useState<NonNullable<ButtonProps["size"]>>("md");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [prefixIcon, setPrefixIcon] = useState(false);
  const [suffixIcon, setSuffixIcon] = useState(false);
  const [label, setLabel] = useState("Click me");

  const code = `<Button
  variant="${variant}"
  size="${size}"${loading ? "\n  loading" : ""}${disabled ? "\n  disabled" : ""}${prefixIcon ? '\n  prefixIcon={<Download />}' : ""}${suffixIcon ? '\n  suffixIcon={<ArrowRight />}' : ""}
>
  ${label}
</Button>`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-2xl border border-border overflow-hidden">
      {/* Preview */}
      <div className="lg:col-span-2 bg-canvas flex items-center justify-center p-12 min-h-48">
        <Button
          variant={variant}
          size={size}
          loading={loading}
          disabled={disabled}
          prefixIcon={prefixIcon ? <Download /> : undefined}
          suffixIcon={suffixIcon ? <ArrowRight /> : undefined}
        >
          {label}
        </Button>
      </div>
      {/* Controls */}
      <div className="bg-surface border-l border-border p-5">
        <p className="text-xs font-semibold text-text-subtle uppercase tracking-wider mb-3">Controls</p>
        <ControlRow label="Variant">
          <ToggleGroup
            options={["primary", "secondary", "danger", "success", "ghost"] as const}
            value={variant}
            onChange={setVariant}
          />
        </ControlRow>
        <ControlRow label="Size">
          <ToggleGroup
            options={["xs", "sm", "md", "lg"] as const}
            value={size}
            onChange={setSize}
          />
        </ControlRow>
        <ControlRow label="Label">
          <input
            className="text-xs border border-border rounded-md px-2 py-1 w-28 focus:outline-none focus:border-border-brand"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </ControlRow>
        <ControlRow label="Loading">
          <Switch size="sm" checked={loading} onCheckedChange={setLoading} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch size="sm" checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
        <ControlRow label="Prefix icon">
          <Switch size="sm" checked={prefixIcon} onCheckedChange={setPrefixIcon} />
        </ControlRow>
        <ControlRow label="Suffix icon">
          <Switch size="sm" checked={suffixIcon} onCheckedChange={setSuffixIcon} />
        </ControlRow>
      </div>
      {/* Code */}
      <div className="lg:col-span-3 border-t border-border">
        <CodeBlock code={code} />
      </div>
    </div>
  );
}

// ── Badge Playground ──────────────────────────────────────────────────────────
function BadgePlayground() {
  const [variant, setVariant] = useState<NonNullable<BadgeProps["variant"]>>("brand");
  const [size, setSize] = useState<NonNullable<BadgeProps["size"]>>("md");
  const [dot, setDot] = useState(false);
  const [label, setLabel] = useState("Status");

  const code = `<Badge variant="${variant}" size="${size}"${dot ? " dot" : ""}>\n  ${label}\n</Badge>`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-2xl border border-border overflow-hidden">
      <div className="lg:col-span-2 bg-canvas flex items-center justify-center p-12 min-h-48">
        <Badge variant={variant} size={size} dot={dot}>
          {label}
        </Badge>
      </div>
      <div className="bg-surface border-l border-border p-5">
        <p className="text-xs font-semibold text-text-subtle uppercase tracking-wider mb-3">Controls</p>
        <ControlRow label="Variant">
          <ToggleGroup
            options={["default", "brand", "success", "warning", "danger", "outline"] as const}
            value={variant}
            onChange={setVariant}
          />
        </ControlRow>
        <ControlRow label="Size">
          <ToggleGroup options={["sm", "md", "lg"] as const} value={size} onChange={setSize} />
        </ControlRow>
        <ControlRow label="Label">
          <input
            className="text-xs border border-border rounded-md px-2 py-1 w-28 focus:outline-none focus:border-border-brand"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </ControlRow>
        <ControlRow label="Dot indicator">
          <Switch size="sm" checked={dot} onCheckedChange={setDot} />
        </ControlRow>
      </div>
      <div className="lg:col-span-3 border-t border-border">
        <CodeBlock code={code} />
      </div>
    </div>
  );
}

// ── Input Playground ──────────────────────────────────────────────────────────
function InputPlayground() {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [label, setLabel] = useState("Email address");
  const [placeholder, setPlaceholder] = useState("you@example.com");
  const [hint, setHint] = useState("");
  const [error, setError] = useState("");
  const [optional, setOptional] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const code = `<Input
  size="${size}"${label ? `\n  label="${label}"` : ""}${optional ? "\n  optional" : ""}${placeholder ? `\n  placeholder="${placeholder}"` : ""}${hint ? `\n  hint="${hint}"` : ""}${error ? `\n  error="${error}"` : ""}${disabled ? "\n  disabled" : ""}
/>`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-2xl border border-border overflow-hidden">
      <div className="lg:col-span-2 bg-canvas flex items-center justify-center p-12 min-h-48">
        <div className="w-72">
          <Input
            size={size}
            label={label || undefined}
            optional={optional}
            placeholder={placeholder}
            hint={hint || undefined}
            error={error || undefined}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="bg-surface border-l border-border p-5">
        <p className="text-xs font-semibold text-text-subtle uppercase tracking-wider mb-3">Controls</p>
        <ControlRow label="Size">
          <ToggleGroup options={["sm", "md", "lg"] as const} value={size} onChange={setSize} />
        </ControlRow>
        <ControlRow label="Label">
          <input
            className="text-xs border border-border rounded-md px-2 py-1 w-28 focus:outline-none focus:border-border-brand"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </ControlRow>
        <ControlRow label="Placeholder">
          <input
            className="text-xs border border-border rounded-md px-2 py-1 w-28 focus:outline-none focus:border-border-brand"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
          />
        </ControlRow>
        <ControlRow label="Hint">
          <input
            className="text-xs border border-border rounded-md px-2 py-1 w-28 focus:outline-none focus:border-border-brand"
            value={hint}
            placeholder="Optional hint"
            onChange={(e) => setHint(e.target.value)}
          />
        </ControlRow>
        <ControlRow label="Error">
          <input
            className="text-xs border border-border rounded-md px-2 py-1 w-28 focus:outline-none focus:border-border-brand"
            value={error}
            placeholder="Optional error"
            onChange={(e) => setError(e.target.value)}
          />
        </ControlRow>
        <ControlRow label="Optional">
          <Switch size="sm" checked={optional} onCheckedChange={setOptional} />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch size="sm" checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </div>
      <div className="lg:col-span-3 border-t border-border">
        <CodeBlock code={code} />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
const tabs = ["Button", "Badge", "Input"] as const;
type Tab = (typeof tabs)[number];

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Button");

  return (
    <div className="min-h-screen bg-surface">
      {/* Nav */}
      <header className="border-b border-border-subtle sticky top-0 bg-surface/80 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-7 rounded-lg bg-fill-brand flex items-center justify-center">
                <span className="text-text-on-brand text-xs font-bold">SK</span>
              </div>
              <span className="text-sm font-semibold text-text-primary">Studio Kit</span>
            </Link>
            <span className="text-text-disabled">/</span>
            <span className="text-sm text-text-tertiary">Playground</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tokens" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">Tokens</Link>
            <Link href="/components" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">Components</Link>
            <Link href="/playground" className="text-sm font-medium text-text-primary">Playground</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-text-primary mb-3">Playground</h1>
          <p className="text-lg text-text-tertiary">
            Interact with components live. Tweak props and copy the generated code snippet.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 mb-8 border-b border-border-subtle">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab
                  ? "border-border-brand text-text-brand"
                  : "border-transparent text-text-tertiary hover:text-text-primary"
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
