A short, temporary message after an action ("Saved", "Message sent"), optionally with Undo. Use **Inline Alert** for messages people must read or act on.

---

**Properties**
- **Emphasis** — `High` · `Low`
- **Status** — `Error` · `Info` · `Neutral` · `Positive`
- **Show/hide** — Dismiss, Action, Footer, Description, Progress Bar
- **Text** — Message

---

**Usage guidelines**
- Keep it to one line; add one action at most (Undo, View).
- Don't use toasts for errors that need fixing.

---

**Accessibility**
- Announce with a polite live region (`role="status"`).
- Keep it visible long enough to read (at least 5 seconds), pause on hover and focus, and make any action reachable by keyboard.
