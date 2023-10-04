import { useAuth0 } from "@auth0/auth0-react";
import { datadogLogs } from "@datadog/browser-logs";
import { LDProvider, useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import { useContext, useEffect, useState, useMemo, createContext } from "react";
import type { PropsWithChildren } from "react";
import { useHistory } from "react-router-dom";
import { env, LaunchDarklyConfig } from "../../../config";
import { UserContext } from "../../contexts";
import { useToastNotificationService } from "../../hooks";
import {
  deleteShellVersionCookie,
  getShellVersionCookie,
  isCanaryInitialized,
  setCanaryInitializedCookie,
  setShellVersionCookie,
} from "./VersionProvider.cookies.utils";
import type { VersionContextValues, VersionGateProps } from "./VersionProvider.definition";
import { VersionUpdatingWording } from "./VersionProvider.definition";
import { reloadPageOnUrlChange, versionUpdatingFlag } from "./VersionProvider.storage.utils";

const spotEnvironment = new RegExp(".+.connect.dev.q4inc.com");

// When a meaningful initial state is set in the provider, there is
// no need to set an initial value through the createContext function.

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const VersionContext = createContext<VersionContextValues>(undefined!);

const VersionGate = (props: VersionGateProps) => {
  const notifications = useToastNotificationService();
  const { setIsVersionUpdating, children } = props;
  const history = useHistory();
  const flags = useFlags();
  const ldClient = useLDClient();

  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState();

  const runningVersion = useMemo(() => getShellVersionCookie() || "latest", []);
  const flag = useMemo(() => flags["platform-shell"], [flags]);
  const isServedLatest = useMemo(() => flag?.name === "latest", [flag]);
  const incomingVersion = useMemo(() => flag?.version, [flag]);

  // Do not use canary when:
  // - Developing locally
  // - In spot environment
  // - Feature flags haven't finished initializing
  // - The canary flag isn't available
  // - Feature flags failed to load
  const isUsingCanary = useMemo(
    () =>
      window.location.hostname !== "localhost" &&
      !spotEnvironment.test(window.location.hostname) &&
      isInitialized &&
      flag &&
      !error,
    [error, flag, isInitialized],
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pjson = require("../../../package.json");
    console.log("Build version:", pjson?.version);
    datadogLogs.logger.info(`Build version: ${pjson?.version}`);
  }, []);

  useEffect(() => {
    if (!ldClient || isInitialized) return;

    ldClient
      .waitForInitialization()
      .catch(setError)
      .then(() => setIsInitialized(true));
  }, [isInitialized, ldClient]);

  useEffect(() => {
    let version = env.appEnv;

    if (isUsingCanary) {
      version = runningVersion || "latest";
      datadogLogs.logger.info(`Running version: ${version}`);
    }

    document.querySelector('meta[name="version"]')?.setAttribute("content", version);
  }, [runningVersion, isUsingCanary]);

  // Manage the cookie based on the incoming version
  useEffect(() => {
    if (!isUsingCanary) {
      return;
    }

    console.log("Incoming version:", isServedLatest ? "latest" : incomingVersion);

    const wasCanaryInitialized = isCanaryInitialized();
    setCanaryInitializedCookie();

    if (runningVersion === incomingVersion) {
      if (versionUpdatingFlag.get()) {
        setTimeout(() => {
          notifications.current.success(VersionUpdatingWording.successful, {
            autoClose: 1000 * 60 * 1.5,
          });
          versionUpdatingFlag.remove();
        }, 2000);
        setIsVersionUpdating(false);
      }

      return;
    }

    // If a new version is served to the user during a worflow
    // wait until a url change then reload app and update version
    reloadPageOnUrlChange(history);

    if (isServedLatest) {
      // If the "latest" is served, delete the cookie.
      // The server will serve the latest version of the web app on next load.
      deleteShellVersionCookie();
    } else {
      setShellVersionCookie(incomingVersion);

      if (!wasCanaryInitialized) {
        // When the user is loading the app for the first time in their session
        // and is being served a specific version of the app, reload.
        window.location.reload();
      }
    }
  }, [runningVersion, incomingVersion, isServedLatest, isUsingCanary, history, setIsVersionUpdating, notifications]);

  return <>{children}</>;
};

export const VersionProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const auth0 = useAuth0();
  const { userId, organizationId } = useContext(UserContext);
  const [isVersionUpdating, setIsVersionUpdating] = useState<boolean>(versionUpdatingFlag.get());

  return (
    <VersionContext.Provider value={{ isVersionUpdating, setIsVersionUpdating }}>
      <LDProvider
        {...LaunchDarklyConfig}
        user={{
          key: userId,
          email: auth0.user.email,
          name: auth0.user.name,
          custom: {
            organizationId,
          },
        }}
        clientSideID={env.launchDarkly.versionManager.clientSideId}
      >
        <VersionGate setIsVersionUpdating={setIsVersionUpdating}>{children}</VersionGate>
      </LDProvider>
    </VersionContext.Provider>
  );
};
