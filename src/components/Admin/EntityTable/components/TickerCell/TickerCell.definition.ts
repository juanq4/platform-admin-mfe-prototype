import { AutomationListId, IdModelBase } from "@q4/nimbus-ui";
import type { Key } from "react";
import type { Organization } from "../../../../../definitions";
import type { EntityTableCellPropsBase } from "../../EntityTable.definition";

export type TickerCellProps = EntityTableCellPropsBase<Organization["identifiers"]>;

export class TickerCellListId extends AutomationListId<TickerCellIdModel> {
  constructor(parentId: string, prefix = "TickerCell-", postfix?: string) {
    super(parentId, prefix, TickerCellIdModel, postfix);
  }
}

export class TickerCellIdModel extends IdModelBase {
  constructor(id: IdModelBase["id"], index?: Key, postfix?: string) {
    super(id, index, postfix);
  }
}
