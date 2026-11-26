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
  covered by a component, follow "When the answer doesn't exist" in `AGENTS.md`: log it in `GAPS.md`, then leave
  it out or build a minimal stand-in marked `// stand-in: <Name>`. Never a lookalike of an existing component.
- Decide realistic content: real-sounding names, amounts, dates; no "Lorem ipsum", no "Label".
- Ask only if the screen's purpose is genuinely unclear; otherwise choose sensible defaults and state them.

## 2. Set up and look up the components
- If `AGENTS.md` or `src/components/index.ts` is missing, this checkout predates the design system: stop and say
  so rather than building from scratch.
- If `node_modules` is missing, run `npm ci`.
- Start Storybook in the background (`npm run storybook`) if port 6006 isn't already serving, wait for it, then
  use the `storybook` MCP: `docs-list`, then `docs-show` for each component you'll use (props, values, examples).
- If the MCP still won't connect, use the table in `AGENTS.md`, the JSDoc in `src/components/<Name>/<Name>.tsx` and
  `docs/figma-descriptions/<component>.md` — and mention it in the report.

## 3. Build
- Create `src/app/prototypes/<slug>/page.tsx`. Add `"use client";` if it has state or handlers.
- Import only from `@/components/*`, `lucide-react` (icons) and `react`. Styling only with token classes
  (`bg-static-fill-*`, `text-static-text-*`, `p-gap-*`, `rounded-container-*`, `type-*` …). Read `DESIGN.md` first and
  pick each token by its usage column.
- Before writing the page, read `.agents/rules/screens.md` and follow it: page shell, one Primary action per section, labels on every field,
  `aria-label` on icon buttons, statuses as `Badge`, errors as `Alert`, confirmations as `Toast` (wrap the page
  in `ToastProvider` if you use it).
- Make the main interactions work with local state (tabs switch, modal opens, toggle toggles, form validates and
  shows the error state). Include an empty or error state when the screen has one.
- Responsive: one column at 375px, wider layout from `sm:`/`lg:`. Tables follow "Tables at 375px" in `.agents/rules/screens.md`.
- Headings: page title `as="h1"`, sections `h2` (`CardTitle` already is); styled values that aren't headings get
  `as="p"`. Modals: open them through `ModalTrigger` (see "Modals" in `.agents/rules/screens.md`).

## 4. Check
- `npx tsc --noEmit && npx eslint src --max-warnings=0 && npm run lint:tokens && npm run design:check && npm run build` — fix
  everything. `lint:tokens` also rejects arbitrary values (`w-[160px]`) in prototypes; use the Size scale in
  `DESIGN.md`.
- Start the site (preview the `site` config in `.claude/launch.json`, or `npm run dev`), open
  `http://localhost:3000/prototypes/<slug>`, and look at it:
  - light, dark (set `data-theme="dark"` on `<html>`; the theme animates, so wait a moment before a screenshot),
    and 375px wide — the page must not scroll sideways, and tables shouldn't either;
  - tab through it: every control reachable, focus ring visible; open each modal with Enter, close it with
    Escape, and check focus returns to the button that opened it;
  - submit each form empty: errors show, and focus lands on the first invalid field;
  - list the headings (`document.querySelectorAll("h1,h2,h3,h4")`): h1 → h2 → h3 with no skips.
- Fix what you see before reporting.

## 5. Report
- The URL (`/prototypes/<slug>`), the components used, the check results, every gap you added to `GAPS.md` and
  every stand-in you built (file:line), anything you assumed, and anything in `AGENTS.md`, `DESIGN.md`, `.agents/rules/screens.md` or this skill that was
  missing or wrong.
