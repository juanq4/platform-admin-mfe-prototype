import type { NavigationRoute } from "@q4/nimbus-ui";

export const ToggleMenuButtonId = "application-switcher-toggle-menu-button";

export interface ApplicationSwitcherProps {
  routes: NavigationRoute[];
  homeRoute?: NavigationRoute;
}
