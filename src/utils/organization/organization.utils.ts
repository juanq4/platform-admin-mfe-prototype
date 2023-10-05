import { arrayIndexFound, isEmpty, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { Permission } from "@q4/platform-definitions";
import { OrganizationCurrency, OrganizationType } from "@q4/platform-definitions";
import { generatePath, matchPath } from "react-router-dom";
import type { PermissionCondition } from "../../configurations";
import { AdminRoutePath, PermissionCollection, PermissionRule, RoutePathIdLabel } from "../../configurations";
import type {
  Organization,
  OrganizationCurrencyOption,
  OrganizationEditState,
  OrganizationTypeOption,
  Team,
} from "../../definitions";
import { SiteFilterActive, SiteFilterLive, SiteFilterStatus } from "../../definitions";
import type { OrganizationMutationModel } from "../../hooks";
import {
  OrganizationCurrencyLabel,
  OrganizationDetailsMode,
} from "../../modules/Admin/Organizations/Details/OrganizationDetails.definition";
import { hasRequiredPermission } from "../permission/permission.utils";
import { OrganizationsUserEditDefault as ViewDefaults } from "./organization.definition";

export function getOrganizationEditRoute(id: Organization["id"]): string {
  return generatePath(AdminRoutePath.OrganizationsEdit, { [RoutePathIdLabel.Id]: id });
}

export function getOrganizationViewRoute(id: Organization["id"]): string {
  return generatePath(AdminRoutePath.OrganizationsView, { [RoutePathIdLabel.Id]: id });
}

export function getOrganizationEditUserNewRoute(id: Organization["id"]): string {
  return generatePath(AdminRoutePath.OrganizationsUserCreate, { [RoutePathIdLabel.Id]: id });
}

export function getOrganizationEditLinkedOrganizationsRoute(id: Organization["id"]): string {
  return generatePath(AdminRoutePath.OrganizationsEditLinkedOrganizations, { [RoutePathIdLabel.Id]: id });
}

export function getOrganizationCreateTeamNewRoute(id: Organization["id"]): string {
  return generatePath(AdminRoutePath.OrganizationsTeamCreate, { [RoutePathIdLabel.Id]: id });
}

export function getOrganizationEditTeamRoute(id: Organization["id"], teamId: Team["id"]): string {
  return generatePath(AdminRoutePath.OrganizationsTeamEdit, {
    [RoutePathIdLabel.Id]: id,
    [RoutePathIdLabel.TeamId]: teamId,
  });
}

export function mapOrganizationIdentifiers(exchange: string, ticker: string): string[] {
  if (isNullOrWhiteSpace(exchange) || isNullOrWhiteSpace(ticker)) return null;
  return [`${ticker}.${exchange}`];
}

export function getOrganizationPayloadBase(organization: OrganizationEditState): OrganizationMutationModel {
  if (isEmpty(organization)) return null;
  const { exchange, ticker, studio, ...rest } = organization;
  const identifiers = mapOrganizationIdentifiers(exchange, ticker);
  const mutationModel: OrganizationMutationModel = { ...rest, identifiers };
  if (!isEmpty(studio?.subdomain)) mutationModel.studioSubdomain = studio.subdomain;
  return mutationModel;
}

export function getOrganizationsUserEditReturnUrl(
  organizationId: string,
  query: string,
  mode: OrganizationDetailsMode,
): string {
  const queryParams = new URLSearchParams(query);
  const returnUrl = queryParams.get(RoutePathIdLabel.ReturnUrl);
  if ((typeof returnUrl === "string" && !isNullOrWhiteSpace(returnUrl)) || !isEmpty(returnUrl)) {
    const expectedPath = matchPath(ViewDefaults.ReturnUrl.Users, returnUrl)?.path;
    if (!isNullOrWhiteSpace(expectedPath)) {
      return expectedPath;
    }
  }
  if (mode == OrganizationDetailsMode.Edit) {
    return getOrganizationEditRoute(organizationId);
  } else {
    return getOrganizationViewRoute(organizationId);
  }
}

export function capitalize(type: string): string {
  return `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
}

export function buildOrganizationTypeOptions(organizationDetailsMode?: OrganizationDetailsMode): OrganizationTypeOption[] {
  const typeOptions = [OrganizationType.AGENCY, OrganizationType.CORP];

  if (organizationDetailsMode !== OrganizationDetailsMode.Create) typeOptions.push(OrganizationType.ADMIN);

  return typeOptions.map((option) => ({
    label: capitalize(option),
    value: option,
  }));
}

export function buildOrganizationCurrencyOptions(): OrganizationCurrencyOption[] {
  const typeOptions = [...Object.values(OrganizationCurrency)];

  return typeOptions.map((option) => ({
    label: capitalize(OrganizationCurrencyLabel[option]),
    value: option,
  }));
}

export function orderOrganizationsAlphabetically(organizations: Organization[] = []): Organization[] {
  if (isEmpty(organizations)) return [];
  return [...organizations].sort((a, b) => a?.name.localeCompare(b?.name));
}

const hasOrgDetailsModePermission = (permissions: Permission[], permissionCollection: Permission[]) => {
  const permissionCondition: PermissionCondition = {
    rule: PermissionRule.And,
    permissions: permissionCollection,
  };
  return hasRequiredPermission(permissions, permissionCondition);
};

export const getOrganizationDetailsMode = (permissions: Permission[], organizationId: string): OrganizationDetailsMode => {
  if (hasOrgDetailsModePermission(permissions, PermissionCollection.CrudOrganizations)) {
    if (!isNullOrWhiteSpace(organizationId)) {
      return OrganizationDetailsMode.Edit;
    } else {
      return OrganizationDetailsMode.Create;
    }
  } else if (hasOrgDetailsModePermission(permissions, PermissionCollection.ReadOrganizations)) {
    return OrganizationDetailsMode.View;
  }

  return null;
};

export const getOrganizationLabelWithTicker = (organization: Organization): string => {
  if (isEmpty(organization)) return;

  const identifierStr = organization.identifiers?.[0] || "";
  const lastDotIdx = identifierStr.lastIndexOf(".");
  let ticker = null;

  if (arrayIndexFound(lastDotIdx)) {
    ticker = identifierStr.slice(0, lastDotIdx);
  }

  return [organization.name, ticker].filter(Boolean).join(" | ");
};

export const siteFilter = {
  active: SiteFilterActive.active,
  live: SiteFilterLive.all,
  status: SiteFilterStatus.all,
};
