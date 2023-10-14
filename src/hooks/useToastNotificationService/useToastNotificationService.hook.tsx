import { NotificationService } from "@q4/nimbus-ui";
import { useMemo, useRef } from "react";

export const useToastNotificationService = (): React.MutableRefObject<NotificationService> => {
  const notificationService = useMemo(() => new NotificationService(), []);

  return useRef(notificationService);
};
