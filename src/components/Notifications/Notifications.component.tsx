import { Device, Text, TextPreset, TextTransform, useDeviceConfig } from "@q4/nimbus-ui";
import { memo, useState } from "react";
import { List } from "../List/List.component";
import { NotificationItem } from "../Notifications/NotificationItem/NotificationItem.component";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch.component";
import { notificationsToday, notificationsThisWeek } from "./NotificationItem/__mocks__/data/notificationItems.mock";
import type { NotificationsProps } from "./Notifications.definition";
import { Container, Header, Title, Unread, Content, Footer } from "./Notifications.style";

export const NotificationsBase = ({ title, footer }: NotificationsProps): JSX.Element => {
  const toggleSwitchId = "notifications";
  const { device } = useDeviceConfig();
  const [isUnreadChecked, setIsUnreadChecked] = useState(false);
  const handleToggleSwitchChange = () => setIsUnreadChecked(!isUnreadChecked);
  return (
    <Container>
      <Text preset={TextPreset.H1} transform={TextTransform.Capitalize}>
        notification preferences
      </Text>
      <Header>
        <Title>{title}</Title>
        <Unread>
          <label htmlFor={toggleSwitchId}>{device === Device.Desktop ? "Only show unread" : "Unread only"}</label>
          <ToggleSwitch id={toggleSwitchId} isChecked={isUnreadChecked} onChange={handleToggleSwitchChange} />
        </Unread>
      </Header>
      <Content>
        <List
          header={<span>Today</span>}
          dataSource={notificationsToday}
          renderItem={(item) => <NotificationItem {...item.data} />}
        />
        <List
          header={<span>This Week</span>}
          dataSource={notificationsThisWeek}
          renderItem={(item) => <NotificationItem {...item.data} />}
        />
      </Content>
      <Footer>{footer}</Footer>
    </Container>
  );
};

export const Notifications = memo(NotificationsBase);
