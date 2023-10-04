import styled from "@emotion/styled";
import { Modal, Text, gux } from "@q4/nimbus-ui";
import type { ModalProps, TextProps } from "@q4/nimbus-ui";

export const TeamEditModal = styled((props: ModalProps) => <Modal {...props} />)`
  .nui-toolbar_row {
    &--justify-flex-end {
      justify-content: space-between;

      button:only-child {
        margin-left: auto;
      }
    }
  }
`;

export const RemoveTeamWarning = styled((props: ModalProps) => <Modal {...props} />)`
  .nui-modal {
    &_children {
      text-align: center;
    }

    &_footer {
      .nui-toolbar_row {
        &--justify-flex-end {
          justify-content: center;
        }
      }
    }
  }
`;

export const RemoveTeamWarningHeader = styled((props: TextProps) => <Text {...props} />)`
  margin-bottom: ${gux(1.5)}px !important;
`;

export const RemoveTeamWarningSubHeader = styled((props: TextProps) => <Text {...props} />)`
  margin-bottom: ${gux(3)}px !important;

  strong {
    word-wrap: break-word;
  }
`;
