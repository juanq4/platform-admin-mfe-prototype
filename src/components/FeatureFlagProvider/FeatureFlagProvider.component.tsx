import { LDProvider } from "launchdarkly-react-client-sdk";
import type { PropsWithChildren } from "react";
import { useSession } from "../../contexts/session/useSession.hook";

// TODO: create project in launchdarkly
export const FeatureFlagProvider = (props: PropsWithChildren): JSX.Element => {
  const session = useSession();

  return (
    <LDProvider
      clientSideID="62154708fbcd54151df7aca2"
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
