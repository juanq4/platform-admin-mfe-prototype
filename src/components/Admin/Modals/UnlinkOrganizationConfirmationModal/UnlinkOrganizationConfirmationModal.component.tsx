import { ConfigProvider as NimbusConfig, ButtonTheme, StyleGuide } from "@q4/nimbus-ui";
import { useMemo } from "react";
import type { UnlinkOrganizationModalProps } from "./UnlinkOrganizationConfirmationModal.definition";
import { OrganizationsUnlinkIdModel } from "./UnlinkOrganizationConfirmationModal.definition";
import {
  CloseButton,
  ConfirmationMessage,
  ModalContent,
  ModalMessage,
  UnlinkModal,
  WarningMessage,
} from "./UnlinkOrganizationConfirmationModal.style";

export const UnlinkOrganizationModal = (props: UnlinkOrganizationModalProps): JSX.Element => {
  const {
    id,
    linkedOrganization,
    agencyOrganization,
    isModalVisible: modalVisible,
    onCancelClick: handleCancelClick,
    onRemoveClick: handleRemoveClick,
    isUnlinkingOrganization,
  } = props;

  const idModel = useMemo(() => new OrganizationsUnlinkIdModel(id), [id]);

  return (
    <NimbusConfig styleGuide={StyleGuide.V2} useV1ClassName>
      <UnlinkModal
        id={idModel.id}
        visible={modalVisible}
        fullscreen={false}
        title=""
        masked={true}
        includeCancel={false}
        footerActions={[
          {
            id: idModel.cancelUnlink.id,
            className: "cancel-btn",
            theme: ButtonTheme.Secondary,
            label: "CANCEL",
            onClick: handleCancelClick,
            disabled: isUnlinkingOrganization,
          },
          {
            id: idModel.removeOrganization.id,
            theme: ButtonTheme.Danger,
            label: "REMOVE",
            onClick: () => handleRemoveClick(linkedOrganization),
            disabled: isUnlinkingOrganization,
          },
        ]}
        focusOnProps={{
          autoFocus: false,
        }}
        onCloseRequest={handleCancelClick}
      >
        <ModalContent>
          <CloseButton
            onClick={handleCancelClick}
            id={idModel.closeButton.id}
            label={<i className="ni-close-4pt" />}
            disabled={isUnlinkingOrganization}
          />
          <h1>Remove linked organization?</h1>

          <ModalMessage>
            <ConfirmationMessage>
              Are you sure you want to remove <strong>{linkedOrganization?.name}</strong> as a linked corporate organization
              to <strong>{agencyOrganization?.name}</strong>?
            </ConfirmationMessage>
            <WarningMessage>
              All <strong>{agencyOrganization?.name}</strong> users will lose access to the
              <strong> {linkedOrganization?.name}</strong> organization.
            </WarningMessage>
          </ModalMessage>
        </ModalContent>
      </UnlinkModal>
    </NimbusConfig>
  );
};
