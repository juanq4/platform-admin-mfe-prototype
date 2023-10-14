import type { Team } from "../../definitions";
import type { MutationHookModel, MutationResponse, QueryGetByIdVariablesBase } from "../useQuery";

export enum TeamCreateMessage {
  Failed = "Failed to create team.",
  Success = "The team was created successfully.",
}

export enum TeamEditMessage {
  Failed = "Failed to update team.",
  Success = "The team was updated successfully.",
}

export const TeamPostKey = "createAccessGroup";
export const TeamPutKey = "updateAccessGroup";

export const AccessGroup = `
  id
  name
  organizationId
  managedOrganizationIds
  userIds
`;

export const AccessGroupList = `
  items {
    ${AccessGroup}
  }
  count
`;

export const TeamsGraphQuery = {
  Team: `
    query ($id: String!, $organizationId: String) {
      accessGroup(id: $id, organizationId: $organizationId) {
        ${AccessGroup}
      }
    }
  `,
  Teams: `
     query ($pageSize: Int, $page: [String], $organizationId: String) {
      accessGroups(pageSize: $pageSize, page: $page, organizationId: $organizationId) {
        ${AccessGroupList}
      }
    }
  `,
  CreateTeam: `
    mutation (
     $name: String!,
     $organizationId: String,
     $managedOrganizationIds: [String!]!,
     $userIds: [String!]!,
    ) {
     ${TeamPostKey} (
        name: $name,
        organizationId: $organizationId,
        managedOrganizationIds: $managedOrganizationIds,
        userIds: $userIds,
     ){
        ${AccessGroup}
     }
    }
  `,
  UpdateTeam: `
  mutation (
     $id: String!
     $name: String!,
     $organizationId: String,
     $managedOrganizationIds: [String!]!,
     $userIds: [String!]!,
    ) {
     ${TeamPutKey} (
        id: $id,
        name: $name,
        organizationId: $organizationId,
        managedOrganizationIds: $managedOrganizationIds,
        userIds: $userIds,
     ){
        ${AccessGroup}
     }
    }
  `,
};

export interface QueryGetTeamByIdVariablesBase extends QueryGetByIdVariablesBase {
  organizationId: string;
}

export interface TeamQueryResponse {
  accessGroup: Team;
}

export interface TeamsQueryResponse {
  accessGroups: { items: Team[]; count?: number };
}

export type TeamSaveHookModel<T extends Team> = MutationHookModel<Team, T>;

export interface TeamPostResponse extends MutationResponse<Team> {
  [TeamPostKey]: Team;
}

export type TeamPostPayload = Omit<Team, "id">;

export type TeamPutPayload = Team;

export interface TeamPutResponse extends MutationResponse<Team> {
  [TeamPutKey]: Team;
}
