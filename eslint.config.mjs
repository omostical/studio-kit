// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  ...storybook.configs["flat/recommended"],
  // Screens are built from Studio Kit components (AGENTS.md rule 1). Warnings, and CI runs eslint with
  // --max-warnings=0: a raw element merges only with `// eslint-disable-next-line no-restricted-syntax -- <the
  // component that is missing>`, so every exception names its gap.
  {
    files: ["src/app/**/*.tsx"],
    rules: {
      "no-restricted-syntax": [
        "warn",
        ...[
          ["button", "Use Button or IconButton from @/components."],
          ["input", "Use Input, Checkbox or Switch from @/components."],
          ["select", "Use Select + SelectItem from @/components."],
          ["textarea", "No Textarea component exists yet (planned)."],
        ].map(([el, use]) => ({
          selector: `JSXOpeningElement[name.name='${el}']`,
          message: `${use} If no component can do this, keep the raw <${el}> with \`// eslint-disable-next-line no-restricted-syntax -- <the missing component>\` and name the gap in your report.`,
        })),
      ],
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: ["@radix-ui/*"],
              message:
                "Import the Studio Kit component from @/components instead (it wraps Radix with tokens, states and a11y). If none exists, check docs/figma-descriptions/index.json: a `planned` component has no code, so name the gap in your report rather than building it from Radix.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
