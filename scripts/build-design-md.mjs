#!/usr/bin/env node
/**
 * DESIGN.md generator — `npm run design:build` writes DESIGN.md, `npm run design:check` fails when it is stale.
 *
 * Values come from the generated token CSS (src/styles/generated/tokens.css + theme.css, built from Figma), resolved
 * through every var() to a final value per theme. Usage text comes from tokens/usage.json (hand-written; the
 * only place to edit it). Every token must have a usage: a token without one fails --check.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const CHECK = process.argv.includes("--check");

// ─── Parse the CSS into variable maps ────────────────────────────────────────
const tokensCss = read("src/styles/generated/tokens.css").replace(/@media[^{]*\{(?:[^{}]*\{[^}]*\})*[^}]*\}/g, "");
const themeCss = read("src/styles/generated/theme.css");

function blocks(css) {
  const out = [];
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const vars = {};
    for (const d of m[2].matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/g)) vars[d[1]] = d[2].trim();
    out.push({ selector: m[1].replace(/\/\*[\s\S]*?\*\//g, "").trim(), vars });
  }
  return out;
}
const tokenBlocks = blocks(tokensCss);
const themeBlock = blocks(themeCss.match(/@theme[^{]*\{[\s\S]*?\n\}/)?.[0].replace(/^@theme[^{]*/, "x") ?? "")[0]?.vars ?? {};

const base = Object.assign({}, ...tokenBlocks.filter((b) => b.selector === ":root").map((b) => b.vars), themeBlock);
const theme = (sel) => ({ ...base, ...(tokenBlocks.find((b) => b.selector === sel)?.vars ?? {}) });
const THEMES = { Light: theme(':root, [data-theme="light"]'), Dark: theme('[data-theme="dark"]') };

function resolve(value, map, depth = 0) {
  if (depth > 20) return value;
  return value.replace(/var\(--([a-z0-9-]+)(?:,\s*([^)]+))?\)/g, (_, name, fallback) =>
    name in map ? resolve(map[name], map, depth + 1) : fallback ?? `var(--${name})`
  );
}
const valueOf = (name, map = THEMES.Light) => resolve(`var(--${name})`, map);

// ─── Usage rules ─────────────────────────────────────────────────────────────
const usageFile = JSON.parse(read("tokens/usage.json"));
const missing = [];
const ruleHits = new Map();
function usageFor(section, name) {
  for (const [i, rule] of (usageFile[section] ?? []).entries()) {
    const m = new RegExp(rule.match).exec(name);
    if (!m) continue;
    ruleHits.set(`${section}#${i}`, true);
    const text = rule.usage
      .replace(/\{(\w+):(\d)\}/g, (_, map, g) => usageFile.labels?.[map]?.[m[Number(g)]] ?? m[Number(g)])
      .replace(/\$(\d)/g, (_, g) => m[Number(g)] ?? "");
    return rule.source === "name" ? `${text} _(draft from the name — not yet used in code; team to confirm)_` : text;
  }
  missing.push(`${section}: ${name}`);
  return "**MISSING — add a rule to tokens/usage.json**";
}

const esc = (s) => s.replace(/\|/g, "\\|");
const table = (head, rows) =>
  [`| ${head.join(" | ")} |`, `| ${head.map(() => "---").join(" | ")} |`, ...rows.map((r) => `| ${r.map(esc).join(" | ")} |`)].join("\n");
const byNumber = (a, b) => Number(a.match(/\d+$/)?.[0] ?? 0) - Number(b.match(/\d+$/)?.[0] ?? 0);
const themeNames = (prefix) => Object.keys(themeBlock).filter((k) => k.startsWith(prefix)).map((k) => k.slice(prefix.length));

