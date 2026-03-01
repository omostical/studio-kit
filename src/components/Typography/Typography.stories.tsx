import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "lead", "body", "small", "xs", "label", "code", "muted"],
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: { variant: "h1", children: "The quick brown fox" },
};

export const Heading2: Story = {
  args: { variant: "h2", children: "The quick brown fox" },
};

export const Heading3: Story = {
  args: { variant: "h3", children: "The quick brown fox" },
};

export const Lead: Story = {
  args: {
    variant: "lead",
    children: "A lead paragraph introducing the main content of a page.",
  },
};

export const Body: Story = {
  args: {
    variant: "body",
    children:
      "Body text for regular content. Designed for readability at normal reading distances.",
  },
};

export const Small: Story = {
  args: {
    variant: "small",
    children: "Small text used for secondary information or captions.",
  },
};

export const Label: Story = {
  args: { variant: "label", children: "Form label" },
};

export const Code: Story = {
  args: { variant: "code", children: "const value = tokens.colors.brand[500]" },
};

export const Muted: Story = {
  args: { variant: "muted", children: "Last updated 3 minutes ago" },
};

export const TypeScale: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-xl">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="lead">Lead paragraph — introduces content.</Typography>
      <Typography variant="body">Body text for regular reading content.</Typography>
      <Typography variant="small">Small text for secondary details.</Typography>
      <Typography variant="xs">Extra small caption text.</Typography>
      <Typography variant="muted">Muted text for timestamps and metadata.</Typography>
      <Typography variant="code">const token = &apos;studio-kit&apos;</Typography>
    </div>
  ),
};
