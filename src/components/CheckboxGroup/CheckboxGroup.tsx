import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldGroupShell } from "../_shared/field";

/**
 * CheckboxGroup — Figma: StudioKIT 2.0 › Checkbox Group (1584:59304) inside Form Field (557:51656).
 * Description: docs/figma-descriptions/checkbox-group.md
 *
 * Figma property → prop:  Orientation (Vertical / Horizontal) → orientation. Children are `Checkbox`es.
 * Spacing: vertical Gap/7 (12), horizontal Gap/11 (20); horizontal rows wrap at narrow widths.
 * Renders a `<fieldset>` with a `<legend>` (the label), the Optional marker, helper text and error from the shared
 * Form Field pieces; the message is linked to the fieldset with aria-describedby. `disabled` disables every option.
 * Each Checkbox keeps its own checked state; the group only labels and lays them out.
 */
export interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, "children"> {
  /** Visible group label (the question), rendered as the fieldset legend. */
  label?: React.ReactNode;
  /** Show the "Optional" marker. Mark optional groups, not required ones. */
  optional?: boolean;
  /** Text of the optional marker (default "Optional"). */
  optionalLabel?: string;
  /** Hint under the options ("Pick all that apply."). Replaced by `error` when that is set. */
  helperText?: React.ReactNode;
  /** Error message under the options. Say how to fix it ("Choose at least one channel."). */
  error?: React.ReactNode;
  /** Figma Orientation: `vertical` (default) or `horizontal`. */
  orientation?: "vertical" | "horizontal";
  /** Disable every checkbox in the group. */
  disabled?: boolean;
  /** Class for the row/column of options. `className` styles the outer fieldset. */
  optionsClassName?: string;
  /** The `Checkbox` options. */
  children: React.ReactNode;
}

/** A labelled list of Checkboxes where people pick any number (Figma Checkbox Group). Keep it under about 10 options. */
const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ className, optionsClassName, label, optional, optionalLabel, helperText, error, orientation = "vertical", disabled, id, children }, ref) => {
    const generatedId = React.useId();
    const groupId = id ?? generatedId;
    return (
      <FieldGroupShell
        as="fieldset"
        id={groupId}
        label={label}
        optional={optional}
        optionalLabel={optionalLabel}
        helperText={helperText}
        error={error}
        disabled={disabled}
        className={className}
      >
        {() => (
          <div
            ref={ref}
            className={cn("flex", orientation === "vertical" ? "flex-col items-start gap-gap-7" : "flex-row flex-wrap gap-x-gap-11 gap-y-gap-7", optionsClassName)}
          >
            {children}
          </div>
        )}
      </FieldGroupShell>
    );
  }
);
CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };
