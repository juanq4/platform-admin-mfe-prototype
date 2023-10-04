import type { NavigationRoute } from "@q4/nimbus-ui";
import { IdModelBase, isNullOrWhiteSpace, NavigationIdModel } from "@q4/nimbus-ui";
import type { NavigationProps } from "../Root/Root.definition";

export class SideNavigationIdModel extends IdModelBase {
  navigation: NavigationIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(this.id)) {
      this.navigation = new NavigationIdModel("");

      return;
    }

    this.navigation = new NavigationIdModel(`${this.id}Navigation`);
  }
}

export const ViewId = "Q4PlatformShell";
export const ViewIdModel = new SideNavigationIdModel(ViewId);

export interface SideNavigationProps extends NavigationProps {
  routes: NavigationRoute[];
  onCollapse?: (isCollapsed: boolean) => void;
  showManagedOrgSelector: boolean;
}
