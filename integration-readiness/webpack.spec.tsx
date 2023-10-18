/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
// const { webpackConfig } = require("../storybook/main");
const moduleFederationConfig = require("../config/webpack.moduleFederationConfig");

const { ModuleFederationPlugin } = webpack.container;

describe("webpack config", () => {
  it("has correct path for admin", () => {
    const moduleName = "admin";
    if (moduleFederationConfig instanceof ModuleFederationPlugin) {
      expect(moduleFederationConfig._options.exposes[`./${moduleName}`]).toMatch(/.\/src\/[\w\/]+\/admin.component/i);
    }
  });
});
