**Status: planned** — Figma only; there is no code component yet.

One row in a **Dropdown Menu** or **Select** list: label with optional icon, description, shortcut, checkbox or radio.

---

**Properties**
- **Type** — `Single Select` · `Multi Select` · `Destructive` · `Progress` · `Group` · `Divider`
- **State** — `Default` · `Hover` · `Pressed` · `Focused` · `Disabled` · `None`
- **Selected** — `False` · `True`
- **Show/hide** — Prefix, Badge, Suffix, Description, Helper, Shortcut
- **Text** — Description, Helper, Label

---

**Usage guidelines**
- Start labels with a verb for actions ("Duplicate"); use nouns for options.
- Show keyboard shortcuts on the right only if they really work.

---

**Accessibility**
- Use `role="menuitem"`, `menuitemcheckbox` or `menuitemradio` to match the item type.
