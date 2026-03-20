import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/app/globals.css";

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark:  "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // replaced by the theme switcher
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
