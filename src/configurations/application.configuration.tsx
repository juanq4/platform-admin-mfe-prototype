import { EngagementAnalyticsTier, Entitlement } from "@q4/platform-definitions";
import { TrialType } from "@q4/platform-sdk-definitions";

export enum Application {
  Admin = "Admin",
  CRM = "CRM",
  Desktop = "Desktop",
  Earnings = "Earnings",
  EngagementAnalytics = "EngagementAnalytics",
  EventManagement = "EventManagement",
  Home = "Home",
  Insight = "Insight",
  MeetingScheduler = "MeetingScheduler",
  Website = "Website",
}

export enum ApplicationName {
  Admin = "Admin",
  CRM = "CRM", // haven't officially launched
  Earnings = "Earnings",
  EngagementAnalytics = "Engagement Analytics",
  EventManagement = "Event Management", // haven't officially launched
  HomeApp = "Home",
  Insight = "Insight",
  MeetingScheduler = "Meeting Scheduler",
  Q4Desktop = "Desktop",
  Website = "Website Management",
  Workflow = "Workflow",
}

export enum DiscoverName {
  Website = "Website",
  Desktop = "IR CRM",
}

export interface IApplication {
  name: string;
  entitlements?: Entitlement[];
  elegibleTrials?: TrialType[];
}

export const Applications: Record<Application, IApplication> = {
  [Application.Admin]: {
    name: ApplicationName.Admin,
  },
  [Application.CRM]: {
    name: ApplicationName.CRM,
    entitlements: [Entitlement.Crm],
  },
  [Application.Desktop]: {
    name: ApplicationName.Q4Desktop,
    entitlements: [Entitlement.Desktop],
  },
  [Application.Earnings]: {
    name: ApplicationName.Earnings,
    entitlements: [Entitlement.Earnings],
  },
  [Application.EngagementAnalytics]: {
    name: ApplicationName.EngagementAnalytics,
    entitlements: [...Object.values(EngagementAnalyticsTier)],
    elegibleTrials: [TrialType.EA_BASE_TRIAL],
  },
  [Application.EventManagement]: {
    name: ApplicationName.EventManagement,
    entitlements: [Entitlement.Events],
  },
  [Application.Home]: {
    name: ApplicationName.HomeApp,
    entitlements: [],
  },
  [Application.Insight]: {
    name: ApplicationName.Insight,
    entitlements: [],
  },
  [Application.MeetingScheduler]: {
    name: ApplicationName.MeetingScheduler,
    entitlements: [Entitlement.MeetingScheduler],
  },
  [Application.Website]: {
    name: ApplicationName.Website,
    entitlements: [Entitlement.Studio],
  },
};
