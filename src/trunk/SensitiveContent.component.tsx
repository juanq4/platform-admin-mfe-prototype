import { ThemeProvider } from "@mui/material";
import { ErrorBoundary, ToastContainer, useDeviceConfig } from "@q4/nimbus-ui";
import { AppFallback } from "../components/Errors";
import { NotificationProvider } from "../components/NotificationProvider/NotificationProvider.component";
import { BroadcastProvider, UserProvider } from "../contexts";
import { AnalyticsProvider } from "../contexts/analytics/analytics.context";
import nimbusTheme from "../styles/materialUi";
import { Root } from "../views";
import { ApolloWrapper } from "./ApolloWrapper/ApolloWrapper.component";
import { FeatureFlagProvider } from "./FeatureFlagProvider/FeatureFlagProvider.component";
import { GraphWrapper } from "./GraphWrapper/GraphWrapper.component";
import { ImpersonationGate } from "./ImpersonationGate/ImpersonationGate.component";
import { ReadinessGate } from "./ReadinessGate";
import { VersionProvider } from "./VersionProvider";

export const SensitiveContent = (): JSX.Element => {
  const { device } = useDeviceConfig();

  return (
    <ErrorBoundary FallbackComponent={AppFallback}>
      <ApolloWrapper>
        <GraphWrapper>
          <UserProvider>
            <VersionProvider>
              <FeatureFlagProvider>
                <AnalyticsProvider>
                  <NotificationProvider>
                    <BroadcastProvider>
                      <ThemeProvider theme={nimbusTheme}>
                        <ReadinessGate>
                          <ImpersonationGate>
                            <Root />
                            <ToastContainer newestOnTop position={device === "mobile" ? "bottom-right" : "top-right"} />
                          </ImpersonationGate>
                        </ReadinessGate>
                      </ThemeProvider>
                    </BroadcastProvider>
                  </NotificationProvider>
                </AnalyticsProvider>
              </FeatureFlagProvider>
            </VersionProvider>
          </UserProvider>
        </GraphWrapper>
      </ApolloWrapper>
    </ErrorBoundary>
  );
};
