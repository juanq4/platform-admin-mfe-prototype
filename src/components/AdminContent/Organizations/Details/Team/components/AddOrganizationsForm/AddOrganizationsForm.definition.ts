import { IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { BaseComponentProps } from "@q4/nimbus-ui";
import type { Organization } from "../../../../../../../definitions/organization.definition";
import type { Team } from "../../../../../../../definitions/team.definition";
import type { TeamFormError } from "../../OrganizationsTeam.definition";
import { OrganizationsSelectDropdownIdModel } from "../OrganizationsSelectDropdown/OrganizationsSelectDropdown.definition";
import { TeamNameFieldIdModel } from "../TeamNameField/TeamNameField.definition";

export interface AddOrganizationsFormProps extends BaseComponentProps {
  managedOrganizations: Organization[];
  selectedOrganizations: Organization[];
  teamName: Team["name"];
  teams: Team[];
  isLoading: boolean;
  errors: TeamFormError;
  onChangeName: (name: Team["name"]) => void;
  onChangeOrganizationsList: (selectedOrganizations: Organization[]) => void;
}

export class AddOrganizationsFormIdModel extends IdModelBase {
  teamNameField: TeamNameFieldIdModel;
  organizationsSelector: OrganizationsSelectDropdownIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(this.id)) {
      this.teamNameField = new TeamNameFieldIdModel(null);
      this.organizationsSelector = new OrganizationsSelectDropdownIdModel(null);

      return;
    }

    this.teamNameField = new TeamNameFieldIdModel(`${this.id}Name`);
    this.organizationsSelector = new OrganizationsSelectDropdownIdModel(`${this.id}Selector`);
  }
}
