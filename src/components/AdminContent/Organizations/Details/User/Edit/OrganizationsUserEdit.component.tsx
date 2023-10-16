import { isNullOrWhiteSpace } from "@q4/nimbus-ui";
import React, { memo, useMemo } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { RoutePathIdLabel } from "../../../../../../configurations/navigation.configuration";
import { useSession } from "../../../../../../contexts/session/useSession.hook";
import { useUserEdit } from "../../../../../../hooks/useUserEdit/useUserEdit.hook";
import {
  getOrganizationsUserEditReturnUrl,
  getOrganizationDetailsMode,
} from "../../../../../../utils/organization/organization.utils";
import { AdminUserForm } from "../../../../../Forms/User/AdminUserForm.component";
import { AdminUserFormMode } from "../../../../../Forms/User/AdminUserForm.definition";
import type { OrganizationsUserEditParams } from "./OrganizationsUserEdit.definition";
import { OrganizationsUserEditViewIdModel as ViewIdModel } from "./OrganizationsUserEdit.definition";

const OrganizationsUserEditBase = (): JSX.Element => {
  const params = useParams<OrganizationsUserEditParams>();
  const history = useHistory();
  const location = useLocation();
  const session = useSession();
  const organizationId = useMemo(() => params[RoutePathIdLabel.Id], [params]);
  const userId = useMemo(() => params[RoutePathIdLabel.UserId], [params]);
  const { loading, userState, onSave } = useUserEdit(userId, organizationId);
  const [user, setUser] = userState;

  function handleClose(): void {
    if (isNullOrWhiteSpace(organizationId)) return;

    const route = getOrganizationsUserEditReturnUrl(
      organizationId,
      location.search,
      getOrganizationDetailsMode(session.permissions, organizationId),
    );
    history.push(route);
  }

  return (
    <div id={ViewIdModel.id}>
      <AdminUserForm
        id={ViewIdModel.form.id}
        user={user}
        organizationId={organizationId}
        saving={loading}
        loading={loading}
        title="Update User"
        primaryActionLabel="UPDATE USER"
        mode={AdminUserFormMode.Edit}
        showAddAnotherUser={false}
        onClose={handleClose}
        onChange={setUser}
        onSave={onSave}
      />
    </div>
  );
};

export const OrganizationsUserEdit = memo(OrganizationsUserEditBase);
