/**
 * Studio Kit — Design Tokens
 *
 * Single source of truth for all design tokens, mirroring Figma StudioKIT_v1.
 *
 * Structure:
 *   tokens.palette       — raw primitive color scales (neutral, blue, red…)
 *   tokens.semantic      — semantic colors (bg, text, icon, border) with light/dark values
 *   tokens.typography    — font family, size, weight, line-height, letter-spacing
 *   tokens.spacing       — space scale with compact/spacious modes
 *   tokens.radius        — border radius with default/rounded modes
 *   tokens.animation     — duration and easing
 *
 * CSS custom properties are the runtime source; this file is for TypeScript
 * consumers (token lookups, documentation, tests, code-gen).
 */

// ─── Primitive palette ────────────────────────────────────────────────────────

export const palette = {
  white: "#FFFFFF",
  black: "#000000",
  neutral: {
    100:  "#F3F3F3",
    200:  "#D8D8D8",
    300:  "#BDBDBD",
    400:  "#A3A3A3",
    500:  "#8A8A8A",
    600:  "#727272",
    700:  "#5A5A5A",
    800:  "#444444",
    900:  "#2E2E2E",
    1000: "#1A1A1A",
  },
  blue: {
    100:  "#EEF1FB",
    200:  "#D3DAFA",
    300:  "#ABBAF4",
    400:  "#7E97EC",
    500:  "#5B79E3",
    600:  "#4763CF",
    700:  "#3750AD",
    800:  "#293D87",
    900:  "#1C2B61",
    1000: "#101A3D",
  },
  red: {
    100:  "#FCEEF0",
    200:  "#F7D0D5",
    300:  "#EFAAB2",
    400:  "#E3808B",
    500:  "#D45A67",
    600:  "#C53540",
    700:  "#A22232",
    800:  "#7D1624",
    900:  "#580E1A",
    1000: "#32060E",
  },
  yellow: {
    100:  "#F5F5E8",
    200:  "#E8E4C2",
    300:  "#D8D098",
    400:  "#C5BA6E",
    500:  "#AFA048",
    600:  "#958526",
    700:  "#7A6C1A",
    800:  "#5E5212",
    900:  "#42390A",
    1000: "#252005",
  },
  green: {
    100:  "#EEFBF2",
    200:  "#C8F2D6",
    300:  "#96E4B4",
    400:  "#5FD292",
    500:  "#2EBC72",
    600:  "#1EA55C",
    700:  "#168748",
    800:  "#106835",
    900:  "#0A4923",
    1000: "#062A14",
  },
  pink: {
    100:  "#FCEEF4",
    200:  "#F8D0E4",
    300:  "#F2AACB",
    400:  "#E880AF",
    500:  "#DA5A94",
    600:  "#C83072",
    700:  "#A5225C",
    800:  "#801647",
    900:  "#5A0E32",
    1000: "#33061D",
  },
  violet: {
    100:  "#F5EEF9",
    200:  "#E5D0F6",
    300:  "#CFA8EE",
    400:  "#B67EE4",
    500:  "#9E58D8",
    600:  "#8840C8",
    700:  "#6F2AA6",
    800:  "#561D82",
    900:  "#3C135C",
    1000: "#220A35",
  },
} as const;

// ─── Semantic colors (light / dark per token) ─────────────────────────────────

