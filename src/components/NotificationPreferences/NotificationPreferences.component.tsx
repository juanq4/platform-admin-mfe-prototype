import { Text, TextPreset } from "@q4/nimbus-ui";
import { memo, useMemo } from "react";
import { useAccount } from "../../hooks";
import { NotificationMfeKeys } from "../MfeApp/MfeApp.definition";
import { Container, Content, Header } from "./NotificationPreferences.style";
import { NotificationPreferencesItem } from "./NotificationPreferencesItem/NotificationPreferencesItem.component";

export const NotificationPreferencesBase = (): JSX.Element => {
  const [organization] = useAccount();

  const notificationMfeKeys = useMemo(() => {
    return organization?.entitlements?.map((entitlement) => NotificationMfeKeys?.[entitlement]).filter((key) => !!key);
  }, [organization]);

  return (
    <Container>
      <Header>
        <Text preset={TextPreset.H1}>Notification preferences</Text>
      </Header>
      <Content>
        {notificationMfeKeys.map((key) => (
          <NotificationPreferencesItem key={key} id={key} />
        ))}
      </Content>
    </Container>
  );
};

export const NotificationPreferences = memo(NotificationPreferencesBase);
