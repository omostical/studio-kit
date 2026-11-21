// Tag colour classes — one row per Figma Tag "Color" option. Literal classes so Tailwind can find them.
// Filled → Non-Semantic/Fill/<Color>/Subtle + Non-Semantic/Text/<Color>/OnSubtle;
// Border → Static/Fill/Highlight/Subtle + Non-Semantic/Stroke/<Color>/Default + Non-Semantic/Text/<Color>/OnSubtle.
export const tagColors = ["brand", "red", "pink", "violet", "purple", "indigo", "blue", "cyan", "teal", "green", "lime", "yellow", "orange"] as const;
export type TagColor = (typeof tagColors)[number];

export const tagColorClasses: Record<TagColor, { filled: string; border: string }> = {
  brand: {
    filled: "bg-non-semantic-fill-brand-subtle border-transparent text-non-semantic-text-brand-onsubtle",
    border: "bg-static-fill-highlight-subtle border-non-semantic-stroke-brand-default text-non-semantic-text-brand-onsubtle",
  },
  red: {
    filled: "bg-non-semantic-fill-red-subtle border-transparent text-non-semantic-text-red-onsubtle",
    border: "bg-static-fill-highlight-subtle border-non-semantic-stroke-red-default text-non-semantic-text-red-onsubtle",
  },
  pink: {
    filled: "bg-non-semantic-fill-pink-subtle border-transparent text-non-semantic-text-pink-onsubtle",
    border: "bg-static-fill-highlight-subtle border-non-semantic-stroke-pink-default text-non-semantic-text-pink-onsubtle",
  },
  violet: {
    filled: "bg-non-semantic-fill-violet-subtle border-transparent text-non-semantic-text-violet-onsubtle",
    border: "bg-static-fill-highlight-subtle border-non-semantic-stroke-violet-default text-non-semantic-text-violet-onsubtle",
  },
  purple: {
    filled: "bg-non-semantic-fill-purple-subtle border-transparent text-non-semantic-text-purple-onsubtle",
    border: "bg-static-fill-highlight-subtle border-non-semantic-stroke-purple-default text-non-semantic-text-purple-onsubtle",
  },
  indigo: {
    filled: "bg-non-semantic-fill-indigo-subtle border-transparent text-non-semantic-text-indigo-onsubtle",
    border: "bg-static-fill-highlight-subtle border-non-semantic-stroke-indigo-default text-non-semantic-text-indigo-onsubtle",
  },
  blue: {
    filled: "bg-non-semantic-fill-blue-subtle border-transparent text-non-semantic-text-blue-onsubtle",
    border: "bg-static-fill-highlight-subtle border-non-semantic-stroke-blue-default text-non-semantic-text-blue-onsubtle",
  },
  cyan: {
    filled: "bg-non-semantic-fill-cyan-subtle border-transparent text-non-semantic-text-cyan-onsubtle",
    border: "bg-static-fill-highlight-subtle border-non-semantic-stroke-cyan-default text-non-semantic-text-cyan-onsubtle",
  },
  teal: {
    filled: "bg-non-semantic-fill-teal-subtle border-transparent text-non-semantic-text-teal-onsubtle",
    border: "bg-static-fill-highlight-subtle border-non-semantic-stroke-teal-default text-non-semantic-text-teal-onsubtle",
  },
  green: {
    filled: "bg-non-semantic-fill-green-subtle border-transparent text-non-semantic-text-green-onsubtle",
    border: "bg-static-fill-highlight-subtle border-non-semantic-stroke-green-default text-non-semantic-text-green-onsubtle",
  },
  lime: {
    filled: "bg-non-semantic-fill-lime-subtle border-transparent text-non-semantic-text-lime-onsubtle",
    border: "bg-static-fill-highlight-subtle border-non-semantic-stroke-lime-default text-non-semantic-text-lime-onsubtle",
  },
  yellow: {
    filled: "bg-non-semantic-fill-yellow-subtle border-transparent text-non-semantic-text-yellow-onsubtle",
    border: "bg-static-fill-highlight-subtle border-non-semantic-stroke-yellow-default text-non-semantic-text-yellow-onsubtle",
  },
  orange: {
    filled: "bg-non-semantic-fill-orange-subtle border-transparent text-non-semantic-text-orange-onsubtle",
    border: "bg-static-fill-highlight-subtle border-non-semantic-stroke-orange-default text-non-semantic-text-orange-onsubtle",
  },
};
