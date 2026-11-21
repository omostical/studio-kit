"use client";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Checkbox — Figma: StudioKIT 2.0 › Checkbox (557:18425). Description: docs/figma-descriptions/checkbox.md
 *
 * Figma property → prop:  Variant → variant · Type (Unselected/Selected/Indeterminate) → checked ·
 * Size → size · State → interaction / disabled · Label / Description → label / description.
 * Box: Components/Control/Medium (20, large) or Small (16), radius Control/md / Control/sm.
 * Unselected: Static/Fill/Highlight/Base + Dynamic/Stroke/Secondary; Selected: Dynamic/Fill/Primary (or Danger).
 */
type CheckedState = boolean | "indeterminate";

const boxVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center border transition-colors duration-150",
    "focus-visible:outline-none focus-visible:shadow-focus-base disabled:cursor-not-allowed",
    "data-[state=unchecked]:bg-static-fill-highlight-base data-[state=unchecked]:border-dynamic-stroke-secondary-default data-[state=unchecked]:hover:border-dynamic-stroke-secondary-hover",
    "data-[state=unchecked]:disabled:bg-static-fill-alpha-subtle data-[state=unchecked]:disabled:border-dynamic-stroke-secondary-disabled",
    "data-[state=checked]:border-transparent data-[state=indeterminate]:border-transparent",
    "[&_svg]:text-dynamic-text-onprimary-default",
  ].join(" "),
  {
    variants: {
      size: {
        small: "size-control-small rounded-control-sm [&_svg]:size-size-7",
        large: "size-control-medium rounded-control-md [&_svg]:size-size-9",
      },
      variant: {
        primary:
          "data-[state=checked]:bg-dynamic-fill-primary-default data-[state=indeterminate]:bg-dynamic-fill-primary-default hover:data-[state=checked]:bg-dynamic-fill-primary-hover hover:data-[state=indeterminate]:bg-dynamic-fill-primary-hover disabled:data-[state=checked]:bg-dynamic-fill-primary-disabled disabled:data-[state=indeterminate]:bg-dynamic-fill-primary-disabled",
        danger:
          "data-[state=unchecked]:border-dynamic-stroke-danger-strong-default focus-visible:shadow-focus-danger data-[state=checked]:bg-dynamic-fill-danger-default data-[state=indeterminate]:bg-dynamic-fill-danger-default hover:data-[state=checked]:bg-dynamic-fill-danger-hover disabled:data-[state=checked]:bg-dynamic-fill-danger-disabled disabled:data-[state=indeterminate]:bg-dynamic-fill-danger-disabled",
      },
    },
    defaultVariants: { size: "large", variant: "primary" },
  }
);

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "defaultChecked"> {
  size?: "small" | "large";
  /** Danger only for high-risk choices ("Delete permanently"). */
  variant?: "primary" | "danger";
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** Name for checkboxes without a visible label ("Select row Adam Smith"). */
  "aria-label"?: string;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    { className, size = "large", variant = "primary", checked: checkedProp, defaultChecked = false, onCheckedChange, label, description, disabled, id, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const boxId = id ?? generatedId;
    const [internal, setInternal] = React.useState<CheckedState>(defaultChecked);
    const checked = checkedProp ?? internal;
    const state = checked === "indeterminate" ? "indeterminate" : checked ? "checked" : "unchecked";

    const toggle = () => {
      if (disabled) return;
      const next = checked === "indeterminate" ? true : !checked;
      if (checkedProp === undefined) setInternal(next);
      onCheckedChange?.(next);
    };

    return (
      <div className={cn("inline-flex items-start gap-gap-5", disabled && "cursor-not-allowed")}>
        <button
          ref={ref}
          type="button"
          role="checkbox"
          id={boxId}
          aria-checked={checked === "indeterminate" ? "mixed" : !!checked}
          aria-describedby={description != null ? `${boxId}-description` : undefined}
          disabled={disabled}
          data-state={state}
          onClick={toggle}
          className={cn(boxVariants({ size, variant }), className)}
          {...props}
        >
          {state === "checked" && (
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 4.5 6.5 11 3 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {state === "indeterminate" && (
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3.5 8h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
        {(label != null || description != null) && (
          <div className="flex flex-col gap-gap-3">
            {label != null && (
              <label
                htmlFor={boxId}
                className={cn(
                  size === "large" ? "type-label-small" : "type-body-small",
                  disabled ? "cursor-not-allowed text-dynamic-text-secondary-disabled" : "cursor-pointer text-static-text-base"
                )}
              >
                {label}
              </label>
            )}
            {description != null && (
              <span id={`${boxId}-description`} className="type-body-small text-static-text-subtle">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox, boxVariants as checkboxVariants };
