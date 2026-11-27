import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: { label: "Volume", defaultValue: [40], labelPosition: "side" },
  argTypes: {
    labelPosition: { control: "inline-radio", options: ["side", "bottom", "inputs"], description: "Figma: Label" },
    showLabels: { control: "boolean", description: "Figma: Labels" },
    disabled: { control: "boolean", description: "Figma: Progress=Disabled" },
  },
  decorators: [(Story) => <div className="max-w-96">{Story()}</div>],
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {};
export const Bottom: Story = { args: { labelPosition: "bottom" } };
export const Range: Story = { args: { label: "Price", defaultValue: [20, 80], minLabel: "$0", maxLabel: "$100", labelPosition: "bottom" } };
export const Inputs: Story = { args: { label: "Price", defaultValue: [20, 80], labelPosition: "inputs" } };
export const Disabled: Story = { args: { disabled: true } };
