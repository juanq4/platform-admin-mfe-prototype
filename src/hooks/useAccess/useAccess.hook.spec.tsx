// import { Entitlement, OrganizationType, Permission } from "@q4/platform-definitions";
// import { renderHook } from "@testing-library/react";
// import { mockFlags } from "jest-launchdarkly-mock";
// import { FeatureFlag } from "../../configurations/feature.configuration";
// import { useUser } from "../../contexts/user/user.hook";
// import { hasEngagementAnalyticsEntitlement } from "../../utils/entitlement/entitlement.utils";
// import { useAccount } from "../useAccount/useAccount.hook";
// import { useClaims } from "../useClaims/useClaims.hook";
// import { useAccess } from "./useAccess.hook";

// jest.mock("../../contexts/user/user.hook");
// const mockedUseUser = useUser as jest.Mock;

// jest.mock("../../hooks/useAccount/useAccount.hook");
// const mockUseAccount = useAccount as jest.Mock;

// jest.mock("../useClaims");
// const mockUseClaims = useClaims as jest.Mock;

// jest.mock("../../utils");
// const mockHasEngagementAnalyticsEntitlement = hasEngagementAnalyticsEntitlement as jest.Mock;

// describe("useAccess", () => {
//   beforeAll(() => {
//     mockUseAccount.mockReturnValue([{}]);
//     mockUseClaims.mockReturnValue({ entitlements: [], permissions: [] });
//     mockedUseUser.mockReturnValue({ user: {} });
//   });

//   beforeEach(() => {
//     mockFlags({});
//   });

//   test("8235715: [Given] the user is a member of an agency [And] the impersonated organization has an Engagement entitlement [Then] the user does not have access to the Engagement Analytics app", () => {
//     mockUseAccount.mockReturnValueOnce({ type: OrganizationType.AGENCY });
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [Entitlement.EngagementAnalytics],
//       permissions: [],
//     });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasEngagementAnalytics).toBe(false);
//   });

//   it("8235716: [Given] user has organization type of 'Agency' [And] the managed organization has no Engagement entitlements [Then] expect 'hasEngagementAnalytics' to return false", () => {
//     mockUseAccount.mockReturnValueOnce({ type: OrganizationType.AGENCY });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasEngagementAnalytics).toBe(false);
//   });

//   test("8235717: [Given] user has organization type of 'Corporate' [And] has Engagement entitlements [Then] expect 'hasEngagementAnalytics' to return true", () => {
//     mockUseAccount.mockReturnValueOnce([{ type: OrganizationType.CORP }]);
//     mockHasEngagementAnalyticsEntitlement.mockReturnValueOnce(true);
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [Entitlement.EngagementAnalytics],
//       permissions: [Permission.EngagementAnalyticsAccessApp],
//     });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasEngagementAnalytics).toBe(true);
//   });

//   test("9348949: [Given] the user has permission to use the CRM app [And] the CRM feature flag is on [Then] the user has access to the CRM app", () => {
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [Entitlement.Crm],
//       permissions: [Permission.AccessCrm],
//     });
//     mockFlags({
//       [FeatureFlag.CRM]: true,
//     });
//     const { result } = renderHook(useAccess);
//     expect(result.current.hasCRM).toBe(true);
//   });

//   test("9349501: [Given] the CRM feature flag is off [Then] the user does not have access to the CRM app", () => {
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [Entitlement.Crm],
//       permissions: [Permission.AccessCrm],
//     });
//     mockFlags({
//       [FeatureFlag.CRM]: false,
//     });
//     const { result } = renderHook(useAccess);
//     expect(result.current.hasCRM).toBe(false);
//   });

//   test("10068749: [Given] the Insight feature flag is off [Then] the user does not have access to the Insight app", () => {
//     mockFlags({
//       [FeatureFlag.Insight]: false,
//     });
//     const { result } = renderHook(useAccess);
//     expect(result.current.hasInsight).toBe(false);
//   });

