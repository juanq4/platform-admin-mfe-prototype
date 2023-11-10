/* eslint @typescript-eslint/no-var-requires: 0 */
const { testrail } = require("./package.json");

// module.exports = {
//   snapshotSerializers: ["@emotion/jest/serializer"],
//   setupFiles: ["jest-launchdarkly-mock"],
//   setupFilesAfterEnv: ["./config/jest.ts"],
//   testEnvironment: "jsdom",
//   moduleNameMapper: {
//     "^.+\\.svg$": "jest-svg-transformer",
//     "^.+\\.(s?css)$": "<rootDir>/config/styleStub.js",
//   },
//   transform: {
//     ".*\\.(tsx?)$": [
//       "@swc/jest",
//       {
//         jsc: {
//           transform: {
//             react: {
//               runtime: "automatic",
//             },
//           },
//         },
//       },
//     ],
//   },
//   watchPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/testrail-report.json"],
//   collectCoverageFrom: [".deploy/**/*.{js}", "src/**/*.{ts,tsx}", "!src/**/index.ts"],
//   modulePathIgnorePatterns: ["e2e.spec.ts"],
//   reporters: [
//     "default",
//     ["@q4/stratus-jest-reporter", { project_id: testrail.unit.project_id, suite_id: testrail.unit.suite_id }],
//   ],
//   resolver: `${__dirname}/src/routing/tests.resolver.js`, //Needed for AWS SDK V3 + Jest (https://github.com/cloudflare/miniflare/issues/271)
// };

module.exports = {
  snapshotSerializers: ["@emotion/jest/serializer"],
  setupFiles: ["jest-launchdarkly-mock"],
  setupFilesAfterEnv: ["./config/jest.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // "\\.(css)$": "<rootDir>/config/jest/__mocks__/styleMock.js",
    "^.+\\.svg$": "jest-svg-transformer",
    "^.+\\.(s?css)$": "<rootDir>/config/styleStub.js",
  },
  transform: {
    "\\.[jt]sx?$": "ts-jest",
    // ".*\\.(tsx?)$": [
    //       "@swc/jest",
    //       {
    //         jsc: {
    //           transform: {
    //             react: {
    //               runtime: "automatic",
    //             },
    //           },
    //         },
    //       },
    //     ],
  },
  reporters: [
    "default",
    ["@q4/stratus-jest-reporter", { project_id: testrail.unit.project_id, suite_id: testrail.unit.suite_id }],
  ],
};
