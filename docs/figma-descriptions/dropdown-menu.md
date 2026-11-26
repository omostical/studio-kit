**Status: beta** — in code as `DropdownMenu`.

A list of actions or options that opens from a button ("More", user menu, Split Button). Use **Single Select** to choose a value in a form.

---

**Properties**
- **Type** — `Default` · `Selection`
- **Show/hide** — Search, Select All, Create

---

**Usage guidelines**
- Group related items and separate groups with dividers.
- Put destructive actions last, in Danger style.
- Keep it short; avoid more than one level of submenu.
- In code: `DropdownMenuItem` for actions (`variant="danger"` for destructive), `DropdownMenuRadioItem` / `DropdownMenuCheckboxItem` for options, `DropdownMenuLabel` and `DropdownMenuSeparator` for groups. The Search, Select All and Create slots are not in code yet.

---

**Accessibility**
- Follow the ARIA menu pattern: the trigger has `aria-haspopup` and `aria-expanded`; arrow keys move, Enter activates, Escape closes and returns focus to the trigger.
