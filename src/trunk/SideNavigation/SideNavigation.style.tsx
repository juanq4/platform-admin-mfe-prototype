import styled from "@emotion/styled";
import { MediaQuery } from "@q4/nimbus-ui";

export const Container = styled.div`
  z-index: 1;

  .nui-navigation--collapsed {
    & .nui-navigation_route:not(.nui-navigation_route--active) {
      transition: color 0s !important;
    }

    .nui-navigation_label-wrapper {
      animation-name: slide-right !important;
      animation-duration: 0.3s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;
    }

    @keyframes slide-right {
      from {
        left: 4px;
        padding: 0px 8px;
      }
      to {
        left: 18px;
        padding: 0px;
      }
    }
  }

  @media ${MediaQuery.medium.max} {
    .nui-navigation {
      position: fixed;
    }
  }
`;
