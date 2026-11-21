Buttons trigger an action: submitting a form, confirming, moving a flow forward, or a destructive operation. To go to another page, use **Link Button**. For icon-only actions, use **Icon Button**. For a main action with related alternatives, use **Split Button**.

---

**Variant** — intent.
- `Primary` — the single most important action in a section ("Save", "Submit"). One per section.
- `Secondary` — supporting actions next to a Primary ("Cancel", "Back").
- `Danger` — destructive or irreversible actions ("Delete", "Remove"). Ask for confirmation before acting.
- `Success` — completes a positive workflow ("Approve", "Publish"). Use sparingly; Primary is usually enough.
- `Inverse` — only on dark or image backgrounds.

**Style** — emphasis. Choose intent with Variant and emphasis with Style.
- `Filled` — highest emphasis. `Secondary` + `Filled` is a soft grey button for low-emphasis actions that still need a visible shape.
- `Border` — medium emphasis: white fill with an outline.
- `Ghost` — lowest emphasis: no fill until hover. For toolbars, table rows and repeated actions.

**Size** — density (height · corner radius · label size).
- `Large` — 48 · 12 · 16px. Standalone calls to action, modals, mobile.
- `Medium` — 40 · 8 · 14px. The default.
- `Small` — 32 · 8 · 14px. Tables, inline forms, dense dashboards.
- `XSmall` — 24 · 6 · 12px. Tight toolbars only; use sparingly.

**State** — `Default`, `Hover`, `Pressed`, `Focused`, `Disabled`. When a button is disabled, say why with helper text or a tooltip.

---

**Anatomy**
Label (required) · Prefix icon (optional) · Suffix icon (optional). Icons are 20px on Large and Medium, 16px on Small and XSmall.

---

**Usage guidelines**
- Always show a text label, and use a verb that says what happens ("Save changes", not "OK").
- In a button group, put the Primary action last in reading order (on the right in left-to-right layouts).
- Don't put more than one Primary button in a section.
- Colours come from `Dynamic/Fill/<Variant>/<State>` and `Dynamic/Text/On<Variant>/<State>`. Don't override them.
- Target size: at least 24×24px including spacing (WCAG 2.5.8, AA). On touch screens aim for 44×44px; give Small and XSmall surrounding space or a larger hit area.

---

**Accessibility**
- Use a native `<button>`. Enter and Space activate it.
- `Focused` uses the `Focus/Base` effect: a 2px white gap and a 2px brand ring. Never remove it.
- If a disabled button must stay discoverable (for example to explain why it's disabled), use `aria-disabled="true"` and block the action in code instead of the `disabled` attribute.
- When the label is generic ("Delete"), add context with `aria-label` ("Delete project Alpha").
- Every Filled variant meets 4.5:1 text contrast in Light mode.

---

**Known issues**
- ⚠️ Mobile mode still uses Wideset's fonts (Inter) and a 10px Large radius (Figma Starter plan limit).
- ⚠️ Dark mode Danger and Success fills are still Wideset's original values and haven't been reviewed.
