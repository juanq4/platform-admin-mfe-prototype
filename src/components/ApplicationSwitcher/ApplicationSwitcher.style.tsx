import styled from "@emotion/styled";
import type { ButtonProps, TextProps } from "@q4/nimbus-ui";
import {
  TextShade,
  Button,
  ButtonTheme,
  MediaDeviceSize,
  peacockPalette,
  Text,
  TextPreset,
  TextSize,
  TextTheme,
  TextWeight,
} from "@q4/nimbus-ui";

export const ToggleMenuButton = styled((props: ButtonProps) => <Button theme={ButtonTheme.None} {...props} />)`
  color: ${peacockPalette.shades.white};
  border-radius: 8px;
  height: 40px;
  padding: 10px;
  width: 40px;
`;

export const PopoverOptionsContainer = styled.div`
  background-color: ${peacockPalette.shades.white};
  border-radius: 16px;
  box-shadow: 0px 2px 8px 3px rgba(0, 0, 0, 0.1);
  min-height: 128px;
  min-width: 428px;
  padding: 25px 0;
  position: inherit;
  right: 100%;
  top: 5px;
  white-space: nowrap;

  @media only screen and (max-width: ${MediaDeviceSize.medium.max}px) {
    top: 3px;
  }

  @media only screen and (max-width: 588px) {
    border-radius: 0px;
    height: calc(100vh - 56px);
    left: 0;
    min-width: 185px;
    position: fixed;
    right: 0;
    top: 56px;
    white-space: normal;
  }
`;

export const CloseButton = styled((props: ButtonProps) => <Button theme={ButtonTheme.None} {...props} />)`
  display: none;

  @media only screen and (max-width: 588px) {
    background-color: transparent;
    display: block;
    right: 12px;
    padding: 0;
    position: absolute;
    top: 0px;

    &:focus,
    &:focus-visible {
      background-color: transparent;
      border: none;
      box-shadow: none;
      outline: none;
    }
  }
`;

export const ApplicationTitle = styled((props: TextProps) => (
  <Text preset={TextPreset.Normal} theme={TextTheme.Neutral} size={TextSize.MD} weight={TextWeight.Semibold} {...props} />
))`
  display: block;
  margin: 0 25px;
  padding: 10px;
`;

export const BottomBar = styled.div`
  background: linear-gradient(90deg, #173da6 -14.08%, #29ccf3 80.71%, #60af86 145%);
  border-radius: 0 0 16px 16px;
  bottom: -1px;
  height: 16px;
  position: absolute;
  width: 100%;

  @media only screen and (max-width: ${MediaDeviceSize.medium.max}px) {
    bottom: 0;
    position: absolute;
  }
`;

export const DiscoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

export const DiscoverHeader = styled((props: TextProps) => (
  <Text
    preset={TextPreset.Normal}
    weight={TextWeight.Semibold}
    theme={TextTheme.Neutral}
    shade={TextShade.Shade500}
    {...props}
  />
))`
  padding: 0 10px;
  margin-bottom: 8px;
`;
