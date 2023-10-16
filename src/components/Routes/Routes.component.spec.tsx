import React from "react";
import { MemoryRouter } from "react-router-dom";
import type { UseQueryState } from "urql";
import { CombinedError } from "urql";
import { Auth0HookMock, MockAuth0Token, MockAuth0User } from "../../__mocks__/contexts/Auth0Context.mock";
import { AccessRouteMap, PermissionCollection } from "../../configurations/access.configuration";
import { AdminRoutePath } from "../../configurations/navigation.configuration";
import { OrganizationClaim } from "../../configurations/q4-platform-common.configuration";
import { useAdminData } from "../../contexts/data/data.hook";
import { AdminLoadingProvider } from "../../contexts/loading/loading.context";
// import { useAccess } from "../../hooks/useAccess/useAccess.hook";
import { useIdTokenClaims } from "../../hooks/useIdTokenClaims/useIdTokenClaims.hook";
import type { OrganizationsLazyQueryResponse } from "../../hooks/useOrganization/useOrganization.definition";
import { useOrganizationsLazyQuery } from "../../hooks/useOrganization/useOrganization.hook";
import type { UsersQueryResponse } from "../../hooks/useUser/useUser.definition";
import { useUsersLazyQuery } from "../../hooks/useUser/useUser.hook";
import type { UsersQueryVariables } from "../../schemas/generated/graphql";
import { getDefaultAdminRoute } from "../../utils/route/route.utils";
import { render, screen } from "../../utils/testUtils";
import { AdminOrganizationTableDefault } from "../Tables/organization/AdminOrganizationTable.definition";
import { AdminUserTableDefault } from "../Tables/user/AdminUserTable.definition";
import { AdminRoutes } from "./Routes.component";
import { AdminRoutesIdModel } from "./Routes.definition";

jest.mock("../../utils/route/route.utils");
const mockGetDefaultAdminRoute = getDefaultAdminRoute as jest.Mock;

jest.mock("../../hooks/useOrganization/useOrganization.hook");
const mockUseOrganizationsLazyQuery = useOrganizationsLazyQuery as jest.Mock;
jest.mock("../../hooks/useUser/useUser.hook");
const mockUseUsersLazyQuery = useUsersLazyQuery as jest.Mock;
jest.mock("../../hooks/useIdTokenClaims/useIdTokenClaims.hook");
const mockUseIdTokenClaims = useIdTokenClaims as jest.Mock;
jest.mock("../../hooks/useAccess/useAccess.hook");
const mockUseAccess = useAccess as jest.Mock;
jest.mock("../../contexts/session/useSession.hook");
const mockUseClaims = useClaims as jest.Mock;
jest.mock("../../contexts/data/data.hook");
const mockUseAdminData = useAdminData as jest.Mock;

Auth0HookMock({ user: { ...MockAuth0User, [OrganizationClaim]: undefined } });

describe("Admin Routes", () => {
  const queryOrganizations = jest.fn();
  const mockOrganizationsQueryReponse: Partial<OrganizationsLazyQueryResponse & { fetching: boolean; isCalled: boolean }> = {
    fetching: true,
    error: new CombinedError({}),
    isCalled: true,
  };
  const organizationsLazyQueryHook = [mockOrganizationsQueryReponse, queryOrganizations] as ReturnType<
    typeof useOrganizationsLazyQuery
  >;

  const queryUsers = jest.fn();
  const mockUserQueryReponse: Partial<UseQueryState<UsersQueryResponse, UsersQueryVariables>> = {
    fetching: true,
    error: new CombinedError({}),
  };
  const usersLazyQueryHook = [mockUserQueryReponse, queryUsers] as ReturnType<typeof useUsersLazyQuery>;

  beforeAll(() => {
    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsLazyQueryHook);
    mockUseUsersLazyQuery.mockReturnValue(usersLazyQueryHook);
    mockUseIdTokenClaims.mockReturnValue(MockAuth0Token);
    mockUseAccess.mockReturnValue({ hasNotificationPreferences: false });
    mockUseClaims.mockReturnValue({
      permissions: [],
      entitlements: [],
    });
    mockUseAdminData.mockReturnValue({ setCachedVariables: jest.fn() });
  });

  function customRender(route: string, expectedPath: AdminRoutePath) {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <AdminLoadingProvider>
          <AdminRoutes
            features={null}
            permissions={AccessRouteMap[expectedPath].permissionCondition.permissions}
            entitlements={null}
          />
        </AdminLoadingProvider>
      </MemoryRouter>,
    );
  }

  test("3499145: [Given] the user goes to an invalid route admin route [And] the user had the 'q4graph:read:organizations' permission [Then] expect the user to see the 'Not Found' component", () => {
    customRender(`${AdminRoutePath.Home}/mockRoute`, AdminRoutePath.Organizations);

    const view = screen.getByTestId(AdminRoutesIdModel.notFound.id);
    expect(view).toBeInTheDocument();
  });

  test(`5308711: [Given] an authenticated user without q4graph:manage:organizations permission try to access ${AdminRoutePath.OrganizationsCreate} page via direct URL [Then] expect error page to be thrown`, () => {
    render(
      <MemoryRouter initialEntries={[AdminRoutePath.OrganizationsCreate]}>
        <AdminLoadingProvider>
          <AdminRoutes features={null} permissions={PermissionCollection.ReadOrganizations} entitlements={null} />
        </AdminLoadingProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText("Oops! Page not found.")).toBeVisible();
  });

  test("9119055: [Given] admin user has permissions to read organization [Then] Organization page should be shown as default", () => {
    mockGetDefaultAdminRoute.mockReturnValue(AdminRoutePath.Organizations);

    render(
      <MemoryRouter initialEntries={[AdminRoutePath.Home]}>
        <AdminLoadingProvider>
          <AdminRoutes features={null} permissions={PermissionCollection.ReadOrganizations} entitlements={null} />
        </AdminLoadingProvider>
      </MemoryRouter>,
    );

    const organizationTitle = screen.getByText(AdminOrganizationTableDefault.ToolbarTitle);

    expect(organizationTitle).toBeVisible();
  });

  test("9119056: [Given] admin user has permissions to read organization [Then] Users page should be shown as default", () => {
    mockGetDefaultAdminRoute.mockReturnValue(AdminRoutePath.Users);

    render(
      <MemoryRouter initialEntries={[AdminRoutePath.Home]}>
        <AdminLoadingProvider>
          <AdminRoutes features={null} permissions={PermissionCollection.ReadUsers} entitlements={null} />
        </AdminLoadingProvider>
      </MemoryRouter>,
    );

    const userTitle = screen.getByText(AdminUserTableDefault.ToolbarTitle);

    expect(userTitle).toBeVisible();
  });
});
