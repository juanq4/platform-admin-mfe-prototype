import type { CloudFrontRequest, CloudFrontRequestEvent } from "aws-lambda";
import { env } from "../env";

export const handler = async (event: CloudFrontRequestEvent): Promise<unknown> => {
  console.log("Mfe@Edge received event: ", JSON.stringify(event));
  const { request } = event.Records[0].cf;

  if (request.uri.startsWith("/api/eds")) {
    await changeOrigin(request, env.domains.eds);
  } else {
    const [type, businessDomain, ...path] = request.uri.split("/").filter((part) => !!part);
    if (!type || !businessDomain || !path || !path.length) {
      return request;
    }
    await changeOrigin(request, `${businessDomain}.${type}.${env.domains.platform}`, `/${path.join("/")}`);
  }
  return request;
};

function changeOrigin(request: CloudFrontRequest, targetDomain: string, path = "") {
  const { origin, headers } = request;
  //Check if the subdomain has a feature environment (ex: feature.connect.dev.q4inc.com)
  //and add the feature environment name top the custom domain
  if (origin && origin.custom && origin.custom.domainName) {
    const domains = headers["host"][0].value.split(".");
    let environment = "";
    let featureEnvironment = "";
    if (domains.length === 5) {
      featureEnvironment = `${domains[0]}.`;
      environment = `${domains[2]}.`;
    } else if (domains.length === 4) {
      environment = `${domains[1]}.`;
    }
    targetDomain = `${featureEnvironment}${targetDomain.replace("$(ENVIRONMENT)", environment)}`;
    origin.custom.domainName = targetDomain;
    origin.custom.protocol = "https";
    origin.custom.port = 443;

    headers["host"] = [{ key: "host", value: targetDomain }];
    if (path) {
      request.uri = path;
    }
    console.log(`Mfe@Edge change origin to: ${targetDomain}`);
  }
}

export const getCookieValueFromReq = (request: CloudFrontRequest, cookieKey = ""): string | undefined => {
  const headers = request.headers;

  if (!headers?.cookie?.length) return;

  console.log({ cookie: headers?.cookie });

  // search for cookie
  const _versionCookie = headers.cookie.find((_cookie) => (_cookie?.value || "")?.indexOf(cookieKey) > -1);
  if (!_versionCookie?.value) return;

  // attain value from cookie
  let cookieValue;
  (_versionCookie.value.split(";") || []).forEach((_cookieValue) => {
    if (_cookieValue) {
      const cookieParts = _cookieValue.split("=");
      cookieValue = cookieParts?.[1]?.trim();
    }
  });

  return cookieValue;
};
