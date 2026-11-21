#!/usr/bin/env node
// Builds Figma component descriptions (markdown) for StudioKIT 2.0.
//
//   docs/figma-descriptions/components.json      hand-written prose per component set (by node id)
//   docs/figma-descriptions/figma-properties.json  property definitions exported from Figma
//   → docs/figma-descriptions/<slug>.md            one file per component; written to Figma as-is
//
// Button and Input keep their hand-written button.md / input.md and are skipped here.
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

const index = [];
for (const [id, p] of Object.entries(prose)) {
  if (id.startsWith("_")) continue;
  const defs = props[id];
  if (!defs) { console.warn(`no properties for ${p.name} (${id}) — skipped`); continue; }
  const parts = [p.summary];
  const prop = propertySection(defs);
  if (prop.length) parts.push("---", "**Properties**", ...prop);
  if (p.usage?.length) parts.push("---", "**Usage guidelines**", ...p.usage.map((u) => `- ${u}`));
  if (p.a11y?.length) parts.push("---", "**Accessibility**", ...p.a11y.map((a) => `- ${a}`));
  const md = parts.join("\n\n").replace(/\n\n- /g, "\n- ").replace(/(\*\*[A-Za-z ]+\*\*)\n- /g, "$1\n- ");
  const file = `${slug(p.name)}.md`;
  writeFileSync(join(dir, file), md + "\n");
  index.push({ id, name: p.name, file });
}
writeFileSync(join(dir, "index.json"), JSON.stringify(index, null, 2) + "\n");
console.log(`wrote ${index.length} descriptions`);
