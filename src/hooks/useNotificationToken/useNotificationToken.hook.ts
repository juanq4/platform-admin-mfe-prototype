import { useState, useEffect } from "react";
import { useNotificationTokenMutation } from "../../schemas/generated/graphql";

export const useNotificationToken = (): string => {
  const [token, setToken] = useState<string>("");

  const [notificationTokenMutation] = useNotificationTokenMutation();

  useEffect(() => {
    (async () => {
      const { data } = await notificationTokenMutation();
      if (data?.notificationToken?.token) {
        setToken(data.notificationToken.token);
      }
    })();
  }, [notificationTokenMutation]);

  return token;
};
