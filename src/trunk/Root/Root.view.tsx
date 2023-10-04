import { AnchorTarget, OS, Swapable, useDeviceConfig } from "@q4/nimbus-ui";
import type { NavigationRoute } from "@q4/nimbus-ui";
import { OrganizationType, Permission } from "@q4/platform-definitions";
import { memo, useEffect, useMemo, useState } from "react";
import { env } from "../../../config";
import { PlatformNav } from "../../components";
import { LoadingBar } from "../../components/LoadingBar/LoadingBar.component";
import type { CrossSellingLink } from "../../configurations";
import {
  AdminLink,
  CRMLink,
  EarningsManagementLink,
  EngagementAnalyticsLink,
  EventManagementAppLink,
  FeatureFlag,
  HomePageLink,
  InsightLink,
  MeetingSchedulerLink,
  Q4DesktopLink,
  WebsiteLink,
} from "../../configurations";
import { ApplicationProvider, useUser } from "../../contexts";
import { useAccess, useAccount, useClaims, useDataDog, useFeatureFlags } from "../../hooks";
import { useCreateTrial } from "../../hooks/useCreateTrial/useCreateTrial.hook";
import {
  createCrossSellingPath,
  getAccountErrors,
  getSubscriptionErrors,
  isLocalEnvironment,
  isSpotEnvironment,
  throwError,
} from "../../utils";
import { ClientAccountsRoutes } from "../../views/ClientAccounts/ClientAccountsRoutes.component";
import { Routes } from "../Routes/Routes.component";
import { SideNavigation } from "../SideNavigation/SideNavigation.component";
import { TopNavigation } from "../TopNavigation/TopNavigation.component";
import { RootViewIdModel } from "./Root.definition";
import { Container, ContentContainer, RouteContentContainer } from "./Root.style";

