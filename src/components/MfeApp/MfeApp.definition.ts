import type { MfeProps as RemoteMfeProps } from "@q4/platform-definitions";
import { Entitlement } from "@q4/platform-definitions";
import type { ComponentType, LazyExoticComponent } from "react";
import React from "react";

export enum MfeKey {
  Home = "home",
  Insight = "insight",
  Request = "request",
  EngagementAnalytics = "engagement-analytics",
  EngagementAnalyticsNotification = "engagement-analytics-notification",
  MeetingScheduler = "meeting-scheduler",
  CRM = "crm",
  Earnings = "earnings",
  EventManagementApp = "event-management-app",
  Workflow = "workflow",
}

/* eslint-disable import/no-unresolved, @typescript-eslint/ban-ts-comment */
export const Mfes: Record<MfeKey, LazyExoticComponent<ComponentType<RemoteMfeProps>>> = {
  // @ts-ignore
  [MfeKey.Home]: React.lazy(() => import("home/home")),
  // @ts-ignore
  [MfeKey.EngagementAnalytics]: React.lazy(() => import("engagement/engagement")),
  // @ts-ignore
  [MfeKey.EngagementAnalytics]: React.lazy(() => import("engagement/engagement")),
  // @ts-ignore
  [MfeKey.Insight]: React.lazy(() => import("insight/insight")),
  // @ts-ignore
  [MfeKey.Request]: React.lazy(() => import("request/request")),
  // @ts-ignore
  [MfeKey.MeetingScheduler]: React.lazy(() => import("meetingScheduler/scheduler")),
  // @ts-ignore
  [MfeKey.CRM]: React.lazy(() => import("meetingScheduler/crm")),
  // @ts-ignore
  [MfeKey.EngagementAnalyticsNotification]: React.lazy(() => import("engagement/notificationPreferences")),
  // @ts-ignore
  [MfeKey.Earnings]: React.lazy(() => import("earnings/earnings")),
  // @ts-ignore
  [MfeKey.EventManagementApp]: React.lazy(() => import("eventManagementApp/events")),
  // @ts-ignore
  [MfeKey.Workflow]: React.lazy(() => import("workflow/workflow")),
};
/* eslint-enable import/no-unresolved, @typescript-eslint/ban-ts-comment */

export const NotificationMfeKeys: Record<string, MfeKey> = {
  [Entitlement.EngagementAnalytics]: MfeKey.EngagementAnalyticsNotification,
  [Entitlement.EngagementAnalyticsBase]: MfeKey.EngagementAnalyticsNotification,
  [Entitlement.EngagementAnalyticsStarter]: MfeKey.EngagementAnalyticsNotification,
};

export type MfeProps = {
  id?: MfeKey;
};

export type MfeAppProps = {
  id?: MfeKey;
};
