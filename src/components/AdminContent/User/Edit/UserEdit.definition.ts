import { IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { AdminRoutePath } from "../../../../configurations/navigation.configuration";
import type { User } from "../../../../definitions/user.definition";
import { AdminUserFormIdModel } from "../../../Admin/Forms/User/AdminUserForm.definition";

export interface UserEditParams {
  userId: User["id"];
}

export const UserEditViewDefault = {
  ReturnPath: AdminRoutePath.Users,
};

class ViewIdModel extends IdModelBase {
  form: AdminUserFormIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(this.id)) {
      this.form = new AdminUserFormIdModel(null);
      return;
    }

    this.form = new AdminUserFormIdModel(`${this.id}Form`);
  }
}

export const UserEditViewIdModel = new ViewIdModel("UserEdit");
