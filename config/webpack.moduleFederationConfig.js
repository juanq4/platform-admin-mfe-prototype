const moduleFederationConfig = {
  name: "admin",
  filename: "remoteEntry.js",
  exposes: {
    "./admin": "./src/modules/Admin/Admin.component",
  },
  shared: {
    "react": {
      requiredVersion: ">=17.0.0",
      strictVersion: true,
      singleton: true,
    },
    "react-dom": {
      requiredVersion: ">=17.0.0",
      strictVersion: true,
      singleton: true,
    },
  },
};

module.exports = moduleFederationConfig;
