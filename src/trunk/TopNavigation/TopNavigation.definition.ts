import type { ButtonProps } from "@q4/nimbus-ui";
import type { NavigationProps } from "../../trunk/Root/Root.definition";

export const q4AdminHelp = "https://q4websystems.atlassian.net/wiki/spaces/QP/pages/3179839553/Q4+Platform+Support";

export const TopNavigationAriaLabel = {
  MobileMenuButton: "open menu",
};

export const NotificationPreferencesButton = {
  id: "notification-preferences",
  label: "Notification preferences",
};

export interface MobileMenuButtonProps extends ButtonProps {
  showMobileNavigation: boolean;
}

export interface TopNavigationProps extends NavigationProps {
  isSideNavigationCollapsed: boolean;
  hideMobileNavigationButton?: boolean;
  showManagedOrgSelector?: boolean;
}
