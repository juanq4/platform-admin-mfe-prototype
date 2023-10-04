import { isEmpty } from "@q4/nimbus-ui";
import React, { memo } from "react";
import { TickerCellIdModel } from "./TickerCell.definition";
import type { TickerCellProps } from "./TickerCell.definition";

const TickerCellBase = (props: TickerCellProps): JSX.Element => {
  const { id, value } = props;

  const idModel = new TickerCellIdModel(id);
  const ticker = isEmpty(value) ? "" : value[0].split(".")[0];

  return <span id={idModel.id}>{ticker}</span>;
};

export const TickerCell = memo(TickerCellBase);
