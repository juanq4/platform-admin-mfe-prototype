import { TypeCell } from "./TypeCell.component";
import type { TypeCellListId, TypeCellProps } from "./TypeCell.definition";

export function mapIdToTypeCell(params: TypeCellProps, listId: TypeCellListId): JSX.Element {
  const id = listId?.getId(params?.data?.id);

  return <TypeCell {...params} id={id} />;
}
