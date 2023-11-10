/* eslint @typescript-eslint/no-var-requires: 0 */
const { testrail } = require("./package.json");

module.exports = {
  setupFilesAfterEnv: ["./config/jest/setup-jest.ts"],
  testEnvironment: "jsdom",
  transform: {
    ".*\\.(tsx?)$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  moduleNameMapper: {
    "^.+\\.svg\\?inline$": "<rootDir>/config/svg/inlineSvg.js",
    "^.+\\.svg$": "jest-svg-transformer",
    "^.+\\.(s?css)$": "<rootDir>/config/jest/styleMock.js",
  },
  reporters: [
    "default",
    ["@q4/stratus-jest-reporter", { project_id: testrail.unit.project_id, suite_id: testrail.unit.suite_id }],
  ],
  snapshotSerializers: ["@emotion/jest/serializer"],
  setupFiles: ["jest-launchdarkly-mock"],
  watchPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/testrail-report.json"],
  collectCoverageFrom: [".deploy/**/*.{js}", "src/**/*.{ts,tsx}", "!src/**/index.ts"],
  // modulePathIgnorePatterns: ["e2e.spec.ts"],
  // resolver: `${__dirname}/src/routing/tests.resolver.js`, //Needed for AWS SDK V3 + Jest (https://github.com/cloudflare/miniflare/issues/271)
};

// shell
/* eslint @typescript-eslint/no-var-requires: 0 */
// const { testrail } = require("./package.json");
