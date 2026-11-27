import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { controlFocus, type ControlVariant } from "../_shared/controlColors";

/**
 * LinkButton — Figma: StudioKIT 2.0 › Link Button (557:15154). Description: docs/figma-descriptions/link-button.md
 *
 * Its own component, not a Button `appearance`: Figma gives it no fill, no border and no control height, and only
 * two sizes. Figma property → prop:  Variant → variant · Size → size (small · large) · Prefix / Suffix (+ icons) →
 * prefixIcon / suffixIcon · Label → children · State → interaction / disabled.
 * Padding Gap/3 × Gap/5, gap Space/200 (8px = Gap/5), icons 16px. Text Label/Strong/Small (small) or
 * Label/Strong/Medium (large) in Dynamic/Text/<Variant>/Default · Hover · Pressed · Disabled.
 * Focused: Dynamic/Fill/<Variant>/Alpha/Default behind the text, the Focus/* ring, Corner Radius/Control/sm.
 * No underline, as in Figma.
 */
export type LinkButtonSize = "small" | "large";

const text: Record<ControlVariant, string> = {
  primary:
    "text-dynamic-text-primary-default hover:text-dynamic-text-primary-hover active:text-dynamic-text-primary-pressed focus-visible:bg-dynamic-fill-primary-alpha-default aria-disabled:text-dynamic-text-primary-disabled disabled:text-dynamic-text-primary-disabled",
  secondary:
    "text-dynamic-text-secondary-default hover:text-dynamic-text-secondary-hover active:text-dynamic-text-secondary-pressed focus-visible:bg-dynamic-fill-secondary-alpha-default aria-disabled:text-dynamic-text-secondary-disabled disabled:text-dynamic-text-secondary-disabled",
  danger:
    "text-dynamic-text-danger-default hover:text-dynamic-text-danger-hover active:text-dynamic-text-danger-pressed focus-visible:bg-dynamic-fill-danger-alpha-default aria-disabled:text-dynamic-text-danger-disabled disabled:text-dynamic-text-danger-disabled",
  success:
    "text-dynamic-text-success-default hover:text-dynamic-text-success-hover active:text-dynamic-text-success-pressed focus-visible:bg-dynamic-fill-success-alpha-default aria-disabled:text-dynamic-text-success-disabled disabled:text-dynamic-text-success-disabled",
  inverse:
    "text-dynamic-text-inverse-default hover:text-dynamic-text-inverse-hover active:text-dynamic-text-inverse-pressed focus-visible:bg-dynamic-fill-inverse-alpha-default aria-disabled:text-dynamic-text-inverse-disabled disabled:text-dynamic-text-inverse-disabled",
};

export interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma "Variant": text colour and intent. Primary (default) for most links; secondary inside dense UI. */
  variant?: ControlVariant;
  /** Figma "Size": `small` (default, Label/Strong/Small) or `large` (Label/Strong/Medium). */
  size?: LinkButtonSize;
  /** Figma "Prefix": a 16px icon before the label. */
  prefixIcon?: React.ReactNode;
  /** Figma "Suffix": a 16px icon after the label (e.g. an arrow for "View all"). */
  suffixIcon?: React.ReactNode;
  /**
   * Render as the child element. Navigation must be a link: wrap a `next/link` or `<a href>` with `asChild`.
   * Without it the component is a `<button type="button">` for in-page actions.
   */
  asChild?: boolean;
}

/** A text-only action styled as a link (Figma Link Button). Use it to go somewhere; use Button to change data. */
const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(
  ({ className, variant = "primary", size = "small", prefixIcon, suffixIcon, asChild = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const classes = cn(
      "inline-flex w-fit items-center gap-gap-5 whitespace-nowrap rounded-control-sm px-gap-5 py-gap-3 transition-[color,background-color,box-shadow] duration-150 focus-visible:outline-none disabled:pointer-events-none aria-disabled:pointer-events-none [&_svg]:size-size-9 [&_svg]:shrink-0",
      size === "large" ? "type-label-strong-medium" : "type-label-strong-small",
      text[variant],
      controlFocus[variant],
      className
    );
    const icons = (
      <>
        {prefixIcon != null && <span aria-hidden="true" className="inline-flex">{prefixIcon}</span>}
        <Slottable>{children}</Slottable>
        {suffixIcon != null && <span aria-hidden="true" className="inline-flex">{suffixIcon}</span>}
      </>
    );
    if (asChild) {
      return (
        <Comp ref={ref} className={classes} aria-disabled={disabled || undefined} {...props}>
          {icons}
        </Comp>
      );
    }
    return (
      <Comp ref={ref} type="button" className={classes} disabled={disabled} {...props}>
        {icons}
      </Comp>
    );
  }
);
LinkButton.displayName = "LinkButton";

export { LinkButton };
