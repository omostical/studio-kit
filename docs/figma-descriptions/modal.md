**Status: beta** — in code as `Modal`.

A dialog that blocks the page for a focused task or decision (edit an item, confirm a destructive action). Use **Side Panel** when people need to see the page behind it, and **Status Modal** for a single result or confirmation.

---

**Properties**
- **Type** — `Form` · `Details` · `Search` · `Task` · `Share` · `Stepper`
- **Show/hide** — Footer, Description, Actions, Details, Tabs, Image, Close Button

---

**Usage guidelines**
- Use a clear title, one Primary action, and a Cancel or close.
- Keep content short; if it scrolls a lot, use a page or Side Panel instead.
- Don't open a modal from another modal.

---

**Accessibility**
- Use `role="dialog"` with `aria-modal="true"` and `aria-labelledby` pointing at the title.
- Move focus into the modal on open, trap it inside, close on Escape, and return focus to the trigger.
