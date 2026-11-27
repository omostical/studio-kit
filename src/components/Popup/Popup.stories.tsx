import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Switch } from "../Switch/Switch";
import { Popup, PopupTrigger, PopupContent, PopupHeader, PopupBody, PopupFooter, PopupClose } from "./Popup";

const meta: Meta<typeof PopupContent> = {
  title: "Components/Popup",
  component: PopupContent,
  tags: ["autodocs"],
  args: { type: "action" },
  argTypes: { type: { control: "inline-radio", options: ["action", "information"], description: "Figma: Type" } },
};
export default meta;
type Story = StoryObj<typeof PopupContent>;

/** Action type: a short form anchored to its trigger. */
export const Action: Story = {
  render: (args) => (
    <Popup>
      <PopupTrigger asChild><Button>New shift</Button></PopupTrigger>
      <PopupContent {...args}>
        <PopupHeader title="New shift" />
        <PopupBody>
          <Input label="Shift name" />
          <Input label="Date" placeholder="DD/MM/YYYY" />
        </PopupBody>
        <PopupFooter start={<Switch label="Repeat weekly" />}>
          <PopupClose asChild><Button size="small" variant="secondary" appearance="border">Cancel</Button></PopupClose>
          <Button size="small">Create</Button>
        </PopupFooter>
      </PopupContent>
    </Popup>
  ),
};

/** Information type: a message with a header divider. */
export const Information: Story = {
  args: { type: "information" },
  render: (args) => (
    <Popup>
      <PopupTrigger asChild><Button variant="secondary" appearance="border">Cookie settings</Button></PopupTrigger>
      <PopupContent {...args}>
        <PopupHeader title="Accept cookies" />
        <PopupBody>We use cookies to remember your settings and measure how the app is used.</PopupBody>
        <PopupFooter>
          <PopupClose asChild><Button size="small" variant="secondary" appearance="border">Only necessary</Button></PopupClose>
          <PopupClose asChild><Button size="small">Accept all</Button></PopupClose>
        </PopupFooter>
      </PopupContent>
    </Popup>
  ),
};
