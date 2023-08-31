import DevConfig from "./config.dev.json";
import LocalConfig from "./config.local.json";
import ProdConfig from "./config.prod.json";
import StageConfig from "./config.stage.json";

declare global {
  function getConfigEnvironment(): string;
}

let configEnv = "local";
if (typeof getConfigEnvironment === "function") {
  configEnv = getConfigEnvironment();
}

const config =
  {
    local: LocalConfig,
    dev: DevConfig,
    stage: StageConfig,
    prod: ProdConfig,
  }[configEnv] || LocalConfig;

export enum Environment {
  Test = "test",
  Debug = "debug",
  Development = "dev",
  Stage = "stage",
  Production = "prod",
}

export const env = {
  apollo: {
    gatewayUrl: config.Q4_PLATFORM_GATEWAY_URL || window.location.origin + "/api/eds",
  },
};
