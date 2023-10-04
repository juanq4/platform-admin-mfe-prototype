import React from "react";
import { BrowserRouter, useHistory, useLocation } from "react-router-dom";
import {
  AdminLink,
  CRMLink,
  EarningsManagementLink,
  EngagementAnalyticsLink,
  EventManagementAppLink,
  InsightLink,
  MeetingSchedulerLink,
  Q4DesktopLink,
  WebsiteLink,
} from "../../configurations";
import { fireEvent, render, screen } from "../../utils/testUtils";
import { ApplicationLink } from "./ApplicationLink.component";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useHistory: jest.fn(),
}));

const mockUseLocation = useLocation as jest.Mock;
const mockUseHistory = useHistory as jest.Mock;

describe("Application Link", () => {
  const originalWindow = window;

  beforeAll(() => {
    Object.defineProperty(window, "location", { configurable: true, value: { reload: jest.fn(), href: "" } });
    Object.defineProperty(window, "open", { configurable: true, value: jest.fn(() => ({ focus: jest.fn() })) });
  });

  afterAll(() => {
    Object.defineProperty(originalWindow, "location", { configurable: true, value: originalWindow.location });
    Object.defineProperty(originalWindow, "open", { configurable: true, value: originalWindow.open });
  });

  beforeEach(() => {
    mockUseLocation.mockReturnValue({ pathname: "/" });
  });

  test("10713037: [Given] the Admin link is visible [Then] the Admin icon is visible", () => {
    render(
      <BrowserRouter>
        <ApplicationLink route={AdminLink} onClick={jest.fn} />
      </BrowserRouter>,
    );
    expect(screen.getByRole("img", { name: "Admin" })).toBeVisible();
  });

  test("10713038: [Given] the CRM link is visible [Then] the CRM icon is visible", () => {
    render(
      <BrowserRouter>
        <ApplicationLink route={CRMLink} onClick={jest.fn} />
      </BrowserRouter>,
    );
    expect(screen.getByRole("img", { name: "CRM" })).toBeVisible();
  });

  test("10713039: [Given] the Earnings Management link is visible [Then] the EarningsManagementLink icon is visible", () => {
    render(
      <BrowserRouter>
        <ApplicationLink route={EarningsManagementLink} onClick={jest.fn} />
      </BrowserRouter>,
    );
    expect(screen.getByRole("img", { name: "Earnings" })).toBeVisible();
  });

  test("10713040: [Given] the Engagement Analytics link is visible [Then] the EarningsManagementLink icon is visible", () => {
    render(
      <BrowserRouter>
        <ApplicationLink route={EngagementAnalyticsLink} onClick={jest.fn} />
      </BrowserRouter>,
    );
    expect(screen.getByRole("img", { name: "Engagement Analytics" })).toBeVisible();
  });

  test("10713041: [Given] the Event Management App link is visible [Then] the Event Management App icon is visible", () => {
    render(
      <BrowserRouter>
        <ApplicationLink route={EventManagementAppLink} onClick={jest.fn} />
      </BrowserRouter>,
    );
    expect(screen.getByRole("img", { name: "Event Management" })).toBeVisible();
  });

  test("10713042: [Given] the Insight link is visible [Then] the Insight icon is visible", () => {
    render(
      <BrowserRouter>
        <ApplicationLink route={InsightLink} onClick={jest.fn} />
      </BrowserRouter>,
    );
    expect(screen.getByRole("img", { name: "Insight" })).toBeVisible();
  });

  test("10713043: [Given] the Meeting Scheduler link is visible [Then] the Meeting Scheduler icon is visible", () => {
    render(
      <BrowserRouter>
        <ApplicationLink route={MeetingSchedulerLink} onClick={jest.fn} />
      </BrowserRouter>,
    );
    expect(screen.getByRole("img", { name: "Meeting Scheduler" })).toBeVisible();
  });

  test("10714494: [Given] the Q4 Desktop link is visible [Then] the Q4 Desktop icon is visible", () => {
    render(
      <BrowserRouter>
        <ApplicationLink route={Q4DesktopLink} onClick={jest.fn} />
      </BrowserRouter>,
    );
    expect(screen.getByRole("img", { name: "Desktop" })).toBeVisible();
  });

  test("10714495: [Given] the Website link is visible [Then] the Website icon is visible", () => {
    render(
      <BrowserRouter>
        <ApplicationLink route={WebsiteLink} onClick={jest.fn} />
      </BrowserRouter>,
    );
    expect(screen.getByRole("img", { name: "Website Management" })).toBeVisible();
  });

  test("10931763: [Given] an Application link is clicked [And] it is the same as my current application [Then] the window is reloaded", () => {
    mockUseLocation.mockReturnValue({ pathname: WebsiteLink.path });

    const pushMock = jest.fn();
    mockUseHistory.mockReturnValue({ push: pushMock });

    render(
      <BrowserRouter>
        <ApplicationLink route={WebsiteLink} onClick={jest.fn} />
      </BrowserRouter>,
    );
    const link = screen.getByRole("link");
    fireEvent.click(link);

    expect(pushMock).toHaveBeenCalledWith(WebsiteLink.path);
  });

  test("10931764: [Given] an Application link is clicked [And] it is different than my current application [Then] the app is opened in another tab", () => {
    render(
      <BrowserRouter>
        <ApplicationLink route={WebsiteLink} onClick={jest.fn} />
      </BrowserRouter>,
    );
    const link = screen.getByRole("link");
    fireEvent.click(link);
    expect(window.open).toHaveBeenCalled();
  });
});
