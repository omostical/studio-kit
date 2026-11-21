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
  size?: FieldSize;
  /** `danger` marks the value invalid; passing `error` does this for you. */
  variant?: FieldVariant;
  appearance?: FieldAppearance;
  label?: React.ReactNode;
  optional?: boolean;
  optionalLabel?: string;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** Class for the outer Form Field wrapper. `className` styles the field box. */
  wrapperClassName?: string;
}

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
