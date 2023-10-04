import type { LDContext } from "launchdarkly-react-client-sdk/lib/context";
import { FeatureFlag } from "../../configurations";

export const LDContextMock: LDContext = {
  flags: {
    [FeatureFlag.AdminUserManagement]: false,
  },
  ldClient: null,
  flagKeyMap: undefined,
};
