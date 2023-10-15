import type { Entitlement } from "@q4/platform-definitions";
import type { FeatureFlag } from "./feature.configuration";

// When adding a new Entitlement, one must
// - make the key Titlecase and the value snake-case
// - update the CamelCaseEntitlement enum below
// - update EntitlementLabel below
// - update the EntitlementsIdModel according to the comments in said model, otherwise the code will break
// - add a new element to the entitlementElements array in Entitlements.component.tsx

// export const Entitlements = Object.values(Entitlement);

export enum CamelCaseEntitlement {
  Studio = "studio",
  EngagementAnalytics = "engagementAnalytics",
  Desktop = "desktop",
  Events = "events",
  Earnings = "earnings",
}

export enum EntitlementLabel {
  Studio = "Studio",
  EngagementAnalytics = "Engagement Analytics",
  Desktop = "Desktop",
  Events = "Events",
  MeetingScheduler = "Meeting Scheduler",
  Earnings = "Earnings Management",
  EngagementAnalyticsStarter = "Engagement Analytics Starter",
  EngagementAnalyticsBase = "Engagement Analytics Base",
  Crm = "CRM",
  ExternalSiteTracking = "External Site Tracking",
}

export interface EntitlementCondition {
  featureFlag?: FeatureFlag; // assumes this is true
  entitlements: Entitlement[];
}