//   test("9349502: [Given] the organization does not have CRM permissions [Then] the user does not have access to the CRM app", () => {
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [Entitlement.Crm],
//       permissions: [],
//     });
//     mockFlags({
//       [FeatureFlag.CRM]: true,
//     });
//     const { result } = renderHook(useAccess);
//     expect(result.current.hasCRM).toBe(false);
//   });

//   test("8010050: [Given] the organization has the Earnings Management entitlement [And] the user has the AccessEarnings permission [And] the Earnings Management feature flag is on [Expect] hasEarningsManagement to return true", () => {
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [Entitlement.Earnings],
//       permissions: [Permission.AccessEarnings],
//     });
//     mockFlags({
//       [FeatureFlag.EarningsManagement]: true,
//     });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasEarningsManagement).toBe(true);
//   });

//   test("8388133: [Given] the organization does not have the Earnings Management entitlement [And] the user has the AccessEarnings permission [Expect] hasEarningsManagement to return false", () => {
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [],
//       permissions: [Permission.AccessEarnings],
//     });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasEarningsManagement).toBe(false);
//   });

//   test("8388134: [Given] the organization has the Earnings Management entitlement [And] the user does not have the AccessEarnings permission [Expect] hasEarningsManagement to return false", () => {
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [Entitlement.Earnings],
//       permissions: [],
//     });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasEarningsManagement).toBe(false);
//   });

//   test("8388135: [Given] the user is a member of an Admin organization [And] the user has the AccessEarnings permission [Expect] hasEarningsManagement to return true", () => {
//     mockFlags({ [FeatureFlag.EarningsManagement]: true });
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [],
//       permissions: [Permission.ReadOrgs, Permission.AccessEarnings],
//     });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasEarningsManagement).toBe(true);
//   });

//   test("8010051: [Given] the organization does not have the Earnings Management entitlement [Expect] hasEarningsManagement to return false", () => {
//     const { result } = renderHook(useAccess);
//     expect(result.current.hasEarningsManagement).toBe(false);
//   });

//   test("8420182: [Given] user logs into CC [And] the user’s organization has a studio entitlement [And] a user has website-management::access:app permission in their token claims [Then] Website is accessible", () => {
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [Entitlement.Studio],
//       permissions: [Permission.WebsiteManagementAccessApp],
//     });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasWebsite).toBe(true);
//   });

//   test("8420183: [Given] user logs into CC [And] a user does not website-management::access:app permission in their token claims [Then] Website is restricted", () => {
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [Entitlement.Studio],
//       permissions: [],
//     });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasWebsite).toBe(false);
//   });

//   test("8420184: [Given] user logs into CC [And] the user's organization does not have a studio entitlement [Then] Website is restricted", () => {
//     const { result } = renderHook(useAccess);
//     expect(result.current.hasWebsite).toBe(false);
//   });

//   test("8772641: [Given] the user is a member of an admin organization [Then] the user has access to Q4 Admin Help", () => {
//     mockUseAccount.mockReturnValueOnce([{ type: OrganizationType.ADMIN }]);

//     const { result } = renderHook(useAccess);
//     expect(result.current.showQ4AdminHelp).toBe(true);
//   });

//   test("8772642: [Given] the user is not a member of an admin organization [Then] the user does not have access to Q4 Admin Help", () => {
//     const { result } = renderHook(useAccess);
//     expect(result.current.showQ4AdminHelp).toBe(false);
//   });

//   test("8847455: [Given] the user is a member of an admin organization [And] not impersonating a client [Then] the user has access to Q4 Admin page", () => {
//     mockUseAccount.mockReturnValueOnce([{ type: OrganizationType.ADMIN }]);
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [],
//       permissions: [Permission.ReadOrgs],
//     });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasAdmin).toBe(true);
//   });

//   test("8847456: [Given] the user is a member of an admin organization [And] is impersonating a client [Then] the user does not have access to Q4 Admin page", () => {
//     mockUseAccount.mockReturnValueOnce([{ type: OrganizationType.ADMIN }]);
//     mockedUseUser.mockReturnValueOnce({ isImpersonatingClient: true });
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [],
//       permissions: [Permission.ReadOrgs, Permission.ImpersonateClient],
//     });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasAdmin).toBe(false);
//   });

