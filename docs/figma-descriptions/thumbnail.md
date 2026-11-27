**Status: beta** — in code as `Thumbnail`.

A small preview of a file or media item by type (PDF, image, video, document).

---

**Properties**
- **Type** — `Icon` · `Image` · `Logo` · `Text` · `PDF` · `Spreadsheet` · `Document` · `Video` · `Picture`
- **Size** — `24px` · `16px` · `20px` · `40px` · `32px`
- **Swappable** — Swap Icon

---

**Usage guidelines**
- In code: `<Thumbnail type="pdf" />` or `<Thumbnail src="…" />`; sizes xsmall 16 · small 20 · medium 24 · large 32 · xlarge 40. Radius: Control/sm at 16px, Control/md at 20–24px, Control/lg at 32–40px. A failed image falls back to the picture icon.
- Use the real preview when available; the type icon otherwise.

---

**Accessibility**
- Decorative when the file name is shown next to it.
