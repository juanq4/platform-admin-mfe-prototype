import type { Permission } from "@q4/platform-definitions";
import type { ReactElement } from "react";
import type { SwitchProps, RouteProps } from "react-router-dom";
import type { Features } from "../../configurations";
import type { Organization } from "../../definitions";

export interface AccessSwitchProps extends SwitchProps {
  features: Features;
  permissions: Permission[];
  entitlements: Organization["entitlements"];
}

export type AccessSwitchRoute = ReactElement<RouteProps>;
