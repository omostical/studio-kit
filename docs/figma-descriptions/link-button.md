**Status: planned** — Figma only; there is no code component yet.

A text-only action styled as a link, for navigation or low-emphasis actions inside text, cards and forms ("Forgot your password?", "View all"). Use **Button** for actions that change data.

---

**Properties**
- **Variant** — `Primary` · `Secondary` · `Danger` · `Inverse` · `Success`
- **Size** — `Small` · `Large`
- **State** — `Default` · `Hover` · `Pressed` · `Focused` · `Disabled`
- **Show/hide** — Prefix, Suffix
- **Text** — Label
- **Swappable** — Prefix Icon, Suffix Icon

---

**Usage guidelines**
- Use it to go somewhere; use a Button to do something.
- Write the destination or result as the label ("View invoice"), never "Click here".
- Don't use it as the main action of a form or dialog.

---

**Accessibility**
- Render navigation as an `<a href>`, and in-page actions as a `<button>` styled as a link.
- Link text must make sense out of context: screen-reader users often list links on their own.
