import type { Dispatch, SetStateAction } from "react";
import type { EntityTablePaginationDirection } from "../../../components/EntityTable/components";

export interface PaginationHookProps<TEntity, TPageRef> {
  items: TEntity[];
  pageState: [TPageRef, Dispatch<SetStateAction<TPageRef>>];
  pageSize?: number;
  validKey: (data: TEntity) => boolean;
  generateRef: (data: TEntity) => TPageRef;
}

export interface PaginationHookModel<T> {
  currentPage: number;
  pageRefs: T[];
  handlePageChange: (pageRef: T, pageNumber: number, direction: EntityTablePaginationDirection) => void;
  handleReset: () => void;
}
