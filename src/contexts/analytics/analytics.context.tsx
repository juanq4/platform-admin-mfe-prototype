import type { PropsWithChildren } from "react";
import { createContext, useCallback } from "react";
import type { AnalyticsState, TrackEvents } from "./analytics.definition";
import { usePendo } from "./vendorHooks/usePendo";
import { usePostHog } from "./vendorHooks/usePostHog/usePostHog.hook";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AnalyticsContext = createContext<AnalyticsState>(undefined!);

export const AnalyticsProvider = (props: PropsWithChildren): JSX.Element => {
  const { children } = props;

  const postHogTracker = usePostHog();
  const pendoTracker = usePendo();

  const trackEvent = useCallback(
    (event: TrackEvents, props: unknown) => {
      try {
        postHogTracker?.onTrack?.(event, props);
        pendoTracker?.onTrack?.(event, props);
      } catch (err) {
        console.error("unable to track event", err);
      }
    },
    [postHogTracker, pendoTracker],
  );

  return (
    <AnalyticsContext.Provider
      value={{
        trackEvent,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
