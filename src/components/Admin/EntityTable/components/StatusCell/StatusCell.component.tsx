import React, { memo, useMemo } from "react";
import { StatusCellLabel, StatusCellIdModel } from "./StatusCell.definition";
import type { StatusCellProps } from "./StatusCell.definition";

const StatusCellBase = (props: StatusCellProps): JSX.Element => {
  const { id, value } = props;

  const idModel = useMemo(() => new StatusCellIdModel(id), [id]);

  return <span id={idModel.id}>{!value ? StatusCellLabel.Deactivated : StatusCellLabel.Active}</span>;
};

export const StatusCell = memo(StatusCellBase);
