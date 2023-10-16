import { ButtonClassName, TableClassName, ToastContainer } from "@q4/nimbus-ui";
import type { GridReadyEvent } from "@q4/nimbus-ui/dist/dependencies/agGrid/community";
import { waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { render } from "react-dom";
import { MockOrganization1, MockOrganizations } from "../../../../../../__mocks__/data/organizations.mock";
import { MockUsers, MockUser14, MockQ4AdminUser } from "../../../../../../__mocks__/data/users.mock";
import type { Organization } from "../../../../../../definitions/organization.definition";
import type { User } from "../../../../../../definitions/user.definition";
import { useOrganizationsQuery, useOrganizationQuery } from "../../../../../../hooks/useOrganization/useOrganization.hook";
import { useTable } from "../../../../../../hooks/useTable/useTable.hook";
import { TeamPostKey, TeamCreateMessage } from "../../../../../../hooks/useTeam/useTeam.definition";
import { useTeamCreate } from "../../../../../../hooks/useTeam/useTeam.hook";
import { useToastNotificationService } from "../../../../../../hooks/useToastNotificationService/useToastNotificationService.hook";
import { useUsersQuery, useTeamsQuery } from "../../../../../../schemas/generated/graphql";
import {
  getOrganizationLabelWithTicker,
  getOrganizationEditRoute,
} from "../../../../../../utils/organization/organization.utils";
import { getOrganizationRouteBasedOnPermission } from "../../../../../../utils/route/route.utils";
import { AdminUserTableHeader } from "../../../../../Tables/user/AdminUserTable.definition";
import { TeamDescriptions, TeamErrorsLanguage } from "../OrganizationsTeam.definition";
import { AddUsersTeamsFormLanguage } from "../components/AddUsersForm/AddUsersTeamsForm.definition";
import { OrganizationTeamCreate } from "./OrganizationTeamCreate.component";
import { TeamCreateLanguage, TeamCreateViewIdModel as ViewIdModel } from "./OrganizationsTeamCreate.definition";

jest.mock("../../../../../schemas/generated/graphql");
const mockUseOrganizationsQuery = useOrganizationsQuery as jest.Mock;
jest.mock("../../../../../hooks/useClaims/useClaims.hook");
const mockUseClaims = useClaims as jest.Mock;
jest.mock("../../../../../hooks/useOrganization/useOrganization.hook");
const mockUseOrganizationQuery = useOrganizationQuery as jest.Mock;
jest.mock("../../../../../hooks/useUser/useUser.hook");
const mockUseUsersQuery = useUsersQuery as jest.Mock;
jest.mock("../../../../../hooks/useTeam/useTeam.hook");
const mockUseTeamsQuery = useTeamsQuery as jest.Mock;
const mockUseTeamCreate = useTeamCreate as jest.Mock;
jest.mock("../../../../../hooks/useToastNotificationService/useToastNotificationService.hook");
const mockUseToastNotificationService = useToastNotificationService as jest.Mock;
jest.mock("../../../../../utils/route/route.utils");
const mockGetOrganizationRouteBasedOnPermission = getOrganizationRouteBasedOnPermission as jest.Mock;

const mockHistoryPush = jest.fn();
const mockHistoryReplace = jest.fn();
jest.mock("../../../../../hooks/useTable/useTable.hook");
jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useHistory: () => ({
      location: { pathname: "/" },
      push: mockHistoryPush,
      replace: mockHistoryReplace,
    }),
    useParams: () => ({
      id: MockOrganization1.id,
    }),
  };
});

