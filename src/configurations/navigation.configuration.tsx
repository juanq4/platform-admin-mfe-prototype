// import { env } from "../../config/env/env";
// import AdminIcon from "../assets/icons/admin.svg";
// import CRMIcon from "../assets/icons/crm.svg";
// import EventsIcon from "../assets/icons/events.svg";
// import StarIcon from "../assets/icons/star.svg";
// import { Application, ApplicationName, DiscoverName } from "./application.configuration";

export enum RoutePathIdLabel {
  Id = "id",
  UserId = "userId",
  ReturnUrl = "returnUrl",
  TeamId = "teamId",
}

export enum AppRoutePath {
  Default = "/",
  Home = "/home",
  PurchaseIntent = "/purchase-intent",
  Notifications = "/notifications",
  Insight = "/app/insight",
  Request = "/app/website",
  RequestSelect = "/app/website/select",
  RequestItem = "/app/website/details/:requestId/:jobId",
  RequestEdit = "/app/website/details/:requestId/:jobId/edit",
  RequestNew = "/app/website/new",
  RequestWebsiteMissing = "/app/website/missing",
  RequestMaintenance = "/app/website/maintenance",
  RequestSubmitted = "/app/website/submitted",
  EngagementAnalytics = "/app/engagement",
  EngagementAnalyticsInstitutions = "/app/engagement/institutions/:institutionId",
  MeetingScheduler = "/app/scheduler",
  CRM = "/app/crm",
  Earnings = "/app/earnings",
  EventManagement = "/app/events",
  Workflow = "/app/workflow",
}

export enum AdminRoutePath {
  Home = "/admin",
  Users = "/users",
  UsersCreate = "/users/edit",
  UsersEdit = "/users/edit/:userId",
  Organizations = "/organizations",
  OrganizationsCreate = "/organizations/add",
  OrganizationsEdit = "/organizations/edit/:id",
  OrganizationsView = "/organizations/view/:id",
  OrganizationsEditLinkedOrganizations = "/organizations/edit/:id/linked-organizations",
  OrganizationsUserCreate = "/organizations/edit/:id/user/add",
  OrganizationsUserEdit = "/organizations/edit/:id/user/edit/:userId",
  OrganizationsUserEditWithReturnUrl = "/organizations/edit/:id/user/edit/:userId/?returnUrl=:returnUrl",
  OrganizationsTeamCreate = "/organizations/edit/:id/team/add",
  OrganizationsTeamEdit = "/organizations/edit/:id/team/:teamId/edit",
}

export type RoutePathType = `${AdminRoutePath}`;

// export enum ApplicationTarget {
//   Admin = "admin-target",
//   CRM = "crm-target", // haven't officially launched
//   Earnings = "earnings-target",
//   EngagementAnalytics = "engagement-analytics-target",
//   EventManagement = "event-management-target", // haven't officially launched
//   HomeApp = "q4-home-target",
//   Insight = "insight-target",
//   MeetingScheduler = "meeting-scheduler-target",
//   Q4Desktop = "q4-desktop-target",
//   Website = "website-target",
//   Workflow = "workflow-target",
// }

// export const HomePageLink = {
//   id: Application.Home,
//   path: AppRoutePath.Home,
//   label: ApplicationName.HomeApp,
//   icon: "cci-website-4pt",
//   target: ApplicationTarget.HomeApp as string,
// };

// export const WebsiteLink = {
//   id: Application.Website,
//   path: AppRoutePath.Request,
//   label: ApplicationName.Website,
//   icon: "cci-website-4pt",
//   children: [
//     AppRoutePath.RequestItem,
//     AppRoutePath.RequestEdit,
//     AppRoutePath.RequestMaintenance,
//     AppRoutePath.RequestNew,
//     AppRoutePath.RequestSubmitted,
//     AppRoutePath.RequestSelect,
//     AppRoutePath.RequestWebsiteMissing,
//   ],
//   target: ApplicationTarget.Website as string,
//   websiteLink: "https://www.q4inc.com/products/investor-relations-websites/default.aspx",
//   discoverLabel: DiscoverName.Website,
//   description: "Communicate your unique investment value to investors",
//   activeCrossSelling: false,
// };

// export const EngagementAnalyticsLink = {
//   id: Application.EngagementAnalytics,
//   path: AppRoutePath.EngagementAnalytics,
//   label: ApplicationName.EngagementAnalytics,
//   icon: "cci-website-analytics-4pt",
//   children: [AppRoutePath.EngagementAnalyticsInstitutions],
//   target: ApplicationTarget.EngagementAnalytics as string,
//   websiteLink: "https://www.q4inc.com/products/engagement-analytics/default.aspx",
//   description: "Target the right investors and measure impact",
//   activeCrossSelling: false,
// };

// const calendarIcon = "q4i-calendar-add";

// export const MeetingSchedulerLink = {
//   id: Application.MeetingScheduler,
//   path: AppRoutePath.MeetingScheduler,
//   label: ApplicationName.MeetingScheduler,
//   icon: calendarIcon,
//   children: [AppRoutePath.MeetingScheduler],
//   target: ApplicationTarget.MeetingScheduler as string,
// };

// export const EarningsManagementLink = {
//   id: Application.Earnings,
//   path: AppRoutePath.Earnings,
//   label: ApplicationName.Earnings,
//   icon: calendarIcon,
//   children: [AppRoutePath.Earnings],
//   target: ApplicationTarget.Earnings as string,
// };

// export const AdminLink = {
//   id: Application.Admin,
//   path: AdminRoutePath.Home,
//   label: ApplicationName.Admin,
//   icon: <img src={AdminIcon} alt="Admin" style={{ height: 16 }} />,
//   children: [
//     AdminRoutePath.Organizations,
//     AdminRoutePath.OrganizationsCreate,
//     AdminRoutePath.OrganizationsEdit,
//     AdminRoutePath.OrganizationsUserCreate,
//     AdminRoutePath.OrganizationsUserEdit,
//     AdminRoutePath.OrganizationsUserEditWithReturnUrl,
//     AdminRoutePath.Users,
//     AdminRoutePath.UsersCreate,
//     AdminRoutePath.UsersEdit,
//   ],
//   target: ApplicationTarget.Admin as string,
// };

// export const Q4DesktopLink = {
//   id: Application.Desktop,
//   path: env.q4Desktop.url,
//   label: ApplicationName.Q4Desktop,
//   icon: "cci-desktop-4pt",
//   target: ApplicationTarget.Q4Desktop as string,
//   websiteLink: "https://www.q4inc.com/products/investor-relations-crm/default.aspx",
//   discoverLabel: DiscoverName.Desktop,
//   description: "Investor relationship management simplied",
//   activeCrossSelling: false,
// };

// export const CRMLink = {
//   id: Application.CRM,
//   path: AppRoutePath.CRM,
//   label: ApplicationName.CRM,
//   icon: <img src={CRMIcon} alt="CRM" style={{ height: 15 }} />,
//   target: ApplicationTarget.CRM as string,
// };

// export const InsightLink = {
//   id: Application.Insight,
//   path: AppRoutePath.Insight,
//   label: ApplicationName.Insight,
//   icon: <img src={StarIcon} alt="Insight" style={{ height: 16 }} />,
//   target: ApplicationTarget.Insight as string,
// };

// export const EventManagementAppLink = {
//   id: Application.EventManagement,
//   path: AppRoutePath.EventManagement,
//   label: ApplicationName.EventManagement,
//   children: [AppRoutePath.EventManagement],
//   icon: <img src={EventsIcon} alt="Events" style={{ height: 16 }} />,
//   target: ApplicationTarget.EventManagement as string,
// };
