import { gql } from "@apollo/client";

const accessGroupFragment = gql`
  fragment AccessGroupFragment on AccessGroup {
    id
    name
    organizationId
    managedOrganizationIds
    userIds
  }
`;

export const GET_TEAM = gql`
  ${accessGroupFragment}
  query TeamQuery($id: String!, $organizationId: String) {
    accessGroup(id: $id, organizationId: $organizationId) {
      ...AccessGroupFragment
    }
  }
`;

export const GET_TEAMS = gql`
  ${accessGroupFragment}
  query TeamsQuery($pageSize: Int, $page: [String], $organizationId: String) {
    accessGroups(pageSize: $pageSize, page: $page, organizationId: $organizationId) {
      items {
        ...AccessGroupFragment
      }
      count
    }
  }
`;

export const CREATE_TEAM = gql`
  ${accessGroupFragment}
  mutation CreateAccessGroup(
    $name: String!
    $organizationId: String
    $managedOrganizationIds: [String!]!
    $userIds: [String!]!
  ) {
    createAccessGroup(
      name: $name
      organizationId: $organizationId
      managedOrganizationIds: $managedOrganizationIds
      userIds: $userIds
    ) {
      ...AccessGroupFragment
    }
  }
`;

export const UPDATE_TEAM = gql`
  ${accessGroupFragment}
  mutation UpdateTeamMutation(
    $id: String!
    $name: String
    $organizationId: String
    $managedOrganizationIds: [String]
    $userIds: [String]
    $managedOrgDeltas: AccessGroupUpdateDeltas
    $userDeltas: AccessGroupUpdateDeltas
  ) {
    updateAccessGroup(
      id: $id
      name: $name
      organizationId: $organizationId
      managedOrganizationIds: $managedOrganizationIds
      userIds: $userIds
      managedOrgDeltas: $managedOrgDeltas
      userDeltas: $userDeltas
    ) {
      ...AccessGroupFragment
    }
  }
`;

export const DELETE_TEAM = gql`
  mutation ($id: String!, $organizationId: String) {
    deleteAccessGroup(id: $id, organizationId: $organizationId)
  }
`;
