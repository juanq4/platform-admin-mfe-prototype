import type { OperationResult } from "urql";
import type { Organization, OrganizationEditState } from "../../definitions";
import type { OrganizationSiteFilter, StudioApiResponse } from "../../services";
import type { MutationHookModel, MutationResponse, QueryPaginationVariablesBase } from "../useQuery/useQuery.definition";

export interface OrganizationsQueryVariables extends QueryPaginationVariablesBase {
  page?: [id: string];
}

export interface SitesByOrgQueryVariables {
  organizationId: Organization["id"];
  siteFilter: OrganizationSiteFilter;
}

export type SitesItems = Pick<StudioApiResponse, "subdomain" | "siteName">;
export interface SitesByOrganizationResponse {
  organizationSites: {
    items: SitesItems[];
    count: number;
  };
}

export enum OrganizationCreateMessage {
  Failed = "Failed to create organization.",
  Success = "The organization was created successfully.",
}

export enum OrganizationEditMessage {
  Failed = "Failed to update organization.",
  Success = "The organization was updated successfully.",
  EntitlementAlreadyAdded = "This entitlement has already been added to the organization.",
}

export enum OrganizationsLinkMessage {
  Failed = "Failed to link organizations.",
  Success = "Organizations were successfully linked.",
}

export enum OrganizationUnlinkMessage {
  Failed = "Unable to remove linked organization. Please try again",
  Success = "Linked Organization removed successfully.",
}

export const OrganizationPostKey = "createOrganization";

export const OrganizationPutKey = "updateOrganization";

export const OrganizationsBase = `
  id
  name
  active
  isAdmin
  identifiers
  entitlements
  type
`;

export const OrganizationGraphQuery = {
  Organization: `
    query ($id: String!) {
      organization (id: $id) {
        id,
        name,
        active,
        identifiers,
        entitlements,
        isAdmin,
        type,
        studio {
          subdomain
        },
        managedBy,
        delegateOrganizationIds,
        q4SecurityId
        region
        currency
      }
    }
  `,
  Organizations: `
    query ($pageSize: Int, $page: [String], $searchTerm: String, $delegateOrganizationId: String, $active: Boolean) {
      organizations (pageSize: $pageSize, page: $page, searchTerm: $searchTerm, delegateOrganizationId: $delegateOrganizationId, active: $active) {
        items {
          ${OrganizationsBase}
        }
      }
    }
  `,
  OrganizationsWithManagedBy: `
  query ($type: String, $active: Boolean) {
    organizations (type: $type, active: $active) {
      items {
        ${OrganizationsBase}
        managedBy,
        delegateOrganizationIds
      }
    }
  }
`,
  UpdateOrganization: `
    mutation (
      $id: String!,
      $name: String!,
      $active: Boolean,
      $identifiers: [String],
      $entitlements: [String],
      $studioSubdomain: String,
      $q4SecurityId: String,
      $region: String
      $currency: String
    ) {
      ${OrganizationPutKey}(
        id: $id
        name: $name
        active: $active
        identifiers: $identifiers
        entitlements: $entitlements
        studioSubdomain: $studioSubdomain
        q4SecurityId: $q4SecurityId
        region: $region
        currency: $currency
      ) {
        id
      }
    }
  `,
  CreateOrganization: `
    mutation (
      $name: String!,
      $active: Boolean,
      $identifiers: [String],
      $entitlements: [String],
      $studioSubdomain: String,
      $type: OrganizationType,
      $q4SecurityId: String,
      $region: String
      $currency: String
    ) {
      ${OrganizationPostKey}(
        name: $name
        active: $active
        identifiers: $identifiers
        entitlements: $entitlements
        studioSubdomain: $studioSubdomain
        type: $type
        q4SecurityId: $q4SecurityId
        region: $region
        currency: $currency
      ) {
        id
      }
    }
  `,
  SitesByOrganization: `
    query ($organizationId: String!, $siteFilter: OrganizationSiteFilterInput) {
      organizationSites(organizationId: $organizationId, siteFilter: $siteFilter) {
        items {
          subdomain
          siteName
        }
        count
      }
    }
  `,
};

export type OrganizationsLazyQueryResponse = OperationResult<OrganizationsQueryResponse, QueryPaginationVariablesBase>;

export interface OrganizationsQueryResponse {
  organizations: { items: Organization[]; count?: number };
}

export interface OrganizationQueryResponse {
  organization: Organization;
}

export type OrganizationSaveHookModel<T extends Organization> = MutationHookModel<Organization, T>;

export interface OrganizationMutationModel extends Omit<Organization, "studio"> {
  studioSubdomain?: string;
}

export interface OrganizationPostPayload extends OrganizationEditState {
  id?: never;
}

export interface OrganizationPostResponse extends MutationResponse<Organization> {
  [OrganizationPostKey]: Organization;
}

export type OrganizationPutPayload = OrganizationEditState;

export interface OrganizationPutResponse extends MutationResponse<Organization> {
  [OrganizationPutKey]: Organization;
}
