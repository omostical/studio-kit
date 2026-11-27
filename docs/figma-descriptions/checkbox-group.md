**Status: beta** — in code as `CheckboxGroup`.

A labelled list of **Checkbox** options where people can pick any number.

---

**Properties**
- **Orientation** — `↕ Vertical` · `↔ Horizontal`

---

**Usage guidelines**
- Give the group a visible label and, if needed, helper text.
- Order options logically (frequency, alphabetical), and keep the list under about 10; use **Multi Select** for longer lists.
- In code: `CheckboxGroup label orientation helperText error` around `Checkbox`es; it renders the fieldset and legend, each Checkbox keeps its own state.

---

**Accessibility**
- Wrap it in a `<fieldset>` with a `<legend>`, and link error messages with `aria-describedby`.
