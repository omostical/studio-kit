**Status: beta** — in code as `Tabs`.

Switches between related sections of content on the same page. Use **Segmented Control** to switch views of the same content and **Sidebar** or **Navigation Bar** to go to other pages.

---

**Properties**
- **Variant** — `Regular` · `Full width` · `Pill`
- **Size** — `Small` · `Large`
- **Show/hide** — Show Divider

---

**Usage guidelines**
- Keep labels short (one or two words) and the number of tabs small.
- Don't use tabs for steps in a sequence (use **Progress Stepper**).

---

**Accessibility**
- Follow the ARIA tabs pattern: `role="tablist"`, `tab` and `tabpanel` with `aria-selected`; arrow keys move between tabs.
