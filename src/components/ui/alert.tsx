import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * Alert
 *
 * Source of truth: Figma StudioKIT_v1 — node 2654:14276
 * https://www.figma.com/design/yEvYgthP0qWo5EV4QUjZ8Z/StudioKIT_v1?node-id=2654-14276
 *
 * Transient, contextual feedback in-context. For page-level system banners use Banner;
 * for self-dismissing notifications use Toast.
 *
 * A11y contract:
 *   - info / success → role="status" (aria-live=polite)
 *   - warning / error → role="alert" (aria-live=assertive)
 *   - Dismiss control has 24×24 hit area and an accessible name (default "Dismiss")
 *   - Title renders as <h3> by default; override with `titleAs`
 */

type Intent = "info" | "success" | "warning" | "error";
type Layout = "vertical" | "horizontal";

const alertVariants = cva(
  [
    "flex items-start rounded-lg border p-4",
    "font-[family-name:var(--font-family-sans)]",
  ].join(" "),
  {
    variants: {
      intent: {
        info: "bg-[var(--bg-fill-brand-subtle)] border-[var(--border-brand-hh)]",
        success: "bg-[var(--bg-fill-success-subtle)] border-[var(--border-success-subtle)]",
        warning: "bg-[var(--bg-fill-warning-subtle)] border-[var(--border-warning-subtle)]",
        error: "bg-[var(--bg-fill-danger-subtle)] border-[var(--border-error-subtle)]",
      },
      layout: {
        vertical: "gap-4",
        horizontal: "gap-2.5",
      },
    },
    defaultVariants: {
      intent: "info",
      layout: "vertical",
    },
  }
);

const intentIcon: Record<Intent, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

const intentIconColor: Record<Intent, string> = {
  info: "text-[var(--icon-brand)]",
  success: "text-[var(--icon-success)]",
  warning: "text-[var(--icon-warning)]",
  error: "text-[var(--icon-error)]",
};

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Render the heading as a different element. Default `h3`. */
  titleAs?: "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  /** Override the per-intent default icon. Pass `null` to hide the icon. */
  icon?: React.ReactNode;
  /** Custom action node — overrides actionLabel/onAction. */
  action?: React.ReactNode;
  /** Convenience: render a Button with this label as the action. */
  actionLabel?: string;
  onAction?: () => void;
  /** Show the dismiss (×) control. */
  dismissible?: boolean;
  /** Accessible name for the dismiss button. */
  dismissLabel?: string;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      intent = "info",
      layout = "vertical",
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
    const computedIntent: Intent = intent ?? "info";
    const computedLayout: Layout = layout ?? "vertical";

    const IntentIcon = intentIcon[computedIntent];
    const computedRole =
      role ?? (computedIntent === "warning" || computedIntent === "error" ? "alert" : "status");
    const ariaLive = computedRole === "alert" ? "assertive" : "polite";

    const renderedIcon =
      icon === null ? null : icon !== undefined ? (
        <span className={cn("shrink-0", intentIconColor[computedIntent])} aria-hidden>
          {icon}
        </span>
      ) : (
        <IntentIcon className={cn("size-[18px] shrink-0", intentIconColor[computedIntent])} aria-hidden />
      );

    const renderedAction =
      action !== undefined
        ? action
        : actionLabel
        ? (
          <Button size="xs" variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        )
        : null;

    const titleNode = (
      <TitleTag className="text-sm font-medium leading-[18px] text-[var(--text-primary)] m-0">
        {title}
      </TitleTag>
    );
    const descriptionNode = description ? (
      <p className="text-[13px] leading-4 text-[var(--text-secondary)] m-0">{description}</p>
    ) : null;

    return (
      <div
        ref={ref}
        role={computedRole}
        aria-live={ariaLive}
        className={cn(alertVariants({ intent: computedIntent, layout: computedLayout }), className)}
        {...props}
      >
        {computedLayout === "vertical" ? (
          <>
            {renderedIcon}
            <div className="flex flex-1 flex-col gap-4 min-w-0">
              <div className="flex flex-col gap-1 min-w-0">
                {titleNode}
                {descriptionNode}
              </div>
              {renderedAction ? <div className="flex items-center gap-4">{renderedAction}</div> : null}
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              {renderedIcon}
              {titleNode}
            </div>
            {descriptionNode}
          </div>
        )}

        {(renderedAction && computedLayout === "horizontal") || dismissible ? (
          <div className="flex items-center gap-4 shrink-0">
            {computedLayout === "horizontal" && renderedAction}
            {dismissible ? (
              <button
                type="button"
                aria-label={dismissLabel}
                onClick={onDismiss}
                className={cn(
                  "inline-flex items-center justify-center size-6 rounded",
                  "text-[var(--icon-secondary)]",
                  "hover:bg-[var(--alpha-black-1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--border-brand)]",
                  "transition-colors"
                )}
              >
                <X className="size-3.5" aria-hidden />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
Alert.displayName = "Alert";

export { Alert, alertVariants };
