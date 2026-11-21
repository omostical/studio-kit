# Design tokens

Figma **StudioKIT 2.0** is the source of truth. Nothing in this folder or in `src/styles/generated/` is edited by hand.

```
Figma variables ──(1) export──▶ tokens/figma/*.tokens.json ──(2) npm run tokens:build──▶ src/styles/generated/tokens.css
  4 collections                  W3C DTCG, one file per                                  src/styles/generated/theme.css
  (Primitives, Color Tokens,     collection × mode                                        src/tokens/generated.ts
   Measurements, Typography)
```

## Sync after a Figma change

1. **Export.** In a Claude Code session with the Figma Console MCP connected to StudioKIT 2.0, ask:
   > Export the StudioKIT 2.0 variables with figma_export_tokens: format dtcg, dialect legacy, sizeUnit px,
   > splitByCollection and splitByMode, strategy replace, outputPath `<repo>/tokens/figma/`.

   (Use the absolute repo path: the MCP server's working directory is not the repo.)
2. **Build.** `npm run tokens:build`
3. **Check.** `npm run tokens:check && npm run lint:tokens && npm run build` (CI runs the same in `.github/workflows/tokens.yml`).
4. Commit `tokens/figma/` and the generated files together.

## Using tokens

| Figma variable | CSS custom property | Tailwind |
|---|---|---|
| `Dynamic/Fill/Primary/Default` | `var(--dynamic-fill-primary-default)` | `bg-dynamic-fill-primary-default` |
| `Static/Text/Subtle` | `var(--static-text-subtle)` | `text-static-text-subtle` |
| `Corner Radius/Control/lg` | `var(--corner-radius-control-lg)` | `rounded-control-lg` |
| `Gap/9` (16px) | `var(--gap-9)` | `p-gap-9`, `gap-gap-9` |
| `Components/Forms/Medium` (40px) | `var(--components-forms-medium)` | `h-forms-medium` |
| `Font/Size/350`, `Font/Lineheight/500` | `var(--font-size-350)` … | `text-350 leading-500` |
| `Font/Weight/Medium` (520) | `var(--font-weight-medium)` | `font-medium` |
| Text style `Label/Strong/Small` | — | `type-label-strong-small` |
| Effect style `Focus/Base`, `Shadow/default` | — | `shadow-focus-base`, `shadow-default` |

- **Light/Dark:** colour tokens switch under `[data-theme="dark"]`.
- **Desktop/Mobile:** measurement and type values switch at `max-width: 767px`.
- **TypeScript:** `import { color, measurements, typography, cssVar } from "@/tokens/generated"`.

## Known gaps (`tokens/build.config.json`)

- **Deleted variables:** five Dark-mode text tokens in Figma (`Dynamic/Text/Inverse/Default|Hover`,
  `Dynamic/Text/OnDanger/*`) point at variables that were deleted. `libraryFallbacks` maps them to
  `Neutral/1100` / `Neutral/1000` until the links are fixed in Figma. The Starter plan blocks editing Dark mode.
- **Ignored Mobile values:** Mobile font families and `Corner Radius/Control/xl` are still Wideset's (same
  plan limit), so `ignoreMobile` keeps the Desktop values.
- **Text and effect styles** aren't variables, so `figma_export_tokens` skips them. They live in
  `tokens/figma/styles.json`, which the build turns into `type-*` utilities (one per text style) and `shadow-*`
  utilities (one per effect style). Re-export by asking Claude to read the local text and effect styles of
  StudioKIT 2.0 (names plus bound variable paths) into that file, in the same format.
