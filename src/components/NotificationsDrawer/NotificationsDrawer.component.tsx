import { Origin, Popover, useVisibility } from "@q4/nimbus-ui";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import NotificationsEmpty from "../../assets/icons/bell-04.svg";
import NotificationsError from "../../assets/icons/bell-06.svg";
import NotificationBellNew from "../../assets/icons/notification-bell-new.svg";
import NotificationBell from "../../assets/icons/notification-bell.svg";
import AllNotifications from "../../assets/icons/rocket.svg";
import XClose from "../../assets/icons/x-close.svg";
import { BroadcastEventType, useBroadcast } from "../../contexts/broadcast";
import { useNotificationList } from "../../hooks/useNotificationList/useNotificationList.hook";
import { useUpdateNotificationMutation } from "../../schemas/generated/graphql";
import { NotificationsPageSize, ToggleMenuButtonId } from "./NotificationsDrawer.definition";
import {
  BottomBar,
  ButtonContainer,
  CloseButton,
  Content,
  Header,
  LoadMoreButton,
  PopoverOptionsContainer,
  Title,
  ToggleMenuButton,
} from "./NotificationsDrawer.style";
import { NotificationsDrawerCard } from "./NotificationsDrawerCard/NotificationsDrawerCard.component";
import { NotificationsDrawerLoading } from "./NotificationsDrawerLoading/NotificationsDrawerLoading.component";
import { NotificationsDrawerMessage } from "./NotificationsDrawerMessage/NotificationsDrawerMessage.component";

const Component = (): JSX.Element => {
  const [cursor, setCursor] = useState("");

  const [isVisible, handleShow, handleHide] = useVisibility();
  const { isLoading, hasError, data, onUpdateReadState } = useNotificationList(cursor, NotificationsPageSize);
  const [updateNotification] = useUpdateNotificationMutation();
  const channel = useBroadcast();

  const handleToggleMenuButtonClick = useCallback(
    () => (isVisible ? handleHide() : handleShow()),
    [isVisible, handleHide, handleShow],
  );

  const hasMoreNotifications = useMemo(() => isLoading || data.notifications.length < data.totalCount, [isLoading, data]);

  const handleLoadMoreClick = () => {
    const cursor = data.notifications[data.notifications.length - 1].id;
    setCursor(cursor);
  };

  const handleReadStateChange = useCallback(
    (notificationId: string, isRead: boolean) => {
      onUpdateReadState(notificationId);
      updateNotification({
        variables: { markRead: isRead, notificationId },
        onError: console.error,
        onCompleted: () => {
          channel.postMessage(
            JSON.stringify({ type: BroadcastEventType.NotificationListUpdated, data: { notificationId, isRead } }),
          );
        },
      });
    },
    [channel, onUpdateReadState, updateNotification],
  );

  const handleListUpdated = useCallback(
    (event: unknown) => {
      try {
        const payload = JSON.parse(event as string);
        if (payload.type === BroadcastEventType.NotificationListUpdated) {
          onUpdateReadState(payload.data.notificationId);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [onUpdateReadState],
  );

  useEffect(() => {
    channel.addEventListener("message", handleListUpdated);
    return () => {
      channel.removeEventListener("message", handleListUpdated);
    };
  });

  return (
    <>
      <ToggleMenuButton id={ToggleMenuButtonId} onClick={handleToggleMenuButtonClick}>
        <img
          src={data.totalUnreadCount ? NotificationBellNew : NotificationBell}
          alt={`${data.totalUnreadCount ? "new" : ""} notifications icon`}
        />
      </ToggleMenuButton>
      <Popover
        anchorTargetElementId={ToggleMenuButtonId}
        focusOnProps={{ enabled: false }}
        targetOrigin={Origin.BottomRight}
        visible={isVisible}
        onCloseRequest={handleHide}
      >
        <PopoverOptionsContainer>
          <CloseButton onClick={handleHide}>
            <img src={XClose} alt="close notifications drawer" />
          </CloseButton>
          <Header>
            <Title>Notifications</Title>
          </Header>
          <Content>
            {isLoading && !data.notifications.length && <NotificationsDrawerLoading />}
            {hasError && !data.notifications.length && (
              <NotificationsDrawerMessage
                image={NotificationsError}
                message="Unable to load notifications"
                details="Refresh the page."
              />
            )}
            {!hasError && !isLoading && !data.notifications.length && (
              <NotificationsDrawerMessage
                image={NotificationsEmpty}
                message="No notifications to show"
                details="We'll let you know if anything changes."
              />
            )}
            {data.notifications.map((notification) => (
              <NotificationsDrawerCard key={notification.id} {...notification} onReadStateChange={handleReadStateChange} />
            ))}
            {hasMoreNotifications && (
              <ButtonContainer>
                <LoadMoreButton label="Load more" loading={isLoading} onClick={handleLoadMoreClick} />
              </ButtonContainer>
            )}
            {!hasMoreNotifications && data.totalCount > NotificationsPageSize && (
              <NotificationsDrawerMessage
                image={AllNotifications}
                details={
                  <>
                    These are all of your notifications <br /> from the last 90 days.
                  </>
                }
              />
            )}
          </Content>
          <BottomBar />
        </PopoverOptionsContainer>
      </Popover>
    </>
  );
};

export const NotificationsDrawer = memo(Component);
