import { MockedProvider } from "@apollo/client/testing";
import type { MockedResponse } from "@apollo/client/testing";
import type { NotificationService } from "@q4/nimbus-ui";
import { ButtonClassName, StyleGuide, TableClassName, ConfigProvider as NimbusConfig } from "@q4/nimbus-ui";
import type { Organization } from "@q4/platform-definitions";
import { Role } from "@q4/platform-sdk-definitions";
import { waitFor, fireEvent, within } from "@testing-library/react";
import React from "react";
import { render } from "react-dom";
import {
  MockOrganization12,
  MockOrganization1,
  MockOrganization15,
  MockOrganization2,
  MockOrganization10,
  MockOrganizations,
  MockOrganization11,
  MockOrganization13,
  MockOrganization14,
} from "../../../../../../__mocks__/data/organizations.mock";
import {
  MockUsers,
  MockUser14,
  MockUser4,
  MockUser,
  MockUser8,
  MockUser1,
  MockUser2,
  MockUsersLong,
} from "../../../../../../__mocks__/data/users.mock";
import { AdminDataContext } from "../../../../../../contexts/data/data.context";
import type { AdminDataContextState } from "../../../../../../contexts/data/data.definition";
import { Team } from "../../../../../../definitions/team.definition";
import type { User } from "../../../../../../definitions/user.definition";
import { useToastNotificationService } from "../../../../../../hooks/useToastNotificationService/useToastNotificationService.hook";
import { UPDATE_TEAM, GET_TEAM, DELETE_TEAM } from "../../../../../../schemas/teams/teams.schema";
import {
  getOrganizationLabelWithTicker,
  getOrganizationViewRoute,
} from "../../../../../../utils/organization/organization.utils";
import { EntityTablePaginationLabels } from "../../../../../EntityTable/components/Pagination/Pagination.definition";
import { StatusCellLabel } from "../../../../../EntityTable/components/StatusCell/StatusCell.definition";
import { AdminOrganizationsTableHeader } from "../../../../../Tables/organization/AdminOrganizationTable.definition";
import { AdminUserTableHeader } from "../../../../../Tables/user/AdminUserTable.definition";
import { TeamDescriptions, TeamErrorsLanguage } from "../OrganizationsTeam.definition";
import { AddUsersTeamsFormLanguage } from "../components/AddUsersForm/AddUsersTeamsForm.definition";
import { EditTeamTablesLanguage } from "../components/EditTeamTables/EditTeamTables.definition";
import { OrganizationsSelectDropdownLanguage } from "../components/OrganizationsSelectDropdown/OrganizationsSelectDropdown.definition";
import { OrganizationTeamEdit } from "./OrganizationTeamEdit.view";
import {
  TeamEditLanguage,
  TeamEditMessage,
  TeamRemoveMessage,
  TeamEditViewIdModel as ViewIdModel,
} from "./OrganizationsTeamEdit.definition";

jest.mock("../../../../../hooks/useToastNotificationService/useToastNotificationService.hook");
const mockUseToastNotificationService = useToastNotificationService as jest.Mock;

const mockHistoryPush = jest.fn();
const mockHistoryReplace = jest.fn();
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
      id: MockOrganization12.id,
      teamId: MockTeam3.id,
    }),
  };
});

