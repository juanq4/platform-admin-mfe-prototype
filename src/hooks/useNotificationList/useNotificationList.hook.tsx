import { useEffect, useState } from "react";
import type { Notification } from "../../schemas/generated/graphql";
import { useNotificationListLazyQuery } from "../../schemas/generated/graphql";
import { useRealTimeNotification } from "../useRealTimeNotification/useRealTimeNotification.hook";
import type { UseNotificationListResponse } from "./useNotificationList.definition";

export const useNotificationList = (notificationId: string, pageSize: number): UseNotificationListResponse => {
  const [data, setData] = useState({ notifications: [], totalCount: 0, totalUnreadCount: 0 });

  const realTimeNotification = useRealTimeNotification();
  const [notificationListLazyQuery, response] = useNotificationListLazyQuery();

  useEffect(() => {
    (async () => {
      const lazyResponse = await notificationListLazyQuery({
        variables: { notificationId, pageSize },
        fetchPolicy: "no-cache",
      });
      const { items = [], totalCount, totalUnreadCount } = lazyResponse?.data?.notificationList || {};
      setData({ notifications: [...data.notifications, ...items], totalCount, totalUnreadCount });
    })();
  }, [notificationId, pageSize]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (realTimeNotification) {
      setData({
        notifications: [realTimeNotification, ...data.notifications],
        totalCount: data.totalCount + 1,
        totalUnreadCount: data.totalUnreadCount + 1,
      });
    }
  }, [realTimeNotification]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdateReadState = (notificationId: string) => {
    let totalUnreadCount = 0;

    const notifications = data.notifications.map((notification: Notification) => {
      if (notification.id === notificationId) {
        if (notification.readAt) {
          totalUnreadCount++;
          return { ...notification, readAt: null };
        } else {
          totalUnreadCount--;
          return { ...notification, readAt: new Date().toISOString() };
        }
      } else {
        return notification;
      }
    });

    setData({ ...data, notifications, totalUnreadCount: data.totalUnreadCount + totalUnreadCount });
  };

  return {
    isLoading: response.loading,
    hasError: !!response.error,
    data,
    onUpdateReadState: handleUpdateReadState,
  };
};
