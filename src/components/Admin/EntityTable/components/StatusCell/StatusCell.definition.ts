import { AutomationListId, IdModelBase } from "@q4/nimbus-ui";
import type { Key } from "react";
import type { EntityTableCellPropsBase } from "../../EntityTable.definition";

export type StatusCellProps = EntityTableCellPropsBase<boolean>;

export enum StatusCellLabel {
  Active = "Active",
  Deactivated = "Deactivated",
}

export class StatusCellListId extends AutomationListId<StatusCellIdModel> {
  constructor(parentId: string, prefix = "StatusCell-", postfix?: string) {
    super(parentId, prefix, StatusCellIdModel, postfix);
  }
}

export class StatusCellIdModel extends IdModelBase {
  constructor(id: IdModelBase["id"], index?: Key, postfix?: string) {
    super(id, index, postfix);
  }
}
