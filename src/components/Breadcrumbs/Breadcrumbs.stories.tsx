import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Folder, Home } from "lucide-react";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  args: { separator: "arrow", maxItems: 4 },
  argTypes: {
    separator: { control: "inline-radio", options: ["arrow", "slash"], description: "Figma: Separator" },
    maxItems: { control: { type: "number", min: 3 }, description: "Collapse the middle into … above this many levels" },
  },
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Playground: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="#" icon={<Folder />}>Projects</BreadcrumbItem>
      <BreadcrumbItem href="#">Website redesign</BreadcrumbItem>
      <BreadcrumbItem href="#">Assets</BreadcrumbItem>
      <BreadcrumbItem>Logo files</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

/** Figma Level Root · 2nd · 3rd · 4th, with both separators. */
export const Levels: Story = {
  render: (args) => (
    <div className="grid gap-gap-7">
      {(["arrow", "slash"] as const).map((separator) =>
        [1, 2, 3, 4].map((level) => (
          <Breadcrumbs key={separator + level} {...args} separator={separator}>
            {["Projects", "Website redesign", "Assets", "Logo files"].slice(0, level).map((label, i) => (
              <BreadcrumbItem key={label} href={i < level - 1 ? "#" : undefined} icon={i === 0 ? <Folder /> : undefined}>
                {label}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        ))
      )}
    </div>
  ),
};

/** Figma Type "Icon": an icon-only root item needs `aria-label`. */
export const IconRoot: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem href="#" icon={<Home />} aria-label="Home" />
      <BreadcrumbItem href="#">Settings</BreadcrumbItem>
      <BreadcrumbItem>Billing</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

/** Six levels with `maxItems={4}`: the middle collapses into a "…" button that shows the rest. */
export const Collapsed: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      {["Workspace", "Projects", "Website redesign", "Assets", "Brand", "Logo files"].map((label, i, all) => (
        <BreadcrumbItem key={label} href={i < all.length - 1 ? "#" : undefined} icon={i === 0 ? <Folder /> : undefined}>
          {label}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  ),
};
