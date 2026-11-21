# Studio Kit — handoff notes

> Full plan, research references and runbooks: see [PLAN.md](./PLAN.md).

Context for any session (human or Claude) picking up this project. Branch: `claude/relaxed-pascal-s33fzv`.

## Goal

Turn Studio Kit into a reusable, agent-ready design-system template: Figma as the source of truth →
tokens generated into code → components → a prototyping playground, re-brandable per client.

## Done so far

- **Phase 0 (code cleanup), committed**
  - One folder per component in `src/components/*`; a single Button, the Figma StudioKIT_v1 one.
  - Legacy token aliases removed; Tailwind class names match token names.
  - All components use semantic tokens only (this fixed dark mode). Guardrail: `npm run lint:tokens`.
  - Docs-site chrome moved to `src/site`.
- **Figma audit**
  - StudioKIT_v1 (`yEvYgthP0qWo5EV4QUjZ8Z`): ~18 components, 5 with excellent descriptions.
    Its variables have drifted from code (surface naming, danger vs error, `-subtle` fills exist in Figma
    but `tokens.json` is a stale March export).
  - Wideset Core 1.0 (purchased; working copy `4Rian5XWvky57QI46fqqRd`): ~45 components and fully
    variable-bound (colour, radius, height, gap, type, focus). Collections: WDS Primitives (611),
    WDS Color Tokens (268, Light/Dark), WDS Measurements (82, Desktop/Mobile), WDS Typography (51,
    Desktop/Mobile). Brand ramps: `Colors/Light/Brand/*`, `Colors/Dark/Brand/*`
    (`Dynamic/Fill/Primary/Default` → Light Brand/600, Dark Brand/500).
- **Decision:** Wideset Core is the foundation. StudioKIT contributes the brand values (blue ramp
  `#4763CF`, Geist / Geist Mono, radius feel) and the component-description style.

## Done (2026-11-20) — Step 1: rebrand Wideset → "StudioKIT 2.0"

The working copy `4Rian5XWvky57QI46fqqRd` is named **StudioKIT 2.0**. Applied via Figma Console MCP:

- **Brand ramp (48 values):** light 100–1000 exact StudioKIT hex (600 = `#4763CF`); light 1100, the
  dark ramp and the opacity tints keep Wideset's OKLCH lightness/alpha with the StudioKIT hue
  (dark 500, the dark primary fill, = `#465FB6`).
- **Fonts, Desktop mode:** Display + Body → Geist, Monospace → Geist Mono.
- **Radius, Desktop mode:** `Corner Radius/Control/xl` → alias `Radius/300` (12). Button sizes are now
  XSmall 6 (`Control/md`) · Small/Medium 8 (`Control/lg`) · Large 12 (`Control/xl`), matching the plan.
  `Control/xl` is also used by the large sizes of Icon/Split Button, Selects, Input, Search, Segmented Control.
- **Renames:** 75 Button variants `Size=Xsmall` → `XSmall`; `Mutli Select` → `Multi Select`.
  The CSS-named danger variable was already `Dynamic/Fill/Danger/Default`.

