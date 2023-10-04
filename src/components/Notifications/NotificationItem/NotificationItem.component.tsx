import type { NotificationProps } from "./NotificationItem.definition";
import { Body, Copy, Icon, Item, Pip, PipContainer, Tags } from "./NotificationItem.style";

const getNotificationIcon = (category?: string): string => {
  switch (category) {
    case "Engagement Analytics":
      return "cci-website-analytics-4pt";

    case "Website":
      return "cci-website-4pt";

    default:
      return "cci-website-analytics-4pt";
  }
};

const NotificationItem = (props: NotificationProps): JSX.Element => {
  const { category, content, dateTime, isRead } = props;

  return (
    <Item>
      <Icon>
        <i className={getNotificationIcon(category)} />
      </Icon>
      <Body>
        <Copy>{content}</Copy>
        <Tags>
          <div>{category}</div>
          <div>{dateTime}</div>
        </Tags>
      </Body>

      <PipContainer>{!isRead && <Pip />}</PipContainer>
    </Item>
  );
};

export { NotificationItem };
