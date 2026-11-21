# Studio Kit: the full plan

> The single reference for where this project is going, what has been done, what was found,
> and exactly how to continue. Read this before starting a session.
> Branch: `claude/relaxed-pascal-s33fzv` · Repo: `omostical/studio-kit`

---

## 1. The vision

A **reusable, agent-ready design-system template** you can take to any client or new team:

1. **Foundation:** tokens (primitives → semantics) plus components, in Figma and in code, kept in sync.
2. **Re-brandable:** a new client = a new *brand file* (colours, type, radius). Everything else is reused.
3. **Agentic:** AI agents can read the system (tokens, components, rules) and build correct UI with it.
4. **Design playground:** designers prompt for screens and flows, get a live prototype built from the
   real components, and share a link.

---

## 2. What top teams do (research and references)

| Who / what | What they do | Why it matters here |
|---|---|---|
| **Notion**, prototype playground | Designers prototype in a shared, file-based Claude Code repo; shared styles, colours, type and icons keep every prototype on-brand | The playground model we're building toward ([write-up](https://www.chatprd.ai/how-i-ai/how-notion-designs-with-ai-brian-lovins-prototype-playground-and-claude-code-workflows)) |
| **Coinbase**, CDS Playground | Pushes designers to design in code instead of pixels; wired to internal agent skills and product templates | Agents start with context ([blog](https://www.coinbase.com/blog/how-coinbase-design-systems-are-powering-the-ai-prototyping-era)) |
| **v0 Design Systems** | Imports your repo or Figma file, builds a starter app, reuses it for every chat | The "design system → instant prototype" loop ([docs](https://v0.app/docs/design-systems)) |
| **Supernova / Bolt** | AI prototyping with a team's own components | Same direction ([Supernova](https://www.supernova.io/blog/january-2026-product-updates)) |
| **Agent-ready system** | Four readable layers: tokens, components, rules (AGENTS.md / skills), a way in (MCP) | The structure we're adopting ([guide](https://www.headway.io/blog/design-systems-for-ai-agents)) |
| **Storybook 10.3** | Component manifest plus an MCP server for agents (React, in preview) | How agents will learn our components ([manifests](https://storybook.js.org/docs/ai/manifests), [MCP](https://storybook.js.org/docs/ai/mcp/overview)) |
| **W3C design tokens 2025.10** | First stable token format; themes via the "resolver" | The format our tokens file will use ([announcement](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)) |
| **Style Dictionary v5** | Builds CSS / TS / Tailwind from W3C-format tokens | The token build tool ([zeroheight](https://help.zeroheight.com/hc/en-us/articles/48049028236187)) |
| **Polaris / Primer / Atlassian** | One folder per component; code names 1:1 with Figma; lint rules ban raw colours; intent kept separate from emphasis | The rules behind Phase 0 and the Wideset choice |
| **Radix Colors / Apple** | Separately tuned light and dark palettes | Why Wideset's two primitive palettes matter |
| **Material / Apple HIG** | "Lighter = higher" elevation in dark mode | Why surface tokens are split by elevation |

---

## 3. Target architecture

```
client brief / logo / Figma ──▶  brand primitives  (palette, fonts, radius)
                                       │  token build (Style Dictionary v5 or Terrazzo, W3C 2025.10)
                                       ▼
                     semantic + component tokens  (shared, never edited per client)
                                       ▼
            generated: tokens.css (light/dark) · Tailwind theme · tokens.ts · Figma variables
                                       ▼
        components (Radix + cva, semantic tokens only; lint:tokens forbids raw values)
                                       ▼
   Storybook + manifest/MCP  ·  AGENTS.md + skills  ·  Figma Code Connect
                                       ▼
   /prototypes/<name>: designer prompts for a screen → preview URL to share
```

**Figma ↔ code bridges:** (1) variables → tokens file, (2) components → code via Code Connect,
(3) code prototypes → back to Figma for review.

---

## 4. Foundation decision: Wideset Core 1.0 + StudioKIT brand

### Audit findings

**StudioKIT_v1** (yours, `yEvYgthP0qWo5EV4QUjZ8Z`)
- ~18 component sets: Button, Icon Button, Alert, Checkbox, Text Input, Toggle, Tag, Menu, Radio,
  Counter, Divider, Breadcrumbs, Status Dot, Table (+ cell), Avatar, Tabs (underline ×2, squared),
  Toast, Tooltip.
- **Strength:** five components (Button, Icon Button, Alert, Checkbox, Text Input) have excellent
  descriptions: when to use, when not to, properties, accessibility contract. That's ideal agent context.
- **Issues:** duplicate "underline tabs" set; typos (`Statu dot`, `border/teritary`, `Radio `);
  mixed casing; `danger` (fills) vs `error` (text/border); stray variables (`Black #070010`,
  `colors/slate/slate-500`); lg Danger/Success/Ghost buttons are 44px vs 48px; md Icon Button is 36×40;
  13 of 18 components have no description.
- Variables have drifted from code: Figma uses `surface-primary/secondary/tertiary`, code used the v2
  names `canvas/raised/overlay/muted`. Figma has `bg/fill/*-subtle` and `bg/feedback/*-subtle`.
  The code's `tokens.json` is a stale March export.

**Wideset Core 1.0** (purchased; copy `4Rian5XWvky57QI46fqqRd`)
- ~45 component pages, including the hard ones: date pickers, calendar, multi-select, combo box,
  table and spreadsheet, file upload and dropzone, modal, sidebar, nav bar, pagination, accordion,
  slider, segmented control, progress stepper and tracker, notifications, side panel, tile.
  Also: Screens, Grab & Go templates, Illustrations, Remix icons, flags, payment logos, guidelines,
  accessibility, elevation and grid pages.
- **Fully variable-bound** (verified on Button): colour, height (`Components/Forms/*`),
  radius (`Corner Radius/Control/*`), gaps (`Gap/*`), type (text styles built from variables),
  focus rings (effect styles).
- **Collections:** WDS Primitives (611, mode "Values") · WDS Color Tokens (268, Light/Dark) ·
  WDS Measurements (82, Desktop/Mobile) · WDS Typography (51, Desktop/Mobile).
- **Colour token families:** Static (non-interactive) · Dynamic (interactive, with states) · Semantic ·
  Non-semantic. Separate Light and Dark primitive palettes.
- **Brand wiring:** `Dynamic/Fill/Primary/Default` → Light `Brand/600`, Dark `Brand/500`;
  `.../Hover` → Light `Brand/800`, Dark `Brand/600`.
- **Button model:** Variant (Primary/Secondary/Danger/Success/Inverse) × Style (Filled/Border/Ghost) ×
  Size × State = 300 variants. Plus Icon, Split and Link Button.
- **Issues:** docs live on the canvas, not in descriptions (agents read descriptions);
  `Xsmall` vs `XSmall`; a variable named `--dynamic-background-danger-default: var(--colors-red-600, #da252d);`;
  `Mutli Select`.

### Decision
**Wideset is the foundation** (coverage plus re-skinnable architecture). **StudioKIT supplies:**
brand primitives (blue ramp), typeface (Geist / Geist Mono), radius feel, the description format,
and redesigns of 3–4 signature components (Button, Input, Card).

**StudioKIT brand values**
- Blue ramp: 100 `#EEF1FB` · 200 `#D3DAFA` · 300 `#ABBAF4` · 400 `#7E97EC` · 500 `#5B79E3` ·
  **600 `#4763CF`** · 700 `#3750AD` · 800 `#293D87` · 900 `#1C2B61` · 1000 `#101A3D`
- Fonts: Geist, Geist Mono
- Radius scale: 2 · 4 · 6 · 8 · 10 · 12 · 16 · full (Button xs 6 · sm/md 8 · lg 12)

---

## 5. Phases

### ✅ Phase 0: code cleanup (done, committed)
- One folder per component (`src/components/<Name>/{Name.tsx, Name.stories.tsx, index.ts}`).
- A single Button: the Figma-matched one (variants primary/secondary/danger/success/ghost; sizes xs–lg;
  `prefixIcon`/`suffixIcon`).
- Removed the Storybook starter examples and the onboarding addon; docs-site chrome moved to `src/site`.
- Removed the legacy aliases; Tailwind class names mirror token names (`*-pressed`, `*-error`, `text-on-color`).
- Badge, Card, Typography, Switch, Select and Input now use semantic tokens (they had Tailwind
  indigo/amber/rose and `bg-white`, which broke dark mode). Select placeholder fixed; Switch hook-order bug fixed.
- Guardrail: `npm run lint:tokens` (`scripts/check-tokens.mjs`).
- ⚠️ Renamed `--bg-fill-danger-subtle` → `--bg-fill-error-subtle`. Figma uses `danger` for fills;
  revisit once the danger-vs-error decision is made.

### ✅ Step 1: rebrand Wideset → "StudioKIT 2.0" in Figma (done 2026-11-20, Desktop mode only)
Brand ramp, Geist fonts, Button radius (XSmall 6 · Small/Medium 8 · Large 12) and the renames are applied.
The **Mobile** mode keeps Wideset's fonts and `Control/xl` = 10: the team is on Figma **Starter**, which only
lets the API edit the first mode of a collection. Details and what's unverified: [HANDOFF.md](./HANDOFF.md).

> ⚠️ **Before Phase 1:** the Starter mode limit also blocks edits to the Dark mode of WDS Color Tokens.
> Move StudioKIT 2.0 to a Professional team (or upgrade) before work that edits modes.

### ▶ Next: compare against StudioKIT_v1
Put a few rebranded components (Button first) next to StudioKIT_v1 and list what still feels like
Wideset. That list feeds open decision 5 (signature components) and Phase 2.

### Phase 1: one-way token pipeline (Figma → code)
1. Export the Studio Kit 2.0 variables as W3C-format JSON into `tokens/` (Figma Console MCP, the
   variables REST API on Enterprise, or an export plugin).
2. Token build (Style Dictionary v5 or Terrazzo) → `tokens.css` (light/dark), Tailwind `@theme`, `tokens.ts`.
3. Generated files are never hand-edited; CI fails if they drift.
4. Rename code tokens to Wideset's names (`Static/…`, `Dynamic/Fill/Primary/Hover` → CSS variables).
- **Done when:** changing one Figma variable and re-exporting updates the site and Storybook.

### Phase 2: components on Wideset's API
- Migrate the 11 code components to Wideset's model (Variant × Style × Size × State).
  Mapping: Button/IconButton → Button/Icon Button · Alert → Inline/System Alert · Badge → Status Badge ·
  Card → Cards/Tile · Checkbox, Switch, Select → same · Input → Text Input + Form Field ·
  Tag → Tags/Chip · Typography → text styles.
- Then build: Modal, Tabs, Tooltip, Toast, Table, each with a description in the StudioKIT format.
- **Done when:** every code component maps 1:1 to a Figma component, with matching prop names.

### Phase 3: agent-ready
- `AGENTS.md`/`CLAUDE.md` with the rules (tokens only, one folder per component, how to compose screens).
- Turn on the Storybook manifest and MCP; add JSDoc to component props.
- Skills: `/new-client <name>` and `/prototype "<screen>"`.
- Figma: move the canvas docs into component descriptions (agents read those).
- **Done when:** an agent builds a correct screen without being told which files to read.

### Phase 4: design playground
- `src/app/prototypes/<name>/` routes with page templates (dashboard, settings, auth, list/detail),
  using Wideset's Screens and Grab & Go pages as references.
- A preview deploy (e.g. Vercel) per prototype, so every prototype gets a shareable link.
- **Done when:** a designer goes from prompt to shareable link in minutes.

### Phase 5: Figma ↔ code loop
- Code Connect for each component; two-way variable sync; push prototypes back to Figma for review.

### Phase 6: template it
- GitHub template or `create-studio-kit` CLI; a `brands/<client>.tokens.json` per client;
  brand switcher in the site and Storybook.

---

## 6. Runbook: Step 1, rebrand in Figma

**Before you start:** Figma desktop app, and a **duplicate** of Wideset renamed **Studio Kit 2.0**
(File → Duplicate). Never edit the purchased original.

### Route A: Figma Console MCP (Claude does it)
1. Already done: `scripts/setup-figma-console-mcp.sh` registered `figma-console` with Claude Code (✔ Connected).
2. In Figma: install the **Desktop Bridge** plugin ([README](https://github.com/southleft/figma-console-mcp))
   and run it in Studio Kit 2.0.
3. In the local Claude session:
   > Run the figma console check: the open file's name, its pages, and its variable collections with modes and counts. Don't change anything.

   Expected: WDS Primitives 611 · WDS Color Tokens 268 (Light/Dark) · WDS Measurements 82 (Desktop/Mobile) · WDS Typography 51 (Desktop/Mobile).
4. > Do the dry run of figma-plugins/studio-kit-rebrand and show me the report. Don't apply until I confirm.
5. Review the report → choose radius values (`CONFIG.radius` in `code.js`) → say **apply**.

### Route B: the plugin directly (no MCP)
Figma desktop → Plugins → Development → **Import plugin from manifest** →
`figma-plugins/studio-kit-rebrand/manifest.json` → **1. Dry run** → review the **🔁 Rebrand report** page →
**2. Apply changes**. Undo with Cmd+Z or version history.

### What the rebrand does
| Change | Detail |
|---|---|
| Brand ramp | `Colors/Light/Brand/*`, `Colors/Dark/Brand/*`: light steps 100–1000 get the exact StudioKIT hex; all other steps keep Wideset's OKLCH lightness and alpha, and take the StudioKIT hue and chroma |
| Typeface | Font-family variables → Geist / Geist Mono (text styles follow). Check weight 520 still looks right |
| Radius | Re-points `Corner Radius/*` tokens to `Radius/*` primitives listed in `CONFIG.radius` (keeps the alias; never writes raw numbers) |
| Bug fixes | Button `Size=Xsmall` → `XSmall` · CSS-named variable → `Dynamic/Fill/Danger/Default` · `Mutli Select` → `Multi Select` |

### After applying, check
Button page (all variants), Color Variables page, and a Screens page in **light and dark**.
Then publish Studio Kit 2.0 as a library.

---

## 7. Open decisions (yours)

1. **danger or error:** one word for the destructive/failure intent (Wideset: `Danger` variant; code: `error`).
2. **Container radius values** (cards, modals): currently sm 8 · md 12 · lg 16 · xl 20; the plan's scale
   stops at 16. Control radius is settled (matches the Button spec).
3. **Ghost card / Default badge** are invisible on the grey canvas (`surface-muted` = `canvas` = `#F3F3F3`).
4. **Dark `error-disabled`:** `#444444` (tokens.json) vs `#161A20` (CSS). Likely moot after Phase 1.
5. **Signature components** to redesign for your craft: Button, Input, Card, and maybe navigation?
6. **Licence:** confirm Wideset allows use across multiple clients and a derived library.

---

## 8. Reference IDs

| Thing | Value |
|---|---|
| StudioKIT_v1 file | `yEvYgthP0qWo5EV4QUjZ8Z` · Button set node `73:290` |
| Wideset Core copy | `4Rian5XWvky57QI46fqqRd` |
| Wideset Button set | `557:14433` · Icon Button `557:13737` · Split `4402:90631` · Link `557:15154` |
| Wideset pages | Color Variables `11020:32677` · Button `554:58` · Select `554:5581` |
| Wideset collections | Primitives `VariableCollectionId:153:308` · Color Tokens `VariableCollectionId:157:2009` |
| Library keys | StudioKIT `lk-2294cce4…` · Wideset `lk-7f87c859…` (full keys in the session history) |
| Figma limit | The Starter/View seat in "Studio TED 2" hit Figma's hosted MCP call limit → use Figma Console MCP locally |

---

## 9. Commands

```bash
npm run dev            # site → http://localhost:3000
npm run storybook      # Storybook → http://localhost:6006
npm run lint:tokens    # fail on hard-coded colours
npx tsc --noEmit       # type check
npx eslint src scripts # lint
npm run build          # production build
claude mcp list        # confirm figma-console is connected
```

## 10. All references

**How teams build design playgrounds**
- Notion, prototype playground with Claude Code: https://www.chatprd.ai/how-i-ai/how-notion-designs-with-ai-brian-lovins-prototype-playground-and-claude-code-workflows
- Coinbase, design systems in the AI prototyping era: https://www.coinbase.com/blog/how-coinbase-design-systems-are-powering-the-ai-prototyping-era
- Codrops, building digital products with design systems and agents (Nov 2026): https://tympanus.net/codrops/2026/11/01/design-systems-agents/
- Headway, making a design system agent-ready: https://www.headway.io/blog/design-systems-for-ai-agents
- Supernova, AI prototyping with code components (Jan 2026): https://www.supernova.io/blog/january-2026-product-updates

**AI-ready component docs**
- Storybook AI manifests: https://storybook.js.org/docs/ai/manifests
- Storybook MCP overview: https://storybook.js.org/docs/ai/mcp/overview
- Storybook 10.3 release: https://storybook.js.org/blog/storybook-10-3/
- Chromatic, hosted Storybook MCP: https://www.chromatic.com/docs/mcp

**Design tokens**
- W3C design tokens, stable 2025.10 announcement: https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/
- W3C design tokens format, 2025.10 final report: https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/
- zeroheight on Style Dictionary v5 and the 2025.10 format: https://help.zeroheight.com/hc/en-us/articles/48049028236187

**Prototyping tools that use your design system**
- v0 Design Systems: https://v0.app/docs/design-systems
- v0 legacy (shadcn registry) route: https://v0.app/docs/design-systems-legacy

**Figma tooling**
- Figma Console MCP (Desktop Bridge setup): https://github.com/southleft/figma-console-mcp
- Figma MCP rate limits and access: https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/

**Systems referenced as patterns (no single page)**
Shopify Polaris (lint rules against raw values, surface scale), GitHub Primer (component naming,
variant model), Atlassian (appearance + spacing props, elevation tokens), Radix Colors (separate
light/dark palettes), Material and Apple HIG (dark-mode elevation).

## 11. Key files

- `docs/PLAN.md`: this plan · `docs/HANDOFF.md`: short status
- `figma-plugins/studio-kit-rebrand/`: rebrand plugin (`code.js`, `manifest.json`, `README.md`)
- `scripts/setup-figma-console-mcp.sh`: registers Figma Console MCP
- `scripts/check-tokens.mjs`: token guardrail
- `src/components/`: the design system · `src/site/`: docs-site chrome
- `src/styles/tokens.{light,dark}.css`, `src/tokens/tokens.json`: current tokens (replaced in Phase 1)
