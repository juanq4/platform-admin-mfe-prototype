import { Auth0Provider } from "@auth0/auth0-react";
import { Entitlement, Permission } from "@q4/platform-definitions";
import { createMemoryHistory } from "history";
import React from "react";
import { MemoryRouter, Router } from "react-router-dom";
import { Auth0HookMock } from "../../__mocks__/contexts/Auth0Context.mock";
import { MfeKey } from "../../components/MfeApp/MfeApp.definition";
import { AdminRoutePath, AppRoutePath, FeatureFlag } from "../../configurations";
import type { Features } from "../../configurations";
import { useUser } from "../../contexts";
import { useAccess, useAccount, useFeatureFlags, useIdTokenClaims } from "../../hooks";
import { render, screen } from "../../utils/testUtils";
import { Routes } from "./Routes.component";

jest.mock("../../hooks/useClaims/useClaims.hook", () => ({
  useClaims: jest.fn().mockReturnValue({}),
}));

jest.mock("../../hooks/useIdTokenClaims/useIdTokenClaims.hook", () => ({
  useIdTokenClaims: jest.fn().mockReturnValue({
    entitlements: [],
    userId: "",
    __raw: "",
    organizationId: "",
  }),
}));
const mockUseIdTokenClaims = useIdTokenClaims as jest.Mock;

jest.mock("../../hooks/useAccount/useAccount.hook");
const mockUseAccount = useAccount as jest.Mock;

jest.mock("../../hooks/useAccess/useAccess.hook");
const mockUseAccess = useAccess as jest.Mock;

jest.mock("../../contexts");
const mockUseUser = useUser as jest.Mock;

jest.mock("../../hooks/useFeatureFlags/useFeatureFlags.hook");
const mockUseFeatureFlags = useFeatureFlags as jest.Mock;

jest.mock("@auth0/auth0-react");
Auth0HookMock();
const mockedAuth0Provider = Auth0Provider as jest.Mock;
mockedAuth0Provider.mockImplementation(({ children }) => children);

jest.mock("../../components/MfeApp/MfeApp.component", () => ({
  MfeApp: jest.fn().mockImplementation(({ id }) => <div id={id} />),
}));

interface CustomRenderProps {
  defaultRoute?: string;
  initialEntry?: string;
  entitlements?: Entitlement[];
  permissions?: Permission[];
  defaultFeatures?: Features;
}

const notFoundText = "The page you are trying to access cannot be loaded.";
const notificationText = "Notification preferences";

const features: Features = {
  "admin-user-management": false,
  "cc-admin-agency-teams": false,
  "cc-cross-selling-links": [],
  "meeting-scheduler": false,
  "notification-preferences": false,
  "crm": false,
  "platform-earnings-mfe": false,
  "insight": false,
  "ema-mfe": { isEnabled: false },
  "admin-client-account-access": false,
  "cc-desktop-launcher": { isEnabled: false },
  "home": false,
};

