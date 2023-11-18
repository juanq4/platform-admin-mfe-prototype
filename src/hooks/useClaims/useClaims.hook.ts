import type { Entitlement } from "@q4/platform-definitions";
import { useSession } from "../../contexts/session/useSession.hook";
import type { Claims } from "./useClaims.definition";

export const useClaims = (): Claims => {
  const session = useSession();
  console.log("session", session);

  // const entitlements = useMemo(() => JSON.parse(user.claims[TokenClaim.Entitlements]), [user.claims]);
  // const permissions = useMemo(() => JSON.parse(user.claims[TokenClaim.Permissions]), [user.claims]);

  return {
    userId: session.context.userId, //  user.claims[TokenClaim.UserId],
    organizationId: session.context.organization.id, // user.claims[TokenClaim.OrganizationId],
    newClaimOrganizationId: "", //user.claims[TokenClaim.NewClaimOrganizationId],
    managedOrganizationId: "", // user.claims[TokenClaim.ManagedOrganizationId],
    email: session.user.email,
    entitlements: session.context.entitlements as Entitlement[],
    permissions: session.permissions,
    setClaims: () => null, // user.setClaims,
  };
};
