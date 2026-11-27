**Status: beta** — in code as `SidePanel`.

A panel that slides in from the side for details or editing while keeping the page visible. Use **Modal** when the task must block the page.

---

**Properties**
- **Size** — `Small` · `Medium` · `Large`
- **Type** — `Details` · `Form` · `Task`
- **Show/hide** — Footer

---

**Usage guidelines**
- Use it for item details, filters and secondary editing.
- Give it a clear title and a close button.
- In code: `SidePanel` + `SidePanelTrigger asChild`, `SidePanelContent size`, `SidePanelHeader title description avatar actions tabs`, `SidePanelBody type` (details · form · task) and an optional `SidePanelFooter`.

---

**Accessibility**
- If it blocks the page, follow Modal focus rules; if not, use `role="complementary"` or `region` with a label and move focus to it on open.
