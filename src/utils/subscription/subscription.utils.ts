import type { Organization, User } from "../../definitions";

export function getSubscriptionErrors(
  userActive: User["active"],
  organizationActive: Organization["active"],
): string | null {
  const errors = [];

  if (!userActive) {
    errors.push("user is not active");
  }

  if (!organizationActive) {
    errors.push("organization is not active");
  }

  return errors.length ? errors.join() : null;
}
