import type { Entitlement, MfeProps } from "@q4/platform-definitions";
import type { ReactElement } from "react";
import type { SwitchProps, RouteProps } from "react-router-dom";
import type { Features } from "../../configurations/feature.configuration";

export interface AccessSwitchProps extends SwitchProps {
  features: Features;
  permissions: MfeProps["permissions"];
  entitlements: Entitlement[];
}

export type AccessSwitchRoute = ReactElement<RouteProps>;