export const semantic = {
  bg: {
    surface: {
      default:   { light: "#F3F3F3", dark: "#2E2E2E" },
      primary:   { light: "#D8D8D8", dark: "#444444" },
      secondary: { light: "#FFFFFF",  dark: "#5A5A5A" },
      tertiary:  { light: "#FFFFFF",  dark: "#727272" },
      inverse:   { light: "#2E2E2E", dark: "#F3F3F3" },
      disabled:  { light: "#F3F3F3", dark: "#2E2E2E" },
    },
    fill: {
      brand:           { light: "#4763CF", dark: "#5B79E3" },
      brandHover:      { light: "#3750AD", dark: "#7E97EC" },
      brandPressed:    { light: "#293D87", dark: "#ABBAF4" },
      brandDisabled:   { light: "#D3DAFA", dark: "#444444" },
      success:         { light: "#168748", dark: "#1EA55C" },
      successHover:    { light: "#106835", dark: "#2EBC72" },
      successPressed:  { light: "#0A4923", dark: "#5FD292" },
      successDisabled: { light: "#EEFBF2", dark: "#444444" },
      error:           { light: "#C53540", dark: "#D45A67" },
      errorHover:      { light: "#A22232", dark: "#E3808B" },
      errorPressed:    { light: "#A22232", dark: "#EFAAB2" },
      errorDisabled:   { light: "#FCEEF0", dark: "#444444" },
      warning:         { light: "#958526", dark: "#AFA048" },
      warningHover:    { light: "#7A6C1A", dark: "#C5BA6E" },
      warningPressed:  { light: "#7A6C1A", dark: "#D8D098" },
      warningDisabled: { light: "#F5F5E8", dark: "#444444" },
      subtle:          { light: "#F3F3F3", dark: "#444444" },
      ghost:           { light: "#FFFFFF",  dark: "#444444" },
    },
  },
  text: {
    primary:         { light: "#1A1A1A", dark: "#F3F3F3" },
    secondary:       { light: "#5A5A5A", dark: "#A3A3A3" },
    tertiary:        { light: "#727272", dark: "#8A8A8A" },
    subtle:          { light: "#8A8A8A", dark: "#727272" },
    disabled:        { light: "#A3A3A3", dark: "#727272" },
    inverse:         { light: "#F3F3F3", dark: "#2E2E2E" },
    inverseSecondary:{ light: "#BDBDBD", dark: "#5A5A5A" },
    onColor:         { light: "#FFFFFF",  dark: "#FFFFFF"  },
    onColorDisabled: { light: "#8A8A8A", dark: "#8A8A8A" },
    brand:           { light: "#3750AD", dark: "#ABBAF4" },
    brandHover:      { light: "#293D87", dark: "#D3DAFA" },
    brandDisabled:   { light: "#ABBAF4", dark: "#293D87" },
    success:         { light: "#106835", dark: "#96E4B4" },
    error:           { light: "#A22232", dark: "#EFAAB2" },
    warning:         { light: "#5E5212", dark: "#D8D098" },
  },
  icon: {
    primary:   { light: "#444444", dark: "#D8D8D8" },
    secondary: { light: "#727272", dark: "#8A8A8A" },
    tertiary:  { light: "#8A8A8A", dark: "#727272" },
    disabled:  { light: "#D8D8D8", dark: "#5A5A5A" },
    inverse:   { light: "#F3F3F3", dark: "#2E2E2E" },
    brand:     { light: "#4763CF", dark: "#7E97EC" },
    success:   { light: "#1EA55C", dark: "#5FD292" },
    error:     { light: "#C53540", dark: "#E3808B" },
    warning:   { light: "#958526", dark: "#C5BA6E" },
    onFill:    { light: "#FFFFFF",  dark: "#FFFFFF"  },
  },
  border: {
    default:       { light: "rgba(0,0,0,0.12)",   dark: "rgba(255,255,255,0.18)" },
    strong:        { light: "rgba(0,0,0,0.24)",   dark: "rgba(255,255,255,0.24)" },
    subtle:        { light: "rgba(0,0,0,0.06)",   dark: "rgba(255,255,255,0.06)" },
    disabled:      { light: "rgba(0,0,0,0.06)",   dark: "rgba(255,255,255,0.06)" },
    brand:         { light: "#4763CF", dark: "#7E97EC" },
    brandSubtle:   { light: "#3750AD", dark: "#293D87" },
    success:       { light: "#1EA55C", dark: "#2EBC72" },
    successSubtle: { light: "#96E4B4", dark: "#106835" },
    error:         { light: "#C53540", dark: "#D45A67" },
    errorSubtle:   { light: "#EFAAB2", dark: "#7D1624" },
    warning:       { light: "#958526", dark: "#AFA048" },
    warningSubtle: { light: "#D8D098", dark: "#5E5212" },
  },
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: {
    sans: "Geist, sans-serif",
    mono: "Geist Mono, monospace",
  },
  fontSize: {
    11: "11px",
    12: "12px",
    13: "13px",
    14: "14px",
    16: "16px",
    18: "18px",
    20: "20px",
    24: "24px",
    32: "32px",
    40: "40px",
    48: "48px",
    56: "56px",
    64: "64px",
    72: "72px",
  },
  fontWeight: {
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
  },
  lineHeight: {
    16: "16px",
    18: "18px",
    20: "20px",
    24: "24px",
    26: "26px",
    28: "28px",
    30: "30px",
    38: "38px",
    46: "46px",
    52: "52px",
    60: "60px",
  },
  letterSpacing: {
    tightest: "-0.04em",
    tighter:  "-0.03em",
    tight:    "-0.02em",
    snug:     "-0.01em",
    normal:    "0em",
    wide:      "0.01em",
    wider:     "0.02em",
    widest:    "0.04em",
  },
} as const;

// ─── Spacing (compact = default, spacious = density-increased) ────────────────

export const spacing = {
  compact: {
    0:  0,
    2:  2,
    3:  4,
    4:  6,
    5:  8,
    6:  10,
    7:  12,
    8:  16,
    9:  20,
    10: 24,
    11: 28,
    12: 32,
    13: 36,
    14: 40,
    15: 44,
    18: 64,
  },
  spacious: {
    0:  0,
    2:  4,
    3:  8,
    4:  10,
    5:  12,
    6:  14,
    7:  16,
    8:  20,
    9:  24,
    10: 28,
    11: 32,
    12: 36,
    13: 40,
    14: 44,
    15: 48,
    18: 76,
  },
} as const;

// ─── Icon sizes ───────────────────────────────────────────────────────────────

export const iconSize = {
  compact: {
    xs:  12,
    sm:  16,
    md:  20,
    lg:  24,
    xl:  28,
    "2xl": 32,
  },
  spacious: {
    xs:  14,
    sm:  18,
    md:  22,
    lg:  26,
    xl:  30,
    "2xl": 34,
  },
} as const;

// ─── Border radius (default = sharper, rounded = softer) ──────────────────────

export const radius = {
  default: {
    1:  2,
    2:  4,
    3:  6,
    4:  8,
    5:  10,
    6:  12,
    7:  16,
    10: 1000,
  },
  rounded: {
    1:  4,
    2:  6,
    3:  8,
    4:  10,
    5:  16,
    6:  20,
    7:  28,
    10: 2000,
  },
} as const;

// ─── Animation ────────────────────────────────────────────────────────────────

export const animation = {
  duration: {
    fast:   "100ms",
    normal: "200ms",
    slow:   "300ms",
    slower: "500ms",
  },
  easing: {
    linear:    "linear",
    ease:      "ease",
    easeIn:    "cubic-bezier(0.4, 0, 1, 1)",
    easeOut:   "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

// ─── Root export ──────────────────────────────────────────────────────────────

export const tokens = {
  palette,
  semantic,
  typography,
  spacing,
  iconSize,
  radius,
  animation,
} as const;

export type Palette      = typeof palette;
export type Semantic     = typeof semantic;
export type Typography   = typeof typography;
export type Spacing      = typeof spacing;
export type IconSize     = typeof iconSize;
export type Radius       = typeof radius;
export type Animation    = typeof animation;
export type Tokens       = typeof tokens;

export default tokens;
