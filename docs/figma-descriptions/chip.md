**Status: beta** — in code as `Chip`.

A small interactive element for filters, choices and entered values (filter chips, selected tags in a field). Use **Tag** for read-only labels and **Segmented Control** for switching views.

---

**Properties**
- **Variant** — `Primary` · `Secondary`
- **Style** — `Filled` · `Border`
- **Size** — `Small` · `Medium` · `Large`
- **State** — `Default` · `Hover` · `Focused` · `Pressed` · `Disabled`
- **Prefix type** — `Icon` · `Logo` · `Avatar`
- **Show/hide** — Suffix, Prefix
- **Text** — Label

---

**Usage guidelines**
- In code: a toggle chip is `<Chip pressed={on} onPressedChange={setOn}>` (`aria-pressed`, Primary and a check while pressed); a removable chip is `<Chip onRemove={…}>` with a "Remove <value>" button.
- Filter chips toggle on and off; input chips can be removed with their close icon.
- Keep labels to one or two words.

---

**Accessibility**
- Toggle chips are buttons with `aria-pressed`; removable chips need a remove button labelled "Remove <value>".
