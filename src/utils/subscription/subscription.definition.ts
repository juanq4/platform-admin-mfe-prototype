import { AccessRouteMap, AdminRoutePath } from "../../configurations";

export const SubscriptionCondition = {
  Organizations: AccessRouteMap[AdminRoutePath.Organizations].permissionCondition,
  OrganizationsEdit: AccessRouteMap[AdminRoutePath.OrganizationsEdit].permissionCondition,
  Users: AccessRouteMap[AdminRoutePath.Users].permissionCondition,
  UsersEdit: AccessRouteMap[AdminRoutePath.UsersEdit].permissionCondition,
};
