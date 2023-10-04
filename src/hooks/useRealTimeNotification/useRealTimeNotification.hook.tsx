import { useMessaging, MessageType } from "@q4/platform-client-sdk-messaging";
import { useEffect, useState } from "react";
import type { Notification } from "../../schemas/generated/graphql";

export const useRealTimeNotification = (): Notification => {
  const [realTimeNotification, setRealTimeNotification] = useState();

  const messaging = useMessaging();

  useEffect(() => {
    messaging.client?.subscribeAndListen({
      messageType: MessageType.InApp,
      listener: setRealTimeNotification,
    });
  }, [messaging.client]);

  return realTimeNotification;
};
