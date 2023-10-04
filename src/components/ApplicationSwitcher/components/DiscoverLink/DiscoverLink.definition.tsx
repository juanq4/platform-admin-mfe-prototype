import type { NavigationRoute } from "@q4/nimbus-ui";
import type { DiscoverName } from "../../../../configurations/application.configuration";

export interface DiscoverNavigationRoute extends Omit<NavigationRoute, "target"> {
  websiteLink?: string;
  description?: string;
  discoverLabel?: DiscoverName;
  activeCrossSelling?: boolean;
}

export interface DiscoverLinkProps {
  route: DiscoverNavigationRoute;
  onClick: () => void;
}
