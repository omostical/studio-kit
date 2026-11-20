# Studio Kit

A modern design system library — tokens, components, and an interactive playground. Built with Next.js, TypeScript, Tailwind CSS v4, Radix UI, and Storybook.

## What's inside

| Section | Description |
|---|---|
| **Tokens** | Colors, typography, spacing, shadows, border-radius, animation — `/src/tokens` |
| **Components** | Alert, Badge, Button, Card, Checkbox, IconButton, Input, Select, Switch, Tag, Typography — `/src/components` |
| **Playground** | Interactive component explorer with live prop controls and code snippets — `/playground` |
| **Storybook** | Isolated component docs and tests — runs on `:6006` |

## Getting started

```bash
npm install
```

### Run the design system site
```bash
npm run dev
# → http://localhost:3000
```

### Run Storybook
```bash
npm run storybook
# → http://localhost:6006
```

### Build for production
```bash
npm run build
npm run build-storybook
```

## Tech stack

- **Next.js 16** — App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Radix UI** — accessible primitives
- **class-variance-authority** — variant management
- **Storybook v10** — component documentation
- **Lucide React** — icons

## Project structure

```
src/
├── app/                      # The docs website (Next.js routes)
│   ├── page.tsx              # Homepage
│   ├── tokens/page.tsx       # Token reference
│   ├── components/page.tsx   # Component showcase
│   └── playground/page.tsx   # Interactive explorer
├── components/               # THE DESIGN SYSTEM — one folder per component
│   ├── Button/
│   │   ├── Button.tsx        #   the component (mirrors the Figma component)
│   │   ├── Button.stories.tsx#   Storybook stories
│   │   └── index.ts          #   public export
│   ├── Alert/ Badge/ Card/ Checkbox/ IconButton/
│   ├── Input/ Select/ Switch/ Tag/ Typography/
│   └── index.ts              # import { Button, Badge } from "@/components"
├── site/                     # Docs-website chrome (sidebar, TOC, preview frame) — not part of the kit
├── styles/
│   ├── tokens.light.css      # Semantic + primitive tokens, light theme
│   └── tokens.dark.css       # Dark theme overrides
├── tokens/
│   ├── tokens.json           # Token export from Figma StudioKIT_v1
│   └── index.ts              # Typed token access
└── lib/
    └── utils.ts              # cn() helper
```

## Rules

1. **One component, one folder.** Code, stories and exports live together. Names, variants and sizes match the Figma component.
2. **Semantic tokens only.** Components use role-based tokens (`bg-surface`, `text-text-secondary`, `border-border-brand`), never raw palette classes (`bg-blue-500`) or hex codes. This is what makes dark mode and re-branding work.
3. **Check before you commit:**

```bash
npm run lint:tokens   # fails on hard-coded colours in src/components and the playground
```
