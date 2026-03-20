import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Checkbox
 *
 * Source of truth: Figma StudioKIT_v1 — node 2288:3670
 * https://www.figma.com/design/yEvYgthP0qWo5EV4QUjZ8Z/StudioKIT_v1?node-id=2288-3670
 *
 * Variant matrix: 3 checked × 2 sizes × 2 types × 5 states = 60 variants
 * Supports: Unchecked, Checked, Indeterminate
 */

/* ─── Checkbox box variants ─── */
const checkboxVariants = cva(
  [
    "relative shrink-0 rounded",
    "border transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--border-brand)]",
    "disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "border-[var(--border-strong)]",
          "data-[state=checked]:bg-[var(--bg-fill-brand)] data-[state=checked]:border-[var(--border-brand)]",
          "data-[state=indeterminate]:bg-[var(--bg-fill-brand)] data-[state=indeterminate]:border-[var(--border-brand)]",
          "hover:border-[var(--border-brand)]",
          "disabled:border-[var(--border-disabled)] disabled:bg-[var(--bg-surface-disabled)]",
          "disabled:data-[state=checked]:bg-[var(--bg-fill-brand-disabled)] disabled:data-[state=checked]:border-transparent",
          "disabled:data-[state=indeterminate]:bg-[var(--bg-fill-brand-disabled)] disabled:data-[state=indeterminate]:border-transparent",
        ].join(" "),
        danger: [
          "border-[var(--border-error)]",
          "data-[state=checked]:bg-[var(--bg-fill-error)] data-[state=checked]:border-[var(--border-error)]",
          "data-[state=indeterminate]:bg-[var(--bg-fill-error)] data-[state=indeterminate]:border-[var(--border-error)]",
          "hover:border-[var(--bg-fill-error-hover)]",
          "disabled:border-[var(--border-disabled)] disabled:bg-[var(--bg-surface-disabled)]",
          "disabled:data-[state=checked]:bg-[var(--bg-fill-error-disabled)] disabled:data-[state=checked]:border-transparent",
          "disabled:data-[state=indeterminate]:bg-[var(--bg-fill-error-disabled)] disabled:data-[state=indeterminate]:border-transparent",
        ].join(" "),
      },
      size: {
        lg: "size-5",  // 20px
        sm: "size-4",  // 16px
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

/* ─── Types ─── */
type CheckedState = boolean | "indeterminate";

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "defaultChecked">,
    VariantProps<typeof checkboxVariants> {
  /** Controlled checked state */
  checked?: CheckedState;
  /** Default checked state (uncontrolled) */
  defaultChecked?: CheckedState;
  /** Called when the checked state changes */
  onCheckedChange?: (checked: CheckedState) => void;
  /** Label text displayed next to the checkbox */
  label?: string;
  /** Subtitle text displayed below the label */
  subtitle?: string;
  /** Hide the label and subtitle — checkbox only (for table rows, bulk actions) */
  hideLabel?: boolean;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      variant,
      size,
      checked: checkedProp,
      defaultChecked = false,
      onCheckedChange,
      label,
      subtitle,
      hideLabel = false,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [checkedState, setCheckedState] = React.useState<CheckedState>(
      defaultChecked
    );
    const checked = checkedProp !== undefined ? checkedProp : checkedState;

    const dataState =
      checked === "indeterminate"
        ? "indeterminate"
        : checked
          ? "checked"
          : "unchecked";

    const handleClick = () => {
      if (disabled) return;
      const next = checked === "indeterminate" ? true : !checked;
      if (checkedProp === undefined) setCheckedState(next);
      onCheckedChange?.(next);
    };

    const iconSize = size === "sm" ? 12 : 14;

    return (
      <div
        className={cn(
          "inline-flex gap-2 items-start",
          disabled && "cursor-not-allowed opacity-100"
        )}
      >
        <button
          ref={ref}
          type="button"
          role="checkbox"
          id={id}
          aria-checked={checked === "indeterminate" ? "mixed" : !!checked}
          aria-disabled={disabled || undefined}
          aria-label={hideLabel ? label : undefined}
          disabled={disabled}
          data-state={dataState}
          className={cn(
            checkboxVariants({ variant, size }),
            "bg-[var(--bg-fill-ghost)]",
            className
          )}
          onClick={handleClick}
          {...props}
        >
          {/* Checkmark */}
          {checked === true && (
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 14 14"
              fill="none"
              className="absolute inset-0 m-auto text-[var(--text-on-color)]"
            >
              <path
                d="M11.5 3.5L5.5 10L2.5 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {/* Indeterminate dash */}
          {checked === "indeterminate" && (
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 14 14"
              fill="none"
              className="absolute inset-0 m-auto text-[var(--text-on-color)]"
            >
              <path
                d="M3 7H11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        {!hideLabel && (label || subtitle) && (
          <div className="flex flex-col gap-1 justify-center">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  "text-sm leading-[18px] text-[var(--text-primary)] cursor-pointer",
                  "font-[family-name:var(--font-family-sans)]",
                  disabled && "text-[var(--text-disabled)] cursor-not-allowed"
                )}
              >
                {label}
              </label>
            )}
            {subtitle && (
              <span
                className={cn(
                  "text-xs leading-4 tracking-wide text-[var(--text-tertiary)]",
                  "font-[family-name:var(--font-family-sans)]",
                  disabled && "text-[var(--text-disabled)]"
                )}
              >
                {subtitle}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
