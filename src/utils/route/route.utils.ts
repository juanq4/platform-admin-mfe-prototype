import { Permission } from "@q4/platform-definitions";
import { generatePath } from "react-router";
import { OrganizationDetailsMode } from "../../components/AdminContent/Organizations/Details/OrganizationDetails.definition";
import { AccessRouteMap } from "../../configurations/access.configuration";
import { AdminRoutePath } from "../../configurations/navigation.configuration";
import { getOrganizationDetailsMode } from "../organization/organization.utils";
import { hasRequiredPermission } from "../permission/permission.utils";

export function getDefaultRedirectRoute(userPermissions: Permission[]): string {
  const { permissionCondition } = AccessRouteMap[AdminRoutePath.Organizations];

  if (hasRequiredPermission(userPermissions, permissionCondition)) {
    return AdminRoutePath.Home;
  }

  return "";
}

export function isRoute(route: string): boolean {
  return Object.values(AdminRoutePath).includes(route as AdminRoutePath);
}

export function getOrganizationRouteBasedOnPermission(permissions: Permission[], organizationId: string): string {
  const path =
    getOrganizationDetailsMode(permissions, organizationId) == OrganizationDetailsMode.Edit
      ? AdminRoutePath.OrganizationsEdit
      : AdminRoutePath.OrganizationsView;

  return generatePath(path, { id: organizationId });
}

export function getDefaultAdminRoute(permissions: Permission[]): string {
  return permissions?.includes(Permission.ReadOrgs) ? AdminRoutePath.Organizations : AdminRoutePath.Users;
}
