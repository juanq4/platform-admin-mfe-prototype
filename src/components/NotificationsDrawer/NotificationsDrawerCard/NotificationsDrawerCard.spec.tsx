import React from "react";
import { MockNotifications } from "../../../__mocks__/data/notifications.mock";
import { ApplicationTarget } from "../../../configurations";
import { act, fireEvent, render, screen } from "../../../utils/testUtils";
import { NotificationsDrawerCard } from "./NotificationsDrawerCard.component";
import type { NotificationsDrawerCardProps } from "./NotificationsDrawerCard.definition";

describe("Notification Drawer Card", () => {
  const originalWindow = window;
  const mockUpdateReadStatus = jest.fn();
  const testNotification: NotificationsDrawerCardProps = {
    ...MockNotifications[0],
    readAt: undefined,
    onReadStateChange: mockUpdateReadStatus,
  };

  beforeAll(() => {
    Object.defineProperty(window, "open", { configurable: true, value: jest.fn(() => ({ focus: jest.fn() })) });
  });

  afterAll(() => {
    Object.defineProperty(originalWindow, "open", { configurable: true, value: originalWindow.open });
  });

  test("11510945: [Given] I click on an unread notification card [Then] the notification is marked as read and the url is opened in a new tab", () => {
    render(<NotificationsDrawerCard {...testNotification} />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    act(() => {
      expect(mockUpdateReadStatus).toHaveBeenCalledWith(testNotification.id, true);
      expect(window.open).toHaveBeenCalledWith(testNotification.link, ApplicationTarget.MeetingScheduler);
    });
  });

  test("11510946: [Given] I click on an read the notification card [Then] the notification url is opened in a new tab", () => {
    const notification = { ...testNotification, readAt: new Date().toISOString() };
    render(<NotificationsDrawerCard {...notification} />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    act(() => {
      expect(mockUpdateReadStatus).not.toHaveBeenCalled();
      expect(window.open).toHaveBeenCalledWith(testNotification.link, ApplicationTarget.MeetingScheduler);
    });
  });

  test("11394620: [Given] I am a user that clicks on the read status indicator [And] notification is currently unread [Then] it attempts to mark notification as read", () => {
    render(<NotificationsDrawerCard {...testNotification} />);
    expect(screen.getByText(testNotification.title)).toBeVisible();
    fireEvent.click(screen.getByTestId(`pip-${testNotification.id}`));
    act(() => {
      expect(mockUpdateReadStatus).toHaveBeenCalledWith(testNotification.id, true);
    });
  });

  test("11394621: [Given] I am a user that clicks on the read status indicator [And] notification is currently read [Then] it attempts to mark notification as unread", () => {
    const notification = { ...testNotification, readAt: new Date().toISOString() };
    render(<NotificationsDrawerCard {...notification} />);
    expect(screen.getByText(testNotification.title)).toBeVisible();
    fireEvent.click(screen.getByTestId(`pip-${testNotification.id}`));
    act(() => {
      expect(mockUpdateReadStatus).toHaveBeenCalledWith(testNotification.id, false);
    });
  });
});
