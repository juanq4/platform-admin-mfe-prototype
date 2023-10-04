import { useAuth0 } from "@auth0/auth0-react";
import { createSerializer } from "@emotion/jest";
import { Entitlement } from "@q4/platform-definitions";
import React from "react";
import { NotificationPreferences, notificationTitles } from "..";
import { useUser } from "../../contexts";
import { useIdTokenClaims, useClaims, useAccessTokenTemp, useUserQuery, useAccount } from "../../hooks";
import { useCurrentOrganization } from "../../hooks/_apollo";
import { render, screen } from "../../utils/testUtils";
import { MfeKey, Mfes } from "../MfeApp/MfeApp.definition";

expect.addSnapshotSerializer(createSerializer());

jest.mock("@auth0/auth0-react");
const mockedUseAuth0 = useAuth0 as jest.Mock;

jest.mock("../../hooks/");
const mockedUseIdTokenClaims = useIdTokenClaims as jest.Mock;
const mockedUseClaims = useClaims as jest.Mock;
const mockedUseAccessTokenTemp = useAccessTokenTemp as jest.Mock;
const mockedUseUserQuery = useUserQuery as jest.Mock;
const mockedUseAccount = useAccount as jest.Mock;

jest.mock("../../hooks/_apollo/");
const mockedUseCurrentOrganization = useCurrentOrganization as jest.Mock;

jest.mock("../../contexts");
const mockedUseUser = useUser as jest.Mock;

const idTokenClaims = {
  __raw: "A token",
};

const userClaims = {
  userId: "user id",
  organizationId: "organization id",
  newClaimOrganizationId: "organization id",
  entitlements: [Entitlement.EngagementAnalytics],
};

const mfeErrorTitle = "Oops! Something went wrong.";

describe("Notification Preferences", () => {
  beforeEach(() => {
    mockedUseAuth0.mockReturnValue("auth0");
    mockedUseAccessTokenTemp.mockReturnValue({
      value: "access token",
      isLoading: false,
      error: undefined,
    });
    mockedUseIdTokenClaims.mockReturnValue(idTokenClaims);
    mockedUseClaims.mockReturnValue(userClaims);
    mockedUseCurrentOrganization.mockReturnValue({
      data: {
        organization: {
          id: "org-id",
          name: "Spotify",
          entitlements: [Entitlement.EngagementAnalytics],
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
    mockedUseAccount.mockReturnValue([{ entitlements: [Entitlement.EngagementAnalytics] }]);
    mockedUseUserQuery.mockReturnValue([{ data: "user data" }]);
  });

  test("7332021: [Given] the user is on the notification preferences page [And] the user's organization has the Entitlement Analytics entitlement [Then] the Engagement Analytics preferences MFE is visible", () => {
    const text = "engagement-analytics notifications";
    Mfes[MfeKey.EngagementAnalyticsNotification] = (() => (
      <>{text}</>
    )) as unknown as (typeof Mfes)[MfeKey.EngagementAnalyticsNotification];

    render(<NotificationPreferences />);

    expect(screen.getByText(notificationTitles[MfeKey.EngagementAnalyticsNotification])).toBeVisible();
    expect(screen.getByText(text)).toBeVisible();
  });

  test("7332022: [Given] the user is on the notification preferences page [And] the user's organization has the Entitlement Analytics entitlement [When]the MFE is loading [Then] a spinner is visible", () => {
    mockedUseCurrentOrganization.mockReturnValue({ loading: true });
    render(<NotificationPreferences />);
    expect(screen.getByTestId("spinner")).toBeVisible();
  });

  test("7332023: [Given] the user is on the notification preferences page [And] the user's organization has the Entitlement Analytics entitlement [When]the MFE crashes [Then] an error component is shown", () => {
    Mfes[MfeKey.EngagementAnalyticsNotification] = (() => {
      throw new Error("error");
    }) as unknown as (typeof Mfes)[MfeKey.EngagementAnalyticsNotification];
    render(<NotificationPreferences />);
    expect(screen.getByAltText(mfeErrorTitle)).toBeInTheDocument();
  });

  test("7332024: [Given] A notification preferences MFE is rendered [Then] it receives all MFE props", () => {
    const text = "engagement-analytics notifications";
    let actual;
    Mfes[MfeKey.EngagementAnalyticsNotification] = ((props: unknown) => {
      actual = props;
      return <>{text}</>;
    }) as unknown as (typeof Mfes)[MfeKey.EngagementAnalyticsNotification];

    render(<NotificationPreferences />);

    expect(screen.getByText(text)).toBeVisible();
    expect(actual.context).toEqual(
      expect.objectContaining({
        userId: "user id",
        organization: {
          id: "org-id",
          name: "Spotify",
          entitlements: [Entitlement.EngagementAnalytics],
          identifiers: [],
        },
        role: undefined,
        roles: undefined,
        claims: {
          __raw: "A token",
          email: undefined,
          email_verified: undefined,
          name: undefined,
          nickname: undefined,
        },
        entitlements: [Entitlement.EngagementAnalytics],
      }),
    );
    expect(actual.token).toEqual("access token");
  });
});
