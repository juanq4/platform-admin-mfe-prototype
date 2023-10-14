import type { OperationContext } from "urql";
import type { User } from "../../definitions";
import type { ApiResponse, MutationResponse, QueryPaginationVariablesBase } from "../useQuery/useQuery.definition";

export enum UserUpdateMessages {
  Failed = "Failed to update a user.",
  Success = "The user was updated successfully.",
}

export enum UserCreateMessages {
  Failed = "Failed to create a user.",
  Success = "The user was created successfully.",
}

export const UserGraphQuery = {
  User: `
    query ($id: String!, $userId: String!) {
      user (id: $id, userId: $userId) {
        id,
        firstName,
        lastName,
        friendlyName,
        email,
        title,
        roles,
        active,
        emailApp
      }
    }
  `,
  Users: `
    query ($organizationId: String, $pageSize: Int, $page: [String], $searchTerm: String) {
      users (organizationId: $organizationId, pageSize: $pageSize, page: $page, searchTerm: $searchTerm) {
        items {
          active,
          email,
          firstName,
          friendlyName,
          id,
          lastName,
          organizationId,
          roles,
          search
        }
      }
    }
  `,
};

export interface UsersQueryVariables extends QueryPaginationVariablesBase {
  organizationId?: User["organizationId"];
  page?: [id: string, organizationId: string];
}

export interface UserQueryVariables {
  id: User["organizationId"];
  userId: User["id"];
}

export interface UsersQueryResponse {
  users: { items: User[]; count?: number };
}

export interface UserQueryResponse {
  user: User;
}

export type UserSaveHookModel<T extends User> = (
  variables?: T,
  context?: Partial<OperationContext>,
) => Promise<ApiResponse<User>>;

export interface UserPostPayload extends User {
  id?: never;
}
export interface UserMutateResponse extends MutationResponse<User> {
  createUser?: User;
}
