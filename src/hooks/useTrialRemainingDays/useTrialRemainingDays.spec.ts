import { Product, TrialType } from "@q4/platform-sdk-definitions";
import { renderHook } from "@testing-library/react";
import { ApplicationName } from "../../configurations/application.configuration";
import { useApplication } from "../../contexts/application/application.hook";
import { useOrganizationTrialsQuery } from "../../schemas/generated/graphql";
import { useTrialRemainingDays } from "./useTrialRemainingDays.hook";

jest.mock("../../contexts/application/application.hook").mock("../../schemas/generated/graphql");

const mockUseOrganizationTrialsQuery = useOrganizationTrialsQuery as jest.Mock;
const mockUseApplication = useApplication as jest.Mock;

describe("useTrialRemainingDays", () => {
  beforeEach(() => {
    mockUseOrganizationTrialsQuery.mockReturnValue({
      data: {
        organizationTrials: [
          {
            product: Product.EngagementAnalytics,
            trialType: TrialType.EA_BASE_TRIAL,
            expiryDate: "1694836740000",
          },
        ],
      },
    });
    mockUseApplication.mockReturnValue({ name: null });
  });

  test("11582148: [Given] the organization has no trials [Then] it returns 0", () => {
    mockUseOrganizationTrialsQuery.mockReturnValueOnce({ data: { organizationTrials: [] } });
    const { result } = renderHook(useTrialRemainingDays);
    expect(result.current).toBeNaN();
  });

  test("11582149: [Given] the organization has trials [And] the application name does not match [Then] it returns 0", () => {
    mockUseApplication.mockReturnValueOnce({ name: ApplicationName.CRM });
    const { result } = renderHook(useTrialRemainingDays);
    expect(result.current).toBeNaN();
  });

  test("11582150: [Given] the organization has trials [And] the trial type does not match [Then] it returns 0", () => {
    mockUseApplication.mockReturnValueOnce({ name: ApplicationName.EngagementAnalytics, elegibleTrials: [] });
    const { result } = renderHook(useTrialRemainingDays);
    expect(result.current).toBeNaN();
  });

  test("11582151: [Given] the organization has a trial [And] the current time is '2023-09-01 20:00' [And] the expiryDate is '2023-09-16 03:59' [Then] it returns 14", () => {
    jest.useFakeTimers().setSystemTime(new Date("2023-09-01T20:00:00.000Z"));
    mockUseApplication.mockReturnValueOnce({
      name: ApplicationName.EngagementAnalytics,
      elegibleTrials: [TrialType.EA_BASE_TRIAL],
    });
    const { result } = renderHook(useTrialRemainingDays);
    expect(result.current).toBe(14);
  });

  test("11582152: [Given] the organization has a trial [And] the current time is '2023-09-15 02:00' [And] the expiryDate is '2023-09-16 03:59' [Then] it returns 1", () => {
    jest.useFakeTimers().setSystemTime(new Date("2023-09-15T02:00:00.000Z"));
    mockUseApplication.mockReturnValueOnce({
      name: ApplicationName.EngagementAnalytics,
      elegibleTrials: [TrialType.EA_BASE_TRIAL],
    });
    const { result } = renderHook(useTrialRemainingDays);
    expect(result.current).toBe(1);
  });

  test("11705854: [Given] the organization has a trial [And] the current time is '2023-09-15 04:00' [And] the expiryDate is '2023-09-16 03:59' [Then] it returns 0", () => {
    jest.useFakeTimers().setSystemTime(new Date("2023-09-15T04:00:00.000Z"));
    mockUseApplication.mockReturnValueOnce({
      name: ApplicationName.EngagementAnalytics,
      elegibleTrials: [TrialType.EA_BASE_TRIAL],
    });
    const { result } = renderHook(useTrialRemainingDays);
    expect(result.current).toBe(0);
  });
});
