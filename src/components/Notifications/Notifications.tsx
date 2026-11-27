"use client";
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

/**
 * Notifications — Figma: StudioKIT 2.0 › Notifications (10785:99185) with Assets / Notification and
 * Assets / Notification Content. Description: docs/figma-descriptions/notifications.md
 *
 * A panel listing activity for the user, opened from a bell IconButton. It composes existing parts: Radix Popover
 * (like Popup) for the panel, Avatar for the actor, Tabs (All / Unread) in the toolbar and Buttons for "Mark all as
 * read" and "Show more". Non-modal: focus moves into the panel on open and back to the trigger on close, Escape and
 * a click outside close it; the header title names the panel.
 *
 * Figma property → prop:  Template 1 / 2 → the TabsList you put in NotificationsToolbar (regular or pill) ·
 * Unread → NotificationItem `unread` · Type=Divider → NotificationGroupLabel · Content (Message / Mention / Shift /
 * Actions) → NotificationItem `content` and `actions`.
 * Panel: Static/Fill/Overlay, Static/Stroke/Base border, Corner Radius/Container/md, Elevation/High, width 420 (no
 * container-width token, recorded exception). Header: padding Gap/9 (Gap/5 bottom), Subtitle/XSmall title.
 * Toolbar: padding Gap/9 sides, bottom divider Static/Stroke/Base. Item: padding Gap/6 × Gap/9, gap Gap/7, Avatar
 * small; title Body/Medium in Static/Text/Base (Body/Strong/Medium when unread); time Body/Small in
 * Static/Text/Subtle; hover Dynamic/Fill/Secondary/Alpha/Hover; unread row Dynamic/Fill/Primary/Alpha/Strong/Default
 * with a 6px dot (Figma binds the dot to the primitive Colors/Light/Blue/600; code uses Dynamic/Fill/Primary/Default)
 * and a visually hidden "Unread" so the state is not colour-only. Content box: Static/Fill/Alpha/Subtle,
 * Corner Radius/Container/md, Body/Medium. Group label: Caption/Strong/Medium in Static/Text/Subtle.
 * Footer: padding Gap/7 × Gap/9, centred.
 */
const Notifications = PopoverPrimitive.Root;
const NotificationsTrigger = PopoverPrimitive.Trigger;
const NotificationsClose = PopoverPrimitive.Close;

const TitleContext = React.createContext("");

/** The notifications panel, anchored to its NotificationsTrigger (a bell IconButton whose aria-label includes the unread count, e.g. "Notifications, 3 unread"). */
const NotificationsContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, sideOffset = 8, collisionPadding = 8, align = "end", children, ...props }, ref) => {
  const titleId = React.useId();
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        align={align}
        aria-labelledby={titleId}
        className={cn(
          // token-lint-ignore: Figma Notifications width 420 (no container-width token) and the Radix available-height variable
          "z-50 flex max-h-[var(--radix-popover-content-available-height)] w-[420px] max-w-[calc(100vw-16px)] flex-col overflow-hidden",
          "rounded-container-md border border-static-stroke-base bg-static-fill-overlay text-static-text-strong shadow-elevation-high outline-none",
          className
        )}
        {...props}
      >
        <TitleContext.Provider value={titleId}>{children}</TitleContext.Provider>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});
NotificationsContent.displayName = "NotificationsContent";

export interface NotificationsHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Panel title (default "Notifications"). Names the panel for screen readers. */
  title?: React.ReactNode;
  /** Header action, e.g. `<Button size="small" variant="secondary" appearance="ghost">Mark all as read</Button>`. */
  action?: React.ReactNode;
}

/** Title row of the panel (Figma Header). */
const NotificationsHeader = ({ className, title = "Notifications", action, ...props }: NotificationsHeaderProps) => {
  const titleId = React.useContext(TitleContext);
  return (
    <div className={cn("flex shrink-0 items-center gap-gap-5 px-gap-9 pb-gap-5 pt-gap-9", className)} {...props}>
      <p id={titleId || undefined} className="m-0 min-w-0 flex-1 type-subtitle-xsmall text-static-text-strong">
        {title}
      </p>
      {action}
    </div>
  );
};

/** Row under the header for a TabsList (All / Unread) and a settings IconButton (Figma Tabs row). Wrap the panel's content in <Tabs> to switch lists. */
const NotificationsToolbar = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex shrink-0 items-center justify-between gap-gap-5 border-b border-static-stroke-base px-gap-9", className)} {...props} />
);

