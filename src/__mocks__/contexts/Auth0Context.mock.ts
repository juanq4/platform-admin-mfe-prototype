import { useAuth0 } from "@auth0/auth0-react";
import type { IdToken } from "@auth0/auth0-react";
import { Entitlements } from "../../configurations/entitlement.configuration";
// import type { Claims } from "../../hooks/useClaims/useClaims.definition";

jest.mock("@auth0/auth0-react", () => ({
  withAuthenticationRequired: jest.fn().mockImplementation((component) => component),
  useAuth0: jest.fn(),
}));

export const MockAuth0User = {
  "email": "kevinp@q4inc.com",
  "email_verified": false,
  "https://app.q4inc.com/organization": "1093454e-cde4-4ddb-8eb7-dbbda52919ef",
  "https://connect.q4inc.com/entitlements": "[]",
  "https://connect.q4inc.com/permissions": "[]",
  "name": "Kevin Polson",
  "nickname": "Star-Lord",
  "picture":
    "https://s.gravatar.com/avatar/cab20bc6723dfc4a49ea0e18f0f500b5?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fke.png",
  "sub": "auth0|616da87f8da2d300693341cc",
  "updated_at": "2022-01-05T15:45:16.092Z",
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Auth0HookMock = (props?: Partial<ReturnType<typeof useAuth0>>) => {
  return (useAuth0 as jest.MockedFunction<typeof useAuth0>).mockReturnValue({
    isAuthenticated: true,
    isLoading: false,
    error: null,
    buildAuthorizeUrl: jest.fn(),
    buildLogoutUrl: jest.fn(),
    getAccessTokenSilently: jest.fn().mockResolvedValue("A token"),
    getAccessTokenWithPopup: jest.fn(),
    getIdTokenClaims: jest.fn(),
    handleRedirectCallback: jest.fn(),
    loginWithRedirect: jest.fn(),
    loginWithPopup: jest.fn(),
    logout: jest.fn(),
    user: MockAuth0User,
    ...props,
  });
};

const mockOrganizationId = "mockOrganizationId";
const mockUserId = "mockUserId";
const mockEmail = "mockEmail";
export const MockAuth0Token: IdToken = {
  __raw: null,
};

export const MockAuth0Claims: Claims = {
  organizationId: mockOrganizationId,
  userId: mockUserId,
  email: mockEmail,
  entitlements: Entitlements,
  permissions: [],
};
