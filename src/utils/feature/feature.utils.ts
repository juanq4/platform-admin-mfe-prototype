import type { User } from "@auth0/auth0-react";
import { isEmpty, isNil } from "@q4/nimbus-ui";
import type { CrossSellingLink, Features } from "../../configurations";

// Current logic is
// if the featureFlag does not exist, assume the feature is true
// if the features object is empty assume the feature is false
export function isFeatureTrue(features?: Partial<Features>, featureFlag?: string): boolean {
  if (isNil(featureFlag)) return true;
  if (isEmpty(features)) return false;
  return features[featureFlag];
}

export function createCrossSellingPath(
  link: CrossSellingLink,
  user: User,
  organizationId: string,
  organizationName: string,
): string {
  const userData = {
    email: user.email,
    org_id: organizationId,
    org_name: organizationName,
    first_name: user.firstName,
    last_name: user.lastName,
  };
  return `${link.url}?${new URLSearchParams(userData).toString()}`;
}
