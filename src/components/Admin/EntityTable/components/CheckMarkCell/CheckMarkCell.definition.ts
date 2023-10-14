import { AutomationListId, IdModelBase } from "@q4/nimbus-ui";
import type { Key } from "react";
import type { EntityTableCellPropsBase } from "../../EntityTable.definition";

export interface CheckMarkCellProps extends EntityTableCellPropsBase {
  value: boolean;
}

export class CheckMarkCellListId extends AutomationListId<CheckMarkCellIdModel> {
  constructor(parentId: string, prefix = "CheckMarkCell-", postfix?: string) {
    super(parentId, prefix, CheckMarkCellIdModel, postfix);
  }
}

export class CheckMarkCellIdModel extends IdModelBase {
  constructor(id: IdModelBase["id"], index?: Key, postfix?: string) {
    super(id, index, postfix);
  }
}
