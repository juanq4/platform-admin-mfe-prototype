import { OrganizationType } from "@q4/platform-definitions";
import { memo, useCallback, useMemo } from "react";
import type { MouseEvent } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useHistory } from "react-router";
import Q4Logo from "../../assets/icons/q4-logo.svg";
import { AppRoutePath, FeatureFlag } from "../../configurations";
import { useApplication, useUser } from "../../contexts";
import { useFeatureFlags, useAccess } from "../../hooks";
import { ApplicationSummary } from "../ApplicationSummary/ApplicationSummary.component";
import { ApplicationSwitcher } from "../ApplicationSwitcher/ApplicationSwitcher.component";
import { NotificationsDrawer } from "../NotificationsDrawer/NotificationsDrawer.component";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu.component";
import { OrganizationSwitcher } from "./OrganizationSwitcher/OrganizationSwitcher.component";
import { type PlatformNavProps } from "./PlatformNav.definition";
import {
  ApplicationSwitcherContainer,
  Column,
  Container,
  Logo,
  LogoAnchor,
  LogoContainer,
  ProfileMenuContainer,
  NotificationDrawerContainer,
  Separator,
} from "./PlatformNav.style";

const Component = (props: PlatformNavProps): JSX.Element => {
  const { routes, homeRoute } = props;

  const application = useApplication();
  const user = useUser();
  const location = useLocation();
  const isUsingMobile = useMediaQuery({ query: "(max-width: 428px)" });
  const flags = useFeatureFlags();
  const history = useHistory();
  const access = useAccess();

  const isClientAccountsView = useMemo(
    () =>
      !application.name &&
      user.organization.type === OrganizationType.AGENCY &&
      !location.pathname.includes(AppRoutePath.Home),
    [application.name, location.pathname, user.organization.type],
  );

  const displayApplicationSummary = !isUsingMobile && (isClientAccountsView || application.name);

  const isNotificationsEnabled = flags?.[FeatureFlag.Notifications]?.isEnabled;

  const handleLogoClick = useCallback(
    (e: MouseEvent) => {
      e?.preventDefault();
      history.push(AppRoutePath.Home);
    },
    [history],
  );

  return (
    <Container>
      <Column>
        <LogoContainer>
          {access.hasHome ? (
            <LogoAnchor href={AppRoutePath.Home} onClick={handleLogoClick}>
              <Logo alt="Q4 Platform Logo" src={Q4Logo} />
            </LogoAnchor>
          ) : (
            <Logo alt="Q4 Platform Logo" src={Q4Logo} />
          )}
        </LogoContainer>
        {displayApplicationSummary && (
          <>
            <Separator />
            <ApplicationSummary name={isClientAccountsView ? "Client Accounts" : application.name} tier={application.tier} />
          </>
        )}
      </Column>
      <Column>
        {user.isImpersonatingClient && <OrganizationSwitcher />}
        {!isClientAccountsView && (
          <ApplicationSwitcherContainer>
            <ApplicationSwitcher routes={routes} homeRoute={homeRoute} />
          </ApplicationSwitcherContainer>
        )}
        {isNotificationsEnabled && (
          <NotificationDrawerContainer>
            <NotificationsDrawer />
          </NotificationDrawerContainer>
        )}
        <ProfileMenuContainer>
          <ProfileMenu />
        </ProfileMenuContainer>
      </Column>
    </Container>
  );
};

export const PlatformNav = memo(Component);
