import * as React from "react";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";

/**
 * SystemAlert — Figma: StudioKIT 2.0 › System Alert (557:55446). Description: docs/figma-descriptions/system-alert.md
 *
 * A full-width banner for a message about the whole app or account (maintenance, billing, outage), placed above
 * the page header. Differs from Alert (Figma Inline Alert): no corners, edge to edge, one centred line, a High
 * (solid) emphasis, a Neutral status and XSmall controls. Messages about one part of the page → Alert.
 * Figma property → prop:  Status (Negative / Notice / Positive / Info / Neutral) → `status` danger · warning ·
 * success · info · neutral · Emphasis → `emphasis` · Message → `message` · Action → action / actionLabel ·
 * Dismissible → `dismissible`.
 * Bar: padding Gap/3 × Gap/9, gap Gap/9, content centred. Message: 20px icon in a 32px box (padding Gap/4) and
 * Label/Strong/Small, gap Gap/3. Actions: XSmall Border Button and XSmall Ghost close, gap Gap/3.
 * High: Semantic/Fill/Inverse/<Status>, text and icon Semantic/Text/OnInverse/<Status>, Inverse controls (Warning
 * keeps Secondary controls on its light fill, as in Figma). Low: Semantic/Fill/<Status>, icon
 * Semantic/Text/<Status>, text Semantic/Text/OnSubtle/<Status> (Neutral: Semantic/Text/Neutral), Secondary controls.
 * Neutral has no icon. Icons follow Alert (one shape per status).
 */
export type SystemAlertStatus = "danger" | "warning" | "success" | "info" | "neutral";

const statusStyle: Record<
  SystemAlertStatus,
  { high: string; low: string; lowIcon: string; Icon?: React.ComponentType }
> = {
  danger: {
    high: "bg-semantic-fill-inverse-negative text-semantic-text-oninverse-negative",
    low: "bg-semantic-fill-negative text-semantic-text-onsubtle-negative",
    lowIcon: "text-semantic-text-negative",
    Icon: XCircle,
  },
  warning: {
    high: "bg-semantic-fill-inverse-notice text-semantic-text-oninverse-notice",
    low: "bg-semantic-fill-notice text-semantic-text-onsubtle-notice",
    lowIcon: "text-semantic-text-notice",
    Icon: AlertTriangle,
  },
  success: {
    high: "bg-semantic-fill-inverse-positive text-semantic-text-oninverse-positive",
    low: "bg-semantic-fill-positive text-semantic-text-onsubtle-positive",
    lowIcon: "text-semantic-text-positive",
    Icon: CheckCircle2,
  },
  info: {
    high: "bg-semantic-fill-inverse-info text-semantic-text-oninverse-info",
    low: "bg-semantic-fill-info text-semantic-text-onsubtle-info",
    lowIcon: "text-semantic-text-info",
    Icon: Info,
  },
  neutral: {
    high: "bg-semantic-fill-inverse-neutral text-semantic-text-oninverse-neutral",
    low: "bg-semantic-fill-neutral text-semantic-text-neutral",
    lowIcon: "",
  },
};

export interface SystemAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma Status: danger · warning · success · info · neutral (no icon). Pick by meaning; the message must say it too. */
  status?: SystemAlertStatus;
  /** Figma Emphasis: `high` (solid inverse fill, default) or `low` (subtle fill). */
  emphasis?: "high" | "low";
  /** Figma Message: what happened and what to do, in one short line. */
  message: React.ReactNode;
  /** Replace the status icon; `null` hides it. */
  icon?: React.ReactNode;
  /** Custom action element; overrides actionLabel/onAction. */
  action?: React.ReactNode;
  /** Label for a single action button (e.g. "Update billing"). */
  actionLabel?: string;
  /** Called when the action button is pressed. */
  onAction?: () => void;
  /** Figma Dismissible: show the dismiss (×) button. Leave it off for critical messages. */
  dismissible?: boolean;
  /** Accessible name of the dismiss button (default "Dismiss"). */
  dismissLabel?: string;
  /** Called when dismissed; hide the banner in response. */
  onDismiss?: () => void;
}

/** Full-width banner about the whole app or account (Figma System Alert). One at a time, above the page header. role="status" by default; pass role="alert" only for urgent messages. */
const SystemAlert = React.forwardRef<HTMLDivElement, SystemAlertProps>(
  (
    {
      className,
      status = "info",
      emphasis = "high",
      message,
      icon,
      action,
      actionLabel,
      onAction,
      dismissible = false,
      dismissLabel = "Dismiss",
      onDismiss,
      role = "status",
      ...props
    },
    ref
  ) => {
    const s = statusStyle[status];
    const high = emphasis === "high";
    // Figma: high-emphasis Warning sits on a light fill, so it keeps the Secondary controls.
    const controlVariant = high && status !== "warning" ? "inverse" : "secondary";
    const Icon = s.Icon;
    const iconNode =
      icon === null || (!icon && !Icon) ? null : (
        <span aria-hidden className={cn("flex shrink-0 p-gap-4 [&_svg]:size-size-11", !high && s.lowIcon)}>
          {icon ?? (Icon && <Icon />)}
        </span>
      );
    const actionNode =
      action ??
      (actionLabel ? (
        <Button size="xsmall" variant={controlVariant} appearance="border" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null);

    return (
      <div
        ref={ref}
        role={role}
        className={cn(
          "flex w-full flex-wrap items-center justify-center gap-x-gap-9 gap-y-gap-3 px-gap-9 py-gap-3",
          high ? s.high : s.low,
          className
        )}
        {...props}
      >
        <div className="flex min-w-0 items-center gap-gap-3">
          {iconNode}
          <p className={cn("m-0 type-label-strong-small", !iconNode && "py-gap-4")}>{message}</p>
        </div>
        {(actionNode || dismissible) && (
          <div className="flex shrink-0 items-center gap-gap-3">
            {actionNode}
            {dismissible && (
              <IconButton size="xsmall" variant={controlVariant} appearance="ghost" icon={<X />} aria-label={dismissLabel} onClick={onDismiss} />
            )}
          </div>
        )}
      </div>
    );
  }
);
SystemAlert.displayName = "SystemAlert";

export { SystemAlert };
