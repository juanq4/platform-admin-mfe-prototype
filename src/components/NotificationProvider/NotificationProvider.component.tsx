import { MessagingProvider } from "@q4/platform-client-sdk-messaging";
import { Environment } from "@q4/platform-sdk-definitions";
import type { PropsWithChildren } from "react";
import { env } from "../../../config/env/env";
import { useUser } from "../../contexts";
import { useNotificationToken } from "../../hooks/useNotificationToken/useNotificationToken.hook";

export const NotificationProvider = (props: PropsWithChildren): JSX.Element => {
  const user = useUser();
  const token = useNotificationToken();

  const environment = env.appEnv === "local" ? Environment.Development : (env.appEnv as Environment);

  return (
    <MessagingProvider
      environment={environment}
      organizationId={user.organizationId}
      userId={user.userId}
      vendorConfig={{ authKey: token }}
    >
      {props.children}
    </MessagingProvider>
  );
};
