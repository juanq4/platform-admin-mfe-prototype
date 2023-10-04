import { useAuth0 } from "@auth0/auth0-react";
import { createSerializer, matchers } from "@emotion/jest";
import { MediaDeviceSize, MediaQuery, mockResizeWindow } from "@q4/nimbus-ui";
import { Entitlement } from "@q4/platform-definitions";
import { mockGlobalOpen, UserContextMock } from "../../__mocks__";
import { BroadcastContextMock } from "../../__mocks__/contexts/BroadcastContext.mock";
import { UserContext } from "../../contexts";
import type { UserContextState } from "../../contexts";
import { useBroadcast } from "../../contexts/broadcast/broadcast.hook";
import type { AccountHookModel } from "../../hooks";
import { useAccess } from "../../hooks/useAccess";
import { useAccount } from "../../hooks/useAccount/useAccount.hook";
import { getOrganizationLabelWithTicker } from "../../utils";
import { act, fireEvent, render, screen } from "../../utils/testUtils";
import { TopNavigation } from "./TopNavigation.component";
import { NotificationPreferencesButton, TopNavigationAriaLabel } from "./TopNavigation.definition";
import { AccoundSwitcherConfirmationModalText } from "./components/AccountSwitcherConfirmationModal.defintion";

expect.addSnapshotSerializer(createSerializer());
expect.extend(matchers);

jest.mock("@auth0/auth0-react");
const mockedUseAuth0 = useAuth0 as jest.Mock;

const mockUserNickname = "mock user";
const userContextMock = UserContextMock;
const mockIdentifier = "Industries.123";

jest.mock("../../hooks/useAccess");
const mockUseAccess = useAccess as jest.Mock;
jest.mock("../../hooks/useAccount/useAccount.hook");
jest.mock("../../hooks/useFeatureFlags/useFeatureFlags.hook");
const mockUseAccount = useAccount as jest.Mock;

jest.mock("../../contexts/broadcast/broadcast.hook");
const mockUseBroadcast = useBroadcast as jest.Mock;
mockUseBroadcast.mockReturnValue(BroadcastContextMock);

const defaultTopNavigationProps = {
  userContextMock: userContextMock,
  broadcastContextMock: BroadcastContextMock,
  isSideNavigationCollapsed: false,
  showMobileNavigation: false,
  showManagedOrgSelector: false,
};

const notificationPreferencesText = NotificationPreferencesButton.label;

const openConfirmationModal = (orgWithTicker: string) => {
  const backButton = screen.getByRole("button", { name: orgWithTicker });
  fireEvent.click(backButton);
  return screen.getByText("Switch account?").closest("div");
};

const customRender = (props = defaultTopNavigationProps) => {
  const { userContextMock, isSideNavigationCollapsed, showMobileNavigation, showManagedOrgSelector } = props;

  return render(
    <UserContext.Provider value={userContextMock}>
      <TopNavigation
        isSideNavigationCollapsed={isSideNavigationCollapsed}
        showMobileNavigation={showMobileNavigation}
        showManagedOrgSelector={showManagedOrgSelector}
        onToggleMobileNavigation={jest.fn()}
      />
    </UserContext.Provider>,
  );
};

