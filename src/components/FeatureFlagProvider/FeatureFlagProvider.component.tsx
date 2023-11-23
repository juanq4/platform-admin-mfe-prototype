import { LDProvider } from "launchdarkly-react-client-sdk";
import type { PropsWithChildren } from "react";
import { LaunchDarklyConfig } from "../../../config/launchDarkly/launchDarkly";
import { useSessionContext } from "../../hooks/useSessionContext/useSessionContext.hook";

export const FeatureFlagProvider = (props: PropsWithChildren): JSX.Element => {
  const session = useSessionContext();

  return (
    <LDProvider
      clientSideID={LaunchDarklyConfig.clientSideID}
      context={{
        kind: "user",
        key: session.user.id,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        email: session.user.email,
      }}
      options={{ fetchGoals: false }}
      {...props}
    />
  );
};
