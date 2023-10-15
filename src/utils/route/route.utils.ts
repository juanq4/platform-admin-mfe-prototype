import { Permission } from "@q4/platform-definitions";
import { AccessRouteMap } from "../../configurations/access.configuration";
import { AdminRoutePath, AppRoutePath } from "../../configurations/navigation.configuration";
import { hasRequiredPermission } from "../permission/permission.utils";

export function getDefaultRedirectRoute(userPermissions: Permission[]): string {
  const { permissionCondition } = AccessRouteMap[AdminRoutePath.Organizations];

  if (hasRequiredPermission(userPermissions, permissionCondition)) {
    return AdminRoutePath.Home;
  }

  return AppRoutePath.Default;
}

export function isRoute(route: string): boolean {
  return (
    Object.values(AppRoutePath).includes(route as AppRoutePath) ||
    Object.values(AdminRoutePath).includes(route as AdminRoutePath)
  );
}

// export function getRedirectPathWithinRoutes(location: string, routes: NavigationRoute[]): string | undefined {
//   for (const mfeRoutes of routes) {
//     let childRoutes = [mfeRoutes.path];
//     if (mfeRoutes.children) {
//       childRoutes = [...childRoutes, ...mfeRoutes.children];
//     }
//     const match = matchPath(location, {
//       path: childRoutes,
//       exact: true,
//       strict: false,
//     });
//     if (match) {
//       return mfeRoutes.path;
//     }
//   }
// }

// export function getOrganizationRouteBasedOnPermission(permissions: Permission[], organizationId: string): string {
//   const path =
//     getOrganizationDetailsMode(permissions, organizationId) == OrganizationDetailsMode.Edit
//       ? AdminRoutePath.OrganizationsEdit
//       : AdminRoutePath.OrganizationsView;

//   return generatePath(path, { id: organizationId });
// }

export function getDefaultAdminRoute(permissions: Permission[]): string {
  return permissions?.includes(Permission.ReadOrgs) ? AdminRoutePath.Organizations : AdminRoutePath.Users;
}
