import { isNullOrWhiteSpace } from "@q4/nimbus-ui";
import { useCallback, useMemo, useState } from "react";
import type { User } from "../../definitions/user.definition";
import { useUsersQuery } from "../../schemas/generated/graphql";
import { useAdminDataContext } from "../useAdminDataContext/useAdminDataContext.hook";
import { usePagination } from "../usePagination/usePagination.hook";
import { QueryPaginationDefault } from "../useQuery/useQuery.definition";
import type { UsersQueryVariables } from "../useUser/useUser.definition";
import type { AdminUserTableHookModel, AdminUserTableHookProps } from "./useAdminUserTable.definition";

export const useAdminUserTable = (props: AdminUserTableHookProps): AdminUserTableHookModel => {
  const { organizationId, pause } = props;

  const pageState = useState<UsersQueryVariables["page"]>(null);
  const [page] = pageState;

  const { setCachedVariables } = useAdminDataContext();

  const variables = { organizationId, page };

  const { data, loading, refetch, ...restQueryResults } = useUsersQuery({
    variables,
    fetchPolicy: "no-cache",
    skip: pause,
    onCompleted: () => {
      setCachedVariables({ userList: variables });
    },
  });

  const users = useMemo(() => data?.users?.items, [data?.users?.items]);

  // #region Pagination Hook
  const validKey = useCallback((lastUser: User): boolean => {
    const { id, organizationId: orgId } = lastUser || {};

    return !(isNullOrWhiteSpace(id) || isNullOrWhiteSpace(orgId));
  }, []);

  const generateRef = useCallback(
    (lastUser: User): UsersQueryVariables["page"] => {
      if (!validKey(lastUser)) return null;

      const { id, organizationId: orgId } = lastUser;
      return [id, orgId];
    },
    [validKey],
  );

  const { currentPage, pageRefs, handlePageChange } = usePagination({
    items: users,
    pageSize: QueryPaginationDefault.PageSize,
    pageState,
    validKey,
    generateRef,
  });
  // #endregion

  const handleError = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    ...restQueryResults,
    loading,
    users,
    currentPage,
    pageRefs: (pageRefs as [id: string, organizationId: string][]) ?? [],
    handlePageChange,
    handleError,
  };
};
