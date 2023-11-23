import { isEmpty, isNil } from "@q4/nimbus-ui";
import type { Features } from "../../configurations/feature.configuration";

// Current logic is
// if the featureFlag does not exist, assume the feature is true
// if the features object is empty assume the feature is false
export function isFeatureTrue(features?: Partial<Features>, featureFlag?: string): boolean {
  if (isNil(featureFlag)) return true;
  if (isEmpty(features)) return false;
  return features[featureFlag];
}
