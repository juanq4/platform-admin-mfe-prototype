import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { ApplicationName } from "../../configurations/application.configuration";
import { useTrialRemainingDays } from "../../hooks/useTrialRemainingDays/useTrialRemainingDays.hook";
import { ApplicationSummary } from "./ApplicationSummary.component";
import { RemainingDaysMessageClass } from "./ApplicationSummary.definition";

jest.mock("../../hooks/useTrialRemainingDays/useTrialRemainingDays.hook");

const mockUseTrialRemainingDays = useTrialRemainingDays as jest.Mock;

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => {
  const orginal = jest.requireActual("react-router-dom");
  return {
    ...orginal,
    useHistory: () => ({
      location: { pathname: "/" },
      push: mockHistoryPush,
    }),
  };
});

describe("ApplicationSummary", () => {
  const originalWindow = window;
  const tier = "tier";

  beforeAll(() => {
    Object.defineProperty(window, "open", { configurable: true, value: jest.fn() });
  });

  afterAll(() => {
    Object.defineProperty(originalWindow, "open", { configurable: true, value: originalWindow.open });
  });

  test("11574956: [Given] the props [And] no days remaining [Then] render the component title section", () => {
    mockUseTrialRemainingDays.mockReturnValueOnce(0);
    render(<ApplicationSummary name={ApplicationName.EngagementAnalytics} tier={tier} />);

    expect(screen.getByText(ApplicationName.EngagementAnalytics)).toBeInTheDocument();
    expect(screen.getByText(tier)).toBeInTheDocument();
  });

  test("11574957: [Given] the props [And] days remaining is bigger than the expiration breakpoint [Then] render the component title and upgrade sections", () => {
    mockUseTrialRemainingDays.mockReturnValueOnce(5);
    render(<ApplicationSummary name={ApplicationName.EngagementAnalytics} tier={tier} />);

    expect(screen.getByText(ApplicationName.EngagementAnalytics)).toBeInTheDocument();
    expect(screen.getByText(tier)).toBeInTheDocument();
    expect(screen.getByText("5 days left in your trial")).toHaveClass(RemainingDaysMessageClass.Clock);
    expect(screen.getByText("Upgrade")).toBeInTheDocument();
  });

  test("11582144: [Given] the props [And] days remaining is less than the expiration breakpoint [Then] render the component title and upgrade sections", () => {
    mockUseTrialRemainingDays.mockReturnValueOnce(1);
    render(<ApplicationSummary name={ApplicationName.EngagementAnalytics} tier={tier} />);

    expect(screen.getByText(ApplicationName.EngagementAnalytics)).toBeInTheDocument();
    expect(screen.getByText(tier)).toBeInTheDocument();
    expect(screen.getByText("1 day left in your trial")).toHaveClass(RemainingDaysMessageClass.Warning);
    expect(screen.getByText("Upgrade")).toBeInTheDocument();
  });

  test("11582145: [Given] the trial link is called [Then] the link is opened", () => {
    mockUseTrialRemainingDays.mockReturnValueOnce(1);
    render(<ApplicationSummary name={ApplicationName.EngagementAnalytics} tier={tier} />);
    const upgradeLink = screen.getByText("Upgrade");
    fireEvent.click(upgradeLink);

    expect(mockHistoryPush).toBeCalledTimes(1);
    expect(mockHistoryPush).toBeCalledWith("/purchase-intent?trialType=EngagementAnalytics");
  });
});
