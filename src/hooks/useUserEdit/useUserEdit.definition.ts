import type { Dispatch, SetStateAction } from "react";
import type { AdminUserFormProps } from "../../components/Forms/User/AdminUserForm.definition";
import { User } from "../../definitions/user.definition";

export interface UserEditHookModel {
  userState: [User, Dispatch<SetStateAction<User>>];
  loading: boolean;
  onSave: (user: User) => ReturnType<AdminUserFormProps["onSave"]>;
}

export const UserEditDefault = {
  User: new User(),
};