// ─── Colour ──────────────────────────────────────────────────────────────────
const colourNames = themeNames("color-").filter((n) => /^(static|dynamic|semantic|non-semantic)-/.test(n)).sort();
const FAMILY_TITLES = {
  "static-fill": "Static fills — surfaces", "static-text": "Static text", "static-stroke": "Static strokes — borders and dividers",
  "static-scrim": "Static scrim", "static-shadow": "Static shadow colours",
  "dynamic-fill": "Dynamic fills — interactive controls", "dynamic-stroke": "Dynamic strokes — control borders", "dynamic-text": "Dynamic text — control labels",
  "semantic-fill": "Semantic fills — status", "semantic-stroke": "Semantic strokes — status", "semantic-text": "Semantic text — status",
  "non-semantic-fill": "Category fills — Tag colours", "non-semantic-stroke": "Category strokes", "non-semantic-text": "Category text",
};
const families = new Map();
for (const n of colourNames) {
  const fam = n.startsWith("non-semantic-") ? n.split("-").slice(0, 3).join("-") : n.split("-").slice(0, 2).join("-");
  if (!families.has(fam)) families.set(fam, []);
  families.get(fam).push(n);
}
const ORDER = Object.keys(FAMILY_TITLES);
const rank = (fam) => (ORDER.indexOf(fam) === -1 ? ORDER.length : ORDER.indexOf(fam));
const colourSections = [...families].sort(([a], [b]) => rank(a) - rank(b)).map(([fam, names]) =>
  [`### ${FAMILY_TITLES[fam] ?? fam}`, "",
   table(["Token", "Light", "Dark", "Usage"], names.map((n) => [`\`${n}\``, `\`${valueOf(n, THEMES.Light)}\``, `\`${valueOf(n, THEMES.Dark)}\``, usageFor("color", n)]))].join("\n")
);

// ─── Scales ──────────────────────────────────────────────────────────────────
const gapRows = themeNames("spacing-").filter((n) => n.startsWith("gap-")).sort(byNumber)
  .map((n) => [`\`${n}\``, `\`p-${n}\`, \`gap-${n}\``, `\`${valueOf("spacing-" + n)}\``, usageFor("spacing", n)]);
const sizeRows = themeNames("spacing-").filter((n) => n.startsWith("size-")).sort(byNumber)
  .map((n) => [`\`${n}\``, `\`size-${n}\`, \`w-${n}\``, `\`${valueOf("spacing-" + n)}\``, usageFor("size", n)]);
const formRows = themeNames("spacing-").filter((n) => /^(forms|control)-/.test(n)).sort()
  .map((n) => [`\`${n}\``, `\`h-${n}\``, `\`${valueOf("spacing-" + n)}\``, usageFor("forms", n)]);
const radiusRows = themeNames("radius-").filter((n) => /^(control|container)-/.test(n)).sort()
  .map((n) => [`\`${n}\``, `\`rounded-${n}\``, `\`${valueOf("radius-" + n)}\``, usageFor("radius", n)]);
const shadowRows = themeNames("shadow-").sort().map((n) => [`\`${n}\``, `\`shadow-${n}\``, usageFor("shadow", n)]);
const typeRows = [...themeCss.matchAll(/@utility type-([a-z0-9-]+)\s*\{([^}]*)\}/g)].map(([, n, body]) => {
  const prop = (p) => resolve(body.match(new RegExp(`${p}:\\s*([^;]+);`))?.[1] ?? "—", base).replace(/,.*$/, "");
  return [`\`type-${n}\``, `${prop("font-size")} / ${prop("line-height")}, weight ${prop("font-weight")}`, usageFor("type", n)];
});

// ─── Rules that matched nothing ──────────────────────────────────────────────
const unused = [];
for (const section of ["color", "spacing", "size", "forms", "radius", "shadow", "type"])
  (usageFile[section] ?? []).forEach((r, i) => ruleHits.has(`${section}#${i}`) || unused.push(`${section}: ${r.match}`));

