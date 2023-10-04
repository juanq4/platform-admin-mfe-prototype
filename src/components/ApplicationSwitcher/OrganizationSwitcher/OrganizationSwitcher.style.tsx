import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { ButtonProps, TextProps } from "@q4/nimbus-ui";
import {
  usePalette,
  MediaDeviceSize,
  Text,
  TextPreset,
  TextSize,
  TextTheme,
  TextWeight,
  Button,
  ButtonTheme,
  peacockPalette,
} from "@q4/nimbus-ui";
import ChevronRight from "../../../assets/icons/chevron-right.svg";

export const OrganizationContainer = styled.div`
  display: none;

  @media only screen and (max-width: ${MediaDeviceSize.medium.max}px) {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin: 0 25px;
    padding: 10px 10px 24px;
  }
`;

export const OrganizationLabelWithTicker = styled((props: TextProps) => (
  <Text preset={TextPreset.Normal} theme={TextTheme.Primary} size={TextSize.MD} weight={TextWeight.Semibold} {...props} />
))`
  &:after {
    content: url(${ChevronRight});
    padding-left: 5px;
    position: relative;
    top: 3px;
  }
`;

export const OrganizationSwitcherButton = styled((props: ButtonProps) => <Button theme={ButtonTheme.Tertiary} {...props} />)`
  ${() => {
    const { primary } = usePalette();

    return css`
      display: flex;
      justify-content: left;
      padding: 8px 16px 8px 16px;
      margin-left: -16px;
      margin-right: -16px;
      border-radius: 8px;

      &:hover {
        background: ${peacockPalette.neutral.neutral75};
      }

      &:focus {
        background: #f0f7ff;
        box-shadow: 0px 0px 3px ${primary.primary50};
      }

      &:focus-visible {
        outline: none;
      }
    `;
  }}
`;
