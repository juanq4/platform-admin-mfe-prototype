import React from "react";
import { MockUsersLong, MockUser13, MockUser12, MockUser11 } from "../../../../../../../__mocks__/data/users.mock";
import type { Team } from "../../../../../../../definitions/team.definition";
import { useAdminDataContext } from "../../../../../../../hooks/useAdminDataContext/useAdminDataContext.hook";
import { fireEvent, render, screen, waitFor } from "../../../../../../../utils/testUtils";
import { TeamEditLanguage, TeamEditViewIdModel as ViewIdModel } from "../OrganizationsTeamEdit.definition";
import { EditTeamUsersModal } from "./EditTeamUsersModal.component";

jest.mock("../../../../../../../hooks/useAdminDataContext/useAdminDataContext.hook");
const mockUseAdminData = useAdminDataContext as jest.Mock;

const mockOnUpdate = jest.fn();
const defaultProps = {
  title: `${TeamEditLanguage.Title} • mock organization • mock team`,
  isUpdating: false,
  isVisible: true,
  isLoading: false,
  // error: undefined,
  onUpdate: mockOnUpdate,
  onRefetchUsers: jest.fn(),
  onClose: () => jest.fn(),
};

describe("Edit Team Users Modal", () => {
  it("renders component", async () => {
    mockUseAdminData.mockReturnValue({ team: { userIds: [] }, users: MockUsersLong, teams: [] });
    render(
      <div id={ViewIdModel?.teamNameEditModal?.id}>
        <EditTeamUsersModal id="mockTeamUsers" {...defaultProps} />
      </div>,
    );

    expect(await screen.findByText(MockUsersLong[0].email)).toBeInTheDocument();

    const root = screen.getByTestId("TeamEditTeamNameModal");
    expect(root).toMatchSnapshot();
  });

  test("9646820: [Given] I am on the User selection page in Edit Team [And] I select all user checkbox [Then] expect all users on page to be selected", async () => {
    const expectedResult = [MockUser13.id, MockUser12.id, MockUser11.id];
    mockUseAdminData.mockReturnValue({ team: { userIds: [] }, users: [MockUser13, MockUser12, MockUser11], teams: [] });
    render(
      <div id={ViewIdModel?.teamNameEditModal?.id}>
        <EditTeamUsersModal id="mockTeamUsers" {...defaultProps} />
      </div>,
    );

    expect(await screen.findByText(MockUser13.email)).toBeInTheDocument();

    const selectAllCheckbox = document.querySelector(
      "#mockTeamUsersFormTableEntityTableTable .ag-header-cell[col-id='email'] .ag-checkbox-input",
    ) as HTMLElement;

    expect(selectAllCheckbox).toBeInTheDocument();
    fireEvent.click(selectAllCheckbox);

    expect(selectAllCheckbox).toBeChecked();

    const updateUserButton = screen.getByRole("button", { name: TeamEditLanguage.UpdateUsers });
    expect(updateUserButton).toBeInTheDocument();
    await waitFor(() => {
      expect(updateUserButton).toBeEnabled();
    });

    fireEvent.click(updateUserButton);

    expect(mockOnUpdate).toBeCalledWith(
      {
        userIds: expectedResult,
      },
      {
        userDeltas: {
          add: expectedResult,
          remove: [],
        },
      },
    );
  });

  test("9646821: [Given] I am on the User selection page in Edit Team [And] I select all user checkbox [Then] expect all users on page to be selected", async () => {
    const mockAdminData = {
      team: { userIds: [MockUser13.id, MockUser12.id, MockUser11.id] },
      users: [MockUser13, MockUser12, MockUser11],
      teams: [] as Team[],
    };
    mockUseAdminData.mockReturnValue(mockAdminData);

    render(
      <div id={ViewIdModel?.teamNameEditModal?.id}>
        <EditTeamUsersModal id="mockTeamUsers" {...defaultProps} />
      </div>,
    );

    expect(await screen.findByText(MockUser13.email)).toBeInTheDocument();

    const deselectAllCheckbox = document.querySelector(
      "#mockTeamUsersFormTableEntityTableTable .ag-header-cell[col-id='email'] .ag-checkbox-input",
    ) as HTMLElement;

    expect(deselectAllCheckbox).toBeInTheDocument();
    expect(deselectAllCheckbox).toBeChecked();

    fireEvent.click(deselectAllCheckbox);

    expect(deselectAllCheckbox).not.toBeChecked();

    const updateUserButton = screen.getByRole("button", { name: TeamEditLanguage.UpdateUsers });

    await waitFor(() => {
      expect(updateUserButton).toBeDisabled();
    });

    const firstCheckbox = document.querySelector(
      "#mockTeamUsersFormTableEntityTableTable .ag-row-first .ag-checkbox-input",
    ) as HTMLElement;

    fireEvent.click(firstCheckbox);

    await waitFor(() => {
      expect(updateUserButton).toBeEnabled();
    });

    fireEvent.click(updateUserButton);

    expect(mockOnUpdate).toBeCalledWith(
      {
        userIds: [MockUser13.id],
      },
      {
        userDeltas: {
          add: [],
          remove: mockAdminData.team.userIds.filter((id) => MockUser13.id !== id),
        },
      },
    );
  });
});
