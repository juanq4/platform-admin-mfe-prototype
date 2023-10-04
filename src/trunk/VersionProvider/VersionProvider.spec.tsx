/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth0 } from "@auth0/auth0-react";
import { createSerializer } from "@emotion/jest";
import { render, screen, waitFor } from "@testing-library/react";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import React from "react";
import { UserContext } from "../../contexts";
import { useToastNotificationService } from "../../hooks";
import { VersionProvider } from "./VersionProvider.component";
import { deleteShellVersionCookie, getShellVersionCookie, setShellVersionCookie } from "./VersionProvider.cookies.utils";
import { updateVersionOnRefresh, VersionUpdatingWording } from "./VersionProvider.definition";
import { reloadPageOnUrlChange } from "./VersionProvider.storage.utils";

expect.addSnapshotSerializer(createSerializer());

jest.mock("@datadog/browser-logs");
jest.mock("./VersionProvider.cookies.utils");
const mockedGetShellVersionCookie = getShellVersionCookie as jest.Mock;

const mockedReloadPageOnUrlChange = jest.fn();

jest.mock("./VersionProvider.storage.utils", () => {
  const orginal = jest.requireActual("./VersionProvider.storage.utils");
  return {
    ...orginal,
    reloadPageOnUrlChange: jest.fn(() => mockedReloadPageOnUrlChange()),
    versionUpdatingFlag: {
      set: () => localStorage.setItem(updateVersionOnRefresh, "true"),
      get: () => localStorage.getItem(updateVersionOnRefresh),
      remove: () => localStorage.removeItem(updateVersionOnRefresh),
    },
  };
});

jest.mock("@auth0/auth0-react");
const mockedUseAuth0 = useAuth0 as jest.Mock;

jest.mock("launchdarkly-react-client-sdk");
const mockedUseFlags = useFlags as jest.Mock;
const mockedUseLDClient = useLDClient as jest.Mock;

jest.mock("../../hooks/useToastNotificationService/useToastNotificationService.hook");
const mockUseToastNotificationService = useToastNotificationService as jest.Mock;

const location = window.location;
const locationHostName = "connect.dev.q4inc.com";
localStorage.setItem(updateVersionOnRefresh, "true");

const customRender = () =>
  render(
    <UserContext.Provider value={{ userId: "userId", organizationId: "organizationId" }}>
      <VersionProvider>Test</VersionProvider>
    </UserContext.Provider>,
  );

