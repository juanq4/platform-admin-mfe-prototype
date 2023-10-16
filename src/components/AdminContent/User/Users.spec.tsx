import { SpinnerClassName, ToastContainer } from "@q4/nimbus-ui";
import type { Permission } from "@q4/platform-definitions";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CombinedError } from "urql";
import {
  Auth0HookMock,
  MockAuth0Claims,
  MockAuth0Token,
  MockAuth0User,
} from "../../../__mocks__/contexts/Auth0Context.mock";
import { NimbusConfig } from "../../../__mocks__/contexts/NimbusConfig.mock";
import { MockUser1 } from "../../../__mocks__/data/users.mock";
import { AdminRoutesIdModel } from "../../../components/Routes/Routes.definition";
import { AdminRoutePath } from "../../../configurations/navigation.configuration";
import { AdminLoadingProvider, AdminLoadingContext } from "../../../contexts/loading/loading.context";
import type { AdminLoadingContextProps } from "../../../contexts/loading/loading.definition";
import type { User } from "../../../definitions/user.definition";
import { useIdTokenClaims } from "../../../hooks/useIdTokenClaims/useIdTokenClaims.hook";
import { QueryPaginationDefault } from "../../../hooks/useQuery/useQuery.definition";
import { useUsersLazyQuery } from "../../../schemas/generated/graphql";
import { throttle } from "../../../utils/api/api.utils";
import { fireEvent, render, screen, waitFor } from "../../../utils/testUtils";
import { AdminContent } from "../AdminContent.component";
import {
  AdminOrganizationCondition,
  AdminUsersViewIdModel as ViewIdModel,
  AdminUserViewCreateRoute,
} from "./Users.definition";

jest.mock("../../../schemas/generated/graphql");
const mockUseUsersLazyQuery = useUsersLazyQuery as jest.Mock;
jest.mock("../../../utils/api/api.utils");
const mockThrottle = throttle as unknown as jest.Mock;
jest.mock("../../../hooks/useIdTokenClaims/useIdTokenClaims.hook");
const mockUseIdTokenClaims = useIdTokenClaims as jest.Mock;
jest.mock("../../../hooks/useClaims/useClaims.hook");
const mockUseClaims = useClaims as jest.Mock;
jest.mock("../../../contexts/loading/loading.context");
const mockAdminLoadingProvider = AdminLoadingProvider as jest.Mock;

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => {
  const orginal = jest.requireActual("react-router-dom");
  return {
    ...orginal,
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  };
});
Auth0HookMock({ user: MockAuth0User });

const mockUsers = Array.from(Array(QueryPaginationDefault.PageSize)).map((val, x) => ({
  ...MockUser1,
  id: MockUser1.id.replace(/.$/, x.toString()),
}));

