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

## In progress — Step 1: rebrand Wideset → "Studio Kit 2.0"

1. In Figma: **File → Duplicate** Wideset Core and rename the copy **Studio Kit 2.0**.
2. Apply `figma-plugins/studio-kit-rebrand/code.js`: dry run first, then apply after review.
   It does the brand ramp (OKLCH: keeps Wideset's lightness, takes StudioKIT hue/chroma; exact hex for
   light steps 100–1000), sets Geist fonts, sets the configurable radius, and fixes three bugs
   (`Size=Xsmall`→`XSmall`, the CSS-named danger variable → `Dynamic/Fill/Danger/Default`,
   `Mutli Select`→`Multi Select`).
   - Either via the Figma Console MCP (`scripts/setup-figma-console-mcp.sh` registers it) with the
     Desktop Bridge plugin running in the file,
   - or by importing the plugin in Figma desktop (Plugins → Development → Import plugin from manifest).

## Open decisions (owner: designer)

- `danger` or `error` as the single intent word (code currently uses `error`).
- Corner radius values (the dry-run report lists the current values).
- Ghost card / Default badge are invisible on canvas (`surface-muted` == `canvas` in light mode).
- Dark `error-disabled`: `#444444` (tokens.json) vs `#161A20` (CSS).
- Check the Wideset licence allows use across multiple clients and a derived library.

## Next

- **Phase 1:** export the Studio Kit 2.0 variables (W3C token format) → generate CSS and the Tailwind
  theme → migrate the 11 code components to Wideset's API (Variant × Style × Size × State).
- Then build Modal, Tabs, Tooltip, Toast and Table from Wideset, each with a description in the
  StudioKIT format.
