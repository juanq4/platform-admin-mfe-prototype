import type { NavigationRoute } from "@q4/nimbus-ui";
import { MediaDeviceSize, mockResizeWindow } from "@q4/nimbus-ui";
import { Entitlement, OrganizationType } from "@q4/platform-definitions";
import React from "react";
import {
  AdminLink,
  CRMLink,
  EarningsManagementLink,
  EngagementAnalyticsLink,
  EventManagementAppLink,
  FeatureFlag,
  HomePageLink,
  InsightLink,
  MeetingSchedulerLink,
  Q4DesktopLink,
  WebsiteLink,
} from "../../configurations";
import { useUser } from "../../contexts/user/user.hook";
import { useAccount } from "../../hooks/useAccount/useAccount.hook";
import { useFeatureFlags } from "../../hooks/useFeatureFlags/useFeatureFlags.hook";
import { getOrganizationLabelWithTicker } from "../../utils/organization/organization.utils";
import { act, fireEvent, render, screen } from "../../utils/testUtils";
import { ApplicationSwitcher } from "./ApplicationSwitcher.component";

const orgLabel = "test • 123";

jest
  .mock("../../components/ApplicationLink/ApplicationLink.component", () => ({
    ApplicationLink: () => <div>Application link</div>,
  }))
  .mock("./components/DiscoverLink/DiscoverLink.component", () => ({
    DiscoverLink: () => <div>Discover link</div>,
  }))
  .mock("../../contexts/user/user.hook")
  .mock("../../utils/organization/organization.utils")
  .mock("../../hooks/useFeatureFlags/useFeatureFlags.hook")
  .mock("../../hooks/useAccount/useAccount.hook");

const mockUseUser = useUser as jest.Mock;
const mockGetOrganizationLabelWithTicker = getOrganizationLabelWithTicker as jest.Mock;
const mockedUseAccount = useAccount as jest.Mock;

const mockUseFeatureFlags = useFeatureFlags as jest.Mock;

describe("Application Switcher", () => {
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
  ] as NavigationRoute[];

  beforeEach(() => {
    mockUseUser.mockReturnValue({ organization: { name: "test", identifiers: ["123.456"] } });
    mockUseUser.mockReturnValue({ organization: {}, isImpersonatingClient: true });
    mockGetOrganizationLabelWithTicker.mockReturnValue(orgLabel);
    mockedUseAccount.mockReturnValue([{ entitlements: [] }]);
    mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.PLGv2]: false });
  });

  // TODO: Unskip test
  xtest("10697647: [Given] the Application switcher is on Desktop [Then] close button is not visible", () => {
    render(<ApplicationSwitcher routes={routes} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByAltText("close application switcher")).not.toBeVisible();
  });

  xtest("10697648: [Given] the Application switcher is on Mobile [Then] close button is visible", () => {
    render(<ApplicationSwitcher routes={routes} />);
    act(() => mockResizeWindow(MediaDeviceSize.extraSmall.max));
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByAltText("close application switcher")).toBeVisible();
  });

  test("10697649: [Given] the Application switcher is on Desktop [Then] organization is not visible", () => {
    render(<ApplicationSwitcher routes={routes} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.queryByText("Organization")).not.toBeVisible();
    expect(screen.queryByText(orgLabel)).not.toBeVisible();
  });

  // TODO: convert organization switcher tests from integration tests to unit tests by mocking the organization switcher component
  test("10819991: [Given] I am not impersonating a client [Then] the organization switcher is not visible", () => {
    mockUseUser.mockReturnValue({
      organization: {
        name: "test",
        identifiers: ["123.456"],
      },
      isImpersonatingClient: false,
    });
    render(<ApplicationSwitcher routes={routes} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.queryByText("Organization")).not.toBeInTheDocument();
    expect(screen.queryByText(orgLabel)).not.toBeInTheDocument();
  });

  // TODO: unskip test
  xtest("10697650: [Given] the Application switcher is on Mobile [Then] organization is visible", () => {
    render(<ApplicationSwitcher routes={routes} />);
    act(() => mockResizeWindow(MediaDeviceSize.medium.min));
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("Organization")).toBeVisible();
    expect(screen.getByText(orgLabel)).toBeVisible();
  });

  test("10697651: [Given] the Application switcher [Then] application links are visible", () => {
    render(<ApplicationSwitcher routes={routes} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getAllByText("Application link")).toHaveLength(routes.length);
  });

  test("11472374: [Given] the Application switcher is provided a home route [Then] application switcher shows a home link", () => {
    render(<ApplicationSwitcher routes={[]} homeRoute={HomePageLink as NavigationRoute} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getAllByText("Application link")?.[0]).toBeInTheDocument();
  });

  const discoverLink = "Discover link";

  test("11472384: [Given] the PLG v2.0 flag is turned on [When] I click on the app switcher [Then] I can see all applications I’m not entitled to under the Discover section", () => {
    const totalDiscoverLinks = 3;
    mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.PLGv2]: true });
    render(<ApplicationSwitcher routes={routes} homeRoute={HomePageLink as NavigationRoute} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getAllByText(discoverLink).length).toEqual(totalDiscoverLinks);
  });

  test("11472385: [Given] the PLG v2.0 flag is turned on [When] I click on the app switcher [Then] I don't see discover links for entitlements I have", () => {
    const totalDiscoverLinks = 2;
    mockedUseAccount.mockReturnValue([{ entitlements: [Entitlement.EngagementAnalytics] }]);
    mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.PLGv2]: true });
    render(<ApplicationSwitcher routes={routes} homeRoute={HomePageLink as NavigationRoute} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getAllByText(discoverLink).length).toEqual(totalDiscoverLinks);
  });

  test("11472379: [Given] the PLG v2.0 flag is turned off [When] I click on the app switcher [Then] I can see all applications I’m not entitled to under the Discover section", () => {
    mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.PLGv2]: false });
    render(<ApplicationSwitcher routes={routes} homeRoute={HomePageLink as NavigationRoute} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.queryByText(discoverLink)).not.toBeInTheDocument();
  });

  test("11472380: [Given] my organization has all available entitlements [When] I click on the app switcher [Then] I do not see the Discover section", () => {
    mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.PLGv2]: true });
    mockedUseAccount.mockReturnValue([
      { entitlements: [Entitlement.EngagementAnalytics, Entitlement.Studio, Entitlement.Desktop] },
    ]);
    render(<ApplicationSwitcher routes={routes} homeRoute={HomePageLink as NavigationRoute} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.queryByText("Discover")).not.toBeInTheDocument();
  });

  test("11472381: [Given] I am an agency user, the PLG v2.0 flag is on [When] I click on the app switcher [Then] I can see all applications my client is not entitled to under the Discover section", () => {
    const totalDiscoverLinks = 3;
    mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.PLGv2]: true });
    mockedUseAccount.mockReturnValue([
      {
        entitlements: [],
        type: OrganizationType.AGENCY,
      },
    ]);
    render(<ApplicationSwitcher routes={routes} homeRoute={HomePageLink as NavigationRoute} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getAllByText(discoverLink).length).toEqual(totalDiscoverLinks);
  });

  test("11472382: [Given] I am an admin user, I click on the app switcher [And] the PLG v2.0 flag is on [Then] I do not see the discover section", () => {
    mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.PLGv2]: true });
    mockedUseAccount.mockReturnValue([
      {
        entitlements: [],
        type: OrganizationType.ADMIN,
      },
    ]);
    render(<ApplicationSwitcher routes={routes} homeRoute={HomePageLink as NavigationRoute} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.queryByText("Discover")).not.toBeInTheDocument();
  });
});
