import { isNullOrWhiteSpace } from "@q4/nimbus-ui";
import React, { memo, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { RoutePathIdLabel } from "../../../../../../configurations/navigation.configuration";
import type { User } from "../../../../../../definitions/user.definition";
import { useClaims } from "../../../../../../hooks/useClaims/useClaims.hook";
import { UserCreateMessages } from "../../../../../../hooks/useUser/useUser.definition";
import { useUserCreate } from "../../../../../../hooks/useUser/useUser.hook";
import {
  getOrganizationDetailsMode,
  getOrganizationEditRoute,
  getOrganizationViewRoute,
} from "../../../../../../utils/organization/organization.utils";
import { AdminUserForm } from "../../../../../Admin/Forms/User/AdminUserForm.component";
import { AdminUserFormMode } from "../../../../../Admin/Forms/User/AdminUserForm.definition";
import type { AdminUserFormProps } from "../../../../../Admin/Forms/User/AdminUserForm.definition";
import { OrganizationDetailsMode } from "../../OrganizationDetails.definition";
import type { OrganizationsUserCreateParams } from "./OrganizationsUserCreate.definition";
import {
  OrganizationsUserCreateViewIdModel as ViewIdModel,
  OrganizationUserCreateDefaultUser,
} from "./OrganizationsUserCreate.definition";

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
