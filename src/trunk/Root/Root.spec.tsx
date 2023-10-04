import type { Auth0ProviderOptions } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";
import { createSerializer } from "@emotion/jest";
import { OS, useDeviceConfig } from "@q4/nimbus-ui";
import { OrganizationType, Entitlement } from "@q4/platform-definitions";
import { waitFor } from "@testing-library/react";
import { mockFlags } from "jest-launchdarkly-mock";
import React from "react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { env } from "../../../config";
import { MockOrganization1, MockOrganizations, MockUser, UserContextMock } from "../../__mocks__";
import { Auth0HookMock, MockAuth0Claims, MockAuth0Token } from "../../__mocks__/contexts/Auth0Context.mock";
import {
  AdminLink,
  EarningsManagementLink,
  EngagementAnalyticsLink,
  Entitlements,
  FeatureFlag,
  MeetingSchedulerLink,
  CRMLink,
  InsightLink,
  Role,
  EventManagementAppLink,
  WebsiteLink,
  HomePageLink,
} from "../../configurations";
import { ApplicationName } from "../../configurations/application.configuration";
import { ApplicationProvider, UserContext } from "../../contexts";
import { TokenClaim } from "../../definitions";
import { useAccess, useDataDog, useOrganizationsLazyQuery } from "../../hooks";
import type { AccessHookModel, AccountHookModel } from "../../hooks";
import { useAccount } from "../../hooks/useAccount/useAccount.hook";
import { useClaims } from "../../hooks/useClaims/useClaims.hook";
import { useCreateTrial } from "../../hooks/useCreateTrial/useCreateTrial.hook";
import { useIdTokenClaims } from "../../hooks/useIdTokenClaims/useIdTokenClaims.hook";
import { SubscriptionCondition } from "../../utils";
import { render, screen, within } from "../../utils/testUtils";
import { ViewIdModel as ClientAccountsIdModel } from "../../views/ClientAccounts/ClientAccounts.definition";
import { ViewIdModel as NavigationIdModel } from "../SideNavigation/SideNavigation.definition";
import { RootViewIdModel } from "./Root.definition";
import { Root } from "./Root.view";

expect.addSnapshotSerializer(createSerializer());

jest.mock("@auth0/auth0-react");
const mockAuth0Provider = Auth0Provider as jest.Mock;
jest.mock("../../hooks/useAccount/useAccount.hook");
const mockUseAccount = useAccount as jest.Mock;
jest.mock("../../hooks/useAccess/useAccess.hook");
const mockUseAccess = useAccess as jest.Mock;
jest.mock("../../hooks/useClaims/useClaims.hook");
const mockUseClaims = useClaims as jest.Mock;
jest.mock("../../hooks/useDataDog/useDataDog.hook");
const mockUseDataDog = useDataDog as jest.Mock;
jest.mock("../../hooks/useIdTokenClaims/useIdTokenClaims.hook");
const mockUseIdTokenClaims = useIdTokenClaims as jest.Mock;
jest.mock("../../hooks/useOrganization/useOrganization.hook");
const mockUseOrganizationsLazyQuery = useOrganizationsLazyQuery as jest.Mock;
jest.mock("../../hooks/useCreateTrial/useCreateTrial.hook");
const mockUseTrial = useCreateTrial as jest.Mock;
jest.mock("../../utils/environment", () => ({ isLocalEnvironment: false, isSpotEnvironment: false }));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

const mockUseLocation = useLocation as jest.Mock;

const navIds = {
  admin: NavigationIdModel.navigation.routeList.getId(AdminLink.id),
  insight: NavigationIdModel.navigation.routeList.getId(InsightLink.id),
  engAnalytics: NavigationIdModel.navigation.routeList.getId(EngagementAnalyticsLink.id),
  meetingScheduler: NavigationIdModel.navigation.routeList.getId(MeetingSchedulerLink.id),
  earnings: NavigationIdModel.navigation.routeList.getId(EarningsManagementLink.id),
  crm: NavigationIdModel.navigation.routeList.getId(CRMLink.id),
  eventManagementApp: NavigationIdModel.navigation.routeList.getId(EventManagementAppLink.id),
};