describe("TopNavigation", () => {
  const mockAccountHookResponse = [
    { entitlements: [], name: "", active: true },
    { active: true },
  ] as unknown as AccountHookModel;

  beforeEach(() => {
    mockedUseAuth0.mockReturnValue({
      user: { nickname: mockUserNickname },
      logout: jest.fn(),
    });
    mockUseAccount.mockReturnValue(mockAccountHookResponse);
    mockUseAccess.mockReturnValue({
      hasNotificationPreferences: true,
      showQ4AdminHelp: false,
    });
  });

  test("7392408: [Given] no props are provided [Expect] the component to render", () => {
    const { container } = render(
      <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={false} />,
    );

    expect(container).toMatchSnapshot();
  });

  test("7392409: [Given] the user updates the window width [Expect] the correct body width", () => {
    [MediaDeviceSize.medium.min, MediaDeviceSize.extraLarge.min, MediaDeviceSize.large.min].forEach((size) => {
      act(() => {
        mockResizeWindow(size);
      });

      expect(window.innerWidth).toBe(size);
    });
  });

  test("7392410: [Given] the user has a viewport greater than 768px [Expect] the menu hamburger icon not to show", () => {
    render(
      <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={false} />,
    );

    [MediaDeviceSize.extraLarge.min, MediaDeviceSize.large.min].forEach((size) => {
      act(() => {
        mockResizeWindow(size);
      });

      expect(screen.getByLabelText(TopNavigationAriaLabel.MobileMenuButton)).toHaveStyleRule("display", "none!important", {
        media: `only screen and (min-width: ${MediaDeviceSize.large.min + 1}px)`,
      });
    });
  });

  test("7392411: [Given] the user has a viewport smaller than 412px [Expect] the logo wrapper size changes", () => {
    render(
      <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={false} />,
    );

    act(() => {
      mockResizeWindow(MediaDeviceSize.extraSmall.max);
    });

    expect(screen.getByAltText("lg").parentElement).toHaveStyleRule("width", "40px", {
      media: MediaQuery.extraSmall.max,
    });
  });

  test("7392547: [Given] the side navigation is colllapsed [Expect] the small size logo is displayed", () => {
    render(
      <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={true} />,
    );

    act(() => {
      mockResizeWindow(MediaDeviceSize.large.min);
    });

    expect(screen.getByAltText("sm")).toBeVisible();
    expect(screen.queryByAltText("lg")).not.toBeInTheDocument();
  });

  test("7392548: [Given] the side navigation is expanded [Expect] the large size logo is displayed", () => {
    render(
      <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={false} />,
    );

    act(() => {
      mockResizeWindow(MediaDeviceSize.large.min);
    });

    expect(screen.getByAltText("lg")).toBeVisible();
    expect(screen.queryByAltText("sm")).not.toBeInTheDocument();
  });

  test("7392549: [Given] the user has viewport smaller than 412px [Expect] the small size logo is displayed", () => {
    (window.matchMedia as jest.Mock).mockImplementation(() => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    render(
      <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={true} />,
    );

    act(() => {
      mockResizeWindow(MediaDeviceSize.extraSmall.max);
    });

    expect(screen.getByAltText("sm")).toBeVisible();
    expect(screen.queryByAltText("lg")).not.toBeInTheDocument();
  });

  test("7392550: [Given] the user hits the login button [Expect] a isUserLoggedOut value to be set in localStorage", () => {
    render(
      <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={true} />,
    );

    const userMenuButton = screen.getByText(mockUserNickname);
    fireEvent.click(userMenuButton);
    const logOutButton = screen.getByText("Log out");
    fireEvent.click(logOutButton);

    expect(localStorage.getItem("isUserLoggedOut")).toEqual("true");
  });

  describe("Help", () => {
    mockGlobalOpen();

    test("7392551: [Given] the user clicks on Help [Expect] the help center to be opened", () => {
      render(
        <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={true} />,
      );

      const userMenuButton = screen.getByText(mockUserNickname);
      fireEvent.click(userMenuButton);
      const menuButton = screen.getByText("Help");
      fireEvent.click(menuButton);

      expect(global.open).toBeCalledWith("https://help.dev.q4inc.com/index.html?lang=en");
    });
  });

  describe("Q4 Admin Help", () => {
    mockGlobalOpen();

    const q4AdminHelp = "Q4 Admin Help";

    test("4215532: [Given] user with Q4 Admin role is successful authenticated in CC [And] user clicks profile menu [Then] expect Q4 Admin Help option to be visible below Help option", () => {
      mockUseAccess.mockReturnValue({
        showQ4AdminHelp: true,
      });

      render(
        <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={false} />,
      );
      const userMenuButton = screen.getByText(mockUserNickname);
      fireEvent.click(userMenuButton);

      expect(screen.getByText(q4AdminHelp)).toBeInTheDocument();
    });

    test("4215533: [Given] user with Q4 Admin role is successful authenticated in CC [And] Q4 Admin Help option is visible to the user [And] user has clicked Q4 Admin Help option [Then] expect internal facing help documentation page opens up in new tab", () => {
      mockUseAccess.mockReturnValue({
        showQ4AdminHelp: true,
      });

      render(
        <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={false} />,
      );
      const userMenuButton = screen.getByText(mockUserNickname);
      fireEvent.click(userMenuButton);
      const menuButton = screen.getByText(q4AdminHelp);
      fireEvent.click(menuButton);

      expect(global.open).toBeCalledWith(
        "https://q4websystems.atlassian.net/wiki/spaces/QP/pages/3179839553/Q4+Platform+Support",
      );
    });

    test("4215534: [Given] user with Q4 Support role is successful authenticated in CC [And] user clicks profile menu [Then] expect Q4 Admin Help option to be visible below Help option", () => {
      mockUseAccess.mockReturnValue({
        showQ4AdminHelp: true,
      });

      render(
        <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={false} />,
      );
      const userMenuButton = screen.getByText(mockUserNickname);
      fireEvent.click(userMenuButton);

      expect(screen.getByText(q4AdminHelp)).toBeInTheDocument();
    });

    test("4215535: [Given] user with Q4 Support role  is successful authenticated in CC [And] Q4 Admin Help option is visible to the user [And] user has clicked Q4 Admin Help option [Then] expect internal facing help documentation page opens up in new tab", () => {
      mockUseAccess.mockReturnValue({
        showQ4AdminHelp: true,
      });

      render(
        <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={false} />,
      );
      const userMenuButton = screen.getByText(mockUserNickname);
      fireEvent.click(userMenuButton);
      const menuButton = screen.getByText(q4AdminHelp);
      fireEvent.click(menuButton);

      expect(global.open).toBeCalledWith(
        "https://q4websystems.atlassian.net/wiki/spaces/QP/pages/3179839553/Q4+Platform+Support",
      );
    });

    test("4215536: [Given] user with Corporate Support role is successful authenticated in CC [And] user clicks profile menu [Then] expect Q4 Admin Help option to be hidden", () => {
      render(
        <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={false} />,
      );
      const userMenuButton = screen.getByText(mockUserNickname);
      fireEvent.click(userMenuButton);

      expect(screen.queryByText(q4AdminHelp)).not.toBeInTheDocument();
    });

    test("4215537: [Given] user with Corporate Admin role is successful authenticated in CC [And] user clicks profile menu [Then] expect Q4 Admin Help option to be hidden", () => {
      render(
        <TopNavigation showMobileNavigation={true} onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed={false} />,
      );
      const userMenuButton = screen.getByText(mockUserNickname);
      fireEvent.click(userMenuButton);

      expect(screen.queryByText(q4AdminHelp)).not.toBeInTheDocument();
    });
  });

  describe("Agency back button", () => {
    test("5730460: [Given] I am logged into capital connect [And] I have permission to manage corporate clients [And] I have already selected a corporate client [Then] a back button is visible in the top navigation", () => {
      render(
        <UserContext.Provider value={userContextMock}>
          <TopNavigation
            isSideNavigationCollapsed={false}
            showMobileNavigation={false}
            showManagedOrgSelector={true}
            onToggleMobileNavigation={jest.fn()}
          />
        </UserContext.Provider>,
      );

      expect(screen.getByText("UGI Corporation | ABX")).toBeInTheDocument();
    });

    test("5730462: [Given] a back button is visible in the top navigation [Then] the back button contains the organization name [And] the back button contains the organization ticker", () => {
      render(
        <UserContext.Provider value={{ ...UserContextMock, organization: { name: "Stark", identifiers: [mockIdentifier] } }}>
          <TopNavigation
            isSideNavigationCollapsed={false}
            showMobileNavigation={false}
            showManagedOrgSelector={true}
            onToggleMobileNavigation={jest.fn()}
          />
        </UserContext.Provider>,
      );

      expect(screen.getByText("Stark | Industries")).toBeInTheDocument();
    });

    test("5730463: [Given] I am logged into capital connect [And] I have permission to manage corporate clients [And] I have not already selected a corporate client [Then] a back button is not visible in the top navigation", () => {
      render(
        <UserContext.Provider value={userContextMock}>
          <TopNavigation
            isSideNavigationCollapsed={false}
            showMobileNavigation={false}
            showManagedOrgSelector={false}
            onToggleMobileNavigation={jest.fn()}
          />
        </UserContext.Provider>,
      );

      expect(screen.queryByText(userContextMock.organization.name)).not.toBeInTheDocument();
    });

    test("6145989: [Given] That a back button is visible in the top navigation panel [When] the button is clicked [Then] a warning modal is shown to the user", () => {
      const userContextMock = {
        ...UserContextMock,
        organization: { name: "Stark", identifiers: [mockIdentifier] },
      };

      customRender({ ...defaultTopNavigationProps, userContextMock: userContextMock, showManagedOrgSelector: true });

      const orgWithTicker = getOrganizationLabelWithTicker(userContextMock?.organization);

      const backButton = screen.getByRole("button", { name: orgWithTicker });
      fireEvent.click(backButton);

      const confirmationWordingContainer = screen.getByText("currently managing", { exact: false }).closest("p");
      const confirmationWording = `${AccoundSwitcherConfirmationModalText.CurrentlyManaging} ${orgWithTicker}. ${AccoundSwitcherConfirmationModalText.Confirm}`;

      const returnToAccountSelectionButton = screen.getByRole("button", {
        name: AccoundSwitcherConfirmationModalText.Return,
      });
      const cancelButton = screen.getByRole("button", { name: AccoundSwitcherConfirmationModalText.Cancel });

      expect(screen.getByText(AccoundSwitcherConfirmationModalText.Title)).toBeInTheDocument();
      expect(confirmationWordingContainer).toHaveTextContent(confirmationWording);
      expect(cancelButton).toBeInTheDocument();
      expect(screen.getByText(AccoundSwitcherConfirmationModalText.Warning)).toBeInTheDocument();
      expect(returnToAccountSelectionButton).toBeInTheDocument();
    });

    test("6145990: [Given] That the confirmation modal is shown [When] a user clicks the cancel button [Then] the modal warning is no longer visible", () => {
      const userContextMock = {
        ...UserContextMock,
        organization: { name: "Stark", identifiers: [mockIdentifier] },
      };

      customRender({ ...defaultTopNavigationProps, userContextMock: userContextMock, showManagedOrgSelector: true });

      const orgWithTicker = getOrganizationLabelWithTicker(userContextMock?.organization);

      const confirmationModal = openConfirmationModal(orgWithTicker);
      expect(confirmationModal).toBeInTheDocument();

      const cancelButton = screen.getByRole("button", { name: AccoundSwitcherConfirmationModalText.Cancel });
      fireEvent.click(cancelButton);

      expect(confirmationModal).not.toBeInTheDocument();
    });

    test("6145991: [Given] That the confirmation modal is shown [When] a user clicks the exit button [Then] the modal warning is no longer visible", () => {
      const userContextMock: UserContextState = {
        ...UserContextMock,
        organization: { name: "Stark", identifiers: [mockIdentifier] },
      };

      customRender({ ...defaultTopNavigationProps, userContextMock: userContextMock, showManagedOrgSelector: true });

      const orgWithTicker = getOrganizationLabelWithTicker(userContextMock?.organization);

      const confirmationModal = openConfirmationModal(orgWithTicker);

      expect(confirmationModal).toBeInTheDocument();

      const exitButton = screen.getByLabelText("Close Modal");
      fireEvent.click(exitButton);

      expect(confirmationModal).not.toBeInTheDocument();
    });

    test("6145992: [Given] That the confirmation modal is shown [When] a user clicks the Return to account selection button [Then] the user is taken to the ‘Client Accounts’ screen", () => {
      const userContextMock = {
        ...UserContextMock,
        organization: { name: "Stark", identifiers: [mockIdentifier] },
      };

      customRender({ ...defaultTopNavigationProps, userContextMock: userContextMock, showManagedOrgSelector: true });

      const orgWithTicker = getOrganizationLabelWithTicker(userContextMock?.organization);

      const confirmationModal = openConfirmationModal(orgWithTicker);

      expect(confirmationModal).toBeInTheDocument();

      const returnToAccountSelectionButton = screen.getByRole("button", {
        name: AccoundSwitcherConfirmationModalText.Return,
      });
      fireEvent.click(returnToAccountSelectionButton);

      expect(userContextMock.onManagedOrganizationIdChange).toBeCalledWith(null);
    });
  });

  describe("Notification Preferences", () => {
    test("7203221: [GIVEN] the user is viewing the profile menu [AND] they have access to notification preferences [THEN] a link to the notification preferences page is visible", () => {
      mockUseAccount.mockReturnValue([
        { entitlements: [Entitlement.EngagementAnalytics], name: "", active: true },
        { active: true },
      ] as unknown);

      render(<TopNavigation showMobileNavigation onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed />);

      const userMenuButton = screen.getByText(mockUserNickname);
      fireEvent.click(userMenuButton);
      expect(screen.getByText(notificationPreferencesText)).toBeVisible();
    });

    test(`7203222: [Given] the user is viewing the profile menu [And] the user has no entitlements which use notifications (${Entitlement.Desktop}) [Then] a link to the notification preferences page is not visible`, () => {
      mockUseAccount.mockReturnValue([
        { entitlements: [Entitlement.Desktop], name: "", active: true },
        { active: true },
      ] as unknown);
      mockUseAccess.mockReturnValue({
        hasNotificationPreferences: false,
      });

      render(<TopNavigation showMobileNavigation onToggleMobileNavigation={jest.fn()} isSideNavigationCollapsed />);

      const userMenuButton = screen.getByText(mockUserNickname);
      fireEvent.click(userMenuButton);
      expect(screen.queryByText(notificationPreferencesText)).not.toBeInTheDocument();
    });
  });
});
