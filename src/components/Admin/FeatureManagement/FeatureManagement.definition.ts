import { ButtonIdModel, IdModelBase, isNullOrWhiteSpace, ToggleButtonsIdModel } from "@q4/nimbus-ui";
import type { BaseComponentProps } from "@q4/nimbus-ui";
import type { OrganizationEditState } from "../../../definitions/organization.definition";
import type {
  SitesByOrganizationResponse,
  SitesByOrgQueryVariables,
} from "../../../hooks/useOrganization/useOrganization.definition";
import type { LazyQueryResponse } from "../../../hooks/useQuery/useQuery.definition";
import type { Entitlement } from "../Entitlements/Entitlements.definition";
import { EntitlementsIdModel } from "../Entitlements/Entitlements.definition";
import { OrganizationsIdModel } from "../LinkedOrganizations/LinkedOrganizations.definition";
import { OrganizationTeamsIdModel } from "../Teams/Teams.definition";
import { OrganizationUsersIdModel } from "../Users/Users.defintion";

export interface OrganizationFeatureManagementProps extends Omit<BaseComponentProps, "className" | "dataId"> {
  sectionClassName?: string;
  organization: OrganizationEditState;
  sitesByOrgResp: LazyQueryResponse<SitesByOrganizationResponse, SitesByOrgQueryVariables>;
  getSitesByOrg: () => void;
  onOrgSubdomainChange: (value: string) => void;
  onEntitlementAdd: (entitlement: Entitlement) => void;
  onEntitlementRemove: (entitlement: Entitlement) => void;
  onCreateUser: () => void;
  onCreateTeam: () => void;
}

export enum OrganizationFeatureManagementClassName {
  Base = "organization-feature-management",
  Toggle = "organization-feature-management_toggle",
}

export enum OrganizationFeatureManagementSection {
  Entitlements,
  Users,
}

export interface ToggleButtonState {
  index: number;
  id: string;
}

export enum OrganizationFeatureManagementLanguage {
  Entitlements = "Entitlements",
  LinkedOrganizations = "Linked Organizations",
  Teams = "Teams",
  Users = "Users",
}

export class OrganizationFeatureManagementIdModel extends IdModelBase {
  addUser: ButtonIdModel;
  users: OrganizationUsersIdModel;
  entitlements: EntitlementsIdModel;
  teams: OrganizationTeamsIdModel;
  organizations: OrganizationsIdModel;
  sectionToggle: ToggleButtonsIdModel;
  entitlementToggle: ButtonIdModel;
  teamsToggle: ButtonIdModel;
  userToggle: ButtonIdModel;
  linkedOrganizationsToggle: ButtonIdModel;
  managedLink: ButtonIdModel;

  constructor(id: string, index?: React.Key, postfix?: string) {
    super(id, index, postfix);
    if (isNullOrWhiteSpace(this.id)) {
      this.addUser = new ButtonIdModel(null);
      this.users = new OrganizationUsersIdModel(null);
      this.entitlements = new EntitlementsIdModel(null);
      this.teams = new OrganizationTeamsIdModel(null);
      this.organizations = new OrganizationsIdModel(null);
      this.sectionToggle = new ToggleButtonsIdModel(null);
      this.entitlementToggle = new ButtonIdModel(null);
      this.teamsToggle = new ButtonIdModel(null);
      this.userToggle = new ButtonIdModel(null);
      this.linkedOrganizationsToggle = new ButtonIdModel(null);
      this.managedLink = new ButtonIdModel(null);
      return;
    }

    this.addUser = new ButtonIdModel(`${this.id}AddUser`);
    this.users = new OrganizationUsersIdModel(`${this.id}Users`);
    this.entitlements = new EntitlementsIdModel(`${this.id}Entitlements`);
    this.teams = new OrganizationTeamsIdModel(`${this.id}Teams`);
    this.organizations = new OrganizationsIdModel(`${this.id}Organizations`);
    this.sectionToggle = new ToggleButtonsIdModel(`${this.id}SectionToggleButtons`);
    this.entitlementToggle = new ButtonIdModel(`${this.id}EntitlementToggleButton`);
    this.teamsToggle = new ButtonIdModel(`${this.id}TeamsToggleButton`);
    this.userToggle = new ButtonIdModel(`${this.id}UserToggleButton`);
    this.linkedOrganizationsToggle = new ButtonIdModel(`${this.id}LinkedOrganizationsToggleButton`);
    this.managedLink = new ButtonIdModel(`${this.id}ManagedLink`);
  }
}
