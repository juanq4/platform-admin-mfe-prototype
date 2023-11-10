import { useMemo } from "react";
import { useUser } from "../../contexts/user/user.hook";
import { TokenClaim } from "../../definitions/token.definition";
import type { Claims } from "./useClaims.definition";

export const useClaims = (): Claims => {
  const user = useUser();

  const entitlements = useMemo(() => JSON.parse(user.claims[TokenClaim.Entitlements]), [user.claims]);
  const permissions = useMemo(() => JSON.parse(user.claims[TokenClaim.Permissions]), [user.claims]);

  return {
    userId: user.claims[TokenClaim.UserId],
    organizationId: user.claims[TokenClaim.OrganizationId],
    newClaimOrganizationId: user.claims[TokenClaim.NewClaimOrganizationId],
    managedOrganizationId: user.claims[TokenClaim.ManagedOrganizationId],
    email: user.claims.email,
    entitlements,
    permissions,
    setClaims: user.setClaims,
  };
};
