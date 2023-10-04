import type { AnalyticsState } from "../../analytics.definition";

export type PostHogHook = {
  onTrack: AnalyticsState["trackEvent"];
};
