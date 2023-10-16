import { IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { User } from "../../../../definitions/user.definition";
import type { UsersQueryVariables } from "../../../../schemas/generated/graphql";
import type { EntityTableColumnDef, EntityTableProps } from "../../EntityTable/EntityTable.definition";
import { EntityTableIdModel } from "../../EntityTable/EntityTable.definition";
import { StatusCellListId } from "../../EntityTable/components/StatusCell/StatusCell.definition";

export interface AdminUserTableAdditionalProps {
  omitColumns?: EntityTableColumnDef["field"][];
  showCheckbox?: boolean;
}

export type AdminUserTableProps = Partial<EntityTableProps<User, UsersQueryVariables["page"]>> &
  Pick<EntityTableProps<User, UsersQueryVariables["page"]>, "items" | "error" | "loading" | "onError"> &
  AdminUserTableAdditionalProps;

export const AdminUserTableDefault = {
  ToolbarTitle: "All users",
};

export enum AdminUserTableClassName {
  Base = "admin-user-table",
}

export enum AdminUserTableHeader {
  Email = "EMAIL",
  FirstName = "FIRST NAME",
  LastName = "LAST NAME",
  FriendlyName = "FRIENDLY NAME",
  Status = "STATUS",
  Role = "ROLE",
  Organization = "ORGANIZATION",
  Teams = "TEAMS",
}

export enum AdminUserTableCellRenderer {
  StatusCell = "StatusCell",
  OrgIdCell = "OrgIdCell",
}

export class AdminUserTableIdModel extends IdModelBase {
  entityTable: EntityTableIdModel;
  statusCellList: StatusCellListId;

  constructor(id: string, index?: React.Key, postfix?: string) {
    super(id, index, postfix);

    if (isNullOrWhiteSpace(this.id)) {
      this.entityTable = new EntityTableIdModel(null);
      this.statusCellList = new StatusCellListId(null, null);
    }

    this.entityTable = new EntityTableIdModel(`${this.id}EntityTable`);
    this.statusCellList = new StatusCellListId(this.id);
  }
}
