import type { ApolloCache, DefaultContext, MutationTuple } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { Organization } from "@q4/platform-definitions";
// // import { useClaims } from "../../useClaims/useClaims.hook";
import { OrganizationsBase } from "../../useOrganization/useOrganization.definition";

// export const GET_ORGANIZATION_QUERY = gql`
//   query Organization($organizationId: String) {
//     organization(id: $organizationId) {
//       id
//       name
//       entitlements
//       identifiers
//       q4SecurityId
//       region
//       currency
//     }
//   }
// `;

const LINK_ORGANIZATIONS = gql`
  mutation LinkOrganizations($managedOrganizationIds: [String!]!, $linkOrganizationsId: String!) {
    linkOrganizations(managedOrganizationIds: $managedOrganizationIds, id: $linkOrganizationsId) {
      ${OrganizationsBase}
      managedBy
    }
  }
`;

const UNLINK_ORGANIZATION = gql`
  mutation UnlinkOrganization($unlinkOrganizationId: String!, $delegateOrganizationId: String!) {
    unlinkOrganization(id: $unlinkOrganizationId, delegateOrganizationId: $delegateOrganizationId) {
      id
    }
  }
`;

// export const useOrganization = (): QueryResult<{ organization: Organization }, { organizationId: string }> => {
//   const { organizationId } = useClaims();

//   return useQuery(GET_ORGANIZATION_QUERY, {
//     skip: !organizationId,
//     variables: { organizationId },
//   });
// };

// export const useCurrentOrganization = (): QueryResult<{ organization: Organization }, { organizationId: string }> => {
//   const { newClaimOrganizationId: organizationId } = useClaims();

//   return useQuery(GET_ORGANIZATION_QUERY, {
//     skip: !organizationId,
//     variables: { organizationId },
//   });
// };

export const useLinkOrganizations = (): MutationTuple<
  { linkOrganizations: Organization[] },
  { linkOrganizationsId: Organization["id"]; managedOrganizationIds: Organization["id"][] },
  DefaultContext,
  ApolloCache<unknown>
> => {
  return useMutation(LINK_ORGANIZATIONS);
};

export const useUnlinkOrganizations = (): MutationTuple<
  { managedByOrganizationdId: Organization["id"] },
  { unlinkOrganizationId: Organization["id"]; delegateOrganizationId: Organization["id"] },
  DefaultContext,
  ApolloCache<unknown>
> => {
  return useMutation(UNLINK_ORGANIZATION);
};
