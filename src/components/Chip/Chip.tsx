"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Chip — Figma: StudioKIT 2.0 › Chip (557:80335). Description: docs/figma-descriptions/chip.md
 *
 * A small interactive element for filters, choices and entered values. Two kinds:
 *  - Toggle (filter) chip: a `<button aria-pressed>`. Pass `pressed` + `onPressedChange`. Pressed shows the Primary
 *    variant and a check in the prefix slot (when no prefix is given), so the state isn't shown by colour alone.
 *  - Removable (input) chip: pass `onRemove`. The chip is a label plus its own "Remove <value>" button.
 * Figma property → prop:  Variant → variant · Style → appearance · Size → size · Prefix + Prefix type (Icon / Logo /
 * Avatar) → prefix · Suffix (the ×) → onRemove · Label → children · State → interaction / disabled.
 * Sizes (height · padding · gap · radius · text · icon):
 *   small  Forms/XSmall · Gap/3 × Gap/2 · Gap/0 · Control/md · Caption/Strong/Medium · 16
 *   medium Forms/Small  · Gap/6 × Gap/2 · Gap/2 · Control/lg · Label/Strong/Small    · 16
 *   large  Forms/Medium · Gap/7 × Gap/4 · Gap/3 · Control/lg · Label/Strong/Small    · 20
 * Label wrapper padding Gap/2. Colours: Secondary Filled Dynamic/Fill/Secondary/Alpha/Strong/* + Dynamic/Text/Secondary;
 * Primary Filled Dynamic/Fill/Primary/* + Dynamic/Text/OnPrimary/*; Border Static/Fill/Highlight/Base +
 * Dynamic/Stroke/<V>/* + Dynamic/Text/<V>/*. Focused: Focus/Base.
 */
export type ChipVariant = "primary" | "secondary";
export type ChipAppearance = "filled" | "border";
export type ChipSize = "small" | "medium" | "large";

const sizeClass: Record<ChipSize, string> = {
  small: "h-forms-xsmall px-gap-3 py-gap-2 gap-gap-0 rounded-control-md type-caption-strong-medium [&_svg]:size-size-9",
  medium: "h-forms-small px-gap-6 py-gap-2 gap-gap-2 rounded-control-lg type-label-strong-small [&_svg]:size-size-9",
  large: "h-forms-medium px-gap-7 py-gap-4 gap-gap-3 rounded-control-lg type-label-strong-small [&_svg]:size-size-9 [&>[data-prefix]_svg]:size-size-11",
};

type Tone = { base: string; interactive: string; disabled: string };
const tones: Record<ChipVariant, Record<ChipAppearance, Tone>> = {
  primary: {
    filled: {
      base: "bg-dynamic-fill-primary-default text-dynamic-text-onprimary-default",
      interactive: "hover:bg-dynamic-fill-primary-hover hover:text-dynamic-text-onprimary-hover active:bg-dynamic-fill-primary-pressed active:text-dynamic-text-onprimary-pressed",
      disabled: "bg-dynamic-fill-primary-disabled text-dynamic-text-onprimary-disabled",
    },
    border: {
      base: "border border-dynamic-stroke-primary-default bg-static-fill-highlight-base text-dynamic-text-primary-default",
      interactive: "hover:border-dynamic-stroke-primary-hover hover:text-dynamic-text-primary-hover active:border-dynamic-stroke-primary-pressed active:text-dynamic-text-primary-pressed",
      disabled: "border border-dynamic-stroke-primary-disabled bg-static-fill-highlight-base text-dynamic-text-primary-disabled",
    },
  },
  secondary: {
    filled: {
      base: "bg-dynamic-fill-secondary-alpha-strong-default text-dynamic-text-secondary-default",
      interactive: "hover:bg-dynamic-fill-secondary-alpha-strong-hover active:bg-dynamic-fill-secondary-alpha-strong-pressed",
      disabled: "bg-dynamic-fill-secondary-alpha-strong-default text-dynamic-text-onsecondary-disabled",
    },
    border: {
      base: "border border-dynamic-stroke-secondary-default bg-static-fill-highlight-base text-dynamic-text-secondary-default",
      interactive: "hover:border-dynamic-stroke-secondary-hover hover:text-dynamic-text-secondary-hover active:border-dynamic-stroke-secondary-pressed active:text-dynamic-text-secondary-pressed",
      disabled: "border border-dynamic-stroke-secondary-default bg-static-fill-highlight-base text-dynamic-text-onsecondary-disabled",
    },
  },
};

