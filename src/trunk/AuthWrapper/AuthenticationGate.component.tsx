import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect } from "react";
import { throwError } from "../../utils";
import { SensitiveContent } from "../SensitiveContent.component";
import { isUserLoggedOutKey } from "./AuthWrapper.definition";

const ProtectedContent = withAuthenticationRequired(SensitiveContent);

export const AuthenticationGate = (): JSX.Element => {
  const { error, logout } = useAuth0();

  // React when a user has logged out in another tab
  useEffect(() => {
    // If localStorage exists from previous log out then we need to remove it
    localStorage.removeItem(isUserLoggedOutKey);

    const userLoggedOut = (event: StorageEvent) => {
      // User logged out in another tab
      if (event.key === isUserLoggedOutKey && event.newValue === "true") {
        localStorage.removeItem(isUserLoggedOutKey);
        logout({ returnTo: window.location.origin });
      }
    };

    window.addEventListener("storage", userLoggedOut);
    return () => window.removeEventListener("storage", userLoggedOut);
  }, [logout]);

  if (error) {
    throwError("App", error);
  }

  return <ProtectedContent />;
};
