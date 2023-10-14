import { ButtonIdModel, FieldIdModel, IdModelBase, isNullOrWhiteSpace, ModalIdModel, SelectIdModel } from "@q4/nimbus-ui";
import type { Key } from "react";

export interface OrganizationsLinkParam {
  id: string;
}

export class OrganizationsLinkIdModel extends IdModelBase {
  modal: ModalIdModel;
  organizationsField: FieldIdModel;
  organizations: SelectIdModel;
  save: ButtonIdModel;

  constructor(id: string, index?: Key, postfix?: string) {
    super(id, index, postfix);

    if (isNullOrWhiteSpace(this.id)) {
      this.organizationsField = new FieldIdModel(null);
      this.organizations = new SelectIdModel(null);
      this.save = new ButtonIdModel(null);
      return;
    }

    this.modal = new ModalIdModel(`${this.id}Modal`);
    this.organizationsField = new FieldIdModel(`${this.id}OrganizationLinkField`);
    this.organizations = new SelectIdModel(`${this.id}OrganizationsSelect`);
    this.save = new ButtonIdModel(`${this.id}SaveButton`);
  }
}

export const OrganizationsLinkViewIdModel = new OrganizationsLinkIdModel("OrganizationsLinkView");

export const OrganizationLinkAdminWording =
  "Select organizations to link. Agencies and the Q4 Inc. (Corporate) organization cannot be linked.";

export const OrganizationLinkAgencyWording =
  "Select organizations this agency manages. Organizations managed by another agency will not be available to link.";
