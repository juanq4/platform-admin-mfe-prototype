import React, { memo, useMemo } from "react";
import { EntityTableClassName } from "../../EntityTable.definition";
import { CheckMarkCellIdModel } from "./CheckMarkCell.definition";
import type { CheckMarkCellProps } from "./CheckMarkCell.definition";

const CheckMarkCellBase = (props: CheckMarkCellProps): JSX.Element => {
  const { id, value } = props;

  const idModel = useMemo(() => new CheckMarkCellIdModel(id), [id]);

  if (!value) return <span id={idModel.id} />;

  return (
    <div
      className={`${EntityTableClassName.TableCell} ${EntityTableClassName.TableCellWithCenteredModifier} ${EntityTableClassName.TableCellWithIconModifier}`}
    >
      <span id={idModel.id} className="q4i-checkmark-4pt" />
    </div>
  );
};

export const CheckMarkCell = memo(CheckMarkCellBase);
