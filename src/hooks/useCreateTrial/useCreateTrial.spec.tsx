/* eslint-disable sonarjs/no-duplicate-string */
import { TrialType } from "@q4/platform-sdk-definitions";
import { mockFlags } from "jest-launchdarkly-mock";
import React from "react";
import { Auth0HookMock } from "../../__mocks__/contexts/Auth0Context.mock";
import { EngagementAnalyticsLink } from "../../configurations";
import { useUser } from "../../contexts/user/user.hook";
import { useCreateTrialMutation } from "../../schemas/generated/graphql";
import { cleanup, fireEvent, render, renderHook, waitFor } from "../../utils/testUtils";
import { useClaims } from "../useClaims/useClaims.hook";
import { useToastNotificationService } from "../useToastNotificationService/useToastNotificationService.hook";
import { trialErrorCode, trialErrorWording } from "./useCreateTrial.definition";
import { useCreateTrial } from "./useCreateTrial.hook";

const homeMFETrialButtonEAId = "pendo-button-trial::engagement-analytics:base";

const success = jest.fn();
const error = jest.fn();
const warn = jest.fn();

jest.mock("../../schemas/generated/graphql");
const mockUseCreateTrialMutation = useCreateTrialMutation as jest.Mock;

jest.mock("../../hooks/useToastNotificationService/useToastNotificationService.hook");
const mockUseToastNotificationService = useToastNotificationService as jest.Mock;

jest.mock("../useClaims/useClaims.hook");
const mockUseClaims = useClaims as jest.Mock;

jest.mock("../../contexts/user/user.hook");
const mockUseUser = useUser as jest.Mock;

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

const mockRefetchQueries = jest.fn();

jest.mock("@apollo/client", () => {
  return {
    useApolloClient: jest.fn(() => ({
      refetchQueries: mockRefetchQueries,
    })),
    gql: jest.fn(),
  };
});

const mockCreateTrialMutation = jest.fn();
const mockGetAccessToken = jest.fn().mockResolvedValue({});

const mockPendoGuideAppend = async (buttonId: string) => {
  const pendoGuide = document.createElement("div");
  pendoGuide.id = "pendo-base";
  pendoGuide.style.visibility = "visible";
  document.body.appendChild(pendoGuide);

  const TrialButton = document.createElement("button");
  TrialButton.id = buttonId;
  document.body.appendChild(TrialButton);

  await waitFor(() => {
    expect(TrialButton.onclick).not.toBeNull();
  });

  return TrialButton;
};

