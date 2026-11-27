**Status: beta** — in code as `Notifications`.

A panel listing activity and messages for the user, with read and unread states.

---

**Properties**
- **Template** — `1` · `2`

---

**Usage guidelines**
- Group by time (Today, Earlier) and let people mark all as read.
- Each notification should link to the thing it's about.
- In code: `Notifications` + `NotificationsTrigger asChild` (a bell IconButton), `NotificationsContent`, `NotificationsHeader action`, `NotificationsToolbar` (TabsList), `NotificationList` of `NotificationItem avatar title time unread href content actions` and `NotificationGroupLabel`, and `NotificationsFooter`.

---

**Accessibility**
- Announce new notifications with a polite live region and show the unread count in the trigger's name.
