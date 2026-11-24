**Status: stable** — in code as `Card`.

A box that groups related content and actions — a form, a summary, a setting — with optional header and footer. Use **Media Card** when an image leads, **Chart Card** for a chart, and `Container=False` to group content without a box.

---

**Properties**
- **Container** — `True` · `False`
- **Show/hide** — Header, Footer, Description

---

**Usage guidelines**
- Turn Header, Description and Footer on only when you need them.
- Put the card's main action in the footer, following Button guidance (one Primary, last in reading order).
- Use `Container=False` on grey backgrounds or inside other containers instead of nesting boxes.
- Boxed cards use the `Shadow/default` effect and 24px side padding.

---

**Accessibility**
- Give the card a real heading when it has a title, one level below the section it sits in. In code, `CardTitle` is an `h2` by default; set `as="h3"` for cards inside a titled section.
- If the whole card is clickable, use one link or button inside it and stretch its hit area; don't nest several interactive elements in a clickable card.
