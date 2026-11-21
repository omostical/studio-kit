# Studio Kit Rebrand (Figma plugin)

Turns a **duplicate** of Wideset Core 1.0 into **Studio Kit 2.0**:

1. **Brand ramp:** recolours `Colors/Light/Brand/*` and `Colors/Dark/Brand/*` to the StudioKIT blue.
   Light steps 100–1000 get the exact StudioKIT hex. Every other step keeps Wideset's
   lightness (its contrast tuning) and takes the StudioKIT hue and saturation.
2. **Typeface:** font-family variables become Geist / Geist Mono. Text styles follow.
3. **Radius:** re-points the `Corner Radius/*` tokens listed in `CONFIG.radius` to a `Radius/*`
   primitive (keeps the alias). Default: `Control/xl` → `Radius/300` (12), so Button Large = 12.

> **Figma Starter:** the plugin API can only edit the **first mode** of a collection (Desktop, not
> Mobile; Light, not Dark). Changes to other modes are logged as `✗ … not changed` and skipped.
4. **Bug fixes:** `Size=Xsmall` → `Size=XSmall` (Button), CSS-named danger variable →
   `Dynamic/Fill/Danger/Default`, `Mutli Select` → `Multi Select`.

## Run it (Figma desktop app)

1. In Figma, open Wideset Core 1.0 → **File → Duplicate**. Rename the copy **Studio Kit 2.0**.
   *Never run this on the original.* The plugin refuses to apply if the file is still named "Wideset Core…".
2. Open the copy. **Plugins → Development → Import plugin from manifest…** → pick
   `figma-plugins/studio-kit-rebrand/manifest.json` from this repo.
3. **Plugins → Development → Studio Kit Rebrand → 1. Dry run.** Nothing changes; a
   **🔁 Rebrand report** page lists every before → after value and the current radius values.
4. Optional: set radius values in `CONFIG.radius` in `code.js`, then dry-run again.
5. **Plugins → Development → Studio Kit Rebrand → 2. Apply changes.**
6. Check the result (Button page, Color Variables page, a "Screens" page in light and dark),
   then publish the copy as a library.

Undo: everything is reversible with **Cmd/Ctrl+Z** right after applying, and the version
history keeps the pre-apply state.

## Run with Figma Console MCP instead

On your own computer, with Figma desktop open:

1. `bash scripts/setup-figma-console-mcp.sh` registers the server with Claude Code (asks for your Figma token, hidden).
2. Install the Desktop Bridge plugin from the figma-console-mcp README and run it in **Studio Kit 2.0**.
3. Start `claude` in this repo and paste:

> Using figma-console MCP on the open file "Studio Kit 2.0": run the logic in
> `figma-plugins/studio-kit-rebrand/code.js` as a dry run first (figma.command = "dry-run")
> and show me the before → after report. Only apply after I confirm.
