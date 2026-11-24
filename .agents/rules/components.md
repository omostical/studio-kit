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
  use `error`, `negative` or `positive`. Check: `rg -n '"(error|negative|positive)"' src/components --glob '!*.stories.tsx'`
  prints only the lines listed below.
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
  `node scripts/build-descriptions.mjs`. Only `button.md` and `input.md` are hand-written.
- When behaviour changes, update the JSDoc, the story and the description in the same change.

## Before you finish

`npx tsc --noEmit && npx eslint src && npm run lint:tokens && npm run design:check && npm run build`
