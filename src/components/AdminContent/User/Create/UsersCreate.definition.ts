import { IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { AdminRoutePath } from "../../../../configurations/navigation.configuration";
import { User } from "../../../../definitions/user.definition";
import { AdminUserFormIdModel } from "../../../Forms/User/AdminUserForm.definition";

export const UsersCreateReturnRoute = AdminRoutePath.Users;
export const UsersCreateDefaultUser = new User();

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

export const UsersCreateViewIdModel = new ViewIdModel("UsersCreate");
