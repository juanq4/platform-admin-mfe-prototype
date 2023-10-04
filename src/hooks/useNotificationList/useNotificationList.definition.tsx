import type { Notification } from "../../schemas/generated/graphql";

export type UseNotificationListResponse = {
  isLoading: boolean;
  hasError: boolean;
  data: {
    notifications: Notification[];
    totalCount: number;
    totalUnreadCount: number;
  };
  onUpdateReadState: (notificationId: string) => void;
};
