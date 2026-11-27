**Status: beta** — in code as `ProgressBar`.

Shows how far a task has got (upload, setup, quota). Use a spinner when progress can't be measured.

---

**Properties**
- **Type** — `Line` · `Circle`
- **Progress** — `0%` · `10%` · `20%` · `30%` · `40%` · `50%` · `60%` · `70%` · `80%` · `90%` · `100%` · `Success` · `Error`
- **Show/hide** — Label, Description

---

**Usage guidelines**
- In code: `<ProgressBar label="Uploading report.pdf" value={60} />`; `status` success·danger for finished or failed, `type="circle"` for a compact ring; `valueText` for "3 of 5 steps".
- Show the value as text too ("60%", "3 of 5 steps").

---

**Accessibility**
- Use `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` and a label.
