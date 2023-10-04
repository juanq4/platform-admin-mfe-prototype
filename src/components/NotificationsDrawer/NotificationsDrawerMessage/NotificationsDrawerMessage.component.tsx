import { memo } from "react";
import type { NotificationsDrawerMessageProps } from "./NotificationsDrawerMessage.definition";
import { Container, Image, Message, Details } from "./NotificationsDrawerMessage.style";

const Component = (props: NotificationsDrawerMessageProps): JSX.Element => {
  const { image, message, details } = props;

  return (
    <Container>
      {image && (
        <Image>
          <img src={image} alt="notifications message" />
        </Image>
      )}
      {message && <Message>{message}</Message>}
      {details && <Details>{details}</Details>}
    </Container>
  );
};

export const NotificationsDrawerMessage = memo(Component);
