import type { BaseComponentProps } from "@q4/nimbus-ui";
import { IdModelBase, InfoIconIdModel, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { Team } from "../../../../../../../definitions/team.definition";
import type { User } from "../../../../../../../definitions/user.definition";
import { AdminUserTableIdModel } from "../../../../../../Tables/user/AdminUserTable.definition";

export enum AddUsersTeamsFormLanguage {
  Teams = "Users not part of any teams have full access to all linked organizations",
}

export interface AddUsersTeamsFormProps extends BaseComponentProps {
  users: User[];
  teams: Team[];
  selectedUsers: User["id"][];
  error: Error;
  isLoading: boolean;
  onUsersError: () => void;
  onUserSelect: (userId: User["id"]) => void;
  onUserRemove: (userId: User["id"]) => void;
}

export class AddUsersTeamsFormIdModel extends IdModelBase {
  table: AdminUserTableIdModel;
  teamsInfo: InfoIconIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(id)) {
      this.table = new AdminUserTableIdModel(null);
      this.teamsInfo = new InfoIconIdModel(null);

      return;
    }

    this.table = new AdminUserTableIdModel(`${this.id}Table`);
    this.teamsInfo = new InfoIconIdModel(`${this.id}Info`);
  }
}
