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
- Filter chips toggle on and off; input chips can be removed with their close icon.
- Keep labels to one or two words.

---

**Accessibility**
- Toggle chips are buttons with `aria-pressed`; removable chips need a remove button labelled "Remove <value>".
