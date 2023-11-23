import type { ApolloCache, DefaultContext, MutationTuple } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { Organization } from "../../../definitions/organization.definition";
import { OrganizationsBase } from "../../useOrganization/useOrganization.definition";

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
