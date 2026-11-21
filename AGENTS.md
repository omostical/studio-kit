# Studio Kit — instructions for AI agents

Studio Kit is a design system: **Figma "StudioKIT 2.0" → design tokens → React components → prototypes.**
Build UI only from the components in `src/components` and the tokens in `src/styles/generated`. This file is
everything you need; you shouldn't have to read the component source to use them.

## Rules (must)

1. **Use the components.** Import from `@/components` (or `@/components/<Name>`). Don't hand-build a button,
   input, badge, tag, card, tabs, modal, tooltip, toast or table — the component already handles states, focus
   and accessibility.
2. **Use tokens for every visual value.** Colours, spacing, radius, type and shadows come from the token classes
   below. No hex codes, no `rgb()`, no Tailwind palette classes (`bg-blue-500`, `text-gray-700`), no arbitrary
   values for things a token covers. `npm run lint:tokens` fails on raw colours, on token classes that don't
   exist, and (in `src/app/prototypes`) on arbitrary values — run it.
3. **Never edit generated files**: `tokens/figma/*`, `src/styles/generated/*`, `src/tokens/generated.ts`.
   Design changes happen in Figma, then `npm run tokens:build` (see `tokens/README.md`).
4. **Props mirror Figma.** Figma "Variant" → `variant`, "Style" → `appearance`, "Size" → `size` with values
   `xsmall | small | medium | large`. Use those words when talking to designers.
5. **Accessibility is part of done:** every field has a `label`; icon-only buttons have `aria-label` (and usually
   a `Tooltip`); errors say how to fix the problem; one Primary button per section; status is never shown by
   colour alone; headings are in order.
6. **Before you finish:** `npx tsc --noEmit && npx eslint src && npm run lint:tokens && npm run build`, then look at
   the result in the browser in light **and** dark (`data-theme="dark"` on a parent) and at 375px wide.

## Where to look up a component

- **Storybook MCP** (best): the `storybook` MCP server (`.mcp.json`, `http://localhost:6006/mcp`) gives
  `docs-list` (all components), `docs-show` (props, types, defaults, JSDoc, examples) and `stories-preview`.
  Prefer it over reading source. It only answers while Storybook runs: if `node_modules` is missing run `npm ci`,
  then start `npm run storybook` in the background and wait for port 6006; the MCP reconnects on the next call.
  If it still won't connect, use the table below plus the JSDoc in `src/components/<Name>/<Name>.tsx`.
- **Usage guidance** (when to use what, a11y): `docs/figma-descriptions/<component>.md` — the same text designers
  see in Figma.
- **Live examples:** `src/components/<Name>/<Name>.stories.tsx`, and the docs site `/components`.

## Components

