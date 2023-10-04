import { css, Global } from "@emotion/react";
import { Brand, MediaDeviceSize, peacockPalette } from "@q4/nimbus-ui";
import warningIcon from "../assets/icons/warning.svg";

export const GlobalStyles = ({ brand }: { brand: string }): JSX.Element => {
  const defaultFontColor = brand === Brand.Peacock ? peacockPalette.neutral.neutral700 : "#545B62";
  const defaultFontFamily = brand === Brand.Peacock ? "'Inter', sans-serif" : "'Open Sans', sans-serif";

  return (
    <Global
      styles={css`
        html,
        body {
          color: ${defaultFontColor};
          font-family: ${defaultFontFamily} !important; // This is to overwrite any bleeding styles from the MFEs
        }

        .Toastify__toast-container--top-right {
          top: 90px !important; // This is to overwrite any bleeding styles from the MFEs

          @media only screen and (max-width: ${MediaDeviceSize.medium.max}px) {
            top: 66px !important;
          }
        }

        .fallback-signout-btn {
          margin-left: 16px;
          border-color: ${peacockPalette.primary.primary500} !important;
          background-color: ${peacockPalette.shades.white} !important;
          color: ${peacockPalette.primary.primary500} !important;
        }

        .trial-toast {
          background-color: ${peacockPalette.neutral.neutral50};

          .nui-toast_indicator--success {
            background: ${peacockPalette.accents.green};
          }

          .nui-toast_close {
            right: 24px;
            top: 24px;
            color: ${peacockPalette.neutral.neutral900};
          }

          .ni-warning-4pt {
            &:before {
              content: url(${warningIcon});
            }
          }

          .nui-toast_indicator--error {
            .ni-warning-4pt {
              &:before {
                filter: brightness(10);
              }
            }
          }
        }
      `}
    />
  );
};
