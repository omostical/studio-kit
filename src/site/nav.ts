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
      { slug: "side-panel", title: "Side Panel" },
      { slug: "popup", title: "Pop-up" },
      { slug: "status-modal", title: "Status Modal" },
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
