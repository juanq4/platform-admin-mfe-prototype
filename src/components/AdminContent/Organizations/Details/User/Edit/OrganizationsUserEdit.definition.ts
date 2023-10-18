import { IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { Organization } from "@q4/platform-definitions";
import type { RoutePathIdLabel } from "../../../../../../configurations/navigation.configuration";
import type { User } from "../../../../../../definitions/user.definition";
import { AdminUserFormIdModel } from "../../../../../Forms/User/AdminUserForm.definition";

export interface OrganizationsUserEditParams {
  [RoutePathIdLabel.Id]: Organization["id"];
  [RoutePathIdLabel.UserId]: User["id"];
}

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

export const OrganizationsUserEditViewIdModel = new ViewIdModel("OrganizationsUserEdit");
