Turns a single setting on or off, taking effect immediately. Use **Checkbox** in forms that are submitted.

---

**Properties**
- **State** — `Default` · `Hover` · `Pressed` · `Focused` · `Disabled`
- **Size** — `Large` · `Small`
- **Selected** — `False` · `True`
- **Label** — `None` · `Left` · `Right`
- **Show/hide** — Description
- **Text** — Label, Description Text

---

**Usage guidelines**
- Label the setting, not the state ("Email notifications", not "On").
- Put the label before the switch and keep the effect immediate; show a confirmation if it's important.

---

**Accessibility**
- Use `role="switch"` with `aria-checked` (or a native checkbox styled as a switch); Space toggles it.
