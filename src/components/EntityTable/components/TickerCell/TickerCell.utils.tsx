import { TickerCell } from "./TickerCell.component";
import type { TickerCellListId, TickerCellProps } from "./TickerCell.definition";

export function mapIdToTickerCell(params: TickerCellProps, listId: TickerCellListId): JSX.Element {
  const id = listId?.getId(params?.data?.id);

  return <TickerCell {...params} id={id} />;
}
