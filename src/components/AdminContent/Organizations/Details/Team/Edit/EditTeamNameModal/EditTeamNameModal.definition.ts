import type { BaseComponentProps } from "@q4/nimbus-ui";
import { ButtonIdModel, IdModelBase, isNullOrWhiteSpace, ModalIdModel } from "@q4/nimbus-ui";
import type { Team } from "../../../../../../definitions";
import type { TeamDeltaUpdates } from "../../OrganizationsTeam.definition";
import { EditTeamTablesIdModel } from "../../components/EditTeamTables/EditTeamTables.definition";
import { TeamNameFieldIdModel } from "../../components/TeamNameField/TeamNameField.definition";

export const maxTeamNameLength = 250;

export interface EditTeamNameModalProps extends BaseComponentProps {
  title: string;
  organizationsError: Error;
  usersError: Error;
  isLoading: boolean;
  isUpdating: boolean;
  onEditOrganizations: () => void;
  onEditUsers: () => void;
  onUpdate: (team: Team, updateTeamDelta?: TeamDeltaUpdates) => void;
  onRemove: () => void;
  onClose: () => void;
  onRefetchOrganizations: () => void;
  onRefetchUsers: () => void;
}

export class EditTeamNameModalIdModel extends IdModelBase {
  modal: ModalIdModel;
  save: ButtonIdModel;
  remove: ButtonIdModel;
  nameField: TeamNameFieldIdModel;
  dataTables: EditTeamTablesIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(this.id)) {
      this.modal = new ModalIdModel(null);
      this.save = new ButtonIdModel(null);
      this.remove = new ButtonIdModel(null);
      this.nameField = new TeamNameFieldIdModel(null);
      this.dataTables = new EditTeamTablesIdModel(null);

      return;
    }

    this.modal = new ModalIdModel(`${this.id}`);
    this.save = new ButtonIdModel(`${this.id}Save`);
    this.remove = new ButtonIdModel(`${this.id}Remove`);
    this.nameField = new TeamNameFieldIdModel(`${this.id}Field`);
    this.dataTables = new EditTeamTablesIdModel(`${this.id}NameForm`);
  }
}
