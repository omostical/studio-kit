---
name: new-client
description: Re-brand Studio Kit for a new client — Figma copy, brand colour ramp, fonts and radius, token export and build, contrast and visual checks. Use when someone asks to set up the kit for a new client, brand or product.
argument-hint: "<client name> [brand hex] [font] [radius feel]"
---

# /new-client — re-brand Studio Kit for a client

Input: $ARGUMENTS — client name, and if known: primary brand colour (hex), typeface(s), corner-radius feel
(sharp / default / round), logo. Ask for anything missing that you can't sensibly default (the brand colour
at least). Everything else is shared: components, semantic tokens, docs.

## 1. Figma (needs the Figma Console MCP and the Desktop Bridge plugin; see docs/PLAN.md §6)
1. Ask the user to duplicate **StudioKIT 2.0** in Figma and rename it **<Client> Kit**, then run the Desktop
   Bridge plugin in it. Confirm the open file's name before changing anything — never edit StudioKIT 2.0 or the
   purchased Wideset original.
2. Save a version-history restore point ("Before <client> rebrand").
3. Rebrand with the logic in `figma-plugins/studio-kit-rebrand/code.js`:
   - `brandRamp`: put the client colour at step `600` (the primary fill). With only 600 given, every other
     step keeps Wideset's lightness and takes the client hue/chroma (OKLCH) — this keeps the contrast tuning.
     If the client has a full ramp, give all steps.
   - `fonts`: body and mono families (they must be installed in Figma; check first).
   - `radius`: re-point `Corner Radius/*` to `Radius/*` primitives (never write raw numbers).
   - Dry run first, show the report, then apply. Keep each Figma call short — long loops drop the bridge.
4. **Contrast check** (must pass before going on): white text on `Dynamic/Fill/Primary/Default` ≥ 4.5:1,
   `Dynamic/Text/Primary/Default` on white ≥ 4.5:1, focus ring visible. If the brand colour is too light, move
   the primary tokens one ramp step darker (as was done for Success/Danger) and tell the user.
5. Note plan limits: on Figma Starter only the first mode (Light, Desktop) is editable.

## 2. Code (on a new branch `client/<slug>`)
1. Export the variables: `figma_export_tokens` → `tokens/figma/` (settings in `tokens/README.md`), and the text /
   effect styles → `tokens/figma/styles.json` if fonts or effects changed.
2. `npm run tokens:build`, then `npx tsc --noEmit && npx eslint src && npm run lint:tokens && npm run build`.
3. Look at `/components`, `/tokens` and a prototype in light and dark; screenshot Button, Input, Alert, Tabs.
4. Update `docs/figma-descriptions/*.md` only if behaviour changed (usually it doesn't).

## 3. Report
Figma file name, brand values applied, contrast results, what was adjusted and why, branch name, and anything
the client still needs to decide (logo usage, dark-mode brand shade, Mobile values on Starter).
