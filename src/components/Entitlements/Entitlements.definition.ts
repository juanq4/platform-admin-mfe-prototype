import type { BaseComponentProps } from "@q4/nimbus-ui";
import { ButtonIdModel, IdModelBase, isNullOrWhiteSpace, MessageIdModel, PopoverMenuIdModel } from "@q4/nimbus-ui";
import { BaseEntitlement } from "@q4/platform-definitions";
import type { Entitlement as StrictEntitlement } from "@q4/platform-definitions";
import type { Organization, OrganizationStudioDetails } from "../../../definitions/organization.definition";
import type {
  SitesByOrganizationResponse,
  SitesByOrgQueryVariables,
} from "../../../hooks/useOrganization/useOrganization.definition";
import type { LazyQueryResponse } from "../../../hooks/useQuery/useQuery.definition";
import { AdminStudioSitesTableIdModel } from "../Tables/sites/AdminStudioSitesTable.definition";
import { EngagementAnalyticsTierSelectorIdModel } from "./EngagementAnalyticsTierSelector/EngagementAnalyticsTierSelector.definition";

export enum EntitlementsClassName {
  Base = "organization-entitlements",
  Tabs = "organization-entitlements_tabs",
  Toolbar = "organization-entitlements_toolbar",
  DeleteButton = "organization-entitlements_delete-button",
}

export interface EntitlementsProps extends Omit<BaseComponentProps, "className" | "dataId"> {
  organizationId: Organization["id"];
  entitlements: Organization["entitlements"];
  orgSubdomain: OrganizationStudioDetails["subdomain"];
  sitesByOrgResp: LazyQueryResponse<SitesByOrganizationResponse, SitesByOrgQueryVariables>;
  getSitesByOrg: () => void;
  onOrgSubdomainChange: (value: string) => void;
  onAdd: (entitlement: Entitlement) => void;
  onRemove: (entitlement: Entitlement) => void;
}

export const BaseEntitlementKeys = Object.keys(BaseEntitlement) as (keyof typeof BaseEntitlement)[];

export class EntitlementsIdModel extends IdModelBase {
  // For all values in the Entitlement enum,
  // the following properties must be added to this idModel:
  //
  // (OrganizationEntitlement value as camelCase)Tab: string;
  // (OrganizationEntitlement value as camelCase)TabRemove: ButtonIdModel;
  // menuAdd(OrganizationEntitlement key): ButtonIdModel;

  studioTab: string;
  studioTabRemove: ButtonIdModel;
  engagementAnalyticsTab: string;
  engagementAnalyticsTabRemove: ButtonIdModel;
  engagementAnalyticsTierSelector: EngagementAnalyticsTierSelectorIdModel;
  desktopTab: string;
  desktopTabRemove: ButtonIdModel;
  eventsTab: string;
  eventsTabRemove: ButtonIdModel;
  menuButton: ButtonIdModel;
  menu: PopoverMenuIdModel;
  menuAddStudio: ButtonIdModel;
  menuAddEngagementAnalytics: ButtonIdModel;
  menuAddDesktop: ButtonIdModel;
  menuAddEvents: ButtonIdModel;
  menuAddMeetingScheduler: ButtonIdModel;
  menuAddEngagementAnalyticsStarter: ButtonIdModel;
  menuAddEngagementAnalyticsBase: ButtonIdModel;
  meetingSchedulerTab: string;
  meetingSchedulerTabRemove: ButtonIdModel;
  menuAddEarnings: ButtonIdModel;
  menuAddEarningsTabRemove: ButtonIdModel;
  removeMessage: MessageIdModel;
  removeMessageConfirm: ButtonIdModel;
  removeMessageCancel: ButtonIdModel;
  sitesTable: AdminStudioSitesTableIdModel;
  earningsTab: string;
  earningsTabRemove: ButtonIdModel;
  crmTab: string;
  menuAddCrm: ButtonIdModel;
  crmTabRemove: ButtonIdModel;
  menuAddExternalSiteTracking: ButtonIdModel;
  externalSiteTrackingTab: string;
  externalSiteTrackingTabRemove: ButtonIdModel;

