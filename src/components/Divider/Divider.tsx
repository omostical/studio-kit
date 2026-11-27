import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Divider — Figma: StudioKIT 2.0 › Divider (13101:22726). Description: docs/figma-descriptions/divider.md
 *
 * Figma property → prop:  Style → appearance (solid · dashed) · Weight → weight (thin 1 · default 2 · bold 4px) ·
 * Emphasis → emphasis (base · strong · subtle → Static/Stroke/Base · Strong · Subtle) · Text → label + labelPosition.
 * Label: Caption/Strong/Medium in Static/Text/Subtle, 12px from the line (Gap/7).
 */
export type DividerAppearance = "solid" | "dashed";
export type DividerWeight = "thin" | "default" | "bold";
export type DividerEmphasis = "base" | "strong" | "subtle";

const weightClass: Record<DividerWeight, string> = { thin: "border-t", default: "border-t-2", bold: "border-t-4" };
const emphasisClass: Record<DividerEmphasis, string> = {
  base: "border-static-stroke-base",
  strong: "border-static-stroke-strong",
  subtle: "border-static-stroke-subtle",
};

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma "Style": `solid` (default) or `dashed`. */
  appearance?: DividerAppearance;
  /** Figma "Weight": thin 1px (default) · default 2px · bold 4px. */
  weight?: DividerWeight;
  /** Figma "Emphasis": line colour, base (default) · strong · subtle. */
  emphasis?: DividerEmphasis;
  /** Figma "Text": a short label on the line ("March", "or"). */
  label?: React.ReactNode;
  /** Figma "Text" position: `center` (default) or `left`. */
  labelPosition?: "center" | "left";
  /**
   * Set when the divider is a real thematic break: it then gets `role="separator"`. Leave it off for
   * decorative lines (the default), which are hidden from screen readers.
   */
  semantic?: boolean;
}

/** A thin line that separates groups of content (Figma Divider). Use spacing first; a divider only when spacing isn't enough. */
const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, appearance = "solid", weight = "thin", emphasis = "base", label, labelPosition = "center", semantic = false, ...props }, ref) => {
    const line = cn("min-w-0 flex-1", weightClass[weight], emphasisClass[emphasis], appearance === "dashed" && "border-dashed");
    const a11y = semantic ? { role: "separator" as const } : { "aria-hidden": label == null ? true : undefined };
    if (label == null) return <div ref={ref} className={cn("flex w-full", className)} {...a11y} {...props}><span className={line} /></div>;
    return (
      <div ref={ref} className={cn("flex w-full items-center gap-gap-7", className)} {...a11y} {...props}>
        {labelPosition === "center" && <span aria-hidden="true" className={line} />}
        <span className="shrink-0 type-caption-strong-medium text-static-text-subtle">{label}</span>
        <span aria-hidden="true" className={line} />
      </div>
    );
  }
);
Divider.displayName = "Divider";

export { Divider };
