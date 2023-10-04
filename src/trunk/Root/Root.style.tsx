import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { MediaDeviceSize, usePalette } from "@q4/nimbus-ui";
import externalLink from "../../assets/icons/external-link.svg";
import q4Desktop from "../../assets/icons/q4-desktop.svg";
import { FeatureFlag } from "../../configurations";
import { useFeatureFlags } from "../../hooks";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const ContentContainer = styled.div`
  ${() => {
    const features = useFeatureFlags();

    return css`
      width: 100%;
      height: calc(100vh - ${!!features?.[FeatureFlag.PlatformNav] ? "80" : "48"}px);
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      overflow: hidden;
      position: relative;
      justify-content: center;

      .cci-desktop-4pt {
        &:before {
          content: url(${q4Desktop});
        }

        margin: -2px -4px 0 0;
      }

      .cci-desktop-4pt + span {
        &:after {
          content: url(${externalLink});
          margin-left: 15px;
          position: relative;
          top: 3px;
        }
      }

      @media only screen and (max-width: ${MediaDeviceSize.medium.max}px) {
        height: calc(100vh - ${!!features?.[FeatureFlag.PlatformNav] ? "56" : "48"}px);
      }
    `;
  }}
`;

export const RouteContentContainer = styled.div`
  ${() => {
    const { neutral } = usePalette();

    return css`
      background-color: ${neutral.neutral50};
      height: 100%;
      flex: 1;
      position: relative;
      overflow: auto;
    `;
  }}
`;
