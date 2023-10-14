import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import type { Configuration } from "webpack";
import { container } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import common, { moduleFederationPluginOptions } from "./webpack.common";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const dev = (env: any): Configuration | DevServerConfiguration => {
  const { ModuleFederationPlugin } = container;

  // isDev is true when running `npm run start:dev`.
  // This makes the app connect to the dev environment MFEs, as opposed to the local MFEs.
  const isDev = env.TARGET_STAGE === "dev";

  return merge(common(env), {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      headers: {
        "Allow-Control-Allow-Origin": "*",
      },
      static: "./dist",
      port: 3000,
      historyApiFallback: true,
      devMiddleware: {
        writeToDisk: true,
      },
      // Fast refresh is not compatible with locally run MFEs
      hot: isDev, // Allow fast refresh on save with no state loss
      liveReload: false, // Prevent page refresh on save
    },
    module: {
      rules: [
        isDev
          ? {
              // To support react-refresh-webpack-plugin
              // https://github.com/pmmmwh/react-refresh-webpack-plugin
              test: /\.(js|jsx|tsx|ts)$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: require.resolve("ts-loader"),
                  options: {
                    getCustomTransformers: () => ({
                      before: [ReactRefreshTypeScript()],
                    }),
                    transpileOnly: true,
                  },
                },
              ],
            }
          : {
              test: /\.(js|jsx|tsx|ts)$/,
              exclude: /node_modules/,
              use: ["ts-loader"],
            },
      ],
    },
    // TODO: Refactor to use a single ModuleFederationPlugin instance in webpack.common.ts
    // const remotes = { local: {...}, dev: {...}, prod: {...} }
    plugins: [
      new ModuleFederationPlugin({
        ...moduleFederationPluginOptions,
        remotes: {
          // Request https://github.com/q4mobile/platform-request-mfe
          request: isDev
            ? "request@https://connect.dev.q4inc.com/mfe/request/remoteEntry.js"
            : "request@//localhost:3002/remoteEntry.js",

          // Engagement Analytics https://github.com/q4mobile/platform-engagement-mfe
          engagement: isDev
            ? "engagement@https://connect.dev.q4inc.com/mfe/engagement/remoteEntry.js"
            : "engagement@//localhost:3003/remoteEntry.js",
          engagementNotification: isDev
            ? "notificationPreferences@https://connect.dev.q4inc.com/mfe/engagement/remoteEntry.js"
            : "notificationPreferences@//localhost:3003/remoteEntry.js",

          // Meeting Scheduler https://github.com/q4mobile/platform-meeting-scheduler-mfe
          meetingScheduler: isDev
            ? "meetingScheduler@https://connect.dev.q4inc.com/mfe/scheduler/remoteEntry.js"
            : "meetingScheduler@//localhost:3004/remoteEntry.js",

          // CRM https://github.com/q4mobile/platform-meeting-scheduler-mfe
          crm: isDev
            ? "crm@https://connect.dev.q4inc.com/mfe/scheduler/remoteEntry.js"
            : "crm@//localhost:3004/remoteEntry.js",

          // Earnings https://github.com/q4mobile/platform-earnings-mfe
          earnings: isDev
            ? "earnings@https://connect.dev.q4inc.com/mfe/earnings/remoteEntry.js"
            : "earnings@//localhost:3005/remoteEntry.js",

          // Insight https://github.com/q4mobile/platform-insight-mfe
          insight: isDev
            ? "insight@https://connect.dev.q4inc.com/mfe/insight/remoteEntry.js"
            : "insight@//localhost:3006/remoteEntry.js",

          // Event Management App https://github.com/q4mobile/platform-events-mfe
          eventManagementApp: isDev
            ? "eventManagementApp@https://connect.dev.q4inc.com/mfe/events/remoteEntry.js"
            : "eventManagementApp@//localhost:3007/remoteEntry.js",

          // Home https://github.com/q4mobile/platform-home-mfe
          home: isDev
            ? "home@https://connect.dev.q4inc.com/mfe/home/remoteEntry.js"
            : "home@//localhost:3008/remoteEntry.js",

          // Platform Workflow https://github.com/q4mobile/platform-workflow-mfe
          workflow: isDev
            ? "workflow@https://connect.dev.q4inc.com/mfe/workflow/remoteEntry.js"
            : "workflow@//localhost:3009/remoteEntry.js",
        },
      }),
      // Fast refresh is not compatible with locally run MFEs
      ...[isDev && new ReactRefreshWebpackPlugin()].filter(Boolean),
    ],
  });
};

export default dev;
