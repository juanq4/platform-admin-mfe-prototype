import { useDebounce } from "@q4/nimbus-ui";
import { useCallback, useEffect, useRef, useState } from "react";
import type { EntityTablePaginationDirection } from "../../components/EntityTable/components/Pagination/Pagination.definition";
import type { SearchHookModel, SearchHookProps } from "./useSearch.definition";

export const useSearch = <TPageRef>(props: SearchHookProps<TPageRef>): SearchHookModel<TPageRef> => {
  const { page, handlePageChangeBase, handleQuery, handleReset } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const sanitizedSearchTerm = useRef(searchTerm);
  const debouncedValue = useDebounce(searchTerm, 400);

  useEffect(() => {
    if (!debouncedValue) {
      return;
    }

    handleReset();
    handleQuery(null, sanitizedSearchTerm.current);
  }, [debouncedValue, handleQuery, handleReset]);

  useEffect(() => {
    if (searchTerm) return;

    handleQuery(page);
  }, [page, searchTerm, handleQuery]);

  const handleSearchChange = useCallback(
    (searchValue: string): void => {
      setSearchTerm(searchValue);
      sanitizedSearchTerm.current = searchValue?.trim();

      if (!sanitizedSearchTerm.current) {
        handleReset();
      }
    },
    [handleReset],
  );

  const handlePageChange = useCallback(
    (pageRef: TPageRef, pageNumber: number, direction: EntityTablePaginationDirection): void => {
      handlePageChangeBase(pageRef, pageNumber, direction);

      if (!debouncedValue) {
        handleQuery(pageRef);
        return;
      }
      handleQuery(pageRef, sanitizedSearchTerm.current);
    },
    [debouncedValue, handlePageChangeBase, handleQuery],
  );

  return {
    searchTerm,
    sanitizedSearchTerm: sanitizedSearchTerm.current,
    handlePageChange,
    handleSearchChange,
  };
};
