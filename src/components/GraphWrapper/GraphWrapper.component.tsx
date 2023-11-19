import { useAuth0 } from "@auth0/auth0-react";
import { isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { authExchange } from "@urql/exchange-auth";
import { isNil } from "lodash";
import { memo, useRef } from "react";
import type { PropsWithChildren } from "react";
import { createClient, errorExchange, fetchExchange, makeOperation, Provider as GraphqlProvider } from "urql";
import { env } from "../../../config/env/env";
import { QueryRequestPolicy } from "../../hooks/useQuery/useQuery.hook";

const GraphWrapperBase = (props: PropsWithChildren): JSX.Element => {
  const { getAccessTokenSilently } = useAuth0();

  const client = useRef(
    createClient({
      url: env.apollo.gatewayUrl,
      requestPolicy: QueryRequestPolicy.NetworkOnly,
      exchanges: [
        authExchange<{ token: string }>({
          getAuth: async ({ authState }) => {
            if (!isNil(authState)) return null;

            const token = await getAccessTokenSilently();
            if (isNullOrWhiteSpace(token)) return null;

            return { token };
          },
          addAuthToOperation: ({ authState, operation }) => {
            const { token } = authState || {};
            if (isNullOrWhiteSpace(token)) {
              return operation;
            }

            const { fetchOptions: contextFetchOptions } = operation?.context || {};
            const fetchOptions =
              typeof contextFetchOptions === "function" ? contextFetchOptions() : contextFetchOptions || {};

            return makeOperation(operation.kind, operation, {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  Authorization: `Bearer ${token}`,
                },
              },
            });
          },
        }),
        errorExchange({
          onError(error) {
            error.message = error.message.replace("[GraphQL] ", "");
          },
        }),
        fetchExchange,
      ],
    }),
  );

  return <GraphqlProvider value={client.current}>{props.children}</GraphqlProvider>;
};

export const GraphWrapper = memo(GraphWrapperBase);
