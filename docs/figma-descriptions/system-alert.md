**Status: beta** — in code as `SystemAlert`.

A full-width banner for messages about the whole app or account (maintenance, billing, outage). Use **Inline Alert** for messages about one part of the page.

---

**Properties**
- **Status** — `Negative` · `Notice` · `Positive` · `Info` · `Neutral`
- **Emphasis** — `Low` · `High`
- **Show/hide** — Dismissible, Action
- **Text** — Message

---

**Usage guidelines**
- Show only one at a time and let people dismiss it unless it's critical.
- Say what happened and what to do.
- In code: `<SystemAlert status emphasis message actionLabel onAction dismissible onDismiss />` with `status` danger · warning · success · info · neutral, above the page header.

---

**Accessibility**
- Use `role="status"` for informational messages and `role="alert"` only for urgent ones; don't rely on colour alone.
