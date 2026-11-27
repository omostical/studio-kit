"use client";
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { FieldGroupShell } from "../_shared/field";
import { Input } from "../Input";

/**
 * Slider — Figma: StudioKIT 2.0 › Slider (557:71428), thumb from .Assets / Control.
 * Description: docs/figma-descriptions/slider.md
 *
 * Figma property → prop:  Progress → value · Range → two values (`defaultValue={[20, 80]}`) · Progress=Disabled →
 * disabled · Label (Side / Bottom / Inputs) → labelPosition · Labels → showLabels · Left / Right Label → minLabel / maxLabel.
 * Track: Size/3 (4px), Static/Stroke/Base, Control/full; range Dynamic/Fill/Primary/Default (Disabled: Primary/Disabled,
 * where Figma hides the range — kept so the value still shows).
 * Thumb: Control/XSmall (12) tall pill, Control/md, Static/Fill/Foreground, 2px Dynamic/Stroke/Primary (hover: Hover;
 * pressed and focused: Primary/Strong), Controls/Control shadow, three grip lines; 48px (Forms/Large) touch area.
 * Focused → Focus/Base. Min/max labels: Number/Small in Static/Text/Subtle. Inputs: small Inputs, one per thumb.
 * Built on Radix Slider: `role="slider"` thumbs with value attributes, arrows step, Page Up/Down and Home/End jump.
 */
export interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "value" | "defaultValue" | "onValueChange" | "orientation" | "dir"> {
  /** Controlled value: one number, or two for a range (Figma Range). */
  value?: number[];
  /** Initial value when uncontrolled. Two numbers make a range slider. Default `[min]`. */
  defaultValue?: number[];
  /** Called with the new value while dragging or typing. */
  onValueChange?: (value: number[]) => void;
  /** Visible label above the slider (what it sets). Without one, pass aria-label. */
  label?: React.ReactNode;
  /** Hint under the slider. */
  helperText?: React.ReactNode;
  /** Figma Label: `side` (min/max beside the track, default), `bottom` (under it) or `inputs` (number fields under it for exact values). */
  labelPosition?: "side" | "bottom" | "inputs";
  /** Figma Labels: show the min/max labels (default true). Ignored for `inputs`. */
  showLabels?: boolean;
  /** Figma Left Label: text at the start (default `min`, e.g. "$0"). */
  minLabel?: React.ReactNode;
  /** Figma Right Label: text at the end (default `max`). */
  maxLabel?: React.ReactNode;
  /** Names for the two thumbs of a range (default "Minimum", "Maximum"); also the Input labels. */
  thumbLabels?: [string, string];
  /** Accessible name when there is no visible label. */
  "aria-label"?: string;
  /** Class for the outer wrapper. `className` styles the slider row. */
  wrapperClassName?: string;
}

const thumbClass = cn(
  "group relative flex h-control-xsmall items-center gap-gap-2 rounded-control-md border-2 px-gap-3 transition-[border-color,box-shadow] duration-150",
  "border-dynamic-stroke-primary-default bg-static-fill-foreground shadow-controls-control",
  "hover:border-dynamic-stroke-primary-hover active:border-dynamic-stroke-primary-strong-default",
  "focus-visible:outline-none focus-visible:border-dynamic-stroke-primary-strong-default focus-visible:shadow-focus-base",
  "data-[disabled]:cursor-not-allowed data-[disabled]:border-dynamic-stroke-secondary-default data-[disabled]:hover:border-dynamic-stroke-secondary-default",
  "before:absolute before:left-1/2 before:top-1/2 before:size-forms-large before:-translate-x-1/2 before:-translate-y-1/2"
);
const gripClass = "block h-size-3 w-px bg-dynamic-stroke-primary-default group-data-[disabled]:bg-dynamic-stroke-secondary-default";

