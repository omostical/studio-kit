"use client";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "../IconButton/IconButton";
import { Modal, ModalTrigger, ModalClose, ModalContent } from "../Modal/Modal";

/**
 * StatusModal — Figma: StudioKIT 2.0 › Status Modal (9987:42531). Description: docs/figma-descriptions/status-modal.md
 *
 * A small dialog for one result or confirmation, with a status icon, a message and one or two actions. Built on
 * Modal (Radix Dialog): focus moves in and is trapped, Escape closes, focus returns to the trigger, the title is
 * wired to aria-labelledby. `type="danger"` defaults to role="alertdialog" (a confirmation that needs an answer).
 *
 * Figma property → prop:  Type (Negative / Positive / Information / Warning / Neutral) → `type` danger · success ·
 * info · warning · neutral · Orientation → `orientation` · Close Button → `closeButton` · Footer → `actions` /
 * `footerStart` (horizontal).
 * Box: Modal Medium (600), Static/Fill/Overlay, Corner Radius/Container/lg, Elevation/High. Content: a top-down
 * gradient from Semantic/Fill/<Status> to transparent (Neutral: none).
 * Vertical: padding Gap/16 × Gap/22 (Gap/11 sides on small screens), centred; icon badge Size/18,
 * Corner Radius/Control/xl, Semantic/Fill/<Status> with a 24px icon in Semantic/Text/OnSubtle/<Status>; title
 * Subtitle/Small in Static/Text/Strong, message Body/Medium in Static/Text/Base; actions gap Gap/5.
 * Horizontal: padding Gap/11; badge Size/13, Corner Radius/Control/md, Semantic/Fill/Inverse/<Status> with the
 * icon in Semantic/Text/OnInverse/<Status>; footer padding Gap/9 × Gap/11, top divider Static/Stroke/Base, gap Gap/7.
 * Icons follow Alert (one shape per status); Figma uses the same warning icon for Negative and Warning.
 *
 *   <StatusModal>
 *     <StatusModalTrigger asChild><Button variant="danger" appearance="border">Delete</Button></StatusModalTrigger>
 *     <StatusModalContent type="danger" title="Delete this project?" description="…"
 *       actions={<><StatusModalClose asChild><Button variant="secondary" appearance="border" size="small">Cancel</Button></StatusModalClose><Button variant="danger" size="small">Delete project</Button></>} />
 *   </StatusModal>
 */
const StatusModal = Modal;
const StatusModalTrigger = ModalTrigger;
const StatusModalClose = ModalClose;

export type StatusModalType = "danger" | "success" | "info" | "warning" | "neutral";

const tone: Record<Exclude<StatusModalType, "neutral">, { wash: string; badge: string; badgeHigh: string; Icon: React.ComponentType }> = {
  danger: {
    wash: "from-semantic-fill-negative",
    badge: "bg-semantic-fill-negative text-semantic-text-onsubtle-negative",
    badgeHigh: "bg-semantic-fill-inverse-negative text-semantic-text-oninverse-negative",
    Icon: XCircle,
  },
  success: {
    wash: "from-semantic-fill-positive",
    badge: "bg-semantic-fill-positive text-semantic-text-onsubtle-positive",
    badgeHigh: "bg-semantic-fill-inverse-positive text-semantic-text-oninverse-positive",
    Icon: CheckCircle2,
  },
  info: {
    wash: "from-semantic-fill-info",
    badge: "bg-semantic-fill-info text-semantic-text-onsubtle-info",
    badgeHigh: "bg-semantic-fill-inverse-info text-semantic-text-oninverse-info",
    Icon: Info,
  },
  warning: {
    wash: "from-semantic-fill-notice",
    badge: "bg-semantic-fill-notice text-semantic-text-onsubtle-notice",
    badgeHigh: "bg-semantic-fill-inverse-notice text-semantic-text-onsubtle-notice",
    Icon: AlertTriangle,
  },
};

