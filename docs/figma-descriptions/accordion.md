**Status: beta** — in code as `Accordion`.

A heading that expands and collapses a section of content, for long pages where people only need some sections (FAQs, settings groups, filters). Use **Accordion Group** to stack several, and **Tabs** when sections are peers people switch between.

---

**Properties**
- **State** — `Default` · `Hover` · `Pressed` · `Focused` · `Disabled`
- **Expanded** — `False` · `True`
- **Contained** — `True` · `False`
- **Show/hide** — Entity, Label

---

**Usage guidelines**
- Write headings that tell people what's inside so they can choose without opening everything.
- Don't hide content everyone needs to see, such as errors or required fields.
- Start collapsed unless one section is the obvious starting point.
- In code: `Accordion` with `title` and the panel as children; stack several in `AccordionGroup`.

---

**Accessibility**
- The heading is a `<button>` inside a heading element, with `aria-expanded` and `aria-controls` pointing at the panel.
- Enter and Space toggle the section.