| Component | Use it for | Key props |
|---|---|---|
| `Button` | Actions | `variant` primary·secondary·danger·success·inverse · `appearance` filled·border·ghost · `size` · `prefixIcon` `suffixIcon` `loading` `asChild` |
| `IconButton` | Compact well-known actions (close, edit, more) | same as Button + `icon`, required `aria-label`; defaults secondary + ghost |
| `Input` | Single-line text field | `label` `helperText` `error` `optional` `prefix` `suffix` (icons or text) · `size` small·medium·large · `appearance` border·ghost · `wrapperClassName` (sizes the whole field; `className` styles the input) |
| `Select` + `SelectItem` | Pick one value in a form | same field props as Input; `value`/`onValueChange` |
| `Checkbox` | On/off option, multi-select, row selection | `checked` (true·false·"indeterminate") `label` `description` · `size` small·large |
| `Switch` | Setting that applies immediately | `label` `description` `labelPosition` · `size` small·large |
| `Alert` | In-page message about nearby content | `status` error·warning·success·info · `title` `description` `actionLabel` `onAction` `dismissible` · `position` horizontal·vertical (use vertical for page-wide alerts with an action, or the text squeezes at 375px) · `titleAs` (heading level, default h3) |
| `Toast` via `ToastProvider` + `useToast().show()` | Short confirmation after an action | `status` neutral·info·positive·error · `emphasis` high·low · `title` `actionLabel` |
| `Badge` | Status of an item (Active, Pending, Failed) | `status` negative·notice·positive·info·neutral · `emphasis` low·high · `size` |
| `Tag` | Category / metadata label (not status) | `color` (13 categories) · `emphasis` filled·border · `size` · `rounded` |
| `Card` + `CardHeader/Title/Description/Content/Footer` | Group content and its actions | `container` (false = no box, for grey backgrounds) · `CardTitle as` (h2 by default; h3 inside a titled section) |
| `Tabs` + `TabsList/Trigger/Content` | Switch sections on one page | `variant` regular·pill · `size` small·large · `fullWidth` |
| `Modal` + `ModalTrigger/Content/Header/Body/Footer/Close` | Focused task that blocks the page | `Modal open onOpenChange` · `ModalContent size` small·medium·large · `ModalHeader title description` · see "Modals" below |
| `Tooltip` | Hint for icon buttons / truncated text | `content` `description` `variant` default·inverse `side` |
| `Table` + `TableHeader/Body/Row/Head/Cell` | Structured data | `Table size` · `TableRow selected` · `TableHead sort onSort numeric` · `TableCell numeric description` |
| `Typography` | Text in a Figma text style | `variant` e.g. title-small·subtitle-small·label-strong-small·body-medium·caption-medium · `tone` strong·base·subtle · `as` — the tag follows the variant (title → h1/h2, subtitle → h3/h4, body → p, rest → span), so set `as="p"` when a title/subtitle style isn't a heading |

Choosing: action → Button; navigation link → `Button asChild` around `next/link` with `appearance="ghost"`, or a
plain link; status → Badge; category → Tag; message in page → Alert; message after an action → Toast;
blocking task → Modal; settings toggle → Switch; form choice → Checkbox / Select.

## Tokens (Tailwind classes)

Names are the Figma variable path in kebab case: `Dynamic/Fill/Primary/Default` → `bg-dynamic-fill-primary-default`.

- **Surfaces:** `bg-static-fill-background` (page canvas, grey) · `bg-static-fill-foreground` (white sections) ·
  `bg-static-fill-container` (cards) · `bg-static-fill-overlay` (menus, dialogs) · `bg-static-fill-alpha-subtle` (quiet fill)
- **Text:** `text-static-text-strong` (headings, values) · `text-static-text-base` (body) · `text-static-text-subtle`
  (secondary, hints) · status: `text-semantic-text-{positive|negative|notice|info}`
- **Borders / dividers:** `border-static-stroke-base` (default) · `-subtle` · `-strong`
- **Brand / status fills:** `bg-dynamic-fill-primary-default` · `bg-semantic-fill-{positive|negative|notice|info}` (tints)
- **Spacing** (Gap scale, px): `gap-3`=4 `gap-5`=8 `gap-7`=12 `gap-9`=16 `gap-11`=20 `gap-12`=24 `gap-14`=32
  `gap-16`=40 `gap-18`=48 `gap-20`=64 → use as `p-gap-9`, `gap-gap-5`, `mt-gap-12`, `px-gap-11` …
- **Sizes** (Size scale, px — icon boxes, avatars, fixed widths): `size-5`=8 `size-7`=12 `size-9`=16 `size-11`=20
  `size-12`=24 `size-14`=32 `size-16`=40 `size-18`=48 `size-20`=64 `size-22`=80 `size-24`=96 `size-26`=128
  `size-28`=160 → use as `size-size-9`, `w-size-16`, `min-w-size-28`. Wider than 160px: use `max-w-*`/grid
  instead of a fixed width. No arbitrary values (`w-[160px]`) in screens — `lint:tokens` rejects them in
  `src/app/prototypes`.
- **Radius:** `rounded-control-{sm|md|lg|xl|full}` (controls) · `rounded-container-{sm|md|lg|xl}` (cards, dialogs)
- **Type:** `type-title-{large|medium|small}` · `type-subtitle-{large|medium|small|xsmall}` · `type-label-{…}` ·
  `type-label-strong-{…}` · `type-body-{large|medium|small}` · `type-body-strong-{…}` · `type-caption-{…}` ·
  `type-number-{…}` (prefer the `Typography` component)
