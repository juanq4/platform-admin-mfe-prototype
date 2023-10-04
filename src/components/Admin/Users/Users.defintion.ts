import { ButtonIdModel, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { BaseComponentProps } from "@q4/nimbus-ui";
import { AdminUserTableIdModel } from "../Tables/user/AdminUserTable.definition";

export interface OrganizationUsersProps extends Omit<BaseComponentProps, "className" | "dataId"> {
  organizationId: string;
  onCreateUser: () => void;
}

export const UsersTableId = "organization-details-users-table";

export class OrganizationUsersIdModel extends AdminUserTableIdModel {
  placeholderAddUser: ButtonIdModel;
  addUser: ButtonIdModel;

  constructor(id: string, index?: React.Key, postfix?: string) {
    super(id, index, postfix);

    if (isNullOrWhiteSpace(this.id)) {
      this.placeholderAddUser = new ButtonIdModel(null);
      this.addUser = new ButtonIdModel(null);

      return;
    }
    this.placeholderAddUser = new ButtonIdModel(`${this.id}PlaceholderAddUser`);
    this.addUser = new ButtonIdModel(`${this.id}AddUser`);
  }
}
