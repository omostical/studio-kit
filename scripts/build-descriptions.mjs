#!/usr/bin/env node
// Builds Figma component descriptions (markdown) for StudioKIT 2.0.
//
//   docs/figma-descriptions/components.json      hand-written prose per component set (by node id)
//   docs/figma-descriptions/figma-properties.json  property definitions exported from Figma
//   → docs/figma-descriptions/<slug>.md            one file per component; written to Figma as-is
//
// Button and Input keep their hand-written button.md / input.md and are skipped here.
//
// Each entry's `status` (stable · beta · planned) and `code` path go into index.json and onto the first line of
// its description, so agents and designers see whether a component exists in code. Keys starting with `code:`
// are code components without a generated description (Button, Input, Typography).
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = "docs/figma-descriptions";
const prose = JSON.parse(readFileSync(join(dir, "components.json"), "utf8"));
const props = JSON.parse(readFileSync(join(dir, "figma-properties.json"), "utf8"));

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const clean = (k) => k.split("#")[0].trim();

function propertySection(defs) {
  const variants = [], toggles = [], texts = [], swaps = [];
  for (const [key, d] of Object.entries(defs)) {
    const name = clean(key);
    if (d.type === "VARIANT") variants.push(`- **${name}** — ${d.options.map((o) => `\`${o}\``).join(" · ")}`);
    else if (d.type === "BOOLEAN") toggles.push(name);
    else if (d.type === "TEXT") texts.push(name);
    else if (d.type === "INSTANCE_SWAP") swaps.push(name);
  }
  const out = [];
  if (variants.length) out.push(...variants);
  if (toggles.length) out.push(`- **Show/hide** — ${toggles.join(", ")}`);
  if (texts.length) out.push(`- **Text** — ${texts.join(", ")}`);
  if (swaps.length) out.push(`- **Swappable** — ${swaps.join(", ")}`);
  return out;
}

const STATUSES = ["stable", "beta", "planned"];
const codeName = (p) => p.code?.split("/").pop()?.replace(/\.tsx$/, "");
function statusLine(p) {
  if (p.status === "planned") return "**Status: planned** — Figma only; there is no code component yet.";
  const where = p.via ? `covered by ${p.via}` : `in code as \`${codeName(p)}\``;
  return `**Status: ${p.status}** — ${where}.`;
}

const index = [];
const problems = [];
for (const [id, p] of Object.entries(prose)) {
  if (id.startsWith("_")) continue;
  if (!STATUSES.includes(p.status)) problems.push(`${p.name}: status "${p.status}" is not one of ${STATUSES.join(", ")}`);
  if (p.status !== "planned" && !p.code) problems.push(`${p.name}: status ${p.status} needs a code path`);
  const entry = { id, name: p.name, status: p.status, ...(p.code && { code: p.code }), ...(p.via && { via: p.via }) };
  if (id.startsWith("code:")) { index.push({ ...entry, ...(p.file && { file: p.file }) }); continue; }
  const defs = props[id];
  if (!defs) { console.warn(`no properties for ${p.name} (${id}) — skipped`); continue; }
  const parts = [statusLine(p), p.summary];
  const prop = propertySection(defs);
  if (prop.length) parts.push("---", "**Properties**", ...prop);
  if (p.usage?.length) parts.push("---", "**Usage guidelines**", ...p.usage.map((u) => `- ${u}`));
  if (p.a11y?.length) parts.push("---", "**Accessibility**", ...p.a11y.map((a) => `- ${a}`));
  const md = parts.join("\n\n").replace(/\n\n- /g, "\n- ").replace(/(\*\*[A-Za-z ]+\*\*)\n- /g, "$1\n- ");
  const file = `${slug(p.name)}.md`;
  writeFileSync(join(dir, file), md + "\n");
  index.push({ ...entry, file });
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
writeFileSync(join(dir, "index.json"), JSON.stringify(index, null, 2) + "\n");
console.log(`wrote ${index.filter((e) => !e.id.startsWith("code:")).length} descriptions; index.json lists ${index.length} components`);
