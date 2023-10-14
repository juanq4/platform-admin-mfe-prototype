import type { ApolloError } from "@apollo/client";
import React from "react";
import { Auth0HookMock } from "../../__mocks__/contexts/Auth0Context.mock";
import { TokenClaim } from "../../definitions/token.definition";
import { useUserQuery, useOrganizationQuery, useOrganizationsManagedByUserQuery } from "../../schemas/generated/graphql";
import { throwError } from "../../utils/error/error.utils";
import { render, screen, waitFor } from "../../utils/testUtils";
import { UserProvider } from "./user.context";

jest.mock("@auth0/auth0-react");
jest.mock("./user.utils");
jest.mock("../../schemas/generated/graphql");
const mockUseUserQuery = useUserQuery as jest.Mock;
const mockUseOrganizationQuery = useOrganizationQuery as jest.Mock;
const mockUseOrganizationsManagedByUserQuery = useOrganizationsManagedByUserQuery as jest.Mock;
jest.mock("../../utils/error/error.utils");
const mockThrowError = throwError as jest.Mock;

const useUserQueryResponse = {
  loading: false,
  error: null,
  data: { user: { items: [] } },
  operation: null,
  stale: null,
} as unknown as ReturnType<typeof useUserQuery>;

const useOrganizationQueryResponse = {
  loading: false,
  error: null,
  data: { organizations: { items: [] } },
  operation: null,
  stale: null,
} as unknown as ReturnType<typeof useOrganizationQuery>;

const useOrganizationsManagedByUserQueryResponse = {
  loading: false,
  error: null,
  data: { managedOrganizations: { items: [] } },
  operation: null,
  stale: null,
} as unknown as ReturnType<typeof useOrganizationsManagedByUserQuery>;

const getIdTokenClaimsMock = jest.fn().mockResolvedValue({});

const userId = "cf5a454e-3cb4-4511-931b-9c5fc547d5ce";

describe("User Context", () => {
  Auth0HookMock({
    getAccessTokenSilently: jest.fn().mockResolvedValue({}),
    getIdTokenClaims: getIdTokenClaimsMock,
    user: {
      [TokenClaim.UserId]: userId,
    },
  });

  beforeEach(() => {
    mockUseUserQuery.mockReturnValue(useUserQueryResponse);
    mockUseOrganizationQuery.mockReturnValue(useOrganizationQueryResponse);
    mockUseOrganizationsManagedByUserQuery.mockReturnValue(useOrganizationsManagedByUserQueryResponse);
  });

  test("7024164: [Given] the account details are not loading [Then] expect the loading screen to not be rendered", () => {
    render(<UserProvider />);

    const RootLoading = screen.queryByTestId(RootViewIdModel.loading);
    expect(RootLoading).not.toBeInTheDocument();
  });

  test("7024165: [Given] an account error is returned [Then] expect an error screen to appear", () => {
    const errorMessage = "error";
    mockUseUserQuery.mockReturnValueOnce({
      ...useUserQueryResponse,
      loading: false,
      error: { message: errorMessage } as ApolloError,
    });

    render(<UserProvider />);

    expect(mockThrowError).toBeCalled();
    expect(mockThrowError).toBeCalledWith("Account", new Error(errorMessage));
  });

  test("8893157: [Given] the claim is retrieved [Then] it should fetch organization data with user's current organization id (original or impersonating)", async () => {
    const managedOrganizationId = "a1566aa7-7e61-4f78-a1a7-c51ce5b36f70";
    getIdTokenClaimsMock.mockResolvedValue({
      [TokenClaim.OrganizationId]: "3130eb0c-9049-435e-9ead-79534807cead",
      [TokenClaim.NewClaimOrganizationId]: managedOrganizationId,
    });

    render(<UserProvider />);

    await waitFor(() => {
      expect(mockUseOrganizationQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: { id: managedOrganizationId },
        }),
      );
    });
  });

  test("8893158: [Given] the claim is retrieved [Then] it should fetch user data with user's organization id", async () => {
    const userOrganizationId = "3130eb0c-9049-435e-9ead-79534807cead";
    getIdTokenClaimsMock.mockResolvedValue({
      [TokenClaim.OrganizationId]: userOrganizationId,
      [TokenClaim.NewClaimOrganizationId]: "a1566aa7-7e61-4f78-a1a7-c51ce5b36f70",
      user: {
        [TokenClaim.UserId]: userId,
      },
    });

    render(<UserProvider />);

    await waitFor(() => {
      expect(mockUseUserQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: { id: userOrganizationId, userId },
        }),
      );
    });
  });
});
