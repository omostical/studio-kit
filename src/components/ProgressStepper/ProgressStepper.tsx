"use client";

import * as React from "react";
import { Check, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ProgressStepper — Figma: StudioKIT 2.0 › Progress Stepper (10034:31374), built from Assets / Progress Stepper Item
 * (557:58517). Description: docs/figma-descriptions/progress-stepper.md
 *
 * The steps of a multi-step flow and where people are. Renders an ordered list; the current step has
 * `aria-current="step"`, and every step says its state in text for screen readers ("Completed", "Current step"…).
 * Steps with `onClick` or `href` are links back (usually to completed steps).
 *
 * Figma property → prop:  Stepper Position → `position` · Size → `size` (small only) · Item Type → ProgressStep
 * `type` (Completed → `completed`, Active → `active`, Incompleted → `incomplete`, Error → `danger`) · Description
 * (show/hide) → `description` · Stripe (show/hide) → automatic between horizontal steps · State → hover / pressed /
 * focus-visible / `disabled`.
 *
 * Horizontal: steps Gap/9 apart; circle 32 (Size/14), Control/full; label gap Gap/7; Stripe 64×1 (Size/20) in
 * Static/Stroke/Base. Completed Dynamic/Fill/Success + 20px check in Static/Text/Inverse/Strong · Active
 * Dynamic/Fill/Primary/Alpha/Strong + number in Dynamic/Text/Primary · Incompleted Dynamic/Fill/Secondary + number
 * in Dynamic/Text/OnSecondary · Error Dynamic/Fill/Danger. Focus/Base (Focus/Danger for Error) on the circle.
 * Vertical: steps Gap/3 apart; each a Control/lg row with padding Gap/5 × Gap/7; circle 24 (Size/12). Completed
 * success fill + 16px check · Active row Dynamic/Fill/Tertiary/Alpha/Strong, circle ringed in
 * Dynamic/Stroke/Secondary with an 8px (Size/5) Dynamic/Fill/Primary dot · Incompleted row
 * Dynamic/Fill/Secondary/Alpha, ringed circle · Error danger fill. Focus/Base on the row.
 * Text: label Label/Strong/Small in Static/Text/Base (Static/Text/Subtle when disabled); description Body/Small in
 * Static/Text/Subtle. Figma's vertical Error item puts a 32px icon in the 24px circle; code uses a 16px icon.
 */
export type ProgressStepperPosition = "horizontal" | "vertical";
export type ProgressStepType = "completed" | "active" | "incomplete" | "danger";

interface StepContextValue {
  position: ProgressStepperPosition;
  number: number;
  isLast: boolean;
}
const StepContext = React.createContext<StepContextValue>({ position: "horizontal", number: 1, isLast: true });

const stateText: Record<ProgressStepType, string> = {
  completed: "Completed",
  active: "Current step",
  incomplete: "Not started",
  danger: "Needs attention",
};

export interface ProgressStepProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "onClick" | "type"> {
  /** Figma "Type": `completed`, `active` (the current step; only one), `incomplete` (default) or `danger` (a step with a problem to fix). */
  type?: ProgressStepType;
  /** Short step name, one or two words ("Shipping"). */
  label: React.ReactNode;
  /** Figma "Description": an optional second line under the label (a summary, or what to fix on a `danger` step). */
  description?: React.ReactNode;
  /** Figma State "Disabled": the step can't be visited yet or any more. */
  disabled?: boolean;
  /** Makes the step a button that goes to it. Offer it on completed steps so people can go back. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Makes the step a link to this URL. */
  href?: string;
}

/** One step of a ProgressStepper (Figma Progress Stepper Item). Use it only inside ProgressStepper. */
const ProgressStep = React.forwardRef<HTMLLIElement, ProgressStepProps>(
  ({ type = "incomplete", label, description, disabled = false, onClick, href, className, ...props }, ref) => {
    const { position, number, isLast } = React.useContext(StepContext);
    const vertical = position === "vertical";
    const interactive = !disabled && (onClick != null || href != null);
    const isDanger = type === "danger";

    const circle = cn(
      "flex shrink-0 items-center justify-center rounded-control-full type-label-strong-small transition-[background-color,border-color,box-shadow] duration-150",
      vertical ? "size-size-12 [&_svg]:size-size-9" : "size-size-14 [&_svg]:size-size-11",
      type === "completed" &&
        (disabled
          ? "bg-dynamic-fill-success-disabled text-static-text-inverse-strong"
          : "bg-dynamic-fill-success-default text-static-text-inverse-strong group-hover:bg-dynamic-fill-success-hover group-active:bg-dynamic-fill-success-pressed"),
      isDanger &&
        (disabled
          ? "bg-dynamic-fill-danger-disabled text-static-text-inverse-strong"
          : "bg-dynamic-fill-danger-default text-static-text-inverse-strong group-hover:bg-dynamic-fill-danger-hover group-active:bg-dynamic-fill-danger-pressed"),
      !vertical &&
        type === "active" &&
        (disabled
          ? "border border-dynamic-stroke-secondary-disabled text-dynamic-text-onsecondary-disabled"
          : "bg-dynamic-fill-primary-alpha-strong-default text-dynamic-text-primary-default group-hover:bg-dynamic-fill-primary-alpha-strong-hover group-active:bg-dynamic-fill-primary-alpha-strong-pressed"),
      !vertical &&
        type === "incomplete" &&
        (disabled
          ? "border border-dynamic-stroke-secondary-disabled text-dynamic-text-onsecondary-disabled"
          : "bg-dynamic-fill-secondary-default text-dynamic-text-onsecondary-default group-hover:bg-dynamic-fill-secondary-hover group-active:bg-dynamic-fill-secondary-pressed"),
      vertical &&
        (type === "active" || type === "incomplete") &&
        (disabled
          ? "border border-dynamic-stroke-secondary-disabled"
          : "border border-dynamic-stroke-secondary-default group-hover:border-dynamic-stroke-secondary-hover group-active:border-dynamic-stroke-secondary-pressed"),
      !vertical && (isDanger ? "group-focus-visible:shadow-focus-danger" : "group-focus-visible:shadow-focus-base")
    );

    const marker =
      type === "completed" ? (
        <Check aria-hidden="true" />
      ) : isDanger ? (
        <CircleAlert aria-hidden="true" />
      ) : vertical ? (
        type === "active" ? (
          <span aria-hidden="true" className={cn("size-size-5 rounded-control-full", disabled ? "bg-dynamic-fill-primary-disabled" : "bg-dynamic-fill-primary-default")} />
        ) : null
      ) : (
        <span aria-hidden="true">{number}</span>
      );

    const row = vertical
      ? cn(
          "flex w-full items-center gap-gap-7 rounded-control-lg px-gap-7 py-gap-5 text-left no-underline outline-none transition-[background-color,box-shadow] duration-150",
          type === "active" && "bg-dynamic-fill-tertiary-alpha-strong-default",
          type === "active" && interactive && "hover:bg-dynamic-fill-tertiary-alpha-strong-hover active:bg-dynamic-fill-tertiary-alpha-strong-pressed",
          type === "incomplete" && "bg-dynamic-fill-secondary-alpha-default",
          type === "incomplete" && interactive && "hover:bg-dynamic-fill-secondary-alpha-hover active:bg-dynamic-fill-secondary-alpha-pressed",
          isDanger ? "focus-visible:bg-dynamic-fill-danger-alpha-default focus-visible:shadow-focus-danger" : "focus-visible:shadow-focus-base"
        )
      : "flex items-center gap-gap-7 rounded-control-full text-left no-underline outline-none";

    const inner = (
      <>
        <span className={circle}>{marker}</span>
        <span className="flex min-w-0 flex-col">
          <span className={cn("type-label-strong-small", disabled ? "text-static-text-subtle" : "text-static-text-base")}>{label}</span>
          {description != null && <span className="type-body-small text-static-text-subtle">{description}</span>}
          <span className="sr-only">, {stateText[type]}</span>
        </span>
      </>
    );

    const current = type === "active" ? ("step" as const) : undefined;
    const body =
      href != null && !disabled ? (
        <a href={href} aria-current={current} className={cn("group", row)}>
          {inner}
        </a>
      ) : onClick != null && !disabled ? (
        <button type="button" onClick={onClick} aria-current={current} className={cn("group", row)}>
          {inner}
        </button>
      ) : (
        <div aria-current={current} aria-disabled={disabled || undefined} className={row}>
          {inner}
        </div>
      );

    return (
      <li ref={ref} className={cn("flex items-center", vertical ? "w-full" : "shrink-0 gap-gap-9", className)} {...props}>
        {body}
        {!vertical && !isLast && <span aria-hidden="true" className="h-px w-size-20 shrink-0 bg-static-stroke-base" />}
      </li>
    );
  }
);
ProgressStep.displayName = "ProgressStep";

export interface ProgressStepperProps extends React.OlHTMLAttributes<HTMLOListElement> {
  /** Figma "Position": `horizontal` (default; scrolls sideways when it doesn't fit) or `vertical` (side panels and narrow screens). */
  position?: ProgressStepperPosition;
  /** Figma "Size": `small`, the only size. */
  size?: "small";
  /** Accessible name of the list. Default "Progress". */
  "aria-label"?: string;
  /** ProgressStep elements, in order. Keep to 3–7 steps. */
  children?: React.ReactNode;
}

/** The steps of a multi-step flow (Figma Progress Stepper). Use Breadcrumbs for site hierarchy. */
const ProgressStepper = React.forwardRef<HTMLOListElement, ProgressStepperProps>(
  ({ position = "horizontal", size: _size = "small", className, children, "aria-label": ariaLabel = "Progress", ...props }, ref) => {
    void _size;
    const steps = React.Children.toArray(children).filter(React.isValidElement);
    return (
      <ol
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          position === "vertical" ? "flex flex-col gap-gap-3" : "relative flex items-center gap-gap-9 overflow-x-auto p-gap-3",
          className
        )}
        {...props}
      >
        {steps.map((step, i) => (
          <StepContext.Provider key={step.key ?? i} value={{ position, number: i + 1, isLast: i === steps.length - 1 }}>
            {step}
          </StepContext.Provider>
        ))}
      </ol>
    );
  }
);
ProgressStepper.displayName = "ProgressStepper";

export { ProgressStepper, ProgressStep };
