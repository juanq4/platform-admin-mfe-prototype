import { StatusCell } from "./StatusCell.component";
import type { StatusCellListId, StatusCellProps } from "./StatusCell.definition";

export function mapIdToStatusCell(params: StatusCellProps, listId: StatusCellListId): JSX.Element {
  const id = listId?.getId(params?.data?.id);

  return <StatusCell {...params} id={id} />;
}
