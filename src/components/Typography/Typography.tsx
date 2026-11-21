import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Typography — the StudioKIT 2.0 Figma text styles as a component.
 * `variant` is the text style name in kebab case ("Label/Strong/Small" → "label-strong-small");
 * each maps to the generated `type-*` utility, so sizes, weights and line heights come from Figma variables
 * (and switch to the Mobile values below 768px). `tone` picks the Static/Text colour.
 */
const variants = {
  "title-large": "type-title-large",
  "title-medium": "type-title-medium",
  "title-small": "type-title-small",
  "subtitle-large": "type-subtitle-large",
  "subtitle-medium": "type-subtitle-medium",
  "subtitle-small": "type-subtitle-small",
  "subtitle-xsmall": "type-subtitle-xsmall",
  "label-large": "type-label-large",
  "label-medium": "type-label-medium",
  "label-small": "type-label-small",
  "label-strong-large": "type-label-strong-large",
  "label-strong-medium": "type-label-strong-medium",
  "label-strong-small": "type-label-strong-small",
  "body-large": "type-body-large",
  "body-medium": "type-body-medium",
  "body-small": "type-body-small",
  "body-strong-large": "type-body-strong-large",
  "body-strong-medium": "type-body-strong-medium",
  "body-strong-small": "type-body-strong-small",
  "number-large": "type-number-large tabular-nums",
  "number-medium": "type-number-medium tabular-nums",
  "number-small": "type-number-small tabular-nums",
  "number-xsmall": "type-number-xsmall tabular-nums",
  "number-strong-large": "type-number-strong-large tabular-nums",
  "number-strong-medium": "type-number-strong-medium tabular-nums",
  "number-strong-small": "type-number-strong-small tabular-nums",
  "number-strong-xsmall": "type-number-strong-xsmall tabular-nums",
  "caption-medium": "type-caption-medium",
  "caption-small": "type-caption-small",
  "caption-strong-medium": "type-caption-strong-medium",
  "caption-strong-small": "type-caption-strong-small",
} as const;

export type TypographyVariant = keyof typeof variants;

const textVariants = cva("m-0", {
  variants: {
    variant: variants,
    tone: {
      strong: "text-static-text-strong",
      base: "text-static-text-base",
      subtle: "text-static-text-subtle",
      inherit: "",
    },
    align: { left: "text-left", center: "text-center", right: "text-right" },
  },
  defaultVariants: { variant: "body-medium", tone: "base" },
});

const tagFor = (v: string): "h1" | "h2" | "h3" | "h4" | "p" | "span" => {
  if (v === "title-large") return "h1";
  if (v.startsWith("title")) return "h2";
  if (v === "subtitle-large" || v === "subtitle-medium") return "h3";
  if (v.startsWith("subtitle")) return "h4";
  if (v.startsWith("body")) return "p";
  return "span";
};
/** Default element per variant, computed once. */
const defaultTags = Object.fromEntries(Object.keys(variants).map((v) => [v, tagFor(v)])) as Record<TypographyVariant, ReturnType<typeof tagFor>>;

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  tone?: "strong" | "base" | "subtle" | "inherit";
  align?: "left" | "center" | "right";
  /** Element to render. Defaults: title → h1/h2, subtitle → h3/h4, body → p, others → span. */
  as?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body-medium", tone, align, as, ...props }, ref) => {
    const Tag = as ?? defaultTags[variant];
    const resolvedTone = tone ?? (variant.startsWith("title") || variant.startsWith("subtitle") ? "strong" : "base");
    return <Tag ref={ref} className={cn(textVariants({ variant, tone: resolvedTone, align }), className)} {...props} />;
  }
);
Typography.displayName = "Typography";

export { Typography, textVariants };
