Lets people choose one value from a list in a form. Use **Combo Box** for long lists that need search, **Radio Group** for up to about 5 visible options, and **Dropdown Menu** for actions.

---

**Properties**
- **Variant** — `Primary` · `Danger`
- **Style** — `Border` · `Ghost`
- **Size** — `Medium` · `Small` · `Large`
- **State** — `Default` · `Hover` · `Pressed` · `Active` · `Disabled`
- **Filled** — `True` · `False`
- **Show/hide** — Prefix 1, Prefix 2, Clear Button
- **Text** — Label

---

**Usage guidelines**
- Use a placeholder like "Select a country" only when there's no sensible default.
- Order options logically.

---

**Accessibility**
- Prefer a native `<select>` where possible; custom selects must follow the ARIA listbox or combobox pattern.
