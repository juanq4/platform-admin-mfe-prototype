import { isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { memo, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import type { AdminUserFormProps } from "../../../../components/Admin/Forms";
import { AdminUserForm, AdminUserFormMode } from "../../../../components/Admin/Forms";
import { RoutePathIdLabel } from "../../../../configurations";
import type { User } from "../../../../definitions";
import { useClaims, UserCreateMessages, useUserCreate } from "../../../../hooks";
import { getOrganizationDetailsMode, getOrganizationEditRoute, getOrganizationViewRoute } from "../../../../utils";
import { OrganizationDetailsMode } from "../../Organizations/Details/OrganizationDetails.definition";
import {
  OrganizationsUserCreateViewIdModel as ViewIdModel,
  OrganizationUserCreateDefaultUser,
} from "../../Organizations/Details/User/Create/OrganizationsUserCreate.definition";
import type { OrganizationsUserCreateParams } from "../../Organizations/Details/User/Create/OrganizationsUserCreate.definition";

const OrganizationsUserCreateBase = (): JSX.Element => {
  const params = useParams<OrganizationsUserCreateParams>();
  const history = useHistory();
  const [user, setUser] = useState(OrganizationUserCreateDefaultUser);
  const organizationId = useMemo(() => params[RoutePathIdLabel.Id], [params]);
  const [{ fetching: saving }, post] = useUserCreate();
  function handleSave(updated: User): ReturnType<AdminUserFormProps["onSave"]> {
    const { id, ...payload } = updated;
    return post(payload).then((response) => ({
      success: response?.success,
      message: response?.message ?? UserCreateMessages.Failed,
    }));
  }

  const claims = useClaims();

  function handleClose(): void {
    if (isNullOrWhiteSpace(organizationId)) return;

    if (getOrganizationDetailsMode(claims.permissions, organizationId) == OrganizationDetailsMode.Edit) {
      history.push(getOrganizationEditRoute(organizationId));
    } else {
      history.push(getOrganizationViewRoute(organizationId));
    }
  }

  return (
    <div id={ViewIdModel.id}>
      <AdminUserForm
        id={ViewIdModel.form.id}
        user={user}
        organizationId={organizationId}
        saving={saving}
        title="Add User"
        primaryActionLabel="ADD USER"
        mode={AdminUserFormMode.Create}
        showAddAnotherUser={true}
        onClose={handleClose}
        onChange={setUser}
        onSave={handleSave}
      />
    </div>
  );
};

export const OrganizationsUserCreate = memo(OrganizationsUserCreateBase);
