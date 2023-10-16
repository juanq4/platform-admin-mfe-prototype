import type { EntityTablePaginationDirection } from "../../../components/EntityTable/components";

export interface SearchHookProps<TPageRef> {
  page: TPageRef;
  handlePageChangeBase: (pageRef: TPageRef, pageNumber: number, direction: EntityTablePaginationDirection) => void;
  handleQuery: (page?: TPageRef, searchTerm?: string) => void;
  handleReset: () => void;
}

export interface SearchHookModel<TPageRef> {
  searchTerm: string;
  sanitizedSearchTerm: string;
  handlePageChange: (pageRef: TPageRef, pageNumber: number, direction: EntityTablePaginationDirection) => void;
  handleSearchChange: (searchValue: string) => void;
}
