import type { BaseComponentProps } from "@q4/nimbus-ui";
import { ButtonIdModel, IdModelBase, InfoIconIdModel, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { AdminOrganizationTableProps } from "../../../../../../../components/Admin/Tables/organization/AdminOrganizationTable.definition";
import { AdminOrganizationTableIdModel } from "../../../../../../../components/Admin/Tables/organization/AdminOrganizationTable.definition";
import type { AdminUserTableProps } from "../../../../../../../components/Admin/Tables/user/AdminUserTable.definition";
import { AdminUserTableIdModel } from "../../../../../../../components/Admin/Tables/user/AdminUserTable.definition";

export enum EditTeamTablesLanguage {
  OrgsTitle = "Organizations",
  UsersTitle = "Users",
  OrgsButton = "Manage Organizations",
  UsersButton = "Manage Users",
  NoOrganizations = "There are no organizations associated with the current team",
  NoUsers = "There are no users associated with the current team",
  NoResults = "No data available",
}

export interface EditTeamTablesProps extends BaseComponentProps {
  organizationTable: AdminOrganizationTableProps;
  usersTable: Pick<AdminUserTableProps, "items" | "loading" | "error" | "onError">;
  onEditOrganizations: () => void;
  onEditUsers: () => void;
}

export class EditTeamTablesIdModel extends IdModelBase {
  orgsTable: AdminOrganizationTableIdModel;
  editOrganizations: ButtonIdModel;
  teamsInfo: InfoIconIdModel;
  usersTable: AdminUserTableIdModel;
  editUser: ButtonIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(id)) {
      this.orgsTable = new AdminOrganizationTableIdModel(null);
      this.editOrganizations = new ButtonIdModel(null);
      this.teamsInfo = new InfoIconIdModel(null);
      this.usersTable = new AdminUserTableIdModel(null);
      this.editUser = new ButtonIdModel(null);

      return;
    }

    this.orgsTable = new AdminOrganizationTableIdModel(`${this.id}OrgTable`);
    this.editOrganizations = new ButtonIdModel(`${this.id}EditOrgButton`);
    this.teamsInfo = new InfoIconIdModel(`${this.id}Info`);
    this.usersTable = new AdminUserTableIdModel(`${this.id}UsersTable`);
    this.editUser = new ButtonIdModel(`${this.id}EditUsersButton`);
  }
}
