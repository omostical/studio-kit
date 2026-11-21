import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    // MCP server for AI agents at http://localhost:6006/mcp while `npm run storybook` runs (see AGENTS.md).
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  features: {
    // Machine-readable component API (props from TypeScript + JSDoc, stories, snippets) at
    // /manifests/components.json — what agents read through the MCP server. Preview feature.
    componentsManifest: true,
  },
  typescript: {
    // Accurate prop types for TS components (union values, defaults, JSDoc) in docs and the manifest.
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
