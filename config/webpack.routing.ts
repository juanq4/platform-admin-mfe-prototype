// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ZipPlugin = require("zip-webpack-plugin");

module.exports = {
  entry: {
    shell: "./src/routing/handlers/routing-shell.ts",
    services: "./src/routing/handlers/routing-services.ts",
  },
  optimization: {
    minimize: false,
  },
  target: "node",
  output: {
    path: path.resolve(__dirname, "../dist_routing"),
    filename: "[name].js",
    library: {
      type: "commonjs",
    },
  },
  mode: "production",
  resolve: {
    extensions: [".ts", ".mjs", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts?/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ZipPlugin({
      path: "./",
      filename: "./build.zip",
      extension: "zip",
      fileOptions: {
        compress: true,
        //Same date (oldest javascript date) for every build so lambda only deploys if files inside package change
        mtime: new Date(-8640000000000000),
      },
    }),
  ],
};
