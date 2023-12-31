import type { IdToken } from "@auth0/auth0-react";
import type { Entitlement, Permission } from "@q4/platform-definitions";

export interface Claims {
  userId?: string;
  entitlements?: Entitlement[];
  organizationId?: string;
  managedOrganizationId?: string;
  newClaimOrganizationId?: string;
  email?: string;
  permissions?: Permission[];
  setClaims?: (claims: IdToken) => void;
}
