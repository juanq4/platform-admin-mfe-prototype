import { IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { Organization } from "../../../../definitions/organization.definition";
import type { OrganizationsQueryVariables } from "../../../../schemas/generated/graphql";
import type { EntityTableProps } from "../../EntityTable/EntityTable.definition";
import { EntityTableIdModel } from "../../EntityTable/EntityTable.definition";
import { CopyCellListId } from "../../EntityTable/components/CopyCell/CopyCell.definition";
import { StatusCellListId } from "../../EntityTable/components/StatusCell/StatusCell.definition";
import { TickerCellListId } from "../../EntityTable/components/TickerCell/TickerCell.definition";
import { TypeCellListId } from "../../EntityTable/components/TypeCell/TypeCell.definition";

export enum AdminOrganizationsTableHeader {
  Name = "Organization Name",
  Ticker = "Ticker",
  Status = "Status",
  Orgid = "Org Id",
}

export enum AdminOrganizationsTableFields {
  Name = "name",
  Ticker = "identifiers",
  Active = "active",
  Id = "id",
}

export enum AdminOrganizationTableDefault {
  ToolbarTitle = "All organizations",
}

export enum AdminOrganizationsTableCellRenderer {
  TickerCell = "TickerCell",
  OrgIdCell = "OrgIdCell",
  StatusCell = "StatusCell",
  TypeCell = "TypeCell",
}

export enum AdminOrganizationsTableClassName {
  Base = "admin-organizations",
}

export type AdminOrganizationTableProps = Partial<EntityTableProps<Organization, OrganizationsQueryVariables["page"]>> &
  Pick<EntityTableProps<Organization, OrganizationsQueryVariables["page"]>, "items" | "error" | "loading" | "onError">;

export class AdminOrganizationTableIdModel extends IdModelBase {
  entityTable: EntityTableIdModel;
  orgIdCellList: CopyCellListId;
  statusCellList: StatusCellListId;
  typeCellList: TypeCellListId;
  tickerCellList: TickerCellListId;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(this.id)) {
      this.entityTable = new EntityTableIdModel(null);
      this.orgIdCellList = new CopyCellListId(null, null);
      this.statusCellList = new StatusCellListId(null, null);
      this.typeCellList = new TypeCellListId(null, null);
      this.tickerCellList = new TickerCellListId(null, null);

      return;
    }

    this.entityTable = new EntityTableIdModel(`${this.id}EntityTable`);
    this.orgIdCellList = new CopyCellListId(this.id, "OrgId-");
    this.statusCellList = new StatusCellListId(this.id);
    this.typeCellList = new TypeCellListId(this.id);
    this.tickerCellList = new TickerCellListId(this.id);
  }
}
