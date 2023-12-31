import { memo, useState } from "react";
import { useHistory } from "react-router-dom";
import type { User } from "../../../../definitions/user.definition";
import { useClaims } from "../../../../hooks/useClaims/useClaims.hook";
import { UserCreateMessages } from "../../../../hooks/useUser/useUser.definition";
import { useUserCreate } from "../../../../hooks/useUser/useUser.hook";
import { AdminUserForm } from "../../../Forms/User/AdminUserForm.component";
import type { AdminUserFormProps } from "../../../Forms/User/AdminUserForm.definition";
import { AdminUserFormMode } from "../../../Forms/User/AdminUserForm.definition";
import {
  UsersCreateDefaultUser,
  UsersCreateReturnRoute,
  UsersCreateViewIdModel as ViewIdModel,
} from "./UsersCreate.definition";

const UsersCreateBase = (): JSX.Element => {
  const [user, setUser] = useState(UsersCreateDefaultUser);

  const history = useHistory();
  const claims = useClaims();
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
        organizationId={claims.organizationId}
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
