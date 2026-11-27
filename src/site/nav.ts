// Component nav structure (sidebar + content order)
export type DocItem = { slug: string; title: string };
export type DocGroup = { name: string; items: DocItem[] };

export const componentGroups: DocGroup[] = [
  {
    name: "Actions",
    items: [
      { slug: "button", title: "Button" },
      { slug: "icon-button", title: "Icon Button" },
    ],
  },
  {
    name: "Form",
    items: [
      { slug: "input", title: "Input" },
      { slug: "select", title: "Select" },
      { slug: "checkbox", title: "Checkbox" },
      { slug: "switch", title: "Switch" },
      { slug: "radio-button", title: "Radio Button" },
      { slug: "radio-group", title: "Radio Group" },
      { slug: "text-area", title: "Text Area" },
      { slug: "checkbox-group", title: "Checkbox Group" },
    ],
  },
  {
    name: "Feedback",
    items: [
      { slug: "alert", title: "Alert" },
      { slug: "toast", title: "Toast" },
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
    ],
  },
  {
    name: "Layout",
    items: [{ slug: "card", title: "Card" }],
  },
];

export const flatComponents: DocItem[] = componentGroups.flatMap((g) => g.items);
