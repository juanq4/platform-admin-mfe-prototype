import "../../../node_modules/@q4/nimbus-ui/dist/_styles.css";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import styled from "@emotion/styled";
import { ErrorBoundary, Fallback } from "@q4/nimbus-ui";
import type { MfeProps } from "@q4/platform-definitions";
import fetch from "cross-fetch";
import React from "react";
import { env } from "../../../config/env/env";
import { useVersionTag } from "../../hooks";
import { HelloWorld } from "./helloWorld/helloWorld.component";
import { checkMfeProps } from "./sampleModule.utils";

const apolloClient = new ApolloClient({
  uri: env.apollo.gatewayUrl,
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: "/graphql", fetch }),
});

const Container = styled.div`
  background-color: #7dd864;

  .sample-text {
    color: #8100b8;
  }

  .button {
    display: none;
  }
`;

const CustomFallback = () => {
  return <Fallback email="capital-connect-support@q4inc.com" />;
};

export const defaultSampleModuleProps: MfeProps = {
  context: {
    userId: "seed-user-id",
    organization: {
      id: "org",
      name: "org",
      entitlements: [],
      identifiers: [],
      q4SecurityId: "",
    },
    role: [],
    roles: [],
    entitlements: [],
    claims: {
      __raw: "token",
      email: "seed_user@q4inc.com",
      email_verified: false,
      name: "seed user",
      nickname: "seed",
    },
  },
  token: "token",
  history: {} as History,
  onError: () => {
    return;
  },
  permissions: [],
  brand: "peacock",
  user: {
    active: true,
    email: "seed_user@q4inc.com",
    firstName: "seed",
    friendlyName: "user",
    id: "user-id",
    lastName: "user",
    title: "",
  },
};

const SampleModule = (props: MfeProps = defaultSampleModuleProps): JSX.Element => {
  checkMfeProps(props);

  useVersionTag();

  return (
    <ErrorBoundary FallbackComponent={CustomFallback}>
      <Container className="seed__container">
        <ApolloProvider client={apolloClient}>
          <HelloWorld />
        </ApolloProvider>
      </Container>
    </ErrorBoundary>
  );
};

export { SampleModule };

export default SampleModule;
