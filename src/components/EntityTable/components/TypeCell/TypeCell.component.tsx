import { memo, useMemo } from "react";
import { EntityTableClassName } from "../../EntityTable.definition";
import { TypeCellIdModel } from "./TypeCell.definition";
import type { TypeCellProps } from "./TypeCell.definition";
import { getTypeCellLabelFromOrganizationType } from "./TypeCellLabel.utils";

const TypeCellBase = (props: TypeCellProps): JSX.Element => {
  const { id, value } = props;
  const idModel = useMemo(() => new TypeCellIdModel(id), [id]);
  const content = useMemo(() => {
    const type = getTypeCellLabelFromOrganizationType(value);

    return <span>{type}</span>;
  }, [value]);

  return (
    <div id={idModel.id} className={EntityTableClassName.TableCell}>
      {content}
    </div>
  );
};

export const TypeCell = memo(TypeCellBase);
