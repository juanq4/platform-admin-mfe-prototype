const platformDomain = "$(ENVIRONMENT)platform.q4inc.com";
export const env = {
  environment: process.env.environment || "dev",
  port: Number(process.env.PORT) || 4000,
  domains: {
    platform: platformDomain,
    eds: `eds.api.${platformDomain}`,
    versionManager:
      process.env.PLATFORM_VERSION_MANAGER_BASE_URL || "https://9oryff11ol.execute-api.us-east-1.amazonaws.com/dev",
  },
  // dev version manager api key can be retrieved from q4platform-dev-admins API gateway > API Keys
  apiKey: process.env.PLATFORM_VERSION_MANAGER_XAPI_KEY || "",
};
