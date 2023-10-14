import { gql } from "@apollo/client";

export const organizationFragment = gql`
  fragment OrganizationFragment on Organization {
    id
    name
    active
    isAdmin
    identifiers
    entitlements
    type
    region
    currency
  }
`;

export const GET_ORGANIZATION = gql`
  ${organizationFragment}
  query Organization($id: String!) {
    organization(id: $id) {
      ...OrganizationFragment
      studio {
        subdomain
      }
      managedBy
    }
  }
`;

export const GET_ORGANIZATIONS = gql`
  ${organizationFragment}
  query OrganizationsQuery(
    $pageSize: Int
    $page: [String]
    $searchTerm: String
    $managedBy: String
    $delegateOrganizationId: String
    $active: Boolean
  ) {
    organizations(
      pageSize: $pageSize
      page: $page
      searchTerm: $searchTerm
      managedBy: $managedBy
      delegateOrganizationId: $delegateOrganizationId
      active: $active
    ) {
      items {
        ...OrganizationFragment
      }
    }
  }
`;
