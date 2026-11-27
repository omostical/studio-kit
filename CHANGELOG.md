# Changelog

Changes to Studio Kit components and tokens, newest first. One line per change:

`- <type>(<Component or token>): <what changed> — <why> (#<PR>)`

`<type>` is the change type declared in the pull request: `create` (new component or token), `refine` (visual only,
no API change), `extend` (adds props or values, removes nothing), `refactor` (same rendered output, same API).
CI warns on a pull request that changes `src/components/` without a line here.

## Unreleased

- create(SystemAlert): full-width app banner, 5 statuses in high and low emphasis, with one action and dismiss — System Alert was planned in the catalog (batch 4 overlays)

- create(StatusModal): result or confirmation dialog on Modal with a status icon and tinted wash, 5 types, vertical and horizontal — Status Modal was planned in the catalog (batch 4 overlays)

- create(Popup): non-modal panel anchored to a trigger, on Radix Popover, Action and Information types with header, body and footer — Pop-up was planned in the catalog (batch 4 overlays)

- create(SidePanel): drawer on Radix Dialog in 3 widths, with header (avatar, actions, tabs), Details/Form/Task body and footer — Side Panel was planned in the catalog (batch 4 overlays)

- create(DropdownMenu): actions and options behind a button, on Radix Dropdown Menu — items with icon, description and shortcut, danger items, radio and checkbox options, group labels, dividers, one-level submenus — the team-members prototype needed it for row actions

- create(Avatar): photo, initials or icon in 6 sizes, rounded or square, with selected ring and presence dot; falls back from photo to initials to icon — first component built from GAPS.md (team-members prototype needed it)

## 2026-11-26

- refactor(Switch): track inset uses `p-gap-2` instead of `p-[2px]` (same 2px) — components have no unrecorded arbitrary values (#1)
- refactor(Modal, Select, Toast): their remaining arbitrary values carry `token-lint-ignore` reasons; no visual change (#1)
