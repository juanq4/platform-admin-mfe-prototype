import type { Organization } from "../../definitions";

export interface UseManagedByAdminOrganizationResponse {
  isManagedByAdmin: boolean;
  adminOrganizations: Organization[];
  adminOrganizationsLoading: boolean;
}
