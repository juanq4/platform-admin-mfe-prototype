import type { BaseComponentProps } from "@q4/nimbus-ui";
import { ButtonIdModel, IdModelBase, isNullOrWhiteSpace, ModalIdModel } from "@q4/nimbus-ui";
import type { Team } from "../../../../../../definitions";
import type { TeamDeltaUpdates } from "../../OrganizationsTeam.definition";
import { OrganizationsSelectDropdownIdModel } from "../../components/OrganizationsSelectDropdown/OrganizationsSelectDropdown.definition";

export interface EditTeamOrganizationsModalProps extends BaseComponentProps {
  title: string;
  isVisible: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  onUpdate: (team: Team, teamUpdateDeltas: TeamDeltaUpdates) => void;
  onClose: () => void;
}
export class EditTeamOrganizationsModalIdModel extends IdModelBase {
  modal: ModalIdModel;
  update: ButtonIdModel;
  organizationsSelector: OrganizationsSelectDropdownIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(this.id)) {
      this.modal = new ModalIdModel(null);
      this.update = new ButtonIdModel(null);
      this.organizationsSelector = new OrganizationsSelectDropdownIdModel(null);

      return;
    }

    this.modal = new ModalIdModel(`${this.id}`);
    this.update = new ButtonIdModel(`${this.id}Update`);
    this.organizationsSelector = new OrganizationsSelectDropdownIdModel(`${this.id}Selector`);
  }
}
