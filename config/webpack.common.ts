/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-var-requires */
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration } from "webpack";
import { DefinePlugin } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { dependencies, version } from "../package.json";

const CopyPlugin = require("copy-webpack-plugin");
// There is a problem with sharing broadcast-channel specifically, so it will not be shared
const { "broadcast-channel": broadcastChannel, ...mostDependencies } = dependencies;

export const moduleFederationPluginOptions = {
  name: "platform_shell",
  filename: "remoteEntry.js",
  shared: {
    ...mostDependencies,
    "react": {
      requiredVersion: dependencies.react,
      singleton: true,
      strictVersion: true,
    },
    "react-dom": {
      requiredVersion: dependencies["react-dom"],
      singleton: true,
      strictVersion: true,
    },
    "@mui/material": {
      requiredVersion: dependencies["@mui/material"],
      singleton: true,
    },
  },
};

const environmentConfig = "environment.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const common = (env: any): Configuration | DevServerConfiguration => {
  return {
    entry: "./src/index",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    output: {
      publicPath: "/",
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
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          loader: "url-loader",
        },
      ],
    },
    performance: {
      maxEntrypointSize: 248000,
      maxAssetSize: 248000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
        environmentConfig,
      }),
      new CopyPlugin({
        patterns: [{ from: `config/env/${environmentConfig}`, to: environmentConfig }],
      }),
      new DefinePlugin({
        "process.env.npm_package_version": JSON.stringify(version),
        "process.env.TARGET_STAGE": JSON.stringify(env.TARGET_STAGE),
      }),
    ],
    experiments: {
      topLevelAwait: true,
    },
  };
};

export default common;
