import { useAuth0 } from "@auth0/auth0-react";
import type { PopoverMenuButtonProps } from "@q4/nimbus-ui";
import { ButtonSize, Ghostable, MediaQuery, PopoverMenuSize, ToolbarSize, useVisibility } from "@q4/nimbus-ui";
import { memo, useContext, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter, useHistory } from "react-router-dom";
import { env } from "../../../config";
import closeIcon from "../../assets/icons/close.svg";
import mobileMenuIcon from "../../assets/icons/mobile-menu.svg";
import { AppRoutePath } from "../../configurations";
import { UserContext } from "../../contexts";
import { useAccess } from "../../hooks";
import { getLoggedInUserName, getOrganizationLabelWithTicker, logoutAndUpdateLocalStorage } from "../../utils";
import type { TopNavigationProps } from "./TopNavigation.definition";
import { NotificationPreferencesButton, q4AdminHelp } from "./TopNavigation.definition";
import {
  Actions,
  BrandOrgContainer,
  Container,
  Divider,
  UserMenu,
  MobileMenuButton,
  UserButton,
  Logo,
  LogoWrapper,
  Header,
  MobileMenuIcon,
  AccountSwitcherButton,
} from "./TopNavigation.style";
import { AccountSwitcherConfirmationModal } from "./components/AccountSwitcherConfirmationModal.component";

const TopNavigation = memo(function TopNavigation(props: TopNavigationProps): JSX.Element {
  const {
    isSideNavigationCollapsed,
    hideMobileNavigationButton,
    showMobileNavigation,
    showManagedOrgSelector,
    onToggleMobileNavigation,
  } = props;

  const userContext = useContext(UserContext);

  // TODO: PLATFORM-463: Re-introduce Notifications
  // const notificationsId = "notifications";
  // const [notificationsPopoverVisible, handleNotificationsPopoverHide] = useVisibility();

  const history = useHistory();
  const auth0 = useAuth0();
  const [userMenuVisible, handleUserMenuShow, handleUserMenuHide] = useVisibility();
  const [accountSwitcherModalVisible, handleAccountSwitcherModalShow, handleAccountSwitcherModalHide] = useVisibility();
  const access = useAccess();
  const isMobileView = useMediaQuery({ query: MediaQuery.extraSmall.max });

  const userName = useMemo(() => getLoggedInUserName(auth0.user), [auth0.user]);

  const popoverMenuButtons: PopoverMenuButtonProps[] = [
    ...(access.hasNotificationPreferences
      ? [
          {
            id: NotificationPreferencesButton.id,
            label: NotificationPreferencesButton.label,
            onClick: () => history.push(AppRoutePath.Notifications),
          },
        ]
      : []),
    {
      id: "help",
      label: "Help",
      onClick: () => window.open(`${env.helpCenter.url}/index.html?lang=en`),
    },
    ...(access.showQ4AdminHelp
      ? [
          {
            id: "q4AdminHelp",
            label: "Q4 Admin Help",
            onClick: () => window.open(q4AdminHelp),
          },
        ]
      : []),
    {
      id: "logOut",
      label: "Log out",
      onClick: () => logoutAndUpdateLocalStorage(auth0.logout),
    },
  ];

  return (
    <Container>
      <BrowserRouter>
        <Header size={ToolbarSize.Small}>
          <BrandOrgContainer className={isSideNavigationCollapsed ? "collapsed" : ""}>
            {!hideMobileNavigationButton && (
              <MobileMenuButton
                showMobileNavigation={showMobileNavigation}
                onClick={onToggleMobileNavigation}
                label={<MobileMenuIcon src={showMobileNavigation ? closeIcon : mobileMenuIcon} />}
              />
            )}
            <LogoWrapper>
              <Ghostable ghosted={!isSideNavigationCollapsed && !isMobileView}>
                <Logo
                  alt="sm"
                  className={isSideNavigationCollapsed || isMobileView ? "show" : "hide"}
                  src="https://s25.q4cdn.com/982695397/files/design/cc/CC-Logo-ICON_blue.svg"
                />
              </Ghostable>
              <Ghostable ghosted={isSideNavigationCollapsed || isMobileView}>
                <Logo
                  alt="lg"
                  className={!isSideNavigationCollapsed && !isMobileView ? "show" : "hide"}
                  src="https://s25.q4cdn.com/982695397/files/design/cc/CC-Logo-SM_blue.svg"
                />
              </Ghostable>
            </LogoWrapper>
            <Divider />
            <Ghostable ghosted={!showManagedOrgSelector}>
              <AccountSwitcherButton
                size={ButtonSize.Small}
                label={getOrganizationLabelWithTicker(userContext.organization)}
                onClick={handleAccountSwitcherModalShow}
              />
            </Ghostable>
          </BrandOrgContainer>
          <Actions>
            {/* TODO: PLATFORM-463 Bring back Notifications popover in the future */}
            {/* <NotificationsButton
              id={notificationsId}
              label={<i className="cci-notifications-4pt" />}
              className={notificationsPopoverVisible ? "active" : ""}
              onClick={handleNotificationsPopoverShow}
            />
            <NotificationsPopover
              anchorTargetElementId={notificationsId}
              popoverOrigin={Origin.TopRight}
              targetOrigin={Origin.BottomRight}
              visible={notificationsPopoverVisible}
              onCloseRequest={handleNotificationsPopoverHide}
            >
              <NotificationsContent>
                <Notifications
                  title={<NotificationsTitle>Notifications</NotificationsTitle>}
                  footer={
                    <NotificationsFooter>
                      <NotificationsFooterButton
                        aria-label="View all"
                        label="View all"
                        onClick={() => {
                          history.push("/notifications");
                          handleNotificationsPopoverHide();
                        }}
                      />
                    </NotificationsFooter>
                  }
                />
              </NotificationsContent>
            </NotificationsPopover> */}
            <UserButton
              id="user-dropdown"
              label={
                <span>
                  {userName}
                  <div className="caret">&#9660;</div>
                </span>
              }
              className={userMenuVisible ? "active" : ""}
              size={ButtonSize.Small}
              onClick={handleUserMenuShow}
            />
            <UserMenu
              anchorTargetElementId="user-dropdown"
              onCloseRequest={handleUserMenuHide}
              size={PopoverMenuSize.Small}
              visible={userMenuVisible}
              options={popoverMenuButtons}
            />
          </Actions>
        </Header>
      </BrowserRouter>

      <AccountSwitcherConfirmationModal
        visible={accountSwitcherModalVisible}
        organizationName={getOrganizationLabelWithTicker(userContext.organization)}
        onCloseRequest={handleAccountSwitcherModalHide}
      />
    </Container>
  );
});

export { TopNavigation };
