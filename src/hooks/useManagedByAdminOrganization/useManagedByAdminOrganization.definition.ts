import type { Organization } from "../../definitions/organization.definition";

export interface UseManagedByAdminOrganizationResponse {
  isManagedByAdmin: boolean;
  adminOrganizations: Organization[];
  adminOrganizationsLoading: boolean;
}
