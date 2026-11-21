// wideset.co aesthetic palette — shared across docs surfaces
export const W = {
  black: "#141414",
  gray100: "#F5F5F5",
  gray200: "#E9E9E9",
  gray300: "#ADADAD",
  gray400: "#9B9B9B",
  gray500: "#808080",
  gray600: "#424242",
  gray700: "#242424",
  white: "#FFFFFF",
  purple: "#4734F7",
  yellow: "#E6FF27",
  darkStroke: "rgba(0,0,0,0.15)",
  lightStroke: "rgba(255,255,255,0.15)",
} as const;

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
    ],
  },
  {
    name: "Data display",
    items: [
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
