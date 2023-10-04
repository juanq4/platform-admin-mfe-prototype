import styled from "@emotion/styled";
import { gux, RadioButton, Text } from "@q4/nimbus-ui";
import type { RadioButtonProps, TextProps } from "@q4/nimbus-ui";

export const Container = styled.div`
  padding: ${gux(4)}px ${gux(4)}px 0;
`;

export const Title = styled((props: TextProps) => <Text {...props} />)`
  &.nui-text {
    margin-bottom: ${gux(2)}px;
  }
`;

export const Selection = styled((props: RadioButtonProps) => <RadioButton {...props} />)`
  margin-bottom: ${gux(2)}px;
`;
