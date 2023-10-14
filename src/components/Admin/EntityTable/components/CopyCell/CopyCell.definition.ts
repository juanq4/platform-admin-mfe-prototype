import { AutomationListId, IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { Key } from "react";
import { CopyButtonIdModel } from "../../../CopyButton/CopyButton.definition";
import type { EntityTableCellPropsBase } from "../../EntityTable.definition";

export interface CopyCellProps extends EntityTableCellPropsBase {
  value: string;
}

export class CopyCellListId extends AutomationListId<CopyCellIdModel> {
  constructor(parentId: string, prefix = "CopyCell-", postfix?: string) {
    super(parentId, prefix, CopyCellIdModel, postfix);
  }
}

export class CopyCellIdModel extends IdModelBase {
  value: string;
  copyButton: CopyButtonIdModel;

  constructor(id: IdModelBase["id"], index?: Key, postfix?: string) {
    super(id, index, postfix);

    if (isNullOrWhiteSpace(this.id)) {
      this.copyButton = new CopyButtonIdModel(null);
      return;
    }

    this.value = `${this.id}Value`;
    this.copyButton = new CopyButtonIdModel(`${this.id}CopyButton`);
  }
}
