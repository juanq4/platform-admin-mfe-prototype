import { EngagementAnalyticsTier, Entitlement, Permission } from "@q4/platform-definitions";
import React, { createContext, useMemo } from "react";
import type { SessionProviderProps, SessionState } from "./session.definition";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const SessionContext = createContext<SessionState>(undefined!);

export const SessionProvider = (props: SessionProviderProps): JSX.Element => {
  const entitlements = useMemo(
    () => ({
      hasEarnings: props.context.entitlements.includes(Entitlement.Earnings),
      hasEngagementAnalytics: props.context.entitlements.some((entitlement) =>
        entitlement.startsWith(EngagementAnalyticsTier.EngagementAnalytics),
      ),
      hasEngagementAnalyticsStarterTier: props.context.entitlements.includes(
        EngagementAnalyticsTier.EngagementAnalyticsStarter,
      ),
      hasEngagementAnalyticsBaseTier: props.context.entitlements.includes(EngagementAnalyticsTier.EngagementAnalyticsBase),
      hasWebRequests: props.context.entitlements.includes(Entitlement.Studio),
    }),
    [props.context.entitlements],
  );

  const permissions = useMemo(
    () => ({
      // TODO: Improve this, perhaps by automatically generating the key-values? These should not be explicitly set
      hasEarnings: props.permissions.includes(Permission.AccessEarnings),
      hasEngagementAnalytics: props.permissions.includes(Permission.EngagementAnalyticsAccessApp),
      hasEventManagement: props.permissions.includes(Permission.EventManagementAccessApp),
      hasWebRequests: props.permissions.includes(Permission.WebsiteManagementAccessApp),
    }),
    [props.permissions],
  );

  return (
    <SessionContext.Provider
      value={{ user: props.user, organization: props.context.organization, entitlements, permissions }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};
