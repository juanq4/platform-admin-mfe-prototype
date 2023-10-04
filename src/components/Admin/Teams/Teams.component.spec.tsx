import { TableClassName, ToastContainer } from "@q4/nimbus-ui";
import { fireEvent } from "@testing-library/react";
import React from "react";
import { MockOrganization1, MockOrganization12, MockOrganization2, MockOrganization3, MockUser } from "../../../__mocks__";
import type { Team } from "../../../definitions";
import { useToastNotificationService } from "../../../hooks";
import type { AdminUserTableHookModel } from "../../../hooks";
import { useAdminUserTable } from "../../../hooks/admin/useAdminUserTable/useAdminUserTable.hook";
import { useOrganizationsQuery, useTeamsQuery } from "../../../schemas/generated/graphql";
import { getOrganizationEditTeamRoute } from "../../../utils";
import { render, screen, waitFor } from "../../../utils/testUtils";
import type { OrganizationTeamsProps } from "../Teams";
import { OrganizationTeamsLanguage } from "../Teams";
import { OrganizationTeams } from "./Teams.component";
import { OrganizationTeamsIdModel } from "./Teams.definition";

jest.mock("../../../schemas/generated/graphql");
const mockUseOrganizationsQuery = useOrganizationsQuery as jest.Mock;
const mockUseTeamsQuery = useTeamsQuery as jest.Mock;

jest.mock("../../../hooks/useToastNotificationService/useToastNotificationService.hook");
const mockUseToastNotificationService = useToastNotificationService as jest.Mock;
jest.mock("../../../hooks/admin/useAdminUserTable/useAdminUserTable.hook");
const mockUseAdminUserTable = useAdminUserTable as jest.Mock;

const idModel = new OrganizationTeamsIdModel("mockOrganization");
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => {
  const orginal = jest.requireActual("react-router-dom");
  return {
    ...orginal,
    useHistory: () => ({
      location: { pathname: "/" },
      push: mockHistoryPush,
    }),
    useParams: () => ({
      id: MockOrganization12.id,
    }),
  };
});
const organizationsQueryWithManagedHook = [
  {
    loading: false,
    error: null,
    data: {
      organizations: {
        items: [
          { ...MockOrganization2, managedBy: MockOrganization12.id },
          { ...MockOrganization3, managedBy: MockOrganization12.id },
        ],
      },
    },
    operation: null,
    stale: null,
  },
  jest.fn(),
] as unknown as ReturnType<typeof useOrganizationsQuery>;

const organizationsQueryWithNoManagedHook = [
  {
    loading: false,
    error: null,
    data: {
      organizations: {
        items: [],
      },
    },
    operation: null,
    stale: null,
  },
  jest.fn(),
] as unknown as ReturnType<typeof useOrganizationsQuery>;

const teamsMock: Team[] = [
  {
    id: "1",
    name: "Intergalactic Spider Colony",
    organizationId: MockOrganization1.id as string,
    userIds: ["1", "2"],
    managedOrganizationIds: [MockOrganization2.id as string, MockOrganization3.id as string],
  },
  {
    id: "2",
    name: "Alien Ant Farm",
    organizationId: MockOrganization1.id as string,
    userIds: ["3", "4"],
    managedOrganizationIds: [MockOrganization2.id as string, MockOrganization3.id as string],
  },
];

const teamsQueryHookMock = {
  loading: false,
  error: null,
  data: { accessGroups: { items: teamsMock } },
  operation: null,
  stale: null,
} as unknown as ReturnType<typeof useTeamsQuery>;

const teamsQueryHookMockWithError = {
  loading: false,
  error: new Error(),
  data: { accessGroups: { items: teamsMock } },
  operation: null,
  stale: null,
} as unknown as ReturnType<typeof useTeamsQuery>;

const mockProps: OrganizationTeamsProps = {
  id: idModel.id,
  key: idModel.id,
  organizationId: MockOrganization12.id as string,
  onCreateTeam: jest.fn(),
};

const adminUserTableMock: AdminUserTableHookModel = {
  users: [{ ...MockUser, active: true }],
  loading: false,
  stale: false,
  currentPage: 0,
  pageRefs: null as never,
  handlePageChange: jest.fn(),
  handleError: jest.fn(),
};

const customRender = (props: OrganizationTeamsProps = mockProps) =>
  render(
    <>
      <OrganizationTeams {...props} /> <ToastContainer />
    </>,
  );

describe("Teams table", () => {
  beforeEach(() => {
    mockUseOrganizationsQuery.mockReturnValue(organizationsQueryWithManagedHook);
    mockUseAdminUserTable.mockReturnValue(adminUserTableMock);
    mockUseTeamsQuery.mockReturnValue(teamsQueryHookMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("7386722: renders without crashing", () => {
    customRender();

    const container = screen.getByTestId(idModel.id);
    expect(container).toMatchSnapshot();
  });

  test("5393559: [Given] I am a user of organization edit view [And] the organization is of type agency [And] the organization does not have any active users [Then] Add Team button is disabled", () => {
    mockUseAdminUserTable.mockReturnValue({ ...adminUserTableMock, users: [] });
    customRender();
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText(OrganizationTeamsLanguage.ADD).closest("button")).toBeDisabled();
  });

  test("5393561: [Given] I am a user of the organization edit view [And] the organization is of type Agency [And] the organization does not have any linked organizations [Then] the Add Team button is disabled", () => {
    mockUseOrganizationsQuery.mockReturnValue(organizationsQueryWithNoManagedHook);

    customRender();
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText(OrganizationTeamsLanguage.ADD).closest("button")).toBeDisabled();
  });

  test("5512002: [Given] I am a user of the Organization Edit view [And] I can see a Organization Access Group List [And] the request to fetch organization access groups for this organization has failed [Then] I can see an error notification [And] I can see an option to retry", () => {
    mockUseTeamsQuery.mockReturnValue(teamsQueryHookMockWithError);
    const error = jest.fn();
    mockUseToastNotificationService.mockReturnValue({
      current: {
        error,
      },
    });
    customRender();

    expect(error).toHaveBeenCalledWith(OrganizationTeamsLanguage.ERROR);
    expect(screen.getByText("REFRESH")).toBeVisible();
  });

  test("5616821, 5616822: [Given] I am a user of the Organization Edit view [And] I can see a Organization Access Group List [And] there is at least one team existing [When] I click anywhere in the row of the team [Then] I'm brought to that team's Edit Team View", async () => {
    customRender();

    expect(screen.getByTestId(idModel.id)).toBeVisible();

    const rowElement = await screen.findByText(teamsMock[0].name);

    expect(rowElement).toBeVisible();

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(rowElement.closest(`.${TableClassName.Row}`) as HTMLElement);

    await waitFor(() => {
      expect(mockHistoryPush).toBeCalledWith(getOrganizationEditTeamRoute(MockOrganization12.id, teamsMock[0].id));
    });
  });
});
