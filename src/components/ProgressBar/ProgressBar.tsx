"use client";

import * as React from "react";
import { CircleAlert, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ProgressBar — Figma: StudioKIT 2.0 › Progress Bar (4716:92306). Description: docs/figma-descriptions/progress-bar.md
 *
 * Figma property → prop:  Type → type (line · circle) · Progress (0–100%) → value · Progress=Success/Error → status
 * (success · danger) · Label → label · Description → description.
 * Line: label row (Label/Strong/Small in Static/Text/Strong, value in Label/Small Static/Text/Subtle), 4px track
 * (Size/3) in Dynamic/Stroke/Secondary/Default, fill Dynamic/Fill/Primary/Default (success: Semantic/Stroke/Positive,
 * danger: Semantic/Stroke/Negative), pill ends; Gap/5 between rows; helper text Body/Small in Static/Text/Subtle.
 * Circle: value text then a 20px ring (inner radius 75%), Gap/5 apart; success fills the ring in
 * Dynamic/Fill/Success/Default with a check, danger shows the danger icon (Dynamic/Text/Danger/Default).
 */
export type ProgressBarType = "line" | "circle";
export type ProgressBarStatus = "success" | "danger";

export interface ProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Figma "Type": `line` (default) or `circle` (compact, e.g. in a table cell). */
  type?: ProgressBarType;
  /** Figma "Progress": 0–100. Leave it out only with a `status`. */
  value?: number;
  /** Figma "Progress=Success/Error": finished (`success`) or failed (`danger`). Shown with an icon or text, never colour alone. */
  status?: ProgressBarStatus;
  /** Figma "Label": what is progressing ("Uploading report.pdf"). Also the accessible name. */
  label: string;
  /** Hide the label visually (it stays the accessible name). The circle type always hides it, as in Figma. */
  hideLabel?: boolean;
  /** Figma "Description": helper text under the line ("2 of 5 files"). In `danger`, say how to fix it. */
  description?: React.ReactNode;
  /** The value text (default "60%"). Pass e.g. "3 of 5 steps". */
  valueText?: string;
}

const fillTone = (status?: ProgressBarStatus) =>
  status === "success" ? "bg-semantic-stroke-positive" : status === "danger" ? "bg-semantic-stroke-negative" : "bg-dynamic-fill-primary-default";

/** Shows how far a task has got (Figma Progress Bar). Use a spinner when progress can't be measured. */
const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, type = "line", value = 0, status, label, hideLabel = false, description, valueText, ...props }, ref) => {
    const pct = Math.max(0, Math.min(100, status === "success" ? 100 : value));
    const text = valueText ?? (status === "success" ? "Done" : status === "danger" ? "Failed" : `${Math.round(pct)}%`);
    const descId = React.useId();
    const aria = {
      role: "progressbar" as const,
      "aria-label": label,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": Math.round(pct),
      "aria-valuetext": `${text}`,
      "aria-describedby": description != null ? descId : undefined,
    };

    if (type === "circle") {
      const r = 8.75;
      const c = 2 * Math.PI * r;
      return (
        <div ref={ref} className={cn("inline-flex items-center gap-gap-5", className)} {...aria} {...props}>
          <span className="type-label-small text-static-text-subtle">{text}</span>
          <span className="relative inline-flex size-size-11 shrink-0 items-center justify-center">
            {status === "danger" ? (
              <CircleAlert aria-hidden="true" className="size-size-11 text-dynamic-text-danger-default" />
            ) : (
              <>
                <svg viewBox="0 0 20 20" aria-hidden="true" className="size-size-11 -rotate-90">
                  <circle cx="10" cy="10" r={r} fill="none" strokeWidth="2.5" className="stroke-dynamic-stroke-secondary-default" />
                  <circle
                    cx="10" cy="10" r={r} fill="none" strokeWidth="2.5" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
                    className={status === "success" ? "stroke-dynamic-fill-success-default" : "stroke-dynamic-fill-primary-default"}
                  />
                </svg>
                {status === "success" && <Check aria-hidden="true" className="absolute size-size-7 text-dynamic-text-success-default" />}
              </>
            )}
          </span>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("flex w-full flex-col gap-gap-5", className)} {...aria} {...props}>
        <div className={cn("flex items-baseline justify-between gap-gap-3", hideLabel && "justify-end")}>
          {!hideLabel && <span className="type-label-strong-small text-static-text-strong">{label}</span>}
          <span className="type-label-small text-static-text-subtle">{text}</span>
        </div>
        <div className="relative h-size-3 w-full overflow-hidden rounded-control-full bg-dynamic-stroke-secondary-default">
          <div
            className={cn("h-full rounded-control-full transition-[width] duration-300", fillTone(status))}
            style={{ width: `${pct}%` }}
          />
        </div>
        {description != null && (
          <p id={descId} className={cn("flex items-center gap-gap-3 type-body-small", status === "danger" ? "text-semantic-text-negative" : "text-static-text-subtle")}>
            {status === "danger" && <CircleAlert aria-hidden="true" className="size-size-9 shrink-0" />}
            {status === "success" && <Check aria-hidden="true" className="size-size-9 shrink-0 text-semantic-text-positive" />}
            {description}
          </p>
        )}
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
