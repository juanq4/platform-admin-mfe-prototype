import type { AnalyticsState } from "../../analytics.definition";

export type PendoHookType = {
  onTrack: AnalyticsState["trackEvent"];
};
