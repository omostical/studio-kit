import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button/Button";
import { Card, CardContent } from "../Card/Card";
import { Input } from "../Input/Input";
import { SidePanel, SidePanelTrigger, SidePanelContent, SidePanelHeader, SidePanelBody, SidePanelFooter, SidePanelClose } from "./SidePanel";

const meta: Meta<typeof SidePanelContent> = {
  title: "Components/SidePanel",
  component: SidePanelContent,
  tags: ["autodocs"],
  args: { size: "small" },
  argTypes: { size: { control: "inline-radio", options: ["small", "medium", "large"], description: "Figma: Size" } },
};
export default meta;
type Story = StoryObj<typeof SidePanelContent>;

/** Details type: read-only info in Cards on the subtle background, no footer. */
export const Details: Story = {
  render: (args) => (
    <SidePanel>
      <SidePanelTrigger asChild><Button>View details</Button></SidePanelTrigger>
      <SidePanelContent {...args}>
        <SidePanelHeader title="Adam Smith" description="adam.smith@example.com" />
        <SidePanelBody type="details">
          <Card><CardContent>First name: Adam · Last name: Smith · Job title: UI Designer</CardContent></Card>
        </SidePanelBody>
      </SidePanelContent>
    </SidePanel>
  ),
};

/** Form type: fields on the panel colour, footer with one Primary action and Cancel. */
export const Form: Story = {
  render: (args) => (
    <SidePanel>
      <SidePanelTrigger asChild><Button>Add employee</Button></SidePanelTrigger>
      <SidePanelContent {...args}>
        <SidePanelHeader title="Add employee" description="Step 1 of 4" />
        <SidePanelBody type="form">
          <Input label="First name" />
          <Input label="Last name" />
        </SidePanelBody>
        <SidePanelFooter>
          <Button>Save</Button>
          <SidePanelClose asChild><Button variant="secondary" appearance="border">Cancel</Button></SidePanelClose>
        </SidePanelFooter>
      </SidePanelContent>
    </SidePanel>
  ),
};
