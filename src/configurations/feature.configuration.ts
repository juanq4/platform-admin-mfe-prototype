import type { LDFlagSet } from "launchdarkly-js-sdk-common";

// @jm fixme
export enum FeatureFlag {
  AdminClientAccountAccess = "admin-client-account-access",
  AdminUserManagement = "admin-user-management",
  AgencyTeams = "cc-admin-agency-teams",
  CRM = "crm",
  CrossSellingLinks = "cc-cross-selling-links",
  DesktopLauncher = "cc-desktop-launcher",
  EarningsManagement = "platform-earnings-mfe",
  EventManagementApp = "ema-mfe",
  Home = "home",
  Insight = "insight",
  MeetingScheduler = "meeting-scheduler",
  NotificationPreferences = "notification-preferences",
  Notifications = "notifications",
  PlatformNav = "platform-nav",
  Workflow = "platform-workflow-mfe",
  PLGv2 = "plg-v2-0",
}

export interface CrossSellingLink {
  label: string;
  url: string;
}

type FlagVariation = {
  isEnabled: boolean;
};

export interface Features extends LDFlagSet {
  [FeatureFlag.AdminClientAccountAccess]: boolean;
  [FeatureFlag.AdminUserManagement]: boolean;
  [FeatureFlag.AgencyTeams]: boolean;
  [FeatureFlag.CRM]: boolean;
  [FeatureFlag.CrossSellingLinks]: CrossSellingLink[];
  [FeatureFlag.DesktopLauncher]: FlagVariation;
  [FeatureFlag.EarningsManagement]: boolean;
  [FeatureFlag.EventManagementApp]: Record<"isEnabled", boolean>;
  [FeatureFlag.Home]: boolean;
  [FeatureFlag.Insight]: boolean;
  [FeatureFlag.MeetingScheduler]: boolean;
  [FeatureFlag.NotificationPreferences]: boolean;
  [FeatureFlag.Notifications]: FlagVariation;
  [FeatureFlag.PlatformNav]: boolean;
  [FeatureFlag.Workflow]: boolean;
  [FeatureFlag.PLGv2]: boolean;
}
