A small dialog for a result or confirmation (success, warning, danger) with an icon, message and one or two actions.

---

**Properties**
- **Type** — `Negative` · `Positive` · `Information` · `Warning` · `Neutral`
- **Orientation** — `Vertical` · `Horizontal`
- **Show/hide** — Footer, Close Button

---

**Usage guidelines**
- For destructive confirmations, name the action in the button ("Delete project"), not "OK".

---

**Accessibility**
- For confirmations that need an answer, use `role="alertdialog"`. Otherwise follow Modal guidance.
