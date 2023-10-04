import { IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { AdminUserFormIdModel } from "../../../../../../components/Admin/Forms";
import type { RoutePathIdLabel } from "../../../../../../configurations";
import type { Organization, User } from "../../../../../../definitions";

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
