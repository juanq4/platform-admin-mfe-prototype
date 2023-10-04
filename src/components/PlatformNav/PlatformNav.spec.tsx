import { OrganizationType } from "@q4/platform-definitions";
import { mockFlags } from "jest-launchdarkly-mock";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router";
import {
  AdminLink,
  AppRoutePath,
  CRMLink,
  EarningsManagementLink,
  EngagementAnalyticsLink,
  EventManagementAppLink,
  FeatureFlag,
  InsightLink,
  MeetingSchedulerLink,
  Q4DesktopLink,
  WebsiteLink,
} from "../../configurations";
import { ApplicationName } from "../../configurations/application.configuration";
import { useApplication, useUser } from "../../contexts";
import { useAccess } from "../../hooks/useAccess/useAccess.hook";
import { render, screen } from "../../utils/testUtils";
import { PlatformNav } from "./PlatformNav.component";

jest
  .mock("react-responsive")
  .mock("react-router")
  .mock("../ApplicationSwitcher/ApplicationSwitcher.component", () => ({
    ApplicationSwitcher: () => <div>Application switcher</div>,
  }))
  .mock("../NotificationsDrawer/NotificationsDrawer.component", () => ({
    NotificationsDrawer: () => <div>Notifications drawer</div>,
  }))
  .mock("../ProfileMenu/ProfileMenu.component", () => ({
    ProfileMenu: () => <div>Profile menu</div>,
  }))
  .mock("../../contexts")
  .mock("../../hooks/useAccess/useAccess.hook")
  .mock("./OrganizationSwitcher/OrganizationSwitcher.component", () => ({
    OrganizationSwitcher: () => <div>Organization switcher</div>,
  }));

const mockedUseMediaQuery = useMediaQuery as jest.Mock;
const mockUseLocation = useLocation as jest.Mock;
const mockUseApplication = useApplication as jest.Mock;
const mockUseUser = useUser as jest.Mock;
const mockUseAccess = useAccess as jest.Mock;

