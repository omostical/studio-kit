/**
 * Studio Kit Rebrand — turns a duplicate of Wideset Core 1.0 into "Studio Kit 2.0".
 *
 * Run inside the DUPLICATED file (never the purchased original):
 *   Plugins → Development → Studio Kit Rebrand → "1. Dry run"   (report only)
 *   Plugins → Development → Studio Kit Rebrand → "2. Apply changes"
 *
 * Both commands write a report onto a page called "🔁 Rebrand report".
 * Everything you might want to tune lives in CONFIG below.
 */

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CONFIG = {
  // StudioKIT brand blue ramp (from studio-kit/src/tokens/tokens.json).
  brandRamp: {
    100: "#EEF1FB", 200: "#D3DAFA", 300: "#ABBAF4", 400: "#7E97EC", 500: "#5B79E3",
    600: "#4763CF", 700: "#3750AD", 800: "#293D87", 900: "#1C2B61", 1000: "#101A3D",
  },
  // Light steps whose number matches the ramp above get the exact StudioKIT hex.
  // Every other Brand variable (other light steps, the whole dark ramp, opacity
  // tints) keeps Wideset's lightness + alpha and takes the StudioKIT hue/chroma.
  useExactLightSteps: true,

  fonts: { body: "Geist", mono: "Geist Mono" },

  // Corner radius: "Variable name": value (applies to every mode).
  // Leave empty on the first dry run — the report lists current values so you
  // can decide. Example: { "Corner Radius/Control/xl": 12 }
  radius: {},
};

// ─── Colour maths (sRGB ⇄ OKLCH) ─────────────────────────────────────────────
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const toSrgb = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
function rgbToOklch({ r, g, b }) {
  const [R, G, B] = [toLin(r), toLin(g), toLin(b)];
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(a, bb), H: Math.atan2(bb, a) };
}
function oklchToRgbRaw({ L, C, H }) {
  const a = C * Math.cos(H), b = C * Math.sin(H);
  const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);
  return {
    r: toSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    g: toSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    b: toSrgb(-0.0041960771 * l - 0.7034186147 * m + 1.707614701 * s),
  };
}
const inGamut = (c) => [c.r, c.g, c.b].every((x) => x >= -0.0005 && x <= 1.0005);
const clamp01 = (x) => Math.min(1, Math.max(0, x));
function oklchToRgb(lch) {
  // Reduce chroma until the colour fits in sRGB (keeps lightness + hue).
  let lo = 0, hi = lch.C, best = oklchToRgbRaw({ ...lch, C: 0 });
  if (inGamut(oklchToRgbRaw(lch))) best = oklchToRgbRaw(lch);
  else for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2, c = oklchToRgbRaw({ ...lch, C: mid });
    if (inGamut(c)) { best = c; lo = mid; } else hi = mid;
  }
  return { r: clamp01(best.r), g: clamp01(best.g), b: clamp01(best.b) };
}
const hexToRgb = (h) => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
const rgbToHex = (c) => "#" + [c.r, c.g, c.b].map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
const fmt = (c) => rgbToHex(c) + (c.a !== undefined && c.a < 1 ? ` @${Math.round(c.a * 100)}%` : "");

// ─── Helpers ─────────────────────────────────────────────────────────────────
const report = [];
const log = (s) => report.push(s);
async function allVars() { return figma.variables.getLocalVariablesAsync(); }
async function collectionByName(name) {
  return (await figma.variables.getLocalVariableCollectionsAsync()).find((c) => c.name === name);
}

