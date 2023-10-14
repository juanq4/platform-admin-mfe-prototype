/* eslint @typescript-eslint/no-var-requires: 0 */
const { testrail } = require("./package.json");

module.exports = {
  setupFilesAfterEnv: ["./config/jest/setup-jest.ts"],
  testEnvironment: "jsdom",
  transform: {
    "\\.[jt]sx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/config/jest/__mocks__/styleMock.js",
  },
  reporters: [
    "default",
    ["@q4/stratus-jest-reporter", { project_id: testrail.unit.project_id, suite_id: testrail.unit.suite_id }],
  ],
};