  constructor(id: string, index?: React.Key, postfix?: string) {
    super(id, index, postfix);

    if (isNullOrWhiteSpace(this.id)) {
      this.studioTabRemove = new ButtonIdModel(null);
      this.engagementAnalyticsTabRemove = new ButtonIdModel(null);
      this.engagementAnalyticsTierSelector = new EngagementAnalyticsTierSelectorIdModel(null);
      this.desktopTabRemove = new ButtonIdModel(null);
      this.eventsTabRemove = new ButtonIdModel(null);
      this.menuButton = new ButtonIdModel(null);
      this.menu = new PopoverMenuIdModel(null);
      this.menuAddStudio = new ButtonIdModel(null);
      this.menuAddEngagementAnalytics = new ButtonIdModel(null);
      this.menuAddDesktop = new ButtonIdModel(null);
      this.menuAddEvents = new ButtonIdModel(null);
      this.menuAddMeetingScheduler = new ButtonIdModel(null);
      this.menuAddEngagementAnalyticsStarter = new ButtonIdModel(null);
      this.menuAddEngagementAnalyticsBase = new ButtonIdModel(null);
      this.menuAddCrm = new ButtonIdModel(null);
      this.menuAddEarnings = new ButtonIdModel(null);
      this.menuAddEarningsTabRemove = new ButtonIdModel(null);
      this.removeMessage = new MessageIdModel(null);
      this.removeMessageConfirm = new ButtonIdModel(null);
      this.removeMessageCancel = new ButtonIdModel(null);
      this.sitesTable = new AdminStudioSitesTableIdModel(null);
      this.menuAddEarnings = new ButtonIdModel(null);
      this.meetingSchedulerTabRemove = new ButtonIdModel(null);
      this.menuAddCrm = new ButtonIdModel(null);
      this.crmTabRemove = new ButtonIdModel(null);
      this.menuAddExternalSiteTracking = new ButtonIdModel(null);
      this.externalSiteTrackingTabRemove = new ButtonIdModel(null);

      return;
    }

    this.studioTab = `${this.id}StudioTab`;
    this.studioTabRemove = new ButtonIdModel(`${this.id}StudioTabRemoveButton`);
    this.engagementAnalyticsTab = `${this.id}EngagementAnalyticsTab`;
    this.engagementAnalyticsTabRemove = new ButtonIdModel(`${this.id}EngagementAnalyticsTabRemoveButton`);
    this.engagementAnalyticsTierSelector = new EngagementAnalyticsTierSelectorIdModel(
      `${this.id}EngagementAnalyticsTierSelector`,
    );
    this.desktopTab = `${this.id}DesktopTab`;
    this.desktopTabRemove = new ButtonIdModel(`${this.id}DesktopTabRemoveButton`);
    this.eventsTab = `${this.id}EventsTab`;
    this.eventsTabRemove = new ButtonIdModel(`${this.id}EventsTabRemoveButton`);
    this.menuButton = new ButtonIdModel(`${this.id}MenuButton`);
    this.menu = new PopoverMenuIdModel(`${this.id}PopoverMenu`);
    this.menuAddStudio = new ButtonIdModel(`${this.id}MenuAddStudioButton`);
    this.menuAddEngagementAnalytics = new ButtonIdModel(`${this.id}MenuAddEngagementAnalyticsButton`);
    this.menuAddDesktop = new ButtonIdModel(`${this.id}MenuAddDesktopButton`);
    this.menuAddEvents = new ButtonIdModel(`${this.id}menuAddEventsButton`);
    this.menuAddMeetingScheduler = new ButtonIdModel(`${this.id}menuAddMeetingSchedulerButton`);
    this.meetingSchedulerTab = `${this.id}MeetingSchedulerTab`;
    this.meetingSchedulerTabRemove = new ButtonIdModel(`${this.id}MeetingSchedulerTabRemoveButton`);
    this.menuAddEarnings = new ButtonIdModel(`${this.id}EarningsTab`);
    this.menuAddEarningsTabRemove = new ButtonIdModel(`${this.id}EarningsTabRemoveButton`);
    this.menuAddEngagementAnalyticsStarter = new ButtonIdModel(`${this.id}menuAddEngagementAnalyticsStarterButton`);
    this.menuAddEngagementAnalyticsBase = new ButtonIdModel(`${this.id}menuAddEngagementAnalyticsBaseButton`);
    this.menuAddCrm = new ButtonIdModel(`${this.id}menuAddCrmButton`);
    this.removeMessage = new MessageIdModel(`${this.id}RemoveMessage`);
    this.removeMessageConfirm = new ButtonIdModel(`${this.id}RemoveMessageConfirmButton`);
    this.removeMessageCancel = new ButtonIdModel(`${this.id}RemoveMessageCancelButton`);
    this.sitesTable = new AdminStudioSitesTableIdModel(`${this.id}SitesTable`);
    this.menuAddEarnings = new ButtonIdModel(`${this.id}menuAddEarningsButton`);
    this.earningsTab = `${this.id}EarningsTab`;
    this.earningsTabRemove = new ButtonIdModel(`${this.id}EarningsTabRemoveButton`);
    this.crmTab = `${this.id}CrmTab`;
    this.menuAddCrm = new ButtonIdModel(`${this.id}menuAddCrmButton`);
    this.crmTabRemove = new ButtonIdModel(`${this.id}CrmTabRemoveButton`);
    this.menuAddExternalSiteTracking = new ButtonIdModel(`${this.id}menuAddExternalSiteTrackingButton`);
    this.externalSiteTrackingTab = `${this.id}ExternalSiteTrackingTab`;
    this.externalSiteTrackingTabRemove = new ButtonIdModel(`${this.id}ExternalSiteTrackingTabRemoveButton`);
  }
}

export type Entitlement = StrictEntitlement | string;
