import type { AnalyticsState } from "../analytics.definition";

export const useAnalytics = jest.fn(
  (): AnalyticsState => ({
    trackEvent: jest.fn(),
  }),
);