describe("VersionProvider", () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.location;
  });
  afterAll(() => {
    window.location = location;
  });

  test("7138558: [Given] The platform-shell versions in the cookie and feature flags do not match [Then] the feature flag version is written to the cookie", async () => {
    window.location = {
      ...location,
      hostname: locationHostName,
      reload: jest.fn(),
    };

    const version = "1.2.3";

    mockedUseAuth0.mockReturnValue({ user: { email: "email", name: "name" } });
    mockedUseFlags.mockReturnValue({ ["platform-shell"]: { version } });
    mockedUseLDClient.mockImplementation(() => ({ waitForInitialization: () => Promise.resolve(true) }));

    customRender();

    await waitFor(() => {
      expect(setShellVersionCookie).toHaveBeenCalledWith(version);
    });
  });

  test("7754062: [Given] There is a new version of platform-shell [When] the app is refreshed for the purpose of updating [Then] a isUpdating flag is set (in localStorage)", async () => {
    window.location = {
      ...location,
      hostname: locationHostName,
      reload: jest.fn(),
    };

    const version = "1.2.3";

    mockedUseAuth0.mockReturnValue({ user: { email: "email", name: "name" } });
    mockedUseFlags.mockReturnValue({ ["platform-shell"]: { version } });
    mockedUseLDClient.mockImplementation(() => ({ waitForInitialization: () => Promise.resolve(true) }));

    customRender();

    await waitFor(() => {
      expect(setShellVersionCookie).toHaveBeenCalledWith(version);
    });

    expect(reloadPageOnUrlChange).toBeCalled();

    expect(localStorage.getItem(updateVersionOnRefresh)).toEqual("true");
  });

  test("7138559: [Given] No canary version of platform-shell is provided [Then] the app continues to run the same version", () => {
    mockedUseAuth0.mockReturnValue({ user: { email: "email", name: "name" } });
    mockedUseFlags.mockReturnValue({});
    mockedUseLDClient.mockImplementation(() => ({ waitForInitialization: () => Promise.resolve(true) }));

    customRender();

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  test("7586089: [Given] The version of platform-shell is the same as the canary version [Then] the app continues to run the same version", () => {
    window.location = {
      ...location,
      hostname: locationHostName,
      reload: jest.fn(),
    };

    const expectedVersion = "1.0.0";

    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: `x-q4-shell-version=${expectedVersion}; path=/; SameSite=None; Secure;`,
    });

    mockedGetShellVersionCookie.mockReturnValue(expectedVersion);
    mockedUseAuth0.mockReturnValue({ user: { email: "email", name: "name" } });
    mockedUseFlags.mockReturnValue({ ["platform-shell"]: { version: expectedVersion } });
    mockedUseLDClient.mockImplementation(() => ({ waitForInitialization: () => Promise.resolve(true) }));

    customRender();

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  test("7654724: [Given] I am targeted to receive a different version in LaunchDarkly [When] I navigate to another page [Then] my application reloads and updates automatically", async () => {
    const reload = jest.fn();
    window.location = {
      ...location,
      hostname: locationHostName,
      reload,
    };

    const version = "1.2.3";

    mockedUseAuth0.mockReturnValue({ user: { email: "email", name: "name" } });
    mockedUseFlags.mockReturnValue({ ["platform-shell"]: { version } });
    mockedUseLDClient.mockImplementation(() => ({ waitForInitialization: () => Promise.resolve(true) }));

    customRender();

    await waitFor(() => {
      expect(setShellVersionCookie).toHaveBeenCalledWith(version);
    });

    expect(reloadPageOnUrlChange).toBeCalled();

    window.location = {
      ...location,
      hostname: locationHostName,
      pathname: "/test",
      reload,
    };

    expect(reload).toBeCalled();
  });

  test("7586090: [Given] The version of platform-shell is served latest [Then] expect the cookie to be deleted", async () => {
    window.location = {
      ...location,
      hostname: locationHostName,
      reload: jest.fn(),
    };

    const version = "1.0.0";

    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: `x-q4-shell-version=${version}; path=/; SameSite=None; Secure;`,
    });

    mockedGetShellVersionCookie.mockReturnValue("1.2.3");
    mockedUseAuth0.mockReturnValue({ user: { email: "email", name: "name" } });
    mockedUseFlags.mockReturnValue({ ["platform-shell"]: { version: "latest", name: "latest" } });
    mockedUseLDClient.mockImplementation(() => ({ waitForInitialization: () => Promise.resolve(true) }));

    customRender();

    await waitFor(() => {
      expect(deleteShellVersionCookie).toHaveBeenCalledWith();
    });

    expect(window.document).not.toContain("x-q4-shell-version");

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  test("7754063: [Given] the app has initialized [When] the isUpdating flag is set [Then] a toast notification informs the user about the upgrade [And] the isUpdating flag is cleared", async () => {
    jest.spyOn(Object.getPrototypeOf(localStorage), "removeItem");
    Object.setPrototypeOf(localStorage.removeItem, jest.fn());

    window.location = {
      ...location,
      hostname: locationHostName,
      reload: jest.fn(),
    };

    const expectedVersion = "1.0.0";

    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: `x-q4-shell-version=${expectedVersion}; path=/; SameSite=None; Secure;`,
    });

    mockedGetShellVersionCookie.mockReturnValue(expectedVersion);
    mockedUseAuth0.mockReturnValue({ user: { email: "email", name: "name" } });
    mockedUseFlags.mockReturnValue({ ["platform-shell"]: { version: expectedVersion } });
    mockedUseLDClient.mockImplementation(() => ({ waitForInitialization: () => Promise.resolve(true) }));

    customRender();

    expect(localStorage.getItem(updateVersionOnRefresh)).toEqual("true");

    const success = jest.fn();
    mockUseToastNotificationService.mockReturnValue({
      current: {
        success,
      },
    });

    await waitFor(() => {
      expect(success).toBeCalledWith(VersionUpdatingWording.successful, { autoClose: 90000 });
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith(updateVersionOnRefresh);
  });
});
