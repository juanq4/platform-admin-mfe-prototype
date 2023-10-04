import styled from "@emotion/styled";
import { MediaDeviceSize, peacockPalette } from "@q4/nimbus-ui";

export const Link = styled.a`
  align-items: center;
  border: 1px solid transparent;
  border-radius: 8px;
  color: ${peacockPalette.shades.black};
  cursor: pointer;
  display: flex;
  padding: 10px;
  text-decoration: none;

  &:hover {
    background: ${peacockPalette.neutral.neutral75};

    .icon {
      background: ${peacockPalette.neutral.neutral700};

      img {
        filter: grayscale(1) brightness(10);
      }
    }
  }

  &:active {
    background: ${peacockPalette.neutral.neutral100};

    .icon {
      background: ${peacockPalette.neutral.neutral700};

      img {
        filter: grayscale(1) brightness(10);
      }
    }
  }

  &:focus {
    border: 1px solid ${peacockPalette.neutral.neutral500};
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

export const Icon = styled.span`
  background: ${peacockPalette.neutral.neutral75};
  border-radius: 8px;
  height: 40px;
  margin-right: 16px;
  width: 40px;

  img {
    padding: 8px;
    filter: brightness(0);
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

export const DescriptionContainer = styled.div`
  width: 269px;
  white-space: pre-line;
`;

export const TrialBadge = styled.div`
  display: flex;
  padding: 2px 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 1.5px solid ${peacockPalette.primary.primary500};
`;
