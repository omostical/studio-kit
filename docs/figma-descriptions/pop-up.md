A small floating panel anchored to a trigger, for extra details or quick actions that don't need a full Modal.

---

**Properties**
- **Type** — `Action` · `Information`
- **Show/hide** — Footer, Close Button, Header

---

**Usage guidelines**
- Close it when people click outside or press Escape.
- Use **Tooltip** for a short hint and **Dropdown Menu** for a list of actions.

---

**Accessibility**
- The trigger needs `aria-expanded` and `aria-controls`; move focus into the pop-up if it has interactive content.
