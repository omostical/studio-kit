# Changelog

Changes to Studio Kit components and tokens, newest first. One line per change:

`- <type>(<Component or token>): <what changed> — <why> (#<PR>)`

`<type>` is the change type declared in the pull request: `create` (new component or token), `refine` (visual only,
no API change), `extend` (adds props or values, removes nothing), `refactor` (same rendered output, same API).
CI warns on a pull request that changes `src/components/` without a line here.

## Unreleased

- create(Search): Input with the search icon, clear button, Escape to clear and a shortcut hint, in a search landmark — batch 1 of the StudioKIT 2.0 form components

- create(Slider): single and range slider on Radix Slider — side, bottom or input labels, min/max labels, disabled, 48px touch area — batch 1 of the StudioKIT 2.0 form components

- create(SegmentedControl): 2–5 options that switch a view, on Radix Radio Group — regular and full-width, three sizes, label and icon items with tooltips, disabled items — batch 1 of the StudioKIT 2.0 form components

- create(CheckboxGroup): fieldset + legend around Checkboxes — vertical/horizontal, label, optional, helper text, error, disabled — batch 1 of the StudioKIT 2.0 form components

- create(TextArea): multi-line field on the Input field shell — label, optional, helper text, error, three sizes, resizable — closes the Textarea gap; batch 1 of the StudioKIT 2.0 form components

- create(RadioGroup): labelled set of RadioButtons on Radix Radio Group — vertical/horizontal, label, optional, helper text, error that turns options Danger; adds the shared FieldGroupShell — batch 1 of the StudioKIT 2.0 form components

- create(RadioButton): one pick-one option on Radix Radio Group — label, description, large and small, danger, disabled — batch 1 of the StudioKIT 2.0 form components

- create(DropdownMenu): actions and options behind a button, on Radix Dropdown Menu — items with icon, description and shortcut, danger items, radio and checkbox options, group labels, dividers, one-level submenus — the team-members prototype needed it for row actions

- create(Avatar): photo, initials or icon in 6 sizes, rounded or square, with selected ring and presence dot; falls back from photo to initials to icon — first component built from GAPS.md (team-members prototype needed it)

## 2026-11-26

- refactor(Switch): track inset uses `p-gap-2` instead of `p-[2px]` (same 2px) — components have no unrecorded arbitrary values (#1)
- refactor(Modal, Select, Toast): their remaining arbitrary values carry `token-lint-ignore` reasons; no visual change (#1)
