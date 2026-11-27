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
- create(SplitButton): main Button joined to an arrow IconButton that opens a DropdownMenu, in all Button variants and sizes, filled or border — batch 2 of the StudioKIT 2.0 catalog
- create(AvatarGroup): overlapping row or 2 × 2 grid of Avatars in four sizes with a "+N" counter that can open the full list — batch 2 of the StudioKIT 2.0 catalog
- create(Chip): toggle (aria-pressed, check when pressed) and removable ("Remove <value>" button) chips in Primary/Secondary, filled/border, three sizes, with icon/logo/avatar prefix — batch 2 of the StudioKIT 2.0 catalog
- create(LinkButton): text-only link-style action in five variants and two sizes with prefix/suffix icons; `asChild` renders a real link — its own component because Figma gives it no fill, height or Style; batch 2 of the StudioKIT 2.0 catalog
- create(Thumbnail): file-type, image, logo, icon and text previews in five sizes with the Figma radius steps (Control/sm, md, lg) — answers the thumbnail-radius question (audit question 14); batch 2 of the StudioKIT 2.0 catalog
- create(ProgressBar): line and circle progress with label, value text, helper text and success/danger end states, as role=progressbar — batch 2 of the StudioKIT 2.0 catalog
- create(Divider): solid or dashed line in three weights and emphases, with an optional centred or left label — batch 2 of the StudioKIT 2.0 catalog
- create(Accordion): expandable sections on Radix Accordion, alone or stacked in `AccordionGroup` — contained boxes or dividers, optional icon, disabled items, several open at once by default — batch 3 (navigation) of the Figma components
- create(ProgressStepper): steps of a multi-step flow as an ordered list — horizontal or vertical, completed / active / incomplete / danger steps with optional description, `aria-current="step"` and the state in text, steps can link back — batch 3 (navigation) of the Figma components
- create(Pagination): page controls for long lists and tables, in `<nav aria-label="Pagination">` — less-numbers (5 slots), more-numbers (9 slots, "…" for gaps) and overflow (Prev / page Select / Next) types, optional Rows per page Select — batch 3 (navigation) of the Figma components
- create(Breadcrumbs): trail from the top level to the current page, on `<nav aria-label="Breadcrumb">` and an ordered list — arrow or slash separators, icon root item, current page with `aria-current`, middle levels collapse into a "…" button — batch 3 (navigation) of the Figma components
- create(Notifications): activity panel on Radix Popover composed from Avatar, Tabs and Button, with unread rows, group labels, quoted content and row actions — Notifications was planned in the catalog (batch 4 overlays)
- create(SystemAlert): full-width app banner, 5 statuses in high and low emphasis, with one action and dismiss — System Alert was planned in the catalog (batch 4 overlays)
- create(StatusModal): result or confirmation dialog on Modal with a status icon and tinted wash, 5 types, vertical and horizontal — Status Modal was planned in the catalog (batch 4 overlays)
- create(Popup): non-modal panel anchored to a trigger, on Radix Popover, Action and Information types with header, body and footer — Pop-up was planned in the catalog (batch 4 overlays)
- create(SidePanel): drawer on Radix Dialog in 3 widths, with header (avatar, actions, tabs), Details/Form/Task body and footer — Side Panel was planned in the catalog (batch 4 overlays)
- create(DropdownMenu): actions and options behind a button, on Radix Dropdown Menu — items with icon, description and shortcut, danger items, radio and checkbox options, group labels, dividers, one-level submenus — the team-members prototype needed it for row actions
- create(Avatar): photo, initials or icon in 6 sizes, rounded or square, with selected ring and presence dot; falls back from photo to initials to icon — first component built from GAPS.md (team-members prototype needed it)

## 2026-11-26

- refactor(Switch): track inset uses `p-gap-2` instead of `p-[2px]` (same 2px) — components have no unrecorded arbitrary values (#1)
- refactor(Modal, Select, Toast): their remaining arbitrary values carry `token-lint-ignore` reasons; no visual change (#1)