//   test("8847457: [Given] the user is not a member of an admin organization [Then] the user does not have access to Q4 Admin page", () => {
//     const { result } = renderHook(useAccess);
//     expect(result.current.hasAdmin).toBe(false);
//   });

//   test("8982077: [Given] the notification preferences feature flag is on [And] the user is not impersonating [And] the user's organization is corporate [And] the user is entitled to an app with notifications [Then] the user has access to Notification Preferences", () => {
//     mockFlags({ [FeatureFlag.NotificationPreferences]: true });
//     mockedUseUser.mockReturnValueOnce({ isImpersonatingClient: false, user: {} });
//     mockUseAccount.mockReturnValueOnce([{ type: OrganizationType.CORP }]);
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [Entitlement.EngagementAnalytics],
//       permissions: [Permission.EngagementAnalyticsAccessApp],
//     });
//     mockHasEngagementAnalyticsEntitlement.mockReturnValueOnce(true);

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasNotificationPreferences).toBe(true);
//   });

//   test("8982078: [Given] the notification preferences feature flag is off [Then] the user does not have access to Notification Preferences", () => {
//     mockFlags({ [FeatureFlag.NotificationPreferences]: false });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasNotificationPreferences).toBe(false);
//   });

//   test("8982079: [Given] the user is impersonating [Then] the user does not have access to Notification Preferences", () => {
//     mockedUseUser.mockReturnValueOnce({ isImpersonatingClient: true });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasNotificationPreferences).toBe(false);
//   });

//   test("8982080: [Given] the user's organization is not corporate [Then] the user does not have access to Notification Preferences", () => {
//     mockUseAccount.mockReturnValueOnce([{ type: undefined }]);

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasNotificationPreferences).toBe(false);
//   });

//   test("8982081: [Given] the user is not entitled to an app with notifications [Then] the user does not have access to Notification Preferences", () => {
//     mockFlags({ [FeatureFlag.NotificationPreferences]: true });
//     mockedUseUser.mockReturnValueOnce({ isImpersonatingClient: false, user: {} });
//     mockUseAccount.mockReturnValueOnce([{ type: OrganizationType.CORP }]);
//     mockUseClaims.mockReturnValueOnce({
//       entitlements: [Entitlement.EngagementAnalytics],
//       permissions: [],
//     });

//     const { result } = renderHook(useAccess);
//     expect(result.current.hasNotificationPreferences).toBe(false);
//   });

//   describe("Q4 Desktop Launcher", () => {
//     test("8938521: [Given] the Q4 Desktop Launcher feature flag is on [And] my organization is entitled to Desktop [And] I have permission to use Desktop [Then] I have access to Q4 Desktop", () => {
//       mockFlags({ [FeatureFlag.DesktopLauncher]: { isEnabled: true } });
//       mockUseClaims.mockReturnValueOnce({ entitlements: [Entitlement.Desktop], permissions: [Permission.DesktopAccessApp] });

//       const { result } = renderHook(useAccess);
//       expect(result.current.showQ4Desktop).toBe(true);
//     });

//     test("9130119: [Given] the Q4 Desktop Launcher feature flag is off [Then] the user has no access to Q4 Desktop", () => {
//       mockFlags({ [FeatureFlag.DesktopLauncher]: { isEnabled: false } });

//       const { result } = renderHook(useAccess);
//       expect(result.current.showQ4Desktop).toBe(false);
//     });

//     test("8938523: [Given] the user's organization is not entitled to Desktop [Then] the user has no access to Q4 Desktop", () => {
//       mockUseClaims.mockReturnValueOnce({ entitlements: [], permissions: [Permission.DesktopAccessApp] });

//       const { result } = renderHook(useAccess);
//       expect(result.current.showQ4Desktop).toBe(false);
//     });