const notFoundErrorTitle = "Oops! Page not found.";

const crossSellingUrl = "https://www.q4inc.com";

describe("Root", () => {
  const mockAccountHookResponse = [
    { entitlements: Entitlements, name: "", active: true },
    { active: true, ...MockUser },
  ] as AccountHookModel;
  const mockAccessHookResponse = { hasEngagementAnalytics: false, hasNotificationPreferences: false } as AccessHookModel;
  const mockDataDogHookResponse = { initializeRUM: jest.fn() };

  const handleOrganizationsQueryMock = jest.fn();
  const organizationsLazyQueryHookResponse = [
    {
      fetching: false,
      error: null,
      data: null,
      operation: null,
      stale: null,
      isCalled: true,
    },
    handleOrganizationsQueryMock,
  ] as unknown as ReturnType<typeof useOrganizationsLazyQuery>;

  function customRender(routes = ["/"], userCtx = UserContextMock) {
    return render(
      <UserContext.Provider value={userCtx}>
        <MemoryRouter initialEntries={routes}>
          <Root />
        </MemoryRouter>
      </UserContext.Provider>,
    );
  }

  function customRenderWithOrgEditPermission() {
    mockUseClaims.mockReturnValue({ ...MockAuth0Claims, permissions: SubscriptionCondition?.Organizations?.permissions });
    return customRender();
  }

  beforeEach(() => {
    mockUseAccount.mockReturnValue(mockAccountHookResponse);
    mockUseAccess.mockReturnValue(mockAccessHookResponse);
    mockUseIdTokenClaims.mockReturnValue(MockAuth0Token);
    mockUseClaims.mockReturnValue(MockAuth0Claims);
    mockUseDataDog.mockReturnValue(mockDataDogHookResponse);
    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsLazyQueryHookResponse);
    mockUseLocation.mockReturnValue({ pathname: "/" });
    mockUseTrial.mockReturnValue({ isTrialInitializing: false });

    mockFlags({
      [FeatureFlag.CrossSellingLinks]: [],
    });

    Auth0HookMock({
      getAccessTokenSilently: jest.fn().mockRejectedValue(new Error("mockError")),
      getIdTokenClaims: jest.fn().mockResolvedValue({
        [TokenClaim.Entitlements]: [Entitlement.Studio],
      }),
    });
    mockAuth0Provider.mockImplementation(({ children }: Auth0ProviderOptions) => children);
    (useDeviceConfig as jest.Mock).mockReturnValue({});
  });

  afterEach(() => {
    jest.resetAllMocks();
    document.defaultView.name = "";
  });

  it("7396076: should render component", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Root />
      </MemoryRouter>,
    );

    const RootLoading = screen.queryByTestId(RootViewIdModel.loading);
    expect(RootLoading).not.toBeInTheDocument();
  });

  test("1163584: [Given] the permissions [And] the account details are not loading [Then] expect the loading screen is not longer present", () => {
    customRender();
    expect(screen.queryByTestId(RootViewIdModel.loading)).not.toBeInTheDocument();
  });

  test("3814865: [Given] the user has the no permissions [Then] expect the Admin link to not be in the navigation", () => {
    customRender();
    expect(screen.queryByTestId(navIds.admin)).not.toBeInTheDocument();
  });

  test("3814863: [Given] the user is a member of an admin organization [And] not impersonating a client [Then] the user has access to Q4 Admin page", () => {
    mockUseAccess.mockReturnValue({ hasAdmin: true });
    customRender();
    expect(screen.getByRole("link", { name: new RegExp(ApplicationName.Admin, "i") })).toBeInTheDocument();
  });

  test("3814864: [Given] the user is not a member of an admin organization [Then] the user does not have access to Q4 Admin page", () => {
    mockUseAccess.mockReturnValue({ hasAdmin: false });
    customRender();
    expect(screen.queryByRole("link", { name: ApplicationName.Admin })).not.toBeInTheDocument();
  });

  test("4216604: [Given] that the user has the Q4 Admin role [And] is not a member of the Corporate Admin role [And] is not a member of the Corporate support role [Then] expect that they are not able to see the Engagement Analytics tab", () => {
    mockUseClaims.mockReturnValue({
      ...MockAuth0Claims,
      permissions: SubscriptionCondition?.OrganizationsEdit?.permissions,
    });
    customRender();
    expect(screen.queryByTestId(navIds.engAnalytics)).not.toBeInTheDocument();
  });

  test("4216606: [Given] that the user has the Q4 Support role [And] is not a member of the Corporate Admin role [And] is not a member of the Corporate support role [Then] expect that they are not able to see the Engagement Analytics tab", () => {
    mockUseClaims.mockReturnValue({ ...MockAuth0Claims, permissions: SubscriptionCondition?.Organizations?.permissions });
    customRender();
    expect(screen.queryByTestId(navIds.engAnalytics)).not.toBeInTheDocument();
  });

  test("4216605: [Given] that the user has the Q4 Admin role [And] has direct URL to engagement entitlement [And] try to access Engagement Analytics using direct URL [Then] expect 404 Not Found error", () => {
    mockUseClaims.mockReturnValue({
      ...MockAuth0Claims,
      permissions: SubscriptionCondition?.OrganizationsEdit?.permissions,
    });
    customRender(["/app/engagement"]);
    expect(screen.getByText(notFoundErrorTitle)).toBeVisible();
  });

  test("4216607: [Given] that the user has the Q4 Support role [And] has direct URL to engagement entitlement [And] try to access engagement using direct URL [Then] expect 404 Not Found error", () => {
    mockUseClaims.mockReturnValue({ ...MockAuth0Claims, permissions: SubscriptionCondition?.Organizations?.permissions });
    customRender(["/app/engagement"]);
    expect(screen.getByText(notFoundErrorTitle)).toBeVisible();
  });

  test("8941058: [Given] the user can see Q4 Desktop [And] the app was not opened from a mobile or tablet [Then] expect Q4 Desktop link to be present", () => {
    mockUseAccess.mockReturnValue({ showQ4Desktop: true });
    customRender();
    expect(screen.getByRole("link", { name: ApplicationName.Q4Desktop })).toHaveAttribute("href", env.q4Desktop.url);
  });

  test("8941059: [Given] the user can see Q4 Desktop [And] is using an Android device [Then] expect the Q4 Go nav item to link to the app in Google Play", () => {
    mockUseAccess.mockReturnValue({ showQ4Desktop: true });
    (useDeviceConfig as jest.Mock).mockReturnValueOnce({ os: OS.Android });
    customRender();
    expect(screen.getByRole("link", { name: ApplicationName.Q4Desktop })).toHaveAttribute(
      "href",
      env.q4Desktop.mobile.androidUrl,
    );
  });

  test("8941060: [Given] the user can see Q4 Desktop [And] is using an iOS device [Then] expect the Q4 Go nav item to link to the app in the App Store", () => {
    mockUseAccess.mockReturnValue({ showQ4Desktop: true });
    (useDeviceConfig as jest.Mock).mockReturnValueOnce({ os: OS.IOS });
    customRender();
    expect(screen.getByRole("link", { name: ApplicationName.Q4Desktop })).toHaveAttribute(
      "href",
      env.q4Desktop.mobile.iosUrl,
    );
  });

  describe("Error Pages", () => {
    test("4326936: [Given] user with no roles authenticate in CC [Then] expect error modal to be displayed [And] expect background to be greyed out", () => {
      mockUseAccount.mockReturnValue([
        { entitlements: Entitlements, name: "", active: true },
        { active: true },
      ] as unknown as AccountHookModel);
      expect(() => customRender()).toThrowError("Account");
    });

    test(`4326937: [Given] user within a '${OrganizationType.CORP}' organization with no entitlements authenticate in CC [Then] expect error page to be displayed`, () => {
      mockUseAccount.mockReturnValue([{ ...MockOrganization1 }, { active: true }] as unknown as AccountHookModel);

      mockUseClaims.mockReturnValue({ ...MockAuth0Claims, entitlements: undefined });
      expect(() => customRender()).toThrowError("Account");
    });

    test(`8588544: [Given] user within an '${OrganizationType.ADMIN}' organization with no organization entitlements authenticate in CC [Then] expect error page to not be displayed`, () => {
      mockUseAccount.mockReturnValue([
        { ...MockOrganization1, type: OrganizationType.ADMIN },
        { active: true, roles: [Role.Q4Admin] },
      ] as unknown as AccountHookModel);

      mockUseClaims.mockReturnValue({ ...MockAuth0Claims, entitlements: undefined });
      expect(() => customRender()).not.toThrowError("Account");
    });

    test(`8588545: [Given] user within an '${OrganizationType.AGENCY}' organization with no organization entitlements authenticate in CC [Then] expect error page to not be displayed`, () => {
      mockUseAccount.mockReturnValue([
        { ...MockOrganization1, type: OrganizationType.AGENCY },
        { active: true, roles: [Role.AgencyUser] },
      ] as unknown as AccountHookModel);

      mockUseClaims.mockReturnValue({ ...MockAuth0Claims, entitlements: undefined });
      expect(() => customRender()).not.toThrowError("Account");
    });

    test("4326938: [Given] user with missing email claim authenticated in CC [Then] expect error modal to be displayed [And ] expect background to be greyed out", () => {
      mockUseClaims.mockReturnValue({ ...MockAuth0Claims, email: undefined });
      expect(() => customRender()).toThrowError("Account");
    });

    test("4326939: [Given] user with missing organization ID authenticate in CC [Then] expect error modal to be displayed [And] expect background to be greyed out", () => {
      mockUseClaims.mockReturnValue({ ...MockAuth0Claims, organizationId: undefined });
      expect(() => customRender()).toThrowError("Account");
    });

    test("4326941: [Given] user with deactivated organization authenticate in CC [Then] expect inactive subscription error modal to be displayed [And] background to be greyed out", () => {
      mockUseAccount.mockReturnValue([
        { entitlements: Entitlements, name: "", active: false },
        { active: true, roles: [Role.Q4Admin] },
      ] as unknown as AccountHookModel);
      expect(() => customRender()).toThrowError("Subscription");
    });

    test("4326942: [Given] user with deactivated account authenticate in CC [Then] expect inactive subscription error modal to be displayed [And] expect background to be greyed out", () => {
      mockUseAccount.mockReturnValue([
        { entitlements: Entitlements, name: "", active: false },
        { active: false, roles: [Role.Q4Admin] },
      ] as unknown as AccountHookModel);
      expect(() => customRender()).toThrowError("Subscription");
    });

    test("5112904: [Given] I am a user of Capital Connect [And] I belong to an organization of type 'Agency' [And] and my client account list contains more than one organization [Then] I can see a Client Accounts view [And] I cannot see the sidebar for entitlements", () => {
      const agencyOrganizationMock = { ...mockAccountHookResponse[0], type: OrganizationType.AGENCY };
      const organizationsLazyQueryHookOneOrgResponse = [
        {
          fetching: false,
          error: null,
          data: { organizations: { items: MockOrganizations } },
          operation: null,
          stale: null,
          isCalled: true,
        },
        handleOrganizationsQueryMock,
      ] as unknown as ReturnType<typeof useOrganizationsLazyQuery>;

      mockUseAccount.mockReturnValue([agencyOrganizationMock, mockAccountHookResponse[1]]);
      mockUseOrganizationsLazyQuery.mockReturnValue(organizationsLazyQueryHookOneOrgResponse);

      customRender();

      expect(screen.getByTestId(ClientAccountsIdModel.id)).toBeInTheDocument();
      expect(screen.queryByTestId(RootViewIdModel.landing)).not.toBeInTheDocument();
    });

    test("5112901: [Given] I am a user of Capital Connect [And] I belong to an organization of no type or a type 'Corporate' [And] my organization belongs to an Agency [When] I log into the platform [Then] I can see the landing view", () => {
      const corpOrganizationMock = { ...mockAccountHookResponse[0], type: OrganizationType.CORP };
      mockUseAccount.mockReturnValue([corpOrganizationMock, mockAccountHookResponse[1]]);

      customRender();

      expect(corpOrganizationMock.type).toBe(OrganizationType.CORP);
      expect(screen.getByTestId(RootViewIdModel.landing)).toBeInTheDocument();
    });

    test("5112900: [Given] I am a user of Capital Connect [And] I belong to an organization of no type or a type 'Corporate' [When] I log into the platform [Then] I can see the landing view", () => {
      mockUseAccount.mockReturnValue([mockAccountHookResponse[0], mockAccountHookResponse[1]]);

      customRender();

      expect(mockAccountHookResponse[0].type).toBe(undefined);
      expect(screen.getByTestId(RootViewIdModel.landing)).toBeInTheDocument();
    });
  });

  test("5430018: [Given] I am authenticated CC user [And] launch darkly cross-selling flag is OFF for my org [And] no cross sell links are configured [Then] expect no cross selling links to be present in left navigation panel", () => {
    mockFlags({ [FeatureFlag.CrossSellingLinks]: [] });

    customRenderWithOrgEditPermission();

    expect(screen.queryByTestId("Q4PlatformShellNavigationCrossSellingtestlinkRouteLink")).not.toBeInTheDocument();
  });

  test("7396077: [Given] I am authenticated CC user [And] launch darkly cross-selling flag is ON [And] feature flag data is malformed [Then] expect no cross selling links to be present in left navigation panel", () => {
    mockFlags({ [FeatureFlag.CrossSellingLinks]: true });

    customRenderWithOrgEditPermission();

    expect(screen.queryByTestId("Q4PlatformShellNavigationCrossSellingtestlinkRouteLink")).not.toBeInTheDocument();
  });

  test("5430025: [Given] I am authenticated CC user [And] launch darkly cross-selling flag is ON [And] single cross-selling link is configured [Then] expect single cross selling link to be present in left navigation panel", () => {
    const expectedLinks = [{ label: "Test Link", url: crossSellingUrl }];
    mockFlags({
      [FeatureFlag.CrossSellingLinks]: expectedLinks,
    });

    customRenderWithOrgEditPermission();

    const routeItem = screen.getByTestId(
      `Q4PlatformShellNavigationCrossSelling${expectedLinks[0].label.toLowerCase().split(" ").join("")}RouteLink`,
    );
    expect(routeItem).toBeVisible();
    expect(within(routeItem).getByText(expectedLinks[0].label)).toBeVisible();
  });

  test("5430337: [Given] I am authenticated  CC user [And] launch darkly cross-selling flag is ON [And] multiple cross-selling links are configured [Then] expect all configured cross selling links to be present in left navigation panel", () => {
    const expectedLinks = [
      { label: "Test Link 1", url: crossSellingUrl },
      { label: "Test Link 2", url: `${crossSellingUrl}/cc` },
    ];
    mockFlags({
      [FeatureFlag.CrossSellingLinks]: expectedLinks,
    });

    customRenderWithOrgEditPermission();

    expectedLinks.forEach((link) => {
      const routeItem = screen.getByTestId(
        `Q4PlatformShellNavigationCrossSelling${link.label.toLowerCase().split(" ").join("")}RouteLink`,
      );
      expect(routeItem).toBeVisible();
      expect(within(routeItem).getByText(link.label)).toBeVisible();
    });
  });

  test("5430338: [Given] I am authenticated  CC user [And] multiple cross-selling links are visible in left navigation panel [When] each cross-selling link is clicked [Then] expect a new browser tab to open separately each cross sell link", () => {
    const links = [{ label: "Test Link", url: crossSellingUrl }];
    mockFlags({
      [FeatureFlag.CrossSellingLinks]: links,
    });

    customRenderWithOrgEditPermission();

    const routeItem = screen.getByTestId(
      `Q4PlatformShellNavigationCrossSelling${links[0].label.toLowerCase().split(" ").join("")}RouteLink`,
    ) as HTMLAnchorElement;
    expect(routeItem.target).toEqual("_blank");
  });

  test("5430339: [Given] I am authenticated  CC user [And] cross-selling link is visible [When] cross-selling link is clicked [Then] expect user email info to be passed to external URL in the new tab", () => {
    const links = [{ label: "Test Link", url: crossSellingUrl }];
    mockFlags({
      [FeatureFlag.CrossSellingLinks]: links,
    });

    customRenderWithOrgEditPermission();

    const routeItem = screen.getByTestId(
      `Q4PlatformShellNavigationCrossSelling${links[0].label.toLowerCase().split(" ").join("")}RouteLink`,
    ) as HTMLAnchorElement;
    const search = new URL(routeItem.href).search;
    const params = new URLSearchParams(search);
    expect(params.get("email")).toEqual(mockAccountHookResponse[1].email);
  });

  test("5430341: [Given] I am authenticated Capital Connect user [And] cross selling link is visible [When] cross selling link is clicked [Then] user org_id parameter is passed to external URL in new tab", () => {
    const links = [{ label: "Test Link", url: crossSellingUrl }];
    mockFlags({
      [FeatureFlag.CrossSellingLinks]: links,
    });

    customRenderWithOrgEditPermission();

    const routeItem = screen.getByTestId(
      `Q4PlatformShellNavigationCrossSelling${links[0].label.toLowerCase().split(" ").join("")}RouteLink`,
    ) as HTMLAnchorElement;
    const search = new URL(routeItem.href).search;
    const params = new URLSearchParams(search);
    expect(params.get("org_id")).toEqual(MockAuth0Claims.organizationId);
  });

  test("5430342: [Given] I am authenticated Capital Connect user [And] cross selling link is visible [When] cross selling link is clicked [Then] first_name parameter is passed to external URL in new tab", () => {
    const links = [{ label: "Test Link", url: crossSellingUrl }];
    mockFlags({
      [FeatureFlag.CrossSellingLinks]: links,
    });

    customRenderWithOrgEditPermission();

    const routeItem = screen.getByTestId(
      `Q4PlatformShellNavigationCrossSelling${links[0].label.toLowerCase().split(" ").join("")}RouteLink`,
    ) as HTMLAnchorElement;
    const search = new URL(routeItem.href).search;
    const params = new URLSearchParams(search);
    expect(params.get("first_name")).toEqual(mockAccountHookResponse[1].firstName);
  });

  test("5430343: [Given] I am authenticated Capital Connect user [And] cross selling link is visible [When] cross selling link is clicked [Then] last_name parameter is passed to external URL in new tab", () => {
    const links = [{ label: "Test Link", url: crossSellingUrl }];
    mockFlags({
      [FeatureFlag.CrossSellingLinks]: links,
    });

    customRenderWithOrgEditPermission();

    const routeItem = screen.getByTestId(
      `Q4PlatformShellNavigationCrossSelling${links[0].label.toLowerCase().split(" ").join("")}RouteLink`,
    ) as HTMLAnchorElement;
    const search = new URL(routeItem.href).search;
    const params = new URLSearchParams(search);
    expect(params.get("last_name")).toEqual(mockAccountHookResponse[1].lastName);
  });

  test("8101428: [Given] the organization does not have any of the Engagement Analytics Entitlements [Then] expect the Engagement Analytics link to not appear in the SideNavigation", () => {
    mockUseClaims.mockReturnValue({
      ...MockAuth0Claims,
      entitlements: [Entitlement.Studio],
    });

    customRender();

    const routeItem = screen.queryByTestId(navIds.engAnalytics);
    expect(routeItem).not.toBeInTheDocument();
  });

  test("8101425: [Given] the organization has the Earnings Management entitlement (Legacy) [Then] expect the Engagement Analytics link to appear in the SideNavigation", () => {
    mockUseClaims.mockReturnValue({
      ...MockAuth0Claims,
      entitlements: [Entitlement.Studio, Entitlement.EngagementAnalytics],
    });
    mockUseAccount.mockReturnValue(mockAccountHookResponse);
    mockUseAccess.mockReturnValue({ ...mockAccessHookResponse, hasEngagementAnalytics: true });

    customRender();

    const routeItem = screen.queryByTestId(navIds.engAnalytics);
    expect(routeItem).toBeInTheDocument();
  });

  test("8101426: [Given] the organization has the Earnings Management entitlement (Starter) [Then] expect the Engagement Analytics link to appear in the SideNavigation", () => {
    mockUseClaims.mockReturnValue({
      ...MockAuth0Claims,
      entitlements: [Entitlement.Studio, Entitlement.EngagementAnalyticsStarter],
    });
    mockUseAccount.mockReturnValue(mockAccountHookResponse);
    mockUseAccess.mockReturnValue({ ...mockAccessHookResponse, hasEngagementAnalytics: true });

    customRender();

    const routeItem = screen.queryByTestId(navIds.engAnalytics);
    expect(routeItem).toBeInTheDocument();
  });

  test("8101427: [Given] the organization has the Earnings Management entitlement (Base) [Then] expect the Engagement Analytics link to appear in the SideNavigation", () => {
    mockUseClaims.mockReturnValue({
      ...MockAuth0Claims,
      entitlements: [Entitlement.Studio, Entitlement.EngagementAnalyticsBase],
    });
    mockUseAccount.mockReturnValue(mockAccountHookResponse);
    mockUseAccess.mockReturnValue({ ...mockAccessHookResponse, hasEngagementAnalytics: true });

    customRender();

    const routeItem = screen.queryByTestId(navIds.engAnalytics);
    expect(routeItem).toBeInTheDocument();
  });

  test("5520485: [Given] the organization has the Meeting Scheduler entitlement [And] the Meeting Scheduler feature flag is on [Expect] Meeting Scheduler to appear in the SideNavigation", () => {
    mockFlags({ [FeatureFlag.MeetingScheduler]: true });
    mockUseAccess.mockReturnValue({ hasMeetingScheduler: true });

    customRender();

    const routeItem = screen.queryByTestId(navIds.meetingScheduler);
    expect(routeItem).toBeInTheDocument();
  });

  test("5520486: [Given] the organization does not have the Meeting Scheduler entitlement [Expect] Meeting Scheduler not to appear in the SideNavigation", () => {
    mockUseClaims.mockReturnValue({
      ...MockAuth0Claims,
      entitlements: [Entitlement.Studio, Entitlement.EngagementAnalytics],
    });

    mockFlags({ [FeatureFlag.MeetingScheduler]: true });

    customRender();

    const routeItem = screen.queryByTestId(navIds.meetingScheduler);
    expect(routeItem).not.toBeInTheDocument();
  });

  test(`9270051: [Given] the user has access to the CRM app
                 [Then] a link to the CRM app is visible`, () => {
    mockUseAccess.mockReturnValue({ hasCRM: true });
    customRender();
    const routeItem = screen.queryByTestId(navIds.crm);
    expect(routeItem).toBeVisible();
  });

  test(`10068750: [Given] the user has access to the Insight app
                 [Then] a link to the Insight app is visible`, () => {
    mockUseAccess.mockReturnValue({ hasInsight: true });
    customRender();
    const routeItem = screen.queryByTestId(navIds.insight);
    expect(routeItem).toBeVisible();
  });

  test(`9270052: [Given] the user does not have access to the CRM app
                 [Then] a link to the CRM app is visible`, () => {
    mockUseAccess.mockReturnValue({ hasCRM: false });
    customRender();
    const routeItem = screen.queryByTestId(navIds.crm);
    expect(routeItem).not.toBeInTheDocument();
  });
  test("10529755: [Given] Event Management App feature flag is on [Expect] Event Management App to appear in the SideNavigation", async () => {
    mockFlags({ [FeatureFlag.EventManagementApp]: true });
    mockUseAccess.mockReturnValue({ hasEventManagementApp: true });

    customRender();
    const routeItem = await screen.findByTestId(navIds.eventManagementApp);
    expect(routeItem).toBeInTheDocument();
  });

  test("10529756: [Given] Event Management App feature flag is off [Expect] Event Management App not to appear in the SideNavigation", () => {
    mockFlags({ [FeatureFlag.EventManagementApp]: true });

    customRender();
    const routeItem = screen.queryByTestId(navIds.eventManagementApp);
    expect(routeItem).not.toBeInTheDocument();
  });

  test("11029490: [Given] I am on a Q4 App [Then] I see {AppName} - Q4 Platform", async () => {
    mockUseLocation.mockReturnValue({ pathname: WebsiteLink.path });
    render(
      <MemoryRouter initialEntries={[WebsiteLink.path]}>
        <ApplicationProvider routes={[{ path: WebsiteLink.path, label: WebsiteLink.label, icon: "" }]}>
          <></>
        </ApplicationProvider>
      </MemoryRouter>,
    );

    await waitFor(() => expect(document.title).toBe(`${WebsiteLink.label} - Q4 Platform`));
  });

  test("11029491: [Given] I am not on a Q4 App [Then] I see Q4 Platform title", async () => {
    console.error = () => null;
    mockUseLocation.mockReturnValue({ pathname: "/" });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ApplicationProvider routes={[{ path: WebsiteLink.path, label: WebsiteLink.label, icon: "" }]}>
          <></>
        </ApplicationProvider>
      </MemoryRouter>,
    );

    await waitFor(() => expect(document.title).toBe("Q4 Platform"));
  });

  test("11342800: [Given] I have access to Home [When] I log into the application [Then] the tab is internally denoted as the Home tab", () => {
    mockUseAccess.mockReturnValue({ hasHome: true });
    customRender();
    expect(document?.defaultView?.name).toBe(HomePageLink.target);
  });

  test("11541937: [Given] a trial isn't initializing [Then] expect to not see trial loading screen", () => {
    mockUseTrial.mockReturnValue({ isTrialInitializing: false });
    customRender();
    expect(screen.queryByText("We're preparing your free trial")).not.toBeInTheDocument();
  });

  test("11541938: [Given] a trial is initializing [Then] expect trial loading screen", () => {
    mockUseTrial.mockReturnValue({ isTrialInitializing: true });
    customRender();
    expect(screen.getByText("We're preparing your free trial")).toBeInTheDocument();
  });

  describe("Logging", () => {
    test("11096952: [Given] the app is not running locally [And] the app is not running in a feature environment [And] the user has access to the Website or Earnings Management apps [Then] datadog RUM is initialized", () => {
      mockUseAccess.mockReturnValue({ hasWebsite: true });

      customRender();

      expect(mockDataDogHookResponse.initializeRUM).toHaveBeenCalled();
    });

    test("11096321: [Given] the app is not running locally [And] the app is not running in a feature environment [And] the user does not have access to the Website or Earnings Management apps [Then] datadog RUM is not initialized", () => {
      mockUseAccess.mockReturnValue({ hasEventManagementApp: true });

      customRender();

      expect(mockDataDogHookResponse.initializeRUM).not.toHaveBeenCalled();
    });
  });
});
