import { render, screen } from "@testing-library/react";
import { useLDClient } from "launchdarkly-react-client-sdk";
import React from "react";
import { useUser } from "../../contexts";
import { useOrganizationQuery, useOrganizationsManagedByUserQuery, useUserQuery } from "../../schemas/generated/graphql";
import { useVersion } from "../VersionProvider";
import { VersionUpdatingWording } from "../VersionProvider/VersionProvider.definition";
import { ReadinessGate } from "./ReadinessGate.component";

jest.mock("launchdarkly-react-client-sdk");
const mockedUseLDClient = useLDClient as jest.Mock;

jest.mock("../VersionProvider");
const mockedUseVersion = useVersion as jest.Mock;

jest.mock("../../contexts");
const mockedUseUser = useUser as jest.Mock;

jest.mock("../../schemas/generated/graphql");
const mockedUseUserQuery = useUserQuery as jest.Mock;
const mockedUseOrganizationQuery = useOrganizationQuery as jest.Mock;
const mockedUseOrganizationsManagedByUserQuery = useOrganizationsManagedByUserQuery as jest.Mock;

describe("ReadinessGate", () => {
  const capitalConnectLogo = "Capital Connect Logo";

  beforeAll(() => {
    mockedUseVersion.mockReturnValue({
      isVersionUpdating: false,
      setIsVersionUpdating: jest.fn(),
    });
    mockedUseLDClient.mockImplementation(jest.fn());
    mockedUseUserQuery.mockReturnValue({ loading: false });
    mockedUseOrganizationQuery.mockReturnValue({ loading: false });
    mockedUseOrganizationsManagedByUserQuery.mockReturnValue({ loading: false });
    mockedUseUser.mockReturnValue({ isManagedOrganizationLoading: false, isImpersonatingClient: false });
  });

  test("7127784: [Given] the user is loading [Then] expect the loading screen to be rendered", () => {
    mockedUseUserQuery.mockReturnValueOnce({ loading: true });

    render(<ReadinessGate />);

    expect(screen.getByAltText(capitalConnectLogo)).toBeInTheDocument();
  });

  test("7127785: [Given] the organization is loading [Then] expect the loading screen to be rendered", () => {
    mockedUseOrganizationQuery.mockReturnValueOnce({ loading: true });

    render(<ReadinessGate />);

    expect(screen.getByAltText(capitalConnectLogo)).toBeInTheDocument();
  });

  test("7127786: [Given] the managed organization is loading [Then] expect the loading screen to be rendered", () => {
    mockedUseOrganizationsManagedByUserQuery.mockReturnValueOnce({ loading: true });

    render(<ReadinessGate />);

    expect(screen.getByAltText(capitalConnectLogo)).toBeInTheDocument();
  });

  test("7128352: [Given] the launch darkly client is loading [Then] expect the loading screen to be rendered", () => {
    render(<ReadinessGate />);

    expect(screen.getByAltText(capitalConnectLogo)).toBeInTheDocument();
  });

  test("7128353: [Given] the account details are loaded [Then] expect the ReadinessGate to be rendered", async () => {
    mockedUseLDClient.mockReturnValueOnce({ waitForInitialization: () => Promise.resolve(true) });

    render(<ReadinessGate>Test</ReadinessGate>);

    expect(await screen.findByText("Test")).toBeInTheDocument();
  });

  test("7754065: [Given] the app is initializing [When] the isUpdating flag is set (in localStorage) [Then] the custom loading message is shown in the global loading screen", async () => {
    mockedUseVersion.mockReturnValueOnce({ isVersionUpdating: true });

    render(<ReadinessGate />);

    expect(await screen.findByText(VersionUpdatingWording.loading)).toBeInTheDocument();
    expect(screen.getByText(VersionUpdatingWording.loadingMessage)).toBeInTheDocument();
  });

  test("8563927: [Given] the managed organization is loading [Then] expect the loading screen to be rendered", () => {
    mockedUseUser.mockReturnValueOnce({ isManagedOrganizationLoading: true });

    render(<ReadinessGate />);

    expect(screen.getByAltText(capitalConnectLogo)).toBeInTheDocument();
  });

  test("8919192: [Given] the app is deciding if the user is impersonating [Then] expect the loading screen to be rendered", () => {
    mockedUseUser.mockReturnValueOnce({ isImpersonatingClient: undefined });

    render(<ReadinessGate />);

    expect(screen.getByAltText(capitalConnectLogo)).toBeInTheDocument();
  });
});
