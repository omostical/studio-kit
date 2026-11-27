import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DropdownMenuItem } from "@/components/DropdownMenu";
import { SplitButton } from "./SplitButton";

const variants = ["primary", "secondary", "danger", "success", "inverse"] as const;
const menu = (
  <>
    <DropdownMenuItem>Save as draft</DropdownMenuItem>
    <DropdownMenuItem>Save and duplicate</DropdownMenuItem>
  </>
);

const meta: Meta<typeof SplitButton> = {
  title: "Components/SplitButton",
  component: SplitButton,
  tags: ["autodocs"],
  args: { children: "Save", menu, menuLabel: "More save options", variant: "primary", appearance: "filled", size: "medium" },
  argTypes: {
    variant: { control: "inline-radio", options: variants, description: "Figma: Variant" },
    appearance: { control: "inline-radio", options: ["filled", "border"], description: "Figma: Style" },
    size: { control: "inline-radio", options: ["xsmall", "small", "medium", "large"], description: "Figma: Size" },
  },
};
export default meta;
type Story = StoryObj<typeof SplitButton>;

export const Playground: Story = {};
export const Variants: Story = {
  render: (args) => (
    <div className="grid gap-gap-7">
      {(["filled", "border"] as const).map((a) => (
        <div key={a} className="flex flex-wrap gap-gap-5">
          {variants.map((v) => <SplitButton key={v} {...args} variant={v} appearance={a} />)}
        </div>
      ))}
    </div>
  ),
};
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-gap-5">
      {(["xsmall", "small", "medium", "large"] as const).map((s) => <SplitButton key={s} {...args} size={s} />)}
    </div>
  ),
};
export const Disabled: Story = { args: { disabled: true } };
