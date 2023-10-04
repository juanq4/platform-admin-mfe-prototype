import { css } from "@emotion/react";
import { MediaDeviceSize, MediaQuery } from "@q4/nimbus-ui";

export const DisplayNoneMobile = css(
  `@media ${MediaQuery.extraSmall.max} {
      display: none;
    }`,
);

export const DisplayNoneLaptop = css(
  `@media only screen and (min-width: ${MediaDeviceSize.large.min + 1}px) {
    display: none !important;
  }`,
);

export const DisplayNoneTablet = css(
  `@media ${MediaQuery.medium.max} {
        display: none !important;
      }`,
);
