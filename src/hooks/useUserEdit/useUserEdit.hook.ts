import { useApolloClient } from "@apollo/client";
import { isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { useEffect, useMemo, useRef, useState } from "react";
import type { AdminUserFormProps } from "../../components/Forms/User/AdminUserForm.definition";
import { useAdminData } from "../../contexts/data/data.hook";
import type { Organization } from "../../definitions/organization.definition";
import type { User } from "../../definitions/user.definition";
import { useUserQuery } from "../../hooks/useUser/useUser.hook";
import type { Exact, User as ApolloUser, UsersQuery } from "../../schemas/generated/graphql";
import { UsersDocument, useUpdateUserMutation } from "../../schemas/generated/graphql";
import { UserEditDefault } from "./useUserEdit.definition";
import type { UserEditHookModel } from "./useUserEdit.definition";

export const useUserEdit = (userId: User["id"], organizationId: Organization["id"]): UserEditHookModel => {
  const userState = useState(UserEditDefault.User);
  const [, setUser] = userState;
  const { cachedVariables } = useAdminData();

  const client = useApolloClient();

  const [updateUserMutation, { loading: saving }] = useUpdateUserMutation({});

  const pauseQuery = useRef(isNullOrWhiteSpace(userId) || isNullOrWhiteSpace(organizationId));
  const [{ fetching: loadingUserData, data: userData }] = useUserQuery({
    variables: { id: organizationId, userId: userId },
    pause: pauseQuery.current,
  });
  const { user: currentUser } = userData || {};

  const loading = useMemo(() => loadingUserData || saving, [loadingUserData, saving]);

  useEffect(() => {
    if (pauseQuery.current) return;
    setUser(currentUser);
  }, [currentUser, setUser]);

  async function handleSave(updated: Partial<ApolloUser>): ReturnType<AdminUserFormProps["onSave"]> {
    console.log("updated user: ", updated);

    try {
      await updateUserMutation({
        variables: {
          ...updated,
          emailApp: updated.emailApp ?? "platform",
          title: updated.title ?? "",
          friendlyName: updated.friendlyName ?? "",
        } as Exact<ApolloUser>,

        update() {
          const existingUsers: UsersQuery = client.cache.readQuery({
            query: UsersDocument,
            variables: { ...cachedVariables?.userList },
          });

          client.cache.writeQuery({
            query: UsersDocument,
            data: {
              users: {
                items: existingUsers?.users?.items.map((user) =>
                  user.id === updated.id
                    ? { ...updated, __typename: "User", search: user.search, title: user.friendlyName ?? "" }
                    : user,
                ),
              },
            },
          });
        },
      });

      return {
        success: true,
        message: "The user was updated successfully.",
      };
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message,
      };
    }
  }

  return {
    loading,
    userState,
    onSave: handleSave,
  };
};
