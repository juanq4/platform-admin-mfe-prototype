import type { BaseComponentProps } from "@q4/nimbus-ui";
import { ButtonIdModel, IdModelBase, isNullOrWhiteSpace, ModalIdModel } from "@q4/nimbus-ui";
import type { Team } from "../../../../../../../definitions/team.definition";
import type { TeamDeltaUpdates } from "../../OrganizationsTeam.definition";
import { AddUsersTeamsFormIdModel } from "../../components/AddUsersForm/AddUsersTeamsForm.definition";

export interface EditTeamUsersModalProps extends BaseComponentProps {
  title: string;
  isVisible: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error?: Error;
  onRefetchUsers: () => void;
  onUpdate: (team: Team, teamUpdateDeltas: TeamDeltaUpdates) => void;
  onClose: () => void;
}

export class EditTeamUsersModalIdModel extends IdModelBase {
  modal: ModalIdModel;
  update: ButtonIdModel;
  addUsersTeamForm: AddUsersTeamsFormIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(this.id)) {
      this.modal = new ModalIdModel(null);
      this.update = new ButtonIdModel(null);
      this.addUsersTeamForm = new AddUsersTeamsFormIdModel(null);

      return;
    }

    this.modal = new ModalIdModel(`${this.id}`);
    this.update = new ButtonIdModel(`${this.id}Update`);
    this.addUsersTeamForm = new AddUsersTeamsFormIdModel(`${this.id}Form`);
  }
}
