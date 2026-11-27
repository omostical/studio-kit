import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight, Plus } from "lucide-react";
import { LinkButton } from "./LinkButton";

const variants = ["primary", "secondary", "danger", "success", "inverse"] as const;

const meta: Meta<typeof LinkButton> = {
  title: "Components/LinkButton",
  component: LinkButton,
  tags: ["autodocs"],
  args: { children: "View all", variant: "primary", size: "small" },
  argTypes: {
    variant: { control: "inline-radio", options: variants, description: "Figma: Variant" },
    size: { control: "inline-radio", options: ["small", "large"], description: "Figma: Size" },
  },
};
export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-gap-5">
      {variants.filter((v) => v !== "inverse").map((v) => <LinkButton key={v} {...args} variant={v}>{v}</LinkButton>)}
      <span className="rounded-control-md bg-static-fill-inverse-background p-gap-3"><LinkButton {...args} variant="inverse">inverse</LinkButton></span>
    </div>
  ),
};

/** Navigation renders a real link through asChild. */
export const AsLink: Story = {
  render: (args) => (
    <LinkButton {...args} asChild suffixIcon={<ArrowRight />}>
      <a href="#invoices">View invoice</a>
    </LinkButton>
  ),
};

export const WithIcon: Story = { args: { prefixIcon: <Plus />, children: "Add another address" } };
export const Disabled: Story = { args: { disabled: true } };
