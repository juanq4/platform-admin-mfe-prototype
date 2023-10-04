import { Origin, Text, TextPreset, TextShade, TextSize, TextTheme, Tooltip, TooltipTheme } from "@q4/nimbus-ui";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { throttle } from "lodash";
import { memo, useMemo } from "react";
import type { NotificationsDrawerCardProps } from "./NotificationsDrawerCard.definition";
import { NotificationsDrawerCardApplications } from "./NotificationsDrawerCard.definition";
import { Card, Content, Heading, Icon, Body, Tags, Frame, Pip, PipIndicator } from "./NotificationsDrawerCard.style";

dayjs.extend(relativeTime);

const Component = (props: NotificationsDrawerCardProps): JSX.Element => {
  const { id, source, title, message, sentAt, link, readAt, onReadStateChange } = props;

  const readStatus = useMemo<"read" | "unread">(() => (readAt ? "read" : "unread"), [readAt]);

  const application = useMemo(
    () => NotificationsDrawerCardApplications[source as keyof typeof NotificationsDrawerCardApplications],
    [source],
  );

  const toggleReadStatus = useMemo(
    () => throttle(() => onReadStateChange(id, !readAt), 600),
    [id, onReadStateChange, readAt],
  );

  const handleCardClick = () => {
    if (!readAt) toggleReadStatus();
    window.open(link, application.target).focus();
  };

  const handlePipClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.currentTarget.blur();
    toggleReadStatus();
    return false;
  };

  return (
    <Card className={!readAt && "unread"} onClick={handleCardClick}>
      <Content>
        <Heading>
          <Icon>
            <img src={application?.icon} alt={`${application?.name} icon`} />
          </Icon>
          <Body>
            <Text preset={TextPreset.H4} theme={TextTheme.Neutral} shade={TextShade.Shade900}>
              {title}
            </Text>
            <Text preset={TextPreset.Paragraph} theme={TextTheme.Neutral} size={TextSize.LG} shade={TextShade.Shade700}>
              {message}
            </Text>
          </Body>
          <Pip id={`pip-${id}`} className={`pip ${readStatus}`} onClick={handlePipClick}>
            <PipIndicator id="pip-indicator" className={readStatus} />
            <Tooltip
              key={`tooltip-${id}`}
              className={`pip-tooltip ${readStatus}`}
              label={readStatus === "read" ? "Mark as unread" : "Mark as read"}
              position={Origin.Top}
              theme={TooltipTheme.Slate}
            />
          </Pip>
        </Heading>
        <Tags>
          <Frame id="frame">
            <Text preset={TextPreset.Normal} theme={TextTheme.Neutral} size={TextSize.LG} shade={TextShade.Shade500}>
              {application?.name}
            </Text>
          </Frame>
          <Text preset={TextPreset.Normal} theme={TextTheme.Neutral} size={TextSize.LG} shade={TextShade.Shade500}>
            {dayjs(sentAt).fromNow()}
          </Text>
        </Tags>
      </Content>
    </Card>
  );
};

export const NotificationsDrawerCard = memo(Component);
