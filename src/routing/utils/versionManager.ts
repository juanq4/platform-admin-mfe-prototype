import fetch from "node-fetch";
import { env } from "../env";

const { apiKey, environment, domains } = env;

const url = `${domains.versionManager}/v1/services/platform-shell/publications/default/${environment}`;

export const getDefaultVersion = (): Promise<string | null> => {
  console.log({ url, apiKey });
  return fetch(url, {
    method: "get",
    headers: { "x-api-key": apiKey },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log({ data });

      return data?.data?.version || null;
    })
    .catch((err) => {
      console.error(err);
      // Do not throw error - instead send back null so the root version will be returned to user
      return null;
    });
};
