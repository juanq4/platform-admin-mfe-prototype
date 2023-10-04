import type { EntityTablePaginationDirection } from "../../../components";
import type { User } from "../../../schemas/generated/graphql";

export interface AdminUserTableHookProps {
  organizationId: string;
  pause?: boolean;
}

export interface AdminUserTableHookModel {
  currentPage: number;
  pageRefs: [id: string, organizationId: string][];
  loading: boolean;
  users: User[];
  error?: Error;
  handleError: () => void;
  handlePageChange: (
    pageRef: [id: string, organizationId: string],
    pageNumber: number,
    direction: EntityTablePaginationDirection,
  ) => void;
}
