import { ButtonIdModel, IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { AdminUserTableIdModel } from "../../../../components/Admin/Tables/user/AdminUserTable.definition";
import { AccessRouteMap } from "../../../../configurations/access.configuration";
import { AdminRoutePath } from "../../../../configurations/navigation.configuration";

export const AdminUserViewCreateRoute = AdminRoutePath.UsersCreate;

export const AdminOrganizationCondition = AccessRouteMap[AdminRoutePath.Organizations].permissionCondition;

export enum AdminUsersViewClassName {
  Base = "admin-users",
}

class AdminUsersIdModel extends IdModelBase {
  create: ButtonIdModel;
  placeholderCreate: ButtonIdModel;
  table: AdminUserTableIdModel;

  constructor(id: string) {
    super(id);
    if (isNullOrWhiteSpace(this.id)) {
      this.create = new ButtonIdModel(null);
      this.placeholderCreate = new ButtonIdModel(null);
      this.table = new AdminUserTableIdModel(null);
      return;
    }

    this.create = new ButtonIdModel(`${this.id}AddNewButton`);
    this.placeholderCreate = new ButtonIdModel(`${this.id}PlaceholderCreateButton`);
    this.table = new AdminUserTableIdModel(`${this.id}Table`);
  }
}

const ViewId = "AdminUsers";
export const AdminUsersViewIdModel = new AdminUsersIdModel(ViewId);
