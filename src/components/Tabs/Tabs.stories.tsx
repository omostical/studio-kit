import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: { variant: "regular", size: "large", fullWidth: false, defaultValue: "overview" },
  argTypes: {
    variant: { control: "inline-radio", options: ["regular", "pill"], description: "Figma: Variant" },
    size: { control: "inline-radio", options: ["small", "large"], description: "Figma: Size" },
    fullWidth: { control: "boolean", description: "Figma: Full width" },
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="type-body-medium">Overview content.</TabsContent>
      <TabsContent value="activity" className="type-body-medium">Activity content.</TabsContent>
      <TabsContent value="settings" className="type-body-medium">Settings content.</TabsContent>
    </Tabs>
  ),
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Regular: Story = {};
export const Pill: Story = { args: { variant: "pill" } };
export const FullWidth: Story = { args: { fullWidth: true } };
export const Small: Story = { args: { size: "small" } };
