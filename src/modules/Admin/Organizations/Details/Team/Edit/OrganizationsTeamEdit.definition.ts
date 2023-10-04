import { ButtonIdModel, IdModelBase, isNullOrWhiteSpace, ModalIdModel } from "@q4/nimbus-ui";
import type { ModalProps } from "@q4/nimbus-ui";
import type { OrganizationsTeamParam } from "../OrganizationsTeam.definition";
import { EditTeamNameModalIdModel } from "./EditTeamNameModal/EditTeamNameModal.definition";
import { EditTeamOrganizationsModalIdModel } from "./EditTeamOrganizationsModal/EditTeamOrganizationsModal.definition";
import { EditTeamUsersModalIdModel } from "./EditTeamUsersModal/EditTeamUsersModal.definition";

export interface OrganizationsTeamEditParam extends OrganizationsTeamParam {
  teamId: string;
}

export enum TeamEditState {
  Name = "name-edit",
  Organizations = "organizations-edit",
  Users = "users-edit",
}

export enum TeamEditLanguage {
  Title = "Edit Team",
  SaveTeamButton = "Save Team",
  RemoveTeamButton = "Remove Team",
  CancelRemoveTeamButton = "Cancel",
  RemoveTeamWarningHeader = "Remove Team?",
  RemoveTeamWarningMessage = "It is recommended that you add users to a new team before removing an existing team, since any users which have no team associated will have access to all of the linked organizations",
  UpdateOrganizations = "Update Organizations",
  UpdateUsers = "Update Users",
}

export enum TeamEditMessage {
  Failed = "Failed to update team. Please try again.",
  FailedUnlinked = "At least one selected organizations is no longer managed by the Agency and has been removed. Please try again.",
  FailedBelongsTeam = "At least one selected organization belongs to another team and has been removed from this team. Please try again.",
  Success = "The team was updated successfully.",
}

export enum TeamRemoveMessage {
  Failed = "Failed to remove team.",
  Success = "The team was removed successfully.",
}

export enum TeamEditResponseErrors {
  OrganizationUnlinked = 'Unexpected error value: "Access group creation failed: some organizations can\'t be managed by this agency"',
  OrganizationHasTeam = "An error occurred when trying to update the AccessGroup: some organizations are already managed by other Team",
}

export const TeamEditModalDefaultProps: ModalProps = {
  fullscreen: true,
  scrollable: true,
  visible: false,
  title: TeamEditLanguage.Title,
  badgeIcon: "q4i-team-2pt",
  focusOnProps: {
    autoFocus: false,
  },
};

class TeamEditIdModel extends IdModelBase {
  organizationsEditModal: EditTeamOrganizationsModalIdModel;
  teamNameEditModal: EditTeamNameModalIdModel;
  usersEditModal: EditTeamUsersModalIdModel;
  confirmationModal: ModalIdModel;
  remove: ButtonIdModel;
  cancelRemove: ButtonIdModel;
  confirmRemove: ButtonIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(this.id)) {
      this.teamNameEditModal = new EditTeamNameModalIdModel(null);
      this.organizationsEditModal = new EditTeamOrganizationsModalIdModel(null);
      this.usersEditModal = new EditTeamUsersModalIdModel(null);
      this.confirmationModal = new ModalIdModel(null);
      this.remove = new ButtonIdModel(null);
      this.cancelRemove = new ButtonIdModel(null);
      this.confirmRemove = new ButtonIdModel(null);

      return;
    }

    this.confirmationModal = new ModalIdModel(`${this.id}ConfirmationModal`);
    this.teamNameEditModal = new EditTeamNameModalIdModel(`${this.id}TeamNameModal`);
    this.organizationsEditModal = new EditTeamOrganizationsModalIdModel(`${this.id}OrgsModal`);
    this.usersEditModal = new EditTeamUsersModalIdModel(`${this.id}UsersModal`);
    this.remove = new ButtonIdModel(`${this.id}Remove`);
    this.cancelRemove = new ButtonIdModel(`${this.id}CancelRemove`);
    this.confirmRemove = new ButtonIdModel(`${this.id}ConfirmRemove`);
  }
}

export const TeamEditViewIdModel = new TeamEditIdModel("TeamEdit");
