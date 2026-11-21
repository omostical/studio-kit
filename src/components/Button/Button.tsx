import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { controlColors, controlFocus, type ControlAppearance, type ControlVariant } from "../_shared/controlColors";

/**
 * Button — Figma: StudioKIT 2.0 › Button (557:14433). Description: docs/figma-descriptions/button.md
 *
 * Figma property → prop:  Variant → variant · Style → appearance · Size → size · State → (interaction / disabled)
 * Sizes (height · radius · padding · gap · text style · icon):
 *   xsmall 24 · Control/md · Gap/5 · Gap/3 · Caption/Strong/Medium · 16
 *   small  32 · Control/lg · Gap/6 · Gap/3 · Label/Strong/Small    · 16
 *   medium 40 · Control/lg · Gap/7 · Gap/4 · Label/Strong/Small    · 20
 *   large  48 · Control/xl · Gap/9 · Gap/4 · Label/Strong/Medium   · 20
 * Heights use Components/Forms/*, so they grow on mobile (touch targets) like the Figma Mobile mode.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-150 focus-visible:outline-none disabled:pointer-events-none",
  {
    variants: {
      size: {
        xsmall: "h-forms-xsmall px-gap-5 gap-gap-3 rounded-control-md type-caption-strong-medium [&_svg]:size-size-9",
        small: "h-forms-small px-gap-6 gap-gap-3 rounded-control-lg type-label-strong-small [&_svg]:size-size-9",
        medium: "h-forms-medium px-gap-7 gap-gap-4 rounded-control-lg type-label-strong-small [&_svg]:size-size-11",
        large: "h-forms-large px-gap-9 gap-gap-4 rounded-control-xl type-label-strong-medium [&_svg]:size-size-11",
      },
    },
    defaultVariants: { size: "medium" },
  }
);

export type ButtonVariant = ControlVariant;
export type ButtonAppearance = ControlAppearance;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Figma Variant — intent. */
  variant?: ButtonVariant;
  /** Figma Style — emphasis: filled (highest) · border · ghost (lowest). */
  appearance?: ButtonAppearance;
  /** Render as the child element (e.g. a Next.js Link) with button styles. */
  asChild?: boolean;
  /** Icon before the label (Figma Prefix). */
  prefixIcon?: React.ReactNode;
  /** Icon after the label (Figma Suffix). */
  suffixIcon?: React.ReactNode;
  /** Show a spinner and block interaction. */
  loading?: boolean;
}

const Spinner = () => (
  <svg className="animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      appearance = "filled",
      size,
      asChild = false,
      prefixIcon,
      suffixIcon,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    const classes = cn(buttonVariants({ size }), controlColors[variant][appearance], controlFocus[variant], className);

    if (asChild) {
      return (
        <Comp ref={ref} className={classes} aria-disabled={isDisabled || undefined} {...props}>
          {children}
        </Comp>
      );
    }
    return (
      <Comp
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Spinner /> : prefixIcon}
        {children != null && <span>{children}</span>}
        {!loading && suffixIcon}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
