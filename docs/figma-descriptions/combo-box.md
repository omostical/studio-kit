A text field with a filtered list of options, for choosing from long lists (countries, people, products) by typing. Use **Single Select** for short lists that don't need search.

---

**Properties**
- **Variant** — `Primary` · `Danger`
- **Style** — `Border` · `Ghost`
- **Size** — `Medium` · `Small` · `Large`
- **State** — `Default` · `Hover` · `Pressed` · `Active` · `Disabled`
- **Filled** — `True` · `False`
- **Show/hide** — Prefix 1, Prefix 2
- **Text** — Value

---

**Usage guidelines**
- Start filtering after the first character and highlight the matching part.
- Say clearly whether free text is allowed or a value must be picked from the list.
- Show an empty state when nothing matches.

---

**Accessibility**
- Follow the ARIA combobox pattern: `role="combobox"`, `aria-expanded`, `aria-activedescendant`; arrow keys move through options, Enter selects, Escape closes.
- Announce the number of results with a live region.