describe("Routes", () => {
  const customRender = (props: CustomRenderProps) => {
    const {
      defaultRoute = AppRoutePath.Default,
      initialEntry = "",
      entitlements = [],
      permissions = [],
      defaultFeatures = features,
    } = props;

    mockUseIdTokenClaims.mockReturnValueOnce({
      entitlements,
      userId: "",
      __raw: "",
      organizationId: "",
    });

    render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes
          defaultRoute={defaultRoute}
          entitlements={entitlements}
          permissions={permissions}
          features={defaultFeatures}
        />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    mockUseAccount.mockReturnValue([{ entitlements: [], active: true, name: "", type: "" }]);
    mockUseAccess.mockReturnValue({ hasNotificationPreferences: false, hasEngagementAnalytics: false });
    mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.NotificationPreferences]: false });
    mockUseUser.mockReturnValue({});
  });

  test(`7391327: [Given] the organization has the Studio Entitlement [When] the user navigates to ${AppRoutePath.Default} [Expect] the user should be redirected to ${AppRoutePath.Request} page`, () => {
    mockUseAccess.mockReturnValue({ hasWebsite: true });

    customRender({
      defaultRoute: AppRoutePath.Request,
      initialEntry: AppRoutePath.Default,
      entitlements: [Entitlement.Studio],
    });

    expect(screen.getByTestId(MfeKey.Request)).toBeVisible();
  });

  test(`7391329: [Given] the organization has the Studio Entitlement [When] the user navigates to ${AppRoutePath.Request} [Expect] the user should see the Request page`, () => {
    mockUseAccess.mockReturnValue({ hasWebsite: true });

    customRender({
      initialEntry: AppRoutePath.Request,
      entitlements: [Entitlement.Studio],
    });

    expect(screen.getByTestId(MfeKey.Request)).toBeVisible();
  });

  test(`7391330: [Given] the organization has the Engagement Analytics Entitlement ${Entitlement.EngagementAnalytics} [When] the user navigates to ${AppRoutePath.EngagementAnalytics} [Expect] the user should see the Engagement Analytics page`, () => {
    mockUseAccess.mockReturnValue({ hasNotificationPreferences: false, hasEngagementAnalytics: true });

    customRender({
      initialEntry: AppRoutePath.EngagementAnalytics,
      entitlements: [Entitlement.EngagementAnalytics],
    });

    expect(screen.getByTestId(MfeKey.EngagementAnalytics)).toBeVisible();
  });

  test(`5520483: [Given] the organization has the Meeting Scheduler entitlement [And] the Meeting Scheduler feature flag is on [When] the user navigates to ${AppRoutePath.MeetingScheduler} [Expect] the user should see the Meeting Scheduler app`, () => {
    mockUseAccess.mockReturnValue({ hasMeetingScheduler: true });

    customRender({
      initialEntry: AppRoutePath.MeetingScheduler,
      entitlements: [Entitlement.MeetingScheduler],
      defaultFeatures: { ...features, "meeting-scheduler": true },
    });

    expect(screen.getByTestId(MfeKey.MeetingScheduler)).toBeVisible();
  });

  test(`10531297: [Given] Event Management App feature flag is on [When] user navigates to ${AppRoutePath.EventManagementApp} [Expect] user should see Event Management App`, () => {
    mockUseAccess.mockReturnValue({ hasEventManagementApp: true });

    customRender({
      initialEntry: AppRoutePath.EventManagementApp,
      defaultFeatures: { ...features, "ema-mfe": { isEnabled: true } },
    });

    expect(screen.getByTestId(MfeKey.EventManagementApp)).toBeVisible();
  });

  test("9270605: [Given] the user has access to the CRM app [Then] the CRM app is exposed", () => {
    mockUseAccess.mockReturnValue({ hasCRM: true });
    customRender({
      initialEntry: AppRoutePath.CRM,
      defaultFeatures: { ...features, crm: true },
    });
    expect(screen.getByTestId(MfeKey.CRM)).toBeVisible();
  });

  test("10068751: [Given] the user has access to the Insight app [Then] the Insight app is exposed", () => {
    mockUseAccess.mockReturnValue({ hasInsight: true });
    customRender({
      initialEntry: AppRoutePath.Insight,
      defaultFeatures: { ...features, insight: true },
    });
    expect(screen.getByTestId(MfeKey.Insight)).toBeVisible();
  });

  test("10997130: [Given] the user has access to the Home app [Then] the home app is exposed", () => {
    mockUseAccess.mockReturnValue({ hasHome: true });
    customRender({
      initialEntry: AppRoutePath.Home,
      defaultFeatures: features,
    });
    expect(screen.getByTestId(MfeKey.Home)).toBeVisible();
  });

  test(`3499146: [Given] the user goes to '${AdminRoutePath.Home}' [And] the user had the '${Permission.ReadOrgs}' permission [Then] expect the user to see the Organizations view`, () => {
    mockUseAccess.mockReturnValueOnce({ hasAdmin: true });
    mockUseUser.mockReturnValueOnce({ isImpersonatingClient: false });

    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Routes permissions={[Permission.ReadOrgs]} features={features} entitlements={[]} />
      </Router>,
    );

    expect(history.location.pathname).toBe("/admin/organizations");
  });

  test(`3499147: [Given] the user goes to '${AdminRoutePath.Home}' [And] the user had the '${Permission.ReadUsers}' [Then] expect the user to see the Users view`, () => {
    mockUseAccess.mockReturnValueOnce({ hasAdmin: true });
    mockUseUser.mockReturnValueOnce({ isImpersonatingClient: false });

    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Routes permissions={[Permission.ReadUsers]} features={features} entitlements={[]} />
      </Router>,
    );

    expect(history.location.pathname).toBe("/admin/users");
  });

  describe("Error Pages", () => {
    test("4326932: [Given] authenticated user try to access URL that does not exist [Then] expect error page to be displayed", () => {
      customRender({ initialEntry: "/test" });

      expect(
        screen.getByText(
          "It looks like the page you are looking for doesn't exist. Try going back to the previous page, or contact us for more information.",
        ),
      ).toBeVisible();
    });

    test(`4373181: [Given] the organization does not have any of the Engagement Analytics Entitlement [When] the user navigates to ${AppRoutePath.EngagementAnalytics} [Expect] the user should see the unauthorized page`, () => {
      customRender({
        initialEntry: AppRoutePath.EngagementAnalytics,
      });

      expect(screen.getByText(notFoundText)).toBeVisible();
    });

    test(`4373182: [Given] the organization does not have the Studio Entitlement [When] the user navigates to ${AppRoutePath.Request} [Expect] the user should see the unauthorized page`, () => {
      customRender({
        initialEntry: AppRoutePath.Request,
      });

      expect(screen.getByText(notFoundText)).toBeVisible();
    });

    test(`5520484: [Given] the organization does not have the Meeting Scheduler entitlement [When] the user navigates to ${AppRoutePath.MeetingScheduler} [Expect] the user is not shown the Meeting Scheduler app`, () => {
      customRender({
        initialEntry: AppRoutePath.MeetingScheduler,
      });

      expect(screen.getByText(notFoundText)).toBeVisible();
    });

    test(`7133984: [Given] the organization does not have the Meeting Scheduler entitlement [When] the user navigates to ${AppRoutePath.Email} [Expect] the user is not shown the Email app`, () => {
      customRender({
        initialEntry: AppRoutePath.Email,
      });

      expect(screen.getByText(notFoundText)).toBeVisible();
    });

    test("10532729: [Given] feature flag for Event Management App is off [When] user goes to the Event Management App [Then] user is shown a 404 page", () => {
      customRender({
        initialEntry: AppRoutePath.EventManagementApp,
        defaultFeatures: { ...features, "ema-mfe": { isEnabled: false } },
      });

      expect(screen.getByText(notFoundText)).toBeVisible();
    });
  });

  describe("Notification Preferences", () => {
    test(`7202653: [Given] a user has an entitlement using notifications ${Entitlement.EngagementAnalytics} [And] the notification preferences feature flag is on [When] the user goes to the notification preferences URL [Then] the user sees the notification preferences page`, () => {
      mockUseAccount.mockReturnValue([
        { entitlements: [Entitlement.EngagementAnalytics], active: true, name: "", type: "" },
      ]);
      mockUseAccess.mockReturnValue({ hasNotificationPreferences: true, hasEngagementAnalytics: true });
      mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.NotificationPreferences]: true });

      customRender({
        initialEntry: AppRoutePath.Notifications,
      });

      expect(screen.getByText(notificationText)).toBeVisible();
    });

    test(`11001037: [Given] a user has an entitlement using notifications ${Entitlement.EngagementAnalyticsBase} [And] the notification preferences feature flag is on [When] the user goes to notification preferences URL [Then] the user sees notification preferences`, () => {
      mockUseAccount.mockReturnValue([
        { entitlements: [Entitlement.EngagementAnalyticsBase], active: true, name: "", type: "" },
      ]);
      mockUseAccess.mockReturnValue({ hasNotificationPreferences: true, hasEngagementAnalytics: true });
      mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.NotificationPreferences]: true });

      customRender({
        initialEntry: AppRoutePath.Notifications,
      });

      expect(screen.getByText(notificationText)).toBeVisible();
    });

    test("7202654: [Given] a user has no entitlements which use notifications [When]the user goes to the notification preferences URL [Then] the user is shown a 404 page", () => {
      mockUseAccount.mockReturnValue([
        {
          entitlements: [],
          active: true,
          name: "",
          type: "",
        },
      ]);
      mockUseAccess.mockReturnValue({ hasNotificationPreferences: false, hasEngagementAnalytics: true });
      mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.NotificationPreferences]: true });

      customRender({
        initialEntry: AppRoutePath.Notifications,
      });

      expect(screen.queryByText(notificationText)).not.toBeInTheDocument();
    });

    test(`11001038: [Given] a user has no entitlements which use notifications (${Entitlement.Desktop}) [When]the user goes to the notification preferences URL [Then] the user is shown a 404 page`, () => {
      mockUseAccount.mockReturnValue([
        {
          entitlements: [Entitlement.Desktop],
          active: true,
          name: "",
          type: "",
        },
      ]);
      mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.NotificationPreferences]: true });

      customRender({
        initialEntry: AppRoutePath.Notifications,
      });

      expect(screen.queryByText(notificationText)).not.toBeInTheDocument();
    });

    test(`11001039: [Given] a user has no entitlements which use notifications (${Entitlement.MeetingScheduler}) [When]the user goes to the notification preferences URL [Then] the user is shown a 404 page`, () => {
      mockUseAccount.mockReturnValue([
        {
          entitlements: [Entitlement.MeetingScheduler],
          active: true,
          name: "",
          type: "",
        },
      ]);
      mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.NotificationPreferences]: true });

      customRender({
        initialEntry: AppRoutePath.Notifications,
      });

      expect(screen.queryByText(notificationText)).not.toBeInTheDocument();
    });

    test("7202655: [Given] the feature flag for notification preferences is off [When]the user goes to the notification preferences URL [Then] the user is shown a 404 page", () => {
      mockUseAccount.mockReturnValue([
        { entitlements: [Entitlement.EngagementAnalytics], active: true, name: "", type: "" },
      ]);
      mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.NotificationPreferences]: false });

      customRender({
        initialEntry: AppRoutePath.Notifications,
      });

      expect(screen.queryByText(notificationText)).not.toBeInTheDocument();
    });
  });
});