describe("Organization Team Edit view", () => {
  const closeModalButtonText = "Close Modal";
  const modalTitle = `${TeamEditLanguage.Title} • ${MockOrganization12.name} • ${MockTeam3.name}`;

  const notificationSuccess = jest.fn();
  const notificationError = jest.fn();
  const notificationServiceReturn = {
    current: {
      success: notificationSuccess,
      error: notificationError,
    },
  } as unknown as React.MutableRefObject<NotificationService>;

  beforeEach(() => {
    mockUseToastNotificationService.mockReturnValue(notificationServiceReturn);
  });

  const defaultDataMocks = [
    getTeamMock,
    getTeamsMock,
    getUsersMock,
    getOrganizationAgencyMock,
    ...getOrganizationsMock,
    ...updateTeamMock,
    removeTeamMock,
  ];

  const customRender = (
    mocks: MockedResponse[] = defaultDataMocks,
    adminDataCtxMock: AdminDataContextState = AdminDataContextMock,
  ) => {
    render(
      <MockedProvider mocks={mocks} addTypename={false} defaultOptions={{ watchQuery: { fetchPolicy: "no-cache" } }}>
        <NimbusConfig styleGuide={StyleGuide.V1}>
          <AdminDataContext.Provider value={adminDataCtxMock}>
            <OrganizationTeamEdit />
          </AdminDataContext.Provider>
        </NimbusConfig>
      </MockedProvider>,
    );
  };

  const waitForTeamData = async () => {
    expect(await screen.findByTestId(ViewIdModel.teamNameEditModal.nameField.textbox.id)).toBeVisible();
    expect(await screen.findByText(modalTitle)).toBeVisible();

    await waitFor(() => {
      expect(screen.getByTestId(ViewIdModel.teamNameEditModal.nameField.textbox.input)).toHaveValue(MockTeam3.name);
    });
  };

  const getCloseButton = () => {
    return screen.getAllByLabelText(closeModalButtonText)[0];
  };

  describe("Edit Team Name functionality", () => {
    const clickSaveButton = async () => {
      const saveButtonElement = await screen.findByTestId(ViewIdModel.teamNameEditModal.save.id);

      await waitFor(() => {
        expect(saveButtonElement).toBeEnabled();
      });

      fireEvent.click(saveButtonElement);
    };

    it("7395561: renders Team Name Modal without crashing", async () => {
      customRender();

      await waitForTeamData();

      expect(await screen.findByTestId(ViewIdModel.teamNameEditModal.id)).toMatchSnapshot();
    });

    test("5616820: [Given] I’m a user of Edit Team View [Then] I can see editable team name field [And] a team name field has pre-populated value", async () => {
      customRender();

      await waitForTeamData();

      expect(screen.getByTestId(ViewIdModel.teamNameEditModal.nameField.textbox.input)).toHaveValue(
        getTeamMock.result.data.accessGroup.name,
      );
    });

    test("5616823: [Given] I'm a user of Edit Team View [Then] I can see the following sections: Organization Name, Team Name, Managed organizations, Users and Save button", async () => {
      customRender();

      await waitForTeamData();

      expect(await screen.findByText(modalTitle)).toBeVisible();
      expect(screen.getByText(TeamDescriptions.Edit)).toBeVisible();
      expect(await screen.findByTestId(ViewIdModel.teamNameEditModal.nameField.textbox.id)).toBeVisible();
      expect(await screen.findByTestId(ViewIdModel.teamNameEditModal.dataTables.orgsTable.id)).toBeVisible();
      expect(await screen.findByTestId(ViewIdModel.teamNameEditModal.dataTables.usersTable.id)).toBeVisible();
      expect(await screen.findByText(TeamEditLanguage.SaveTeamButton)).toBeVisible();
    });

    test("5616824, 6417889: [Given] I'm a user of Edit Team View [And] I edit the team name [When] I click Save button [Then] I remain on the same page [And] I can see a toast notification message informing the team was updated successfully", async () => {
      const updatedName = `${MockTeam3.name}edit`;
      const mockTeams: Team[] = AdminDataContextMock.teams.map((team) =>
        team.id === MockTeam3.id ? { ...MockTeam3, name: updatedName } : team,
      );

      const contextMock = {
        ...AdminDataContextMock,
        teams: mockTeams,
        setTeam: jest.fn().mockReturnValue(new Team({ ...MockTeam3, name: updatedName })),
        setTeams: jest.fn().mockReturnValue(mockTeams),
      };

      customRender(defaultDataMocks, contextMock);

      await waitForTeamData();

      await waitFor(() => {
        expect(contextMock.setTeams).toHaveBeenCalledWith(AdminDataContextMock.teams);
      });

      fireEvent.change(await screen.findByTestId(ViewIdModel.teamNameEditModal.nameField.textbox.input), {
        target: { value: updatedName },
      });

      await clickSaveButton();

      await waitFor(() => {
        expect(notificationSuccess).toBeCalledWith(TeamEditMessage.Success);
      });

      expect(contextMock.setTeam).toHaveBeenCalled();
      expect(contextMock.setTeams).toHaveBeenCalled();

      const elements = screen.queryAllByText(updatedName);

      expect(elements).toHaveLength(2);
      elements.forEach((element: HTMLElement) => expect(element).toHaveAttribute("role", "presentation"));
    });

    test("5616831, 5616825: [Given] I'm a user of Edit Team View [And] I didn't edit the team name [When] I click Save button [Then] I remain on the same page [And] I can see a toast notification message informing the team was updated successfully", async () => {
      customRender();

      await waitForTeamData();

      await clickSaveButton();

      await waitFor(() => {
        expect(notificationSuccess).toBeCalledWith(TeamEditMessage.Success);
      });
    });

    test("5616830: [Given] I'm a user of Edit Team View [And] I insert a value for the Team Name [When] I click on Save button [And] there is the error in saving the team [Then] I can see a toast notification informing that the team was unable to be updated and I should try again", async () => {
      customRender();

      await waitForTeamData();

      fireEvent.change(await screen.findByTestId(ViewIdModel.teamNameEditModal.nameField.textbox.input), {
        target: { value: `${MockTeam3.name}error` },
      });

      await clickSaveButton();

      await waitFor(() => {
        expect(notificationError).toBeCalledWith(TeamEditMessage.Failed);
      });
    });

    test("5616827, 5616826: [Given] I'm a user of Edit Team View [And] I remove value from the team name [When] I click Save button [Then] I remain on the same page [And] I'm warned that the Team name is a required field", async () => {
      customRender();

      await waitForTeamData();

      fireEvent.change(screen.getByTestId(ViewIdModel.teamNameEditModal.nameField.textbox.input), {
        target: { value: "" },
      });

      await clickSaveButton();

      await waitFor(() => {
        expect(screen.getByText(TeamErrorsLanguage.Required)).toBeVisible();
      });
    });

    test("5616829: [Given] I'm a user of Edit Team View [And] I insert a value for the Team Name which contains restricted characters [When] I click on Save button [Then] I warned that the Team name may only contain the following characters: Space, Dash, Apostrophe, Ampersand, A-Z, 0-9", async () => {
      const invalidTeamNameStr = "Team@";

      customRender();

      await waitForTeamData();

      fireEvent.change(screen.getByTestId(ViewIdModel.teamNameEditModal.nameField.textbox.input), {
        target: { value: invalidTeamNameStr },
      });

      await clickSaveButton();

      await waitFor(() => {
        expect(screen.getByText(TeamErrorsLanguage.Characters)).toBeVisible();
      });
    });

    test("5616828: [Given] I'm a user of Edit Team View [And] I insert a value for the Team Name which contains restricted characters [When] I click on Save button [Then] I warned that the Team name may only contain the following characters: Space, Dash, Apostrophe, Ampersand, A-Z, 0-9", async () => {
      const textboxLength = 255;
      const longText = [...Array(textboxLength)].map(() => "x").join("");

      customRender();

      await waitForTeamData();

      const textboxElement = await screen.findByTestId(ViewIdModel.teamNameEditModal.nameField.textbox.input);

      expect(textboxElement).toBeVisible();
      expect(textboxElement).toHaveAttribute("maxLength", `${textboxLength}`);

      fireEvent.change(screen.getByTestId(ViewIdModel.teamNameEditModal.nameField.textbox.input), {
        target: { value: longText },
      });

      await clickSaveButton();

      await waitFor(() => {
        expect(screen.getByText(TeamErrorsLanguage.MaxLength)).toBeVisible();
      });
    });
  });

  describe("Manage Organizations functionality", () => {
    const clickUpdateButton = async () => {
      const updateButtonElement = await screen.findByText(TeamEditLanguage.UpdateOrganizations);

      await waitFor(() => {
        expect(updateButtonElement.parentElement).toBeEnabled();
      });

      fireEvent.click(updateButtonElement.parentElement);
    };

    const clickManageOrgButton = async () => {
      await waitForTeamData();

      const rowElement = await screen.findByText(EditTeamTablesLanguage.OrgsButton);

      expect(rowElement).toBeVisible();
      expect(await screen.findByText(MockOrganization1.name)).toBeVisible();

      fireEvent.click(rowElement);
    };

    const selectOrganizationFromDropdown = (organization: Organization) => {
      const optionString = `option-${organization.id}-${getOrganizationLabelWithTicker(organization).replace(/\s/g, "-")}`;
      const multiSelect = screen.getByTestId(ViewIdModel.organizationsEditModal.organizationsSelector.dropdown.id);

      expect(multiSelect).toBeInTheDocument();

      fireEvent.click(multiSelect);
      fireEvent.keyDown(multiSelect, { key: "Down" });

      fireEvent.click(screen.getByTestId(optionString));

      fireEvent.keyDown(multiSelect, { key: "Esc" });
    };

    it("7395562: renders Edit Team Organizations Modal without crashing", async () => {
      customRender();
      await clickManageOrgButton();

      expect(await screen.findByTestId(ViewIdModel.organizationsEditModal.id)).toMatchSnapshot();
    });

    test("5716280, 5681039: [Given] I’m a user of the EditTeam view [And] I can see a section for Managed Organizations [Then] I can see an action button for Manage Organizations [And] I can see a search bar to filter the organizations [And] I can see a table where the organizations are listed", async () => {
      customRender();

      await waitForTeamData();

      expect(screen.getByText(EditTeamTablesLanguage.OrgsButton)).toBeVisible();
      const tableElement = await screen.findByTestId(ViewIdModel.teamNameEditModal.dataTables.orgsTable.id);
      expect(tableElement).toBeVisible();
      const input = screen.getByTestId(ViewIdModel.teamNameEditModal.dataTables.orgsTable.entityTable.search.input);
      expect(input).toHaveAttribute("placeholder", "Search");
    });

    test("5697877: [Given] I’m a user of EditTeam subscreen [When] I click on Manage organization button [Then] can see a list of the current organizations associated with the team [And] I can see an option to remove each organization from the team [And] I can see an dropdown to add new organizations to the team [And] I can see an button to save the updates to managed organizations [And] I can see an option to close this view", async () => {
      customRender();

      await clickManageOrgButton();

      expect(screen.getByTestId(ViewIdModel.organizationsEditModal.organizationsSelector.selected.id)).toBeVisible();
      expect(screen.getByText(getOrganizationLabelWithTicker(MockOrganization1))).toBeVisible();
      expect(
        screen.getByTestId(ViewIdModel.organizationsEditModal.organizationsSelector.selected.list.getModelId(0).icon),
      ).toBeVisible();
      expect(screen.getByText(OrganizationsSelectDropdownLanguage.Placeholder)).toBeVisible();
      expect(screen.getByText(TeamEditLanguage.UpdateOrganizations)).toBeVisible();
      expect(getCloseButton()).toBeVisible();
    });

    test("5699203: [Given] I’m a user of EditTeams view [And] I’ve clicked on Manage Organizations button [And] I can see a list of organizations currently associated with the team [When] I deselects/removes all organizations from the team [Then] I can see the Update Organizations button is disabled [And] I cannot click the button", async () => {
      customRender();

      await clickManageOrgButton();

      fireEvent.click(
        screen.getByTestId(ViewIdModel.organizationsEditModal.organizationsSelector.selected.list.getModelId(0).icon),
      );
      await waitFor(() => {
        expect(screen.getByText(TeamEditLanguage.UpdateOrganizations).parentElement).toBeDisabled();
      });
    });

    test("5716281: [Given] I’m a user of EditTeam subscreen [And] I’ve clicked on Manage organization button [When] I clicks on the Close option [Then] I am brought back to the EditTeams view [And] I can see a summary of the information about that team [And] any unsaved changes to the organization are discarded", async () => {
      customRender();

      await clickManageOrgButton();

      fireEvent.click(
        screen.getByTestId(ViewIdModel.organizationsEditModal.organizationsSelector.selected.list.getModelId(0).icon),
      );
      await waitFor(() => {
        expect(screen.queryByText(getOrganizationLabelWithTicker(MockOrganization1))).not.toBeInTheDocument();
      });

      fireEvent.click(getCloseButton());

      await clickManageOrgButton();

      expect(await screen.findByText(getOrganizationLabelWithTicker(MockOrganization1))).toBeVisible();
    });

    test("5716284, 5716285: [Given] I’m a user of Edit Team subscreen [And] I’ve selected a new organization to add to the list [When] I clicks the Update Organization button [Then] I can see a loading state while the change is processed [And] I cannot Edit any of the fields [And] I cannot close the screen", async () => {
      customRender();

      await clickManageOrgButton();

      const updateButtonElement = await screen.findByText(TeamEditLanguage.UpdateOrganizations);

      await clickUpdateButton();

      await waitFor(() => {
        expect(updateButtonElement.parentElement).toHaveClass(ButtonClassName.BaseWithLoadingModifier);
      });

      fireEvent.click(getCloseButton());

      expect(
        within(screen.queryByTestId(ViewIdModel.teamNameEditModal.dataTables.orgsTable.id)).queryByText(MockTeam3.name),
      ).not.toBeInTheDocument();

      await waitFor(() => {
        expect(notificationSuccess).toBeCalledWith(TeamEditMessage.Success);
      });
    });

    test("5696629: [Given] I’m a user of EditTeam view [And] can see a table for organizations [Then] I can only see the organizations which are linked to the agency and are associated with the current team [And] I can see the organizations are sorted alphabetically by organization name [And] I can see the following information about each organization in the table: Organization  Name, Stock ticker, Organization status, Organization ID [And] I can’t click to action for any organization", async () => {
      const mixStatusOrganizationsListMock = [MockOrganization1, MockOrganization15];

      const mixedStatusOrganizationsAdminDataMock = {
        ...AdminDataContextMock,
        organizations: mixStatusOrganizationsListMock,
        team: {
          ...MockTeam3,
          managedOrganizationIds: mixStatusOrganizationsListMock.map((org: Organization) => org.id),
        },
      };

      customRender(defaultDataMocks, mixedStatusOrganizationsAdminDataMock);

      await waitForTeamData();
      const tableElement = await screen.findByTestId(ViewIdModel.teamNameEditModal.dataTables.orgsTable.entityTable.table);

      expect(await within(tableElement).findByText(AdminOrganizationsTableHeader.Status)).toBeVisible();

      for (const org of mixStatusOrganizationsListMock) {
        const nameElement = await within(tableElement).findByText(org.name);
        const rowElement = nameElement?.closest('[role="row"]');
        const ticker = org?.identifiers?.[0].split(".")[0] as string;

        expect(nameElement).toBeVisible();
        expect(await screen.findByText(ticker)).toBeVisible();

        expect(nameElement).toBeVisible();
        expect(
          within(rowElement as HTMLElement).getByText(org.active ? StatusCellLabel.Active : StatusCellLabel.Deactivated),
        ).toBeVisible();

        expect(await screen.findByText(MockOrganization1.id as string)).toBeVisible();
        fireEvent.click(rowElement as HTMLElement);
        expect(mockHistoryPush).not.toBeCalled();
        expect(mockHistoryReplace).not.toBeCalled();
      }
    });

    test("5716282, 5716432, 5716453: [Given] I’m a user of EditTeams view [And] I’ve clicked on Manage Organizations button [And] I’ve removed all organizations from the team [When] I selects 1 or more organizations to be added [Then] I can see the Update Organizations button is enabled [And] I can choose to click this button to proceed with saving the change", async () => {
      customRender();

      await clickManageOrgButton();

      fireEvent.click(
        screen.getByTestId(ViewIdModel.organizationsEditModal.organizationsSelector.selected.list.getModelId(0).icon),
      );
      await waitFor(() => {
        expect(screen.queryByText(getOrganizationLabelWithTicker(MockOrganization1))).not.toBeInTheDocument();
      });

      await selectOrganizationFromDropdown(MockOrganization2);

      await waitFor(() => {
        expect(screen.getByText(TeamEditLanguage.UpdateOrganizations)).toBeEnabled();
      });

      await clickUpdateButton();

      await waitFor(() => {
        expect(notificationSuccess).toBeCalledWith(TeamEditMessage.Success);
      });
      await waitForTeamData();

      await waitFor(() => {
        expect(screen.queryByText(getOrganizationLabelWithTicker(MockOrganization1))).not.toBeInTheDocument();
      });

      await waitFor(() => {
        expect(AdminDataContextMock.setTeam).toBeCalledWith({
          ...MockTeam3,
          managedOrganizationIds: [MockOrganization2.id],
        });
      });
    });

    test("5716283: [Given] I’m a user of Manage Organizations subscreen [And] I’ve clicked the Update Organizations button [When] the update fails to process [Then] I remain on the same screen [And] I’m warned with a toast notification that there was an error updating the organization [And] I’m asked to try again", async () => {
      customRender();

      await clickManageOrgButton();

      fireEvent.click(
        screen.getByTestId(ViewIdModel.organizationsEditModal.organizationsSelector.selected.list.getModelId(0).icon),
      );
      await waitFor(() => {
        expect(screen.queryByText(getOrganizationLabelWithTicker(MockOrganization12))).not.toBeInTheDocument();
      });

      await selectOrganizationFromDropdown(MockOrganization10);

      await waitFor(() => {
        expect(screen.getByText(TeamEditLanguage.UpdateOrganizations)).toBeEnabled();
      });

      await clickUpdateButton();

      await waitFor(() => {
        expect(notificationError).toBeCalledWith(TeamEditMessage.Failed);
      });
    });

    test("5716754: [Given] I’m a user of EditTeam view  [And] I can see a table for organization [And] there are more than 10 organizations associated with the current team [ Then] I can see pagination for the organizations list[And] I can see options to navigate to the next or previous page", async () => {
      const longOrganizationsList = [...MockOrganizations, MockOrganization11];
      const managedOrganizationIds = longOrganizationsList.map((org) => org.id);

      const longOrganizationsAdminDataMock = {
        ...AdminDataContextMock,
        team: {
          ...MockTeam3,
          managedOrganizationIds,
        },
        organizations: longOrganizationsList,
      };

      customRender(defaultDataMocks, longOrganizationsAdminDataMock);

      await waitForTeamData();

      await waitFor(() => {
        expect(screen.getByText(EntityTablePaginationLabels.Next)).toBeVisible();
      });
      await waitFor(() => {
        expect(screen.getByText(EntityTablePaginationLabels.Previous)).toBeVisible();
      });
    });

    test("5716825: [Given] I’m a user of EditTeam view  [And] I can see a table for organizations [And] there are no organizations associated with the team [Then] I can see a message in the table indicating that there are no organizations associated with the current team", async () => {
      const teamWithNoOrganizationsMock: Team = {
        ...MockTeam3,
        managedOrganizationIds: [],
      };

      const emptyOrganizationsAdminDataMock = {
        ...AdminDataContextMock,
        team: teamWithNoOrganizationsMock,
      };

      customRender(defaultDataMocks, emptyOrganizationsAdminDataMock);

      await waitForTeamData();

      await waitFor(() => {
        expect(screen.getByText(EditTeamTablesLanguage.NoOrganizations)).toBeVisible();
      });
    });
  });

  describe("Manage Users functionality", () => {
    const managedUsersMock = MockUsers.filter(
      (user) => MockTeam3.userIds.includes(user.id) && !user.roles?.every((role) => role === Role.Q4Admin),
    );

    const clickManageUsersButton = async () => {
      await waitForTeamData();

      const rowElement = await screen.findByText(EditTeamTablesLanguage.UsersButton);

      expect(rowElement).toBeVisible();
      expect(await screen.findByText(MockOrganization1.name)).toBeVisible();

      fireEvent.click(rowElement);

      expect(screen.getByTestId(ViewIdModel.usersEditModal.addUsersTeamForm.table.entityTable.id)).toBeVisible();
    };

    const clickUpdateButton = async () => {
      const updateButtonElement = await screen.findByText(TeamEditLanguage.UpdateUsers);

      await waitFor(() => {
        expect(updateButtonElement.parentElement).toBeEnabled();
      });

      fireEvent.click(screen.getByTestId(ViewIdModel.usersEditModal.update.id));
    };

    const getRowCheckbox = async (user: User) => {
      const tableElement = within(
        await screen.findByTestId(ViewIdModel.usersEditModal.addUsersTeamForm.table.entityTable.table),
      );

      expect(await tableElement.findByText(user.email)).toBeVisible();

      // eslint-disable-next-line testing-library/no-node-access
      return tableElement.getByText(user.email).closest(`.${TableClassName.Row}`).querySelector("input[type=checkbox]");
    };

    const checkTableColumns = async () => {
      expect(await screen.findByText(AdminUserTableHeader.Email)).toBeVisible();
      expect(screen.getByText(AdminUserTableHeader.FirstName)).toBeVisible();
      expect(screen.getByText(AdminUserTableHeader.LastName)).toBeVisible();
      expect(screen.getByText(AdminUserTableHeader.FriendlyName)).toBeVisible();
      expect(screen.getByText(AdminUserTableHeader.Status)).toBeVisible();
      expect(screen.getByText(AdminUserTableHeader.Role)).toBeVisible();
      expect(screen.getByText(AdminUserTableHeader.Teams)).toBeVisible();
    };

    it("7395563: renders Edit Team Users Modal without crashing", async () => {
      customRender();
      await clickManageUsersButton();

      expect(await screen.findByTestId(ViewIdModel.usersEditModal.id)).toMatchSnapshot();
    });

    test('5872074: [Given] I’m a user of Edit Team screen [And] I can see a Users section [Then] I can see an action button for "Manage Users" [And] I can see a table with the users are listed [And] the only users of the agency organization which are also assigned to my current team are displayed in the table', async () => {
      customRender();

      await waitForTeamData();

      expect(screen.getByText(EditTeamTablesLanguage.UsersButton)).toBeVisible();
      const tableElement = await screen.findByTestId(ViewIdModel.teamNameEditModal.dataTables.orgsTable.id);
      expect(tableElement).toBeVisible();

      for (const user of MockUsers) {
        if (MockTeam3.userIds.includes(user.id)) {
          expect(await screen.findByText(user.email)).toBeVisible();
        } else {
          expect(screen.queryByText(user.email)).not.toBeInTheDocument();
        }
      }
    });

    test("5872075: [Given] I’m a user of Edit Team screen [And] I can see a Users section [And] I can see a table with the listed users [And] the table contains from the the following columns: Email address, First Name, Last Name, Friendly Name, Status, Role, Teams [And] the table is sorted alphabetically by the email address column", async () => {
      customRender();

      await waitForTeamData();

      await checkTableColumns();

      const orderedManagedUsers = orderUsersAlphabetically(managedUsersMock);
      for (let index = 0; index < orderedManagedUsers.length; index++) {
        expect(await screen.findByText(orderedManagedUsers[index].email)).toBeVisible();
        expect(
          (await screen.findByText(orderedManagedUsers[index].email)).closest(`.${TableClassName.Row}`),
        ).toHaveAttribute("row-index", `${index}`);
      }
    });

    test('5872078: [Given] I am a user of the Edit Team View [And] I can see a button to Manage Users [When] I clicks on the button Manage Users [Then] I am brought to an new screen where I can change the users currently associated with the team [And] I can see the Agency’s organization name reiterated [And] I can see some helpful instructions about teams  [And] I can see an "Update Users" button to submit my edits [And] I can see an option to close the screen', async () => {
      customRender();

      await clickManageUsersButton();

      expect((await screen.findAllByText(modalTitle))[1]).toBeVisible();
      expect(screen.getByText(TeamDescriptions.Users)).toBeVisible();
      expect(screen.getByText(TeamEditLanguage.UpdateUsers)).toBeVisible();
      expect(screen.getAllByLabelText(closeModalButtonText)[1]).toBeVisible();
    });

    test("5872079: [Given] I am a user of Edit Team View [And] I’m a user of Manage Users subscreen [Then] I can see a table-based list of the existing users for the Agency organization [And] I can see users that are already on the team are pre-selected [And] I can see the user list is sorted alphabetically by email address [And] I can see the following information for each user: selected state (checkbox for selecting user), email address, first name, last name, friendly name, status, role, teams", async () => {
      customRender();

      await clickManageUsersButton();

      await checkTableColumns();

      expect(
        screen
          .getByText(AdminUserTableHeader.Email)
          .closest(`.${TableClassName.HeaderRow}`)
          .querySelector("input[type=checkbox]"),
      ).toBeVisible();
    });

    test('5872083: [Given] I’m a User of Edit Organizations View [And] I can see a column "Teams" [And] I can see an info bubble next to the column title [When] I hovers over the info bubble [Then] I can see the following instructional text: "Users not part of any team have full access to all linked organizations"', async () => {
      customRender();

      await clickManageUsersButton();

      await checkTableColumns();

      expect(await screen.findByText(AddUsersTeamsFormLanguage.Teams)).toBeInTheDocument();
    });

    test('5872085, 5872086: [Given] I am a user of Edit Team View [And] I\'m a user of Manage Users subscreen [And] I deselect all users from the team [Then] I can see the "Update Users" button is disabled [Then] I select 1 or more users to be associated with the team [And] I can see that the "Update Users" button is no longer disabled', async () => {
      const mockTeam = { ...MockTeam3, userIds: [MockUser14.id] };
      const adminDataCtxMock = {
        ...AdminDataContextMock,
        users: [MockUser14],
        team: mockTeam,
      };

      customRender(defaultDataMocks, adminDataCtxMock);

      await clickManageUsersButton();

      const updateUsersButton = screen.getByRole("button", { name: TeamEditLanguage.UpdateUsers });
      expect(updateUsersButton).toBeEnabled();

      const uncheckUser1 = (await getRowCheckbox({ ...MockUser14 })) as HTMLInputElement;
      fireEvent.click(uncheckUser1);

      await waitFor(() => {
        expect(updateUsersButton).toBeDisabled();
      });

      const userSelectionCheckbox = (await getRowCheckbox({ ...MockUser14 })) as HTMLInputElement;

      fireEvent.click(userSelectionCheckbox);
      expect(userSelectionCheckbox.checked).toEqual(true);

      await waitFor(() => {
        expect(updateUsersButton).toBeEnabled();
      });
    });

    test("5872087: [Given] I am a user of Edit Team View [And] I’m a user of Manage Users subscreen [And] I can see an option to close the screen [When] I click on the option [Then] I am brought back to the Edit Teams screen [And] I can see a summary of the information about that team [And] I can see any unsaved changes to the users are discarded", async () => {
      customRender();

      await clickManageUsersButton();

      fireEvent.click((await screen.findAllByLabelText(closeModalButtonText))[1]);

      expect(await screen.findByTestId(ViewIdModel.teamNameEditModal.id)).toBeVisible();
      expect(screen.queryByTestId(ViewIdModel.usersEditModal.id)).not.toBeInTheDocument();
    });

    test("5872080, 5872081: [Given] I am a user of Edit Team View [And] I’m a user of Manage Users subscreen [And] I have selected 1 or more users [And]I have clicked the Update Users button [And] the teams updating have finished processing [Then] I am brought back to the Edit Teams screen [And] I can see success toast notification that my team was created [And] I can see the table under the Users section reflects my changes", async () => {
      customRender();

      await clickManageUsersButton();

      fireEvent.click(await getRowCheckbox(MockUser4));

      await clickUpdateButton();

      expect((await screen.findByText(TeamEditLanguage.UpdateUsers)).parentElement).toHaveClass(
        ButtonClassName.BaseWithLoadingModifier,
      );

      await waitFor(() => {
        expect(notificationSuccess).toBeCalledWith(TeamEditMessage.Success);
      });

      expect(await screen.findByTestId(ViewIdModel.teamNameEditModal.id)).toBeVisible();
      expect(await screen.findByText(MockUser.email)).toBeVisible();
    });

    test.skip("5872082, 5872084: [Given] I am a user of Edit Team View [And] I’m a user of Manage Users subscreen [And] I can see a user in the list is already associated with another team [Then] I can still select them to be added to the current team", async () => {
      const resultMock = { ...MockTeam3, userIds: [...MockTeam3.userIds, MockUser8.id] };
      const otherTeamUsersDataMocks = [
        {
          request: {
            query: UPDATE_TEAM,
            variables: resultMock,
          },
          result: {
            data: {
              updateAccessGroup: resultMock,
            },
          },
        },
        getTeamMock,
        getTeamsMock,
        getUsersMock,
        getOrganizationAgencyMock,
        ...getOrganizationsMock,
      ];

      const otherTeamUsersAdminDataDataMock = {
        ...AdminDataContextMock,
        teams: [MockTeam1, MockTeam2, MockTeam3, MockTeam8],
        users: [MockUser1, MockUser2, MockUser8],
      };

      customRender(otherTeamUsersDataMocks, otherTeamUsersAdminDataDataMock);

      await clickManageUsersButton();

      expect(await screen.findByText(MockTeam8.name)).toBeVisible();
      expect(await screen.findByText(MockUser8.email)).toBeVisible();

      fireEvent.click(await getRowCheckbox(MockUser8));

      await waitFor(() => {
        expect(getRowCheckbox(MockUser8)).toBeChecked();
      });

      await clickUpdateButton();

      await waitFor(() => {
        expect(notificationSuccess).toBeCalledWith(TeamEditMessage.Success);
      });

      expect(await screen.findByText(MockUser8.email)).toBeVisible();
    });

    test("5872088: [Given] I’m a user of Organizations Edit View [And] I’m a user of Edit Teams screen [When] I click the Update Users button [And] the update fails to process [Then] I remain on the same screen [And] I am warned with a toast notification that there was an error updating the user list [And] I am asked to try again", async () => {
      const failedMutationDataMocks = [
        getTeamMock,
        getTeamsMock,
        getUsersMock,
        getOrganizationAgencyMock,
        ...getOrganizationsMock,
        {
          request: {
            query: UPDATE_TEAM,
            variables: { ...MockTeam3 },
          },
          error: new Error(),
        },
      ];

      customRender(failedMutationDataMocks);

      await clickManageUsersButton();

      await clickUpdateButton();

      await waitFor(() => {
        expect(notificationError).toBeCalledWith(TeamEditMessage.Failed);
      });

      expect(await screen.findByTestId(ViewIdModel.usersEditModal.id)).toBeVisible();
    });

    test("5872076: [Given] I am a user of Edit Team View [And] I’ve clicked on Manage Users button [And] can see a table with the users are listed [And] there are more than 10 users associated with the current team [Then] I can see pagination for the users list[And] I can see options to navigate to the next or previous page", async () => {
      const longUsersListTeam: Team = { ...MockTeam3, userIds: MockUsersLong.map((user) => user.id) };

      const longUsersAdminDataDataMock = {
        ...AdminDataContextMock,
        team: longUsersListTeam,
        users: MockUsersLong,
      };

      customRender(defaultDataMocks, longUsersAdminDataDataMock);

      await waitForTeamData();

      await waitFor(() => {
        expect(screen.getByText(EntityTablePaginationLabels.Next)).toBeVisible();
      });

      await waitFor(() => {
        expect(screen.getByText(EntityTablePaginationLabels.Previous)).toBeVisible();
      });
    });

    test("5872077: [Given] I’m a user of Manage Users subscreen [And] I can see a table for users [And] there are no users associated with the team [Then] I can see a message in the table indicating that there are no users associated with the current team", async () => {
      const emptyUsersTeam: Team = { ...MockTeam3, userIds: [] };
      const emptyUsersDataMocks = [
        {
          request: {
            query: GET_TEAM,
            variables: { id: MockTeam3.id, organizationId: MockOrganization12.id },
          },
          result: {
            data: {
              accessGroup: emptyUsersTeam,
            },
          },
        },
        getTeamsMock,
        getUsersMock,
        getOrganizationAgencyMock,
        ...getOrganizationsMock,
      ];

      const emptyUsersAdminDataDataMock = {
        ...AdminDataContextMock,
        team: emptyUsersTeam,
      };

      customRender(emptyUsersDataMocks, emptyUsersAdminDataDataMock);

      await waitForTeamData();

      expect(emptyUsersAdminDataDataMock.setTeam).toBeCalledWith(emptyUsersTeam);
      expect(await screen.findByText(EditTeamTablesLanguage.NoUsers)).toBeVisible();
    });
  });

  describe("Remove Team functionality", () => {
    async function openRemoveTeamConfirmation() {
      const removeButton = screen.queryByRole("button", {
        name: TeamEditLanguage.RemoveTeamButton,
      }) as HTMLButtonElement;

      await waitFor(() => {
        expect(removeButton).toBeEnabled();
      });

      fireEvent.click(removeButton);
    }

    test("5572208: [Given] I am a user of the Team Edit view [Then] I can see an option to “Remove Team”", () => {
      customRender();
      expect(screen.getByText(TeamEditLanguage.RemoveTeamButton)).toBeVisible();
    });

    test("5572209: [Given] I am a user of the Team Edit view [And] I have clicked the “Remove Team” button [Then] I am prevented and warned [And] I can see a message indicating the impact of my changes [And] I can see an option to proceed [And] an option to cancel", async () => {
      customRender();

      await openRemoveTeamConfirmation();

      expect(screen.getByText(TeamEditLanguage.RemoveTeamWarningMessage)).toBeVisible();
      expect(screen.getByTestId(ViewIdModel.cancelRemove.id)).toBeVisible();
      expect(screen.getByTestId(ViewIdModel.confirmRemove.id)).toBeVisible();
    });

    test("5572210: [Given] I can see the “Remove Team” warning [And] I have confirmed my action [Then] a call to delete the team is invoked [And] a loading state is visible on the button [And] all actions are disabled", async () => {
      customRender();

      await openRemoveTeamConfirmation();

      const removeTeam = screen.queryByRole("button", {
        name: TeamEditLanguage.RemoveTeamButton,
      }) as HTMLButtonElement;

      fireEvent.click(removeTeam);

      expect(
        screen.queryByRole("button", {
          name: TeamEditLanguage.CancelRemoveTeamButton,
        }),
      ).toBeDisabled();

      expect(
        screen.queryByRole("button", {
          name: TeamEditLanguage.RemoveTeamButton,
        }),
      ).toBeDisabled();
    });

    test("5572211: [Given] I am a user of the Team Edit view [And] a successful call was made to delete a team [Then] I can see a success notification [And] I am redirected to the Organization Edit view", async () => {
      customRender();

      await openRemoveTeamConfirmation();
      fireEvent.click(
        screen.queryByRole("button", {
          name: TeamEditLanguage.RemoveTeamButton,
        }) as HTMLButtonElement,
      );

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith(getOrganizationViewRoute(MockOrganization12.id));
      });
      expect(notificationSuccess).toHaveBeenCalledWith(TeamRemoveMessage.Success);
    });

    test("5572212: [Given] I am a user of the Team Edit view [And] an unsuccessful call was made to delete a team [Then] I can see an error notification [And] I remain on the Teams Edit view", async () => {
      const mocksWithFailedDeletion = [
        getTeamMock,
        getTeamsMock,
        getUsersMock,
        getOrganizationAgencyMock,
        ...updateTeamMock,
        {
          request: {
            query: DELETE_TEAM,
            variables: { id: MockTeam3.id, organizationId: MockOrganization12.id },
          },
          error: new Error("Whoops"),
        },
      ];

      customRender(mocksWithFailedDeletion);

      await openRemoveTeamConfirmation();
      fireEvent.click(
        screen.queryByRole("button", {
          name: TeamEditLanguage.RemoveTeamButton,
        }) as HTMLButtonElement,
      );

      await waitFor(() => {
        expect(notificationError).toHaveBeenCalledWith(TeamRemoveMessage.Failed);
      });

      expect(screen.getByText(TeamEditLanguage.Title)).toBeVisible();
    });

    test("5572213: [Given] I am a user of the Team Edit view [And] I have clicked the “Remove Team” button [And] have been warned about my changes [When] I select the option to cancel [Then] I remain on the Team Edit view", async () => {
      customRender();

      await openRemoveTeamConfirmation();

      fireEvent.click(screen.getByRole("button", { name: TeamEditLanguage.CancelRemoveTeamButton }));

      expect(screen.queryByText(TeamEditLanguage.RemoveTeamWarningMessage)).not.toBeInTheDocument();
      expect(mockHistoryPush).not.toHaveBeenCalled();
      expect(screen.getByText(TeamEditLanguage.Title)).toBeVisible();
    });
  });

  describe("Organizations Search functionality", () => {
    const searchString = "Search";

    const withinTableElement = () => {
      return within(screen.getByTestId(ViewIdModel.teamNameEditModal.dataTables.orgsTable.id));
    };

    const submitSearchQuery = (searchQuery: string) => {
      const searchElement = withinTableElement().getByLabelText(searchString);

      fireEvent.change(searchElement, { target: { value: searchQuery } });

      expect(searchElement).toHaveValue(searchQuery);
    };

    test("6165585: [Given] I’m a user of the Edit Team view [And] I can see a section for Managed Organization [Then] I can see a search bar to filter the organizations", async () => {
      customRender();

      await waitForTeamData();

      expect(screen.getByText(EditTeamTablesLanguage.OrgsTitle)).toBeVisible();
      expect(withinTableElement().getByLabelText(searchString)).toBeVisible();
    });

    test("6165586: [Given] I’m a user of the Edit Team view [And] I can see a search bar to filter the organizations [And] I can see a table where the organizations are listed [When] I type in the search bar [Then] I can see the list of organizations in the table is filtered based on a search query [And] I do not need to submit a query in order to see the list change", async () => {
      const searchQuery = "corp";
      customRender();

      await waitForTeamData();

      submitSearchQuery(searchQuery);

      expect(
        within(screen.getByTestId(ViewIdModel.teamNameEditModal.dataTables.orgsTable.entityTable.table)).getAllByText(
          RegExp(searchQuery, "i"),
        ).length > 0,
      ).toBeTruthy();
    });

    test("6165587, 6165588: [Given] I’m a user of the Edit Team view [And] I can see a table where the organizations are listed [And] the table is on a page that is not page 1 [When] I provides a search query [Then] I can see the list of organizations is filtered based on her search query [And] the table is returned to page 1", async () => {
      const searchQuery = "i";
      const longOrganizationsList = [...MockOrganizations, MockOrganization11, MockOrganization13, MockOrganization14];
      const managedOrganizationIds = longOrganizationsList.map((org) => org.id);

      const longOrganizationsAdminDataMock = {
        ...AdminDataContextMock,
        team: {
          ...MockTeam3,
          managedOrganizationIds,
        },
        organizations: longOrganizationsList,
      };

      customRender(defaultDataMocks, longOrganizationsAdminDataMock);

      await waitForTeamData();

      const nextButton = screen.getByRole("button", { name: EntityTablePaginationLabels.Next });
      const previousButton = screen.getByRole("button", { name: EntityTablePaginationLabels.Previous });

      fireEvent.click(nextButton);

      // FIXME
      // expect(previousButton).toBeEnabled();

      submitSearchQuery(searchQuery);
      expect(previousButton).toBeDisabled();
    });

    test("6165589: [Given] I’m a user of the Edit Team view [And] I provided a search term [And] the term matches no results for the organizations [Then] I can a message indicating that there are no results matching her search term", async () => {
      const searchQuery = "oh no, continue!";
      customRender();

      await waitForTeamData();

      submitSearchQuery(searchQuery);

      expect(withinTableElement().getByText(EditTeamTablesLanguage.NoResults)).toBeVisible();
    });

    test("6165590: [Given] I’m a user of the Edit Team view [And] I’ve clicked on Manage Organizations button [And] I can see a dropdown to select the organizations [When] I type in the dropdown field [Then] I can see the list of organizations is filtered based on her search query", async () => {
      const searchQuery = "inc";
      customRender();

      await waitForTeamData();

      const rowElement = await screen.findByText(EditTeamTablesLanguage.OrgsButton);

      expect(rowElement).toBeVisible();
      expect(await screen.findByText(MockOrganization1.name)).toBeVisible();

      fireEvent.click(rowElement);

      const inputElement = await screen.findByTestId(
        ViewIdModel.organizationsEditModal.organizationsSelector.dropdown.input,
      );
      expect(inputElement).toBeVisible();

      fireEvent.change(inputElement, { target: { value: searchQuery } });

      expect(
        (
          await within(
            screen.getByTestId(ViewIdModel.organizationsEditModal.organizationsSelector.dropdown.menu),
          ).findAllByText(RegExp(searchQuery, "i"))
        ).length > 0,
      ).toBeTruthy();
    });
  });

  describe("Users Search functionality", () => {
    const searchString = "Search";

    const submitSearchQuery = (searchQuery: string) => {
      const searchElement = within(
        screen.getByTestId(ViewIdModel.teamNameEditModal.dataTables.usersTable.id),
      ).getByLabelText(searchString);

      fireEvent.change(searchElement, { target: { value: searchQuery } });

      expect(searchElement).toHaveValue(searchQuery);
    };

    test("6154928: [Given] I’m a user of Team Edit page [And] I can see a section for Users [Then] I can see a search bar to filter the users", async () => {
      customRender();

      await waitForTeamData();

      expect(screen.getByText(EditTeamTablesLanguage.UsersTitle)).toBeVisible();
      expect(
        within(screen.getByTestId(ViewIdModel.teamNameEditModal.dataTables.usersTable.id)).getByLabelText(searchString),
      ).toBeVisible();
    });

    test("6154929: [Given] I’m a user of Team Edit page [And] I  see a search bar to filter the users [And] I can see a table where the users are listed [When] I type in the search bar [Then] I can see the table of users is filtered based on the search query [And] results may match any of the fields for a user", async () => {
      const searchQuery = "peter";
      customRender();

      await waitForTeamData();

      submitSearchQuery(searchQuery);

      expect(
        within(screen.getByTestId(ViewIdModel.teamNameEditModal.dataTables.usersTable.entityTable.table)).getAllByText(
          RegExp(searchQuery, "i"),
        ).length > 0,
      ).toBeTruthy();
    });

    test("6154930, 6154931: [Given] I’m a user of Team Edit page [And] I  see a table where the users are listed [And] the table is on a page that is not page 1 [When] I provide a search query [Then] I can see the list of users is filtered based on her search query [And] the table is returned to page 1", async () => {
      const searchQuery = "@";
      const longUsersListTeam: Team = { ...MockTeam3, userIds: MockUsersLong.map((user) => user.id) };

      const longUsersAdminDataDataMock = {
        ...AdminDataContextMock,
        team: longUsersListTeam,
        users: MockUsersLong,
      };

      customRender(defaultDataMocks, longUsersAdminDataDataMock);

      await waitForTeamData();
      const nextButton = screen.getByRole("button", { name: EntityTablePaginationLabels.Next });
      const previousButton = screen.getByRole("button", { name: EntityTablePaginationLabels.Previous });

      fireEvent.click(nextButton);

      // FIXME
      // expect(previousButton).toBeEnabled();

      submitSearchQuery(searchQuery);

      expect(previousButton).toBeDisabled();
    });

    test("6154932: [Given] I’m a user of Team Edit page [And] I provided a search term [And] the term matches no results for the users [Then] I can see a message indicating that there are no results matching her search term", async () => {
      const searchQuery = "oh no, continue!";
      customRender();

      await waitForTeamData();

      submitSearchQuery(searchQuery);

      expect(screen.getByText(EditTeamTablesLanguage.NoResults)).toBeVisible();
    });
  });
});
