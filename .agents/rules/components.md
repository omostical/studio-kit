---
description: Rules for editing Studio Kit components and their Figma descriptions (contributor agents).
paths:
  - "src/components/**"
  - "docs/figma-descriptions/**"
globs: src/components/**, docs/figma-descriptions/**
alwaysApply: false
---

# Editing components

Applies when you create or change anything in `src/components/` or `docs/figma-descriptions/`. Building screens
with the components is covered by `.agents/rules/screens.md`.

## Structure

- One folder per component: `src/components/<Name>/<Name>.tsx`, `<Name>.stories.tsx`, `index.ts`, and one
  `export * from "./<Name>"` line in `src/components/index.ts`. Check: `ls src/components/<Name>` lists all three.
- Every exported prop has a JSDoc comment. The Storybook MCP (`docs-show`) serves that text to other agents; a prop
  without JSDoc is invisible to them.
- Shared internals live in `src/components/_shared/` and are not exported from `src/components/index.ts`.

## Props mirror Figma

- Figma "Variant" → `variant`, "Style" → `appearance`, "Size" → `size` with values `xsmall | small | medium | large`.
  Other Figma properties keep their Figma name in camelCase.
- A prop value that has no Figma counterpart is added in Figma first (design changes start in Figma; see
  `AGENTS.md` rule 3).

## Intent words: `danger` and `success`

The team chose one word pair for failure and success (`design-system-audit.md`, team decisions 2 and rename scope).

- New props and new prop values use `danger` for failure or destructive intent and `success` for success. They never
  use `error`, `negative` or `positive`. `npm run lint:tokens` fails on those words in any component file except
  `Alert.tsx`, `Toast.tsx` and `Badge.tsx`.
- These existing values still use the old words until they are renamed in Figma, then in code, stories and
  descriptions:
  - `Alert` `status`: `error` → `danger`
  - `Toast` `status`: `error` → `danger`, `positive` → `success`
  - `Badge` `status`: `negative` → `danger`, `positive` → `success`
- Token names stay as they are: `semantic-*-negative` and `semantic-*-positive` are the status tokens behind
  `danger` and `success`. Only component props are renamed.

## Catalog status and descriptions

- Each component's status lives in `docs/figma-descriptions/components.json` (`status`, and `code` for components
  that exist in code). Statuses: `stable` (reviewed, the default answer), `beta` (in code, API may still change),
  `planned` (Figma description only, no code).
- A new component enters as `beta` with its `code` path. Moving it to `stable` is a team decision.
- Descriptions are generated: edit `docs/figma-descriptions/components.json`, then run
  `npm run descriptions:build`. Only `button.md` and `input.md` are hand-written. `npm run descriptions:check` (in
  CI) fails when a generated file differs from its source.

## Values without a token

Component code has no arbitrary values (`max-w-[400px]`, `z-[60]`), except recorded ones. When a Figma value has
no token, keep the literal and put `token-lint-ignore: <why no token fits>` (20+ characters) on the same line or the
line above, as in `Modal.tsx`, `Toast.tsx` and `Select.tsx`. `npm run lint:tokens` fails on an arbitrary value
without the marker, on a marker without a reason, and on a marker that excuses nothing. Stories are exempt.
- When behaviour changes, update the JSDoc, the story and the description in the same change.

## Change type and changelog

Every change to a component or token has one type, ticked in the pull request template
(`.github/pull_request_template.md`): `create` (new), `refine` (visual only, no API change), `extend` (adds props or
values, removes nothing), `refactor` (same rendered output, same API). A `refine` that starts adding props is now an
`extend`: say so in the PR, don't widen it silently.

Add one line to `CHANGELOG.md` under Unreleased: `- <type>(<Component>): <what changed> — <why> (#<PR>)`. CI warns
when `src/components/` changes without a `CHANGELOG.md` line or without a ticked change type. Building a component
listed in `GAPS.md` deletes its line there in the same PR.

## Before you finish

`npm run tokens:check && npm run design:check && npm run descriptions:check && npm run lint:tokens &&
npx eslint src --max-warnings=0 && npx tsc --noEmit && npm run build` — the same steps CI runs (`.github/workflows/tokens.yml`).
