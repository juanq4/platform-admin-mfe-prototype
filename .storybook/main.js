const webpack = require("webpack");
const moduleFederationConfig = require("../config/webpack.moduleFederationConfig");

require("dotenv").config({ path:"./config/env/.env" });

const {
  withStorybookModuleFederation,
} = require("@q4/storybook-module-federation");

const storybookConfig = {
  "stories": ['../src/modules/**/*.stories.tsx', '../src/common/components/**/*.stories.tsx'],
  "addons": ['@storybook/addon-links', '@storybook/addon-essentials'],
  "framework": '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      })
    ])
    return config;
  },
};

module.exports = withStorybookModuleFederation(moduleFederationConfig)(
  storybookConfig
);
