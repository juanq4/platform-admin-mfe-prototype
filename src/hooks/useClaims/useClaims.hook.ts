// import { useContext, useMemo } from "react";
// import { UserContext } from "../../contexts/user/user.context";
// import { TokenClaim } from "../../definitions/token.definition";
// import type { Claims } from "./useClaims.definition";

// export const useClaims = (): Claims => {
//   const { claims, setClaims } = useContext(UserContext);

//   const entitlements = useMemo(() => JSON.parse(claims[TokenClaim.Entitlements]), [claims]);
//   const permissions = useMemo(() => JSON.parse(claims[TokenClaim.Permissions]), [claims]);

//   return {
//     userId: claims[TokenClaim.UserId],
//     entitlements,
//     organizationId: claims[TokenClaim.OrganizationId],
//     newClaimOrganizationId: claims[TokenClaim.NewClaimOrganizationId],
//     managedOrganizationId: claims[TokenClaim.ManagedOrganizationId],
//     email: claims.email,
//     permissions,
//     setClaims,
//   };
// };
