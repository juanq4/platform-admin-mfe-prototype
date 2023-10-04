import { Text, TextPreset } from "@q4/nimbus-ui";
import { MfeApp } from "../../MfeApp/MfeApp.component";
import { MfeKey } from "../../MfeApp/MfeApp.definition";
import type { NotificationPreferencesItemProps } from "./NotificationPreferencesItem.definition";
import { Container, MfeWrapper } from "./NotificationPreferencesItem.style";

export const notificationTitles: Record<string, string> = {
  [MfeKey.EngagementAnalyticsNotification]: "Engagement Analytics",
};

const NotificationPreferencesItem = (props: NotificationPreferencesItemProps): JSX.Element => {
  const { id } = props;

  return (
    <Container>
      <Text preset={TextPreset.H3}>{notificationTitles[id]}</Text>
      <MfeWrapper>
        <MfeApp id={id}></MfeApp>
      </MfeWrapper>
    </Container>
  );
};

export { NotificationPreferencesItem };
