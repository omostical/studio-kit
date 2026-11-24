**Status: planned** — Figma only; there is no code component yet.

Lets people choose several values from a list; selections show as chips in the field. Use **Checkbox Group** when all options fit on screen.

---

**Properties**
- **Variant** — `Primary` · `Danger`
- **Size** — `Medium` · `Small` · `Large`
- **State** — `Default` · `Hover` · `Pressed` · `Active` · `Disabled`
- **Filled** — `No` · `Yes (Aggregated)` · `Yes (Tags)`
- **Show/hide** — Prefix 1, Prefix 2, Clear Button
- **Text** — Value, Placeholder

---

**Usage guidelines**
- Let people remove a selection from the field directly.
- Add search when the list is long.

---

**Accessibility**
- Follow the listbox pattern with `aria-multiselectable="true"`; each chip's remove button needs a label.
