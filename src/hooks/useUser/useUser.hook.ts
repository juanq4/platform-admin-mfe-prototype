import { isNil } from "@q4/nimbus-ui";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useQuery, Context as GraphqlContext } from "urql";
import type { UseMutationState, UseQueryArgs, UseQueryResponse, OperationResult } from "urql";
import { User } from "../../definitions/user.definition";
import type { QueryHookProps, QueryPaginationVariablesBase } from "../useQuery/useQuery.definition";
import { QueryPaginationDefault } from "../useQuery/useQuery.definition";
import { useMutation } from "../useQuery/useQuery.hook";
import { getDefaultPageSize } from "../useQuery/useQuery.utils";
import { UserCreateMessages, UserGraphQuery, UserUpdateMessages } from "./useUser.definition";
import type {
  UserMutateResponse,
  UserPostPayload,
  UserSaveHookModel,
  UsersQueryResponse,
  UsersQueryVariables,
  UserQueryResponse,
  UserQueryVariables,
} from "./useUser.definition";

export const useUserQuery = (
  props: Omit<UseQueryArgs<UserQueryVariables, User>, "query">,
): UseQueryResponse<UserQueryResponse, UserQueryVariables> => {
  return useQuery<UserQueryResponse, UserQueryVariables>({
    query: UserGraphQuery.User,
    ...props,
  });
};

export const useUsersQuery = (
  props?: Omit<UseQueryArgs<UsersQueryVariables, User[]>, "query">,
): UseQueryResponse<UsersQueryResponse, UsersQueryVariables> => {
  const defaultedProps = useMemo(() => {
    const { variables } = props || {};
    const { pageSize: pageSizeVariable } = variables || {};

    const validPageSize = isNil(pageSizeVariable) || pageSizeVariable > QueryPaginationDefault.PageSize;
    const pageSize = validPageSize ? QueryPaginationDefault.PageSize : pageSizeVariable;

    return { ...props, variables: { ...variables, pageSize } };
  }, [props]);

  return useQuery<UsersQueryResponse, UsersQueryVariables>({
    query: UserGraphQuery.Users,
    ...defaultedProps,
  });
};

export const useUsersLazyQuery = (): [
  OperationResult<UsersQueryResponse, QueryPaginationVariablesBase> & { fetching: boolean },
  (props?: QueryHookProps<User[]>) => void,
] => {
  const { query } = useContext(GraphqlContext);

  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<OperationResult<UsersQueryResponse, QueryPaginationVariablesBase>>(null);

  const getUsers = useCallback(
    (props?: QueryHookProps<User[]>) => {
      setFetching((current) => {
        if (current) return current;
        setFetching(true);

        const { variables } = props || {};
        const pageSize = getDefaultPageSize(variables?.pageSize);

        query<UsersQueryResponse, QueryPaginationVariablesBase>(UserGraphQuery.Users, {
          ...variables,
          pageSize,
        })
          .toPromise()
          .then((response) => {
            setData(response);
          })
          .finally(() => {
            setFetching(false);
          });
      });
    },
    [query],
  );
  return [{ ...data, fetching }, getUsers];
};

export const useUserCreate = (): [
  UseMutationState<UserMutateResponse, UserPostPayload>,
  UserSaveHookModel<UserPostPayload>,
] => {
  const create = useRef(`
    mutation (
      $organizationId: String!,
      $email: String!,
      $firstName: String!,
      $lastName: String!,
      $active: Boolean,
      $friendlyName: String,
      $title: String,
      $roles: [String],
      $emailApp: String,
    ) {
      createUser(
        organizationId: $organizationId
        email: $email
        firstName: $firstName
        lastName: $lastName
        active: $active
        friendlyName: $friendlyName
        title: $title
        roles: $roles
        emailApp: $emailApp
      ) {
          id
        }
      }
  `);

  return useMutation(create.current, "createUser", UserCreateMessages.Failed, UserCreateMessages.Success, User);
};

export const useUserUpdate = (): [UseMutationState<UserMutateResponse, User>, UserSaveHookModel<User>] => {
  const update = useRef(`
    mutation (
      $id: String!
      $organizationId: String!,
      $email: String!,
      $firstName: String!,
      $lastName: String!,
      $active: Boolean,
      $friendlyName: String,
      $title: String,
      $roles: [String],
      $emailApp: String,
    ) {
      updateUser(
        id: $id
        organizationId: $organizationId
        email: $email
        firstName: $firstName
        lastName: $lastName
        active: $active
        friendlyName: $friendlyName
        title: $title
        roles: $roles
        emailApp: $emailApp
      ) {
          id
          organizationId
        }
      }
  `);
  return useMutation(update.current, "updateUser", UserUpdateMessages.Failed, UserUpdateMessages.Success, User);
};
