import type { MfeProps, Organization } from "@q4/platform-definitions";
import type { ReactNode } from "react";

export interface SessionState {
  user: MfeProps["user"];
  organization: Organization;
  entitlements: {
    hasEarnings: boolean;
    hasEngagementAnalytics: boolean;
    hasEngagementAnalyticsStarterTier: boolean;
    hasEngagementAnalyticsBaseTier: boolean;
    hasWebRequests: boolean;
  };
  permissions: {
    hasEarnings: boolean;
    hasEngagementAnalytics: boolean;
    hasEventManagement: boolean;
    hasWebRequests: boolean;
  };
}

export interface SessionProviderProps extends MfeProps {
  children: ReactNode;
}
