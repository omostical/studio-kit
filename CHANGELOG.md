# Changelog

Changes to Studio Kit components and tokens, newest first. One line per change:

`- <type>(<Component or token>): <what changed> — <why> (#<PR>)`

`<type>` is the change type declared in the pull request: `create` (new component or token), `refine` (visual only,
no API change), `extend` (adds props or values, removes nothing), `refactor` (same rendered output, same API).
CI warns on a pull request that changes `src/components/` without a line here.

## Unreleased

- create(Avatar): photo, initials or icon in 6 sizes, rounded or square, with selected ring and presence dot; falls back from photo to initials to icon — first component built from GAPS.md (team-members prototype needed it)

## 2026-11-26

- refactor(Switch): track inset uses `p-gap-2` instead of `p-[2px]` (same 2px) — components have no unrecorded arbitrary values (#1)
- refactor(Modal, Select, Toast): their remaining arbitrary values carry `token-lint-ignore` reasons; no visual change (#1)
