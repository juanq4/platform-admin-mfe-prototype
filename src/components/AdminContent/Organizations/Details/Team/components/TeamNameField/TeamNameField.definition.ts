import type { BaseComponentProps } from "@q4/nimbus-ui";
import { FieldIdModel, IdModelBase, isNullOrWhiteSpace, TextboxIdModel } from "@q4/nimbus-ui";
import type { Team } from "../../../../../../../definitions/team.definition";
import type { TeamFormError } from "../../OrganizationsTeam.definition";

export enum TeamNameFieldLanguage {
  Label = "Team Name",
}

export interface TeamNameFieldProps extends BaseComponentProps {
  teamName: Team["name"];
  errors: TeamFormError;
  disabled?: boolean;
  onChangeName: (name: Team["name"]) => void;
}

export class TeamNameFieldIdModel extends IdModelBase {
  field: FieldIdModel;
  textbox: TextboxIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(id)) {
      this.field = new FieldIdModel(null);
      this.textbox = new TextboxIdModel(null);

      return;
    }

    this.field = new FieldIdModel(`${this.id}NameField`);
    this.textbox = new TextboxIdModel(`${this.id}NameTextbox`);
  }
}
