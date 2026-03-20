import type { Meta, StoryObj } from "@storybook/react";
import { Plus, ArrowRight, Trash2, Check, Download } from "lucide-react";
import { Button } from "@/components/ui";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "success", "ghost"],
    },
    size: {
      control: "select",
      options: ["lg", "md", "sm", "xs"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

// ─── All Sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button size="lg">Large</Button>
      <Button size="md">Medium</Button>
      <Button size="sm">Small</Button>
      <Button size="xs">X-Small</Button>
    </div>
  ),
};

// ─── Variants × Sizes matrix ──────────────────────────────────────────────────

export const VariantMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["primary", "secondary", "danger", "success", "ghost"] as const).map(
        (variant) => (
          <div key={variant} className="flex flex-wrap gap-3 items-center">
            <span className="w-20 text-xs text-neutral-400 capitalize">{variant}</span>
            {(["lg", "md", "sm", "xs"] as const).map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size.toUpperCase()}
              </Button>
            ))}
          </div>
        )
      )}
    </div>
  ),
};

// ─── Disabled States ──────────────────────────────────────────────────────────

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="danger" disabled>Danger</Button>
      <Button variant="success" disabled>Success</Button>
      <Button variant="ghost" disabled>Ghost</Button>
    </div>
  ),
};

// ─── Loading State ────────────────────────────────────────────────────────────

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" loading>Saving…</Button>
      <Button variant="secondary" loading>Loading…</Button>
      <Button variant="danger" loading>Deleting…</Button>
      <Button variant="success" loading>Submitting…</Button>
      <Button variant="ghost" loading>Working…</Button>
    </div>
  ),
};

// ─── With Prefix Icon ─────────────────────────────────────────────────────────

export const WithPrefixIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" size="lg" prefixIcon={<Plus />}>New Item</Button>
      <Button variant="secondary" size="md" prefixIcon={<Download />}>Export</Button>
      <Button variant="success" size="sm" prefixIcon={<Check />}>Confirm</Button>
      <Button variant="danger" size="xs" prefixIcon={<Trash2 />}>Delete</Button>
    </div>
  ),
};

// ─── With Suffix Icon ─────────────────────────────────────────────────────────

export const WithSuffixIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" size="lg" suffixIcon={<ArrowRight />}>Continue</Button>
      <Button variant="secondary" size="md" suffixIcon={<ArrowRight />}>Next Step</Button>
      <Button variant="ghost" size="sm" suffixIcon={<ArrowRight />}>Learn More</Button>
    </div>
  ),
};

// ─── With Both Icons ──────────────────────────────────────────────────────────

export const WithBothIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" prefixIcon={<Download />} suffixIcon={<ArrowRight />}>
        Download Report
      </Button>
      <Button variant="secondary" prefixIcon={<Plus />} suffixIcon={<ArrowRight />}>
        Add and Continue
      </Button>
    </div>
  ),
};
