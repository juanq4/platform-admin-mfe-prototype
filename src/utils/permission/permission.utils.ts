import { isEmpty, isNil } from "@q4/nimbus-ui";
import type { Permission } from "@q4/platform-definitions";
import type { PermissionCondition } from "../../configurations/access.configuration";
import { AccessRouteMap, PermissionDefault, PermissionRule } from "../../configurations/access.configuration";
import type { Features } from "../../configurations/feature.configuration";
import { hasRequiredEntitlement } from "../entitlement/entitlement.utils";
import { isFeatureTrue } from "../feature/feature.utils";

export function mapRoutesByPermission<TRoute, TPath extends string>(
  routes: TRoute[],
  permissions: Permission[],
  features: Partial<Features>,
  entitlements: string[] | undefined,
  getPath: (x: TRoute) => TPath | undefined,
): TRoute[] {
  if (isEmpty(routes) || typeof getPath !== "function") return routes || [];

  return routes.reduce((acc, route) => {
    const path = getPath(route);
    if (isEmpty(path)) return acc.concat(route);

    const accessConditions = AccessRouteMap[path as keyof typeof AccessRouteMap];
    if (isEmpty(accessConditions)) return acc.concat(route);

    const { entitlementCondition, featureFlag, permissionCondition } = accessConditions;

    const hasAccess = hasRequiredPermission(permissions, permissionCondition, features);
    const hasFeature = features?.[featureFlag] ?? true;
    const hasEntitlement = hasRequiredEntitlement(entitlements, features, entitlementCondition);
    if (!hasAccess || !hasFeature || !hasEntitlement) return acc;

    return acc.concat(route);
  }, []);
}

export function hasRequiredPermission(
  userPermissions: Permission[],
  condition: PermissionCondition,
  features?: Partial<Features>,
): boolean {
  if (isEmpty(condition?.permissions)) return true;

  const { rule, permissions, featureFlag } = condition;
  const defaultedRule = isNil(rule) ? PermissionDefault.PermissionRule : rule;

  // Current site logic is if the feature is false, ignore required permission logic and default to true
  if (!isFeatureTrue(features, featureFlag)) return true;

  if (defaultedRule === PermissionRule.Or) {
    return permissions.some((x) => !!userPermissions?.some((y) => x === y));
  } else if (defaultedRule === PermissionRule.Not) {
    return permissions.every((x) => !userPermissions?.some((y) => x === y));
  }

  return permissions.every((x) => !!userPermissions?.some((y) => x === y));
}
