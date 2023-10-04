import { isEmpty } from "@q4/nimbus-ui";
import { Entitlement, EngagementAnalyticsTier } from "@q4/platform-definitions";
import type { EntitlementCondition, Features } from "../../configurations";
import { isFeatureTrue } from "../feature";

export function hasRequiredEntitlement(
  entitlements: string[],
  features: Partial<Features>,
  condition: EntitlementCondition,
): boolean {
  if (isEmpty(condition?.entitlements)) return true;

  const { entitlements: requiredEntitlements, featureFlag } = condition;

  // Current site logic is if the feature is false, ignore required permission logic and default to true
  if (!isFeatureTrue(features, featureFlag)) return true;

  if (isEmpty(entitlements)) return false;

  return requiredEntitlements.every((x) => entitlements.some((y) => x === y));
}

export const isEngagementAnalyticsEntitlement = (entitlement: Entitlement | string): boolean => {
  return Object.values(EngagementAnalyticsTier).includes(entitlement as EngagementAnalyticsTier);
};

export function hasEngagementAnalyticsEntitlement(entitlements: Entitlement[] | string[]): boolean {
  if (!entitlements) return false;

  return entitlements.some(isEngagementAnalyticsEntitlement);
}

export const checkIfEntitlementExists = (
  entitlements: Entitlement[] | string[],
  entitlement: Entitlement | string,
): boolean => {
  if (!entitlements || !entitlement) return false;

  // EA was split up into multiple tiers of entitlements, thus
  // If EA entitlement is being evaluated, check if the entitlements arg contains any other EA entitlement tier
  if (isEngagementAnalyticsEntitlement(entitlement)) {
    return hasEngagementAnalyticsEntitlement(entitlements);
  }

  return entitlements.some((currentEntitlement) => currentEntitlement === entitlement);
};

export const filterEntitlement = (entitlements: Entitlement[] | string[], entitlement: Entitlement | string): string[] => {
  if (!entitlements || !entitlement) return [];

  // EA was split up into multiple tiers of entitlements, thus
  // If EA entitlement, remove all current EA entitlement tiers
  if (isEngagementAnalyticsEntitlement(entitlement)) {
    return entitlements.filter((currentEntitlement) => !isEngagementAnalyticsEntitlement(currentEntitlement));
  }

  return entitlements.filter((currentEntitlement) => currentEntitlement !== entitlement);
};

export function getDefaultEntitlementSelection(entitlement: Entitlement): Entitlement {
  return isEngagementAnalyticsEntitlement(entitlement) ? Entitlement.EngagementAnalyticsStarter : entitlement;
}

export function getAppEntitlementInUse(
  userEntitlements: Entitlement[],
  appEntitlements: Entitlement[] = [],
): Entitlement | null {
  return appEntitlements.find((appEntitlement) => userEntitlements.includes(appEntitlement)) ?? null;
}
