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

**Button still to do:** copy StudioKIT's Button description (fix its "lg = 48px" claim); decide the
disabled style (tinted vs grey); Split Button gap was left as Wideset's. StudioKIT "Ghost" ≈ Wideset
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

## Next

- **Phase 1:** export the Studio Kit 2.0 variables (W3C token format) → generate CSS and the Tailwind
  theme → migrate the 11 code components to Wideset's API (Variant × Style × Size × State).
- Then build Modal, Tabs, Tooltip, Toast and Table from Wideset, each with a description in the
  StudioKIT format.
