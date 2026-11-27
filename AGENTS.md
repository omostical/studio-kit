# Studio Kit — instructions for AI agents

Studio Kit is a design system: **Figma "StudioKIT 2.0" → design tokens → React components → prototypes.**
Build UI only from the components in `src/components` and the tokens in `src/styles/generated`. This file routes
you to everything else; you shouldn't have to read the component source to use them.

## Read before you start

| You are… | Read |
|---|---|
| Writing any UI code | `DESIGN.md` — every token with its light/dark value and when to use it |
| Building a screen in `src/app/prototypes/` | `.agents/rules/screens.md` — page shell, headings, modals, tables at 375px |
| Changing `src/components/` or `docs/figma-descriptions/` | `.agents/rules/components.md` — structure, Figma prop names, intent words, catalog status |

## Rules (must)

1. **Use the components.** Import from `@/components` (or `@/components/<Name>`). Don't hand-build a button,
   input, badge, tag, card, tabs, modal, tooltip, toast or table — the component already handles states, focus
   and accessibility.
2. **Use tokens for every visual value.** Colours, spacing, radius, type and shadows come from the token classes
   in `DESIGN.md`. No hex codes, no `rgb()`, no Tailwind palette classes (`bg-blue-500`, `text-gray-700`), no
   arbitrary values for things a token covers. `npm run lint:tokens` fails on raw colours, on token classes that
   don't exist, and (in `src/app/prototypes` and `src/components`) on arbitrary values — run it. A value with no
   token stays only with `token-lint-ignore: <why no token fits>` on its line or the line above.
3. **Never edit generated files**: `tokens/figma/*`, `src/styles/generated/*`, `src/tokens/generated.ts`,
   `DESIGN.md`, and the generated `docs/figma-descriptions/*.md` and `index.json`. Design changes happen in Figma,
   then `npm run tokens:build` (see `tokens/README.md`); usage text lives in `tokens/usage.json`, then
   `npm run design:build`; descriptions come from `docs/figma-descriptions/components.json`, then
   `npm run descriptions:build`. In Claude Code, `.claude/hooks/pre-tool-use.sh` refuses edits to these files.
4. **Props mirror Figma.** Figma "Variant" → `variant`, "Style" → `appearance`, "Size" → `size` with values
   `xsmall | small | medium | large`. Use those words when talking to designers.
