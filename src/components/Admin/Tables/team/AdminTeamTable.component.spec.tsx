import React from "react";
import { screen, render } from "../../../../utils/testUtils";
import { OrganizationTeamsLanguage } from "../../Teams";
import { AdminTeamTable } from "./AdminTeamTable.component";
import type { AdminTeamTableProps } from "./AdminTeamTable.definition";
import { AdminTeamTableEntityKey, AdminTeamTableHeader, AdminTeamTableIdModel } from "./AdminTeamTable.definition";

describe("Organization Teams Table", () => {
  const idModel = new AdminTeamTableIdModel("TeamTable");

  const adminTeamTableMock: AdminTeamTableProps = {
    id: idModel.id,
    items: [
      {
        id: "1",
        managedOrganizationIds: ["1", "2"],
        userIds: ["1", "2"],
        name: "Friends",
        organizationId: "1",
      },
      {
        id: "2",
        managedOrganizationIds: ["1", "2"],
        userIds: ["3", "4", "5"],
        name: "Buddies",
        organizationId: "1",
      },
      {
        id: "3",
        managedOrganizationIds: ["1", "2"],
        userIds: ["1", "2"],
        name: "Homies",
        organizationId: "1",
      },
      {
        id: "4",
        managedOrganizationIds: [],
        userIds: [],
        name: "Pals",
        organizationId: "1",
      },
    ],
    loading: false,
    error: null,
    placeholderProps: { title: OrganizationTeamsLanguage.NO_TEAMS },
    onError: jest.fn(),
  };

  test("5511025: [Given] I am a user of Organization Access Group List [Then] I can see the organization access groups sorted alphabetically [And] I can see a column for number of managed organizations [And] I can see a column for number of managing users [And] I can see a column for the unique identifier", async () => {
    const sortedTeamNames: string[] = adminTeamTableMock.items.map((item) => item.name).sort((a, b) => a.localeCompare(b));
    render(<AdminTeamTable {...adminTeamTableMock} />);

    expect(await screen.findByText(AdminTeamTableHeader.Name)).toBeVisible();

    expect(screen.getByText(AdminTeamTableHeader.TeamID)).toBeVisible();
    expect(screen.getByText(AdminTeamTableHeader.OrgCount)).toBeVisible();
    expect(screen.getByText(AdminTeamTableHeader.UserCount)).toBeVisible();

    const teams = Array.from(screen.queryAllByTestId(AdminTeamTableEntityKey.Name) as HTMLElement[]) as HTMLElement[];

    teams.forEach((team, index) => {
      const elements = [AdminTeamTableHeader.Name, ...sortedTeamNames];
      expect(team).toHaveTextContent(elements[index]);
    });
  });

  test("5512000: [Given] I am a user of Organization Access Group List [Then] I can see the number of managed organizations and number of managing users for each team", async () => {
    const sortedTeams = adminTeamTableMock.items.sort((a, b) => a.name.localeCompare(b.name));
    const orgCounts = sortedTeams.map((team) => team.managedOrganizationIds.length.toString());
    const userCounts = sortedTeams.map((team) => team.userIds.length.toString());

    render(<AdminTeamTable {...adminTeamTableMock} />);

    expect(await screen.findByText(AdminTeamTableHeader.OrgCount)).toBeVisible();

    const orgElements = Array.from(
      screen.queryAllByTestId(AdminTeamTableEntityKey.OrgCount) as HTMLElement[],
    ) as HTMLElement[];
    const userElements = Array.from(
      screen.queryAllByTestId(AdminTeamTableEntityKey.UserCount) as HTMLElement[],
    ) as HTMLElement[];

    orgElements.forEach((orgElement, index) => {
      const elements = [AdminTeamTableHeader.OrgCount, ...orgCounts];
      expect(orgElement).toHaveTextContent(elements[index]);
    });

    userElements.forEach((userElement, index) => {
      const elements = [AdminTeamTableHeader.UserCount, ...userCounts];
      expect(userElement).toHaveTextContent(elements[index]);
    });
  });

  test('5512001: [Given] I am a user of Organization Access Group List [And] there are no existing teams [Then] I can see a placeholder message that states “There are currently no teams"', async () => {
    render(<AdminTeamTable {...adminTeamTableMock} items={[]} />);

    expect(await screen.findByText(OrganizationTeamsLanguage.NO_TEAMS)).toBeVisible();
  });
});
