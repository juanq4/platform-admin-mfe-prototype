import { useFlags } from "launchdarkly-react-client-sdk";
import type { Features } from "../../configurations";

// useFlags does not support generic at the moment, we wrap it into a hook to avoid type casting
// Known issue -> https://github.com/launchdarkly/js-sdk-common/issues/32
export const useFeatureFlags = (): Features => {
  const features = useFlags();
  return features as Features;
};
