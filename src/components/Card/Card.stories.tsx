import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "outline", "ghost"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A short description of what this card is about.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600">This is the card body content. Add anything here.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">Action</Button>
        <Button variant="ghost" size="sm">Cancel</Button>
      </CardFooter>
    </Card>
  ),
  args: { variant: "default" },
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="w-80">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>This card has a stronger shadow.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600">Content goes here.</p>
      </CardContent>
    </Card>
  ),
};

export const Outline: Story = {
  render: () => (
    <Card variant="outline" className="w-80">
      <CardHeader>
        <CardTitle>Outline Card</CardTitle>
        <CardDescription>A card with a more visible border and no shadow.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600">Content goes here.</p>
      </CardContent>
    </Card>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Feature Card</CardTitle>
          <Badge variant="brand">New</Badge>
        </div>
        <CardDescription>This card showcases a feature with a badge.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600">Feature details go here.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">Get started</Button>
      </CardFooter>
    </Card>
  ),
};
