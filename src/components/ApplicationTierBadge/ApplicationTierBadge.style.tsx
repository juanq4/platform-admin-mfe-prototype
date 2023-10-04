import styled from "@emotion/styled";
import { peacockPalette } from "@q4/nimbus-ui";

export const TierName = styled.div`
  display: inline-block;
  height: 16px;
  font-size: 10px;
  line-height: 16px;
  font-weight: 600;
  color: ${peacockPalette.primary.primary500};
  background-color: ${peacockPalette.shades.white};
  box-sizing: border-box;
  padding: 0 4px;
  margin-left: 8px;
  border-radius: 4px;
  text-transform: uppercase;

  @media only screen and (max-width: 428px) {
    background-color: ${peacockPalette.primary.primary500};
    color: ${peacockPalette.shades.white};
  }
`;
