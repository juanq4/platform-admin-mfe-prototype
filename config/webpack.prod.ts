import type { Configuration } from "webpack";
import { container } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
// eslint-disable-next-line import/order
import common, { moduleFederationPluginOptions } from "./webpack.common";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const prod = (env: any): Configuration | DevServerConfiguration => {
  const { ModuleFederationPlugin } = container;
  return merge(common(env), {
    mode: "production",
    devtool: "source-map",
    output: {
      chunkFilename: "[name].[contenthash].js",
      filename: "[name].[contenthash].js",
      clean: true,
      assetModuleFilename: "[hash][ext][query]",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        ...moduleFederationPluginOptions,
        // Expose withoutShell in production only, to avoid incompatibility with fast refresh
        exposes: {
          "./withoutShell": "./src/exposed/withoutShell",
        },
        remotes: {
          // Request https://github.com/q4mobile/platform-request
          request: "request@[window.location.origin]/mfe/request/remoteEntry.js",
          // Engagement Analytics https://github.com/q4mobile/platform-engagement-mfe
          engagement: "engagement@[window.location.origin]/mfe/engagement/remoteEntry.js",
          // Meeting Scheduler https://github.com/q4mobile/platform-meeting-scheduler-mfe
          meetingScheduler: "meetingScheduler@[window.location.origin]/mfe/scheduler/remoteEntry.js",
          // Earnings https://github.com/q4mobile/platform-earnings-mfe
          earnings: "earnings@[window.location.origin]/mfe/earnings/remoteEntry.js",
          // Insight https://github.com/q4mobile/platform-insight-mfe
          insight: "insight@[window.location.origin]/mfe/insight/remoteEntry.js",
          // Event Management App https://github.com/q4mobile/platform-events-mfe
          eventManagementApp: "eventManagementApp@[window.location.origin]/mfe/events/remoteEntry.js",
          // Home https://github.com/q4mobile/platform-home-mfe
          home: "home@[window.location.origin]/mfe/home/remoteEntry.js",
          // Workflow https://github.com/q4mobile/platform-workflow-mfe
          workflow: "workflow@[window.location.origin]/mfe/workflow/remoteEntry.js",
        },
      }),
      new ExternalTemplateRemotesPlugin(),
    ],
  });
};

export default prod;
