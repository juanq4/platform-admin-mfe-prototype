import { Entitlement, Permission } from "@q4/platform-definitions";
import { env } from "../../config/env/env";
import { RoleLabel } from "../definitions/role.definition";
import { generateRoleLabel } from "../utils/role/role.utils";
import type { EntitlementCondition } from "./entitlement.configuration";
import type { FeatureFlag } from "./feature.configuration";
import { AdminRoutePath, AppRoutePath } from "./navigation.configuration";

export const PermissionCollection: { [key: string]: Permission[] } = {
  ReadOrganizations: [Permission.ReadOrgs],
  CrudOrganizations: [Permission.ReadOrgs, Permission.ManageOrgs],
  ManageClientTeamUsers: [Permission.ManageUsersClientTeam],
  ManageUsersAdmin: [Permission.ManageUsersAdmin],
  ReadUsers: [Permission.ReadUsers],
  CrudUsers: [Permission.ReadUsers, Permission.ManageUsers],
  ReadAll: [Permission.ReadUsers, Permission.ReadOrgs],
  CrudAll: [Permission.ReadUsers, Permission.ManageUsers, Permission.ReadOrgs, Permission.ManageOrgs],
  AccessEarnings: [Permission.AccessEarnings],
  AccessCrm: [Permission.AccessCrm],
  AccessEventManagement: [Permission.EventManagementAccessApp, Permission.EventManagementManageApp],
};

export enum PermissionRule {
  Or,
  And,
  Not,
}

export const PermissionDefault = {
  PermissionRule: PermissionRule.And,
};
// #endregion

// #region Roles
const { labelSuffix: roleLabelSuffix } = env?.role || {};

export const Q4Role = {
  Q4Admin: generateRoleLabel(RoleLabel.Q4Admin, roleLabelSuffix),
  Q4Support: generateRoleLabel(RoleLabel.Q4Support, roleLabelSuffix),
  Q4ManageClientRole: generateRoleLabel(RoleLabel.Q4ClientTeam, roleLabelSuffix),
};

// export const Q4Roles = Object.values(Q4Role);

export const CorporateRole = {
  CorporateAdmin: generateRoleLabel(RoleLabel.CorporateAdmin, roleLabelSuffix),
  CorporateSupport: generateRoleLabel(RoleLabel.CorporateSupport, roleLabelSuffix),
};

export const CorporateRoles = Object.values(CorporateRole);

export const AgencyRole = {
  AgencyUser: generateRoleLabel(RoleLabel.AgencyUser, roleLabelSuffix),
};

// export const AgencyRoles = Object.values(AgencyRole);

export const AppRole = {
  WebsiteManagementUser: RoleLabel.WebsiteManagementUser,
  EarningsAdmin: RoleLabel.EarningsAdmin,
  EarningsViewer: RoleLabel.EarningsViewer,
  EarningsContributor: RoleLabel.EarningsContributor,
  DesktopUser: RoleLabel.DesktopUser,
  CrmUser: RoleLabel.CrmUser,
  EngagementAnalyticsUser: RoleLabel.EngagementAnalyticsUser,
  MeetingSchedulerUser: RoleLabel.MeetingSchedulerUser,
  EventManagementAdmin: RoleLabel.EventManagementAdmin,
  EventManagementUser: RoleLabel.EventManagementUser,
};

// export const AppRoles = Object.values(AppRole);

export const Role = {
  ...Q4Role,
  ...CorporateRole,
  ...AgencyRole,
  ...AppRole,
};
export const Roles = Object.values(Role);
// #endregion

// #region Access Maps
export interface PermissionCondition {
  rule: PermissionRule;
  permissions: Permission[];
  featureFlag?: FeatureFlag; // assumes this is true
}

export interface AccessCondition {
  entitlementCondition?: EntitlementCondition;
  permissionCondition?: PermissionCondition;
  featureFlag?: FeatureFlag; // assumes this is true
}

const RouteAccess: Record<string, AccessCondition> = {
  Request: {
    entitlementCondition: {
      entitlements: [Entitlement.Studio],
    },
    permissionCondition: {
      rule: PermissionRule.Not,
      permissions: PermissionCollection.CrudOrganizations,
    },
  },
  OrganizationsUserEdit: {
    permissionCondition: {
      rule: PermissionRule.And,
      permissions: PermissionCollection.CrudUsers,
    },
  },
  MeetingScheduler: {
    entitlementCondition: {
      entitlements: [Entitlement.MeetingScheduler],
    },
    permissionCondition: {
      rule: PermissionRule.And,
      permissions: PermissionCollection.CrudOrganizations,
    },
  },
  Earnings: {
    entitlementCondition: {
      entitlements: [Entitlement.Earnings],
    },
    permissionCondition: {
      rule: PermissionRule.And,
      permissions: PermissionCollection.AccessEarnings,
    },
  },
};

const AppAccessRouteMap: Record<string, AccessCondition> = {
  [AppRoutePath.Earnings]: RouteAccess.Earnings,
};

export const AdminAccessRouteMap: Record<string, AccessCondition> = {
  [AdminRoutePath.Home]: {
    permissionCondition: {
      rule: PermissionRule.Or,
      permissions: PermissionCollection.CrudAll,
    },
  },
  [AdminRoutePath.Organizations]: {
    permissionCondition: { rule: PermissionRule.And, permissions: PermissionCollection.ReadOrganizations },
  },
  [AdminRoutePath.Users]: {
    permissionCondition: { rule: PermissionRule.And, permissions: PermissionCollection.ReadUsers },
  },
  [AdminRoutePath.OrganizationsView]: {
    permissionCondition: {
      rule: PermissionRule.And,
      permissions: PermissionCollection.ReadAll,
    },
  },
  [AdminRoutePath.OrganizationsEdit]: {
    permissionCondition: {
      rule: PermissionRule.And,
      permissions: PermissionCollection.CrudOrganizations,
    },
  },
  [AdminRoutePath.OrganizationsCreate]: {
    permissionCondition: {
      rule: PermissionRule.And,
      permissions: PermissionCollection.CrudOrganizations,
    },
  },
  [AdminRoutePath.UsersCreate]: {
    permissionCondition: {
      rule: PermissionRule.And,
      permissions: PermissionCollection.CrudUsers,
    },
  },
  [AdminRoutePath.UsersEdit]: {
    permissionCondition: {
      rule: PermissionRule.And,
      permissions: PermissionCollection.CrudUsers,
    },
  },
  [AdminRoutePath.OrganizationsUserCreate]: RouteAccess.OrganizationsUserEdit,
  [AdminRoutePath.OrganizationsUserEdit]: RouteAccess.OrganizationsUserEdit,
  [AdminRoutePath.OrganizationsUserEditWithReturnUrl]: RouteAccess.OrganizationsUserEdit,
};

export const AccessRouteMap: Record<string, AccessCondition> = {
  ...AdminAccessRouteMap,
  ...AppAccessRouteMap,
};
// #endregion
