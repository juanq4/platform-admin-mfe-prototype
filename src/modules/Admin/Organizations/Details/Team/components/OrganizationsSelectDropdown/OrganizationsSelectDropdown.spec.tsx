import { within } from "@testing-library/react";
import React from "react";
import {
  MockOrganization1,
  MockOrganization15,
  MockOrganizations,
  MockTeam1,
  MockTeams,
} from "../../../../../../../__mocks__";
import { StatusCellLabel } from "../../../../../../../components";
import type { Organization, Team } from "../../../../../../../definitions";
import { getOrganizationLabelWithTicker, orderOrganizationsAlphabetically } from "../../../../../../../utils";
import { render, screen, fireEvent } from "../../../../../../../utils/testUtils";
import { OrganizationsSelectDropdown } from "./OrganizationsSelectDropdown.component";
import {
  OrganizationsSelectDropdownIdModel,
  OrganizationsSelectDropdownLanguage,
} from "./OrganizationsSelectDropdown.definition";

describe("Organizations Select Dropdown component", () => {
  const idModel = new OrganizationsSelectDropdownIdModel("Test");
  const onChangeSpy = jest.fn();

  const customRender = (
    mockedOrganizations: Organization[] = MockOrganizations,
    mockedTeams: Team[] = MockTeams,
    mockedSelectedOrganizations: Organization[] = [],
  ) => {
    return render(
      <OrganizationsSelectDropdown
        id={idModel.id}
        organizations={mockedOrganizations}
        teams={mockedTeams}
        selectedOrganizations={mockedSelectedOrganizations}
        onChangeOrganizationsList={onChangeSpy}
      />,
    );
  };

  const openDropdown = () => {
    const mutliSelect = screen.getByTestId(idModel.dropdown.id);

    expect(mutliSelect).toBeInTheDocument();

    fireEvent.click(mutliSelect);
    fireEvent.keyDown(mutliSelect, { key: "Down" });
  };

  const getOptionId = (organization: Organization): string => {
    return `option-${organization.id}-${getOrganizationLabelWithTicker(organization).replace(/\s/g, "-")}`;
  };

  const selectOptionFromList = (organization: Organization) => {
    fireEvent.click(screen.getByTestId(getOptionId(organization)));

    fireEvent.keyDown(screen.getByTestId(idModel.dropdown.id), { key: "Esc" });
  };

  it("7395559: renders without crash", () => {
    customRender();
    expect(screen.getByTestId(idModel.id)).toMatchSnapshot();
  });

  test("5447788, 5681035: [Given] I'm a user of EditTeam subscreen [And] I can see a list of organizations linked to that agency [Then] I can see an option to select one or more organizations", () => {
    customRender();

    openDropdown();

    expect(screen.getByText(OrganizationsSelectDropdownLanguage.Placeholder)).toBeVisible();
    expect(screen.getByTestId(idModel.dropdown.menu)).toBeVisible();
    expect(screen.getAllByRole("checkbox")[0]).toBeInTheDocument();
  });

  test("5447787, 5681036:[Given] I'm a user of EditTeam subscreen [And] I can see a dropdown to manage the organizations associated with the team [When] I interact with the the dropdown list [Then] I can see a list of existing organizations which are already linked to that agency [And] I can see the list is sorted alphabetically [And] I can see the name And symbol for each org [And] I cannot see any orgs which are not already linked to that agency org", () => {
    const sortedList = orderOrganizationsAlphabetically(MockOrganizations);

    customRender();

    openDropdown();

    sortedList.forEach((org: Organization, index: number) => {
      expect(
        within(screen.getAllByTestId(RegExp(`-option-${index}`))[0]).getByText(getOrganizationLabelWithTicker(org)),
      ).toBeVisible();
    });
  });

  test("5681037, 5447789:[Given] I'm a user of EditTeam subscreen [And] I can see a list of organizations linked to that agency [And] I've selected one or more of the organizations [When] I close the organizations dropdown [Then] I can see my selected organizations visible [And] I can see an option to remove the selection", () => {
    const selectOrganization = MockOrganizations[1];
    const matchSelectedData = [
      {
        ...selectOrganization,
        isDisabled: false,
        label: selectOrganization.name,
        value: selectOrganization.id,
        isSelected: false,
      },
    ];
    const { unmount } = customRender();

    openDropdown();

    selectOptionFromList(selectOrganization);

    expect(onChangeSpy).toBeCalledWith(matchSelectedData);

    unmount();

    customRender(MockOrganizations, MockTeams, [selectOrganization]);

    expect(screen.getByTestId(idModel.selected.id)).toBeVisible();
    expect(screen.getByText(getOrganizationLabelWithTicker(selectOrganization))).toBeVisible();
    expect(screen.getByTestId(idModel.selected.list.getModelId(0).icon)).toBeVisible();
  });

  test("5681038: [Given] an organization is a client of another team [Then] the team name is visible [And] the organization can be selected", () => {
    const selectOrganization = MockOrganization1;
    const associatedTeam = MockTeam1;

    customRender();

    openDropdown();

    const optionElement = screen.getByText(getOrganizationLabelWithTicker(selectOrganization));
    expect(optionElement).toBeVisible();

    // eslint-disable-next-line testing-library/no-node-access
    expect(within(optionElement.parentElement).getByText(associatedTeam.name)).toBeVisible();

    selectOptionFromList(selectOrganization);

    expect(onChangeSpy).toBeCalled();
  });

  test('6416670: [Given] I can see a list of existing organizations linked to the agency [And] there is organizations in the list which is "Deactivated" [Then] I can see "Deactivated" status [And] it is disabled', async () => {
    customRender([MockOrganization15]);

    await openDropdown();

    const labelElement = screen.getByText(
      `${getOrganizationLabelWithTicker(MockOrganization15)} (${StatusCellLabel.Deactivated})`,
    );
    expect(labelElement).toBeVisible();
    // eslint-disable-next-line testing-library/no-node-access
    expect(labelElement.parentElement.parentElement).toHaveAttribute("class", expect.stringMatching(/--is-disabled/gi));
  });

  test('6416669: [Given] I can see a list of existing organizations linked to the agency [And] there is already list of linked organizations [And] one or more organizations are "Deactivated" [Then] I can see "Deactivated" status in the label', () => {
    customRender([MockOrganization15], [], [MockOrganization15]);

    const chipsWrapperElement = screen.getByTestId(idModel.selected.id);

    const labelElement = within(chipsWrapperElement).getByText(
      `${getOrganizationLabelWithTicker(MockOrganization15)} (${StatusCellLabel.Deactivated})`,
    );
    expect(labelElement).toBeVisible();
  });
});
