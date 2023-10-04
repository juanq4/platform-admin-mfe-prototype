import { Navigation, NavigationTheme } from "@q4/nimbus-ui";
import { memo, useEffect } from "react";
import type { SideNavigationProps } from "./SideNavigation.definition";
import { ViewIdModel } from "./SideNavigation.definition";
import { Container } from "./SideNavigation.style";

const SideNavigation = memo(function SideNavigation(props: SideNavigationProps): JSX.Element {
  const { routes, showMobileNavigation, onToggleMobileNavigation, onCollapse } = props;
  //TODO Replace this when PLATFORM-353 is complete and bring back rendering logo
  //based on showMobileNavigation
  // const isDesktopView = useMediaQuery({ query: MediaQuery.large.min });

  useEffect(() => {
    const navbar = document.querySelector("nav.nui-navigation ");
    let observer: MutationObserver;
    if (navbar) {
      observer = new MutationObserver(() => {
        onCollapse?.(navbar.classList.contains("nui-navigation--collapsed"));
      });
      observer.observe(navbar, {
        attributes: true,
        attributeFilter: ["class"],
        attributeOldValue: true,
      });
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  });

  return (
    <Container>
      <Navigation
        id={ViewIdModel.navigation.id}
        logo=""
        responsive={true}
        disableActiveRoute
        transitioned={showMobileNavigation}
        toggleTransition={onToggleMobileNavigation}
        routes={routes}
        theme={NavigationTheme.White}
      />
    </Container>
  );
});

export { SideNavigation };
