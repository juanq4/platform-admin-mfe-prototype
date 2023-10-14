import type { GridApi, GridReadyEvent } from "@q4/nimbus-ui/dist/dependencies/agGrid/community";

export interface TableHookModel {
  gridApi: GridApi;
  handleGridReady: (grid: GridReadyEvent) => void;
}
