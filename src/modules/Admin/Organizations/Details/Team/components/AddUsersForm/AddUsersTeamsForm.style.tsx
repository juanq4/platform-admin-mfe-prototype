import styled from "@emotion/styled";
import type { InfoIconProps } from "@q4/nimbus-ui";
import { InfoIcon, InfoIconTheme } from "@q4/nimbus-ui";

export const CustomInfoIcon = styled((props: InfoIconProps) => <InfoIcon theme={InfoIconTheme.Neutral} {...props} />)`
  margin-left: 8px;

  .nui-tooltip {
    white-space: break-spaces;

    &--bottom {
      transform: translateX(-70%);

      &:after {
        left: calc(70% - 6px);
      }
    }
  }
`;
