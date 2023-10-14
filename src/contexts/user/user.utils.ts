import type { Organization } from "../../definitions";

// It is easier to mock this helper function than it is to mock pendo
export const updatePendoOrganization = (organization: Organization): void => {
  const { name, type, entitlements } = organization;

  // Properties keys should be written in such way that improves Pendo experience
  const organizationOptions = {
    "Organization name": name,
    "Organization type": type,
    "Organization entitlements": entitlements,
  };

  pendo?.updateOptions?.({ visitor: organizationOptions, account: organizationOptions });
};
