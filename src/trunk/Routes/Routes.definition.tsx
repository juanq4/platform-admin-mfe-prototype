import type { Permission } from "@q4/platform-definitions";
import type { Features } from "../../configurations";
import type { Organization } from "../../definitions";

export interface RoutesBaseProps {
  features: Features;
  permissions: Permission[];
  entitlements: Organization["entitlements"];
}
