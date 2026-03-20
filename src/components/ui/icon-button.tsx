import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * IconButton
 *
 * Source of truth: Figma StudioKIT_v1 — node 2443:830
 * https://www.figma.com/design/yEvYgthP0qWo5EV4QUjZ8Z/StudioKIT_v1?node-id=2443-830
 *
 * Icon-only button for compact, universally understood actions.
 * Always requires an aria-label for screen reader access.
 */

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--border-brand)]",
    "disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--bg-fill-brand)] text-[var(--text-on-color)]",
          "border border-[var(--border-brand)]",
          "hover:bg-[var(--bg-fill-brand-hover)]",
          "active:bg-[var(--bg-fill-brand-pressed)]",
          "disabled:bg-[var(--bg-fill-brand-disabled)] disabled:text-[var(--text-on-color-disabled)] disabled:border-transparent",
        ].join(" "),
        secondary: [
          "bg-[var(--bg-surface-secondary)] text-[var(--icon-primary)]",
          "border border-[var(--border-default)]",
          "hover:bg-[var(--bg-surface-primary)] hover:border-[var(--border-strong)]",
          "active:bg-[var(--bg-surface)] active:border-[var(--border-strong)]",
          "disabled:bg-[var(--bg-surface-disabled)] disabled:text-[var(--icon-disabled)] disabled:border-[var(--border-disabled)]",
        ].join(" "),
        danger: [
          "bg-[var(--bg-fill-error)] text-[var(--text-on-color)]",
          "border border-[var(--border-error)]",
          "hover:bg-[var(--bg-fill-error-hover)]",
          "active:bg-[var(--bg-fill-error-pressed)]",
          "disabled:bg-[var(--bg-fill-error-disabled)] disabled:text-[var(--text-on-color-disabled)] disabled:border-transparent",
        ].join(" "),
        success: [
          "bg-[var(--bg-fill-success)] text-[var(--text-on-color)]",
          "border border-[var(--border-success)]",
          "hover:bg-[var(--bg-fill-success-hover)]",
          "active:bg-[var(--bg-fill-success-pressed)]",
          "disabled:bg-[var(--bg-fill-success-disabled)] disabled:text-[var(--text-on-color-disabled)] disabled:border-transparent",
        ].join(" "),
        ghost: [
          "bg-[var(--bg-fill-subtle)] text-[var(--icon-primary)]",
          "border border-[var(--border-subtle)]",
          "hover:bg-[var(--bg-surface-primary)] hover:border-[var(--border-default)]",
          "active:bg-[var(--bg-surface)] active:border-[var(--border-strong)]",
          "disabled:bg-[var(--bg-surface-disabled)] disabled:text-[var(--icon-disabled)] disabled:border-transparent",
        ].join(" "),
      },
      size: {
        lg: "min-h-12 min-w-12 p-3 rounded-xl [&>svg]:size-6",         // 48px, p-12, radius-12, icon 24px
        md: "min-h-10 min-w-10 p-2 rounded-lg [&>svg]:size-5",          // 40px, p-8, radius-8, icon 20px
        sm: "min-h-8 min-w-8 p-1.5 rounded-lg [&>svg]:size-5",          // 32px, p-6, radius-8, icon 20px
        xs: "min-h-6 min-w-6 p-1 rounded-md [&>svg]:size-4",            // 24px, p-4, radius-6, icon 16px
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** The icon to render — pass an SVG component */
  icon: React.ReactNode;
  /** Required — describes the action for screen readers */
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        {...props}
      >
        {icon}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
