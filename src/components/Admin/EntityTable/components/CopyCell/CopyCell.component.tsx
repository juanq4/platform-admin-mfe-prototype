import { isNullOrWhiteSpace } from "@q4/nimbus-ui";
import React, { memo, useMemo } from "react";
import { CopyButton } from "../../../CopyButton/CopyButton.component";
import { EntityTableClassName } from "../../EntityTable.definition";
import { CopyCellIdModel } from "./CopyCell.definition";
import type { CopyCellProps } from "./CopyCell.definition";

const CopyCellBase = (props: CopyCellProps): JSX.Element => {
  const { id, value } = props;

  const idModel = useMemo(() => new CopyCellIdModel(id), [id]);

  const content = useMemo(() => {
    if (isNullOrWhiteSpace(value)) return <span id={idModel.value}>-</span>;

    return (
      <>
        <span id={idModel.value}>{value}</span>
        <CopyButton id={idModel.copyButton.id} label="Org Id" value={value} />
      </>
    );
  }, [idModel, value]);

  return (
    <div id={idModel.id} className={EntityTableClassName.TableCell}>
      {content}
    </div>
  );
};

export const CopyCell = memo(CopyCellBase);
