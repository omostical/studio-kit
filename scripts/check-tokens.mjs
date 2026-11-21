#!/usr/bin/env node
/**
 * Token guardrail — `npm run lint:tokens`
 *
 * Rule: design-system code may only use colours through semantic tokens
 * (bg-static-fill-foreground, text-static-text-strong, border-dynamic-stroke-primary-default, var(--dynamic-fill-danger-default) …).
 * Raw palette classes (bg-blue-500, text-neutral-700) and hex codes (#4763CF)
 * are "detached fills": they ignore the theme, so they break dark mode and
 * won't change when the kit is re-skinned for a new brand.
 *
 * Same idea as Shopify's stylelint-polaris and GitHub Primer's lint rules.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;

// Folders held to the rule. The docs-site chrome (src/site) has its own look
// and is deliberately excluded.
const SCOPES = ["src/components", "src/app/playground"];

const PALETTE =
  "neutral|gray|slate|zinc|stone|indigo|blue|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|red|rose|pink|fuchsia|purple|violet|white|black";
const RAW_CLASS = new RegExp(
  `(?<![\\w-])(?:[a-z-]+:)*(bg|text|border|ring|outline|divide|fill|stroke|from|via|to|shadow|accent|caret|decoration)-(${PALETTE})(?:-\\d{2,4})?(?:\\/\\d+)?(?![\\w-])`,
  "g"
);
const HEX = /(?<![\w&-])#[0-9A-Fa-f]{3,8}\b/g;

const HINTS = {
  bg: "bg-static-fill-{background|foreground|container} · bg-dynamic-fill-{primary|secondary|danger|success}-{default|hover} · bg-semantic-fill-{positive|negative|notice|info}",
  text: "text-static-text-{strong|base|subtle} · text-dynamic-text-{primary|danger|success}-default · text-semantic-text-{positive|negative|notice|info}",
  border: "border-static-stroke-{base|subtle|strong} · border-dynamic-stroke-{primary|secondary|danger}-default",
  ring: "use shadow-focus-base / shadow-focus-danger (the Figma Focus/* effect styles)",
};

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(tsx?|css)$/.test(name)) yield p;
  }
}

let problems = 0;
for (const scope of SCOPES) {
  for (const file of walk(join(ROOT, scope))) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      // CSS custom-property definitions are where token values live — allowed.
      if (file.endsWith(".css") && /^\s*--[\w-]+\s*:/.test(line)) return;
      if (/token-lint-ignore/.test(line)) return;
      for (const m of line.matchAll(RAW_CLASS)) {
        problems++;
        const hint = HINTS[m[1]] ?? "a semantic token";
        console.log(`${relative(ROOT, file)}:${i + 1}  raw colour "${m[0]}"  →  use ${hint}`);
      }
      for (const m of line.matchAll(HEX)) {
        problems++;
        console.log(`${relative(ROOT, file)}:${i + 1}  hex "${m[0]}"  →  use var(--token) instead`);
      }
    });
  }
}

if (problems) {
  console.log(`\n✗ ${problems} hard-coded colour(s). Swap each for the semantic token that matches its role.`);
  process.exit(1);
}
console.log(`✓ No hard-coded colours in ${SCOPES.join(", ")}.`);
