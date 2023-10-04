import { useAuth0 } from "@auth0/auth0-react";
import { LDProvider } from "launchdarkly-react-client-sdk";
import type { PropsWithChildren } from "react";
import { useContext } from "react";
import { LaunchDarklyConfig } from "../../../config";
import { UserContext } from "../../contexts";

export const FeatureFlagProvider = (props: PropsWithChildren): JSX.Element => {
  const auth0 = useAuth0();
  const { userId, organizationId } = useContext(UserContext);

  return (
    <LDProvider
      {...LaunchDarklyConfig}
      user={{
        key: userId,
        email: auth0.user.email,
        name: auth0.user.name,
        custom: {
          organizationId,
        },
      }}
      {...props}
    />
  );
};
