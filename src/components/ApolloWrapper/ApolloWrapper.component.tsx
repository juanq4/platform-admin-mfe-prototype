import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import fetch from "cross-fetch";
import React from "react";
import { env } from "../../../config/env/env";
import type { ApolloWrapperProps } from "./ApolloWrapper.definition";

export const ApolloWrapper = (props: ApolloWrapperProps): React.JSX.Element => {
  const { token, children } = props;

  const authLink = setContext(async (_, { headers }) => ({
    headers: { ...headers, authorization: `Bearer ${token}` },
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

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
