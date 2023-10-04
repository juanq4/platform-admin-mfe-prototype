import styled from "@emotion/styled";
import type { ButtonProps } from "@q4/nimbus-ui";
import { Button, ButtonTheme, peacockPalette } from "@q4/nimbus-ui";
import ChevronDown from "../../assets/icons/chevron-down.svg";

export const ToggleMenuButton = styled((props: ButtonProps) => <Button theme={ButtonTheme.None} {...props} />)`
  color: ${peacockPalette.shades.white};
  border-radius: 8px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  padding: 10px;

  &:after {
    content: url(${ChevronDown});
    padding-left: 5px;
    position: relative;
    top: 2px;
  }
`;

const popoverContainerVerticalPadding = 25;
const bottomBarHeight = 16;
export const PopoverOptionsContainer = styled.div`
  background-color: ${peacockPalette.shades.white};
  border-radius: 16px;
  box-shadow: 0px 2px 8px 3px rgba(0, 0, 0, 0.1);
  min-height: 128px;
  min-width: 185px;
  padding: ${popoverContainerVerticalPadding}px 0;
  padding-bottom: ${popoverContainerVerticalPadding + bottomBarHeight}px;
  position: relative;
  right: 100%;
  top: 5px;
  white-space: nowrap;
`;

export const BottomBar = styled.div`
  background: linear-gradient(90deg, #173da6 -14.08%, #29ccf3 80.71%, #60af86 145%);
  border-radius: 0 0 16px 16px;
  bottom: -1px;
  height: ${bottomBarHeight}px;
  position: absolute;
  width: 100%;
`;

export const OptionContainer = styled.div`
  margin: 0 25px;
`;

export const Option = styled((props: ButtonProps) => <Button theme={ButtonTheme.Primary} {...props} />)`
  background-color: white;
  border-radius: 8px;
  color: ${peacockPalette.primary.primary500};
  display: inline-block;
  font-weight: 600;
  width: 100%;
  text-align: left;

  &:focus,
  &:focus-visible {
    color: ${peacockPalette.primary.primary500};
    background: ${peacockPalette.primary.primary50};
  }

  &:hover {
    color: ${peacockPalette.primary.primary500};
    background: #ebeef2;
  }

  span {
    text-align: left;

    img {
      left: 3px;
      position: relative;
      top: 2px;
    }
  }
`;