//     test("9577911: [Given] I do not have permission to use Desktop [Then] the user has no access to Q4 Desktop", () => {
//       mockUseClaims.mockReturnValueOnce({ entitlements: [Entitlement.Desktop], permissions: [] });

//       const { result } = renderHook(useAccess);
//       expect(result.current.showQ4Desktop).toBe(false);
//     });
//   });

//   describe("Meeting Scheduler", () => {
//     test("9946007: [Given] Meeting Scheduler feature flag is on [And] my organization is entitled to Meeting Scheduler [And] I have permission to use Meeting Scheduler [Then] I have access to Meeting Scheduler", () => {
//       mockFlags({ [FeatureFlag.MeetingScheduler]: { isEnabled: true } });
//       mockUseClaims.mockReturnValueOnce({
//         entitlements: [Entitlement.MeetingScheduler],
//         permissions: [Permission.MeetingSchedulerAccessApp],
//       });

//       const { result } = renderHook(useAccess);
//       expect(result.current.hasMeetingScheduler).toBe(true);
//     });

//     test("9946008: [Given] the Meeting Scheduler feature flag is off [Then] the user has no access to Meeting Scheduler", () => {
//       mockFlags({ [FeatureFlag.MeetingScheduler]: { isEnabled: false } });

//       const { result } = renderHook(useAccess);
//       expect(result.current.hasMeetingScheduler).toBe(false);
//     });

//     test("9946009: [Given] the user's organization is not entitled to Meeting Scheduler [Then] the user has no access to Meeting Scheduler", () => {
//       mockUseClaims.mockReturnValueOnce({ entitlements: [], permissions: [Permission.MeetingSchedulerAccessApp] });

//       const { result } = renderHook(useAccess);
//       expect(result.current.hasMeetingScheduler).toBe(false);
//     });

//     test("9946010: [Given] I do not have permission to use Desktop [Then] the user has no access to Meeting Scheduler", () => {
//       mockUseClaims.mockReturnValueOnce({ entitlements: [Entitlement.MeetingScheduler], permissions: [] });

//       const { result } = renderHook(useAccess);
//       expect(result.current.hasMeetingScheduler).toBe(false);
//     });
//   });

//   describe("Event Management App", () => {
//     test("10529753: [Given] Event Management App feature flag is on [Then] I have access to Event Management App", () => {
//       mockFlags({ [FeatureFlag.EventManagementApp]: { isEnabled: true } });
//       mockUseClaims.mockReturnValueOnce({ entitlements: [], permissions: [Permission.EventManagementAccessApp] });
//       const { result } = renderHook(useAccess);
//       expect(result.current.hasEventManagementApp).toBe(true);
//     });

//     test("10529754: [Given] Event Management App feature flag is off [Then] the user has no access to Event Management App", () => {
//       mockFlags({ [FeatureFlag.EventManagementApp]: { isEnabled: false } });
//       const { result } = renderHook(useAccess);
//       expect(result.current.hasEventManagementApp).toBe(false);
//     });
//   });

//   describe("Home App", () => {
//     test("10997128: [Given] Home App feature flag is on [And] I am in Corporate organization [Then] I have access to Home App", () => {
//       mockFlags({ [FeatureFlag.Home]: true });
//       mockUseAccount.mockReturnValue([{ type: OrganizationType.CORP }]);
//       const { result } = renderHook(useAccess);
//       expect(result.current.hasHome).toBe(true);
//     });

//     test("10997129: [Given] Home App feature flag is off [Then] the user has no access to Home App", () => {
//       const { result } = renderHook(useAccess);
//       expect(result.current.hasHome).toBeFalsy();
//     });

//     test("11023972: [Given] I am not in Corporate organization [Then] I don't have no access to Home App", () => {
//       mockFlags({ [FeatureFlag.Home]: true });
//       mockUseAccount.mockReturnValue([{ type: OrganizationType.AGENCY }]);
//       const { result } = renderHook(useAccess);
//       expect(result.current.hasHome).toBe(false);
//     });
//   });
// });
