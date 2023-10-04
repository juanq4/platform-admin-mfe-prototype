import styled from "@emotion/styled";
import { MediaDeviceSize } from "@q4/nimbus-ui";

export const OrganizationSwitcherContainer = styled.div`
  margin: 0;

  @media only screen and (max-width: ${MediaDeviceSize.medium.max}px) {
    display: none;
  }
`;
