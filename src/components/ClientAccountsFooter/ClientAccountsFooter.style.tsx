import styled from "@emotion/styled";
import { Anchor, Text, MediaQuery, AnchorTheme, TextShade, TextTheme } from "@q4/nimbus-ui";
import type { AnchorProps, TextProps } from "@q4/nimbus-ui";

export const MessageText = styled((props: TextProps) => (
  <Text theme={TextTheme.Neutral} shade={TextShade.Shade700} {...props} />
))`
  @media ${MediaQuery.extraSmall.max} {
    text-align: center;
  }
`;

export const ContactText = styled.span`
  @media ${MediaQuery.small.max} {
    display: inline-block;
  }
  @media ${MediaQuery.extraSmall.max} {
    display: unset;
  }
`;

export const AnchorNoUnderline = styled((props: AnchorProps) => <Anchor theme={AnchorTheme.Primary} {...props} />)`
  text-decoration: none !important;
`;
