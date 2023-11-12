import { Entitlement, OrganizationType } from "@q4/platform-definitions";
import type { Permission } from "@q4/platform-definitions";
import {
  PermissionRule,
  PermissionCollection,
  Role,
  Q4Role,
  AppRole,
  CorporateRoles,
} from "../../configurations/access.configuration";
import type { Organization } from "../../definitions/organization.definition";
import { hasEngagementAnalyticsEntitlement } from "../entitlement/entitlement.utils";
import { hasRequiredPermission } from "../permission/permission.utils";

function hasPermission(userPermissions: Permission[], permissions: Permission[]): boolean {
  const adminPermissionCondition = {
    rule: PermissionRule.And,
    permissions,
  };
  return hasRequiredPermission(userPermissions, adminPermissionCondition);
}

function getAdminOrganizationRoles(userPermissions: Permission[]): string[] {
  const roles = [];

  if (hasPermission(userPermissions, PermissionCollection.CrudUsers)) {
    roles.push(Q4Role.Q4Support);
  }

  if (hasPermission(userPermissions, PermissionCollection.ManageClientTeamUsers)) {
    roles.push(Q4Role.Q4ManageClientRole, AppRole.EarningsAdmin, AppRole.EarningsViewer);
  }

  if (hasPermission(userPermissions, PermissionCollection.ManageUsersAdmin)) {
    roles.push(Q4Role.Q4Admin);
  }

  if (
    hasPermission(userPermissions, PermissionCollection.ManageEventManagement) ||
    hasPermission(userPermissions, PermissionCollection.ManageClientTeamUsers)
  ) {
    roles.push(AppRole.EventManagementAdmin);
  }

  roles.push(
    AppRole.DesktopUser,
    AppRole.EngagementAnalyticsUser,
    AppRole.MeetingSchedulerUser,
    AppRole.EventManagementUser,
  );

  return roles;
}

function getAgencyOrganizationRoles(): string[] {
  return [Role.AgencyUser, AppRole.EarningsContributor];
}

function getCorporateOrganizationRoles(organization: Organization): string[] {
  const roles = [...CorporateRoles];

  if (organization?.entitlements?.includes(Entitlement.Studio)) {
    roles.push(AppRole.WebsiteManagementUser);

    if (organization?.entitlements?.includes(Entitlement.Earnings)) {
      roles.push(AppRole.EarningsContributor);
    }
  }

  if (organization?.entitlements?.includes(Entitlement.Desktop)) {
    roles.push(AppRole.DesktopUser);
  }

  if (organization?.entitlements?.includes(Entitlement.Crm)) {
    roles.push(AppRole.CrmUser);
  }

  if (hasEngagementAnalyticsEntitlement(organization?.entitlements)) {
    roles.push(AppRole.EngagementAnalyticsUser);
  }

  if (organization?.entitlements?.includes(Entitlement.MeetingScheduler)) {
    roles.push(AppRole.MeetingSchedulerUser);
  }

  // Note: This Role doesn't require an Organization Entitlement
  roles.push(AppRole.EventManagementUser);

  return roles;
}

export function getRoles(organization: Organization, userPermissions: Permission[]): string[] {
  // FIXME: Remove me once isAdmin is fully replaced for organization.type === OrganizationType.ADMIN
  if (organization.isAdmin) {
    return getAdminOrganizationRoles(userPermissions);
  }

  switch (organization?.type) {
    case OrganizationType.ADMIN:
      return getAdminOrganizationRoles(userPermissions);
    case OrganizationType.AGENCY:
      return getAgencyOrganizationRoles();
    default:
      return getCorporateOrganizationRoles(organization);
  }
}