- **Button colour states, Light mode (2026-11-21, after comparing with StudioKIT_v1):**
  Danger Default/Hover/Pressed → Red 700/800/900 (was 600/700/800; white text 4.29 → 5.8:1),
  Success → Green 800/900/1000 (was 600/700/800; 2.6 → 5.4:1), Primary Hover/Pressed → Brand 700/800
  (was 800/900, StudioKIT's gentler step). These tokens are shared, so every component using them changed.
  Restore point: version "Before button colour states".

- **Button spacing (2026-11-21), Button set only, rebinding not token values:** icon–label gap
  XSmall/Small 2 → 4 (`Gap/3`), Medium 4 → 6 (`Gap/4`), Large stays 6; XSmall side padding 6 → 8 (`Gap/5`).
  Restore point: version "Before button spacing".

**Rule: StudioKIT_v1 values are checked against top systems (Radix, Primer, Material, Polaris…) before
adopting; non-standard ones are not copied.** Kept Wideset, on purpose: side padding 16/12/10/8 (scales
with size; StudioKIT's flat 12 doesn't), icons 20/20/16/16 (StudioKIT's 24px next to 14px text is
oversized), the focus ring (StudioKIT's 24% halo is too faint).

- **Button description (2026-11-21):** written to the Button set from
  [figma-descriptions/button.md](./figma-descriptions/button.md) — StudioKIT's format, rewritten for
  Wideset's API (Variant/Style/Size/State), corrected touch-target rule (WCAG 2.5.8 = 24×24), real known
  issues. Keep that file as the source; edit it and re-write to Figma.

- **Input (2026-11-21):** compared with StudioKIT_v1 Text Input — Wideset matches or beats it on every
  point (placeholder/helper contrast, 16px Large text, flat hover/focus, grey disabled), so no visual
  changes were copied. Fixed two rebrand leftovers: the `Forms/Active` focus-glow effect style (142 layers)
  was hard-coded Wideset purple `#4734F7` → now bound to `Colors/Light/Brand/Opacity/600-16%`; 8 Danger
  Input variants used a remote library variable (`Dynamic/Border/Danger/Elevated/*`) → now local
  `Dynamic/Stroke/Danger/Strong/*`. Description written from
  [figma-descriptions/input.md](./figma-descriptions/input.md). Restore point: "Before input fixes".
- **Library re-link (2026-11-21):** a scan of all component pages (65,339 layers) found ~4,800 bindings to
  variables from the original Wideset library (26 variables: `space/*`, `Radius/Control/100%`,
  `Button/XSmall`, `Interactive/…/OnPrimary`, `Static/Background/*`, Turquoise/Scarlet/Gold tags,
  Visualization blues, an unresolvable 0px Calendar spacing) plus 96 Avatar circles hard-coded in old purple
  `#4A3AE0`. All re-linked to local tokens with matching values (e.g. `space/4`→`Gap/9`,
  `Radius/Control/100%`→`Corner Radius/Control/full`, Turquoise→Teal, Scarlet→Red, Gold→Yellow); circles →
  `Non-Semantic/Fill/Brand/Strong`. Restore point: "Before library re-link".
  **Left on purpose:** 26 effect bindings on Dropdown Menu items (`Static/Background/Base` and
  `…/Inverse/Base` used as shadow/ring colours; mode behaviour unconfirmed). 8 mixed-colour Mention Text
  instances still *report* a remote node-level fill, but every character range is local (stale Figma record).

- **All-components pass (2026-11-21).** Restore points: "Before component pass", "Before contrast fixes".
  - **Card:** Default/Media/Chart boxed variants get `Shadow/default` (= StudioKIT's code card shadow)
    and 24px side/content padding (`Gap/12`). `Container=False` replaces the code Card's invisible
    "ghost" variant (resolves open decision 3 once the code follows in Phase 2).
  - **Sample text:** 267 layers on component + Screens/Grab & Go pages: "Wideset" → "Studio Kit",
    `*@wideset.co`/`wideset.co` → `example.com`. Doc pages (Getting Started, Guidelines…) left as
    attribution. Logo artwork that spells Wideset is vector, not text — not changed.
  - **Compared the other 13 StudioKIT_v1 components** (Icon Button, Alert, Checkbox, Toggle, Tag, Menu,
    Radio, Divider, Breadcrumbs, Table cell, Avatar, Tabs, Toast): Wideset matches or beats v1 on every
    point, so no visual changes copied. (v1 itself has stray purple `#5C37EB` on tabs/table text.)
  - **Info colour:** `Semantic/Text/Info` and `Semantic/Fill/Inverse/Info` were Indigo (clashing with the
    blue brand and with Inline Alert's blue info fill) → `Colors/Light/Blue/700` (white text 6.1:1).
  - **Contrast audit** (5,040 text layers, Light): fixed `Dynamic/Text/Success/*` → Green 800/900/1000,
    `Semantic/Fill/Inverse/Positive` → Green/800, `Semantic/Text/Notice` → Yellow/900, Notification
    timestamps' 75% layer opacity → 100%. **Left:** 85 exempt (63 out-of-month calendar days, 22
    decorative "/" separators) and 39 near-misses (3.9–4.45:1, `Static/Text/Subtle` `#6E6E6E` on
    hover/selected tints) — the neutral ramp has no step between `#6E6E6E` and `#3B3B3B`, so this needs a
    component-level decision (e.g. use `Static/Text/Base` on tinted rows).
  - **Naming:** `Progres Tracker` → `Progress Tracker`; Breadcrumbs `Level=4rd` → `4th`; Switch
    `Press/Focus` → `Pressed/Focused`; Radio `Enabled` → `Default`; Suffix text property and sample text
    `Sufix` → `Suffix`.
  - **Descriptions on every public component (74).** Source of truth: prose in
    `docs/figma-descriptions/components.json` + properties exported to `figma-properties.json`, built by
    `node scripts/build-descriptions.mjs` into one `.md` per component (Button/Input hand-written).
    Edit those, rebuild, then re-write to Figma.
  - **Known:** Split Button has Figma "existing errors" (conflicting variant names), so its description
    has no property list; worth fixing the variant names by hand. The Desktop Bridge drops on long
    font-loading loops over all pages — keep Figma edits to short batches.

**Button still to do:** decide the disabled style (tinted vs grey; recommend Wideset's grey); Split
Button gap was left as Wideset's. StudioKIT "Ghost" ≈ Wideset
Secondary/Filled.

**Left as Wideset (by choice, for now):** the **Mobile** mode of fonts (Inter Display / Inter /
IBM Plex Mono) and `Control/xl` (10). The file's team is on Figma **Starter**, which only allows editing
the **first mode** of a collection (`setValueForMode: cannot modify modes beyond limit of 1`). This also
blocks edits to the Dark mode of WDS Color Tokens. Upgrade/move to Professional before Phase 1 work that
touches modes, then re-run the Mobile values.

**Not yet verified:** the "Before Studio Kit rebrand" version-history restore point (the call that saved
it timed out); dark mode on canvas; Screens pages.

**Gotcha:** changing a font-family variable re-lays out every text layer — do one variable per call
or the Desktop Bridge times out.

## Open decisions (owner: designer)

- `danger` or `error` as the single intent word (code currently uses `error`).
- Container radius values (currently sm 8 · md 12 · lg 16 · xl 20; the plan's scale stops at 16).
- Whether dark Brand/500 (`#465FB6`) should be pinned closer to StudioKIT 500 (`#5B79E3`).
- Ghost card / Default badge are invisible on canvas (`surface-muted` == `canvas` in light mode).
- Dark `error-disabled`: `#444444` (tokens.json) vs `#161A20` (CSS).
- Check the Wideset licence allows use across multiple clients and a derived library.

## Done (2026-11-21) — Phase 1: token pipeline

- `tokens/figma/` holds the W3C DTCG export: 7 files, 1,012 tokens. `npm run tokens:build` generates
  `src/styles/generated/{tokens,theme}.css` and `src/tokens/generated.ts`. `npm run tokens:check` and
  `.github/workflows/tokens.yml` catch drift. How to sync: [tokens/README.md](../tokens/README.md).
- The site and Storybook now take every semantic colour from Figma, through `src/styles/legacy-aliases.css`
  (old v1 names → Figma tokens). Light and Dark were both checked in the browser. Changing brand 600 in the
  export and rebuilding turned the live Primary button that colour.
- Button and IconButton Danger/Success now use `text-on-error` / `text-on-success`. Wideset's dark fills
  for those are light, so white text was unreadable there.
- Known gaps: 5 Dark tokens point at deleted variables (mapped in `tokens/build.config.json`); effect styles
  and text styles aren't exported yet; the tokens page (`src/app/tokens`) still shows the old v1 values
  from `src/tokens/index.ts`.

## Done (2026-11-21) — Phase 2, part 1: components on the Figma API

Every component uses only Figma tokens. Each file's header comment links its Figma node and description.

| Code | Figma component | Figma property → prop |
|---|---|---|
| `Button` | Button | Variant → `variant` (primary·secondary·danger·success·inverse), Style → `appearance` (filled·border·ghost), Size → `size` (xsmall·small·medium·large), Prefix/Suffix → `prefixIcon`/`suffixIcon` |
| `IconButton` | Icon Button | same as Button, plus `icon`; `aria-label` required |
| `Input` | Input + Form Field | Size → `size` (small·medium·large), Variant → `variant` (primary·danger, or pass `error`), Style → `appearance` (border·ghost), Prefix/Suffix, `label`/`optional`/`helperText`/`error` |
| `Select` | Single Select + Dropdown Menu | same field props as Input |
| `Checkbox` | Checkbox | Type → `checked` (false·true·"indeterminate"), Variant → `variant`, Size → `size` (small·large), `label`/`description` |
| `Switch` | Switch | Size → `size` (small·large), Label → `labelPosition`, `label`/`description` |
| `Alert` | Inline Alert | Status → `status` (error·warning·success·info), Position → `position`, Actions → `action`/`actionLabel`, Dismiss → `dismissible` |
| `Badge` | Status Badge | Status → `status` (negative·notice·positive·info·neutral), Emphasis → `emphasis` (low·high), Shape → `shape`, Size → `size` |
| `Tag` | Tag | Color → `color` (13 categories), Emphasis → `emphasis` (filled·border), Size → `size`, Rounded → `rounded` |
| `Card` | Default Card | Container → `container`; Header/Footer/Description → `CardHeader`/`CardFooter`/`CardDescription` |
| `Typography` | text styles | `variant` = text style in kebab case (`label-strong-small`), `tone` = Static/Text (strong·base·subtle) |

- **Shared code:** `src/components/_shared/controlColors.ts` (Button/IconButton colour table) and
  `src/components/Tag/tagColors.ts` are literal class tables, written once by a script that checked every
  token exists. `src/components/_shared/field.tsx` holds the shared Form Field label/helper/box.
- **Removed:** the v1 token layer (`legacy-aliases.css`, `tokens.light.css`, `tokens.dark.css`,
  `src/tokens/index.ts`, `tokens.json`, `Tag.css`). `globals.css` now only imports the generated files, plus a
  small docs-site text scale.
- **Rebuilt:** the playground, the components docs page (adds Icon Button, Checkbox and Alert sections) and
  the tokens page (now reads `src/tokens/generated.ts`).
- **Fixed in Figma:** the `Forms/Active` focus glow lost its 2px spread when its colour was linked to a
  variable (Figma resets spread on bind). The spread is restored.
- **Verified in the browser:** sizes, padding, radius, type, colours, the focus ring and dark mode against the
  Figma spec.

## Done (2026-11-21) — Phase 2, part 2: five new components

| Code | Figma | API |
|---|---|---|
| `Modal` (+ `ModalTrigger/Content/Header/Body/Footer/Close`) | Modal, Header, Footer | Radix Dialog; `ModalContent size` (small 400 · medium 600 · large 800); `ModalHeader title/description/closeButton` |
| `Tooltip` | Tooltip | Radix Tooltip; `content`, `description`, Variant → `variant` (default·inverse), Size → `size`, Alignment → `side`, `arrow` |
| `Tabs` (+ `TabsList/Trigger/Content`) | Tabs + Tab Items | Radix Tabs; Variant → `variant` (regular·pill) + `fullWidth`, Size → `size` (small·large), Show Divider → `TabsList divider` |
| `Toast` + `ToastProvider` / `useToast()` | Toast | Status → `status` (neutral·info·positive·error), Emphasis → `emphasis` (high·low), `title/description/actionLabel/dismissible`; polite live region, ≥ 5 s, pauses on hover/focus |
| `Table` (+ `TableHeader/Body/Row/Head/Cell`) | Column + Table Cell | real `<table>`; Size → `size` (40·48·64 rows), `TableRow selected`, `TableHead sort/onSort` (aria-sort), `TableCell numeric/description` |

- **Checked in the browser:** sizes, colours and type against Figma. Also the Modal focus trap, Escape and
  return of focus; the Tooltip on keyboard focus (`aria-describedby`); Tabs arrow keys; Toast announced and
  auto-dismissed.
- **Followed Figma:** Wideset's selected tab underline is neutral (`Dynamic/Stroke/Secondary/Strong`), not
  brand, and the code matches. Wideset's green Toast binds its text to `OnInverse/Negative` by mistake; code
  uses `OnInverse/Positive`, which is also white.
- **New guardrail:** `npm run lint:tokens` now fails on token classes that don't exist (Tailwind drops them
  silently), across `src/components`, `src/app` and `src/site`.
- **Client components:** Table and Checkbox are now marked `"use client"`. Table crashed the server-rendered
  home page without it; the browser check caught that.

## Done (2026-11-21) — Phase 3: agent-ready

- **`AGENTS.md`** (imported by `CLAUDE.md`): rules (components only, tokens only, never edit generated files,
  Figma prop names, accessibility, the checks to run), a component catalog with when-to-use, a token
  cheat-sheet, screen-composition recipes and the workflows.
- **Storybook 10.6.8** (all `@storybook/*` packages):
  - `features.componentsManifest` and `react-docgen-typescript` →
    `/manifests/components.json`, also in the static build;
  - `@storybook/addon-mcp` → `http://localhost:6006/mcp` (8 tools: `docs-list`, `docs-show`,
    `stories-preview`, `test-run` …), registered for Claude Code in `.mcp.json`. It only works while
    `npm run storybook` runs. Both features are "preview" in Storybook.
- **JSDoc:** all 16 components have a summary and every own prop has a description (checked in the manifest).
- **Skills:** `.claude/skills/prototype` (`/prototype "<screen>"` → `src/app/prototypes/<slug>`) and
  `.claude/skills/new-client` (`/new-client <name> <hex>` → Figma rebrand, export, build, contrast check).
- **npm cache:** installs failed with `EACCES` in `~/.npm/_cacache` (a root-owned file). The upgrade used a
  temporary cache (`npm install --cache <dir>`); fixing it for good needs
  `sudo chown -R $(whoami) ~/.npm`.

## Done (2026-11-21) — Phase 3 acceptance test, first run, and fixes

`/prototype "billing settings …"` built `src/app/prototypes/billing-settings` correctly (all checks, light/dark,
375px, keyboard), but only partly unaided, so the test is **not passed yet**. What it found and what changed:
- **Phase 3 wasn't on `main`**, so worktrees cut from `main` had no AGENTS.md or skills. Still to do: merge.
- `.claude/launch.json` (the skill's `site` preview) was never committed — now it is.
- `lint:tokens` now also scans `src/app/prototypes` for raw colours and rejects arbitrary values there.
- `CardTitle` takes `as` and defaults to `h2` (was a fixed `h3`, which made pages skip h2).
- AGENTS.md: how to start Storybook for the MCP, the Size scale in px, the props agents needed but couldn't find
  (`Alert position`/`titleAs`, `wrapperClassName`, `CardTitle as`, `Typography as`), and recipes for headings,
  modals (focus return) and tables at 375px. The page-shell recipe now sets `as="h1"`.
- `/prototype` skill: sets up `npm ci` + Storybook, adds `npm run build`, and checks modals, form errors and heading
  order in the browser.

## Next

- **Merge Phase 3 to `main`**, then re-run the fresh-agent test from a new worktree with a different screen
  (Phase 3 done-when): a new session with only `/prototype <screen>` builds it correctly.
- **Phase 4:** prototype index page, page templates (dashboard, settings, auth, list/detail), preview deploys.
