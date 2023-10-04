import styled from "@emotion/styled";
import type { ButtonProps } from "@q4/nimbus-ui";
import { Button, ButtonTheme, Modal } from "@q4/nimbus-ui";
import theme from "../../../../styles/theme";

export const UnlinkModal = styled(Modal)`
  .nui-modal_container {
    border-radius: 4px !important;
    border: none;
    text-align: center;
    .nui-modal_children {
      padding: 0px;
    }
    .nui-modal_header {
      display: none;
    }
    .nui-modal_footer {
      display: flex;
      justify-content: center;
      background-color: ${theme.colors.slate};

      .cancel-btn {
        background: ${theme.colors.darkSlate};
        border-color: ${theme.colors.darkSlate};
        color: ${theme.colors.white};
      }

      .nui-button--danger.nui-button--disabled {
        background-color: ${theme.colors.danger};
        color: ${theme.colors.white};
      }
    }
  }
`;

export const ModalContent = styled.div`
  max-width: 416px;
  min-height: 196px;
  margin: 32px;

  h1 {
    margin: 0px;
    margin-bottom: 12px;
    font-weight: 400;
    font-size: 30px;
    line-height: 40px;
  }
`;

export const ModalMessage = styled.div`
  margin: 0 26px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

export const ConfirmationMessage = styled.p`
  color: ${theme.colors.lightSlate};
  margin: 0px;
  margin-bottom: 20px;
`;

export const WarningMessage = styled.p`
  color: ${theme.colors.danger};
  margin: 0px;
`;

export const CloseButton = styled((props: ButtonProps) => <Button theme={ButtonTheme.Transparent} {...props} />)`
  right: 8px;
  top: 8px;
  position: absolute;
  color: ${theme.colors.slate};
  font-size: 16px;
  background: none;
  height: 16px;
  width: 16px;
  padding: 0;
`;
