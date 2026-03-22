import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tag } from "./Tag";

const PlusIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 5v6M5 8h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["Primary", "Danger", "Success", "Warning", "Subtle"],
    },
    style: {
      control: "radio",
      options: ["Solid", "Outline"],
    },
    size: {
      control: "radio",
      options: ["lg", "md", "sm"],
    },
    shape: {
      control: "radio",
      options: ["Pill", "Default"],
    },
    icon: {
      control: false,
    },
  },
  args: {
    children: "Label",
    type: "Primary",
    style: "Solid",
    size: "md",
    shape: "Pill",
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { icon: <PlusIcon /> },
};

export const PrimaryOutline: Story = {
  args: { type: "Primary", style: "Outline", icon: <PlusIcon /> },
};

export const DangerSolid: Story = {
  args: { type: "Danger", style: "Solid", icon: <PlusIcon /> },
};

export const DangerOutline: Story = {
  args: { type: "Danger", style: "Outline", icon: <PlusIcon /> },
};

export const SuccessSolid: Story = {
  args: { type: "Success", style: "Solid", icon: <PlusIcon /> },
};

export const SuccessOutline: Story = {
  args: { type: "Success", style: "Outline", icon: <PlusIcon /> },
};

export const WarningSolid: Story = {
  args: { type: "Warning", style: "Solid", icon: <PlusIcon /> },
};

export const WarningOutline: Story = {
  args: { type: "Warning", style: "Outline", icon: <PlusIcon /> },
};

export const SubtleSolid: Story = {
  args: { type: "Subtle", style: "Solid", icon: <PlusIcon /> },
};

export const SubtleOutline: Story = {
  args: { type: "Subtle", style: "Outline", icon: <PlusIcon /> },
};

export const SmallPill: Story = {
  args: { size: "sm", icon: <PlusIcon /> },
};

export const LargePill: Story = {
  args: { size: "lg", icon: <PlusIcon /> },
};

export const DefaultShape: Story = {
  args: { shape: "Default", icon: <PlusIcon /> },
};

export const AllTypesSolid: Story = {
  name: "All types - Solid",
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
      {(["Primary", "Danger", "Success", "Warning", "Subtle"] as const).map((type) => (
        <Tag key={type} type={type} style="Solid" icon={<PlusIcon />}>
          {type}
        </Tag>
      ))}
    </div>
  ),
};

export const AllTypesOutline: Story = {
  name: "All types - Outline",
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
      {(["Primary", "Danger", "Success", "Warning", "Subtle"] as const).map((type) => (
        <Tag key={type} type={type} style="Outline" icon={<PlusIcon />}>
          {type}
        </Tag>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      {(["lg", "md", "sm"] as const).map((size) => (
        <Tag key={size} size={size} icon={<PlusIcon />}>
          {size}
        </Tag>
      ))}
    </div>
  ),
};

export const BothShapes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Tag shape="Pill" icon={<PlusIcon />}>
        Pill
      </Tag>
      <Tag shape="Default" icon={<PlusIcon />}>
        Default
      </Tag>
    </div>
  ),
};

export const FullMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {(["Primary", "Danger", "Success", "Warning", "Subtle"] as const).map((type) => (
        <div
          key={type}
          style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}
        >
          {(["Solid", "Outline"] as const).flatMap((style) =>
            (["lg", "md", "sm"] as const).map((size) => (
              <Tag
                key={`${type}-${style}-${size}`}
                type={type}
                style={style}
                size={size}
                icon={<PlusIcon />}
              >
                {type}
              </Tag>
            ))
          )}
        </div>
      ))}
    </div>
  ),
};
