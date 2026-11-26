**Status: planned** — Figma only; there is no code component yet.

Moves through pages of a long list or table. Consider "Load more" or infinite scroll for feeds.

---

**Properties**
- **Type** — `More numbers` · `Overflow` · `Less numbers`
- **Show/hide** — Rows per page

---

**Usage guidelines**
- Show the current page and total, plus previous and next.
- Keep the page size control near the pagination.

---

**Accessibility**
- Wrap it in `<nav aria-label="Pagination">`, label page links ("Page 3"), and set `aria-current="page"`.
