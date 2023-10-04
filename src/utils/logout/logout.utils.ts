import type { LogoutOptions } from "@auth0/auth0-react";
import { isUserLoggedOutKey, managedOrganizationIdKey } from "../../trunk/AuthWrapper/AuthWrapper.definition";

export const logoutAndUpdateLocalStorage = (logout: (options?: LogoutOptions) => void): void => {
  localStorage.setItem(isUserLoggedOutKey, "true");
  localStorage.removeItem(managedOrganizationIdKey);
  logout({ returnTo: window.location.origin });
};