5. **Accessibility is part of done:** every field has a `label`; icon-only buttons have `aria-label` (and usually
   a `Tooltip`); every error message names the action that fixes it ("Enter the 16-digit number on the front of
   the card."), never only "Invalid" or "Error"; one Primary button per section; status is never shown by colour
   alone; headings go h1 → h2 → h3 without skips.
6. **Before you finish:** `npm run tokens:check && npm run design:check && npm run descriptions:check &&
   npm run lint:tokens && npx eslint src --max-warnings=0 && npx tsc --noEmit && npm run build` (what CI runs; `main` only merges green
   pull requests), then look at the result in the browser in light **and** dark (`data-theme="dark"` on a parent)
   and at 375px wide.

## Where to look up a component

- **Catalog status:** `docs/figma-descriptions/index.json` lists every StudioKIT 2.0 component with its `status`:
  `stable` (in code, the default answer), `beta` (in code, API may still change: stick to the documented props),
  `planned` (Figma description only — **there is no code component**; don't import it, and don't build a lookalike
  of it unnoticed). Each `docs/figma-descriptions/<component>.md` starts with the same status line.
- **Storybook MCP** (best for props): the `storybook` MCP server (`.mcp.json`, `http://localhost:6006/mcp`) gives
  `docs-list` (all components), `docs-show` (props, types, defaults, JSDoc, examples) and `stories-preview`.
  Prefer it over reading source. It only answers while Storybook runs: if `node_modules` is missing run `npm ci`,
  then start `npm run storybook` in the background and wait for port 6006; the MCP reconnects on the next call.
  If it still won't connect, use the table below plus the JSDoc in `src/components/<Name>/<Name>.tsx`.
- **Usage guidance** (when to use what, a11y): `docs/figma-descriptions/<component>.md` — the same text designers
  see in Figma.
- **Live examples:** `src/components/<Name>/<Name>.stories.tsx`, and the docs site `/components`.

## Components

Status: `beta` = Avatar, DropdownMenu, Modal, Tooltip, Tabs, Toast, Table, SidePanel, Popup, StatusModal, SystemAlert, Notifications; every other component in this table is `stable`.

| Component | Use it for | Key props |
|---|---|---|
| `Button` | Actions | `variant` primary·secondary·danger·success·inverse · `appearance` filled·border·ghost · `size` · `prefixIcon` `suffixIcon` `loading` `asChild` |
| `IconButton` | Compact well-known actions (close, edit, more) | same as Button + `icon`, required `aria-label`; defaults secondary + ghost |
| `DropdownMenu` + `DropdownMenuTrigger/Content/Item/CheckboxItem/RadioGroup/RadioItem/Label/Separator/Sub*` | Several actions behind one button (row "More", user menu) | `DropdownMenuTrigger asChild` around an `IconButton`/`Button` · `DropdownMenuItem icon description shortcut variant` default·danger (danger last) · radio/checkbox items for options |
| `Input` | Single-line text field | `label` `helperText` `error` `optional` `prefix` `suffix` (icons or text) · `size` small·medium·large · `appearance` border·ghost · `wrapperClassName` (sizes the whole field; `className` styles the input) |
| `Select` + `SelectItem` | Pick one value in a form | same field props as Input; `value`/`onValueChange` |
| `Checkbox` | On/off option, multi-select, row selection | `checked` (true·false·"indeterminate") `label` `description` · `size` small·large |
| `Switch` | Setting that applies immediately | `label` `description` `labelPosition` · `size` small·large |
| `Alert` | In-page message about nearby content | `status` error·warning·success·info · `title` `description` `actionLabel` `onAction` `dismissible` · `position` horizontal·vertical (use vertical for page-wide alerts with an action, or the text squeezes at 375px) · `titleAs` (heading level, default h3) |
| `SystemAlert` | Full-width banner about the whole app or account (maintenance, billing, outage) | `status` danger·warning·success·info·neutral · `emphasis` high·low · `message` `actionLabel` `onAction` `dismissible` · `role="status"` by default, `"alert"` only if urgent |
| `Toast` via `ToastProvider` + `useToast().show()` | Short confirmation after an action | `status` neutral·info·positive·error · `emphasis` high·low · `title` `actionLabel` |
| `Avatar` | A person (rounded) or organisation (square) | `name` `src` `alt` (`""` next to a visible name) · `type` rounded·square · `size` xsmall…xxlarge · `status` `statusLabel` `selected`; leave `variant` unset (photo → initials → icon) |
| `Badge` | Status of an item (Active, Pending, Failed) | `status` negative·notice·positive·info·neutral · `emphasis` low·high · `size` |
| `Tag` | Category / metadata label (not status) | `color` (13 categories) · `emphasis` filled·border · `size` · `rounded` |
| `Card` + `CardHeader/Title/Description/Content/Footer` | Group content and its actions | `container` (false = no box, for grey backgrounds) · `CardTitle as` (h2 by default; h3 inside a titled section) |
| `Tabs` + `TabsList/Trigger/Content` | Switch sections on one page | `variant` regular·pill · `size` small·large · `fullWidth` |
| `Modal` + `ModalTrigger/Content/Header/Body/Footer/Close` | Focused task that blocks the page | `Modal open onOpenChange` · `ModalContent size` small·medium·large · `ModalHeader title description` · see `.agents/rules/screens.md` |
| `SidePanel` + `SidePanelTrigger/Content/Header/Body/Footer/Close` | Details, filters or secondary editing in a drawer on the right | `SidePanelContent size` small·medium·large · `SidePanelHeader title description avatar actions tabs` · `SidePanelBody type` details·form·task · same focus rules as Modal |
| `Popup` + `PopupTrigger/Content/Header/Body/Footer/Close` | Small non-modal panel anchored to a trigger: a quick form or extra details | `PopupContent type` action·information · `PopupHeader title closeButton` · `PopupFooter start` (Switch or link) + actions · Escape / click outside closes |
| `StatusModal` + `StatusModalTrigger/Content/Close` | One result or confirmation with a status icon (delete?, payment received) | `StatusModalContent type` danger·success·info·warning·neutral · `orientation` vertical·horizontal · `title description actions footerStart` · danger defaults to `role="alertdialog"` |
| `Notifications` + `NotificationsTrigger/Content/Header/Toolbar/Footer`, `NotificationList/Item/GroupLabel` | Activity panel opened from a bell button, read and unread | `NotificationItem avatar title time unread href content actions` · TabsList in `NotificationsToolbar` · bell `aria-label` includes the unread count |
| `Tooltip` | Hint for icon buttons / truncated text | `content` `description` `variant` default·inverse `side` |
| `Table` + `TableHeader/Body/Row/Head/Cell` | Structured data | `Table size` · `TableRow selected` · `TableHead sort onSort numeric` · `TableCell numeric description` |
| `Typography` | Text in a Figma text style | `variant` e.g. title-small·subtitle-small·label-strong-small·body-medium·caption-medium · `tone` strong·base·subtle · `as` — the tag follows the variant (title → h1/h2, subtitle → h3/h4, body → p, rest → span), so set `as="p"` when a title/subtitle style isn't a heading |

Choosing (nothing fits? see "When the answer doesn't exist" below): action → Button; three or more actions on one
row or object → DropdownMenu behind a "More" IconButton; navigation link → `Button asChild` around `next/link` with
`appearance="ghost"`, or a plain link; status → Badge; category → Tag; message in page → Alert; message about the whole app or account → SystemAlert; message after an
action → Toast; blocking task → Modal; single result or confirmation → StatusModal; item details or side editing → SidePanel; quick form or details anchored to a button → Popup; activity feed behind a bell → Notifications; settings toggle → Switch; form choice → Checkbox / Select.

**Intent words.** The team's canonical words are `danger` (failure, destructive) and `success`. Three components
still use older values until they are renamed in Figma: `Alert` `status="error"`, `Toast` `status="error"` /
`"positive"`, `Badge` `status="negative"` / `"positive"`. Use those values on those three components today; never
introduce `error`, `negative` or `positive` as a new prop value.

## When the answer doesn't exist

The kit doesn't cover everything. When you need a component, prop value or token it doesn't have, flag it:
never invent it, and never build a lookalike of a component that exists.

1. **Check it really is missing.** Search `docs/figma-descriptions/index.json` (a `planned` entry has no code) and
   `GAPS.md`, and the "Choosing" line above. If a `stable` or `beta` component does the job, use it.
2. **Log it.** Add one line to `GAPS.md`, under Components or Tokens:
   `- <Name>: <what it must do> — needed by <file>`. `<Name>` is the component's `name` in `index.json` when it is
   `planned` there (e.g. `Dropdown Menu`), otherwise a short noun. If the line exists, add your file to it.
3. **Then either leave it out, or build a minimal stand-in.** A stand-in is composed only of Studio Kit
   components and token classes, and sits right under a `// stand-in: <Name>` comment (`{/* stand-in: <Name> */}`
   in JSX) that names its `GAPS.md` line. `npm run lint:tokens` fails on a stand-in without that line.
   - A missing **token** has no stand-in: keep the literal with `token-lint-ignore: <why no token fits>` on its
     line or the line above (never the nearest token's value), and log the token in `GAPS.md`.
4. **Report it.** Your final message lists every gap you logged and every stand-in you built.


`DESIGN.md` is the reference: every colour, spacing, size, radius, shadow and type token, its value in Light and
Dark, and its usage. Token names are the Figma variable path in kebab case (`Dynamic/Fill/Primary/Default` →
`dynamic-fill-primary-default`), used with a class prefix (`bg-`, `text-`, `border-`, `p-`, `gap-`, `rounded-`,
`shadow-`, `h-`). Pick a token by its usage, never by the nearest value. Interactive browser view: the `/tokens`
page.

## Workflows

- **Prototype a screen:** `/prototype "<screen>"` → `src/app/prototypes/<slug>/page.tsx`.
- **New client / rebrand:** `/new-client <name>`.
- **Change a component:** `.agents/rules/components.md`.
- **Change token usage text:** edit `tokens/usage.json`, then `npm run design:build`.
- **Missing component or token:** a line in `GAPS.md` (see "When the answer doesn't exist").
- **Open a pull request:** `main` only takes pull requests with the `tokens` check green. Fill in the template's
  change type; component and token changes add a line to `CHANGELOG.md`.

## Agent files

One source for every tool. Real files live in `.agents/`; tool folders hold relative symlinks to them. Create new
rules and skills under `.agents/`, then link them.

| Tool | Reads | Checked |
|---|---|---|
| Claude Code | `CLAUDE.md` (imports this file), `.claude/rules/*.md` (`paths` frontmatter), `.claude/skills/*` | code.claude.com/docs, 2026-11-23 |
| Cursor | `AGENTS.md`, `.cursor/rules/*.mdc` (`globs` frontmatter) | cursor.com/docs/context/rules, 2026-11-23; symlinked rules not confirmed by the docs |
| Codex | `AGENTS.md`, skills in `.agents/skills/` | Codex AGENTS.md and skills docs, 2026-11-23; no path-scoped rules, so the table at the top of this file routes it |

Project context: `docs/PLAN.md` (roadmap) and `docs/HANDOFF.md` (current state).
