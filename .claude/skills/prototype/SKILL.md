---
name: prototype
description: Build a clickable prototype screen from the Studio Kit components and tokens, at /prototypes/<slug>. Use when someone asks to prototype, mock up or build a screen, page or flow with the design system.
argument-hint: "<screen description>"
---

# /prototype — build a screen from the design system

Input: a description of the screen ($ARGUMENTS), e.g. "billing settings with plan, payment method and invoices".

## 1. Plan (briefly, in your reply)
- Name the screen and pick a slug (`billing-settings`).
- List the sections and, for each, which components it uses (see the table in `AGENTS.md`). If a need isn't
  covered by a component, say so and compose it from tokens — don't invent a lookalike of an existing component.
- Decide realistic content: real-sounding names, amounts, dates; no "Lorem ipsum", no "Label".
- Ask only if the screen's purpose is genuinely unclear; otherwise choose sensible defaults and state them.

## 2. Look up the components
- If `npm run storybook` is running, use the `storybook` MCP: `docs-list`, then `docs-show` for each component
  you'll use (props, values, examples).
- Otherwise use `AGENTS.md` and `docs/figma-descriptions/<component>.md`.

## 3. Build
- Create `src/app/prototypes/<slug>/page.tsx`. Add `"use client";` if it has state or handlers.
- Import only from `@/components/*`, `lucide-react` (icons) and `react`. Styling only with token classes
  (`bg-static-fill-*`, `text-static-text-*`, `p-gap-*`, `rounded-container-*`, `type-*` …) — see `AGENTS.md`.
- Follow "Composing screens" in `AGENTS.md`: page shell, one Primary action per section, labels on every field,
  `aria-label` on icon buttons, statuses as `Badge`, errors as `Alert`, confirmations as `Toast` (wrap the page
  in `ToastProvider` if you use it).
- Make the main interactions work with local state (tabs switch, modal opens, toggle toggles, form validates and
  shows the error state). Include an empty or error state when the screen has one.
- Responsive: one column at 375px, wider layout from `sm:`/`lg:`.

## 4. Check
- `npx tsc --noEmit && npx eslint src && npm run lint:tokens` — fix everything.
- Start the site (preview the `site` config in `.claude/launch.json`, or `npm run dev`), open
  `http://localhost:3000/prototypes/<slug>`, and look at it:
  - light, dark (set `data-theme="dark"` on `<html>`), and 375px wide;
  - tab through it: every control reachable, focus ring visible.
- Fix what you see before reporting.

## 5. Report
- The URL (`/prototypes/<slug>`), the components used, any gap where no component fitted (a candidate for the
  design system), and anything you assumed.
