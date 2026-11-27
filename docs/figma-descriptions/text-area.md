**Status: beta** — in code as `TextArea`.

A multi-line field for longer free text (comments, descriptions), with an optional formatting bar. Use **Input** for single-line values.

---

**Properties**
- **Variant** — `Primary` · `Danger`
- **Size** — `Small` · `Medium` · `Large`
- **State** — `Default` · `Hover` · `Pressed` · `Active` · `Disabled`
- **Filled** — `False` · `True`
- **Show/hide** — Formatting Bar, Scroll Bar
- **Text** — Label

---

**Usage guidelines**
- Size it to the expected length and let it grow or scroll.
- Show a character count when there's a limit.
- In code: `TextArea` takes the same field props as Input (`label`, `helperText`, `error`, `optional`, `size`, `appearance`) plus `rows` and `resizable`. The Formatting Bar is not in code yet.

---

**Accessibility**
- Follow Input guidance for labels, helper text and errors; announce character-limit warnings.
