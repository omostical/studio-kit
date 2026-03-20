import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "@/components/ui";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "Accept terms and conditions",
    variant: "primary",
    size: "lg",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "danger"],
    },
    size: {
      control: "select",
      options: ["lg", "sm"],
    },
    checked: {
      control: "select",
      options: [false, true, "indeterminate"],
    },
    disabled: { control: "boolean" },
    hideLabel: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Checked States ───────────────────────────────────────────────────────────

export const CheckedStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Unchecked" defaultChecked={false} />
      <Checkbox label="Checked" defaultChecked={true} />
      <Checkbox label="Indeterminate" defaultChecked="indeterminate" />
    </div>
  ),
};

// ─── Primary vs Danger ────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-neutral-400 mb-3">Primary</p>
        <div className="flex flex-col gap-3">
          <Checkbox variant="primary" label="Unchecked" defaultChecked={false} />
          <Checkbox variant="primary" label="Checked" defaultChecked={true} />
          <Checkbox variant="primary" label="Indeterminate" defaultChecked="indeterminate" />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-xs text-neutral-400 mb-3">Danger</p>
        <div className="flex flex-col gap-3">
          <Checkbox variant="danger" label="Unchecked" defaultChecked={false} />
          <Checkbox variant="danger" label="Checked" defaultChecked={true} />
          <Checkbox variant="danger" label="Indeterminate" defaultChecked="indeterminate" />
        </div>
      </div>
    </div>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="lg" label="Large (20px)" defaultChecked={true} />
      <Checkbox size="sm" label="Small (16px)" defaultChecked={true} />
    </div>
  ),
};

// ─── With Subtitle ────────────────────────────────────────────────────────────

export const WithSubtitle: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="Enable notifications"
        subtitle="You'll receive email updates about your account activity."
        defaultChecked={false}
      />
      <Checkbox
        label="Marketing emails"
        subtitle="Receive tips, product updates and inspiration."
        defaultChecked={true}
      />
      <Checkbox
        variant="danger"
        label="Delete all data"
        subtitle="This action cannot be undone. All your data will be permanently removed."
        defaultChecked={false}
      />
    </div>
  ),
};

// ─── Disabled States ──────────────────────────────────────────────────────────

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Disabled unchecked" disabled defaultChecked={false} />
      <Checkbox label="Disabled checked" disabled defaultChecked={true} />
      <Checkbox label="Disabled indeterminate" disabled defaultChecked="indeterminate" />
      <Checkbox
        label="Disabled with subtitle"
        subtitle="This option is not available in your plan."
        disabled
        defaultChecked={false}
      />
    </div>
  ),
};

// ─── Standalone (hideLabel) ───────────────────────────────────────────────────

export const Standalone: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-neutral-400 mb-3">For table row selection</p>
        <div className="flex gap-3 items-center">
          <Checkbox hideLabel label="Select row 1" aria-label="Select row 1" defaultChecked={false} />
          <Checkbox hideLabel label="Select row 2" aria-label="Select row 2" defaultChecked={true} />
          <Checkbox hideLabel label="Select all" aria-label="Select all" defaultChecked="indeterminate" />
        </div>
      </div>
    </div>
  ),
};

// ─── Controlled ───────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean | "indeterminate">(false);
    return (
      <div className="flex flex-col gap-4">
        <Checkbox
          checked={checked}
          onCheckedChange={setChecked}
          label="I agree to the Terms of Service"
          subtitle="By checking this box you accept our terms."
        />
        <p className="text-xs text-neutral-400">
          State: <code className="font-mono">{String(checked)}</code>
        </p>
      </div>
    );
  },
};

// ─── Full matrix ──────────────────────────────────────────────────────────────

export const FullMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["primary", "danger"] as const).map((variant) => (
        <div key={variant}>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
            {variant}
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {(["lg", "sm"] as const).map((size) => (
              <div key={size} className="flex flex-col gap-3">
                <p className="text-xs text-neutral-400">{size === "lg" ? "Large" : "Small"}</p>
                <Checkbox variant={variant} size={size} label="Unchecked" defaultChecked={false} />
                <Checkbox variant={variant} size={size} label="Checked" defaultChecked={true} />
                <Checkbox variant={variant} size={size} label="Indeterminate" defaultChecked="indeterminate" />
                <Checkbox variant={variant} size={size} label="Disabled" disabled defaultChecked={false} />
                <Checkbox variant={variant} size={size} label="Disabled checked" disabled defaultChecked={true} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
