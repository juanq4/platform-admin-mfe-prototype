import { CopyCell } from "./CopyCell.component";
import type { CopyCellListId, CopyCellProps } from "./CopyCell.definition";

export function mapIdToCopyCell(params: CopyCellProps, listId: CopyCellListId): JSX.Element {
  const id = listId?.getId(params?.data?.id);

  return <CopyCell {...params} id={id} />;
}
