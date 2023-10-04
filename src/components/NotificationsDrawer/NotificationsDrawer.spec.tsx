import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { MockNotifications } from "../../__mocks__/data/notifications.mock";
import { BroadcastEventType } from "../../contexts";
import { useBroadcast } from "../../contexts/broadcast/broadcast.hook";
import { useNotificationList } from "../../hooks/useNotificationList/useNotificationList.hook";
import { useUpdateNotificationMutation } from "../../schemas/generated/graphql";
import { act, fireEvent, render, screen } from "../../utils/testUtils";
import { NotificationsDrawer } from "./NotificationsDrawer.component";
import { NotificationsDrawerCardApplications } from "./NotificationsDrawerCard/NotificationsDrawerCard.definition";

dayjs.extend(relativeTime);

jest
  .mock("../../hooks/useNotificationList/useNotificationList.hook")
  .mock("../../contexts/broadcast/broadcast.hook")
  .mock("../../schemas/generated/graphql");

const mockUseNotificationList = useNotificationList as jest.Mock;
const mockUseBroadcast = useBroadcast as jest.Mock;
const mockUpdateNotification = useUpdateNotificationMutation as unknown as jest.Mock;

describe("Notifications Drawer", () => {
  const originalWindow = window;
  const newNotificationsIcon = "new notifications icon";

  beforeAll(() => {
    Object.defineProperty(window, "open", { configurable: true, value: jest.fn() });
    mockUseNotificationList.mockReturnValue({
      hasError: false,
      isLoading: false,
      data: { notifications: [], totalCount: 0, totalUnreadCount: 0 },
      onUpdateReadState: jest.fn(),
    });
    mockUseBroadcast.mockReturnValue({
      postMessage: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
    mockUpdateNotification.mockReturnValue([]);
  });

  afterAll(() => {
    Object.defineProperty(originalWindow, "open", { configurable: true, value: originalWindow.open });
  });

  beforeEach(() => {
    mockUseNotificationList.mockReturnValue({
      hasError: false,
      isLoading: false,
      data: { notifications: [], totalCount: 0, totalUnreadCount: 27 },
    });
  });

  test("11334541: [Given] I am a user that clicks on the notifications icon [Then] I can see the notifications content", () => {
    render(<NotificationsDrawer />);
    const toggleMenuButton = screen.getByRole("button");
    fireEvent.click(toggleMenuButton);
    expect(screen.getByText("Notifications")).toBeVisible();
  });

  test("11380462: [Given] I have new real time notifications [Then] I can see the notifications icon with a red dot", () => {
    mockUseNotificationList.mockReturnValueOnce({
      hasError: false,
      isLoading: false,
      data: {
        notifications: [{ ...MockNotifications[0], readAt: "" }],
        totalCount: MockNotifications.length,
        totalUnreadCount: 1,
      },
    });
    render(<NotificationsDrawer />);
    expect(screen.getByAltText(newNotificationsIcon)).toBeVisible();
  });

  test("11380463: [Given] I have unread notifications [Then] I can see the notifications icon with a red dot", () => {
    mockUseNotificationList.mockReturnValueOnce({
      hasError: false,
      isLoading: false,
      data: { notifications: [{ ...MockNotifications[0], readAt: "" }], totalCount: 1, totalUnreadCount: 1 },
    });
    render(<NotificationsDrawer />);
    expect(screen.getByAltText(newNotificationsIcon)).toBeVisible();
  });

  test("11385137: [Given] I have unread notifications unloaded from the server [Then] I can see the notifications icon with a red dot", () => {
    mockUseNotificationList.mockReturnValueOnce({
      hasError: false,
      isLoading: false,
      data: {
        notifications: [{ ...MockNotifications[0], readAt: "" }],
        totalCount: MockNotifications.length,
        totalUnreadCount: 1,
      },
    });
    render(<NotificationsDrawer />);
    expect(screen.getByAltText(newNotificationsIcon)).toBeVisible();
  });

  test("11380464: [Given] I don't have new notifications [Then] I can see the notifications icon without a red dot", () => {
    mockUseNotificationList.mockReturnValueOnce({
      hasError: false,
      isLoading: false,
      data: { notifications: MockNotifications, totalCount: MockNotifications.length, totalUnreadCount: 0 },
    });
    render(<NotificationsDrawer />);
    expect(screen.getByAltText("notifications icon")).toBeVisible();
  });

  test("11342796: [Given] I am a user that clicks on the notifications icon [And] the notifications service throws an error [Then] I can see the error message", () => {
    mockUseNotificationList.mockReturnValue({
      hasError: true,
      isLoading: false,
      data: { notifications: [], totalCount: 0, totalUnreadCount: 0 },
    });
    render(<NotificationsDrawer />);
    const toggleMenuButton = screen.getByRole("button");
    fireEvent.click(toggleMenuButton);
    expect(screen.getByText("Unable to load notifications")).toBeVisible();
    expect(screen.getByText("Refresh the page.")).toBeVisible();
  });

  test("11342797: [Given] I am a user that clicks on the notifications icon [And] the notifications service is loading [Then] I can see the loading skeleton", () => {
    mockUseNotificationList.mockReturnValue({
      hasError: false,
      isLoading: true,
      data: { notifications: [], totalCount: 0, totalUnreadCount: 0 },
    });
    render(<NotificationsDrawer />);
    const toggleMenuButton = screen.getByRole("button");
    fireEvent.click(toggleMenuButton);
    expect(screen.getAllByTestId("notifications-drawer-loading")).toHaveLength(5);
  });

  test("11342798: [Given] I am a user that clicks on the notifications icon [And] the notifications service returns no data [Then] I can see the empty message", () => {
    mockUseNotificationList.mockReturnValue({
      hasError: false,
      isLoading: false,
      data: { notifications: [], totalCount: 0, totalUnreadCount: 0 },
    });
    render(<NotificationsDrawer />);
    const toggleMenuButton = screen.getByRole("button");
    fireEvent.click(toggleMenuButton);
    expect(screen.getByText("No notifications to show")).toBeVisible();
    expect(screen.getByText("We'll let you know if anything changes.")).toBeVisible();
  });

  test("11342799: [Given] I am a user that clicks on the notifications icon [And] the notifications service returns data [Then] I can see the notifications", () => {
    mockUseNotificationList.mockReturnValue({
      hasError: false,
      isLoading: false,
      data: { notifications: [MockNotifications[0]], totalCount: 1, totalUnreadCount: 0 },
    });
    render(<NotificationsDrawer />);
    const toggleMenuButton = screen.getByRole("button");
    fireEvent.click(toggleMenuButton);
    const application =
      NotificationsDrawerCardApplications[MockNotifications[0].source as keyof typeof NotificationsDrawerCardApplications];
    expect(screen.getByText(MockNotifications[0].message)).toBeVisible();
    expect(screen.getByText(MockNotifications[0].title)).toBeVisible();
    expect(screen.getByText(application?.name)).toBeVisible();
    expect(screen.getByText(dayjs(MockNotifications[0].sentAt).fromNow())).toBeVisible();
  });

  test("11376555: [Given] I am a user that clicks on the notifications icon [And] I have real time notifications [Then] I can see the notifications", () => {
    mockUseNotificationList.mockReturnValue({
      hasError: false,
      isLoading: false,
      data: { notifications: [MockNotifications[0]], totalCount: 0, totalUnreadCount: 0 },
    });
    render(<NotificationsDrawer />);
    const toggleMenuButton = screen.getByRole("button");
    fireEvent.click(toggleMenuButton);
    const application =
      NotificationsDrawerCardApplications[MockNotifications[0].source as keyof typeof NotificationsDrawerCardApplications];
    expect(screen.getByText(MockNotifications[0].message)).toBeVisible();
    expect(screen.getByText(MockNotifications[0].title)).toBeVisible();
    expect(screen.getByText(application?.name)).toBeVisible();
    expect(screen.getByText(dayjs(MockNotifications[0].sentAt).fromNow())).toBeVisible();
  });

  test("11376556: [Given] I am a user that clicks on the notifications icon [And] I have more than 10 notifications [Then] I can see the Load more button", () => {
    mockUseNotificationList.mockReturnValue({
      hasError: false,
      isLoading: false,
      data: {
        notifications: [...MockNotifications, ...MockNotifications],
        totalCount: 15,
        totalUnreadCount: 0,
      },
    });
    render(<NotificationsDrawer />);
    const toggleMenuButton = screen.getByRole("button");
    fireEvent.click(toggleMenuButton);
    expect(screen.getByText("Load more")).toBeVisible();
  });

  test("11414388: [Given] I am a user that clicks on the notifications icon [And] I have an unread notification [Then] I can see the pip indicator", () => {
    mockUseNotificationList.mockReturnValue({
      hasError: false,
      isLoading: false,
      data: {
        notifications: [{ ...MockNotifications[0], readAt: "" }],
        totalCount: 1,
        totalUnreadCount: 1,
      },
    });
    render(<NotificationsDrawer />);
    const toggleMenuButton = screen.getByRole("button");
    fireEvent.click(toggleMenuButton);
    expect(screen.getByTestId("pip-indicator")).toBeVisible();
  });

  test("11414981: [Given] I am a user that clicks on the notifications icon [And] I do not have an unread notification [Then] I do not see the pip indicator", () => {
    mockUseNotificationList.mockReturnValue({
      hasError: false,
      isLoading: false,
      data: {
        notifications: [MockNotifications[0]],
        totalCount: 1,
        totalUnreadCount: 0,
      },
    });
    render(<NotificationsDrawer />);
    const toggleMenuButton = screen.getByRole("button");
    fireEvent.click(toggleMenuButton);
    expect(screen.queryByTestId("pip-indicator")).not.toBeVisible();
  });

  test("11419840: [Given] I am a user that clicks on the read status indicator [Then] it updates the notification in local state", () => {
    const mockUpdateState = jest.fn();
    mockUseNotificationList.mockReturnValue({
      hasError: false,
      isLoading: false,
      data: {
        notifications: [...MockNotifications],
        totalCount: 6,
        totalUnreadCount: 0,
      },
      onUpdateReadState: mockUpdateState,
      reload: jest.fn(),
    });
    mockUpdateNotification.mockReturnValue([jest.fn()]);
    render(<NotificationsDrawer />);

    const toggleMenuButton = screen.getByRole("button");
    fireEvent.click(toggleMenuButton);

    act(() => {
      expect(screen.getByText(MockNotifications[2].title || "")).toBeVisible();
    });

    expect(screen.getByTestId(`pip-${MockNotifications[2].id || ""}`)).toBeVisible();
    fireEvent.click(screen.getByTestId(`pip-${MockNotifications[2].id || ""}`));
    expect(mockUpdateState).toHaveBeenCalledWith(MockNotifications[2].id);
  });

  test("11419841: [Given] I am a user that clicks on the read status indicator [Then] it requests API to update the read status for this notificaiton", () => {
    const updateSpy = jest.fn();
    mockUseNotificationList.mockReturnValue({
      hasError: false,
      isLoading: false,
      data: {
        notifications: [...MockNotifications],
        totalCount: 6,
        totalUnreadCount: 0,
      },
      onUpdateReadState: jest.fn(),
      reload: jest.fn(),
    });
    mockUpdateNotification.mockReturnValue([updateSpy]);
    render(<NotificationsDrawer />);

    const toggleMenuButton = screen.getByRole("button");
    fireEvent.click(toggleMenuButton);

    act(() => {
      expect(screen.getByText(MockNotifications[2].title || "")).toBeVisible();
    });

    expect(screen.getByTestId(`pip-${MockNotifications[2].id || ""}`)).toBeVisible();
    fireEvent.click(screen.getByTestId(`pip-${MockNotifications[2].id || ""}`));
    act(() => {
      expect(updateSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: { markRead: false, notificationId: MockNotifications[2].id },
        }),
      );
    });
  });

  test("11419842: [Given] the notification read state is successfully updated [Then] it broadcasts the message of this change", () => {
    const updateSpy = jest.fn();
    const postMessageSpy = jest.fn();
    mockUseNotificationList.mockReturnValue({
      hasError: false,
      isLoading: false,
      data: {
        notifications: [...MockNotifications],
        totalCount: 6,
        totalUnreadCount: 1,
      },
      onUpdateReadState: jest.fn(),
      reload: jest.fn(),
    });
    mockUpdateNotification.mockReturnValue([updateSpy]);
    mockUseBroadcast.mockReturnValue({
      postMessage: postMessageSpy,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });
    render(<NotificationsDrawer />);

    const toggleMenuButton = screen.getByRole("button");
    fireEvent.click(toggleMenuButton);

    act(() => {
      expect(screen.getByText(MockNotifications[2].title || "")).toBeVisible();
    });

    expect(screen.getByTestId(`pip-${MockNotifications[2].id || ""}`)).toBeVisible();
    fireEvent.click(screen.getByTestId(`pip-${MockNotifications[2].id || ""}`));

    const param = updateSpy.mock.calls[0][0];
    param.onCompleted();

    expect(postMessageSpy).toHaveBeenCalledWith(
      JSON.stringify({
        type: BroadcastEventType.NotificationListUpdated,
        data: { notificationId: MockNotifications[2].id, isRead: false },
      }),
    );
  });
});