- **Shadows:** `shadow-default` (cards) · `shadow-elevation-{low|medium|high}` (floating) · `shadow-focus-base` (focus ring)
- **Heights:** `h-forms-{xsmall|small|medium|large}` = 24/32/40/48 (match controls)

Full list: the `/tokens` page or `src/tokens/generated.ts`.

## Composing screens

- **Page shell:** `<main className="min-h-screen bg-static-fill-background">` with content in
  `mx-auto max-w-5xl px-gap-12 py-gap-16`; page title `Typography as="h1" variant="title-small"`; description
  `body-large` + `tone="subtle"`; space sections with `gap-gap-14`.
- **Forms:** a `Card` (or `container={false}` on a white page) with fields stacked `grid gap-gap-11`; actions in
  `CardFooter` (secondary-border Cancel, then Primary). Two-column fields: `grid gap-gap-11 sm:grid-cols-2`.
- **Settings:** sections as Cards with a `CardHeader` title/description; rows `flex items-start justify-between
  gap-gap-9` with a `Switch` or control on the right; separate rows with `border-b border-static-stroke-base`.
- **Lists / data:** toolbar row (`Input` with search prefix + filter/primary Buttons, `gap-gap-5`) above a `Table`
  in a Card; statuses as `Badge`; row actions as `IconButton` + `Tooltip`; numbers `numeric`.
- **Dashboards:** responsive grid `grid gap-gap-12 sm:grid-cols-2 lg:grid-cols-4` of Cards; key number
  `Typography as="p" variant="title-small"`, label `caption-medium tone="subtle"`.
- **Headings:** one `h1` (the page title), then `h2` per section — `CardTitle` is `h2` by default, `Alert` titles
  take `titleAs`, `ModalHeader` titles are handled for you. Styled values that aren't headings (plan names, key
  numbers) get `as="p"`. Check with the browser: the heading list should read h1 → h2 → h3 without skips.
- **Modals:** put the opening button in `ModalTrigger asChild` — that's what returns focus to it on close. Use
  `open`/`onOpenChange` on `Modal` only when something else also opens it (e.g. an Alert action) or a submit must
  close it; then keep the `ModalTrigger` as well. If the trigger can disappear after the action (an Upgrade button
  that's gone once upgraded) or the modal was opened from elsewhere, pass `onCloseAutoFocus={(e) => { e.preventDefault();
  someRef.current?.focus(); }}` to `ModalContent`. Forms inside a modal: wrap Header/Body/Footer in one `<form
  noValidate>` with `className="flex min-h-0 flex-1 flex-col"`; on a failed submit, focus the first
  `[aria-invalid="true"]` field.
- **Tables at 375px:** `Table` scrolls sideways inside its container, which hides the last columns (often the row
  actions). Keep 3–4 columns on mobile: hide secondary ones with `hidden sm:table-cell` on both `TableHead` and
  `TableCell`, and show the most important hidden value in the first cell's `description` inside
  `<span className="sm:hidden">`. Rows have a fixed height, so keep that description to one short line. Keep the
  status and row-actions columns visible, and check at 375px that the table doesn't scroll sideways.
- **Empty / loading / error states:** always design them — empty: short sentence + one Primary action;
  error: `Alert status="error"` with a retry; loading: `Button loading` or skeleton blocks in `bg-static-fill-alpha-subtle`.

## Workflows

- **Prototype a screen:** `/prototype "<screen>"` (`.claude/skills/prototype`) → `src/app/prototypes/<slug>/page.tsx`.
- **New client / rebrand:** `/new-client <name>` (`.claude/skills/new-client`).
- **Change a component:** keep the Figma property names, update its JSDoc (that's what the Storybook MCP serves),
  its story and its description if behaviour changes, and run the checks above. Descriptions are generated: edit
  `docs/figma-descriptions/components.json` and run `node scripts/build-descriptions.mjs` (only `button.md` and
  `input.md` are hand-written).

Project context: `docs/PLAN.md` (roadmap) and `docs/HANDOFF.md` (current state).
