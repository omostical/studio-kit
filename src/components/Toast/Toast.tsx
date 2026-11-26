"use client";
import * as React from "react";
import { CheckCircle2, Info, XCircle, X, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";

/**
 * Toast — Figma: StudioKIT 2.0 › Toast (4705:89222). Description: docs/figma-descriptions/toast.md
 *
 * A short, temporary message after an action ("Saved"), optionally with one action (Undo).
 * Figma property → prop:  Status → status · Emphasis → emphasis · Message → title · Description → description ·
 * Action → action / actionLabel · Dismiss → dismissible.
 * High emphasis (default): Semantic/Fill/Inverse/<Status>, Corner Radius/Container/md, Elevation/Medium,
 *   Label/Strong/Small in Semantic/Text/OnInverse/<Status>, Inverse Border action + Inverse Ghost close.
 * Low emphasis: Static/Fill/Overlay card, Corner Radius/Container/lg, Elevation/High, icon in Semantic/Text/<Status>.
 *
 * Use <ToastProvider> once near the root and call `useToast().show({ … })`. Toasts sit in a polite live region,
 * stay at least 5 s, pause while hovered or focused, and can be dismissed by keyboard.
 */
export type ToastStatus = "neutral" | "info" | "positive" | "error";

const high: Record<ToastStatus, string> = {
  neutral: "bg-semantic-fill-inverse-neutral text-semantic-text-oninverse-neutral",
  info: "bg-semantic-fill-inverse-info text-semantic-text-oninverse-info",
  positive: "bg-semantic-fill-inverse-positive text-semantic-text-oninverse-positive",
  error: "bg-semantic-fill-inverse-negative text-semantic-text-oninverse-negative",
};
const lowIcon: Record<ToastStatus, string> = {
  neutral: "text-static-text-base",
  info: "text-semantic-text-info",
  positive: "text-semantic-text-positive",
  error: "text-semantic-text-negative",
};
const icons: Record<ToastStatus, React.ComponentType> = { neutral: Bell, info: Info, positive: CheckCircle2, error: XCircle };

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Figma Status: neutral · info · positive · error. */
  status?: ToastStatus;
  /** Figma Emphasis: `high` (solid, default) or `low` (light card with description). */
  emphasis?: "high" | "low";
  /** The message itself, short and specific. */
  title: React.ReactNode;
  /** Optional supporting sentence. */
  description?: React.ReactNode;
  /** Replace the status icon; `null` hides it. */
  icon?: React.ReactNode;
  /** Custom action element; overrides actionLabel/onAction. */
  action?: React.ReactNode;
  /** Label for a single action button (e.g. "Undo", "Retry"). */
  actionLabel?: string;
  /** Called when the action button is pressed. */
  onAction?: () => void;
  /** Show the dismiss (×) button. */
  dismissible?: boolean;
  /** Accessible name of the dismiss button (default "Dismiss"). */
  dismissLabel?: string;
  /** Called when dismissed. */
  onDismiss?: () => void;
}

/** Short temporary message after an action (Figma Toast). Show it with useToast().show() inside ToastProvider; one action at most. */
const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, status = "neutral", emphasis = "high", title, description, icon, action, actionLabel, onAction, dismissible = true, dismissLabel = "Dismiss", onDismiss, ...props }, ref) => {
    const isHigh = emphasis === "high";
    const Icon = icons[status];
    const iconNode = icon === null ? null : (
      <span aria-hidden className={cn("flex shrink-0 [&_svg]:size-size-11", !isHigh && lowIcon[status])}>{icon ?? <Icon />}</span>
    );
    const actionNode =
      action ??
      (actionLabel ? (
        <Button size="small" variant={isHigh ? "inverse" : "secondary"} appearance="border" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null);

    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-auto flex w-full items-start gap-gap-7",
          isHigh
            // token-lint-ignore: Figma Toast max width, high emphasis 400px; no container-width token exists
            ? cn("max-w-[400px] rounded-container-md py-gap-5 pl-gap-9 pr-gap-5 shadow-elevation-medium", high[status])
            // token-lint-ignore: Figma Toast max width, low emphasis 460px; no container-width token exists
            : "max-w-[460px] rounded-container-lg bg-static-fill-overlay py-gap-9 pl-gap-9 pr-gap-5 text-static-text-strong shadow-elevation-high",
          className
        )}
        {...props}
      >
        <div className={cn("flex min-w-0 flex-1 gap-gap-5", isHigh ? "items-center py-gap-3" : "items-start gap-gap-7 py-gap-3")}>
          {iconNode}
          <div className="flex min-w-0 flex-col gap-gap-3">
            <p className="m-0 type-label-strong-small">{title}</p>
            {description != null && <p className={cn("m-0 type-body-medium", !isHigh && "text-static-text-subtle")}>{description}</p>}
          </div>
        </div>
        {(actionNode || dismissible) && (
          <div className="flex shrink-0 items-center gap-gap-3">
            {actionNode}
            {dismissible && (
              <IconButton size="small" variant={isHigh ? "inverse" : "secondary"} appearance="ghost" icon={<X />} aria-label={dismissLabel} onClick={onDismiss} />
            )}
          </div>
        )}
      </div>
    );
  }
);
Toast.displayName = "Toast";

// ─── Provider + hook ─────────────────────────────────────────────────────────
type ToastInput = Omit<ToastProps, "onDismiss"> & { duration?: number };
type ToastItem = ToastInput & { toastId: number };
const ToastContext = React.createContext<{ show: (t: ToastInput) => number; dismiss: (id: number) => void } | null>(null);

function TimedToast({ item, dismiss }: { item: ToastItem; dismiss: (id: number) => void }) {
  const onDone = React.useCallback(() => dismiss(item.toastId), [dismiss, item.toastId]);
  const { duration = 5000, toastId: _toastId, ...props } = item;
  void _toastId;
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused) return;
    const t = setTimeout(onDone, Math.max(duration, 5000));
    return () => clearTimeout(t);
  }, [paused, duration, onDone]);
  return (
    <Toast
      {...props}
      onDismiss={onDone}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    />
  );
}

export function ToastProvider({ children, label = "Notifications" }: { children: React.ReactNode; label?: string }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const nextId = React.useRef(1);
  const dismiss = React.useCallback((id: number) => setItems((all) => all.filter((t) => t.toastId !== id)), []);
  const show = React.useCallback((t: ToastInput) => {
    const id = nextId.current++;
    setItems((all) => [...all, { ...t, toastId: id }]);
    return id;
  }, []);
  const value = React.useMemo(() => ({ show, dismiss }), [show, dismiss]);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <section
        aria-label={label}
        role="status"
        aria-live="polite"
        // token-lint-ignore: z-60 keeps toasts above an open Modal (z-50); 16px gutters; no z-index or width token
        className="pointer-events-none fixed bottom-gap-12 left-1/2 z-[60] flex w-[calc(100%-32px)] max-w-[460px] -translate-x-1/2 flex-col items-center gap-gap-5"
      >
        {items.map((item) => (
          <TimedToast key={item.toastId} item={item} dismiss={dismiss} />
        ))}
      </section>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

export { Toast };
