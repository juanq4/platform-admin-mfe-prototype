import { gql } from "@apollo/client";

const userFragment = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    friendlyName
    email
    title
    roles
    active
    search
  }
`;

export const GET_USERS_QUERY = gql`
  ${userFragment}
  query UsersQuery($organizationId: String, $pageSize: Int, $page: [String], $searchTerm: String) {
    users(organizationId: $organizationId, pageSize: $pageSize, page: $page, searchTerm: $searchTerm) {
      items {
        ...UserFragment
      }
    }
  }
`;