describe("Organization Team Create view", () => {
  let mockHandleGridReady: (grid: GridReadyEvent) => void;

  const notificationSuccess = jest.fn();
  const notificationError = jest.fn();
  const notificationServiceReturn = {
    current: {
      success: notificationSuccess,
      error: notificationError,
    },
  };
  const organizationsQueryHook = {
    loading: false,
    error: null,
    data: { organizations: { items: MockOrganizations } },
    operation: null,
    stale: null,
  } as unknown as ReturnType<typeof useOrganizationsQuery>;
  const organizationQueryReturn = [
    {
      fetching: false,
      error: null,
      data: { organization: MockOrganization1 },
      stale: null,
    },
    jest.fn(),
  ] as unknown as ReturnType<typeof useOrganizationQuery>;
  const usersQueryReturn = [
    {
      fetching: false,
      error: null,
      data: { users: { items: MockUsers } },
      stale: null,
    },
    jest.fn(),
  ] as unknown as ReturnType<typeof useUsersQuery>;
  const teamsQueryReturn = [
    {
      fetching: false,
      error: null,
      data: { accessGroups: { items: [] } },
      stale: null,
    },
    jest.fn(),
  ] as unknown as ReturnType<typeof useTeamsQuery>;

  const teamCreateMutationMock = jest.fn((): Promise<unknown> => Promise.resolve({ data: [], success: true }));
  const teamsMutationReturn = [
    {
      fetching: false,
      error: null,
      data: { [TeamPostKey]: MockTeam1 },
      stale: null,
    },
    teamCreateMutationMock,
  ] as unknown as ReturnType<typeof useTeamCreate>;

  const teamsLoadingMutationReturn = [
    {
      fetching: true,
      error: null,
      data: { [TeamPostKey]: MockTeam1 },
      stale: null,
    },
    teamCreateMutationMock,
  ] as unknown as ReturnType<typeof useTeamCreate>;

  const closeModalButton = "Close Modal";

  beforeEach(() => {
    mockUseClaims.mockReturnValue({});
    mockUseOrganizationsQuery.mockReturnValue(organizationsQueryHook);
    mockUseOrganizationQuery.mockReturnValue(organizationQueryReturn);
    mockUseUsersQuery.mockReturnValue(usersQueryReturn);
    mockUseTeamsQuery.mockReturnValue(teamsQueryReturn);
    mockUseTeamCreate.mockReturnValue(teamsMutationReturn);
    mockUseToastNotificationService.mockReturnValue(notificationServiceReturn as never);
  });

  const validateTable = async () => {
    await waitFor(() => {
      expect(mockHandleGridReady).toBeCalled();
    });
  };

  const customRender = () =>
    render(
      (() => {
        mockHandleGridReady = useTable().handleGridReady;

        return (
          <>
            <OrganizationTeamCreate />
            <ToastContainer />
          </>
        );
      })(),
    );

  const openOrganizationDropdown = () => {
    const mutliSelect = screen.getByTestId(ViewIdModel.addOrganizationsForm.organizationsSelector.dropdown.id);
    expect(mutliSelect).toBeInTheDocument();
    fireEvent.click(mutliSelect);
    fireEvent.keyDown(mutliSelect, { key: "Down" });
  };

  const getOptionId = (organization: Organization): string => {
    return `option-${organization.id}-${getOrganizationLabelWithTicker(organization).replace(/\s/g, "-")}`;
  };

  const selectOrganizationFromDropdown = (organization: Organization) => {
    openOrganizationDropdown();

    expect(screen.getByTestId(ViewIdModel.addOrganizationsForm.organizationsSelector.dropdown.menu)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId(getOptionId(organization)));

    fireEvent.keyDown(screen.getByTestId(ViewIdModel.addOrganizationsForm.organizationsSelector.dropdown.id), {
      key: "Esc",
    });
  };

  const teamNameStr = "Awesome Team Name";

  const getToAddUsersState = () => {
    fireEvent.change(screen.queryByTestId(ViewIdModel.addOrganizationsForm.teamNameField.textbox.input) as HTMLElement, {
      target: { value: teamNameStr },
    });

    selectOrganizationFromDropdown(MockOrganizations[1]);

    fireEvent.click(screen.getByTestId(ViewIdModel.add.id));
  };

  const checkTableHasLoaded = async () => {
    await waitFor(() => {
      expect(screen.getByText(AdminUserTableHeader.Teams)).toBeVisible();
    });

    await waitFor(() => {
      expect(screen.getByText(MockUsers[0].email)).toBeVisible();
    });
  };

  const getRowCheckbox = (user: User) => {
    // eslint-disable-next-line testing-library/no-node-access
    return screen.getByText(user.email)?.closest(`.${TableClassName.Row}`)?.querySelector("input[type=checkbox]");
  };

  test("7395560: render without crash", () => {
    customRender();
    expect(screen.getByTestId(ViewIdModel.modal.id)).toMatchSnapshot();
  });

  test("5447776: [Given] I am a user of the Add Team view [Then] I can see the current organization’s name reiterated on the screen [And] I can see some helpful instruction [And] I can see a field to provide a team name [And] I can see a dropdown to select organizations [And] I can see a button to proceed to the next screen", () => {
    customRender();
    expect(screen.getByText(`${TeamCreateLanguage.Title} • ${MockOrganization1.name}`)).toBeVisible();
    expect(screen.getByText(TeamDescriptions.Create)).toBeVisible();
    expect(screen.getByTestId(ViewIdModel.addOrganizationsForm.organizationsSelector.dropdown.id)).toBeVisible();
    expect(screen.getByText(TeamCreateLanguage.AddUsersButton)).toBeVisible();
  });

  test("5447777: [Given] I am a user of the Add Team view [And] I can see a field for the team name [Then] I can enter a maximum of 255 characters", () => {
    const textboxLength = 255;
    const longText = [...Array(textboxLength)].map(() => "x").join("");

    customRender();

    const textboxElement = screen.queryByTestId(ViewIdModel.addOrganizationsForm.teamNameField.textbox.input);

    expect(textboxElement).toBeVisible();
    expect(textboxElement).toHaveAttribute("maxLength", `${textboxLength}`);

    fireEvent.change(textboxElement, { target: { value: longText } });

    selectOrganizationFromDropdown(MockOrganizations[0]);
    fireEvent.click(screen.getByText(TeamCreateLanguage.AddUsersButton));

    expect(screen.getByText(TeamErrorsLanguage.MaxLength)).toBeVisible();
  });

  test("5447778: [Given] I am a user of the Add Team view [And] I have provided a team name [And] I have not yet selected any organizations [Then] the 'Add Users' button is disabled", () => {
    const teamNameStr = "Awesome Team Name";
    customRender();

    const textboxElement = screen.queryByTestId(ViewIdModel.addOrganizationsForm.teamNameField.textbox.input);

    fireEvent.change(textboxElement, { target: { value: teamNameStr } });

    expect(screen.getByTestId(ViewIdModel.add.id)).toBeDisabled();
  });

  test("5447779: [Given] I am a user of the Add Team view [And] I have not provided a team name [And] I have selected one or more organizations [Then] the 'Add Users' button is disabled", () => {
    customRender();

    selectOrganizationFromDropdown(MockOrganizations[0]);

    expect(screen.getByTestId(ViewIdModel.add.id)).toBeDisabled();
  });

  test("5447782: [Given] I am a user of the Add Team view [And] I can see a field for team name [And] I have provided restricted characters for the Team name [And] I have selected at least 1 organization [When] I click the “Add Users” button [Then] I am prevented and warned [And] I can see an error message", () => {
    const invalidTeamNameStr = "Team@";
    customRender();

    const textboxElement = screen.queryByTestId(ViewIdModel.addOrganizationsForm.teamNameField.textbox.input);

    fireEvent.change(textboxElement, { target: { value: invalidTeamNameStr } });

    selectOrganizationFromDropdown(MockOrganizations[0]);
    fireEvent.click(screen.getByText(TeamCreateLanguage.AddUsersButton));

    expect(screen.getByText(TeamErrorsLanguage.Characters)).toBeVisible();
  });

  test('5447792, 5447793, 5447800: [Given] I am a user of the Add Team view [And] I can see a field for team name [And] I have provided only allowed characters for the Team name [And] I have selected at least 1 organization [When] I click the “Add Users” button [Then] I proceed to the "Add Users" stage', () => {
    customRender();

    getToAddUsersState();

    expect(screen.getByTestId(ViewIdModel.addUsersTeamForm.id)).toBeVisible();
    expect(screen.getByText(`${TeamCreateLanguage.Title} • ${MockOrganization1.name}`)).toBeVisible();
    expect(screen.getByText(TeamDescriptions.Users)).toBeVisible();
    expect(screen.getByText(TeamCreateLanguage.BackButton)).toBeVisible();
    expect(screen.getByText(TeamCreateLanguage.CreateTeamButton)).toBeVisible();
    expect(screen.getByTestId(ViewIdModel.create.id)).toBeDisabled();
  });

  test.skip("8871622: [Given] I can see a list of users [And] user does not have permission to impersonate clients [Then] they are not shown in list", async () => {
    const usersQueryReturn = [
      {
        fetching: false,
        error: null,
        data: { users: { items: [MockUser14, MockQ4AdminUser] } },
        stale: null,
      },
      jest.fn(),
    ] as unknown as ReturnType<typeof useUsersQuery>;

    mockUseUsersQuery.mockReturnValue(usersQueryReturn);

    customRender();

    getToAddUsersState();

    await validateTable();

    expect(await screen.findByText(AdminUserTableHeader.Teams)).toBeVisible();

    expect(screen.queryByText(MockQ4AdminUser.email)).not.toBeInTheDocument();
    expect(await screen.findByText(MockUser14.email)).toBeInTheDocument();
  });

  test.skip('5447794: [Given] I can see a list of users [And] I can see a user in the list is already associated with another team [Then] I can see the teams associated with the user are listed under a column titled "Teams"', async () => {
    const teamsQueryReturn = [
      {
        fetching: false,
        error: null,
        data: { accessGroups: { items: [MockTeam2] } },
        stale: null,
      },
      jest.fn(),
    ] as unknown as ReturnType<typeof useTeamsQuery>;

    mockUseTeamsQuery.mockReturnValue(teamsQueryReturn);

    customRender();

    getToAddUsersState();

    await validateTable();

    expect(await screen.findByText(AdminUserTableHeader.Teams)).toBeVisible();

    await waitFor(() => {
      expect(screen.getByText(MockTeam2.name)).toBeVisible();
    });
  });

  test.skip("5447795: [Given] I am a user of Add team view [And] I can see a list of users [Then] I can see a checkbox for every user that depicts their selected state", async () => {
    customRender();

    getToAddUsersState();

    await checkTableHasLoaded();

    MockUsers.forEach((user: User) => {
      expect(getRowCheckbox(user)).toBeVisible();
    });
  });

  test.skip("5447796,5447797: [Given] I am a user of Add team view [And] I can see a checkbox for every user that depicts their selected state [And] a user is already selected [When] I click on the checkbox [Then] this user is removed from my selection", async () => {
    customRender();

    getToAddUsersState();

    await checkTableHasLoaded();

    const checkboxElement = getRowCheckbox(MockUsers[0]);

    fireEvent.click(checkboxElement);

    expect(checkboxElement).toBeChecked();

    fireEvent.click(checkboxElement);

    expect(checkboxElement).not.toBeChecked();
  });

  test.skip("5447798: [Given] I am a user of Add team view [And] I can see a column titled “Teams” [And] I can see an info bubble next to the column title [When] I hover over the info bubble [Then] I can see a text: “Users not part of any team have full access to all linked organizations”", async () => {
    customRender();

    getToAddUsersState();

    await waitFor(() => {
      expect(screen.getByTestId(ViewIdModel.addUsersTeamForm.teamsInfo.id)).toBeVisible();
    });

    await waitFor(() => {
      expect(screen.getByText(AddUsersTeamsFormLanguage.Teams)).toBeInTheDocument();
    });
  });

  test("5447799: [Given] I am a user of Add team view [And] I can see a list of users [When] I click the back button [Then] I am brought to team name and manage org selection stage [And] I can see the currently selected organizations [And] the selected users are not lost", async () => {
    customRender();

    getToAddUsersState();

    fireEvent.click(screen.getByText(TeamCreateLanguage.BackButton));

    await waitFor(() => {
      expect(screen.getByTestId(ViewIdModel.addOrganizationsForm.teamNameField.textbox.input)).toHaveValue(teamNameStr);
    });

    expect(screen.getByText(getOrganizationLabelWithTicker(MockOrganizations[1]))).toBeVisible();
  });

  test("5447800: [Given] I am a user of Add team view [And] I have provided a team name [And] I have selected 1 or more organizations [And] I have not selected any users [Then] I can see the “Create Team” button is disabled", async () => {
    customRender();

    getToAddUsersState();

    await waitFor(() => {
      expect(screen.getByTestId(ViewIdModel.create.id)).toBeDisabled();
    });
  });

  test.skip("5447801: [Given] I can see the “Create Team” button is disabled [When] I select 1 or more users to be added to the team [Then] I can see that the “Create Team” button is enabled", () => {
    return (async () => {
      customRender();

      getToAddUsersState();

      await checkTableHasLoaded();

      expect(screen.getByTestId(ViewIdModel.create.id)).toBeDisabled();

      fireEvent.click(getRowCheckbox(MockUsers[0]));

      await waitFor(() => {
        expect(screen.queryByTestId(ViewIdModel.create.id)).toBeEnabled();
      });
    })();
  });

  test.skip('5447802, 5447804: [Given] I am a user of Add team view [And] I have selected 1 or more users [When] I click the "Create team" button [Then] creation of the team is invoked', async () => {
    customRender();

    getToAddUsersState();

    await checkTableHasLoaded();

    fireEvent.click(getRowCheckbox(MockUsers[0]));

    const buttonElement = screen.queryByTestId(ViewIdModel.create.id);
    await waitFor(() => {
      expect(buttonElement).toBeEnabled();
    });

    fireEvent.click(buttonElement);

    expect(teamCreateMutationMock).toHaveBeenCalled();

    await waitFor(
      () => {
        expect(notificationSuccess).toBeCalledWith(TeamCreateMessage.Success);
      },
      { timeout: 5000 },
    );
  });

  test.skip("5447805: [Given] I am a user of Add team view [And] creation of the organization access group is invoked [And] the creation has failed [Then] I can still see the Add Team view [And] I can see an error notification", async () => {
    const errorMessageReturn = "Failed";
    const teamCreateErrorMutationMock = jest.fn(
      (): Promise<unknown> => Promise.resolve({ data: [], success: false, message: errorMessageReturn }),
    );
    const teamsErrorMutationReturn = [
      {
        fetching: false,
        error: null,
        data: { [TeamPostKey]: MockTeam1 },
        stale: null,
      },
      teamCreateErrorMutationMock,
    ] as unknown as ReturnType<typeof useTeamCreate>;
    mockUseTeamCreate.mockReturnValue(teamsErrorMutationReturn);

    customRender();

    getToAddUsersState();

    await checkTableHasLoaded();

    fireEvent.click(getRowCheckbox(MockUsers[0]));

    await waitFor(() => {
      expect(screen.queryByTestId(ViewIdModel.create.id)).toBeEnabled();
    });

    fireEvent.click(screen.queryByTestId(ViewIdModel.create.id));

    expect(teamCreateErrorMutationMock).toHaveBeenCalled();

    await waitFor(
      () => {
        expect(notificationError).toBeCalledWith(`${TeamCreateMessage.Failed}: ${errorMessageReturn}`);
      },
      { timeout: 5000 },
    );
  });

  test.skip('5447803: [Given] I am a user of Add team view [And] creation of the organization access group is invoked [And] the creation is not yet finished [Then] I can see the "Create Team" button in a loading state [And] I can see the user list is disabled [And] I can see the back button is disabled', async () => {
    mockUseTeamCreate.mockReturnValue(teamsLoadingMutationReturn);

    customRender();

    getToAddUsersState();

    await checkTableHasLoaded();

    fireEvent.click(getRowCheckbox(MockUsers[0]));

    await waitFor(() => {
      expect(screen.queryByTestId(ViewIdModel.create.id)).toHaveClass(ButtonClassName.BaseWithLoadingModifier);
    });

    expect(screen.queryByTestId(ViewIdModel.back.id)).toBeDisabled();
  });

  test("5480460: [Given] I am a user of Add Team view [Then] I can see an option to close the view", () => {
    customRender();
    const closeButton = screen.getByLabelText(closeModalButton);
    expect(closeButton).toBeInTheDocument();
  });

  test("5480462: [Given] I am a user of Add team view [And] I am on the manage users stage [When] I click the close button [Then] all the teams changes are discarded [And] I am brought to the Organization Edit view", () => {
    const path = getOrganizationEditRoute(MockOrganization1.id);
    mockGetOrganizationRouteBasedOnPermission.mockReturnValue(path);
    customRender();
    getToAddUsersState();
    const closeButton = screen.getByLabelText(closeModalButton);
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(mockHistoryReplace).toBeCalledWith(getOrganizationEditRoute(MockOrganization1.id));
  });

  test("5480461: [Given] I am a user of Add team view [And] I am on the manage organizations stage [When] I click the close button [And] all the teams changes are discarded [Then] I am brought to the Organization Edit view", () => {
    const path = getOrganizationEditRoute(MockOrganization1.id);
    mockGetOrganizationRouteBasedOnPermission.mockReturnValue(path);
    customRender();
    const closeButton = screen.getByLabelText(closeModalButton);
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(mockHistoryReplace).toBeCalled();
    expect(mockHistoryReplace).toBeCalledWith(getOrganizationEditRoute(MockOrganization1.id));
  });

  test.skip("5480463: [Given] I am a user of Add team view [And] creation of the team is invoked [And] the creation is not yet finished [Then] I cannot see the option to close the view", async () => {
    mockUseTeamCreate.mockReturnValue(teamsLoadingMutationReturn);

    customRender();
    getToAddUsersState();
    await checkTableHasLoaded();
    fireEvent.click(getRowCheckbox(MockUsers[0]));
    fireEvent.click(screen.queryByTestId(ViewIdModel.create.id));
    expect(screen.queryByLabelText(closeModalButton)).not.toBeInTheDocument();
  });
});