const Root = memo(function Root(): JSX.Element {
  const claims = useClaims();
  const { permissions } = claims ?? {};
  const [organization, user] = useAccount();
  const { isTrialInitializing } = useCreateTrial();
  const features = useFeatureFlags();
  const access = useAccess();
  const deviceConfig = useDeviceConfig();

  const { isImpersonatingClient, adminShowClientSelector } = useUser();
  const { initializeRUM } = useDataDog();

  const [showMobileNavigation, setShowMobileNavigation] = useState(false);
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false);

  const accountErrors = useMemo(() => getAccountErrors(claims, user, organization), [claims, user, organization]);
  const subscriptionErrors = useMemo(() => getSubscriptionErrors(user.active, organization.active), [organization, user]);

  const showClientAccountSelector = useMemo(() => {
    return (
      (organization?.type === OrganizationType.AGENCY && !isImpersonatingClient) ||
      (organization?.type === OrganizationType.ADMIN && adminShowClientSelector) ||
      (organization?.type === OrganizationType.ADMIN &&
        !permissions.includes(Permission.AccessAdmin) &&
        permissions.includes(Permission.ImpersonateClient))
    );
  }, [organization?.type, isImpersonatingClient, adminShowClientSelector, permissions]);

  const showPlatformNav = useMemo(() => !!features?.[FeatureFlag.PlatformNav], [features]);

  const crossSellingLinks: Array<CrossSellingLink> = useMemo(() => {
    const links = features?.[FeatureFlag.CrossSellingLinks];
    return links && Array.isArray(links) && links.length > 0 ? links : [];
  }, [features]);

  const q4DesktopLink = useMemo(() => {
    if (deviceConfig.os === OS.Android) {
      Q4DesktopLink.path = env.q4Desktop.mobile.androidUrl;
    } else if (deviceConfig.os === OS.IOS) {
      Q4DesktopLink.path = env.q4Desktop.mobile.iosUrl;
    }

    return Q4DesktopLink;
  }, [deviceConfig.os]);

  useEffect(
    function _initializeDataDog() {
      if (!isLocalEnvironment && !isSpotEnvironment && (access.hasWebsite || access.hasEarningsManagement)) {
        initializeRUM();
      }
    },
    [initializeRUM, access],
  );

  const homeRoute = useMemo(() => (access.hasHome && HomePageLink) as NavigationRoute, [access]);

  /* eslint-disable sonarjs/cognitive-complexity */
  const routes = useMemo(() => {
    const result = [];

    if (access.hasInsight) {
      result.push(InsightLink);
    }

    if (access.hasWebsite) {
      result.push(WebsiteLink);
    }

    if (access.hasEngagementAnalytics) {
      result.push(EngagementAnalyticsLink);
    }

    if (access.hasMeetingScheduler) {
      result.push(MeetingSchedulerLink);
    }

    if (access.hasCRM) {
      result.push(CRMLink);
    }

    if (access.hasAdmin) {
      result.push(AdminLink);
    }

    if (access.hasEventManagementApp) {
      result.push(EventManagementAppLink);
    }

    const crossSellingRoutes: NavigationRoute[] = crossSellingLinks.map((link) => ({
      id: `CrossSelling${link.label.toLowerCase().split(" ").join("")}`,
      path: createCrossSellingPath(link, user, claims.organizationId, organization.name),
      label: link.label,
      icon: "q4i-rate-4pt",
      target: AnchorTarget.Blank,
    }));

    // FIXME: Remove me once routes targets are updated
    if (!features?.[FeatureFlag.PlatformNav]) {
      result.forEach((route) => {
        route.target = route.id === Q4DesktopLink.id ? AnchorTarget.Blank : undefined;
      });
    }

    result.push(...crossSellingRoutes);

    if (access.hasEarningsManagement) {
      result.push(EarningsManagementLink);
    }

    if (access.showQ4Desktop) {
      result.push(q4DesktopLink);
    }

    if (!document.defaultView.name) {
      const target = access.hasHome ? HomePageLink.target : result?.[0]?.target;
      document.defaultView.name = target ? target : "";
    }

    return result as NavigationRoute[];
  }, [access, claims, user, organization, crossSellingLinks, q4DesktopLink, features]);

  function handleNavigationToggle() {
    setShowMobileNavigation(!showMobileNavigation);
  }

  function renderContent(): JSX.Element {
    if (showClientAccountSelector) return;

    return (
      <ContentContainer id={RootViewIdModel.landing}>
        {!showPlatformNav && (
          <SideNavigation
            routes={routes}
            showMobileNavigation={showMobileNavigation}
            onToggleMobileNavigation={handleNavigationToggle}
            onCollapse={setIsNavigationCollapsed}
            showManagedOrgSelector={isImpersonatingClient}
          />
        )}
        {isTrialInitializing && <LoadingBar message="We're preparing your free trial" />}
        <RouteContentContainer>
          <Routes entitlements={claims.entitlements} permissions={claims.permissions} features={features} />
        </RouteContentContainer>
      </ContentContainer>
    );
  }

  function renderClientAccounts(): JSX.Element {
    return (
      <ContentContainer>
        <ClientAccountsRoutes />
      </ContentContainer>
    );
  }

  if (accountErrors) {
    throwError("Account", new Error(accountErrors));
  }

  if (subscriptionErrors) {
    throwError("Subscription", new Error(subscriptionErrors));
  }

  return (
    <ApplicationProvider routes={routes}>
      <Container>
        {showPlatformNav ? (
          <PlatformNav routes={routes} homeRoute={homeRoute} />
        ) : (
          <TopNavigation
            hideMobileNavigationButton={showClientAccountSelector}
            showMobileNavigation={showMobileNavigation}
            onToggleMobileNavigation={handleNavigationToggle}
            isSideNavigationCollapsed={isNavigationCollapsed}
            showManagedOrgSelector={isImpersonatingClient}
          />
        )}
        <Swapable layers={[renderContent(), renderClientAccounts()]} selected={+showClientAccountSelector} />
      </Container>
    </ApplicationProvider>
  );
});

export { Root };
