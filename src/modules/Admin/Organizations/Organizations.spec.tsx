import { CombinedError } from "@urql/core";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Auth0HookMock } from "../../../__mocks__/contexts/Auth0Context.mock";
import { NimbusConfig } from "../../../__mocks__/contexts/NimbusConfig.mock";
import { MockOrganizations } from "../../../__mocks__/data/organizations.mock";
import { AdminRoutesIdModel } from "../../../components/Admin/Routes/Routes.definition";
import { AccessRouteMap, PermissionCollection } from "../../../configurations/access.configuration";
import { AdminRoutePath } from "../../../configurations/navigation.configuration";
import type { Organization } from "../../../definitions/organization.definition";
import { useClaims } from "../../../hooks/useClaims/useClaims.hook";
import { useOrganizationsLazyQuery } from "../../../schemas/generated/graphql";
import { throttle } from "../../../utils/api/api.utils";
import { fireEvent, render, screen, waitFor } from "../../../utils/testUtils";
import { Admin } from "../Admin.view";
import { AdminOrganizationsToolbarActions, AdminOrganizationsViewIdModel as ViewIdModel } from "./Organizations.definition";
import { Organizations } from "./Organizations.view";

jest.mock("../../../schemas/generated/graphql");
const mockUseOrganizationsLazyQuery = useOrganizationsLazyQuery as jest.Mock;
jest.mock("../../../utils/api/api.utils");
const mockThrottle = throttle as unknown as jest.Mock;
jest.mock("../../../hooks/useClaims/useClaims.hook");
const mockUseClaims = useClaims as jest.Mock;
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => {
  const orginal = jest.requireActual("react-router-dom");
  return {
    ...orginal,
    useHistory: () => ({
      location: { pathname: "/" },
      push: mockHistoryPush,
    }),
    useLocation: jest.fn(),
  };
});

Auth0HookMock();

