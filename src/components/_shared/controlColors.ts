// GENERATED once from the Figma Button spec by a one-off script (see docs/HANDOFF.md, Phase 2).
// Every class is a literal so Tailwind can find it. Figma: Variant × Style × State on the Button/Icon Button sets.
// Filled → Dynamic/Fill/<V>/<State> + Dynamic/Text/On<V>/<State>; Border → Dynamic/Stroke/<V> + Dynamic/Text/<V>;
// Ghost → Dynamic/Fill/<V>/Alpha/<State> + Dynamic/Text/<V>. Focused → the Focus/* effect style.

export type ControlVariant = "primary" | "secondary" | "danger" | "success" | "inverse";
export type ControlAppearance = "filled" | "border" | "ghost";

export const controlColors: Record<ControlVariant, Record<ControlAppearance, string>> = {
  primary: {
    filled:
      "bg-dynamic-fill-primary-default hover:bg-dynamic-fill-primary-hover active:bg-dynamic-fill-primary-pressed disabled:bg-dynamic-fill-primary-disabled text-dynamic-text-onprimary-default hover:text-dynamic-text-onprimary-hover active:text-dynamic-text-onprimary-pressed disabled:text-dynamic-text-onprimary-disabled shadow-controls-control disabled:shadow-none",
    border:
      "bg-static-fill-highlight-subtle border border-dynamic-stroke-primary-default hover:border-dynamic-stroke-primary-hover active:border-dynamic-stroke-primary-pressed disabled:border-dynamic-stroke-primary-disabled text-dynamic-text-primary-default hover:text-dynamic-text-primary-hover active:text-dynamic-text-primary-pressed disabled:text-dynamic-text-primary-disabled shadow-controls-control disabled:shadow-none",
    ghost:
      "bg-dynamic-fill-primary-alpha-default hover:bg-dynamic-fill-primary-alpha-hover active:bg-dynamic-fill-primary-alpha-pressed disabled:bg-transparent text-dynamic-text-primary-default hover:text-dynamic-text-primary-hover active:text-dynamic-text-primary-pressed disabled:text-dynamic-text-primary-disabled",
  },
  secondary: {
    filled:
      "bg-dynamic-fill-secondary-default hover:bg-dynamic-fill-secondary-hover active:bg-dynamic-fill-secondary-pressed disabled:bg-dynamic-fill-secondary-disabled text-dynamic-text-onsecondary-default hover:text-dynamic-text-onsecondary-hover active:text-dynamic-text-onsecondary-pressed disabled:text-dynamic-text-onsecondary-disabled",
    border:
      "bg-static-fill-highlight-subtle border border-dynamic-stroke-secondary-default hover:border-dynamic-stroke-secondary-hover active:border-dynamic-stroke-secondary-pressed disabled:border-dynamic-stroke-secondary-disabled text-dynamic-text-secondary-default hover:text-dynamic-text-secondary-hover active:text-dynamic-text-secondary-pressed disabled:text-dynamic-text-secondary-disabled shadow-controls-control disabled:shadow-none",
    ghost:
      "bg-dynamic-fill-secondary-alpha-default hover:bg-dynamic-fill-secondary-alpha-hover active:bg-dynamic-fill-secondary-alpha-pressed disabled:bg-transparent text-dynamic-text-secondary-default hover:text-dynamic-text-secondary-hover active:text-dynamic-text-secondary-pressed disabled:text-dynamic-text-secondary-disabled",
  },
  danger: {
    filled:
      "bg-dynamic-fill-danger-default hover:bg-dynamic-fill-danger-hover active:bg-dynamic-fill-danger-pressed disabled:bg-dynamic-fill-danger-disabled text-dynamic-text-ondanger-default hover:text-dynamic-text-ondanger-hover active:text-dynamic-text-ondanger-pressed disabled:text-dynamic-text-ondanger-disabled shadow-controls-control disabled:shadow-none",
    border:
      "bg-static-fill-highlight-subtle border border-dynamic-stroke-danger-default hover:border-dynamic-stroke-danger-hover active:border-dynamic-stroke-danger-pressed disabled:border-dynamic-stroke-danger-disabled text-dynamic-text-danger-default hover:text-dynamic-text-danger-hover active:text-dynamic-text-danger-pressed disabled:text-dynamic-text-danger-disabled shadow-controls-control disabled:shadow-none",
    ghost:
      "bg-dynamic-fill-danger-alpha-default hover:bg-dynamic-fill-danger-alpha-hover active:bg-dynamic-fill-danger-alpha-pressed disabled:bg-transparent text-dynamic-text-danger-default hover:text-dynamic-text-danger-hover active:text-dynamic-text-danger-pressed disabled:text-dynamic-text-danger-disabled",
  },
  success: {
    filled:
      "bg-dynamic-fill-success-default hover:bg-dynamic-fill-success-hover active:bg-dynamic-fill-success-pressed disabled:bg-dynamic-fill-success-disabled text-dynamic-text-onsuccess-default hover:text-dynamic-text-onsuccess-hover active:text-dynamic-text-onsuccess-pressed disabled:text-dynamic-text-onsuccess-disabled shadow-controls-control disabled:shadow-none",
    border:
      "bg-static-fill-highlight-subtle border border-dynamic-stroke-success-default hover:border-dynamic-stroke-success-hover active:border-dynamic-stroke-success-pressed disabled:border-dynamic-stroke-success-disabled text-dynamic-text-success-default hover:text-dynamic-text-success-hover active:text-dynamic-text-success-pressed disabled:text-dynamic-text-success-disabled shadow-controls-control disabled:shadow-none",
    ghost:
      "bg-dynamic-fill-success-alpha-default hover:bg-dynamic-fill-success-alpha-hover active:bg-dynamic-fill-success-alpha-pressed disabled:bg-transparent text-dynamic-text-success-default hover:text-dynamic-text-success-hover active:text-dynamic-text-success-pressed disabled:text-dynamic-text-success-disabled",
  },
  inverse: {
    filled:
      "bg-dynamic-fill-inverse-default hover:bg-dynamic-fill-inverse-hover active:bg-dynamic-fill-inverse-pressed disabled:bg-dynamic-fill-inverse-disabled text-dynamic-text-oninverse-default hover:text-dynamic-text-oninverse-hover active:text-dynamic-text-oninverse-pressed disabled:text-dynamic-text-oninverse-disabled shadow-controls-control disabled:shadow-none",
    border:
      "bg-transparent border border-dynamic-stroke-inverse-default hover:border-dynamic-stroke-inverse-hover active:border-dynamic-stroke-inverse-pressed disabled:border-dynamic-stroke-inverse-disabled text-dynamic-text-inverse-default hover:text-dynamic-text-inverse-hover active:text-dynamic-text-inverse-pressed disabled:text-dynamic-text-inverse-disabled shadow-controls-control disabled:shadow-none",
    ghost:
      "bg-dynamic-fill-inverse-alpha-default hover:bg-dynamic-fill-inverse-alpha-hover active:bg-dynamic-fill-inverse-alpha-pressed disabled:bg-transparent text-dynamic-text-inverse-default hover:text-dynamic-text-inverse-hover active:text-dynamic-text-inverse-pressed disabled:text-dynamic-text-inverse-disabled",
  },
};

export const controlFocus: Record<ControlVariant, string> = {
  "primary": "focus-visible:shadow-focus-base",
  "secondary": "focus-visible:shadow-focus-base",
  "danger": "focus-visible:shadow-focus-danger",
  "success": "focus-visible:shadow-focus-success",
  "inverse": "focus-visible:shadow-focus-inversed"
};
