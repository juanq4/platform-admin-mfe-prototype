import { IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { AdminUserFormIdModel } from "../../../../../../components/Admin/Forms";
import { AdminRoutePath } from "../../../../../../configurations";
import { User } from "../../../../../../definitions";
import type { Organization } from "../../../../../../definitions";

export const OrganizationUserCreateReturnRoute = AdminRoutePath.OrganizationsUserCreate;
export const OrganizationUserCreateDefaultUser = new User();

export interface OrganizationsUserCreateParams {
  id: Organization["id"];
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

export const OrganizationsUserCreateViewIdModel = new ViewIdModel("OrganizationsUserCreate");
