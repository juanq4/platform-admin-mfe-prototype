import type { BaseComponentProps } from "@q4/nimbus-ui";
import { ButtonIdModel, IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type React from "react";
import type { OrganizationEditState } from "../../../definitions/organization.definition";
import { CopyCellListId } from "../EntityTable/components/CopyCell/CopyCell.definition";
import { StatusCellListId } from "../EntityTable/components/StatusCell/StatusCell.definition";
import { OrganizationsUnlinkIdModel } from "../Modals/UnlinkOrganizationConfirmationModal/UnlinkOrganizationConfirmationModal.definition";
import { LinkedOrganizationTableIdModel } from "../Tables/linked-organizations/LinkedOrganizationTable.definition";

export interface OrganizationsProps extends Omit<BaseComponentProps, "className" | "dataId"> {
  organization: OrganizationEditState;
}

export class OrganizationsIdModel extends IdModelBase {
  linkedOrganizationsTable: LinkedOrganizationTableIdModel;
  linkOrganizations: ButtonIdModel;
  statusCellList: StatusCellListId;
  orgIdCellList: CopyCellListId;
  unlinkOrganizationButton: ButtonIdModel;
  unlinkOrganizationModal: OrganizationsUnlinkIdModel;

  constructor(id: string, index?: React.Key, postfix?: string) {
    super(id, index, postfix);

    if (isNullOrWhiteSpace(this.id)) {
      this.linkedOrganizationsTable = new LinkedOrganizationTableIdModel(null);
      this.linkOrganizations = new ButtonIdModel(null);
      this.statusCellList = new StatusCellListId(null, null);
      this.orgIdCellList = new CopyCellListId(null, null);
      this.unlinkOrganizationButton = new ButtonIdModel(null);
      this.unlinkOrganizationModal = new OrganizationsUnlinkIdModel(null);
      return;
    }

    this.linkedOrganizationsTable = new LinkedOrganizationTableIdModel(`${this.id}LinkedOrganizationsTable`);
    this.linkOrganizations = new ButtonIdModel(`${this.id}LinkOrganizations`);
    this.statusCellList = new StatusCellListId(this.id);
    this.orgIdCellList = new CopyCellListId(this.id, "OrgId-");
    this.unlinkOrganizationButton = new ButtonIdModel(`${this.id}UnlinkOrganization`);
    this.unlinkOrganizationModal = new OrganizationsUnlinkIdModel(`${this.id}UnlinkOrganizationModal`);
  }
}
