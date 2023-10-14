import { Permission } from "@q4/platform-definitions";

export const MockQ4AdminPermissions = [
  Permission.ReadUsers,
  Permission.ManageUsers,
  Permission.ReadOrgs,
  Permission.ManageOrgs,
];

export const MockQ4SupportPermissions = [Permission.ReadUsers, Permission.ReadOrgs, Permission.ManageOrgs];

export const MockCorporateAdminPermissions = [Permission.ReadUsers, Permission.ManageUsers];

export const MockCorporateSupportPermissions: Permission[] = [];
