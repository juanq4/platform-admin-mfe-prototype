import { useAuth0 } from "@auth0/auth0-react";
import type { MfeProps } from "@q4/platform-definitions";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { ApplicationName } from "../../configurations/application.configuration";
import { useApplication, useUser } from "../../contexts";
import { useIdTokenClaims, useAccessTokenTemp, useClaims } from "../../hooks";
import { useCurrentOrganization, useOrganization } from "../../hooks/_apollo";
import { fireEvent, render, screen } from "../../utils/testUtils";
import { MfeApp } from "./MfeApp.component";
import { MfeKey, Mfes } from "./MfeApp.definition";

jest.mock("@auth0/auth0-react");
const mockedUseAuth0 = useAuth0 as jest.Mock;

jest.mock("react-responsive");
const mockedUseMediaQuery = useMediaQuery as jest.Mock;

jest.mock("../../contexts");
const mockedUseApplication = useApplication as jest.Mock;
const mockedUseUser = useUser as jest.Mock;

jest.mock("../../hooks/");
const mockedUseIdTokenClaims = useIdTokenClaims as jest.Mock;
const mockedUseClaims = useClaims as jest.Mock;
const mockedUseAccessTokenTemp = useAccessTokenTemp as jest.Mock;

jest.mock("../../hooks/_apollo/");
const mockedUseOrganization = useOrganization as jest.Mock;
const mockedUseCurrentOrganization = useCurrentOrganization as jest.Mock;

const auth0 = { logout: jest.fn() };

const application = { name: "Application" };

const idTokenClaims = {
  __raw: "A token",
};

const userClaims = {
  userId: "user id",
  organizationId: "organization id",
  newClaimOrganizationId: "organization id",
  entitlements: ["studio"],
};

const mfeErrorTitle = "Oops! Something went wrong.";

