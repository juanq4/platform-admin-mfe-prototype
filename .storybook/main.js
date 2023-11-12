const { withStorybookModuleFederation } = require("@q4/storybook-module-federation");
const moduleFederationConfig = require("../config/webpack.moduleFederationConfig");
const webpackConfig = require("../config/webpack.prod.js");

const storybookConfig = {
  stories: ["../src/modules/**/*.stories.tsx", "../src/components/**/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    config.plugins.push(webpackConfig.plugins[3]);
    config.module.rules.push(...webpackConfig.module.rules);
    return config;
  },
};

module.exports = withStorybookModuleFederation(moduleFederationConfig)(storybookConfig);
