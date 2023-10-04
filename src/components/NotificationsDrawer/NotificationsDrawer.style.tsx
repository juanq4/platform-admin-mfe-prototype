import styled from "@emotion/styled";
import type { ButtonProps, TextProps } from "@q4/nimbus-ui";
import {
  Button,
  ButtonSize,
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
  border-radius: 8px;
  color: ${peacockPalette.shades.white};
  height: 40px;
  width: 40px;
`;

export const PopoverOptionsContainer = styled.div`
  background-color: ${peacockPalette.shades.white};
  border-radius: 16px;
  box-shadow: 0px 2px 8px 3px rgba(0, 0, 0, 0.1);
  min-height: 128px;
  min-width: 546px;
  position: inherit;
  right: 100%;
  top: 5px;
  white-space: nowrap;

  @media only screen and (max-width: ${MediaDeviceSize.medium.max}px) {
    top: 3px;
  }

  @media only screen and (max-width: 600px) {
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

  @media only screen and (max-width: 600px) {
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

export const Header = styled.div`
  align-items: center;
  display: flex;
  padding: 32px 0 9px 0;
`;

export const Title = styled((props: TextProps) => (
  <Text preset={TextPreset.H3} theme={TextTheme.Black} size={TextSize.MD} weight={TextWeight.Bold} {...props} />
))`
  display: block;
  margin-left: 32px;
`;

export const BottomBar = styled.div`
  background: linear-gradient(90deg, #173da6 -14.08%, #29ccf3 80.71%, #60af86 145%);
  border-radius: 0 0 16px 16px;
  height: 16px;
  width: 100%;

  @media only screen and (max-width: ${MediaDeviceSize.medium.max}px) {
    bottom: 0;
    position: absolute;
  }
`;

export const Content = styled.div`
  max-height: calc(100vh - 230px);
  padding: 15px 16px 32px 16px;
  overflow: auto;
  overflow-x: hidden;

  // TODO Missing shadow on scroll
`;

export const ButtonContainer = styled.div`
  text-align: center;
  margin: 32px 0;
`;

export const LoadMoreButton = styled((props: ButtonProps) => (
  <Button theme={ButtonTheme.Primary} size={ButtonSize.Small} {...props} />
))`
  border-radius: 8px;
  font-size: 16px;
  height: 40px;
  padding: 12px 16px;
  width: 113px;

  @media only screen and (max-width: ${MediaDeviceSize.large.min}px) {
    font-size: 14px;
  }
`;
