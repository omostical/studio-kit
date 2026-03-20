import type { Meta, StoryObj } from "@storybook/react";
import {
  Plus, Trash2, Settings, Bell, Search,
  Download, Edit, X, Check, ArrowRight,
} from "lucide-react";
import { IconButton } from "@/components/ui";

const meta: Meta<typeof IconButton> = {
  title: "UI/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    "aria-label": "Action",
    icon: <Plus />,
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
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <IconButton variant="primary" aria-label="Add" icon={<Plus />} />
      <IconButton variant="secondary" aria-label="Settings" icon={<Settings />} />
      <IconButton variant="danger" aria-label="Delete" icon={<Trash2 />} />
      <IconButton variant="success" aria-label="Confirm" icon={<Check />} />
      <IconButton variant="ghost" aria-label="Search" icon={<Search />} />
    </div>
  ),
};

// ─── All Sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <IconButton size="lg" aria-label="Large" icon={<Bell />} />
      <IconButton size="md" aria-label="Medium" icon={<Bell />} />
      <IconButton size="sm" aria-label="Small" icon={<Bell />} />
      <IconButton size="xs" aria-label="X-Small" icon={<Bell />} />
    </div>
  ),
};

// ─── Variants × Sizes matrix ──────────────────────────────────────────────────

const variantIcons = {
  primary: <Plus />,
  secondary: <Settings />,
  danger: <Trash2 />,
  success: <Check />,
  ghost: <Search />,
} as const;

export const VariantMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["primary", "secondary", "danger", "success", "ghost"] as const).map(
        (variant) => (
          <div key={variant} className="flex flex-wrap gap-3 items-center">
            <span className="w-20 text-xs text-neutral-400 capitalize">{variant}</span>
            {(["lg", "md", "sm", "xs"] as const).map((size) => (
              <IconButton
                key={size}
                variant={variant}
                size={size}
                aria-label={`${variant} ${size}`}
                icon={variantIcons[variant]}
              />
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
      <IconButton variant="primary" aria-label="Add" icon={<Plus />} disabled />
      <IconButton variant="secondary" aria-label="Edit" icon={<Edit />} disabled />
      <IconButton variant="danger" aria-label="Delete" icon={<Trash2 />} disabled />
      <IconButton variant="success" aria-label="Confirm" icon={<Check />} disabled />
      <IconButton variant="ghost" aria-label="Search" icon={<Search />} disabled />
    </div>
  ),
};

// ─── Common Use Cases ─────────────────────────────────────────────────────────

export const CommonUseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs text-neutral-400 mb-3">Toolbar actions</p>
        <div className="flex gap-1">
          <IconButton variant="ghost" size="sm" aria-label="Edit" icon={<Edit />} />
          <IconButton variant="ghost" size="sm" aria-label="Download" icon={<Download />} />
          <IconButton variant="ghost" size="sm" aria-label="Settings" icon={<Settings />} />
          <IconButton variant="danger" size="sm" aria-label="Delete" icon={<Trash2 />} />
        </div>
      </div>
      <div>
        <p className="text-xs text-neutral-400 mb-3">Dismiss / close</p>
        <div className="flex gap-2">
          <IconButton variant="ghost" size="md" aria-label="Close" icon={<X />} />
          <IconButton variant="secondary" size="md" aria-label="Close" icon={<X />} />
        </div>
      </div>
      <div>
        <p className="text-xs text-neutral-400 mb-3">Navigation</p>
        <div className="flex gap-2">
          <IconButton variant="primary" size="lg" aria-label="Next" icon={<ArrowRight />} />
          <IconButton variant="secondary" size="lg" aria-label="Next" icon={<ArrowRight />} />
        </div>
      </div>
    </div>
  ),
};
