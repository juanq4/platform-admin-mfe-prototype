import { Entitlement, OrganizationType, Permission } from "@q4/platform-definitions";
import { useMemo } from "react";
import { FeatureFlag } from "../../configurations";
import { useUser } from "../../contexts";
import { hasEngagementAnalyticsEntitlement } from "../../utils";
import { useAccount } from "../useAccount";
import { useClaims } from "../useClaims";
import { useFeatureFlags } from "../useFeatureFlags";
import type { AccessHookModel } from "./useAccess.definition";

export const useAccess = (): AccessHookModel => {
  const [organization] = useAccount();
  const { permissions, entitlements } = useClaims();
  const features = useFeatureFlags();
  const { isImpersonatingClient } = useUser();

  const isQ4AdminOrQ4Support = useMemo(
    () =>
      // Permission.ReadOrganizations is historically the permission that is used to decide if a user has access to the admin panel.
      // TODO: Switch to a more explicit permission
      // TODO: Remove the isQ4AdminOrQ4Support alias
      !isImpersonatingClient && permissions.includes(Permission.ReadOrgs),
    [isImpersonatingClient, permissions],
  );

  const showQ4AdminHelp = organization.type === OrganizationType.ADMIN;

  const showQ4Desktop = useMemo(
    () =>
      !!(
        features[FeatureFlag.DesktopLauncher]?.isEnabled &&
        entitlements.includes(Entitlement.Desktop) &&
        permissions.includes(Permission.DesktopAccessApp)
      ),
    [features, entitlements, permissions],
  );

  const hasInsight = features[FeatureFlag.Insight];

  const hasWebsite = useMemo(
    () =>
      !isQ4AdminOrQ4Support &&
      entitlements.includes(Entitlement.Studio) &&
      permissions.includes(Permission.WebsiteManagementAccessApp),
    [isQ4AdminOrQ4Support, entitlements, permissions],
  );

  const hasEngagementAnalytics = useMemo(
    () =>
      !!(hasEngagementAnalyticsEntitlement(entitlements) && permissions?.includes(Permission.EngagementAnalyticsAccessApp)),
    [entitlements, permissions],
  );

  const hasMeetingScheduler = useMemo(
    () =>
      !!(
        features[FeatureFlag.MeetingScheduler] &&
        entitlements.includes(Entitlement.MeetingScheduler) &&
        permissions.includes(Permission.MeetingSchedulerAccessApp)
      ),
    [entitlements, features, permissions],
  );

  const hasAppWithNotifications = useMemo(() => [hasEngagementAnalytics].includes(true), [hasEngagementAnalytics]);

  const hasNotificationPreferences = useMemo(
    () =>
      !!(
        features[FeatureFlag.NotificationPreferences] &&
        organization.type === OrganizationType.CORP &&
        hasAppWithNotifications
      ),
    [features, hasAppWithNotifications, organization.type],
  );

  const hasCRM = useMemo(
    () => entitlements.includes(Entitlement.Crm) && permissions.includes(Permission.AccessCrm) && features[FeatureFlag.CRM],
    [entitlements, permissions, features],
  );

  const hasEarningsManagement = useMemo(
    () =>
      permissions.includes(Permission.AccessEarnings) &&
      (entitlements.includes(Entitlement.Earnings) || isQ4AdminOrQ4Support) &&
      features[FeatureFlag.EarningsManagement],
    [isQ4AdminOrQ4Support, entitlements, permissions, features],
  );

  const hasEventManagementApp = useMemo(() => {
    const hasEventManagementEnabled = features[FeatureFlag.EventManagementApp]?.isEnabled;
    const canAccessEventManagement = permissions.includes(Permission.EventManagementAccessApp);
    const canManageEventManagement = permissions.includes(Permission.EventManagementManageApp);

    return hasEventManagementEnabled && (canAccessEventManagement || canManageEventManagement);
  }, [permissions, features]);

  const hasHome = useMemo(
    () => features[FeatureFlag.Home] && organization?.type === OrganizationType.CORP,
    [features, organization?.type],
  );

  const hasWorkflow = useMemo(
    () => features[FeatureFlag.Workflow] && organization?.type === OrganizationType.CORP,
    [features, organization?.type],
  );

  return {
    showQ4AdminHelp,
    showQ4Desktop,
    hasInsight,
    hasAdmin: isQ4AdminOrQ4Support,
    hasWebsite,
    hasEngagementAnalytics,
    hasMeetingScheduler,
    hasNotificationPreferences,
    hasEarningsManagement,
    hasCRM,
    hasEventManagementApp,
    hasHome,
    hasWorkflow,
  };
};
