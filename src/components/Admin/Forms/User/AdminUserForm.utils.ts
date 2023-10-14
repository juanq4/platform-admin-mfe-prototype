import { isEmpty, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { User } from "../../../../definitions/user.definition";

export function getAdminFormUser<T = User>(user: T, organizationId: User["organizationId"]): T {
  if (isEmpty(user) || isNullOrWhiteSpace(organizationId)) return null;
  return { ...user, organizationId };
}
