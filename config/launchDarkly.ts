import { env } from "./env/env";

export const LaunchDarklyConfig = {
  clientSideID: env.launchDarkly.featureFlag.clientSideId,
  options: {
    fetchGoals: false,
  },
  reactOptions: {
    useCamelCaseFlagKeys: false,
  },
};
