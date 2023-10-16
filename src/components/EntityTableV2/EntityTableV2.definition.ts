import type { TableProps } from "@q4/nimbus-ui";

export type EntityTableV2Props = {
  id: string;
  tableProps: TableProps;
  totalPages: number;
  totalItems: number;
  currentPage: number;
  loading: boolean;
  showError: boolean;
  toolbarComponent: JSX.Element;
  emptyStateComponent: JSX.Element;
  errorStateComponent: JSX.Element;
  handlePageChange: (page: number) => void;
};
