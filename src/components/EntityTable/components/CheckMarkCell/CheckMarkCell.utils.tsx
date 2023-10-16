import { CheckMarkCell } from "./CheckMarkCell.component";
import type { CheckMarkCellListId, CheckMarkCellProps } from "./CheckMarkCell.definition";

export function mapIdToCheckMarkCell(params: CheckMarkCellProps, listId: CheckMarkCellListId): JSX.Element {
  const id = listId?.getId(params?.data?.id);

  return <CheckMarkCell {...params} id={id} />;
}
