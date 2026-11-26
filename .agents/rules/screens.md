---
description: Recipes for building screens and prototypes from Studio Kit components (consumer agents).
paths:
  - "src/app/prototypes/**"
globs: src/app/prototypes/**
alwaysApply: false
---

# Building screens

Applies to every page under `src/app/prototypes/`. Components and their props: the table in `AGENTS.md`. Tokens
and when to use each one: `DESIGN.md`.

## Layout recipes

- **Page shell:** `<main className="min-h-screen bg-static-fill-background">` with content in
  `mx-auto max-w-5xl px-gap-12 py-gap-16`; page title `Typography as="h1" variant="title-small"`; description
  `body-large` + `tone="subtle"`; space sections with `gap-gap-14`.
- **Forms:** a `Card` (or `container={false}` on a white page) with fields stacked `grid gap-gap-11`; actions in
  `CardFooter` (secondary-border Cancel, then Primary). Two-column fields: `grid gap-gap-11 sm:grid-cols-2`.
- **Settings:** sections as Cards with a `CardHeader` title/description; rows `flex items-start justify-between
  gap-gap-9` with a `Switch` or control on the right; separate rows with `border-b border-static-stroke-base`.
- **Lists / data:** toolbar row (`Input` with search prefix + filter/primary Buttons, `gap-gap-5`) above a `Table`
  in a Card; statuses as `Badge`; one or two row actions as `IconButton` + `Tooltip`, three or more as a `DropdownMenu` behind a "More" `IconButton` (`aria-label` names the row); numbers `numeric`.
- **Dashboards:** responsive grid `grid gap-gap-12 sm:grid-cols-2 lg:grid-cols-4` of Cards; key number
  `Typography as="p" variant="title-small"`, label `caption-medium tone="subtle"`.
- **Empty / loading / error states:** every screen that has one shows it — empty: one sentence + one Primary
  action; error: `Alert status="error"` with a retry; loading: `Button loading` or skeleton blocks in
  `bg-static-fill-alpha-subtle`.

## Headings

One `h1` (the page title), then `h2` per section — `CardTitle` is `h2` by default, `Alert` titles take `titleAs`,
`ModalHeader` titles are handled for you. Styled values that aren't headings (plan names, key numbers) get
`as="p"`. Check in the browser: `document.querySelectorAll("h1,h2,h3,h4")` reads h1 → h2 → h3 with no skips.

## Modals

- Put the opening button in `ModalTrigger asChild` — that's what returns focus to it on close. Use
  `open`/`onOpenChange` on `Modal` only when something else also opens it (e.g. an Alert action) or a submit must
  close it; then keep the `ModalTrigger` as well. `open`, `onOpenChange` and `onCloseAutoFocus` come from Radix
  Dialog and are supported even though the Storybook MCP doesn't list them.
- If the trigger can disappear after the action (an Upgrade button that's gone once upgraded, a Remove button on
  the row being removed) or the modal was opened from elsewhere, pass
  `onCloseAutoFocus={(e) => { e.preventDefault(); someRef.current?.focus(); }}` to `ModalContent`, pointing at an
  element that still exists (the next row's button, the section heading with `tabIndex={-1}`).
- Forms inside a modal: wrap Header/Body/Footer in one `<form noValidate>` with
  `className="flex min-h-0 flex-1 flex-col"`; on a failed submit, focus the first `[aria-invalid="true"]` field.

## Tables at 375px

`Table` scrolls sideways inside its container, which hides the last columns (often the row actions). Keep 3–4
columns on mobile: hide secondary ones with `hidden sm:table-cell` on both `TableHead` and `TableCell`, and show
the most important hidden value in the first cell's `description` inside `<span className="sm:hidden">`. Rows have
a fixed height, so that description is one line. The row-actions column always stays visible; a status column may
fold into the description when the first column needs the width. Check at 375px: the table's container has
`scrollWidth === clientWidth`.
