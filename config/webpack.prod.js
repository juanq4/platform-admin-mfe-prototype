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
        test: /\.s?css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "resolve-url-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true, // this is required for the resolve-url-loader
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][ext]",
        },
      },
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: { not: [/inline/] },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /inline/,

        use: ["@svgr/webpack"],
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
