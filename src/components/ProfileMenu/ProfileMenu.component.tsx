import { useAuth0 } from "@auth0/auth0-react";
import { Origin, Popover, useVisibility } from "@q4/nimbus-ui";
import { memo, useCallback, useMemo } from "react";
import LogoutIcon from "../../assets/icons/logout.svg";
import { AppRoutePath } from "../../configurations";
import { useAccess } from "../../hooks";
import { getLoggedInUserName, logoutAndUpdateLocalStorage } from "../../utils";
import { Q4HelpLink, ToggleMenuButtonId } from "./ProfileMenu.definition";
import { BottomBar, Option, OptionContainer, PopoverOptionsContainer, ToggleMenuButton } from "./ProfileMenu.style";

const Component = (): JSX.Element => {
  const [isVisible, handleShow, handleHide] = useVisibility();
  const auth0 = useAuth0();
  const access = useAccess();

  const handleToggleMenuButtonClick = useCallback(
    () => (isVisible ? handleHide() : handleShow()),
    [isVisible, handleHide, handleShow],
  );
  const username = useMemo(() => getLoggedInUserName(auth0.user), [auth0.user]);
  const handleNotificationPreferencesClick = useCallback(() => {
    handleHide();
    window.open(AppRoutePath.Notifications, "notification-preferences").focus();
  }, [handleHide]);
  const handleHelpClick = useCallback(() => {
    handleHide();
    window.open(Q4HelpLink);
  }, [handleHide]);
  const handleLogoutClick = useCallback(() => logoutAndUpdateLocalStorage(auth0.logout), [auth0]);

  return (
    <>
      <ToggleMenuButton id={ToggleMenuButtonId} onClick={handleToggleMenuButtonClick}>
        {username}
      </ToggleMenuButton>
      <Popover
        anchorTargetElementId={ToggleMenuButtonId}
        focusOnProps={{ enabled: false }}
        targetOrigin={Origin.BottomRight}
        visible={isVisible}
        onCloseRequest={handleHide}
      >
        <PopoverOptionsContainer>
          {access.hasNotificationPreferences && (
            <OptionContainer>
              <Option
                id="notification-preferences"
                label="Notification preferences"
                onClick={handleNotificationPreferencesClick}
              />
            </OptionContainer>
          )}
          <OptionContainer>
            <Option id="help" label="Help" onClick={handleHelpClick} />
          </OptionContainer>
          <OptionContainer>
            <Option
              id="logout"
              label={
                <>
                  Log out <img src={LogoutIcon} alt="logout" />
                </>
              }
              onClick={handleLogoutClick}
            />
          </OptionContainer>
          <BottomBar />
        </PopoverOptionsContainer>
      </Popover>
    </>
  );
};

export const ProfileMenu = memo(Component);
