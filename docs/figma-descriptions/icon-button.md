A button that shows only an icon, for compact, frequently used actions in toolbars, table rows and headers (close, edit, more). Use **Button** when there is room for a label, and **Link Button** to go to another page.

---

**Properties**
- **Variant** — `Primary` · `Secondary` · `Danger` · `Inverse` · `Success`
- **Style** — `Filled` · `Border` · `Ghost`
- **Size** — `Small` · `Medium` · `Large` · `XSmall`
- **State** — `Default` · `Hover` · `Pressed` · `Focused` · `Disabled`
- **Swappable** — Icon

---

**Usage guidelines**
- Only use icons people already recognise (close, search, edit, delete, more). If you have to explain the icon, use a Button with a label.
- Pair it with a **Tooltip** that names the action.
- Match Variant and Style to the Button guidance: Primary for the main action, Secondary + Ghost for most toolbar actions, Danger for destructive ones.
- Next to text Buttons, use the same Size so heights line up.

---

**Accessibility**
- Give every Icon Button an accessible name with `aria-label` ("Close dialog"), not just the tooltip — without it, screen readers announce an empty button.
- XSmall (24px) meets the WCAG 2.5.8 minimum only with spacing around it; on touch screens prefer Medium or Large.
- Never remove the `Focus/Base` focus ring.
