import type { NavigationRoute } from "@q4/nimbus-ui";

export interface ApplicationLinkProps {
  route: NavigationRoute;
  icon?: JSX.Element;
  onClick: () => void;
}
