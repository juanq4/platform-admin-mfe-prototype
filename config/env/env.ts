import { Environment } from "@q4/platform-sdk-definitions";
import DevConfig from "./config.dev.json";
import FeatureConfig from "./config.feature.json";
import LocalConfig from "./config.local.json";
import ProdConfig from "./config.prod.json";
import StageConfig from "./config.stage.json";

declare global {
  function getConfigEnvironment(): string;
}

const configEnv = process.env.TARGET_STAGE === "test" ? "local" : getConfigEnvironment();

const config =
  {
    dev: DevConfig,
    local: LocalConfig,
    feature: FeatureConfig,
    stage: StageConfig,
    prod: ProdConfig,
  }[configEnv] || LocalConfig;

const roleLabelSuffixes = {
  [Environment.Production as string]: "",
  [Environment.Stage as string]: "[STAGE]",
  [Environment.Development as string]: "[DEV]",
};

export const env = {
  apollo: {
    gatewayUrl: config.Q4_PLATFORM_GATEWAY_URL || window.location.origin + "/api/eds",
  },
  appEnv: (process.env.TARGET_STAGE === Environment.Test ? "test" : configEnv) || Environment.Debug,
  launchDarkly: {
    featureFlag: {
      clientSideId: config.LAUNCHDARKLY_CLIENT_SIDE_ID,
    },
  },
  role: {
    labelSuffix: roleLabelSuffixes[configEnv] ?? "[DEV]",
  },
};