/** The scrolling list of notifications. New items added here are announced politely. */
const NotificationList = ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul aria-live="polite" aria-relevant="additions" className={cn("m-0 min-h-0 flex-1 list-none overflow-y-auto p-0", className)} {...props} />
);

export interface NotificationItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title" | "content"> {
  /** The actor, usually `<Avatar size="small" name="Adam Smith" alt="" />`. */
  avatar?: React.ReactNode;
  /** What happened, one sentence. Put the actor's name in <strong>. */
  title: React.ReactNode;
  /** When it happened ("Just now", "Mar 23"). */
  time?: React.ReactNode;
  /** Machine-readable time for the <time> element. */
  dateTime?: string;
  /** Figma Unread: highlighted row, bold title, dot, and a hidden "Unread" label. */
  unread?: boolean;
  /** Where the notification goes. The whole row becomes the link. */
  href?: string;
  /** Called when the row is activated (used when there is no href). */
  onSelect?: () => void;
  /** Figma Content: a quoted message, mention or shift, shown in a subtle box under the title. */
  content?: React.ReactNode;
  /** Figma Content=Actions: Buttons (size xsmall/small) such as Accept / Decline. They stay separately focusable. */
  actions?: React.ReactNode;
}

/** One notification (Figma Assets / Notification). Each one links to the thing it is about. */
const NotificationItem = ({ className, avatar, title, time, dateTime, unread = false, href, onSelect, content, actions, ...props }: NotificationItemProps) => {
  const stretched =
    "text-left outline-none after:absolute after:inset-0 after:rounded-control-md focus-visible:after:shadow-focus-base";
  const label = (
    <>
      {unread && <span className="sr-only">Unread: </span>}
      {title}
    </>
  );
  return (
    <li
      className={cn(
        "relative flex gap-gap-7 px-gap-9 py-gap-6 transition-colors duration-150",
        (href || onSelect) && "hover:bg-dynamic-fill-secondary-alpha-hover",
        unread && "bg-dynamic-fill-primary-alpha-strong-default",
        className
      )}
      {...props}
    >
      {avatar != null && <div className="shrink-0 pt-gap-2">{avatar}</div>}
      <div className="flex min-w-0 flex-1 flex-col gap-gap-3">
        <div className="flex items-start gap-gap-7 py-gap-2">
          <p className={cn("m-0 min-w-0 flex-1 text-static-text-base", unread ? "type-body-strong-medium" : "type-body-medium")}>
            {href ? (
              <a href={href} className={cn(stretched, "no-underline")}>{label}</a>
            ) : onSelect ? (
              <button type="button" onClick={onSelect} className={cn(stretched, "m-0 cursor-pointer border-0 bg-transparent p-0")}>
                {label}
              </button>
            ) : (
              label
            )}
          </p>
          {(time != null || unread) && (
            <span className="flex shrink-0 items-center gap-gap-4">
              {time != null && <time dateTime={dateTime} className="type-body-small text-static-text-subtle">{time}</time>}
              {unread && <span aria-hidden className="size-size-4 rounded-control-full bg-dynamic-fill-primary-default" />}
            </span>
          )}
        </div>
        {content != null && (
          <div className="rounded-container-md bg-static-fill-alpha-subtle px-gap-6 py-gap-3 type-body-medium text-static-text-base">{content}</div>
        )}
        {actions != null && <div className="relative z-10 flex flex-wrap gap-gap-5">{actions}</div>}
      </div>
    </li>
  );
};

/** A time group heading inside the list ("Today", "March") — Figma Type=Divider. */
const NotificationGroupLabel = ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li className={cn("px-gap-9 pb-gap-3 pt-gap-7 type-caption-strong-medium text-static-text-subtle", className)} {...props} />
);

/** Bottom row of the panel, e.g. a "Show more" ghost Button (Figma Footer). */
const NotificationsFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex shrink-0 items-center justify-center gap-gap-5 px-gap-9 py-gap-7", className)} {...props} />
);

export {
  Notifications,
  NotificationsTrigger,
  NotificationsClose,
  NotificationsContent,
  NotificationsHeader,
  NotificationsToolbar,
  NotificationList,
  NotificationItem,
  NotificationGroupLabel,
  NotificationsFooter,
};