describe("Platform Nav", () => {
  const routes = [
    AdminLink,
    CRMLink,
    EarningsManagementLink,
    EngagementAnalyticsLink,
    EventManagementAppLink,
    InsightLink,
    MeetingSchedulerLink,
    Q4DesktopLink,
    WebsiteLink,
  ] as never;
  const logoAltName = "Q4 Platform Logo";

  beforeEach(() => {
    mockedUseMediaQuery.mockReturnValue(false);
    mockUseLocation.mockReturnValue({ pathname: AppRoutePath.Default });
    mockUseApplication.mockReturnValue({ name: null });
    mockUseUser.mockReturnValue({ organization: { name: "test", identifiers: ["123.456"] }, isImperonatingClient: false });
    mockUseAccess.mockReturnValue({ hasHome: true });
    mockFlags({ [FeatureFlag.Notifications]: { isEnabled: false } });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("10688456: [Given] the Platform nav is visible [Then] the Q4 Logo is visible", () => {
    render(<PlatformNav routes={routes} />);
    expect(screen.getByAltText(logoAltName)).toBeInTheDocument();
  });

  test("11582146: [Given] I am using a mobile device [Then] the application name is blank", () => {
    mockedUseMediaQuery.mockReturnValueOnce(true);
    mockUseApplication.mockReturnValueOnce({ name: ApplicationName.EngagementAnalytics });
    render(<PlatformNav routes={routes} />);
    expect(screen.queryByText(ApplicationName.EngagementAnalytics)).not.toBeInTheDocument();
  });

  test("10705122: [Given] I am on the home page [Then] the application name is blank", () => {
    render(<PlatformNav routes={routes} />);
    expect(screen.queryByText(ApplicationName.EngagementAnalytics)).not.toBeInTheDocument();
  });

  test("10687370: [Given] I am on Admin [Then] the application name is Admin", () => {
    mockUseApplication.mockReturnValue({ name: "Admin" });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText("Admin")).toBeVisible();
  });

  test("10687371: [Given] I am on CRM [Then] the application name is CRM", () => {
    mockUseApplication.mockReturnValue({ name: "CRM" });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText("CRM")).toBeVisible();
  });

  test("10687372: [Given] I am on Earnings Management [Then] the application name is Earnings", () => {
    mockUseApplication.mockReturnValue({ name: "Earnings" });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText("Earnings")).toBeVisible();
  });

  test("10687373: [Given] I am on Engagement Analytics [Then] the application name is Engagement Analytics", () => {
    mockUseApplication.mockReturnValue({ name: ApplicationName.EngagementAnalytics });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText(ApplicationName.EngagementAnalytics)).toBeVisible();
  });

  test("11543024: [Given] I am on Engagement Analytics [And] my subscription plan is starter [Then] the application tier name is starter", () => {
    mockUseApplication.mockReturnValue({ name: ApplicationName.EngagementAnalytics, tier: "starter" });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText("starter")).toBeVisible();
  });

  test("11543025: [Given] I am on Engagement Analytics [And] my subscription plan is base [Then] the application tier name is base", () => {
    mockUseApplication.mockReturnValue({ name: ApplicationName.EngagementAnalytics, tier: "base" });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText("base")).toBeVisible();
  });

  test("10687374: [Given] I am on Events [Then] the application name is Event Management", () => {
    mockUseApplication.mockReturnValue({ name: ApplicationName.EventManagement });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText(ApplicationName.EventManagement)).toBeVisible();
  });

  test("10687375: [Given] I am on Insight [Then] the application name is Insight", () => {
    mockUseApplication.mockReturnValue({ name: ApplicationName.Insight });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText(ApplicationName.Insight)).toBeVisible();
  });

  test("10687376: [Given] I am on Meeting Scheduler [Then] the application name is Meeting Scheduler", () => {
    mockUseApplication.mockReturnValue({ name: ApplicationName.MeetingScheduler });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText(ApplicationName.MeetingScheduler)).toBeVisible();
  });

  test("10687377: [Given] I am on Q4 Desktop [Then] the application name is Desktop", () => {
    mockUseApplication.mockReturnValue({ name: ApplicationName.Q4Desktop });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText(ApplicationName.Q4Desktop)).toBeVisible();
  });

  test("10687378: [Given] I am on Website [Then] the application name is Website Management", () => {
    mockUseApplication.mockReturnValue({ name: ApplicationName.Website });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText(ApplicationName.Website)).toBeVisible();
  });

  test("10688457: [Given] my organization is corporate [Then] the application switcher is visible", () => {
    mockUseUser.mockReturnValueOnce({ organization: { type: OrganizationType.CORP } });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText("Application switcher")).toBeVisible();
  });

  test("10816178: [Given] my organization is not corporate [Then] the application switcher is not visible", () => {
    mockUseUser.mockReturnValueOnce({ organization: { type: OrganizationType.AGENCY } });
    render(<PlatformNav routes={routes} />);
    expect(screen.queryByText("Application switcher")).not.toBeInTheDocument();
  });

  test("10688458: [Given] the Platform nav is visble [Then] the profile menu is visible", () => {
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText("Profile menu")).toBeVisible();
  });

  test("10816179: [Given] I am impersonating a client [Then] the Organization Switcher is visible", () => {
    mockUseUser.mockReturnValue({ isImpersonatingClient: true, organization: {} });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText("Organization switcher")).toBeVisible();
  });

  test("10816180: [Given] I am not impersonating a client [Then] the Organization Switcher is not visible", () => {
    mockUseUser.mockReturnValueOnce({ isImpersonatingClient: false, organization: {} });
    render(<PlatformNav routes={routes} />);
    expect(screen.queryByText("Organization switcher")).not.toBeInTheDocument();
  });

  test("11021979: [Given] my organization is agency [When] current route is not home page route [And] application name is null [Then] application name is Client Accounts", () => {
    mockUseUser.mockReturnValueOnce({ isImpersonatingClient: false, organization: { type: OrganizationType.AGENCY } });
    mockUseLocation.mockReturnValueOnce({ pathname: AppRoutePath.Default });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText("Client Accounts")).toBeVisible();
  });

  test("11218917: [Given] I am a user that clicks on the navbar logo [And] I don't have access to home [then] I am not able to navigate to home", () => {
    mockUseAccess.mockReturnValue({ hasHome: false });
    render(<PlatformNav routes={routes} />);
    expect(screen.queryByRole("link", { name: logoAltName })).not.toBeInTheDocument();
  });

  test("11334539: [Given] the 'notifications' feature flag is disabled [Then] I can not see the notifications drawer", () => {
    render(<PlatformNav routes={routes} />);
    expect(screen.queryByText("Notifications drawer")).not.toBeInTheDocument();
  });

  test("11334540: [Given] the 'notifications' feature flag is enabled [Then] I can see the notifications drawer", () => {
    mockFlags({ [FeatureFlag.Notifications]: { isEnabled: true } });
    render(<PlatformNav routes={routes} />);
    expect(screen.getByText("Notifications drawer")).toBeVisible();
  });
});
