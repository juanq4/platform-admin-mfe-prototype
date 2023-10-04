import type { GridApi, GridReadyEvent } from "@q4/nimbus-ui/dist/dependencies/agGrid/community";
import { useCallback, useEffect, useRef } from "react";
import type { TableHookModel } from "./useTable.definition";

export const useTable = (): TableHookModel => {
  const gridApi = useRef<GridApi>();

  useEffect(() => {
    function handleResize(): void {
      gridApi.current && gridApi.current.sizeColumnsToFit();
    }

    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleGridReady = useCallback((grid: GridReadyEvent): void => {
    gridApi.current = grid?.api;
  }, []);

  return {
    gridApi: gridApi.current,
    handleGridReady,
  };
};
