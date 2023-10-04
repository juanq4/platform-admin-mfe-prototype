import { OrganizationType } from "@q4/platform-definitions";
import type { Organization, User } from "../../definitions";
import type { Claims } from "../../hooks/useClaims";

export const getAccountErrors = (claims: Claims, user: Partial<User>, org: Organization): string | null => {
  const errors = [];

  if (!claims?.organizationId) {
    errors.push("missing organizationId claim");
  }

  if (!claims?.userId) {
    errors.push("missing userId claim");
  }

  if (!claims?.email) {
    errors.push("missing email claim");
  }

  if (org?.type === OrganizationType.CORP && !claims?.entitlements?.length) {
    errors.push("missing entitlements claim");
  }

  if (!user?.roles?.length) {
    errors.push("missing user roles");
  }

  return errors.length ? errors.join() : null;
};
