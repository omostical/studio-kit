The main side navigation of the app, with sections, items and optional collapse. Use **Navigation Bar** when there are only a few top-level sections.

---

**Properties**
- **Expanded** — `True` · `False`
- **Template** — `1` · `2` · `3`
- **Show/hide** — Divider, App Switch

---

**Usage guidelines**
- Group items under short section labels; highlight the current page.
- Collapsed state shows icons with tooltips.

---

**Accessibility**
- Wrap it in `<nav>` with a label and mark the current item with `aria-current="page"`.
- The collapse button needs `aria-expanded` and a label.
