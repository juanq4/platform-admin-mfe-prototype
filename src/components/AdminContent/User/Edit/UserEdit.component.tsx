import React, { memo, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { RoutePathIdLabel } from "../../../../configurations/navigation.configuration";
// import { useClaims } from "../../../../hooks/useClaims/useClaims.hook";
import { useUserEdit } from "../../../../hooks/useUserEdit/useUserEdit.hook";
import { AdminUserForm } from "../../../Forms/User/AdminUserForm.component";
import { AdminUserFormMode } from "../../../Forms/User/AdminUserForm.definition";
import type { UserEditParams } from "./UserEdit.definition";
import { UserEditViewDefault, UserEditViewIdModel as ViewIdModel } from "./UserEdit.definition";

const UsersEditBase = (): JSX.Element => {
  const params = useParams<UserEditParams>();
  const userId = useMemo(() => params[RoutePathIdLabel.UserId], [params]);

  const history = useHistory();

  const { organizationId } = useClaims();

  const { loading, userState, onSave } = useUserEdit(userId, organizationId);
  const [user, setUser] = userState;

  function handleClose(): void {
    const route = UserEditViewDefault.ReturnPath;

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

export const UsersEdit = memo(UsersEditBase);
