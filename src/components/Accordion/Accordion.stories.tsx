import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/Button";
import { Accordion, AccordionGroup } from "./Accordion";

const faqs = [
  { title: "Quick way to de-stress in 2 minutes?", body: "Breathe in for 4 seconds, hold for 4, breathe out for 4, hold for 4. Do it 4 times." },
  { title: "Can I change my plan later?", body: "Yes. Plan changes apply from your next billing date." },
  { title: "Who can see my reports?", body: "Only people you invite to the workspace." },
];

const meta: Meta<typeof AccordionGroup> = {
  title: "Components/Accordion",
  component: AccordionGroup,
  tags: ["autodocs"],
  args: { contained: true },
  argTypes: { contained: { control: "boolean", description: "Figma: Contained" } },
  render: (args) => (
    <AccordionGroup {...args} className="max-w-md">
      {faqs.map((f) => (
        <Accordion key={f.title} title={f.title} icon={<BarChart3 />}>
          {f.body}
        </Accordion>
      ))}
    </AccordionGroup>
  ),
};
export default meta;
type Story = StoryObj<typeof AccordionGroup>;

/** Figma Accordion Group, Contained=True. */
export const Contained: Story = {};

/** Figma Accordion Group, Contained=False: items separated by dividers. */
export const Dividers: Story = { args: { contained: false } };

/** Only one item open at a time. */
export const Single: Story = { args: { type: "single", defaultValue: "a" } as never,
  render: (args) => (
    <AccordionGroup {...args} className="max-w-md">
      <Accordion value="a" title="Shipping">Ships in 2–3 working days.</Accordion>
      <Accordion value="b" title="Returns">Return within 30 days.</Accordion>
    </AccordionGroup>
  ),
};

/** A single Accordion on its own, expanded, with an action; and a disabled one. */
export const Standalone: Story = {
  render: () => (
    <div className="grid max-w-md gap-gap-7">
      <Accordion title={faqs[0].title} icon={<BarChart3 />} defaultExpanded contained>
        {faqs[0].body}
        <Button variant="secondary" size="small">Try it now</Button>
      </Accordion>
      <Accordion title="Advanced settings" disabled contained>
        Not available on your plan.
      </Accordion>
    </div>
  ),
};
