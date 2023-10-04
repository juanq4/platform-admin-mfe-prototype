import { isEmpty, isNil } from "@q4/nimbus-ui";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  EntityTablePaginationDefault,
  EntityTablePaginationDirection,
} from "../../../components/Admin/EntityTable/components";
import type { PaginationHookModel, PaginationHookProps } from "./usePagination.definition";

export const usePagination = <TEntity, TPageRef>(
  props: PaginationHookProps<TEntity, TPageRef>,
): PaginationHookModel<TPageRef> => {
  const { pageSize, pageState, items, generateRef, validKey } = props;

  const [, setPage] = pageState || [];
  const [pageRefs, setPageRefs] = useState<TPageRef[]>(null);
  const currentPage = useRef(EntityTablePaginationDefault.InitialPage);
  const pageDirection = useRef(null);
  const resetPageRefs = useRef(false);

  const handleReset = useCallback((): void => {
    setPage?.(null);
    resetPageRefs.current = true;
    pageDirection.current = null;
    currentPage.current = EntityTablePaginationDefault.InitialPage;
  }, [setPage]);

  useEffect(() => {
    const [last] = items?.slice(-1) ?? [];
    if (!validKey?.(last)) return;

    setPageRefs((previous) => {
      const updated = isEmpty(previous) || resetPageRefs.current ? [] : [...previous];
      resetPageRefs.current = false;

      if (!isNil(pageSize) && items?.length !== pageSize) return updated;

      if (pageDirection.current === EntityTablePaginationDirection.Previous) {
        updated.splice(currentPage.current - 1);
      }

      const newRef = generateRef?.(last);
      if (isEmpty(newRef)) return updated;

      return updated.concat([newRef]);
    });
  }, [items, pageSize, generateRef, validKey]);

  const handlePageChange = useCallback(
    (pageRef: TPageRef, updatedPage: number, direction: EntityTablePaginationDirection): void => {
      setPage?.(pageRef);
      pageDirection.current = direction;
      currentPage.current = updatedPage;
    },
    [setPage],
  );

  return {
    currentPage: currentPage.current,
    pageRefs,
    handlePageChange,
    handleReset,
  };
};