describe("Mfe", () => {
  beforeEach(() => {
    mockedUseMediaQuery.mockReturnValue(false);
    mockedUseAuth0.mockReturnValue(auth0);
    mockedUseApplication.mockReturnValue(application);
    mockedUseAccessTokenTemp.mockReturnValue({
      value: "access token",
      isLoading: false,
      error: undefined,
    });
    mockedUseIdTokenClaims.mockReturnValue(idTokenClaims);
    mockedUseClaims.mockReturnValue(userClaims);
    mockedUseOrganization.mockReturnValue({
      data: {
        organization: {
          id: "org-id",
          name: "Spotify",
          entitlements: ["studio"],
          identifiers: [],
        },
      },
    });
    mockedUseUser.mockReturnValue({
      user: {
        active: true,
        email: "shell_user@q4inc.com",
        firstName: "shell",
        friendlyName: "user",
        id: "user-id",
        lastName: "user",
        title: "",
      },
    });
    mockedUseCurrentOrganization.mockReturnValue({
      data: {
        organization: {
          id: "org-id",
          name: "Spotify",
          entitlements: ["studio"],
          identifiers: [],
        },
      },
    });
  });

  describe("render spinner", () => {
    it("7390300: is loading organization", () => {
      mockedUseCurrentOrganization.mockReturnValue({ loading: true });
      render(<MfeApp />);
      expect(screen.getByTestId("spinner")).toBeVisible();
    });

    it("7390302: is loading accessToken", () => {
      mockedUseAccessTokenTemp.mockReturnValue({
        value: undefined,
        isLoading: true,
        error: undefined,
      });

      render(<MfeApp />);
      expect(screen.getByTestId("spinner")).toBeVisible();
    });

    it("7390303: is loading idToken", () => {
      mockedUseIdTokenClaims.mockReturnValue({
        ...idTokenClaims,
        __raw: undefined,
      });
      render(<MfeApp />);
      expect(screen.getByTestId("spinner")).toBeVisible();
    });
  });

  describe("render application name", () => {
    test("11169138: [Given] I'm using a device with a screen size less than 480px [And] the application is not the Home application [Then] the application name is visible", () => {
      mockedUseMediaQuery.mockReturnValue(true);

      Mfes[MfeKey.Request] = (() => <div />) as unknown as (typeof Mfes)[MfeKey.Request];
      render(<MfeApp id={MfeKey.Request} />);

      expect(screen.getByText(application.name)).toBeInTheDocument();
    });

    test("11169139: [Given] I'm using a device with a screen size greater than 480px [Then] the application name is not visible", () => {
      mockedUseMediaQuery.mockReturnValue(false);

      Mfes[MfeKey.Request] = (() => <div />) as unknown as (typeof Mfes)[MfeKey.Request];
      render(<MfeApp id={MfeKey.Request} />);

      expect(screen.queryByText(application.name)).not.toBeInTheDocument();
    });

    test("11169140: [Given] the application is the Home application [Then] the application name is not visible", () => {
      Mfes[MfeKey.Home] = (() => <div />) as unknown as (typeof Mfes)[MfeKey.Home];

      render(<MfeApp id={MfeKey.Home} />);

      expect(screen.queryByText(application.name)).not.toBeInTheDocument();
    });

    test("11543023: [Given] the application is Engagement Analytics [And] the tier is starter [Then] the tier name is visible", () => {
      mockedUseMediaQuery.mockReturnValue(true);
      mockedUseApplication.mockReturnValue({ name: ApplicationName.EngagementAnalytics, tier: "starter" });
      Mfes[MfeKey.EngagementAnalytics] = (() => <div />) as unknown as (typeof Mfes)[MfeKey.EngagementAnalytics];

      render(<MfeApp id={MfeKey.EngagementAnalytics} />);

      expect(screen.getByText("starter")).toBeInTheDocument();
    });
  });

  describe("render app", () => {
    it("7390304: is engagement-analytics", () => {
      const text = "Engagement Analytics App";
      Mfes[MfeKey.EngagementAnalytics] = (() => <>{text}</>) as unknown as (typeof Mfes)[MfeKey.EngagementAnalytics];
      render(<MfeApp id={MfeKey.EngagementAnalytics} />);
      expect(screen.getByText(text)).toBeVisible();
    });

    it("7390305: is request", () => {
      const text = "Request App";
      Mfes[MfeKey.Request] = (() => <>{text}</>) as unknown as (typeof Mfes)[MfeKey.Request];
      render(<MfeApp id={MfeKey.Request} />);
      expect(screen.getByText(text)).toBeVisible();
    });

    test("5112914: [Given] I am a user of Capital Connect [And] I have selected an organization to manage [Then] this organizationId is passed to the consuming MFE modules", () => {
      Mfes[MfeKey.Request] = (({ context }: MfeProps) => (
        <>{context?.organization?.id}</>
      )) as unknown as (typeof Mfes)[MfeKey.Request];

      render(<MfeApp id={MfeKey.Request} />);

      expect(screen.getByText("org-id")).toBeVisible();
    });
  });

  describe("Error Pages", () => {
    const error = new Error("error");

    test("4326944: [Given] MFE fails to load [When] there's an error fetching the organization [Then] expect error page to be displayed", () => {
      mockedUseCurrentOrganization.mockReturnValue({ error });
      render(<MfeApp id={MfeKey.Request} />);
      expect(screen.getByAltText(mfeErrorTitle)).toBeInTheDocument();
    });

    test("4473174: [Given] MFE fails to load [When] there's an error fetching the accessToken [Then] expect error page to be displayed", () => {
      mockedUseAccessTokenTemp.mockReturnValue({
        value: undefined,
        isLoading: false,
        error,
      });
      render(<MfeApp id={MfeKey.Request} />);
      expect(screen.getByAltText(mfeErrorTitle)).toBeInTheDocument();
    });

    test("4326945: [Given] MFE crashes [Then] expect error page to be displayed", () => {
      Mfes[MfeKey.EngagementAnalytics] = (() => {
        throw new Error("error");
      }) as unknown as (typeof Mfes)[MfeKey.EngagementAnalytics];
      render(<MfeApp id={MfeKey.EngagementAnalytics} />);
      expect(screen.getByAltText(mfeErrorTitle)).toBeInTheDocument();
    });

    test("11302564: [Given] MFE crashes [And] error page is visible [Then] expect 'Sign out' button to be present", () => {
      Mfes[MfeKey.EngagementAnalytics] = (() => {
        throw new Error("error");
      }) as unknown as (typeof Mfes)[MfeKey.EngagementAnalytics];
      render(<MfeApp id={MfeKey.EngagementAnalytics} />);
      expect(screen.getByAltText(mfeErrorTitle)).toBeInTheDocument();
      expect(screen.getByText("Sign out")).toBeInTheDocument();
    });

    test("11302565: [Given] MFE crashes [And] error page is visible [Then] expect 'Sign out' button to log me out", () => {
      Mfes[MfeKey.EngagementAnalytics] = (() => {
        throw new Error("error");
      }) as unknown as (typeof Mfes)[MfeKey.EngagementAnalytics];
      render(<MfeApp id={MfeKey.EngagementAnalytics} />);
      expect(screen.getByAltText(mfeErrorTitle)).toBeInTheDocument();
      const signoutBtn = screen.getByText("Sign out");
      fireEvent.click(signoutBtn);
      expect(auth0.logout).toHaveBeenCalledTimes(1);
    });
  });
});
