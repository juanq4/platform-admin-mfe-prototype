import { DefaultPrivacyLevel } from "@datadog/browser-rum";
import { Environment } from "@q4/platform-sdk-definitions";
// import DevConfig from "./config.dev.json";
// import FeatureConfig from "./config.feature.json";
// import LocalConfig from "./config.local.json";
// import ProdConfig from "./config.prod.json";
// import StageConfig from "./config.stage.json";

declare global {
  function getConfigEnvironment(): string;
}

// bypass config environment for e2e tests
const configEnv = "local"; // process.env.TARGET_STAGE === "test" ? "local" : getConfigEnvironment();

// const config =
//   {
//     dev: DevConfig,
//     local: LocalConfig,
//     feature: FeatureConfig,
//     stage: StageConfig,
//     prod: ProdConfig,
//   }[configEnv] || LocalConfig;

const domainName = ""; // config.PLATFORM_SHELL_HOSTED_ZONE || window.location.origin;

const roleLabelSuffixes = {
  [Environment.Production as string]: "",
  [Environment.Stage as string]: "[STAGE]",
  [Environment.Development as string]: "[DEV]",
};

export const env = {
  apollo: {
    gatewayUrl: domainName + "/api/eds",
  },
  // TODO: This is a temporary fix until our configEnv is set up correctly for new pipeline deploys (as TARGET_STAGE is no longer passed in for dev, stage, prod)
  appEnv: (process.env.TARGET_STAGE === Environment.Test ? "test" : configEnv) || Environment.Debug,
  appName: "platform-shell",
  appUrl: domainName,
  appVersion: process.env.npm_package_version,
  auth0: {
    clientId: "", // config.AUTH0_CLIENT_ID,
    domain: "", // config.AUTH0_DOMAIN,
    audience: "", // config.AUTH0_AUDIENCE,
  },
  dataDog: {
    site: "datadoghq.com",
    applicationId: "eebe8fb4-ebe8-4887-88a0-68b7f8838246",
    clientToken: "pub5a1fe23f3632320415dcacca62c79623",
    defaultPrivacyLevel: DefaultPrivacyLevel.MASK_USER_INPUT,
    sampleRate: 0,
    premiumSampleRate: 0,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackInteractions: true,
  },
  favIcon: `https://connect.${
    configEnv === "prod" ? "" : `${configEnv}.`
  }q4inc.com/shared/assets/cc-login/favicon.ico?peacock`,
  helpCenter: {
    url: "", // config.HELP_CENTER_URL,
  },
  launchDarkly: {
    featureFlag: {
      clientSideId: "", // config.LAUNCHDARKLY_CLIENT_SIDE_ID,
    },
    versionManager: {
      clientSideId: "", // config.LAUNCHDARKLY_VERSION_MANAGER_CLIENT_SIDE_ID,
    },
  },
  q4Desktop: {
    mobile: {
      androidUrl: "https://play.google.com/store/apps/details?id=com.q4inc.connect.mobile",
      iosUrl: "https://apps.apple.com/us/app/q4-go/id1632059817?platform=iphone",
    },
    url: "", // config.Q4_DESKTOP_URL,
  },
  role: {
    audience: "", // config.AUTH0_ROLE_AUDIENCE,
    labelSuffix: roleLabelSuffixes[configEnv] ?? "[DEV]",
  },
  analytics: {
    postHog: {
      key: "", // config.POST_HOG_API_KEY,
      apiHost: "https://app.posthog.com",
      proxyPath: "ph",
    },
  },
  userGuides: {
    scriptUrl: "", // config.WALKME_SCRIPT_URL,
  },
};
