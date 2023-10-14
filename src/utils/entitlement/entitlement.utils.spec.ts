import { Entitlement } from "@q4/platform-definitions";
import type { EntitlementCondition } from "../../configurations/entitlement.configuration";
import { FeatureFlag } from "../../configurations/feature.configuration";
import { getAppEntitlementInUse, hasRequiredEntitlement } from "./entitlement.utils";

describe("hasRequiredEntitlement", () => {
  const mockEntitlements = [Entitlement.Studio];
  const mockCondition: EntitlementCondition = {
    entitlements: mockEntitlements,
    featureFlag: FeatureFlag.AdminUserManagement,
  };
  const mockFlag = { [FeatureFlag.AdminUserManagement]: true };

  test("7426290: [Given] all values 'null' [Expect] 'true' to be returned", () => {
    const value = hasRequiredEntitlement(null, null, null);
    expect(value).toBe(true);
  });

  test("7426291: [Given] the users entitlements [And] the entitlement condition have 'studio' [Expect] 'true' to be returned", () => {
    const value = hasRequiredEntitlement(mockEntitlements, null, { ...mockCondition, featureFlag: null });
    expect(value).toBe(true);
  });

  test("7426292: [Given] the users entitlements are 'null', features is 'null' [And] the entitlement condition has 'studio' [Expect] 'true' to be returned", () => {
    const value = hasRequiredEntitlement(null, null, mockCondition);
    expect(value).toBe(true);
  });

  test("7426293: [Given] the users entitlements are 'null', features has an attribute that is 'false' [And] the entitlement condition has 'studio' [Expect] 'true' to be returned", () => {
    const value = hasRequiredEntitlement(null, { [FeatureFlag.AdminUserManagement]: false }, mockCondition);
    expect(value).toBe(true);
  });

  test("7426294: [Given] the users entitlements are 'null', features has an attribute that is 'true' [And] the entitlement condition has 'studio' [Expect] 'false' to be returned", () => {
    const value = hasRequiredEntitlement(null, mockFlag, mockCondition);
    expect(value).toBe(false);
  });

  test("7426295: [Given] the correct entitlement is provided [And] features is 'null' [Expect] 'true' to be returned", () => {
    const value = hasRequiredEntitlement(mockEntitlements, null, mockCondition);
    expect(value).toBe(true);
  });

  test("7426296: [Given] the correct entitlement is provided [And] the required feature flag is set to 'false' [Expect] 'true' to be returned", () => {
    const value = hasRequiredEntitlement(mockEntitlements, { [FeatureFlag.AdminUserManagement]: false }, mockCondition);
    expect(value).toBe(true);
  });

  test("7426297: [Given] the correct entitlement is provided [And] the condition has no feature flag [When] the feature flag is false [Expect] 'true' to be returned", () => {
    const value = hasRequiredEntitlement(
      mockEntitlements,
      { [FeatureFlag.AdminUserManagement]: false },
      { ...mockCondition, featureFlag: null },
    );
    expect(value).toBe(true);
  });

  test("7426298: [Given] no entitlement is provided [And] the condition has no feature flag [When] the feature flag is false [Expect] 'false' to be returned", () => {
    const value = hasRequiredEntitlement(
      null,
      { [FeatureFlag.AdminUserManagement]: false },
      { ...mockCondition, featureFlag: null },
    );
    expect(value).toBe(false);
  });

  test("7426299: [Given] the correct entitlement is provided [And] the required feature flag is set to 'true' [Expect] 'true' to be returned", () => {
    const value = hasRequiredEntitlement(mockEntitlements, mockFlag, mockCondition);
    expect(value).toBe(true);
  });

  test("7426300: [Given] the correct entitlement is not provided [And] the required feature flag is set to 'true' [Expect] 'false' to be returned", () => {
    const value = hasRequiredEntitlement(null, mockFlag, mockCondition);
    expect(value).toBe(false);
  });

  test("7426301: [Given] the correct entitlement is not provided [And] the required feature flag is set to 'false' [Expect] 'true' to be returned", () => {
    const value = hasRequiredEntitlement(null, { [FeatureFlag.AdminUserManagement]: false }, mockCondition);
    expect(value).toBe(true);
  });

  test("7426302: [Given] the correct entitlement is provided, features has an attribute that is 'true' [And] no feature flag is required [Expect] 'true' to be returned", () => {
    const value = hasRequiredEntitlement(mockEntitlements, mockFlag, { ...mockCondition, featureFlag: null });
    expect(value).toBe(true);
  });

  test("7426303: [Given] the correct entitlement is provided, features has an attribute that is 'false' [And] no feature flag is required [Expect] 'true' to be returned", () => {
    const value = hasRequiredEntitlement(
      mockEntitlements,
      { [FeatureFlag.AdminUserManagement]: false },
      { ...mockCondition, featureFlag: null },
    );
    expect(value).toBe(true);
  });
});

describe("getAppEntitlementInUse()", () => {
  test("11543026: [Given] user and app entitlements [Then] returns the entitlement being used by the application", () => {
    expect(
      getAppEntitlementInUse(
        [Entitlement.Crm, Entitlement.Desktop, Entitlement.EngagementAnalyticsStarter],
        [Entitlement.EngagementAnalyticsStarter],
      ),
    ).toBe(Entitlement.EngagementAnalyticsStarter);
  });

  test("11543027: [Given] entitlement in use is not found [Then] returns null", () => {
    expect(
      getAppEntitlementInUse(
        [Entitlement.Crm, Entitlement.Desktop, Entitlement.Events],
        [Entitlement.EngagementAnalyticsStarter],
      ),
    ).toBeNull();
  });
});
