A button with a main action plus a menu of related alternatives ("Save" + "Save as draft", "Export as…"). Use **Button** when there is only one action and **Dropdown Menu** when no option is the obvious default.

---

**Usage guidelines**
- The main part runs the most common action; the arrow opens a **Dropdown Menu** with the alternatives.
- Keep the menu short (2–6 related actions). Don't hide unrelated actions in it.
- Follow Button guidance for Variant, Style and Size.

---

**Accessibility**
- The arrow is its own button with `aria-haspopup="menu"`, `aria-expanded` and a label such as "More save options".
- Both parts must be reachable by keyboard and show a focus ring.
