**Status: stable** — in code as `Input`.

**Input** — single-line field for short, free-form text: names, emails, search terms, numbers. This is the field on its own; in forms, use **Form Field** (`Type=Text Input`), which adds the label, helper text and error message. For multi-line text use **Text Area**; to choose from a fixed list use **Single Select** or **Combo Box**; for search bars use **Search**.

---

**Variant** — validation.
- `Primary` — the normal field.
- `Danger` — the value is invalid. Always show an error message that says how to fix it (Form Field `Status=Error`); never rely on the red border alone.

**Style** — container.
- `Border` — the default, with a visible outline. Use in forms.
- `Ghost` — no outline until hover or focus. Only inside a container that already shows the field's shape (toolbars, table cells, inline editing).

**Size** — density (height · corner radius · text size).
- `Small` — 32 · 8 · 14px. Dense tables and filters.
- `Medium` — 40 · 8 · 14px. The default.
- `Large` — 48 · 12 · 16px. Primary forms and mobile. 16px text also stops iOS Safari zooming in when the field is tapped.

**State** — `Default`, `Hover`, `Pressed`, `Active` (focused), `Disabled`.
**Filled** — `False` shows the placeholder; `True` shows a value.

---

**Anatomy**
Prefix (optional icon or text, e.g. a search icon or "$") · Value or placeholder · Suffix (optional icon or text, e.g. "kg", a clear button, a show-password toggle). Icons are 20px.

---

**Usage guidelines**
- Every field needs a visible label (Form Field). A placeholder is not a label: it disappears when the user types.
- Use placeholders only for an example of the format ("name@company.com"), never for instructions the user needs while typing — put those in helper text.
- Mark the optional fields, not the required ones, and keep optional fields rare.
- Size the field to the expected answer (a postcode field shouldn't be full width).
- Don't combine `Disabled` with `Danger`: disabled fields don't show validation.
- Let helper and error text wrap; don't truncate it.

---

**Accessibility**
- Connect the label to the field (`<label for>` or `aria-labelledby`).
- Link helper and error text with `aria-describedby`, and set `aria-invalid="true"` when the variant is `Danger`.
- Use the right `type`, `inputmode` and `autocomplete` (e.g. `type="email"`, `autocomplete="email"`) so browsers and password managers can help.
- `Active` shows a brand border plus the `Forms/Active` glow. Never remove the focus style.
- Placeholder and helper text meet 4.5:1 contrast on white.

---

**Known issues**
- ⚠️ Mobile mode still uses Wideset's fonts (Inter) (Figma Starter plan limit).
