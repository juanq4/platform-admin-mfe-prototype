import type { RouteProps } from "react-router-dom";

export interface ConditionalRouteProps extends RouteProps {
  isExposed?: boolean;
}
