import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { AppRoutePath } from "../../configurations/navigation.configuration";
import { useAccess } from "../../hooks";
import { fireEvent, render, screen } from "../../utils/testUtils";
import { ProfileMenu } from "./ProfileMenu.component";
import { Q4HelpLink } from "./ProfileMenu.definition";

jest.mock("@auth0/auth0-react").mock("../../hooks");

const mockUseAuth0 = useAuth0 as jest.Mock;
const mockUseAccess = useAccess as jest.Mock;

describe("Profile Menu", () => {
  const originalWindow = window;
  const focus = jest.fn();
  const auth0 = { logout: jest.fn(), user: { nickname: "test user" } };
  const notificationPreferences = "Notification preferences";

  beforeAll(() => {
    Object.defineProperty(window, "open", { configurable: true, value: jest.fn(() => ({ focus })) });
  });

  afterAll(() => {
    Object.defineProperty(originalWindow, "open", { configurable: true, value: originalWindow.open });
  });

  beforeEach(() => {
    mockUseAuth0.mockReturnValue(auth0);
    mockUseAccess.mockReturnValue({ hasNotificationPreferences: false });
  });

  test("10529750: [Given] I click on the profile button [Then] I should see the log out button in profile menu", () => {
    render(<ProfileMenu />);
    const profileMenu = screen.getByText(auth0.user.nickname);
    fireEvent.click(profileMenu);
    expect(screen.queryByText("Log out")).toBeVisible();
  });

  test("10535538: [Given] I click on the profile button [Then] I should see the help button in profile menu", () => {
    render(<ProfileMenu />);
    const profileMenu = screen.getByText(auth0.user.nickname);
    fireEvent.click(profileMenu);
    expect(screen.queryByText("Help")).toBeVisible();
  });

  test("10766302: [Given] I do not have access to notification preferences [then] I should not see the Notification Preferences button in profile menu", () => {
    render(<ProfileMenu />);
    const profileMenu = screen.getByText(auth0.user.nickname);
    fireEvent.click(profileMenu);
    expect(screen.queryByText(notificationPreferences)).not.toBeInTheDocument();
  });

  test("10766303: [Given] I have access to notification preferences [then] I should see the Notification Preferences button in profile menu", () => {
    mockUseAccess.mockReturnValue({ hasNotificationPreferences: true });
    render(<ProfileMenu />);
    const profileMenu = screen.getByText(auth0.user.nickname);
    fireEvent.click(profileMenu);
    expect(screen.queryByText(notificationPreferences)).toBeVisible();
  });

  test("10766304: [Given] I click on the Notification Preferences button [Then] I should see Notification Preferences open", () => {
    mockUseAccess.mockReturnValue({ hasNotificationPreferences: true });
    render(<ProfileMenu />);
    const profileMenu = screen.getByText(auth0.user.nickname);
    fireEvent.click(profileMenu);
    const notificationPreferencesOption = screen.getByText(notificationPreferences);
    fireEvent.click(notificationPreferencesOption);
    expect(window.open).toHaveBeenCalledWith(AppRoutePath.Notifications, "notification-preferences");
    expect(focus).toHaveBeenCalled();
  });

  test("10535539: [Given] I click on the help button [Then] I should see help site open in a new tab", () => {
    render(<ProfileMenu />);
    const profileMenu = screen.getByText(auth0.user.nickname);
    fireEvent.click(profileMenu);
    expect(screen.queryByText("Help")).toBeVisible();
    const logoutButton = screen.getByText("Help");
    fireEvent.click(logoutButton);
    expect(window.open).toHaveBeenCalledWith(Q4HelpLink);
  });

  test("10535520: [Given] I click on the log out button [Then] I should be logged out of the Platform", () => {
    render(<ProfileMenu />);
    const profileMenu = screen.getByText(auth0.user.nickname);
    fireEvent.click(profileMenu);
    expect(screen.queryByText("Log out")).toBeVisible();
    const logoutButton = screen.getByText("Log out");
    fireEvent.click(logoutButton);
    expect(auth0.logout).toHaveBeenCalledTimes(1);
  });
});
