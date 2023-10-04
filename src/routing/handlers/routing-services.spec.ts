// eslint-disable-next-line import/order
import type { CloudFrontRequestEvent } from "aws-lambda";
import { handler } from "./routing-services";

const nonFeatureSourceDomainName = "connect.dev.q4inc.com";
const featureSourceDomainName = "feature.connect.dev.q4inc.com";

const remoteEntryUri = "/mfe/engagement/remoteEntry.js";
const standaloneAppUri = "/mfe/scheduler/standalone/email/index.html";
const edsUri = "/api/eds";

const mockToken = "Bearer jwtdata";

describe("routing", () => {
  let event: CloudFrontRequestEvent;

  it("9171014: [Given] data is missing from uri [Then] expect return request without modifying origin", async () => {
    event = createEvent(false, remoteEntryUri);

    const actual = await handler(event);

    expect(actual).toEqual(
      expect.objectContaining({
        origin: {
          custom: {
            customHeaders: {},
            domainName: nonFeatureSourceDomainName,
            keepaliveTimeout: 5,
            path: "",
            port: 80,
            protocol: "http",
            readTimeout: 30,
            sslProtocols: ["TLSv1.2"],
          },
        },
      }),
    );
  });

  it("9171015: [Given] data is provided in header [Then] expect return request with modified origin", async () => {
    event = createEvent(true, remoteEntryUri);

    const actual = await handler(event);

    expect(actual).toEqual(
      expect.objectContaining({
        headers: {
          authorization: [
            {
              value: mockToken,
              key: "Authorization",
            },
          ],
          host: [
            {
              key: "host",
              value: "engagement.mfe.dev.platform.q4inc.com",
            },
          ],
        },
        origin: {
          custom: {
            customHeaders: {},
            domainName: "engagement.mfe.dev.platform.q4inc.com",
            keepaliveTimeout: 5,
            path: "",
            port: 443,
            protocol: "https",
            readTimeout: 30,
            sslProtocols: ["TLSv1.2"],
          },
        },
        uri: "/remoteEntry.js",
      }),
    );
  });

  it("9171016: [Given] data is provided in header [When] the requested URL is a standalone app URL [Then] expect return request with modified origin", async () => {
    event = createEvent(true, standaloneAppUri);

    const actual = await handler(event);

    expect(actual).toEqual(
      expect.objectContaining({
        headers: {
          authorization: [
            {
              value: mockToken,
              key: "Authorization",
            },
          ],
          host: [
            {
              key: "host",
              value: "scheduler.mfe.dev.platform.q4inc.com",
            },
          ],
        },
        origin: {
          custom: {
            customHeaders: {},
            domainName: "scheduler.mfe.dev.platform.q4inc.com",
            keepaliveTimeout: 5,
            path: "",
            port: 443,
            protocol: "https",
            readTimeout: 30,
            sslProtocols: ["TLSv1.2"],
          },
        },
        uri: "/standalone/email/index.html",
      }),
    );
  });

  it("9171017: [Given] data is provided in header [When] the requested URL begins with /api/eds [AND] the connect domain not contain a feature ENV [Then] expect return request with modified origin without a feature env", async () => {
    event = createEvent(true, edsUri);

    const actual = await handler(event);

    expect(actual).toEqual(
      expect.objectContaining({
        headers: {
          authorization: [
            {
              value: mockToken,
              key: "Authorization",
            },
          ],
          host: [
            {
              key: "host",
              value: "eds.api.dev.platform.q4inc.com",
            },
          ],
        },
        origin: {
          custom: {
            customHeaders: {},
            domainName: "eds.api.dev.platform.q4inc.com",
            keepaliveTimeout: 5,
            path: "",
            port: 443,
            protocol: "https",
            readTimeout: 30,
            sslProtocols: ["TLSv1.2"],
          },
        },
        uri: "/api/eds",
      }),
    );
  });

  it("9171018: [Given] data is provided in header [When] the requested URL begins with /api/eds [AND] the connect domain contains a feature ENV [Then] expect return request with modified origin with a feature env", async () => {
    event = createEvent(true, edsUri, true);

    const actual = await handler(event);

    expect(actual).toEqual(
      expect.objectContaining({
        headers: {
          authorization: [
            {
              value: mockToken,
              key: "Authorization",
            },
          ],
          host: [
            {
              key: "host",
              value: "feature.eds.api.dev.platform.q4inc.com",
            },
          ],
        },
        origin: {
          custom: {
            customHeaders: {},
            domainName: "feature.eds.api.dev.platform.q4inc.com",
            keepaliveTimeout: 5,
            path: "",
            port: 443,
            protocol: "https",
            readTimeout: 30,
            sslProtocols: ["TLSv1.2"],
          },
        },
        uri: "/api/eds",
      }),
    );
  });
});

function createEvent(hasUri = true, uri = remoteEntryUri, isFeatureEnvironment = false) {
  return {
    Records: [
      {
        cf: {
          request: {
            headers: {
              authorization: [
                {
                  value: mockToken,
                  key: "Authorization",
                },
              ],
              host: [
                {
                  key: "Host",
                  value: isFeatureEnvironment ? featureSourceDomainName : nonFeatureSourceDomainName,
                },
              ],
            },
            origin: {
              custom: {
                customHeaders: {},
                domainName: isFeatureEnvironment ? featureSourceDomainName : nonFeatureSourceDomainName,
                keepaliveTimeout: 5,
                path: "",
                port: 80,
                protocol: "http",
                readTimeout: 30,
                sslProtocols: ["TLSv1.2"],
              },
            },
            uri: hasUri ? uri : "",
          },
          config: { distributionId: "" },
        },
      },
    ],
  } as never;
}
