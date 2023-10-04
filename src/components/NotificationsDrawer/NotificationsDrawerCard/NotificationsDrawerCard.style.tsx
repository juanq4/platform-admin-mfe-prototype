import styled from "@emotion/styled";
import { peacockPalette } from "@q4/nimbus-ui";

export const Card = styled.button`
  background: ${peacockPalette.shades.white};
  border-color: transparent;
  border-radius: 8px;
  display: flex;
  cursor: pointer;
  margin: 1px;
  padding: 15px;
  text-align: unset;
  width: 99%;

  &:hover {
    background: ${peacockPalette.primary.primary50};

    #frame {
      background: ${peacockPalette.primary.primary100};
    }

    .pip {
      border: 1px solid ${peacockPalette.neutral.neutral200};
    }
  }

  &:focus {
    background: ${peacockPalette.primary.primary50};
    box-shadow: 0px 0px 3px 0px #4ea1ef;

    #frame {
      background: ${peacockPalette.primary.primary100};
    }
  }

  &:active {
    background: ${peacockPalette.primary.primary100};

    #frame {
      background: ${peacockPalette.primary.primary50};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Heading = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 16px;
`;

export const Icon = styled.div`
  height: 24px;
  width: 24px;
`;

export const Pip = styled.button`
  position: relative;
  border: 1px solid ${peacockPalette.shades.white};
  border-radius: 24px;
  margin-left: auto;
  padding: 8px;
  background-color: transparent;
  cursor: pointer;

  & .pip-tooltip {
    transition-property: opacity;
  }

  &:hover {
    background-color: ${peacockPalette.neutral.neutral100};
  }

  &:focus {
    background-color: ${peacockPalette.neutral.neutral300};
  }

  &:hover .pip-tooltip {
    visibility: visible;
    opacity: 1;
    transform: translateX(-86%);

    &:after {
      left: calc(50% + 28px);
    }

    &.read:after {
      left: calc(50% + 35px);
    }
  }
`;

export const PipIndicator = styled.div`
  background: ${peacockPalette.primary.primary700};
  border-radius: 24px;
  height: 8px;
  width: 8px;

  &.read {
    opacity: 0;
  }
`;

export const Body = styled.div`
  text-wrap: wrap;
`;

export const Tags = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
`;

export const Frame = styled.div`
  background: ${peacockPalette.primary.primary50};
  border-radius: 16px;
  padding: 8px 12px;
`;
