// Component nav structure (sidebar + content order)
export type DocItem = { slug: string; title: string };
export type DocGroup = { name: string; items: DocItem[] };

export const componentGroups: DocGroup[] = [
  {
    name: "Actions",
    items: [
      { slug: "button", title: "Button" },
      { slug: "icon-button", title: "Icon Button" },
      { slug: "link-button", title: "Link Button" },
    ],
  },
  {
    name: "Form",
    items: [
      { slug: "input", title: "Input" },
      { slug: "select", title: "Select" },
      { slug: "checkbox", title: "Checkbox" },
      { slug: "switch", title: "Switch" },
    ],
  },
  {
    name: "Feedback",
    items: [
      { slug: "alert", title: "Alert" },
      { slug: "toast", title: "Toast" },
      { slug: "progress-bar", title: "Progress Bar" },
    ],
  },
  {
    name: "Navigation",
    items: [{ slug: "tabs", title: "Tabs" }],
  },
  {
    name: "Overlays",
    items: [
      { slug: "modal", title: "Modal" },
      { slug: "tooltip", title: "Tooltip" },
      { slug: "dropdown-menu", title: "Dropdown Menu" },
    ],
  },
  {
    name: "Data display",
    items: [
      { slug: "avatar", title: "Avatar" },
      { slug: "badge", title: "Badge" },
      { slug: "tag", title: "Tag" },
      { slug: "typography", title: "Typography" },
      { slug: "table", title: "Table" },
      { slug: "thumbnail", title: "Thumbnail" },
      { slug: "chip", title: "Chip" },
    ],
  },
  {
    name: "Layout",
    items: [
      { slug: "card", title: "Card" },
      { slug: "divider", title: "Divider" },
    ],
  },
];

export const flatComponents: DocItem[] = componentGroups.flatMap((g) => g.items);
