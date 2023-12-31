global.getConfigEnvironment = () => "local";

import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { TextEncoder, TextDecoder } from "util";
import { reactTransitionGroupConfig } from "@q4/nimbus-ui";
import { mockWindowMethods } from "../../src/__mocks__/utils/helpers";
import { createAppWrapper, destroyAppWrapper } from "../../src/__mocks__/utils/wrappers";
import { configure } from "../../src/utils/testUtils";

jest.mock("../env/env", () => ({
  env: {
    apollo: { gatewayUrl: "https://connect.dev.q4inc.com/api/eds" },
    auth0: {},
    featureFlag: {},
    launchDarkly: { featureFlag: {} },
    role: { labelSuffix: "[DEV]" },
  },
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

jest.mock("@q4/nimbus-ui", () => {
  const originalModule = jest.requireActual("@q4/nimbus-ui");

  return {
    ...originalModule,
    useDebounce: jest.fn((arg) => arg),
    useDeviceConfig: jest.fn((arg) => arg),
  };
});

// jsdom does not have a TextEncoder defined in global for the DOM
// https://stackoverflow.com/questions/57712235/referenceerror-textencoder-is-not-defined-when-running-react-scripts-test
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.BroadcastChannel = jest.fn().mockImplementation(() => {
  return {
    postMessage: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
});

reactTransitionGroupConfig.disabled = true;

jest.setTimeout(20000);

beforeEach(() => {
  createAppWrapper();
  mockWindowMethods();
});

afterEach(() => {
  destroyAppWrapper();
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

// This is needed to test nimbus components as we cant add aria-labels or addition props to some components
configure({ asyncUtilTimeout: 10000, testIdAttribute: "id" });