/** Picks a value or range by dragging along a track (Figma Slider). Use an Input when people need an exact value, or `labelPosition="inputs"`. */
const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      className,
      wrapperClassName,
      value: valueProp,
      defaultValue,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      label,
      helperText,
      labelPosition = "side",
      showLabels = true,
      minLabel,
      maxLabel,
      thumbLabels = ["Minimum", "Maximum"],
      disabled,
      id,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const sliderId = id ?? generatedId;
    const [internal, setInternal] = React.useState<number[]>(defaultValue ?? [min]);
    const value = valueProp ?? internal;
    const setValue = (next: number[]) => {
      if (valueProp === undefined) setInternal(next);
      onValueChange?.(next);
    };
    const range = value.length > 1;
    const name = typeof label === "string" ? label : ariaLabel;

    return (
      <FieldGroupShell as="div" id={sliderId} label={label} helperText={helperText} disabled={disabled} className={wrapperClassName}>
        {({ labelId, messageId }) => {
          const slider = (
            <SliderPrimitive.Root
              ref={ref}
              id={sliderId}
              value={value}
              onValueChange={setValue}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              minStepsBetweenThumbs={range ? 1 : undefined}
              className="relative flex h-control-xsmall w-full min-w-0 grow touch-none select-none items-center data-[disabled]:cursor-not-allowed"
              {...props}
            >
              <SliderPrimitive.Track className="relative h-size-3 grow overflow-hidden rounded-control-full bg-static-stroke-base">
                <SliderPrimitive.Range className="absolute h-full rounded-control-full bg-dynamic-fill-primary-default data-[disabled]:bg-dynamic-fill-primary-disabled" />
              </SliderPrimitive.Track>
              {value.map((_, i) => (
                <SliderPrimitive.Thumb
                  key={i}
                  className={thumbClass}
                  aria-labelledby={!range && label != null ? labelId : undefined}
                  aria-label={range ? (name ? `${name}, ${thumbLabels[i]}` : thumbLabels[i]) : label == null ? ariaLabel : undefined}
                  aria-describedby={messageId}
                >
                  <span aria-hidden="true" className={gripClass} />
                  <span aria-hidden="true" className={gripClass} />
                  <span aria-hidden="true" className={gripClass} />
                </SliderPrimitive.Thumb>
              ))}
            </SliderPrimitive.Root>
          );
          const minText = <span className="shrink-0 type-number-small text-static-text-subtle">{minLabel ?? min}</span>;
          const maxText = <span className="shrink-0 type-number-small text-static-text-subtle">{maxLabel ?? max}</span>;

          if (labelPosition === "inputs") {
            const update = (i: number, raw: string) => {
              const n = Number(raw);
              if (raw === "" || Number.isNaN(n)) return;
              const next = [...value];
              const lo = i === 1 ? value[0] : min;
              const hi = i === 0 && range ? value[1] : max;
              next[i] = Math.min(Math.max(n, lo), hi);
              setValue(next);
            };
            return (
              <div className={cn("flex flex-col gap-gap-9", className)}>
                {slider}
                <div className="flex items-center gap-gap-3">
                  {value.map((v, i) => (
                    <React.Fragment key={i}>
                      {i === 1 && <span aria-hidden="true" className="h-px w-size-5 shrink-0 bg-static-stroke-base" />}
                      <Input
                        size="small"
                        type="number"
                        inputMode="decimal"
                        min={min}
                        max={max}
                        step={step}
                        value={v}
                        disabled={disabled}
                        aria-label={range ? (name ? `${name}, ${thumbLabels[i]}` : thumbLabels[i]) : (name ?? "Value")}
                        onChange={(e) => update(i, e.target.value)}
                        wrapperClassName="min-w-0 flex-1"
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          }
          if (labelPosition === "bottom") {
            return (
              <div className={cn("flex flex-col gap-gap-6", className)}>
                {slider}
                {showLabels && (
                  <div className="flex justify-between gap-gap-9" aria-hidden="true">
                    {minText}
                    {maxText}
                  </div>
                )}
              </div>
            );
          }
          return (
            <div className={cn("flex items-center gap-gap-9", className)}>
              {showLabels && <span aria-hidden="true" className="contents">{minText}</span>}
              {slider}
              {showLabels && <span aria-hidden="true" className="contents">{maxText}</span>}
            </div>
          );
        }}
      </FieldGroupShell>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
