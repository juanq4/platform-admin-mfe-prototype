import { Text, TextPreset, TextShade, TextTheme, TextWeight } from "@q4/nimbus-ui";
import type { TrialMessageProps } from "../useCreateTrial.definition";
import { TrialMessageContainer } from "./TrialMessage.style";

export const TrialMessage = (props: TrialMessageProps): JSX.Element => {
  const { title, message } = props;
  return (
    <TrialMessageContainer>
      <Text preset={TextPreset.Paragraph} weight={TextWeight.Bold} theme={TextTheme.Neutral} shade={TextShade.Shade700}>
        {title}
      </Text>
      <Text preset={TextPreset.Paragraph} theme={TextTheme.Neutral} shade={TextShade.Shade700}>
        {message}
      </Text>
    </TrialMessageContainer>
  );
};