const root =
  "inline-flex w-fit shrink-0 items-center whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-150 focus-visible:outline-none [&_svg]:shrink-0";

interface ChipBaseProps {
  /** Figma "Variant": `secondary` (default, neutral) or `primary`. A toggle chip shows Primary while pressed. */
  variant?: ChipVariant;
  /** Figma "Style": `filled` (default) or `border`. */
  appearance?: ChipAppearance;
  /** Figma "Size": small 24 · medium 32 (default) · large 40. */
  size?: ChipSize;
  /** Figma "Prefix": an icon, logo or small Avatar (Prefix type) before the label. */
  prefix?: React.ReactNode;
  /** Figma "Label": one or two words. */
  children: React.ReactNode;
  /** Blocks interaction. */
  disabled?: boolean;
}

export interface ChipProps extends ChipBaseProps, Omit<React.HTMLAttributes<HTMLElement>, "children" | "prefix"> {
  /** Toggle chip: on/off state, exposed as `aria-pressed`. Leave it out for a removable chip. */
  pressed?: boolean;
  /** Toggle chip: called with the new state when the chip is clicked. */
  onPressedChange?: (pressed: boolean) => void;
  /** Removable chip (Figma "Suffix" ×): called when the remove button is pressed. Makes the chip a label + button. */
  onRemove?: () => void;
  /** Accessible name of the remove button. Defaults to "Remove <label>" when the label is text. */
  removeLabel?: string;
}

/** Filter or input chip (Figma Chip). Toggle chips use `pressed`; removable chips use `onRemove`. Use Tag for read-only labels. */
const Chip = React.forwardRef<HTMLElement, ChipProps>(
  (
    { className, variant, appearance = "filled", size = "medium", prefix, children, disabled = false, pressed, onPressedChange, onRemove, removeLabel, onClick, ...props },
    ref
  ) => {
    const isToggle = pressed !== undefined && !onRemove;
    const shownVariant: ChipVariant = isToggle && pressed ? "primary" : variant ?? "secondary";
    const tone = tones[shownVariant][appearance];
    const prefixNode = prefix ?? (isToggle && pressed ? <Check /> : null);
    const content = (
      <>
        {prefixNode != null && <span data-prefix="" aria-hidden="true" className="inline-flex">{prefixNode}</span>}
        <span className="px-gap-2">{children}</span>
      </>
    );

    if (onRemove) {
      const name = removeLabel ?? (typeof children === "string" ? `Remove ${children}` : "Remove");
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          aria-disabled={disabled || undefined}
          className={cn(root, sizeClass[size], disabled ? tone.disabled : tone.base, className)}
          {...props}
        >
          {content}
          <button
            type="button"
            aria-label={name}
            disabled={disabled}
            onClick={onRemove}
            className={cn(
              "inline-flex items-center justify-center rounded-control-sm transition-shadow duration-150 focus-visible:shadow-focus-base focus-visible:outline-none disabled:pointer-events-none",
              size === "large" ? "size-size-11" : "size-size-9"
            )}
          >
            <X aria-hidden="true" />
          </button>
        </span>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        aria-pressed={isToggle ? pressed : undefined}
        disabled={disabled}
        onClick={(e) => {
          onClick?.(e as React.MouseEvent<HTMLElement>);
          if (isToggle && !e.defaultPrevented) onPressedChange?.(!pressed);
        }}
        className={cn(root, sizeClass[size], "cursor-pointer focus-visible:shadow-focus-base disabled:pointer-events-none", disabled ? tone.disabled : cn(tone.base, tone.interactive), className)}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);
Chip.displayName = "Chip";

export { Chip };
