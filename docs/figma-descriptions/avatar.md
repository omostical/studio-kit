**Status: planned** — Figma only; there is no code component yet.

A picture, initials or icon that represents a person or organisation. Use **Avatar Group** for several people.

---

**Properties**
- **Variant** — `Image` · `Icon` · `Initials` · `Orb`
- **Type** — `Rounded` · `Square`
- **Size** — `XSmall` · `Small` · `Medium` · `Large` · `XLarge` · `XXLarge`
- **Selected** — `False` · `True`
- **Show/hide** — Status
- **Text** — Initials

---

**Usage guidelines**
- Use a photo when you have one, initials when you don't, and the icon as a last resort.
- Circles are for people; rounded squares for organisations, teams and workspaces.
- The status dot shows presence; don't use it for anything else.

---

**Accessibility**
- If the avatar sits next to the person's name, mark it decorative (`alt=""`); otherwise give it the person's name as alt text.
- Don't rely on the status dot's colour alone: also give the status in text or a tooltip.
