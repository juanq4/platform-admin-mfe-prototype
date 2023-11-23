import type { LDFlagSet } from "launchdarkly-js-sdk-common";

export enum FeatureFlag {
  AdminClientAccountAccess = "admin-client-account-access",
  AdminUserManagement = "admin-user-management",
  AgencyTeams = "cc-admin-agency-teams",
}

export interface Features extends LDFlagSet {
  [FeatureFlag.AdminClientAccountAccess]: boolean;
  [FeatureFlag.AdminUserManagement]: boolean;
  [FeatureFlag.AgencyTeams]: boolean;
}
