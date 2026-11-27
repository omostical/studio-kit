**Status: beta** — in code as `RadioButton`.

Lets people pick exactly one option from a short list. Use **Radio Group** to lay them out, **Single Select** for more than about 5 options, and **Checkbox** when several can be chosen.

---

**Properties**
- **Variant** — `Primary` · `Danger`
- **Type** — `Unselected` · `Selected`
- **State** — `Default` · `Hover` · `Pressed` · `Focused` · `Disabled`
- **Size** — `Large` · `Small`
- **Show/hide** — Description, Label
- **Text** — Label, Description Text

---

**Usage guidelines**
- Preselect a sensible default unless choosing nothing is valid.
- Keep labels short and parallel.
- In code: `RadioButton` is one option and must sit inside `RadioGroup`, which holds the value, label and error.

---

**Accessibility**
- Use native radios with the same `name`; arrow keys move between options.
