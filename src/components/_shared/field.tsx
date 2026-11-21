import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Shared pieces of Figma's Form Field (557:51656), Field Label (4803:158547) and Helper Text (1902:22669),
 * used by Input, Select and other field-type components.
 *
 * Field box (Figma Input / Single Select): Static/Fill/Highlight/Base fill, 1px Dynamic/Stroke/Secondary border,
 * Forms/Base shadow; focused ("Active") → Dynamic/Stroke/Primary/Strong/Default + Forms/Active glow;
 * Danger → Dynamic/Stroke/Danger/Strong/Default + Forms/Danger glow; disabled → Static/Fill/Alpha/Subtle.
 */
export type FieldSize = "small" | "medium" | "large";
export type FieldVariant = "primary" | "danger";
export type FieldAppearance = "border" | "ghost";

export const fieldBoxVariants = cva(
  "flex w-full items-center transition-[border-color,box-shadow,background-color] duration-150 text-static-text-strong",
  {
    variants: {
      size: {
        small: "h-forms-small px-gap-7 gap-gap-5 rounded-control-lg type-label-small [&_svg]:size-size-9",
        medium: "h-forms-medium px-gap-9 gap-gap-5 rounded-control-lg type-label-small [&_svg]:size-size-11",
        large: "h-forms-large px-gap-9 gap-gap-5 rounded-control-xl type-label-medium [&_svg]:size-size-11",
      },
      appearance: {
        border:
          "border bg-static-fill-highlight-base border-dynamic-stroke-secondary-default shadow-forms-base hover:border-dynamic-stroke-secondary-hover",
        ghost: "border border-transparent bg-transparent hover:bg-dynamic-fill-secondary-alpha-hover",
      },
      variant: {
        primary:
          "focus-within:border-dynamic-stroke-primary-strong-default focus-within:shadow-forms-active",
        danger:
          "border-dynamic-stroke-danger-strong-default hover:border-dynamic-stroke-danger-strong-hover focus-within:border-dynamic-stroke-danger-strong-default focus-within:shadow-forms-danger",
      },
      disabled: {
        true: "cursor-not-allowed border-dynamic-stroke-secondary-disabled bg-static-fill-alpha-subtle text-dynamic-text-secondary-disabled shadow-none hover:border-dynamic-stroke-secondary-disabled",
        false: "",
      },
    },
    defaultVariants: { size: "medium", appearance: "border", variant: "primary", disabled: false },
  }
);

/** Prefix / suffix slot inside a field (icon or short text such as "$" or "kg"). */
export const FieldAffix = ({ children }: { children: React.ReactNode }) => (
  <span className="flex shrink-0 items-center text-static-text-subtle">{children}</span>
);

export interface FieldShellProps {
  id: string;
  label?: React.ReactNode;
  /** Mark the field as optional (Figma "Optional"). Mark optional fields, not required ones. */
  optional?: boolean;
  optionalLabel?: string;
  /** Hint under the field (Figma Helper Text). Replaced by `error` when set. */
  helperText?: React.ReactNode;
  /** Error message; also switches the field to the Danger variant. */
  error?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

/** Label + control + helper/error text, with the ids wired for aria-describedby. */
export function FieldShell({ id, label, optional, optionalLabel = "Optional", helperText, error, disabled, className, children }: FieldShellProps) {
  const message = error ?? helperText;
  return (
    <div className={cn("flex w-full flex-col gap-gap-4", className)}>
      {label != null && (
        <div className="flex items-baseline gap-gap-3">
          <label
            htmlFor={id}
            className={cn("type-label-strong-small", disabled ? "text-dynamic-text-secondary-disabled" : "text-static-text-strong")}
          >
            {label}
          </label>
          {optional && <span className="type-label-small text-static-text-subtle">{optionalLabel}</span>}
        </div>
      )}
      {children}
      {message != null && (
        <p
          id={`${id}-message`}
          className={cn("type-body-small", error != null ? "text-semantic-text-negative" : "text-static-text-subtle")}
        >
          {message}
        </p>
      )}
    </div>
  );
}

/** Props to spread on the native control so it's linked to its message and error state. */
export const fieldAriaProps = (id: string, { error, helperText }: { error?: React.ReactNode; helperText?: React.ReactNode }) => ({
  "aria-invalid": error != null ? true : undefined,
  "aria-describedby": error != null || helperText != null ? `${id}-message` : undefined,
});
