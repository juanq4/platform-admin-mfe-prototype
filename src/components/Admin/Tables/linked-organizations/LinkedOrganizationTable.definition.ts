import { IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type React from "react";
import type { Organization } from "../../../../definitions";
import type { OrganizationsQueryVariables } from "../../../../hooks/useOrganization/useOrganization.definition";
import { EntityTableIdModel } from "../../EntityTable/EntityTable.definition";
import type { EntityTableProps } from "../../EntityTable/EntityTable.definition";
import { CopyCellListId } from "../../EntityTable/components/CopyCell/CopyCell.definition";
import { StatusCellListId } from "../../EntityTable/components/StatusCell/StatusCell.definition";

export type LinkedOrganizationsTableProps = Partial<EntityTableProps<Organization, OrganizationsQueryVariables["page"]>> &
  Pick<EntityTableProps<Organization, OrganizationsQueryVariables["page"]>, "items" | "error" | "loading" | "onError">;

export const LinkedOrganizationTableDefault = {
  ToolbarTitle: "Linked Organizations",
};

export class LinkedOrganizationTableIdModel extends IdModelBase {
  entityTable: EntityTableIdModel;
  orgIdCellList: CopyCellListId;
  statusCellList: StatusCellListId;

  constructor(id: string, index?: React.Key, postfix?: string) {
    super(id, index, postfix);

    if (isNullOrWhiteSpace(this.id)) {
      this.entityTable = new EntityTableIdModel(null);
      this.orgIdCellList = new CopyCellListId(null, null);
      this.statusCellList = new StatusCellListId(null, null);
    }

    this.entityTable = new EntityTableIdModel(`${this.id}EntityTable`);
    this.orgIdCellList = new CopyCellListId(this.id, "OrgId-");
    this.statusCellList = new StatusCellListId(this.id);
  }
}

export enum AdminLinkedTableHeader {
  OrgID = "ORG ID",
  Status = "STATUS",
  StockTicker = "STOCK TICKER",
  OrganizationName = "ORGANIZATION NAME",
  Actions = "ACTIONS",
}
