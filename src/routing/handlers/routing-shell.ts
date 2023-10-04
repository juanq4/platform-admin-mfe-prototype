import type { CloudFrontRequestEvent, CloudFrontRequest, APIGatewayProxyResult } from "aws-lambda";
import { ErrorMessage, ValidationError } from "../definitions";
import { versionExistsInBucket, getDefaultVersion } from "../utils";
import { getCookieValueFromReq } from "./routing-services";

const SHELL_VERSION_COOKIE_KEY = "x-q4-shell-version";
export const handler = async (event: CloudFrontRequestEvent): Promise<CloudFrontRequest | APIGatewayProxyResult> => {
  const request = event?.Records?.[0]?.cf?.request;

  console.log({ request: JSON.stringify(request) });
  console.log({ headers: JSON.stringify(request?.headers) });

  try {
    let version = getCookieValueFromReq(request, SHELL_VERSION_COOKIE_KEY);
    console.log({ version });

    if (!version) {
      version = await getDefaultVersion();
      console.log({ defaultVersion: version });

      if (!version) {
        return request;
      }
    }

    const versionExists = await versionExistsInBucket(version);
    console.log({ versionExists });

    if (!versionExists) throw new ValidationError(ErrorMessage.VersionNotFound);

    return {
      ...request,
      uri: `/${version}${request.uri}`, // note: request.uri always includes the leading slash (i.e, '/index.html')
    };
  } catch (error) {
    console.error(error);
    return request;
  }
};
