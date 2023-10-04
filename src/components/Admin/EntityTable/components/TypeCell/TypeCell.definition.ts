import { AutomationListId, IdModelBase } from "@q4/nimbus-ui";
import type { OrganizationType } from "@q4/platform-definitions";
import type { Key } from "react";
import type { EntityTableCellPropsBase } from "../../EntityTable.definition";

export type TypeCellProps = EntityTableCellPropsBase<OrganizationType>;

export enum TypeCellLabel {
  Corporate = "Corporate",
  Agency = "Agency",
  Admin = "Admin",
}

export class TypeCellListId extends AutomationListId<TypeCellIdModel> {
  constructor(parentId: string, prefix = "TypeCell-", postfix?: string) {
    super(parentId, prefix, TypeCellIdModel, postfix);
  }
}

export class TypeCellIdModel extends IdModelBase {
  constructor(id: IdModelBase["id"], index?: Key, postfix?: string) {
    super(id, index, postfix);
  }
}
