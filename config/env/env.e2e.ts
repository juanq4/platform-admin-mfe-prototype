import DevConfig from "./config.dev.json";
import FeatureConfig from "./config.feature.json";
import LocalConfig from "./config.local.json";
import ProdConfig from "./config.prod.json";
import StageConfig from "./config.stage.json";

const appUrl = process.env.ENVIRONMENT_URL || "http://localhost:3000";
const configEnv = process.env.ENVIRONMENT || "local";

const config = {
  dev: DevConfig,
  local: LocalConfig,
  feature: FeatureConfig,
  stage: StageConfig,
  prod: ProdConfig,
}[configEnv];

if (!appUrl) {
  throw new Error("Platform shell URL is missing.");
}

export const e2eEnv = {
  username: process.env.AUTOMATION_TEST_USER_EMAIL,
  password: process.env.AUTOMATION_TEST_USER_PASSWORD,
  appUrl: new URL(appUrl).origin,
  auth0ManagementApiUrl: config.AUTH0_MANAGEMENT_API_URL,
  auth0ManagementClientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  auth0ManagementClientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  environment: configEnv,
};