export interface StatusModalContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, "title" | "children"> {
  /** Figma Type: danger · success · info · warning · neutral (no icon). Pick by meaning; the title must say it too. */
  type?: StatusModalType;
  /** Figma Orientation: `vertical` (centred, icon on top, default) or `horizontal` (left-aligned, actions in a footer). */
  orientation?: "vertical" | "horizontal";
  /** The result or question, short and specific ("Delete this project?"). */
  title: React.ReactNode;
  /** Supporting sentence: what happens next, or what can't be undone. */
  description?: React.ReactNode;
  /** One or two Buttons (size small). Name the action ("Delete project"), not "OK". */
  actions?: React.ReactNode;
  /** Horizontal only: content on the start side of the footer, e.g. a "Contact support" link. */
  footerStart?: React.ReactNode;
  /** Replace the status icon. */
  icon?: React.ReactNode;
  /** Show the close button (Figma "Close Button", default true). */
  closeButton?: boolean;
  /** Accessible name of the close button (default "Close"). */
  closeLabel?: string;
}

/** The status dialog (Figma Status Modal). Wrap in <StatusModal> with a <StatusModalTrigger>, or control it with open/onOpenChange. */
const StatusModalContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, StatusModalContentProps>(
  (
    {
      className,
      type = "info",
      orientation = "vertical",
      title,
      description,
      actions,
      footerStart,
      icon,
      closeButton = true,
      closeLabel = "Close",
      role,
      ...props
    },
    ref
  ) => {
    const t = type === "neutral" ? null : tone[type];
    const vertical = orientation === "vertical";
    const Icon = t?.Icon;
    const closeNode = closeButton ? (
      <DialogPrimitive.Close asChild>
        <IconButton size="small" variant="secondary" appearance="border" icon={<X />} aria-label={closeLabel} />
      </DialogPrimitive.Close>
    ) : null;
    const badge = t ? (
      <span
        aria-hidden
        className={cn(
          "flex shrink-0 items-center justify-center",
          vertical ? cn("size-size-18 rounded-control-xl [&_svg]:size-size-12", t.badge) : cn("size-size-13 rounded-control-md [&_svg]:size-size-9", t.badgeHigh)
        )}
      >
        {icon ?? (Icon && <Icon />)}
      </span>
    ) : null;
    const titleNode = <DialogPrimitive.Title className="m-0 type-subtitle-small text-static-text-strong">{title}</DialogPrimitive.Title>;
    const descNode =
      description != null ? (
        <DialogPrimitive.Description className="m-0 type-body-medium text-static-text-base">{description}</DialogPrimitive.Description>
      ) : null;

    return (
      <ModalContent ref={ref} size="medium" role={role ?? (type === "danger" ? "alertdialog" : "dialog")} className={className} {...props}>
        <div className={cn("min-h-0 overflow-y-auto", t && cn("bg-linear-to-b to-transparent", t.wash))}>
          {vertical ? (
            <div className="relative flex flex-col items-center gap-gap-12 px-gap-11 py-gap-16 text-center sm:px-gap-22">
              {closeNode && <div className="absolute right-gap-9 top-gap-9">{closeNode}</div>}
              <div className="flex flex-col items-center gap-gap-5">
                <div className="flex flex-col items-center gap-gap-7">
                  {badge}
                  {titleNode}
                </div>
                {descNode}
              </div>
              {actions != null && <div className="flex flex-wrap justify-center gap-gap-5">{actions}</div>}
            </div>
          ) : (
            <div className="flex flex-col gap-gap-5 p-gap-11">
              <div className={cn("flex items-start gap-gap-7", badge ? "justify-between" : "justify-end")}>
                {badge}
                {!badge && <div className="min-w-0 flex-1">{titleNode}</div>}
                {closeNode}
              </div>
              {badge && titleNode}
              {descNode}
            </div>
          )}
        </div>
        {!vertical && (actions != null || footerStart != null) && (
          <div className="flex flex-wrap items-center gap-gap-7 border-t border-static-stroke-base px-gap-11 py-gap-9">
            {footerStart != null && <div className="flex min-w-0 flex-1 items-center gap-gap-5">{footerStart}</div>}
            {actions != null && <div className="ml-auto flex flex-wrap items-center gap-gap-5">{actions}</div>}
          </div>
        )}
      </ModalContent>
    );
  }
);
StatusModalContent.displayName = "StatusModalContent";

export { StatusModal, StatusModalTrigger, StatusModalClose, StatusModalContent };
