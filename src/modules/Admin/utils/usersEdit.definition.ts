import type { RoutePathIdLabel } from "../../../configurations";

export interface UsersEditSpecRouteConfig {
  route: string;
  routeQuery?: Partial<Record<RoutePathIdLabel, string>>;
  returnRoute: string;
}
