"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, type ButtonProps } from "@/components/Button";
import { Badge, type BadgeProps } from "@/components/Badge";
import { Input } from "@/components/Input";
import { Switch } from "@/components/Switch";
import { ArrowRight, Download, Plus, Trash2 } from "lucide-react";

// ── Code snippet helper ──────────────────────────────────────────────────────
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative rounded-xl bg-neutral-900 text-neutral-100 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800">
        <span className="text-xs text-neutral-500 font-mono">JSX</span>
        <button
          onClick={handleCopy}
          className="text-xs text-neutral-400 hover:text-white transition-colors"
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
    <div className="flex items-center justify-between py-2.5 border-b border-neutral-100 last:border-0">
      <span className="text-xs font-medium text-neutral-600">{label}</span>
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
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
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
  const [iconLeft, setIconLeft] = useState(false);
  const [iconRight, setIconRight] = useState(false);
  const [label, setLabel] = useState("Click me");

  const code = `<Button
  variant="${variant}"
  size="${size}"${loading ? "\n  loading" : ""}${disabled ? "\n  disabled" : ""}${iconLeft ? '\n  iconLeft={<Download />}' : ""}${iconRight ? '\n  iconRight={<ArrowRight />}' : ""}
>
  ${label}
</Button>`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-2xl border border-neutral-200 overflow-hidden">
      {/* Preview */}
      <div className="lg:col-span-2 bg-neutral-50 flex items-center justify-center p-12 min-h-48">
        <Button
          variant={variant}
          size={size}
          loading={loading}
          disabled={disabled}
          iconLeft={iconLeft ? <Download /> : undefined}
          iconRight={iconRight ? <ArrowRight /> : undefined}
        >
          {label}
        </Button>
      </div>
      {/* Controls */}
      <div className="bg-white border-l border-neutral-200 p-5">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Controls</p>
        <ControlRow label="Variant">
          <ToggleGroup
            options={["primary", "secondary", "outline", "ghost", "danger", "link"] as const}
            value={variant}
            onChange={setVariant}
          />
        </ControlRow>
        <ControlRow label="Size">
          <ToggleGroup
            options={["xs", "sm", "md", "lg", "xl"] as const}
            value={size}
            onChange={setSize}
          />
        </ControlRow>
        <ControlRow label="Label">
          <input
            className="text-xs border border-neutral-200 rounded-md px-2 py-1 w-28 focus:outline-none focus:border-indigo-400"
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
        <ControlRow label="Icon left">
          <Switch size="sm" checked={iconLeft} onCheckedChange={setIconLeft} />
        </ControlRow>
        <ControlRow label="Icon right">
          <Switch size="sm" checked={iconRight} onCheckedChange={setIconRight} />
        </ControlRow>
      </div>
      {/* Code */}
      <div className="lg:col-span-3 border-t border-neutral-200">
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="lg:col-span-2 bg-neutral-50 flex items-center justify-center p-12 min-h-48">
        <Badge variant={variant} size={size} dot={dot}>
          {label}
        </Badge>
      </div>
      <div className="bg-white border-l border-neutral-200 p-5">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Controls</p>
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
            className="text-xs border border-neutral-200 rounded-md px-2 py-1 w-28 focus:outline-none focus:border-indigo-400"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </ControlRow>
        <ControlRow label="Dot indicator">
          <Switch size="sm" checked={dot} onCheckedChange={setDot} />
        </ControlRow>
      </div>
      <div className="lg:col-span-3 border-t border-neutral-200">
        <CodeBlock code={code} />
      </div>
    </div>
  );
}

// ── Input Playground ──────────────────────────────────────────────────────────
function InputPlayground() {
  const [variant, setVariant] = useState<"default" | "error" | "success">("default");
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [label, setLabel] = useState("Email address");
  const [placeholder, setPlaceholder] = useState("you@example.com");
  const [hint, setHint] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const code = `<Input
  variant="${variant}"
  size="${size}"${label ? `\n  label="${label}"` : ""}${placeholder ? `\n  placeholder="${placeholder}"` : ""}${hint ? `\n  hint="${hint}"` : ""}${error ? `\n  error="${error}"` : ""}${disabled ? "\n  disabled" : ""}
/>`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="lg:col-span-2 bg-neutral-50 flex items-center justify-center p-12 min-h-48">
        <div className="w-72">
          <Input
            variant={variant}
            size={size}
            label={label || undefined}
            placeholder={placeholder}
            hint={hint || undefined}
            error={error || undefined}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="bg-white border-l border-neutral-200 p-5">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">Controls</p>
        <ControlRow label="Variant">
          <ToggleGroup
            options={["default", "error", "success"] as const}
            value={variant}
            onChange={setVariant}
          />
        </ControlRow>
        <ControlRow label="Size">
          <ToggleGroup options={["sm", "md", "lg", "xl"] as const} value={size} onChange={setSize} />
        </ControlRow>
        <ControlRow label="Label">
          <input
            className="text-xs border border-neutral-200 rounded-md px-2 py-1 w-28 focus:outline-none focus:border-indigo-400"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </ControlRow>
        <ControlRow label="Placeholder">
          <input
            className="text-xs border border-neutral-200 rounded-md px-2 py-1 w-28 focus:outline-none focus:border-indigo-400"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
          />
        </ControlRow>
        <ControlRow label="Hint">
          <input
            className="text-xs border border-neutral-200 rounded-md px-2 py-1 w-28 focus:outline-none focus:border-indigo-400"
            value={hint}
            placeholder="Optional hint"
            onChange={(e) => setHint(e.target.value)}
          />
        </ControlRow>
        <ControlRow label="Error">
          <input
            className="text-xs border border-neutral-200 rounded-md px-2 py-1 w-28 focus:outline-none focus:border-indigo-400"
            value={error}
            placeholder="Optional error"
            onChange={(e) => setError(e.target.value)}
          />
        </ControlRow>
        <ControlRow label="Disabled">
          <Switch size="sm" checked={disabled} onCheckedChange={setDisabled} />
        </ControlRow>
      </div>
      <div className="lg:col-span-3 border-t border-neutral-200">
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
            <span className="text-sm text-neutral-500">Playground</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tokens" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Tokens</Link>
            <Link href="/components" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Components</Link>
            <Link href="/playground" className="text-sm font-medium text-neutral-900">Playground</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">Playground</h1>
          <p className="text-lg text-neutral-500">
            Interact with components live. Tweak props and copy the generated code snippet.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 mb-8 border-b border-neutral-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
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
