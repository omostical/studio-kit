**Status: stable** — covered by Input and Select (label, optional, helperText, error props).

A complete form field: label, optional "Optional" marker, the control (Input, Text Area, Select, Date picker…), helper text and error message. Use it for every field in a form; pick the control with Type.

---

**Properties**
- **Type** — `Text Input` · `Number Input` · `Text Area` · `Single Select` · `Multi Select` · `Combo Box` · `Checkbox Group` · `Radio Button Group` · `Single Date` · `Date Range` · `File Upload` · `Filter Chip` · `Chips`
- **Status** — `Default` · `Error`
- **Orientation** — `↕ Vertical` · `↔ Horizontal`
- **Show/hide** — Helper Text, Error Message, Label

---

**Usage guidelines**
- Use Vertical orientation by default; Horizontal only in wide settings layouts.
- Mark optional fields, not required ones.
- Put formatting help in helper text and replace it with the error message when Status is Error; the message should say how to fix the problem.

---

**Accessibility**
- Connect the label (`<label for>`), and link helper and error text with `aria-describedby`; set `aria-invalid` on error.
- Group checkboxes, radios and date ranges in a `<fieldset>` with a `<legend>`.