// ─── 1. Brand ramp ───────────────────────────────────────────────────────────
async function rebrand(apply) {
  log("━━ 1. Brand ramp ━━");
  const vars = (await allVars()).filter((v) => v.resolvedType === "COLOR" && /^Colors\/(Light|Dark)\/Brand\//.test(v.name));
  if (!vars.length) { log("  ✗ No Colors/Light|Dark/Brand/* variables found."); return; }

  const target = rgbToOklch(hexToRgb(CONFIG.brandRamp[600]));
  // Wideset's own brand-600 sets the chroma scale, so its saturation curve is kept.
  const ref = vars.find((v) => v.name === "Colors/Light/Brand/600");
  const col = await figma.variables.getVariableCollectionByIdAsync(vars[0].variableCollectionId);
  const refVal = ref && ref.valuesByMode[col.modes[0].modeId];
  const refC = refVal && refVal.r !== undefined ? rgbToOklch(refVal).C : target.C;
  const chromaScale = refC > 0 ? target.C / refC : 1;

  let changed = 0;
  for (const v of vars) {
    for (const mode of col.modes) {
      const val = v.valuesByMode[mode.modeId];
      if (!val || val.type === "VARIABLE_ALIAS" || val.r === undefined) continue;
      const step = v.name.split("/").pop();
      let rgb;
      if (CONFIG.useExactLightSteps && v.name.startsWith("Colors/Light/Brand/") && CONFIG.brandRamp[step]) {
        rgb = hexToRgb(CONFIG.brandRamp[step]);
      } else {
        const cur = rgbToOklch(val);
        rgb = oklchToRgb({ L: cur.L, C: cur.C * chromaScale, H: target.H });
      }
      const next = { ...rgb, a: val.a === undefined ? 1 : val.a };
      log(`  ${v.name}: ${fmt(val)} → ${fmt(next)}`);
      if (apply) v.setValueForMode(mode.modeId, next);
      changed++;
    }
  }
  log(`  ${apply ? "Changed" : "Would change"} ${changed} values.`);
}

// ─── 2. Typeface ─────────────────────────────────────────────────────────────
async function fonts(apply) {
  log("━━ 2. Typeface ━━");
  const available = await figma.listAvailableFontsAsync();
  const stylesOf = (fam) => available.filter((f) => f.fontName.family === fam).map((f) => f.fontName.style);
  for (const fam of [CONFIG.fonts.body, CONFIG.fonts.mono]) {
    const styles = stylesOf(fam);
    if (!styles.length) { log(`  ✗ "${fam}" is not available in Figma — nothing changed. Install it, then re-run.`); return; }
    log(`  ✓ "${fam}" available (${styles.length} styles)`);
    if (apply) for (const style of styles) await figma.loadFontAsync({ family: fam, style });
  }
  const families = (await allVars()).filter((v) => v.resolvedType === "STRING" && /famil/i.test(v.name));
  for (const v of families) {
    const col = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
    const nextFam = /mono|code/i.test(v.name) ? CONFIG.fonts.mono : CONFIG.fonts.body;
    for (const mode of col.modes) {
      const cur = v.valuesByMode[mode.modeId];
      if (typeof cur !== "string") continue;
      if (apply) {
        const curStyles = stylesOf(cur);
        for (const style of curStyles) await figma.loadFontAsync({ family: cur, style }).catch(() => {});
        v.setValueForMode(mode.modeId, nextFam);
      }
      log(`  ${v.name} [${mode.name}]: "${cur}" → "${nextFam}"`);
    }
  }
  if (!families.length) log("  ✗ No font-family variables found.");
  log("  Note: Wideset uses weight 520 (Medium). Check the text styles look right in Geist after applying.");
}

// ─── 3. Radius ───────────────────────────────────────────────────────────────
async function radius(apply) {
  log("━━ 3. Corner radius ━━");
  const vars = (await allVars()).filter((v) => v.resolvedType === "FLOAT" && /^Corner Radius\//.test(v.name));
  for (const v of vars) {
    const col = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
    const cur = col.modes.map((m) => {
      const x = v.valuesByMode[m.modeId];
      return `${m.name}=${x && x.type === "VARIABLE_ALIAS" ? "alias" : x}`;
    }).join(", ");
    const want = CONFIG.radius[v.name];
    if (want === undefined) { log(`  ${v.name}: ${cur}`); continue; }
    log(`  ${v.name}: ${cur} → all modes=${want}`);
    if (apply) for (const m of col.modes) v.setValueForMode(m.modeId, want);
  }
  const unknown = Object.keys(CONFIG.radius).filter((k) => !vars.some((v) => v.name === k));
  for (const k of unknown) log(`  ✗ CONFIG.radius has "${k}" but no such variable exists.`);
}

// ─── 4. Bug fixes ────────────────────────────────────────────────────────────
async function bugfixes(apply) {
  log("━━ 4. Bug fixes ━━");
  const vars = await allVars();

  // 4a. Variable whose name is a pasted CSS declaration.
  const bad = vars.find((v) => v.name.includes("--dynamic-background-danger-default"));
  const goodName = "Dynamic/Fill/Danger/Default";
  if (!bad) log("  4a. CSS-named danger variable: not found (already fixed?)");
  else if (vars.some((v) => v.name === goodName && v.variableCollectionId === bad.variableCollectionId)) {
    log(`  4a. ✗ "${goodName}" already exists in the same collection — rename by hand and merge usages.`);
  } else {
    log(`  4a. Rename variable "${bad.name}" → "${goodName}"`);
    if (apply) bad.name = goodName;
  }

  // 4b + 4c need component pages. Load each page and search it.
  let xsmallFixed = 0, mutliFixed = 0;
  for (const page of figma.root.children) {
    if (!/Button|Select/i.test(page.name)) continue;
    await page.loadAsync();
    for (const set of page.findAllWithCriteria({ types: ["COMPONENT_SET"] })) {
      if (set.name.trim() === "Button") {
        for (const c of set.children) {
          if (c.type === "COMPONENT" && c.name.includes("Size=Xsmall")) {
            if (apply) c.name = c.name.replace("Size=Xsmall", "Size=XSmall");
            xsmallFixed++;
          }
        }
      }
      if (set.name.trim() === "Mutli Select") {
        if (apply) set.name = "Multi Select";
        mutliFixed++;
      }
    }
  }
  log(`  4b. Button "Size=Xsmall" → "Size=XSmall": ${xsmallFixed} variants`);
  log(`  4c. "Mutli Select" → "Multi Select": ${mutliFixed} component set(s)`);
}

// ─── Report page ─────────────────────────────────────────────────────────────
async function writeReport(title) {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  let page = figma.root.children.find((p) => p.name === "🔁 Rebrand report");
  if (!page) { page = figma.createPage(); page.name = "🔁 Rebrand report"; }
  await figma.setCurrentPageAsync(page);
  const x = page.children.reduce((m, n) => Math.max(m, n.x + n.width), 0) + (page.children.length ? 80 : 0);
  const t = figma.createText();
  t.fontName = { family: "Inter", style: "Regular" };
  t.fontSize = 12;
  t.characters = `${title}\n${new Date().toISOString()}\n\n${report.join("\n")}`;
  t.x = x; t.y = 0;
  page.appendChild(t);
  figma.viewport.scrollAndZoomIntoView([t]);
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const apply = figma.command === "apply";
  if (/^Wideset Core/i.test(figma.root.name) && apply) {
    figma.closePlugin("Stopped: this looks like the original Wideset file. Duplicate it and rename the copy first.");
    return;
  }
  for (const step of [rebrand, fonts, radius, bugfixes]) {
    try { await step(apply); } catch (e) { log(`  ✗ ${step.name} failed: ${e && e.message}`); }
  }
  await writeReport(apply ? "APPLIED — Studio Kit rebrand" : "DRY RUN — nothing was changed");
  figma.closePlugin(apply ? "Rebrand applied. See the 🔁 Rebrand report page." : "Dry run done. See the 🔁 Rebrand report page.");
}
main();
