import styled from "@emotion/styled";
import { MediaDeviceSize, peacockPalette } from "@q4/nimbus-ui";
import type { LinkProps } from "react-router-dom";
import { Link as ReactLink } from "react-router-dom";

export const Link = styled((props: LinkProps) => <ReactLink {...props} />)`
  align-items: center;
  border-radius: 8px;
  color: ${peacockPalette.shades.black};
  cursor: pointer;
  display: flex;
  margin: 0 25px;
  padding: 10px;
  text-decoration: none;

  &:hover {
    background: ${peacockPalette.primary.primary50};

    span:first-of-type {
      background: linear-gradient(180deg, #173da6 7.89%, #29ccf3 108.09%, #60af86 145%);

      img {
        filter: brightness(10);
      }
    }
  }

  &:focus {
    background: ${peacockPalette.primary.primary100};

    span:first-of-type {
      background: linear-gradient(180deg, #173da6 7.89%, #29ccf3 108.09%, #60af86 145%);

      img {
        filter: brightness(10);
      }
    }
  }

  &:focus-visible {
    outline: none;
  }

  @media only screen and (max-width: ${MediaDeviceSize.medium.max}px) {
    img {
      width: 40px;
      height: 40px;
      margin-right: 16px;
      padding: 0px;
    }
  }
`;

interface IconProps {
  bgColor?: string;
}

export const Icon = styled.span<IconProps>`
  background: ${(props) => props.bgColor || peacockPalette.primary.primary50};
  border-radius: 8px;
  height: 40px;
  margin-right: 16px;
  width: 40px;

  img {
    padding: 8px;
  }
`;
