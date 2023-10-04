import type { Dispatch, SetStateAction } from "react";
import type { AdminUserFormProps } from "../../../components";
import { User } from "../../../definitions";

export interface UserEditHookModel {
  userState: [User, Dispatch<SetStateAction<User>>];
  loading: boolean;
  onSave: (user: User) => ReturnType<AdminUserFormProps["onSave"]>;
}

export const UserEditDefault = {
  User: new User(),
};
