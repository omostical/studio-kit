**Status: beta** — in code as `AvatarGroup`.

Overlapping avatars for a set of people (members, assignees), with a "+N" counter when there are more.

---

**Properties**
- **Layout** — `Row` · `Grid`
- **Size** — `Large` · `Medium` · `Small` · `XSmall`
- **More People** — `True` · `False`

---

**Usage guidelines**
- In code: `<AvatarGroup aria-label="12 members" total={12}>{avatars}</AvatarGroup>`; `max` sets how many circles show (default 5 row, 4 grid); `onMoreClick` makes the "+N" counter a named button that opens the full list.
- Show up to 3–5 avatars, then "+N".
- Let people open the full list (popover or dialog) from the counter.

---

**Accessibility**
- Give the group a label with the total ("12 members") and make the "+N" counter reachable and named.
