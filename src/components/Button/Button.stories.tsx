import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "./Button";

const variants = ["primary", "secondary", "danger", "success", "inverse"] as const;
const appearances = ["filled", "border", "ghost"] as const;
const sizes = ["xsmall", "small", "medium", "large"] as const;

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Label", variant: "primary", appearance: "filled", size: "medium" },
  argTypes: {
    variant: { control: "select", options: variants, description: "Figma: Variant" },
    appearance: { control: "inline-radio", options: appearances, description: "Figma: Style" },
    size: { control: "inline-radio", options: sizes, description: "Figma: Size" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

/** Variant × Style, as on the Figma Button page. Inverse is meant for dark or image backgrounds. */
export const Matrix: Story = {
  render: (args) => (
    <div className="grid gap-gap-7">
      {appearances.map((appearance) => (
        <div key={appearance} className="flex flex-wrap items-center gap-gap-7">
          <span className="w-20 type-caption-medium text-static-text-subtle">{appearance}</span>
          {variants.map((variant) => (
            <span key={variant} className={variant === "inverse" ? "rounded-control-lg bg-static-fill-inverse-background p-gap-3" : ""}>
              <Button {...args} variant={variant} appearance={appearance}>
                {variant}
              </Button>
            </span>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-gap-7">
      {sizes.map((size) => (
        <Button key={size} {...args} size={size} prefixIcon={<Plus />}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex items-center gap-gap-7">
      <Button {...args} suffixIcon={<ArrowRight />}>Continue</Button>
      <Button {...args} loading>Saving</Button>
      <Button {...args} disabled>Disabled</Button>
    </div>
  ),
};
