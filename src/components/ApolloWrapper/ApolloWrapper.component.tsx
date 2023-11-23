import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import fetch from "cross-fetch";
import type { PropsWithChildren } from "react";
import React from "react";
import { env } from "../../../config/env/env";
import { useSessionContext } from "../../hooks/useSessionContext/useSessionContext.hook";

export const ApolloWrapper = (props: PropsWithChildren): React.JSX.Element => {
  const session = useSessionContext();

  const authLink = setContext(async (_, { headers }) => ({
    headers: { ...headers, authorization: `Bearer ${session.token}` },
  }));

  const httpLink = createHttpLink({
    uri: env.apollo.gatewayUrl,
    fetch,
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
    },
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
