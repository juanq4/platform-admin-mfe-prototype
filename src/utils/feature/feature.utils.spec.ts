import { FeatureFlag } from "../../configurations";
import { isFeatureTrue } from "./feature.utils";

const AdminFeatureTrue = {
  [FeatureFlag.AdminUserManagement]: true,
};

const AdminFeatureFalse = {
  [FeatureFlag.AdminUserManagement]: false,
};

describe("isFeatureTrue Tests", () => {
  test("7425319: [Given] the site features are null [And] the feature flag is null [Then] expect isFeatureTrue to return true", () => {
    expect(isFeatureTrue(null, null)).toBe(true);
  });

  test('7425320: [Given] the site features are {"admin-user-management":true} [And] the feature flag is null [Then] expect isFeatureTrue to return true', () => {
    expect(isFeatureTrue(AdminFeatureTrue, null)).toBe(true);
  });

  test('7425321: [Given] the site features are {"admin-user-management":false} [And] the feature flag is null [Then] expect isFeatureTrue to return true', () => {
    expect(isFeatureTrue(AdminFeatureFalse, null)).toBe(true);
  });

  test("7425322: [Given] the site features are null [And] the feature flag is admin-user-management [Then] expect isFeatureTrue to return false", () => {
    expect(isFeatureTrue(null, FeatureFlag.AdminUserManagement)).toBe(false);
  });

  test('7425323: [Given] the site features are {"admin-user-management":true} [And] the feature flag is admin-user-management [Then] expect isFeatureTrue to return true', () => {
    expect(isFeatureTrue(AdminFeatureTrue, FeatureFlag.AdminUserManagement)).toBe(true);
  });

  test('7425324: [Given] the site features are {"admin-user-management":false} [And] the feature flag is admin-user-management [Then] expect isFeatureTrue to return false', () => {
    expect(isFeatureTrue(AdminFeatureFalse, FeatureFlag.AdminUserManagement)).toBe(false);
  });
});
