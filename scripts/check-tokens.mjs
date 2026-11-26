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
const SCOPES = ["src/components", "src/app/playground", "src/app/prototypes"];

// No arbitrary values either (`max-w-[400px]`) in screens and components. A component that needs a value the
// token scale doesn't cover records it as an exception with a reason (see "Exceptions" below). Stories are
// demo layout and stay out of this rule.
const STRICT_SCOPES = ["src/app/prototypes", "src/components"];
const STRICT_SKIP = /\.stories\.tsx$/;
const ARBITRARY = new RegExp(
  "(?<![\\w-])(?:[a-z0-9-]+:)*-?(?:p[xytrbl]?|m[xytrbl]?|gap(?:-[xy])?|space-[xy]|w|h|size|min-[hw]|max-[hw]|top|bottom|left|right|inset(?:-[xy])?|translate-[xy]|rounded(?:-[trbl]{1,2})?|text|bg|border(?:-[trblxy])?|fill|stroke|leading|tracking|shadow|z)-\\[[^\\]]+\\]",
  "g"
);

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

// ─── Unknown token classes ─────────────────────────────────────────────────
// Tailwind silently drops classes it doesn't know, so a misspelt token renders nothing. Every class that
// names a design token must match something in src/styles/generated/theme.css.
const theme = readFileSync(join(ROOT, "src/styles/generated/theme.css"), "utf8");
const themeVars = new Set([...theme.matchAll(/--([a-z0-9-]+):/g)].map((m) => m[1]));
const typeUtils = new Set([...theme.matchAll(/@utility (type-[a-z0-9-]+)/g)].map((m) => m[1]));
const TOKEN_CLASS = new RegExp(
  "(?<![\\w-])(?:[a-z0-9-]+:|\\[[^\\]]+\\]:)*" +
    "(?:(?<color>(?:bg|text|border(?:-[trblxy])?|fill|stroke|outline|ring|divide|placeholder|decoration|caret|accent)-(?:static|dynamic|semantic|non-semantic|colors)-[a-z0-9-]+)" +
    "|(?<radius>rounded(?:-[trbl]{1,2})?-(?:control|container)-[a-z]+)" +
    "|(?<space>-?(?:p[xytrbl]?|m[xytrbl]?|gap(?:-[xy])?|space-[xy]|h|w|size|min-[hw]|max-[hw]|top|bottom|left|right|inset(?:-[xy])?|translate-[xy])-(?:gap|size|forms|control)-[a-z0-9]+)" +
    "|(?<type>type-[a-z0-9-]+)" +
    "|(?<shadow>shadow-(?:elevation|focus|forms|controls)-[a-z0-9-]+))(?:\\/\\d+)?(?![\\w-])",
  "g"
);
function unknownToken(m) {
  const g = m.groups;
  if (g.color) return !themeVars.has("color-" + g.color.replace(/^(?:bg|text|border(?:-[trblxy])?|fill|stroke|outline|ring|divide|placeholder|decoration|caret|accent)-/, ""));
  if (g.radius) return !themeVars.has("radius-" + g.radius.replace(/^rounded(?:-[trbl]{1,2})?-/, ""));
  if (g.space) return !themeVars.has("spacing-" + g.space.replace(/^-?(?:p[xytrbl]?|m[xytrbl]?|gap(?:-[xy])?|space-[xy]|h|w|size|min-[hw]|max-[hw]|top|bottom|left|right|inset(?:-[xy])?|translate-[xy])-/, ""));
  if (g.type) return !typeUtils.has(g.type);
  if (g.shadow) return !themeVars.has(g.shadow);
  return false;
}

let unknownProblems = 0;
// src/app covers the playground and prototypes, so only add the folders outside it.
for (const scope of ["src/components", "src/app", "src/site"]) {
  for (const file of walk(join(ROOT, scope))) {
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      for (const m of line.matchAll(TOKEN_CLASS)) {
        if (/(?:id=["']|#)$/.test(line.slice(0, m.index))) continue; // anchor ids, not classes
        if (!unknownToken(m)) continue;
        unknownProblems++;
        console.log(`${relative(ROOT, file)}:${i + 1}  unknown token class "${m[0]}" — no matching token in src/styles/generated/theme.css`);
      }
    });
  }
}

// ─── Exceptions ──────────────────────────────────────────────────────────────
// A deliberate literal carries `token-lint-ignore: <reason>` on the same line or the line above. The reason says
// why no token fits (20+ characters). A marker that excuses nothing fails as stale, so exceptions can't outlive
// their literal.
const MARKER = /token-lint-ignore(?::\s*(.*?))?\s*(?:\*\/\s*\}?)?$/;
const MIN_REASON = 20;
const fileHits = new Map(); // file → [{ line, text }]
const hit = (file, i, text) => {
  if (!fileHits.has(file)) fileHits.set(file, []);
  fileHits.get(file).push({ line: i, text });
};
const tryWalk = (dir) => {
  try {
    return [...walk(join(ROOT, dir))];
  } catch {
    return []; // folder doesn't exist yet
  }
};

