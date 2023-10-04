import styled from "@emotion/styled";
import type { TextProps } from "@q4/nimbus-ui";
import { Text, TextPreset, TextSize, TextTheme, TextWeight, peacockPalette } from "@q4/nimbus-ui";

export const Container = styled.div`
  margin: 0 25px;
`;

export const Image = styled.div`
  padding: 24px;
  text-align: center;
`;

export const Message = styled((props: TextProps) => (
  <Text preset={TextPreset.H4} theme={TextTheme.Neutral} size={TextSize.MD} weight={TextWeight.Bold} {...props} />
))`
  color: ${peacockPalette.neutral.neutral700};
  display: block;
  line-height: 18px;
  text-align: center;
`;

export const Details = styled((props: TextProps) => (
  <Text preset={TextPreset.Paragraph} theme={TextTheme.Neutral} size={TextSize.LG} weight={TextWeight.Normal} {...props} />
))`
  color: ${peacockPalette.neutral.neutral700};
  display: block;
  padding: 8px 0 56px 0;
  text-align: center;
`;