describe("Users View", () => {
  const mockUsersQueryParams = {
    variables: { organizationId: null as string, page: null as string[] },
  };

  const queryUsers = jest.fn();
  const mockQueryReponse = {
    loading: false,
    error: null,
    data: { users: { items: mockUsers } },
  };
  const usersLazyQueryHook = [queryUsers, mockQueryReponse];

  const usersLazyQueryEmptyHook = [queryUsers, { ...usersLazyQueryHook[0], data: { users: { items: [] as User[] } } }];

  const mockUserOrganization = MockAuth0Claims.organizationId;
  const requiredPermissions = AccessRouteMap[AdminRoutePath.Users].permissionCondition.permissions;
  const blockedPermissions = [...AdminOrganizationCondition.permissions, ...requiredPermissions];

  beforeEach(() => {
    mockUseIdTokenClaims.mockReturnValue(MockAuth0Token);
  });

  function customRender(permissions = requiredPermissions, mockUsersQueryHook = usersLazyQueryHook) {
    const { loading } = mockUsersQueryHook[1];
    mockThrottle.mockImplementation((command) => {
      command();
    });
    mockUseClaims.mockReturnValue({ ...MockAuth0Claims, permissions });
    mockAdminLoadingProvider.mockImplementation((props: AdminLoadingContextProps) => {
      const { Provider } = AdminLoadingContext;
      // eslint-disable-next-line testing-library/no-node-access
      return <Provider value={[loading, jest.fn()]}>{props.children}</Provider>;
    });
    mockUseUsersLazyQuery.mockReturnValue(mockUsersQueryHook);

    render(
      <MemoryRouter initialEntries={[AdminRoutePath.Users]}>
        <NimbusConfig.ConfigProvider>
          <AdminContent />
          <ToastContainer />
        </NimbusConfig.ConfigProvider>
      </MemoryRouter>,
    );
  }

  it("7395564: renders without crashing", () => {
    customRender();
  });

  test("1269252: [Given] I am on the admin users view [And] I click the 'Add new' button [Expect] to be redirected to admin users new view", () => {
    customRender();
    const button = screen.getByTestId(ViewIdModel.create.id);
    fireEvent.click(button);
    expect(mockHistoryPush).toBeCalledTimes(1);
    expect(mockHistoryPush).toBeCalledWith(
      expect.objectContaining({
        pathname: AdminUserViewCreateRoute,
        state: expect.objectContaining({
          background: expect.objectContaining({
            pathname: AdminRoutePath.Users,
          }),
        }),
      }),
    );
  });

  test("1269277: [Given] I am on the admin users view [And] I have access to the organization view [Expect] that I should not see the 'ADD NEW' button", () => {
    customRender(blockedPermissions);
    const button = screen.queryByTestId(ViewIdModel.create.id);
    expect(button).not.toBeInTheDocument();
  });

  test("1271125: [Given] I am on the admin users view [And] content is loading [Expect] the admin loading spinner to be present", () => {
    customRender(requiredPermissions, [jest.fn(), { ...mockQueryReponse, loading: true }, jest.fn()]);
    const spinner = screen.getByTestId(AdminRoutesIdModel.loadingSpinner.id);
    expect(spinner).toBeInTheDocument();
  });

  test("1271126: [Given] I am on the admin users view [And] content is not loading [Expect] the admin loading spinner to not be present", () => {
    customRender();
    const spinner = screen.queryByTestId(AdminRoutesIdModel.loadingSpinner.id);
    expect(spinner).not.toBeInTheDocument();
  });

  test("1271127: [Given] I am on the admin users view [When] an error is returned [Expect] the error state to be shown [And] the refresh button to be clickable", () => {
    customRender(requiredPermissions, [
      queryUsers,
      { ...mockQueryReponse, error: new CombinedError({ networkError: new Error("Mock error") }) },
    ]);

    const error = screen.getByTestId(ViewIdModel.table.entityTable.error.id);
    expect(error).toBeInTheDocument();
    expect(error).toMatchSnapshot();

    const refresh = screen.getByTestId(ViewIdModel.table.entityTable.onError.id);
    expect(refresh).toBeInTheDocument();

    fireEvent.click(refresh);
    expect(queryUsers).toBeCalledTimes(2);
    expect(queryUsers).toBeCalledWith({
      variables: { organizationId: mockUserOrganization, page: null },
    });
  });

  test("1271128: [Given] I am on the admin users view [When] when I have the required permissions [Expect] the user table to be present [And] the api to be called", () => {
    customRender();
    expect(queryUsers).toBeCalledTimes(1);
    expect(queryUsers).toBeCalledWith({
      variables: { organizationId: mockUserOrganization, page: null },
    });
    const userTable = screen.getByTestId(ViewIdModel.table.id);
    expect(userTable).toBeInTheDocument();
  });

  test("1271129: [Given] I am on the admin users view [When] no items are returned [Expect] the placeholder to be present [And] the create button to be clickable", () => {
    customRender(requiredPermissions, usersLazyQueryEmptyHook);
    expect(queryUsers).toBeCalledWith({
      variables: { organizationId: mockUserOrganization, page: null },
    });

    const placeholder = screen.getByTestId(ViewIdModel.table.entityTable.placeholder.id);
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toMatchSnapshot();

    const create = screen.getByTestId(ViewIdModel.placeholderCreate.id);
    expect(create).toBeInTheDocument();

    fireEvent.click(create);
    expect(mockHistoryPush).toBeCalledTimes(1);
    expect(mockHistoryPush).toBeCalledWith(
      expect.objectContaining({
        pathname: AdminUserViewCreateRoute,
        state: expect.objectContaining({
          background: expect.objectContaining({
            pathname: AdminRoutePath.Users,
          }),
        }),
      }),
    );
  });

  test("1271130: [Given] I am on the admin users view [When] items are returned [Expect] the table [And] the pagination to be present", () => {
    return (async () => {
      customRender(blockedPermissions);

      expect(queryUsers).toBeCalledWith(mockUsersQueryParams);

      await waitFor(() => {
        // eslint-disable-next-line testing-library/no-node-access
        const spinner = document.querySelector(`#${ViewIdModel.table.entityTable.table} .${SpinnerClassName.Base}`);
        expect(spinner).toBeNull();
      });

      const table = screen.getByTestId(ViewIdModel.table.entityTable.table);
      expect(table).toBeInTheDocument();

      const pagination = screen.getByTestId(ViewIdModel.table.entityTable.pagination.id);
      expect(pagination).toBeInTheDocument();

      const paginationPrevious = screen.getByTestId(ViewIdModel.table.entityTable.pagination.previous.id);
      expect(paginationPrevious).toBeDisabled();

      const paginationNext = screen.getByTestId(ViewIdModel.table.entityTable.pagination.next.id);
      expect(paginationNext).toBeEnabled();
    })();
  });

  function gotoPage2(): void {
    customRender(blockedPermissions);

    expect(queryUsers).toBeCalledWith(mockUsersQueryParams);

    const paginationNext = screen.getByTestId(ViewIdModel.table.entityTable.pagination.next.id);
    fireEvent.click(paginationNext);

    const [lastUser] = mockUsers.slice(-1);
    const pageRef = [lastUser.id, lastUser.organizationId];

    expect(queryUsers).toBeCalledWith({
      ...mockUsersQueryParams,
      variables: { page: pageRef, organizationId: null },
    });
  }

  test(
    "1271131: [Given] I am on the admin users view [And] the pagination to be present [Expect] when the user clicks Next [Then] page 2 is fetched",
    gotoPage2,
  );

  test("1271132: [Given] I am on the admin users view [And] the pagination to be present [Expect] when the user clicks Next [Then] page 1 is fetched", () => {
    gotoPage2();

    const paginationPrevious = screen.getByTestId(ViewIdModel.table.entityTable.pagination.previous.id);
    expect(paginationPrevious).toBeEnabled();

    fireEvent.click(paginationPrevious);
    expect(queryUsers).toBeCalledWith(mockUsersQueryParams);
  });

  function verifySearchPresent(): void {
    const search = screen.getByTestId(ViewIdModel.table.entityTable.search.id);
    expect(search).toBeInTheDocument();
  }
  //#region Search
  test("2908020: [Given] The user is on the admin users view [Then] a search field can be seen", () => {
    customRender();
    verifySearchPresent();
  });

  function handleSearch(
    searchTerm: string,
    key: keyof User,
    permission: Permission[],
    shouldBeCalled = true,
    results = [...mockUsers],
    shouldRender = true,
  ): Promise<void> {
    const mockOrganizationId = permission === blockedPermissions ? null : mockUserOrganization;
    mockUseIdTokenClaims.mockReturnValue({ ...MockAuth0Token });
    mockUseClaims.mockReturnValue({ organizationId: mockOrganizationId });

    if (shouldRender) {
      customRender(permission);
    }

    expect(queryUsers).toBeCalledTimes(1);
    expect(queryUsers).toBeCalledWith({
      variables: { page: null, organizationId: mockOrganizationId },
    });

    const mockSearch = results.map((x) => ({ ...x, [key]: searchTerm }));
    mockUseUsersLazyQuery.mockReturnValue([
      queryUsers,
      {
        ...usersLazyQueryHook[0],
        data: { users: { items: mockSearch } },
      },
    ]);

    const searchInput = screen.getByTestId(ViewIdModel.table.entityTable.search.input);
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    expect((searchInput as HTMLInputElement).value).toBe(searchTerm);
    expect(queryUsers).toBeCalledTimes(1 + +shouldBeCalled);

    if (!shouldBeCalled) return;
    expect(queryUsers).toBeCalledWith({
      variables: { searchTerm, page: null, organizationId: mockOrganizationId },
    });
  }

  async function verifyEmptyTable(emptyText?: string): Promise<void> {
    await waitFor(() => {
      const table = screen.getByTestId(ViewIdModel.table.entityTable.id);
      if (emptyText) expect(table).toHaveTextContent(emptyText);
    });
  }

  const mockSearchTerm = "Gua";
  const nameKey = "firstName";

  it.each([[requiredPermissions], [blockedPermissions]])(
    "2908016: [Given] The user is on the admin users view [When] the user has types in search [Then] expect a call to be made to the search api",
    (permissions) => {
      handleSearch(mockSearchTerm, nameKey, permissions, true);
    },
  );

  test("2908023: [Given] The user is on the admin users view [When] I search for users in my organization [Then] expect that the users returned belong to only my organization", () => {
    customRender();
    const searchInput = screen.getByTestId(ViewIdModel.table.entityTable.search.input);
    fireEvent.change(searchInput, { target: { value: "searchTerm" } });
    expect((searchInput as HTMLInputElement).value).toBe("searchTerm");
    const myOrganizationId = mockUserOrganization;

    expect(queryUsers).toBeCalledTimes(2);
    expect(queryUsers).toHaveBeenNthCalledWith(1, {
      variables: { organizationId: myOrganizationId, page: null },
    });
    expect(queryUsers).toHaveBeenNthCalledWith(2, {
      variables: { organizationId: myOrganizationId, page: null, searchTerm: "searchTerm" },
    });
  });

  it.each([[requiredPermissions], [blockedPermissions]])(
    "2908018: [Given] The user is on the admin users view [When] there are more than 10 results [Then] expect the pagination to show and the next button to be enabled",
    (permissions) => {
      handleSearch(mockSearchTerm, nameKey, permissions);
      const pagination = screen.getByTestId(ViewIdModel.table.entityTable.pagination.id);
      expect(pagination).toBeInTheDocument();
    },
  );

  it.each([[requiredPermissions], [blockedPermissions]])(
    "2908019: [Given] The user is on the admin users view [When] the user searches by a valid first name [Then] expect results to show",
    (permissions) => {
      handleSearch("Guardians", nameKey, permissions);
    },
  );

  it.each([[requiredPermissions], [blockedPermissions]])(
    "2908021: [Given] The user is on the admin users view [When] the user has searched for something that returns no results [Then] expect the search results table to be empty",
    (permissions) => {
      return (async () => {
        handleSearch(mockSearchTerm, nameKey, permissions, true, []);
        await verifyEmptyTable("No data available");
      })();
    },
  );

  it.each([[requiredPermissions], [blockedPermissions]])(
    "2908022: [Given] The user is on the admin users view [When] the user clears the search field [Then] expect the original list of users to show [And] the user is returned to the first page",
    (permissions) => {
      handleSearch(mockSearchTerm, nameKey, permissions);
      const clearSearch = screen.getByTestId(ViewIdModel.table.entityTable.search.clear);
      const searchInput = screen.getByTestId(ViewIdModel.table.entityTable.search.input);
      fireEvent.click(clearSearch);
      expect((searchInput as HTMLInputElement).value).toBe("");
      expect(queryUsers).toBeCalledTimes(3);
      expect(queryUsers).toBeCalledWith({
        variables: { page: null, organizationId: permissions === blockedPermissions ? null : mockUserOrganization },
      });
    },
  );

  it.each([[requiredPermissions], [blockedPermissions]])(
    "2908027: [Given] The user is on the admin users view [When] the user searches for a valid 'last name' [Then] expect results to show",
    (permissions) => {
      handleSearch(mockSearchTerm, "lastName", permissions);
    },
  );

  it.each([[requiredPermissions], [blockedPermissions]])(
    "2908028: [Given] The user is on the admin users view [When] the user searches for a valid 'email' [Then] expect results to show",
    (permissions) => {
      handleSearch(mockUsers[0].id, "email", permissions);
    },
  );

  it.each([[requiredPermissions], [blockedPermissions]])(
    "2939227: [Given] The user is on the admin users view [When] there are no users [Then] show the search input",
    (permissions) => {
      customRender(permissions, usersLazyQueryEmptyHook);
      verifySearchPresent();
    },
  );

  it.each([[requiredPermissions], [blockedPermissions]])(
    "2939238: [Given] The user is on the admin users view [When] there are no users [Then] show the search input and [Then] expect a search to return no results",
    (permissions) => {
      return (async () => {
        customRender(permissions, usersLazyQueryEmptyHook);
        verifySearchPresent();
        handleSearch(mockSearchTerm, nameKey, permissions, true, [], false);
        await verifyEmptyTable();
      })();
    },
  );
  //#endregion Search
});