for (const scope of SCOPES) {
  for (const file of tryWalk(scope)) {
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      // CSS custom-property definitions are where token values live — allowed.
      if (file.endsWith(".css") && /^\s*--[\w-]+\s*:/.test(line)) return;
      for (const m of line.matchAll(RAW_CLASS)) {
        const hint = HINTS[m[1]] ?? "a semantic token";
        hit(file, i, `raw colour "${m[0]}"  →  use ${hint} (DESIGN.md lists every token and its usage)`);
      }
      for (const m of line.matchAll(HEX)) hit(file, i, `hex "${m[0]}"  →  use var(--<token>); pick the token by its usage in DESIGN.md`);
    });
  }
}

for (const scope of STRICT_SCOPES) {
  for (const file of tryWalk(scope).filter((f) => !STRICT_SKIP.test(f))) {
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      for (const m of line.matchAll(ARBITRARY))
        hit(file, i, `arbitrary value "${m[0]}"  →  use a token class (gap-*, size-*, control-*, forms-*, rounded-*, type-*) from DESIGN.md`);
    });
  }
}

let problems = unknownProblems;
const report = (file, i, text) => {
  problems++;
  console.log(`${relative(ROOT, file)}:${i + 1}  ${text}`);
};
const markerFiles = new Set([...fileHits.keys()]);
for (const scope of new Set([...SCOPES, ...STRICT_SCOPES])) for (const f of tryWalk(scope)) markerFiles.add(f);
for (const file of markerFiles) {
  const lines = readFileSync(file, "utf8").split("\n");
  const markers = new Map(); // line → { reason, used }
  lines.forEach((l, i) => {
    const m = MARKER.exec(l);
    if (m && /token-lint-ignore/.test(l)) markers.set(i, { reason: (m[1] ?? "").trim(), used: false });
  });
  for (const { line, text } of fileHits.get(file) ?? []) {
    const at = markers.has(line) ? line : markers.has(line - 1) ? line - 1 : null;
    if (at === null) {
      report(file, line, `${text}. No token fits? Keep the value and put \`token-lint-ignore: <why no token fits>\` on this line or the line above, and add the missing token to GAPS.md under Tokens.`);
      continue;
    }
    markers.get(at).used = true;
  }
  for (const [i, { reason, used }] of markers) {
    if (!used) report(file, i, "stale exception: token-lint-ignore excuses nothing on this line or the next. Remove the marker.");
    else if (reason.length < MIN_REASON)
      report(file, i, `exception without a reason: write \`token-lint-ignore: <why no token fits>\` (${MIN_REASON}+ characters).`);
  }
}

// ─── Intent words ────────────────────────────────────────────────────────────
// The canonical intent words are `danger` and `success` (AGENTS.md "Intent words"). Only these components still
// define the older values, until the Figma rename. No other component may introduce them as a prop value.
const OLD_INTENT_ALLOWED = ["src/components/Alert/Alert.tsx", "src/components/Toast/Toast.tsx", "src/components/Badge/Badge.tsx"];
const OLD_INTENT = /["'](error|negative|positive)["']/g;
for (const file of tryWalk("src/components").filter((f) => !/\.stories\.tsx$/.test(f))) {
  if (OLD_INTENT_ALLOWED.includes(relative(ROOT, file))) continue;
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    for (const m of line.matchAll(OLD_INTENT))
      report(file, i, `intent word "${m[1]}"  →  use "${m[1] === "positive" ? "success" : "danger"}". Only Alert, Toast and Badge keep the old words until the Figma rename (AGENTS.md "Intent words").`);
  });
}

// ─── Stand-ins ───────────────────────────────────────────────────────────────
// A minimal stand-in for a missing component is marked `// stand-in: <Name>` and needs a `- <Name>:` line in
// GAPS.md, so every workaround is on the team's list.
const gapsFile = join(ROOT, "GAPS.md");
let gapNames = new Set();
try {
  gapNames = new Set([...readFileSync(gapsFile, "utf8").matchAll(/^- ([^:\n]+):/gm)].map((m) => m[1].trim().toLowerCase()));
} catch {
  // no GAPS.md: every stand-in fails below
}
const STAND_IN = /stand-in:\s*([^—*\n]+?)\s*(?:—|\*\/|$)/;
for (const scope of ["src/app", "src/components"]) {
  for (const file of tryWalk(scope)) {
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      const m = STAND_IN.exec(line);
      if (m && !gapNames.has(m[1].trim().toLowerCase()))
        report(file, i, `stand-in "${m[1].trim()}" has no line in GAPS.md. Add \`- ${m[1].trim()}: <what it must do> — needed by ${relative(ROOT, file)}\` under Components.`);
    });
  }
}

if (problems) {
  console.log(`\n✗ ${problems} token problem(s): hard-coded values, unknown token classes, exceptions without a reason, or old intent words.`);
  process.exit(1);
}
console.log(
  `✓ No hard-coded colours in ${SCOPES.join(", ")}; no unexcused arbitrary values in ${STRICT_SCOPES.join(", ")} (stories excepted); every exception has a reason; every token class exists; old intent words only in Alert, Toast, Badge; every stand-in is listed in GAPS.md.`
);
