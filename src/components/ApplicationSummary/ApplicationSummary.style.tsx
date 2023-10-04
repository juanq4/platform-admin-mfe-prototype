import styled from "@emotion/styled";
import type { TextProps } from "@q4/nimbus-ui";
import { Text, TextPreset, TextSize, TextTheme, TextWeight, peacockPalette } from "@q4/nimbus-ui";
import MobileWarningIcon from "../../assets/icons/alert-circle-02.svg";
import WarningIcon from "../../assets/icons/alert-circle.svg";
import MobileHourglassIcon from "../../assets/icons/hourglass-02.svg";
import HourglassIcon from "../../assets/icons/hourglass.svg";
import { RemainingDaysMessageClass } from "./ApplicationSummary.definition";

export const Container = styled.div`
  text-overflow: ellipsis;

  @media only screen and (max-width: 428px) {
    background: ${peacockPalette.primary.primary50};
    display: flex;
    flex-direction: column;
    height: 60px;
    padding: 16px;
    vertical-align: center;
  }
`;

export const ApplicationTitleContainer = styled.div`
  display: flex;
`;

export const ApplicationTitle = styled((props: TextProps) => (
  <Text preset={TextPreset.Normal} theme={TextTheme.White} size={TextSize.LG} weight={TextWeight.Semibold} {...props} />
))`
  @media only screen and (max-width: 428px) {
    color: ${peacockPalette.neutral.neutral900};
    font-weight: normal;
  }
`;

export const RemainingDaysContainer = styled.div`
  height: 20px;
  padding-top: 5px;
`;

export const RemainingDaysMessage = styled((props: TextProps) => (
  <Text preset={TextPreset.Normal} theme={TextTheme.White} size={TextSize.SM} {...props} />
))`
  &.${RemainingDaysMessageClass.Clock} {
    &:before {
      content: url(${HourglassIcon});
      padding-right: 4px;
      vertical-align: middle;
    }
  }

  &.${RemainingDaysMessageClass.Warning} {
    &:before {
      content: url(${WarningIcon});
      padding-right: 4px;
      vertical-align: middle;
    }
  }

  &:after {
    content: " – ";
  }

  @media only screen and (max-width: 428px) {
    color: ${peacockPalette.neutral.neutral700};
    font-weight: normal;
    font-size: 12px;

    &.${RemainingDaysMessageClass.Clock} {
      &:before {
        content: url(${MobileHourglassIcon});
      }
    }

    &.${RemainingDaysMessageClass.Warning} {
      &:before {
        content: url(${MobileWarningIcon});
      }
    }
  }
`;

export const RemainingDaysLink = styled.a`
  cursor: pointer;

  span {
    line-height: 14px;
    text-decoration: underline;
  }

  @media only screen and (max-width: 428px) {
    span {
      color: ${peacockPalette.primary.primary500};
      line-height: 14px;
      font-size: 12px;
    }
  }
`;
