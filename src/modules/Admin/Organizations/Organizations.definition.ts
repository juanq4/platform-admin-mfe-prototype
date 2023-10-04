import { ButtonIdModel, IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { EntityTableIdModel } from "../../../components/Admin/EntityTable/EntityTable.definition";
import { CopyCellListId } from "../../../components/Admin/EntityTable/components/CopyCell/CopyCell.definition";
import { StatusCellListId } from "../../../components/Admin/EntityTable/components/StatusCell/StatusCell.definition";
import { TypeCellListId } from "../../../components/Admin/EntityTable/components/TypeCell/TypeCell.definition";

export enum OrganizationsTableHeader {
  Name = "Organization Name",
  Status = "Status",
  Type = "Type",
  Orgid = "Org Id",
}

export enum AdminOrganizationsViewClassName {
  Base = "admin-organizations",
}

export enum AdminOrganizationsTableCellRenderer {
  OrgIdCell = "OrgIdCell",
  StatusCell = "StatusCell",
  TypeCell = "TypeCell",
  UnlinkOrganizationCell = "UnlinkOrganizationCell",
}

export enum AdminOrganizationsToolbarActions {
  CreateNewLabel = "Create New",
}

class AdminOrganizationsIdModel extends IdModelBase {
  entityTable: EntityTableIdModel;
  orgIdCellList: CopyCellListId;
  statusCellList: StatusCellListId;
  typeCellList: TypeCellListId;
  addNew: ButtonIdModel;

  constructor(id: string) {
    super(id);

    if (isNullOrWhiteSpace(this.id)) {
      this.entityTable = new EntityTableIdModel(null);
      this.addNew = new ButtonIdModel(null);
      this.orgIdCellList = new CopyCellListId(null, null);
      this.statusCellList = new StatusCellListId(null, null);
      this.typeCellList = new TypeCellListId(null, null);
      return;
    }

    this.entityTable = new EntityTableIdModel(`${this.id}EntityTable`);
    this.addNew = new ButtonIdModel(`${this.id}AddNewButton`);
    this.orgIdCellList = new CopyCellListId(this.id, "OrgId-");
    this.statusCellList = new StatusCellListId(this.id);
    this.typeCellList = new TypeCellListId(this.id);
  }
}

const ViewId = "AdminOrganizations";

export const AdminOrganizationsViewIdModel = new AdminOrganizationsIdModel(ViewId);
