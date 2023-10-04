import type { ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";
import type { APIGatewayProxyResult } from "aws-lambda";
import fetch from "node-fetch";
import { ErrorMessage } from "../definitions";
import { versionExistsInBucket, listS3Objects, getDefaultVersion } from "../utils";
import { handler } from "./routing-shell";

jest.mock("node-fetch", () => jest.fn());
jest.mock("../utils/s3checks");
jest.mock("../utils/versionManager");

const checkBucketExistsMock = versionExistsInBucket as jest.Mock;
const listS3ObjectsMock = listS3Objects as jest.Mock;
const getDefaultVersionMock = getDefaultVersion as jest.Mock;

const sourceDomainName = "connect.q4inc.com";
const version101 = "1.0.1";
const versionNonExist = "non exist";

const mockBucketResponse = {
  CommonPrefixes: [
    {
      Prefix: "1.0.1/",
    },
  ],
} as unknown as Promise<ListObjectsV2CommandOutput>;

const defaultRequest = {
  headers: {
    authorization: [
      {
        value: "Bearer jwtdata",
        key: "Authorization",
      },
    ],
    host: [
      {
        key: "Host",
        value: sourceDomainName,
      },
    ],
  },
  origin: {
    custom: {
      customHeaders: {},
      domainName: sourceDomainName,
      keepaliveTimeout: 5,
      path: "",
      port: 80,
      protocol: "http",
      readTimeout: 30,
      sslProtocols: ["TLSv1.2"],
    },
  },
  uri: "/index.html",
};

const requestWithVersion = (version = version101) => {
  return {
    ...defaultRequest,
    headers: {
      ...defaultRequest.headers,
      cookie: [
        {
          value: `x-q4-shell-version=${version}`,
        },
      ],
    },
  };
};

describe("routing-shell", () => {
  it("9171019: [Given] the version manager api is unavailable [Expect] request to be returned with root path", async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockRejectedValue({});

    const event = createEvent(defaultRequest);
    const response = await handler(event);

    expect(response).toEqual(expect.objectContaining(defaultRequest));
  });

  it("9171020: [Given] a version is present in the cookie and the version folder exists in the s3 bucket [Then] expect the correct path be passed", async () => {
    const requestWithVersion101 = requestWithVersion();
    checkBucketExistsMock.mockReturnValue(true);
    listS3ObjectsMock.mockResolvedValueOnce(mockBucketResponse);

    const event = createEvent(requestWithVersion101);
    const response = await handler(event);

    expect(response).toEqual({
      ...requestWithVersion101,
      uri: `/${version101}${requestWithVersion101.uri}`,
    });
  });

  it("9171021: [Given] a version is not present in the cookie [Then] expect default version to be returned from version manager and correct path be passed", async () => {
    const defaultVersion = "1.0.1";
    getDefaultVersionMock.mockResolvedValue(defaultVersion);
    listS3ObjectsMock.mockResolvedValueOnce(mockBucketResponse);

    const event = createEvent(defaultRequest);
    const response = await handler(event);

    expect(response).toEqual(expect.objectContaining({ ...defaultRequest, uri: `/${defaultVersion}${defaultRequest.uri}` }));
  });

  it.skip("9171022: [Given] no folder corresponding to version cookie exists [Then] return a 4xx status code", async () => {
    checkBucketExistsMock.mockReturnValue(false);
    listS3ObjectsMock.mockResolvedValueOnce({
      ...mockBucketResponse,
      Contents: [{ ...(await mockBucketResponse)?.CommonPrefixes?.[0], Prefix: "1.0.0" }],
    });

    const event = createEvent(requestWithVersion(versionNonExist));
    const response = (await handler(event)) as APIGatewayProxyResult;

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(JSON.stringify({ success: false, message: ErrorMessage.VersionNotFound }));
  });

  it.skip("9171023: [Given] handler execution encounters an error [Then] return a 5xx status code", async () => {
    checkBucketExistsMock.mockRejectedValue(new Error(ErrorMessage.ServerError));
    const event = createEvent(requestWithVersion());
    const response = (await handler(event)) as APIGatewayProxyResult;

    expect(response?.statusCode).toBe(500);
    expect(response?.body).toEqual(JSON.stringify({ success: false, message: ErrorMessage.ServerError }));
  });

  it.skip("9171024: [Given] a bucket error is thrown [Then] return a 5xx status code", async () => {
    listS3ObjectsMock.mockRejectedValue(new Error(ErrorMessage.ServerError));
    const event = createEvent(requestWithVersion());
    const response = (await handler(event)) as APIGatewayProxyResult;

    expect(response?.statusCode).toBe(500);
    expect(response?.body).toEqual(JSON.stringify({ success: false, message: ErrorMessage.ServerError }));
  });
});

function createEvent(request = defaultRequest) {
  return {
    Records: [
      {
        cf: {
          request,
          config: { distributionId: "" },
        },
      },
    ],
  } as never;
}
