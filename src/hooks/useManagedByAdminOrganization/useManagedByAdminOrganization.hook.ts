import { OrganizationType } from "@q4/platform-definitions";
import { useMemo } from "react";
import type { Organization } from "../../definitions/organization.definition";
import { useOrganizationsQuery } from "../../schemas/generated/graphql";
import type { UseManagedByAdminOrganizationResponse } from "./useManagedByAdminOrganization.definition";

export const useManagedByAdminOrganization = (organization: Organization): UseManagedByAdminOrganizationResponse => {
  const adminOrganizationsResponse = useOrganizationsQuery({
    variables: { type: OrganizationType.ADMIN, active: true },
  });

  const adminOrganizations = useMemo(
    () => adminOrganizationsResponse?.data?.organizations.items || [],
    [adminOrganizationsResponse?.data?.organizations.items],
  );

  const isManagedByAdmin = adminOrganizations?.some((adminOrg: Organization) =>
    organization?.delegateOrganizationIds?.includes(adminOrg.id),
  );

  return {
    isManagedByAdmin,
    adminOrganizations,
    adminOrganizationsLoading: adminOrganizationsResponse?.loading,
  };
};
