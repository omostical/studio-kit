**Status: beta** — in code as `ProgressStepper`.

Shows the steps of a multi-step flow (checkout, onboarding) and where people are. Use **Breadcrumbs** for site hierarchy.

---

**Properties**
- **Size** — `Small`
- **Position** — `Vertical` · `Horizontal`

---

**Usage guidelines**
- Keep to 3–7 steps with short labels.
- Show completed, current and upcoming states; let people go back to completed steps.
- In code: `ProgressStepper` with one `ProgressStep` per step (`type` completed, active, incomplete or danger); give completed steps `onClick` or `href` so people can go back.

---

**Accessibility**
- Use an ordered list and mark the current step with `aria-current="step"`; include the state in text ("Completed").
