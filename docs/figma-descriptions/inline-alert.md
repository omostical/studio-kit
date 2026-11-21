A message inside the page, next to the content it's about (a form, a card, a section). Use **System Alert** for app-wide messages and **Toast** for short confirmations.

---

**Properties**
- **Status** — `Error` · `Warning` · `Success` · `Info`
- **Position** — `Horizontal` · `Vertical`
- **Show/hide** — Actions, Dismiss, Message
- **Text** — Message Text

---

**Usage guidelines**
- Pick the status by meaning: info, success, warning or danger.
- Lead with what happened, then what to do; include an action if there is one.
- Don't stack several alerts in one area; combine them.

---

**Accessibility**
- The icon and colour aren't enough on their own: the text must say the status. Each status keeps its own icon shape.
- Render the title as a heading that fits the page outline, and give the dismiss button a label ("Dismiss") and at least a 24×24px hit area.
- Use `role="alert"` only for urgent messages that appear after an action; otherwise `role="status"` or no role.
