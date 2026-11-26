**Status: stable** — in code as `Checkbox`.

Lets people turn a single option on or off, or pick several options from a list. Use **Switch** for settings that take effect immediately and **Radio Button** when only one option can be chosen.

---

**Properties**
- **Variant** — `Primary` · `Danger`
- **Type** — `Unselected` · `Selected` · `Indeterminate`
- **Size** — `Small` · `Large`
- **State** — `Default` · `Hover` · `Pressed` · `Focused` · `Disabled`
- **Show/hide** — Description, Label
- **Text** — Label, Description Text

---

**Usage guidelines**
- Write labels as positive statements ("Email me updates", not "Don't email me").
- Use Indeterminate only for a parent checkbox whose children are partly selected.
- Use **Checkbox Group** with a label for a list of options.
- Use the Danger type only for high-risk choices ("Delete permanently").
- Without a visible label (table row selection, select-all), the checkbox still needs an accessible name.

---

**Accessibility**
- Use a native `<input type="checkbox">` with a `<label>`; the whole row, label included, should toggle it.
- Standalone checkboxes need an `aria-label` ("Select row Adam Smith", "Select all").
- Space toggles it. Use `aria-checked="mixed"` for Indeterminate.
