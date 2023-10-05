import type { AppState } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";
import { useCallback } from "react";
import { Router } from "react-router-dom";
import { env } from "../../../config";
import { AuthenticationGate } from "./AuthenticationGate.component";
import "../../../node_modules/@q4/nimbus-ui/dist/_styles.css";

export const history = createBrowserHistory();

export const AuthWrapper = (): JSX.Element => {
  const handleRedirectCallback = useCallback(
    (appState: AppState) => history.push(appState?.returnTo || window.location.pathname),
    [],
  );

  return (
    <Auth0Provider
      domain={env.auth0.domain}
      clientId={env.auth0.clientId}
      redirectUri={window.location.origin}
      audience={env.auth0.audience}
      cacheLocation="localstorage"
      useRefreshTokens
      onRedirectCallback={handleRedirectCallback}
    >
      <Router history={history}>
        <AuthenticationGate />
      </Router>
    </Auth0Provider>
  );
};
