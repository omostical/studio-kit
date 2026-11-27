**Status: beta** — in code as `Breadcrumbs`.

Shows where the current page sits in the site hierarchy and lets people go back up. Use on pages two or more levels deep; not for a flow of steps (use **Progress Stepper**).

---

**Properties**
- **Level** — `Root` · `2nd` · `3rd` · `4th`
- **Separator** — `Arrow` · `Slash`

---

**Usage guidelines**
- Start at the top level and end with the current page, which isn't a link.
- Collapse the middle items into "…" when the trail is long.
- Keep labels the same as the page titles they link to.
- In code: one `BreadcrumbItem` per level inside `Breadcrumbs`; the last item is the current page, and `maxItems` collapses the middle into a "…" button.

---

**Accessibility**
- Wrap it in `<nav aria-label="Breadcrumb">` with an ordered list, and set `aria-current="page"` on the last item.
- The separators are decorative: hide them from screen readers.
