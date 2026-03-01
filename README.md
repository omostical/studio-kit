# Studio Kit

A modern design system library — tokens, components, and an interactive playground. Built with Next.js, TypeScript, Tailwind CSS v4, Radix UI, and Storybook.

## What's inside

| Section | Description |
|---|---|
| **Tokens** | Colors, typography, spacing, shadows, border-radius, animation — `/src/tokens` |
| **Components** | Button, Badge, Input, Card, Typography, Switch, Select — `/src/components` |
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
├── app/
│   ├── page.tsx              # Homepage
│   ├── tokens/page.tsx       # Token reference
│   ├── components/page.tsx   # Component showcase
│   └── playground/page.tsx   # Interactive explorer
├── components/
│   ├── Button/
│   ├── Badge/
│   ├── Card/
│   ├── Input/
│   ├── Select/
│   ├── Switch/
│   └── Typography/
├── tokens/
│   └── index.ts              # All design tokens
└── lib/
    └── utils.ts              # cn() helper
```
