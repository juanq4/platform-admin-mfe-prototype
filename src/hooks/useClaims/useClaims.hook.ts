import type { Entitlement } from "@q4/platform-definitions";
import { useSessionContext } from "../useSessionContext/useSessionContext.hook";
import type { Claims } from "./useClaims.definition";

export const useClaims = (): Claims => {
  const session = useSessionContext();
  console.log("session", session);

  return {
    userId: session.context.userId,
    organizationId: session.context.organization.id,
    newClaimOrganizationId: "",
    managedOrganizationId: "",
    email: session.user.email,
    entitlements: session.context.entitlements as Entitlement[],
    permissions: session.permissions,
    setClaims: () => null,
  };
};
