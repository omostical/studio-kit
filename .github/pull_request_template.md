## What and why

<!-- One or two sentences. Link the GAPS.md line this closes, if any. -->

## Change type

<!-- Tick exactly one when the PR touches src/components/ or tokens. CI warns when none is ticked. -->

- [ ] create — new component or token
- [ ] refine — visual only, no API change
- [ ] extend — adds props or values, removes or renames nothing
- [ ] refactor — same rendered output, same API
- [ ] none — no component or token change (screens, docs, tooling)

## Checklist

- [ ] `CHANGELOG.md` has a line for each component or token change
- [ ] Gaps found while working are lines in `GAPS.md`; gaps this PR closes are deleted from it
- [ ] Checked in the browser in light, dark and at 375px (UI changes)

The `tokens` check runs the rest: `tokens:check`, `design:check`, `descriptions:check`, `lint:tokens`,
`eslint --max-warnings=0`, `tsc`, `build`.
