import { Origin, Popover, peacockPalette, useVisibility } from "@q4/nimbus-ui";
import { Entitlement, OrganizationType } from "@q4/platform-definitions";
import { memo, useCallback, useMemo } from "react";
import DotsGrid from "../../assets/icons/dots-grid.svg";
import Home from "../../assets/icons/q4-home.svg";
import XClose from "../../assets/icons/x-close.svg";
import { FeatureFlag } from "../../configurations/feature.configuration";
import { EngagementAnalyticsLink, Q4DesktopLink, WebsiteLink } from "../../configurations/navigation.configuration";
import { useUser } from "../../contexts/user/user.hook";
import { useAccount, useFeatureFlags } from "../../hooks";
import { AccountSwitcherConfirmationModal } from "../../trunk/TopNavigation/components/AccountSwitcherConfirmationModal.component";
import { hasEngagementAnalyticsEntitlement } from "../../utils/entitlement/entitlement.utils";
import { getOrganizationLabelWithTicker } from "../../utils/organization/organization.utils";
import { ApplicationLink } from "../ApplicationLink/ApplicationLink.component";
import { Icon } from "../ApplicationLink/ApplicationLink.style";
import type { ApplicationSwitcherProps } from "./ApplicationSwitcher.definition";
import { ToggleMenuButtonId } from "./ApplicationSwitcher.definition";
import {
  ApplicationTitle,
  BottomBar,
  CloseButton,
  DiscoverContainer,
  DiscoverHeader,
  PopoverOptionsContainer,
  ToggleMenuButton,
} from "./ApplicationSwitcher.style";
import { OrganizationSwitcher } from "./OrganizationSwitcher/OrganizationSwitcher.component";
import { DiscoverLink } from "./components/DiscoverLink/DiscoverLink.component";

const Component = (props: ApplicationSwitcherProps): JSX.Element => {
  // FIXME(PLATFORM-3069): Add routes logic here instead of prop drilling from Root.view
  const { routes, homeRoute } = props;

  const [organization] = useAccount();
  const flags = useFeatureFlags();

  const [isVisible, handleShow, handleHide] = useVisibility();
  const user = useUser();
  const [isConfirming, startConfirming, stopConfirming] = useVisibility();

  const handleToggleMenuButtonClick = useCallback(
    () => (isVisible ? handleHide() : handleShow()),
    [isVisible, handleHide, handleShow],
  );

  const handleOrganizationSwitcherClick = useCallback(() => {
    handleHide();
    startConfirming();
  }, [handleHide, startConfirming]);

  const organizationLabelWithTicker = getOrganizationLabelWithTicker(user.organization);

  const homeIcon = useMemo(
    () =>
      homeRoute && (
        <Icon bgColor={peacockPalette.primary.primary500}>
          <img src={Home} width={"100%"} height={"100%"} alt={homeRoute?.label as string} />
        </Icon>
      ),
    [homeRoute],
  );

  const discoverLinks = useMemo(() => {
    const linksToShow = [];

    if (!organization.entitlements.includes(Entitlement.Studio)) {
      linksToShow.push(WebsiteLink);
    }

    if (!hasEngagementAnalyticsEntitlement(organization.entitlements)) {
      linksToShow.push(EngagementAnalyticsLink);
    }

    if (!organization.entitlements.includes(Entitlement.Desktop)) {
      linksToShow.push(Q4DesktopLink);
    }

    return linksToShow;
  }, [organization.entitlements]);

  const showDiscoverLinks =
    flags?.[FeatureFlag.PLGv2] && discoverLinks.length && organization?.type !== OrganizationType.ADMIN;

  return (
    <>
      <ToggleMenuButton id={ToggleMenuButtonId} onClick={handleToggleMenuButtonClick}>
        <img src={DotsGrid} alt="application switcher" />
      </ToggleMenuButton>
      <Popover
        anchorTargetElementId={ToggleMenuButtonId}
        focusOnProps={{ enabled: false }}
        targetOrigin={Origin.BottomRight}
        visible={isVisible}
        onCloseRequest={handleHide}
      >
        <PopoverOptionsContainer>
          <CloseButton onClick={handleHide}>
            <img src={XClose} alt="close application switcher" />
          </CloseButton>
          {user.isImpersonatingClient && <OrganizationSwitcher onClick={handleOrganizationSwitcherClick} />}
          {homeRoute && <ApplicationLink key={homeRoute.id} route={homeRoute} icon={homeIcon} onClick={handleHide} />}
          {routes.length > 0 && <ApplicationTitle>My Q4 Applications</ApplicationTitle>}
          {routes.map((route) => (
            <ApplicationLink key={route.id} route={route} onClick={handleHide} />
          ))}

          {!!showDiscoverLinks && (
            <DiscoverContainer>
              <DiscoverHeader>Discover</DiscoverHeader>
              {discoverLinks.map((route) => (
                <DiscoverLink key={route.id} route={route} onClick={handleHide} />
              ))}
            </DiscoverContainer>
          )}

          <BottomBar />
        </PopoverOptionsContainer>
      </Popover>
      <AccountSwitcherConfirmationModal
        visible={isConfirming}
        organizationName={organizationLabelWithTicker}
        onCloseRequest={stopConfirming}
      />
    </>
  );
};

export const ApplicationSwitcher = memo(Component);