describe("useCreateTrial", () => {
  beforeEach(() => {
    mockUseClaims.mockReturnValue({
      setClaims: jest.fn(),
    });
    mockUseCreateTrialMutation.mockReturnValue([mockCreateTrialMutation]);
    mockUseToastNotificationService.mockReturnValue({ current: { success, error, warn } as never });
    Auth0HookMock({
      getAccessTokenSilently: mockGetAccessToken,
    });
    mockCreateTrialMutation.mockResolvedValue({ data: [] });
    mockFlags({});
    mockUseUser.mockResolvedValue({
      isImpersonatingClient: false,
      managedOrganizationId: null,
    });
  });

  afterEach(() => {
    mockUseToastNotificationService.mockReset();
    const pendoGuide = document.getElementById("pendo-base");
    if (pendoGuide) {
      document.body.removeChild(pendoGuide);
    }

    const homeMfeEATrialButtons = document.querySelectorAll("[id^='pendo-button-trial::']");
    if (homeMfeEATrialButtons.length) {
      document.body.removeChild(homeMfeEATrialButtons[0]);
    }

    cleanup(); // Clean up React-related stuff as well
  });

  test("11541933: [Given] I successfully start a trial for EA base [Then] expect correct value to be sent to endpoint", async () => {
    renderHook(() => useCreateTrial());

    render(<div>Test</div>);

    const homeMfeEATrialButton = await mockPendoGuideAppend(homeMFETrialButtonEAId);

    fireEvent.click(homeMfeEATrialButton);

    expect(mockCreateTrialMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { trialType: TrialType.EA_BASE_TRIAL },
      }),
    );
  });

  test("11541934: [Given] I successfully start a trial for EA base [Then] expect to be redirected to the correct path", async () => {
    renderHook(() => useCreateTrial());

    render(<div>Test</div>);

    const homeMfeEATrialButton = await mockPendoGuideAppend(homeMFETrialButtonEAId);

    fireEvent.click(homeMfeEATrialButton);

    expect(mockCreateTrialMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { trialType: TrialType.EA_BASE_TRIAL },
      }),
    );

    await waitFor(() => {
      expect(success).toBeCalled();
    });

    expect(mockHistoryPush).toBeCalledTimes(1);
    expect(mockHistoryPush).toBeCalledWith(EngagementAnalyticsLink.path);
  });

  test("11541935: [Given] I successfully start a trial for EA base [Then] expect to see success message", async () => {
    renderHook(() => useCreateTrial());

    render(<div>Test</div>);

    const homeMfeEATrialButton = await mockPendoGuideAppend(homeMFETrialButtonEAId);

    fireEvent.click(homeMfeEATrialButton);

    await waitFor(() => {
      expect(success).toBeCalled();
    });

    expect(success).toHaveBeenCalledWith(
      expect.objectContaining({
        props: {
          title: "Trial started successfully!",
          message: "You are now on a free trial for Engagement Analytics Base.",
        },
      }),
      expect.any(Object),
    );
  });

  test("11541936: [Given] I an error is thrown when I try to start a trial for EA base [Then] expect to see error message", async () => {
    mockCreateTrialMutation.mockRejectedValueOnce({ error: new Error("Error") });

    renderHook(() => useCreateTrial());

    render(<div>Test</div>);

    const homeMfeEATrialButton = await mockPendoGuideAppend(homeMFETrialButtonEAId);

    fireEvent.click(homeMfeEATrialButton);

    await waitFor(() => {
      expect(error).toBeCalled();
    });
  });

  test("11573258: [Given] a trial for tier is already active for my organization [Then] expect to see warn message", async () => {
    mockCreateTrialMutation.mockResolvedValue({
      errors: [
        {
          extensions: {
            code: trialErrorCode.activeExists,
          },
        },
      ],
      data: [],
    });

    renderHook(() => useCreateTrial());

    render(<div>Test</div>);

    const homeMfeEATrialButton = await mockPendoGuideAppend(homeMFETrialButtonEAId);

    fireEvent.click(homeMfeEATrialButton);

    await waitFor(() => {
      expect(warn).toBeCalled();
    });

    expect(warn).toBeCalledWith(
      expect.objectContaining({
        props: {
          title: trialErrorWording.activeExists.title,
          message: trialErrorWording.activeExists.description,
        },
      }),
      expect.any(Object),
    );
  });

  test("11573259: [Given] my organization is on a cool-down period [Then] expect to see error message", async () => {
    mockCreateTrialMutation.mockResolvedValue({
      errors: [
        {
          extensions: {
            code: trialErrorCode.inCooldownPeriod,
          },
        },
      ],
      data: [],
    });

    renderHook(() => useCreateTrial());

    render(<div>Test</div>);

    const homeMfeEATrialButton = await mockPendoGuideAppend(homeMFETrialButtonEAId);

    fireEvent.click(homeMfeEATrialButton);

    await waitFor(() => {
      expect(error).toBeCalled();
    });

    expect(error).toBeCalledWith(
      expect.objectContaining({
        props: {
          title: trialErrorWording.inCooldownPeriod.title,
          message: trialErrorWording.inCooldownPeriod.description,
        },
      }),
      expect.any(Object),
    );
  });

  test("11573260: [Given] the endpoint fails [Then] expect to see error message", async () => {
    mockCreateTrialMutation.mockRejectedValue({});

    renderHook(() => useCreateTrial());

    render(<div>Test</div>);

    const homeMfeEATrialButton = await mockPendoGuideAppend(homeMFETrialButtonEAId);

    fireEvent.click(homeMfeEATrialButton);

    await waitFor(() => {
      expect(error).toBeCalled();
    });

    expect(error).toBeCalledWith(
      expect.objectContaining({
        props: {
          title: trialErrorWording.genericError.title,
          message: trialErrorWording.genericError.description,
        },
      }),
      expect.any(Object),
    );
  });

  test("11661588: [Given] I am impersonating a client [And] the trial started successfully [Then] my session is refreshed with managed organization id", async () => {
    mockUseUser.mockReturnValue({
      isImpersonatingClient: true,
      managedOrganizationId: "managed-org-id",
    });

    renderHook(() => useCreateTrial());

    render(<div>Test</div>);

    const homeMfeEATrialButton = await mockPendoGuideAppend(homeMFETrialButtonEAId);

    fireEvent.click(homeMfeEATrialButton);

    await waitFor(() => {
      expect(mockGetAccessToken).toHaveBeenCalledWith(
        expect.objectContaining({
          managedOrganizationId: "managed-org-id",
        }),
      );
    });
  });
});
