const moduleFederationConfig = {
  name: "seed",
  filename: "remoteEntry.js",
  exposes: {
    "./seed": "./src/modules/sampleModule/sampleModule.component",
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
