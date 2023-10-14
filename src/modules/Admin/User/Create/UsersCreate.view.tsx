import type { User } from "@auth0/auth0-react";
import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { AdminUserForm } from "../../../../components/Admin/Forms/User/AdminUserForm.component";
import type { AdminUserFormProps } from "../../../../components/Admin/Forms/User/AdminUserForm.definition";
import { AdminUserFormMode } from "../../../../components/Admin/Forms/User/AdminUserForm.definition";
import { useClaims } from "../../../../hooks/useClaims/useClaims.hook";
import { UserCreateMessages } from "../../../../hooks/useUser/useUser.definition";
import { useUserCreate } from "../../../../hooks/useUser/useUser.hook";
import {
  UsersCreateDefaultUser,
  UsersCreateReturnRoute,
  UsersCreateViewIdModel as ViewIdModel,
} from "./UsersCreate.definition";

const UsersCreateBase = (): JSX.Element => {
  const history = useHistory();
  const [user, setUser] = useState(UsersCreateDefaultUser);

  const { organizationId } = useClaims();

  const [{ fetching: saving }, post] = useUserCreate();

  function handleSave(updated: User): ReturnType<AdminUserFormProps["onSave"]> {
    const { id, ...payload } = updated;
    return post(payload).then((response) => ({
      success: response?.success,
      message: response?.message ?? UserCreateMessages.Failed,
    }));
  }

  function handleClose(): void {
    history.push(UsersCreateReturnRoute);
  }

  return (
    <div id={ViewIdModel.id}>
      <AdminUserForm
        id={ViewIdModel.form.id}
        user={user}
        saving={saving}
        organizationId={organizationId}
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

export const UsersCreate = memo(UsersCreateBase);
