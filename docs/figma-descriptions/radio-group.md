**Status: beta** — in code as `RadioGroup`.

A labelled set of **Radio Button** options where exactly one can be chosen.

---

**Properties**
- **Orientation** — `↕ Vertical` · `↔ Horizontal`

---

**Usage guidelines**
- Give the group a visible label and order options logically.
- In code: `RadioGroup label orientation value onValueChange` around `RadioButton`s; `error` turns every option Danger and links the message.

---

**Accessibility**
- Wrap it in a `<fieldset>` with a `<legend>`; link errors with `aria-describedby`.
