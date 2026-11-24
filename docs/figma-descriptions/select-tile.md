**Status: planned** — Figma only; there is no code component yet.

A large selectable card for choosing between a few options that need more explanation (plans, templates, account types). Use **Radio Group** or **Checkbox Group** for simple options.

---

**Properties**
- **State** — `Default` · `Hover` · `Pressed` · `Focused` · `Disabled`
- **Selected** — `False` · `True`
- **Show/hide** — Description, Entity, Suffix

---

**Usage guidelines**
- Keep tiles the same size and structure so they're easy to compare.

---

**Accessibility**
- Build tiles as radios or checkboxes (or `role="radio"`) so selection is announced; the whole tile is the label.
