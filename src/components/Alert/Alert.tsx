import * as React from "react";
import { cva } from "class-variance-authority";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";

/**
 * Alert — Figma: StudioKIT 2.0 › Inline Alert (4705:88320). Description: docs/figma-descriptions/inline-alert.md
 *
 * A message inside the page, next to the content it's about. App-wide messages → System Alert;
 * short confirmations → Toast.
 * Figma property → prop:  Status → status · Position → position · Message → description ·
 * Actions → action / actionLabel · Dismiss → dismissible.
 * Box: Semantic/Fill/<Status>, Corner Radius/Container/md, padding Gap/7 × 16; title Label/Strong/Small and
 * message Body/Medium in Semantic/Text/OnSubtle/<Status>; icon 20px in Semantic/Text/<Status>.
 */
export type AlertStatus = "error" | "warning" | "success" | "info";

const statusStyle: Record<AlertStatus, { box: string; text: string; icon: string; Icon: React.ComponentType<{ className?: string }> }> = {
  error: { box: "bg-semantic-fill-negative", text: "text-semantic-text-onsubtle-negative", icon: "text-semantic-text-negative", Icon: XCircle },
  warning: { box: "bg-semantic-fill-notice", text: "text-semantic-text-onsubtle-notice", icon: "text-semantic-text-notice", Icon: AlertTriangle },
  success: { box: "bg-semantic-fill-positive", text: "text-semantic-text-onsubtle-positive", icon: "text-semantic-text-positive", Icon: CheckCircle2 },
  info: { box: "bg-semantic-fill-info", text: "text-semantic-text-onsubtle-info", icon: "text-semantic-text-info", Icon: Info },
};

const alertVariants = cva("flex rounded-container-md px-gap-9 py-gap-7", {
  variants: {
    position: { horizontal: "items-start gap-gap-7", vertical: "flex-col gap-gap-7" },
  },
  defaultVariants: { position: "horizontal" },
});

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  status?: AlertStatus;
  position?: "horizontal" | "vertical";
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Heading level for the title, to fit the page outline. */
  titleAs?: "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  /** Replace the status icon; `null` hides it. */
  icon?: React.ReactNode;
  action?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  dismissLabel?: string;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      status = "info",
      position = "horizontal",
      title,
      titleAs: TitleTag = "h3",
      description,
      icon,
      action,
      actionLabel,
      onAction,
      dismissible = false,
      dismissLabel = "Dismiss",
      onDismiss,
      role,
      ...props
    },
    ref
  ) => {
    const s = statusStyle[status];
    const iconNode =
      icon === null ? null : (
        <span className={cn("flex size-size-11 shrink-0 items-center justify-center [&_svg]:size-size-11", s.icon)} aria-hidden>
          {icon ?? <s.Icon />}
        </span>
      );
    const actionNode =
      action ??
      (actionLabel ? (
        <Button size="small" variant="secondary" appearance="border" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null);
    const dismissNode = dismissible ? (
      <IconButton size="small" variant="secondary" appearance="ghost" aria-label={dismissLabel} onClick={onDismiss} icon={<X />} className={s.text} />
    ) : null;

    return (
      <div
        ref={ref}
        role={role ?? (status === "error" || status === "warning" ? "alert" : "status")}
        className={cn(alertVariants({ position }), s.box, className)}
        {...props}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-gap-2">
          <div className="flex items-start gap-gap-7">
            {iconNode}
            <TitleTag className={cn("m-0 type-label-strong-small", s.text)}>{title}</TitleTag>
          </div>
          {description != null && (
            <p className={cn("m-0 type-body-medium", iconNode && "pl-gap-14", s.text)}>{description}</p>
          )}
        </div>
        {(actionNode || dismissNode) && (
          <div className={cn("flex shrink-0 items-center gap-gap-5", position === "vertical" && iconNode && "pl-gap-14")}>
            {actionNode}
            {dismissNode}
          </div>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

export { Alert, alertVariants };
