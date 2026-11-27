import * as React from "react";
import { cn } from "@/lib/utils";
import {
  FieldShell,
  fieldAriaProps,
  fieldBoxVariants,
  type FieldAppearance,
  type FieldSize,
  type FieldVariant,
} from "../_shared/field";

/**
 * TextArea — Figma: StudioKIT 2.0 › Text Area (557:82344) inside Form Field (557:51656).
 * Description: docs/figma-descriptions/text-area.md
 *
 * Figma property → prop:  Variant → variant (or set `error`) · Size → size · Filled → value/placeholder ·
 * State → interaction / disabled · Label → label. Same field shell as Input (label, Optional, helper text, error)
 * and the same box colours (`fieldBoxVariants`): Static/Fill/Highlight/Base, Dynamic/Stroke/Secondary,
 * Active → Dynamic/Stroke/Primary/Strong + Forms/Active, Danger → Dynamic/Stroke/Danger/Strong.
 * Box: Corner Radius/Container/sm. Padding: small Gap/7 × Gap/4, medium Gap/9 × Gap/6, large Gap/9 × Gap/8.
 * Text: Body/Medium (small, medium) or Body/Large (large, 16px so iOS doesn't zoom).
 * Height comes from `rows` (default 3 ≈ the Figma 76px area); people can drag it taller.
 * Not built: the Formatting Bar slot (see GAPS.md). The Scroll Bar is the browser's own.
 */
const sizeClasses: Record<FieldSize, string> = {
  small: "px-gap-7 py-gap-4 type-body-medium",
  medium: "px-gap-9 py-gap-6 type-body-medium",
  large: "px-gap-9 py-gap-8 type-body-large",
};

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** Figma Size: small · medium · large. Large uses 16px text (no iOS zoom). */
  size?: FieldSize;
  /** `danger` marks the value invalid; passing `error` does this for you. */
  variant?: FieldVariant;
  /** `border` (default) or `ghost` (no outline until hover; only inside a container that already shows the field). Same as Input. */
  appearance?: FieldAppearance;
  /** Visible label above the field. Every field needs one; a placeholder is not a label. */
  label?: React.ReactNode;
  /** Show the "Optional" marker. Mark optional fields, not required ones. */
  optional?: boolean;
  /** Text of the optional marker (default "Optional"). */
  optionalLabel?: string;
  /** Hint under the field (what to write, length limit). Replaced by `error` when that is set. */
  helperText?: React.ReactNode;
  /** Error message under the field; also sets the Danger variant and aria-invalid. Say how to fix the problem. */
  error?: React.ReactNode;
  /** Let people drag the field taller (default true). */
  resizable?: boolean;
  /** Class for the outer Form Field wrapper. `className` styles the text box. */
  wrapperClassName?: string;
}

/** Multi-line text field with label, helper text and error (Figma Text Area). Use Input for single-line values. */
const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
      resizable = true,
      rows = 3,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const fieldId = id ?? generatedId;
    const resolvedVariant = error != null ? "danger" : (variant ?? "primary");

    return (
      <FieldShell
        id={fieldId}
        label={label}
        optional={optional}
        optionalLabel={optionalLabel}
        helperText={helperText}
        error={error}
        disabled={disabled}
        className={wrapperClassName}
      >
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          disabled={disabled}
          className={cn(
            fieldBoxVariants({ size: null, appearance, variant: resolvedVariant, disabled: !!disabled }),
            "block rounded-container-sm outline-none placeholder:text-static-text-subtle",
            sizeClasses[size],
            resizable ? "resize-y" : "resize-none",
            className
          )}
          {...fieldAriaProps(fieldId, { error, helperText })}
          {...props}
        />
      </FieldShell>
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };
