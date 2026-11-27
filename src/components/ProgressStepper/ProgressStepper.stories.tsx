import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProgressStepper, ProgressStep } from "./ProgressStepper";

const meta: Meta<typeof ProgressStepper> = {
  title: "Components/ProgressStepper",
  component: ProgressStepper,
  tags: ["autodocs"],
  args: { position: "horizontal" },
  argTypes: {
    position: { control: "inline-radio", options: ["horizontal", "vertical"], description: "Figma: Position" },
  },
  render: (args) => (
    <ProgressStepper {...args}>
      <ProgressStep type="completed" label="Account" onClick={() => {}} />
      <ProgressStep type="active" label="Plan" />
      <ProgressStep label="Billing" />
      <ProgressStep label="Team" />
      <ProgressStep label="Review" />
    </ProgressStepper>
  ),
};
export default meta;
type Story = StoryObj<typeof ProgressStepper>;

export const Horizontal: Story = {};

export const Vertical: Story = { args: { position: "vertical" } };

/** Figma Type: Completed · Active · Incompleted · Error (`danger`), with descriptions, and a disabled step. */
export const Types: Story = {
  render: (args) => (
    <div className="grid gap-gap-12">
      {(["horizontal", "vertical"] as const).map((position) => (
        <ProgressStepper key={position} {...args} position={position}>
          <ProgressStep type="completed" label="Account" description="ada@example.com" onClick={() => {}} />
          <ProgressStep type="danger" label="Billing" description="Add a payment method" onClick={() => {}} />
          <ProgressStep type="active" label="Team" />
          <ProgressStep label="Review" disabled />
        </ProgressStepper>
      ))}
    </div>
  ),
};