describe("Organizations View", () => {
  mockClipboardWrite();

  const mockOrganizationQueryParams = {
    variables: { page: null as string[], pageSize: 10, searchTerm: undefined },
  };

  const queryOrganizations = jest.fn();
  const mockQueryReponse = {
    loading: false,
    error: null,
    data: { organizations: { items: MockOrganizations } },
  };

  const organizationsLazyQueryHook = [queryOrganizations, mockQueryReponse];

  const organizationsLazyQueryEmptyHook = [
    queryOrganizations,
    { ...organizationsLazyQueryHook[0], data: { organizations: { items: [] as Organization[] } } },
  ];

  const requiredPermissions = AccessRouteMap[AdminRoutePath.OrganizationsCreate].permissionCondition.permissions;

  it("7395556: renders without crashing", () => {
    mockUseClaims.mockReturnValue({ permissions: requiredPermissions });

    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsLazyQueryHook);

    render(<Organizations />);
  });

  test("1269253: [Given] I am on the admin organization view [And] I click the 'Create new' button [Expect] to be redirected to admin organization new view", () => {
    mockUseClaims.mockReturnValue({ permissions: requiredPermissions });
    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsLazyQueryHook);
    render(<Organizations />);
    const button = screen.getByTestId(ViewIdModel.addNew.id);
    fireEvent.click(button);
    expect(mockHistoryPush).toBeCalledTimes(1);
    expect(mockHistoryPush).toBeCalledWith(
      expect.objectContaining({
        pathname: AdminRoutePath.OrganizationsCreate,
        state: { background: undefined, show: "organizationCreateModal" },
      }),
    );
  });

  function customRender(permissions = requiredPermissions, mockOrganizationsQueryHook = organizationsLazyQueryHook) {
    mockUseClaims.mockReturnValue({ permissions });
    mockUseOrganizationsLazyQuery.mockReturnValue(mockOrganizationsQueryHook);
    mockThrottle.mockImplementation((command) => {
      command();
    });

    render(
      <MemoryRouter initialEntries={[AdminRoutePath.Organizations]}>
        <NimbusConfig.ConfigProvider>
          <Admin />
        </NimbusConfig.ConfigProvider>
      </MemoryRouter>,
    );
  }

  test("1257052: [Given] I am on the Admin Organizations view [And] I don't have the required permissions [Expect] the page doesn't load", () => {
    return (() => {
      customRender(null);

      const viewElement = screen.queryByTestId(ViewIdModel.id);
      expect(viewElement).not.toBeInTheDocument();
    })();
  });

  test("1229485: [Given] I am on the Admin Organizations view [And] the organizations have loaded [Expect] the table to render them", () => {
    return (async () => {
      customRender();

      await waitFor(() => {
        const LastOrg = MockOrganizations[MockOrganizations.length - 1];
        const orgCellId = ViewIdModel.orgIdCellList.getId(LastOrg.id);
        const orgCell = screen.queryByTestId(orgCellId);
        expect(orgCell).toBeInTheDocument();
      });

      const view = screen.getByTestId(ViewIdModel.id);
      expect(view).toMatchSnapshot();
    })();
  });

  test("3429362: [Given] I am on the Admin Organizations view [And] the user clicks on a organization copy cell [Then] expect the user to remain on the organizations view", () => {
    return (async () => {
      mockUseClaims.mockReturnValue({ permissions: requiredPermissions });
      mockUseOrganizationsLazyQuery.mockReturnValue(organizationsLazyQueryHook);
      mockThrottle.mockImplementation((command) => {
        command();
      });

      render(
        <NimbusConfig.ConfigProvider>
          <Organizations />
        </NimbusConfig.ConfigProvider>,
      );

      const LastOrg = MockOrganizations[MockOrganizations.length - 1];
      const orgCellIdModel = ViewIdModel.orgIdCellList.getModelId(LastOrg.id);

      const copyButton = await screen.findByTestId(orgCellIdModel?.copyButton?.id, {}, { timeout: 3000 });
      fireEvent.click(copyButton);
      expect(mockHistoryPush).not.toBeCalled();
    })();
  });

  test("1229486: [Given] I am on the Admin Organizations view [And] the organizations have failed loaded [Expect] the error screen to render", () => {
    customRender(requiredPermissions, [
      jest.fn(),
      {
        fetching: false,
        error: new CombinedError({ networkError: new Error("Mock error") }),
        data: { organizations: { items: MockOrganizations } },
      },
    ]);

    const view = screen.getByTestId(ViewIdModel.id);
    expect(view).toMatchSnapshot();
  });

  test("2728441: [Given] I am on the Admin Organizations view [When] items are returned [Expect] the table [And] the pagination to be present", () => {
    return (async () => {
      customRender();

      await waitFor(() => {
        const spinner = screen.queryByTestId(AdminRoutesIdModel.loadingSpinner.id);
        expect(spinner).not.toBeInTheDocument();
      });

      const table = screen.getByTestId(ViewIdModel.entityTable.table);
      expect(table).toBeInTheDocument();

      const pagination = screen.getByTestId(ViewIdModel.entityTable.pagination.id);
      expect(pagination).toBeInTheDocument();

      const paginationPrevious = screen.getByTestId(ViewIdModel.entityTable.pagination.previous.id);
      expect(paginationPrevious).toBeDisabled();

      const paginationNext = screen.getByTestId(ViewIdModel.entityTable.pagination.next.id);
      expect(paginationNext).toBeEnabled();
    })();
  });

  function gotoPage2() {
    customRender();
    expect(queryOrganizations).toBeCalledWith(mockOrganizationQueryParams);

    const paginationNext = screen.getByTestId(ViewIdModel.entityTable.pagination.next.id);
    fireEvent.click(paginationNext);

    const [lastUser] = MockOrganizations.slice(-1);
    const pageRef = [lastUser.id];

    expect(queryOrganizations).toBeCalledWith({
      ...mockOrganizationQueryParams,
      variables: { page: pageRef, pageSize: 10, searchTerm: undefined },
    });
  }

  test("2728442: [Given] I am on the Admin Organizations view [And] the pagination to be present [Expect] when the user clicks Next [Then] page 2 is fetched", () => {
    gotoPage2();
  });

  function verifySearchPresent(): void {
    const search = screen.getByTestId(ViewIdModel.entityTable.search.id);
    expect(search).toBeInTheDocument();
  }

  test("2956490: [Given] The user is on the organizations view [Then] a search field can be seen", () => {
    customRender();
    verifySearchPresent();
  });

  function handleSearch(
    searchTerm: string,
    key: keyof Organization,
    shouldBeCalled = true,
    results = [...MockOrganizations],
    shouldRender = true,
  ) {
    if (shouldRender) {
      customRender();
    }
    expect(queryOrganizations).toBeCalledTimes(1);
    expect(queryOrganizations).toBeCalledWith(expect.objectContaining({ variables: { page: null, pageSize: 10 } }));

    const mockSearch = results.map((x) => ({ ...x, [key]: searchTerm }));
    mockUseOrganizationsLazyQuery.mockReturnValue([
      queryOrganizations,
      {
        ...organizationsLazyQueryHook[0],
        data: { organizations: { items: mockSearch } },
      },
    ]);

    const searchInput = screen.getByTestId(ViewIdModel.entityTable.search.input);
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    expect((searchInput as HTMLInputElement).value).toBe(searchTerm);
    expect(queryOrganizations).toBeCalledTimes(1 + +shouldBeCalled);

    if (!shouldBeCalled) return;
    expect(queryOrganizations).toBeCalledWith({ variables: { searchTerm, page: null, pageSize: 10 } });
  }

  async function verifyEmptyTable(): Promise<void> {
    await waitFor(() => {
      const table = screen.getByTestId(ViewIdModel.entityTable.table);
      expect(table).toHaveTextContent("No data available");
    });
  }

  const mockSearchTerm = "Gua";
  const nameKey = "name";

  test("2956486: [Given] The user is on the organizations view [When] the user types in search [Then] expect a call to be made to the search api", () => {
    handleSearch(mockSearchTerm, nameKey);
  });

  test("2956488: [Given] The user is on the organizations view [When] there are more than 10 results [Then] expect the pagination to show and the next button to be enabled", () => {
    handleSearch(mockSearchTerm, nameKey);

    const pagination = screen.getByTestId(ViewIdModel.entityTable.pagination.id);
    expect(pagination).toBeInTheDocument();
  });

  test("2956489: [Given] The user is on the organizations view [When] the user searches by a valid 'name' [Then] expect results to show", () => {
    handleSearch("Guardians", nameKey);
  });

  test("2956491: [Given] The user is on the organizations view [When] the user has searched for something that returns no results [Then] expect the search results table to be empty", () => {
    return (async () => {
      handleSearch(mockSearchTerm, nameKey, true, []);
      await verifyEmptyTable();
    })();
  });

  test("2956492: [Given] The user is on the organizations view [When] the user clears the search field [Then] expect the original list of users to show [And] the user is returned to the first page", () => {
    handleSearch(mockSearchTerm, nameKey);
    const clearSearch = screen.getByTestId(ViewIdModel.entityTable.search.clear);
    const searchInput = screen.getByTestId(ViewIdModel.entityTable.search.input);
    fireEvent.click(clearSearch);
    expect((searchInput as HTMLInputElement).value).toBe("");
    expect(queryOrganizations).toBeCalledTimes(3);
    expect(queryOrganizations).toBeCalledWith({ variables: { page: null, pageSize: 10, searchTerm: undefined } });
  });

  test("2956495: [Given] The user is on the organizations view [When] the user searches for a valid 'id' [Then] expect results to show ", () => {
    handleSearch(MockOrganizations[0].id, "id");
  });

  test("2956496: [Given] The user is on the organizations view [When] the user searches for a valid 'ticker' [Then] expect results to show", () => {
    const [ticker] = MockOrganizations[0].identifiers;
    handleSearch(ticker, "identifiers");
  });

  test("2956497: [Given] The user is on the organizations view [When] there are no organizations [Then] show the search input", () => {
    customRender(requiredPermissions, organizationsLazyQueryEmptyHook);
    verifySearchPresent();
  });

  test("2956498: [Given] The user is on the organizations view [When] there are no organizations [Then] show the search input and [Then] expect a search to return no results", () => {
    return (async () => {
      customRender(requiredPermissions, organizationsLazyQueryEmptyHook);
      verifySearchPresent();
      handleSearch(mockSearchTerm, nameKey, true, [], false);
      await verifyEmptyTable();
    })();
  });

  test("5308708: [Given] an authenticated user without q4graph:manage:organizations permission can access admin module [Then] expect Create Organization button to be not visible", () => {
    const permissions = PermissionCollection.ReadOrganizations;
    mockUseClaims.mockReturnValue({ permissions });
    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsLazyQueryHook);
    render(<Organizations />);
    expect(screen.queryByText(AdminOrganizationsToolbarActions.CreateNewLabel)).not.toBeInTheDocument;
  });

  test("5308709: [Given] an authenticated user with q4graph:manage:organizations permission can access admin module [Then] expect Create Organization button to be visible", () => {
    mockUseClaims.mockReturnValue({ permissions: requiredPermissions });
    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsLazyQueryHook);
    render(<Organizations />);
    expect(screen.getByText(AdminOrganizationsToolbarActions.CreateNewLabel)).toBeInTheDocument;
  });

  test("5308710: [Given] an authenticated user with q4graph:manage:organizations permission can see Create Organization button [When] Create Organization button is clicked [Then] expect user to be redirected to /admin/organizations/edit page", () => {
    mockUseClaims.mockReturnValue({ permissions: requiredPermissions });
    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsLazyQueryHook);
    render(<Organizations />);
    const button = screen.getByText(AdminOrganizationsToolbarActions.CreateNewLabel);
    fireEvent.click(button);
    expect(mockHistoryPush).toBeCalled();
    expect(mockHistoryPush).toBeCalledWith(
      expect.objectContaining({
        pathname: AdminRoutePath.OrganizationsCreate,
        state: { background: undefined, show: "organizationCreateModal" },
      }),
    );
  });
});
