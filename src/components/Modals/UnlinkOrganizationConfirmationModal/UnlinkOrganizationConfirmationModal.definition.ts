import { ButtonIdModel, IdModelBase } from "@q4/nimbus-ui";
import type { BaseComponentProps } from "@q4/nimbus-ui";
import type { Key } from "react";
import type { OrganizationEditState } from "../../../definitions/organization.definition";

export interface UnlinkOrganizationModalProps extends BaseComponentProps {
  linkedOrganization: OrganizationEditState;
  agencyOrganization: OrganizationEditState;
  isModalVisible: boolean;
  onCancelClick: () => void;
  onRemoveClick: (organization: OrganizationEditState) => void;
  onModalClose: () => void;
  isUnlinkingOrganization: boolean;
}

export class OrganizationsUnlinkIdModel extends IdModelBase {
  removeOrganization: ButtonIdModel;
  cancelUnlink: ButtonIdModel;
  closeButton: ButtonIdModel;

  constructor(id: string, index?: Key, postfix?: string) {
    super(id, index, postfix);

    this.removeOrganization = new ButtonIdModel(`${this.id}UnlinkOrganizationButton`);
    this.cancelUnlink = new ButtonIdModel(`${this.id}CancelUnlinkOrganizationButton`);
    this.closeButton = new ButtonIdModel(`${this.id}CloseButton`);
  }
}
