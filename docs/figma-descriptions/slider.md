**Status: beta** — in code as `Slider`.

Picks a value or range by dragging along a track (volume, price range). Use an **Input** when people need an exact value.

---

**Properties**
- **Progress** — `0%` · `10%` · `20%` · `30%` · `40%` · `50%` · `60%` · `70%` · `80%` · `90%` · `100%` · `Disabled`
- **Label** — `Side` · `Bottom` · `Inputs`
- **Show/hide** — Labels, Left Label, Right Label, Range

---

**Usage guidelines**
- Show the current value, and add an input next to it for precise entry when it matters.
- In code: `Slider label defaultValue={[40]}` (two values for a range) with `min` `max` `step`; `labelPosition` side·bottom·inputs, `minLabel` / `maxLabel`.

---

**Accessibility**
- Use `role="slider"` (or native range input) with value attributes and a label; arrow keys change the value, Page Up/Down in bigger steps.
