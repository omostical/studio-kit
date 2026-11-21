A field for searching content, with a search icon and optional clear button and shortcut hint.

---

**Properties**
- **Variant** — `Primary` · `Danger`
- **Style** — `Border` · `Ghost`
- **Size** — `Small` · `Medium` · `Large`
- **State** — `Default` · `Hover` · `Pressed` · `Active` · `Disabled`
- **Filled** — `True` · `False`
- **Show/hide** — Prefix 1, Suffix 1, Suffix 2
- **Text** — Label

---

**Usage guidelines**
- Use placeholder text that says what's searchable ("Search projects").
- Show results as people type when that's fast; otherwise on Enter.

---

**Accessibility**
- Use `role="search"` on the surrounding form and give the field a label (it can be visually hidden).
- Label the clear button ("Clear search").
