import { isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { RoleLabel } from "../../definitions/role.definition";

export function generateRoleLabel(role: RoleLabel, label?: string): string {
  if (isNullOrWhiteSpace(label)) return role;
  return `${role} ${label}`;
}
