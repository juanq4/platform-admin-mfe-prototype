export enum TrackEvents {
  AppSwitcherRouteClick = "User clicked on app switcher link",
  ClientAccountListFailed = "Client Account List failed to load",
  ClientAccountNoOrganizations = "Client Account List has no organizations",
}

export interface AnalyticsState {
  trackEvent: (event: TrackEvents, props?: unknown) => void;
}
