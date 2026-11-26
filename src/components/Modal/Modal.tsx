"use client";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "../IconButton/IconButton";

/**
 * Modal — Figma: StudioKIT 2.0 › Modal (9855:38649) with Header (13058:13975) and Footer (13062:16646).
 * Description: docs/figma-descriptions/modal.md
 *
 * Built on Radix Dialog: focus moves in and is trapped, Escape and the close button close it, focus returns
 * to the trigger. Box: Static/Fill/Overlay, Corner Radius/Container/lg, Elevation/High, over Static/Scrim/Base.
 * Header 16 × 20 (+ bottom divider), Body 20, Footer 16 × 20 (+ top divider) — as in Figma.
 *
 *   <Modal>
 *     <ModalTrigger asChild><Button>Edit</Button></ModalTrigger>
 *     <ModalContent size="medium">
 *       <ModalHeader title="Edit project" description="…" />
 *       <ModalBody>…</ModalBody>
 *       <ModalFooter><ModalClose asChild><Button variant="secondary" appearance="border">Cancel</Button></ModalClose>…</ModalFooter>
 *     </ModalContent>
 *   </Modal>
 */
const Modal = DialogPrimitive.Root;
const ModalTrigger = DialogPrimitive.Trigger;
const ModalClose = DialogPrimitive.Close;

// token-lint-ignore: Figma Modal widths Small 400 / Medium 600 / Large 800; no container-width token exists
const widths = { small: "max-w-[400px]", medium: "max-w-[600px]", large: "max-w-[800px]" } as const;

export interface ModalContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Width: small (400) · medium (600, default) · large (800). */
  size?: keyof typeof widths;
}

/** The dialog box of a Modal (Figma Modal): focus is trapped, Escape closes, focus returns to the trigger. Wrap in <Modal> with a <ModalTrigger>. */
const ModalContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, ModalContentProps>(
  ({ className, size = "medium", children, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-static-scrim-base" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          // token-lint-ignore: viewport-relative limits (90% of the screen height, 16px gutter each side at 375px)
          "fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden",
          "rounded-container-lg bg-static-fill-overlay text-static-text-strong shadow-elevation-high focus:outline-none",
          widths[size],
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);
ModalContent.displayName = "ModalContent";

export interface ModalHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Show the close button (Figma "Close Button"). */
  closeButton?: boolean;
  closeLabel?: string;
}

const ModalHeader = ({ className, title, description, closeButton = true, closeLabel = "Close", children, ...props }: ModalHeaderProps) => (
  <div className={cn("flex items-start justify-between gap-gap-5 border-b border-static-stroke-base px-gap-11 pb-gap-8 pt-gap-9", className)} {...props}>
    <div className="flex min-w-0 flex-col gap-gap-5 py-gap-2">
      <DialogPrimitive.Title className="m-0 type-subtitle-small text-static-text-strong">{title}</DialogPrimitive.Title>
      {description != null && (
        <DialogPrimitive.Description className="m-0 type-body-medium text-static-text-subtle">{description}</DialogPrimitive.Description>
      )}
      {children}
    </div>
    {closeButton && (
      <DialogPrimitive.Close asChild>
        <IconButton size="small" variant="secondary" appearance="border" icon={<X />} aria-label={closeLabel} />
      </DialogPrimitive.Close>
    )}
  </div>
);

const ModalBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("min-h-0 flex-1 overflow-y-auto p-gap-11 type-body-medium text-static-text-base", className)} {...props} />
);

const ModalFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center justify-end gap-gap-5 border-t border-static-stroke-base px-gap-11 py-gap-9", className)} {...props} />
);

export { Modal, ModalTrigger, ModalClose, ModalContent, ModalHeader, ModalBody, ModalFooter };
