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
   values for things a token covers. `npm run lint:tokens` fails on raw colours **and** on token classes that
   don't exist — run it.
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

- **Storybook MCP** (best): with `npm run storybook` running, the `storybook` MCP server (`.mcp.json`,
  `http://localhost:6006/mcp`) gives `docs-list` (all components), `docs-show` (props, types, defaults, JSDoc,
  examples) and `stories-preview`. Prefer it over reading source.
- **Usage guidance** (when to use what, a11y): `docs/figma-descriptions/<component>.md` — the same text designers
  see in Figma.
- **Live examples:** `src/components/<Name>/<Name>.stories.tsx`, and the docs site `/components`.

## Components

| Component | Use it for | Key props |
|---|---|---|
| `Button` | Actions | `variant` primary·secondary·danger·success·inverse · `appearance` filled·border·ghost · `size` · `prefixIcon` `suffixIcon` `loading` `asChild` |
| `IconButton` | Compact well-known actions (close, edit, more) | same as Button + `icon`, required `aria-label`; defaults secondary + ghost |
| `Input` | Single-line text field | `label` `helperText` `error` `optional` `prefix` `suffix` · `size` small·medium·large · `appearance` border·ghost |
| `Select` + `SelectItem` | Pick one value in a form | same field props as Input; `value`/`onValueChange` |
| `Checkbox` | On/off option, multi-select, row selection | `checked` (true·false·"indeterminate") `label` `description` · `size` small·large |
| `Switch` | Setting that applies immediately | `label` `description` `labelPosition` · `size` small·large |
| `Alert` | In-page message about nearby content | `status` error·warning·success·info · `title` `description` `actionLabel` `dismissible` |
| `Toast` via `ToastProvider` + `useToast().show()` | Short confirmation after an action | `status` neutral·info·positive·error · `emphasis` high·low · `title` `actionLabel` |
| `Badge` | Status of an item (Active, Pending, Failed) | `status` negative·notice·positive·info·neutral · `emphasis` low·high · `size` |
| `Tag` | Category / metadata label (not status) | `color` (13 categories) · `emphasis` filled·border · `size` · `rounded` |
| `Card` + `CardHeader/Title/Description/Content/Footer` | Group content and its actions | `container` (false = no box, for grey backgrounds) |
| `Tabs` + `TabsList/Trigger/Content` | Switch sections on one page | `variant` regular·pill · `size` small·large · `fullWidth` |
| `Modal` + `ModalTrigger/Content/Header/Body/Footer/Close` | Focused task that blocks the page | `ModalContent size` small·medium·large · `ModalHeader title description` |
| `Tooltip` | Hint for icon buttons / truncated text | `content` `description` `variant` default·inverse `side` |
| `Table` + `TableHeader/Body/Row/Head/Cell` | Structured data | `Table size` · `TableRow selected` · `TableHead sort onSort numeric` · `TableCell numeric description` |
| `Typography` | Text in a Figma text style | `variant` e.g. title-small·subtitle-small·label-strong-small·body-medium·caption-medium · `tone` strong·base·subtle |

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
- **Radius:** `rounded-control-{sm|md|lg|xl|full}` (controls) · `rounded-container-{sm|md|lg|xl}` (cards, dialogs)
- **Type:** `type-title-{large|medium|small}` · `type-subtitle-{large|medium|small|xsmall}` · `type-label-{…}` ·
  `type-label-strong-{…}` · `type-body-{large|medium|small}` · `type-body-strong-{…}` · `type-caption-{…}` ·
  `type-number-{…}` (prefer the `Typography` component)
- **Shadows:** `shadow-default` (cards) · `shadow-elevation-{low|medium|high}` (floating) · `shadow-focus-base` (focus ring)
- **Heights:** `h-forms-{xsmall|small|medium|large}` = 24/32/40/48 (match controls)

Full list: the `/tokens` page or `src/tokens/generated.ts`.

## Composing screens

- **Page shell:** `<main className="min-h-screen bg-static-fill-background">` with content in
  `mx-auto max-w-5xl px-gap-12 py-gap-16`; page title `Typography variant="title-small"`; description
  `body-large` + `tone="subtle"`; space sections with `gap-gap-14`.
- **Forms:** a `Card` (or `container={false}` on a white page) with fields stacked `grid gap-gap-11`; actions in
  `CardFooter` (secondary-border Cancel, then Primary). Two-column fields: `grid gap-gap-11 sm:grid-cols-2`.
- **Settings:** sections as Cards with a `CardHeader` title/description; rows `flex items-start justify-between
  gap-gap-9` with a `Switch` or control on the right; separate rows with `border-b border-static-stroke-base`.
- **Lists / data:** toolbar row (`Input` with search prefix + filter/primary Buttons, `gap-gap-5`) above a `Table`
  in a Card; statuses as `Badge`; row actions as `IconButton` + `Tooltip`; numbers `numeric`.
- **Dashboards:** responsive grid `grid gap-gap-12 sm:grid-cols-2 lg:grid-cols-4` of Cards; key number
  `Typography variant="title-small"`, label `caption-medium tone="subtle"`.
- **Empty / loading / error states:** always design them — empty: short sentence + one Primary action;
  error: `Alert status="error"` with a retry; loading: `Button loading` or skeleton blocks in `bg-static-fill-alpha-subtle`.

## Workflows

- **Prototype a screen:** `/prototype "<screen>"` (`.claude/skills/prototype`) → `src/app/prototypes/<slug>/page.tsx`.
- **New client / rebrand:** `/new-client <name>` (`.claude/skills/new-client`).
- **Change a component:** keep the Figma property names, update its story and `docs/figma-descriptions/*.md`
  if behaviour changes, and run the checks above.

Project context: `docs/PLAN.md` (roadmap) and `docs/HANDOFF.md` (current state).
