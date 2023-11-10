import React from "react";
import { MockUser } from "../../__mocks__/data/users.mock";
import { QueryPaginationDefault } from "../../hooks/useQuery/useQuery.definition";
import { useUsersByOrgQuery } from "../../schemas/generated/graphql";
import { fireEvent, render, screen, waitFor } from "../../utils/testUtils";
import { OrganizationUsers } from "./Users.component";

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

jest.mock("../../schemas/generated/graphql");

const mockUsersByOrg = useUsersByOrgQuery as jest.Mock;

describe("Organization Users Component", () => {
  const mockRefresh = jest.fn();

  const mockUsers = Array.from(Array(QueryPaginationDefault.PageSize)).map((val, id) => ({
    ...MockUser,
    id: id.toString(),
  }));

  mockUsersByOrg.mockReturnValue({
    data: { usersByOrganization: { totalItems: 0, totalPages: 1, currentPage: 1, records: [] } },
    loading: false,
    refetch: mockRefresh,
    error: undefined,
  });

  test("2632717: [Given] the organizationId exists but no users exist [Expect] add user placeholder to show", () => {
    render(<OrganizationUsers organizationId="org-id" onCreateUser={jest.fn()} />);
    expect(screen.queryByText("Add User")).toBeVisible();
  });

  test("2632718: [Given] the organizationId exists [And] users exist [Expect] add user table to show with pagination", () => {
    mockUsersByOrg.mockReturnValue({
      data: { usersByOrganization: { totalItems: 20, totalPages: 2, currentPage: 1, records: [...mockUsers] } },
      loading: false,
      refetch: mockRefresh,
      error: undefined,
    });
    render(<OrganizationUsers organizationId="org-id" onCreateUser={jest.fn()} />);
    expect(screen.queryByLabelText("Next page")).toBeVisible();
  });

  test("2632779: [Given] the organizationId exists [And] and an error is returned [Expect] the error message to show and reload be clickable", () => {
    mockUsersByOrg.mockReturnValue({
      data: { usersByOrganization: null },
      loading: false,
      refetch: mockRefresh,
      error: new Error("API error"),
    });
    render(<OrganizationUsers organizationId="org-id" onCreateUser={jest.fn()} />);
    expect(screen.queryByText("Failed To Load Data")).toBeVisible();
    const refreshButton = screen.getByRole("button", { name: "REFRESH" });
    expect(refreshButton).toBeVisible();
    fireEvent.click(refreshButton);
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  test("[Given] That I am a Q4 Support User [When]I access Admin [And] I click on the 'Users' tab [Then] I am able to see a list of all the users that exists within Q4 Platform", async () => {
    mockUsersByOrg.mockReturnValue({
      data: { usersByOrganization: { totalItems: 20, totalPages: 2, currentPage: 1, records: [...mockUsers] } },
      loading: false,
      refetch: mockRefresh,
      error: undefined,
    });
    render(<OrganizationUsers organizationId="org-id" onCreateUser={jest.fn()} />);

    await waitFor(() => {
      expect(document.querySelectorAll("div.ag-cell[col-id=email]")).toHaveLength(10);
    });
  });

  //TODO: AgGrid row click doesn't play nice with testing.. Need to looking into why. @GarryCummins @KevinP
  test.skip("[Given] That I am a Q4 Support User [When]I click on a user’s profile [Then] I am taken to the ‘Update User’ page", async () => {
    mockUsersByOrg.mockReturnValue({
      data: { usersByOrganization: { totalItems: 20, totalPages: 2, currentPage: 1, records: [...mockUsers] } },
      loading: false,
      refetch: mockRefresh,
      error: undefined,
    });
    render(<OrganizationUsers organizationId="org-id" onCreateUser={jest.fn()} />);

    await waitFor(() => {
      expect(document.querySelectorAll("div.ag-cell[col-id=email]")).toHaveLength(10);
    });
  });
});