const drafts = (s) => (s.match(/_\(draft from the name/g) ?? []).length;

// ─── Document ────────────────────────────────────────────────────────────────
// Rendered before the body is assembled, so count drafts from the rows themselves.
const draftRows = [...colourSections, ...[gapRows, sizeRows, formRows, radiusRows, shadowRows, typeRows].flat(2)].join(" ");
const DRAFT_NOTE = drafts(draftRows)
  ? "- Rows marked _draft from the name_ describe tokens no component uses yet. Prefer a token with a confirmed usage.\n"
  : "";
const body = `<!-- GENERATED by scripts/build-design-md.mjs from src/styles/generated/*.css and tokens/usage.json. Do not edit by hand:
     change usage text in tokens/usage.json, token values in Figma, then run \`npm run design:build\`. -->

# DESIGN.md

**Agents: read this file before writing any UI code.** It lists every design token of Studio Kit with its value in
each theme and when to use it. A value without a usage is a palette; a value with a usage is a decision.

## Quick rules

- Never write hex, \`rgb()\`, \`hsl()\` or \`oklch()\` in UI code, and never a Tailwind palette class (\`bg-blue-500\`).
  Use a token from the tables below. \`npm run lint:tokens\` fails on both.
- **Match on usage, never on the nearest value.** A design colour of \`#F5F5F5\` maps to the token whose usage fits,
  even when another token has that exact value.
- Colour tokens become classes with a prefix: \`bg-<token>\` for fills, \`text-<token>\` for text, \`border-<token>\`
  for strokes, \`fill-<token>\` for SVG. Example: \`static-text-subtle\` → \`text-static-text-subtle\`.
- \`Typography\` \`tone="strong" | "base" | "subtle"\` applies \`static-text-strong\` / \`-base\` / \`-subtle\`; prefer the
  component over the raw text class.
- Status uses \`semantic-*\` tokens; categories use \`non-semantic-*\` (Tag colours). Never use a category colour
  for a status, or the reverse.
- When no token fits the usage, don't write a literal and don't fall back to the nearest value: stop and name the
  usage that has no token in your output.
${DRAFT_NOTE}
Themes: Light (\`:root\`, \`[data-theme="light"]\`) and Dark (\`[data-theme="dark"]\`). Spacing, size, radius and type
values are the Desktop values; below 768px some control sizes are smaller (\`src/styles/generated/tokens.css\`).

## Colour

${colourSections.join("\n\n")}

## Spacing — gap scale

${table(["Token", "Class example", "Value", "Usage"], gapRows)}

## Size scale

${table(["Token", "Class example", "Value", "Usage"], sizeRows)}

## Control heights

${table(["Token", "Class example", "Value", "Usage"], formRows)}

## Radius

${table(["Token", "Class example", "Value", "Usage"], radiusRows)}

## Shadows

${table(["Token", "Class", "Usage"], shadowRows)}

## Typography

Prefer the \`Typography\` component (\`variant="<name>"\`) over the raw class.

${table(["Class", "Size / line height, weight", "Usage"], typeRows)}
`;

const tokenCount = colourNames.length + gapRows.length + sizeRows.length + formRows.length + radiusRows.length + shadowRows.length + typeRows.length;
const summary = `${tokenCount} tokens, ${drafts(body)} usage drafts from names, ${missing.length} without usage`;
const target = join(ROOT, "DESIGN.md");

if (CHECK) {
  const problems = [];
  if (!existsSync(target)) problems.push("DESIGN.md does not exist. Run `npm run design:build`.");
  else if (readFileSync(target, "utf8") !== body) problems.push("DESIGN.md is out of date with the tokens or tokens/usage.json. Run `npm run design:build` and commit it.");
  for (const m of missing) problems.push(`No usage for ${m}. Add a rule to tokens/usage.json.`);
  if (problems.length) {
    console.log(problems.join("\n"));
    console.log(`\n✗ design:check failed (${summary}).`);
    process.exit(1);
  }
  console.log(`✓ DESIGN.md is current: ${summary}.`);
} else {
  writeFileSync(target, body);
  console.log(`Wrote DESIGN.md: ${summary}.`);
  if (missing.length) console.log("Tokens without usage:\n  " + missing.join("\n  "));
}
if (unused.length) console.log("Usage rules that match no token (remove or fix):\n  " + unused.join("\n  "));
