import type { StorybookConfig } from "@storybook/web-components-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/web-components-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  staticDirs: ['../dist'],
  docs: {
    autodocs: "tag",
  },
};
export default config;
