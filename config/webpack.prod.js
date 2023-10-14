/* eslint-disable @typescript-eslint/no-var-requires*/
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const moduleFederationConfig = require("./webpack.moduleFederationConfig");

const { ModuleFederationPlugin } = webpack.container;

const environmentConfig = "environment.js";

// Add to HtmlWebpackPlugin if required
module.exports = {
  mode: "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    publicPath: "auto",
    chunkFilename: "[name].[contenthash].js",
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  performance: {
    maxEntrypointSize: 248000,
    maxAssetSize: 248000,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: `config/env/${environmentConfig}`, to: environmentConfig }],
    }),
    new ModuleFederationPlugin(moduleFederationConfig),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};
