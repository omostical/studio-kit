import * as React from "react";
import { cn } from "@/lib/utils";
import {
  FieldAffix,
  FieldShell,
  fieldAriaProps,
  fieldBoxVariants,
  type FieldAppearance,
  type FieldSize,
  type FieldVariant,
} from "../_shared/field";

/**
 * Input — Figma: StudioKIT 2.0 › Input (557:84966) inside Form Field (557:51656).
 * Description: docs/figma-descriptions/input.md
 *
 * Figma property → prop:  Variant → variant (or set `error`) · Style → appearance · Size → size ·
 * Filled → value/placeholder · State → interaction / disabled · Prefix/Suffix → prefix/suffix.
 * Sizes: small 32 · medium 40 · large 48 (16px text, which also stops iOS Safari zooming in).
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  /** Figma Size: small · medium · large. Large uses 16px text (no iOS zoom). */
  size?: FieldSize;
  /** `danger` marks the value invalid; passing `error` does this for you. */
  variant?: FieldVariant;
  /** Figma Style: `border` (default, in forms) or `ghost` (no outline until hover; only inside a container that already shows the field). */
  appearance?: FieldAppearance;
  /** Visible label above the field. Every field needs one; a placeholder is not a label. */
  label?: React.ReactNode;
  /** Show the "Optional" marker. Mark optional fields, not required ones. */
  optional?: boolean;
  /** Text of the optional marker (default "Optional"). */
  optionalLabel?: string;
  /** Hint under the field (format, constraints). Replaced by `error` when that is set. */
  helperText?: React.ReactNode;
  /** Error message under the field; also sets the Danger variant and aria-invalid. Say how to fix the problem. */
  error?: React.ReactNode;
  /** Content before the value: an icon or short text such as "$". */
  prefix?: React.ReactNode;
  /** Content after the value: a unit, icon or small button. */
  suffix?: React.ReactNode;
  /** Class for the outer Form Field wrapper. `className` styles the field box. */
  wrapperClassName?: string;
}

/** Single-line text field with label, helper text and error (Figma Input inside Form Field). */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      size = "medium",
      variant,
      appearance = "border",
      label,
      optional,
      optionalLabel,
      helperText,
      error,
      prefix,
      suffix,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const resolvedVariant = error != null ? "danger" : (variant ?? "primary");

    return (
      <FieldShell
        id={inputId}
        label={label}
        optional={optional}
        optionalLabel={optionalLabel}
        helperText={helperText}
        error={error}
        disabled={disabled}
        className={wrapperClassName}
      >
        <div className={cn(fieldBoxVariants({ size, appearance, variant: resolvedVariant, disabled: !!disabled }), className)}>
          {prefix != null && <FieldAffix>{prefix}</FieldAffix>}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-static-text-subtle disabled:cursor-not-allowed"
            {...fieldAriaProps(inputId, { error, helperText })}
            {...props}
          />
          {suffix != null && <FieldAffix>{suffix}</FieldAffix>}
        </div>
      </FieldShell>
    );
  }
);
Input.displayName = "Input";

export { Input };
