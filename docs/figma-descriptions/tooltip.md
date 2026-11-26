**Status: beta** — in code as `Tooltip`.

A short text hint shown on hover and focus, for icon-only buttons and truncated text. Use **Pop-up** for anything interactive or longer than a sentence.

---

**Properties**
- **Variant** — `Default` · `Inverse`
- **Size** — `Medium` · `Small`
- **Alignment** — `Right` · `Bottom` · `Top` · `Left`
- **Description** — `False` · `True`
- **Show/hide** — Arrow
- **Text** — Label, Description Text

---

**Usage guidelines**
- Keep it to a few words; never put essential information only in a tooltip.

---

**Accessibility**
- Show it on keyboard focus as well as hover, link it with `aria-describedby`, and let Escape dismiss it.
- Don't put links or buttons inside a tooltip.
