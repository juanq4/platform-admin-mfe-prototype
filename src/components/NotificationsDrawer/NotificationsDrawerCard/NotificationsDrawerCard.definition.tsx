import CRMIcon from "../../../assets/icons/notifications/crm.svg";
import EarningsManagementIcon from "../../../assets/icons/notifications/earnings-management.svg";
import EngagementAnalyticsIcon from "../../../assets/icons/notifications/engagement-analytics.svg";
import EventManagementIcon from "../../../assets/icons/notifications/event-management.svg";
import MeetingSchedulerIcon from "../../../assets/icons/notifications/meeting-scheduler.svg";
import WebsiteManagementIcon from "../../../assets/icons/notifications/website-management.svg";
import { ApplicationTarget } from "../../../configurations";
import { ApplicationName } from "../../../configurations/application.configuration";
import type { Notification } from "../../../schemas/generated/graphql";

export type NotificationsDrawerCardProps = Pick<
  Notification,
  "id" | "source" | "title" | "message" | "sentAt" | "link" | "readAt"
> & {
  onReadStateChange: (notificationId: string, isRead: boolean) => void;
};

export const NotificationsDrawerCardApplications = {
  "crm.platform.eds": {
    name: ApplicationName.CRM,
    icon: CRMIcon,
    target: ApplicationTarget.CRM,
  },
  "earnings.platform.eds": {
    name: ApplicationName.Earnings,
    icon: EarningsManagementIcon,
    target: ApplicationTarget.Earnings,
  },
  "engagement.platform.eds": {
    name: ApplicationName.EngagementAnalytics,
    icon: EngagementAnalyticsIcon,
    target: ApplicationTarget.EngagementAnalytics,
  },
  "events.platform.eds": {
    name: ApplicationName.EventManagement,
    icon: EventManagementIcon,
    target: ApplicationTarget.EventManagement,
  },
  "scheduler.platform.eds": {
    name: ApplicationName.MeetingScheduler,
    icon: MeetingSchedulerIcon,
    target: ApplicationTarget.MeetingScheduler,
  },
  "website.platform.eds": {
    name: ApplicationName.Website,
    icon: WebsiteManagementIcon,
    target: ApplicationTarget.Website,
  },
};
