A month grid for picking a date or date range. Usually used inside **Date picker**; place it on its own only when the calendar is the main content.

---

**Properties**
- **Type** — `Single Date` · `Date Range` · `Date Range (Two)` · `Month` · `Year`
- **Container** — `False` · `True`
- **Predefined Options** — `False` · `True`
- **Show/hide** — Helper Text, First Month, Previous Month, Next Month, Last Month

---

**Usage guidelines**
- Make today easy to find and disable dates people can't choose.
- Days outside the current month are shown faded; they're decoration, not choices, unless the product needs them.

---

**Accessibility**
- Use the grid pattern: arrow keys move by day, Page Up/Down by month, Home/End to the start or end of the week.
- Announce the selected date and the visible month; give disabled dates `aria-disabled`.
