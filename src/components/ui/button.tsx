import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button
 *
 * Source of truth: Figma StudioKIT_v1 — node 73:290
 * https://www.figma.com/design/yEvYgthP0qWo5EV4QUjZ8Z/StudioKIT_v1?node-id=73-290
 *
 * Variant matrix: 4 sizes × 5 types × 5 states = 100 variants
 * Tokens: All colors reference CSS custom properties from tokens.light.css / tokens.dark.css
 */

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5",
    "font-medium whitespace-nowrap",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--border-brand)]",
    "disabled:pointer-events-none",
    "font-[family-name:var(--font-family-sans)]",
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
          "bg-[var(--bg-surface-secondary)] text-[var(--text-primary)]",
          "border border-[var(--border-default)]",
          "hover:bg-[var(--bg-surface-primary)] hover:border-[var(--border-strong)]",
          "active:bg-[var(--bg-surface)] active:border-[var(--border-strong)]",
          "disabled:bg-[var(--bg-surface-disabled)] disabled:text-[var(--text-disabled)] disabled:border-[var(--border-disabled)]",
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
          "bg-[var(--bg-fill-subtle)] text-[var(--text-primary)]",
          "border border-[var(--border-subtle)]",
          "hover:bg-[var(--bg-surface-primary)] hover:border-[var(--border-default)]",
          "active:bg-[var(--bg-surface)] active:border-[var(--border-strong)]",
          "disabled:bg-[var(--bg-surface-disabled)] disabled:text-[var(--text-disabled)] disabled:border-transparent",
        ].join(" "),
      },
      size: {
        lg: "min-h-12 px-3 py-3 text-base leading-6 rounded-xl",      // 48px, p-12, radius-12, 16px/24px
        md: "min-h-10 px-3 py-2 text-sm leading-5 rounded-lg",         // 40px, px-12 py-8, radius-8, 14px/20px
        sm: "min-h-8 px-3 py-1 text-sm leading-5 rounded-lg",          // 32px, px-12 py-4, radius-8, 14px/20px
        xs: "min-h-6 px-3 py-0.5 text-xs leading-[18px] rounded-md",   // 24px, px-12 py-3, radius-6, 12px/18px
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/* ─── Icon size mapping per button size (matches Figma) ─── */
const iconSizeMap = {
  lg: 24,
  md: 20,
  sm: 20,
  xs: 16,
} as const;

/* ─── Types ─── */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child component (e.g. Next.js Link) */
  asChild?: boolean;
  /** Icon element rendered before the label */
  prefixIcon?: React.ReactNode;
  /** Icon element rendered after the label */
  suffixIcon?: React.ReactNode;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
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
    const iconSize = iconSizeMap[size ?? "md"];

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && prefixIcon && (
          <span
            className="shrink-0 [&>svg]:size-[--icon-size]"
            style={{ "--icon-size": `${iconSize}px` } as React.CSSProperties}
          >
            {prefixIcon}
          </span>
        )}
        {children && <span>{children}</span>}
        {!loading && suffixIcon && (
          <span
            className="shrink-0 [&>svg]:size-[--icon-size]"
            style={{ "--icon-size": `${iconSize}px` } as React.CSSProperties}
          >
            {suffixIcon}
          </span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
