**Status: beta** — in code as `StatusModal`.

A small dialog for a result or confirmation (success, warning, danger) with an icon, message and one or two actions.

---

**Properties**
- **Type** — `Negative` · `Positive` · `Information` · `Warning` · `Neutral`
- **Orientation** — `Vertical` · `Horizontal`
- **Show/hide** — Footer, Close Button

---

**Usage guidelines**
- For destructive confirmations, name the action in the button ("Delete project"), not "OK".
- In code: `StatusModal` + `StatusModalTrigger asChild` and `StatusModalContent type` (danger · success · info · warning · neutral) `orientation title description actions footerStart`; built on Modal.

---

**Accessibility**
- For confirmations that need an answer, use `role="alertdialog"`. Otherwise follow Modal guidance.
