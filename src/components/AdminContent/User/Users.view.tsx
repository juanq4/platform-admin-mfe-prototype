import { ButtonTheme, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { RowClickedEvent } from "@q4/nimbus-ui/dist/dependencies/agGrid/community";
import React, { memo, useCallback, useMemo, useState } from "react";
import { generatePath, useHistory, useLocation } from "react-router-dom";
import AddUserImage from "../../../assets/icons/addUserImage.svg";
import { AdminRoutePath, RoutePathIdLabel } from "../../../configurations/navigation.configuration";
import { useAdminData } from "../../../contexts/data/data.hook";
import { useAdminLoadingContext } from "../../../contexts/loading/useLoadingContext.hook";
import { usePagination } from "../../../hooks/usePagination/usePagination.hook";
import { QueryPaginationDefault } from "../../../hooks/useQuery/useQuery.definition";
import { useSearch } from "../../../hooks/useSearch/useSearch.hook";
// import { useClaims } from "../../../hooks/useClaims/useClaims.hook";
import { useUsersLazyQuery } from "../../../schemas/generated/graphql";
import type { User, UsersQueryVariables } from "../../../schemas/generated/graphql";
import { hasRequiredPermission } from "../../../utils/permission/permission.utils";
import { AdminUserTable } from "../../Tables/user/AdminUserTable.component";
import {
  AdminOrganizationCondition,
  AdminUsersViewIdModel as ViewIdModel,
  AdminUserViewCreateRoute,
} from "./Users.definition";

const UsersBase = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const claims = useClaims();
  const { setCachedVariables } = useAdminData();

  const hasOrganizationAccess = useMemo(
    () => hasRequiredPermission(claims.permissions, AdminOrganizationCondition),
    [claims.permissions],
  );
  /*
   * Note: if the user has access to the organization view then they should see all users
   * so we don't need an organizationId if that is the case.
   */
  const organizationId = useMemo(
    () => (hasOrganizationAccess ? null : claims.organizationId),
    [hasOrganizationAccess, claims.organizationId],
  );

  const pageState = useState<UsersQueryVariables["page"]>(null);
  const [page] = pageState;

  const [handleUsersQuery, { data: response, loading: userLoading, error }] = useUsersLazyQuery({
    variables: {
      pageSize: 10,
    },
  });

  const users = useMemo(() => response?.users?.items ?? [], [response?.users?.items]);
  const validKey = useCallback((lastUser: User): boolean => {
    const { id } = lastUser || {};

    return !isNullOrWhiteSpace(id);
  }, []);

  const generateRef = useCallback(
    (lastUser: User): UsersQueryVariables["page"] => {
      if (!validKey(lastUser)) return null;

      const { id, organizationId: orgId } = lastUser;
      return [id, orgId];
    },
    [validKey],
  );

  const {
    currentPage,
    pageRefs,
    handlePageChange: handlePageChangeBase,
    handleReset,
  } = usePagination({
    items: users,
    pageSize: QueryPaginationDefault.PageSize,
    pageState,
    validKey,
    generateRef,
  });
  // #endregion

  // #region Search Hook
  const handleUsers = useCallback(
    (updatedPage: string[], updatedSearchTerm: string): void => {
      const variables = { organizationId, page: updatedPage, searchTerm: updatedSearchTerm };
      setCachedVariables({ userList: { ...variables, pageSize: 10 } });
      handleUsersQuery({ variables: variables });
    },
    [organizationId, setCachedVariables, handleUsersQuery],
  );

  const { searchTerm, sanitizedSearchTerm, handlePageChange, handleSearchChange } = useSearch({
    page,
    handleReset,
    handlePageChangeBase,
    handleQuery: handleUsers,
  });
  // #endregion

  const handleError = useCallback(() => {
    const variables = { page, searchTerm: sanitizedSearchTerm, organizationId };
    setCachedVariables({ userList: { ...variables, pageSize: 10 } });
    handleUsersQuery({ variables: variables });
  }, [page, sanitizedSearchTerm, organizationId, setCachedVariables, handleUsersQuery]);

  // #region Loading Hook
  const [globalLoading] = useAdminLoadingContext(ViewIdModel.id, userLoading);
  const loading = useMemo(() => globalLoading || userLoading, [globalLoading, userLoading]);
  // #endregion

  const handleCreate = useCallback(() => {
    history.push({
      pathname: AdminUserViewCreateRoute,
      state: { background: location, show: "userCreateModal" },
    });
  }, [history, location]);

  const handleRowClick = useCallback(
    (event: RowClickedEvent) => {
      if (isNullOrWhiteSpace(event?.data?.id)) return;

      if (hasOrganizationAccess) {
        if (isNullOrWhiteSpace(event?.data?.organizationId)) return;
        history.push({
          pathname: generatePath(AdminRoutePath.OrganizationsUserEdit, {
            [RoutePathIdLabel.Id]: event.data.organizationId,
            [RoutePathIdLabel.UserId]: event.data.id,
          }),
          search: `returnUrl=${AdminRoutePath.Users}`,
          state: { background: location },
        });

        return;
      }
      history.push(generatePath(AdminRoutePath.UsersEdit, { userId: event.data.id }));
    },
    [hasOrganizationAccess, history, location],
  );

  const actions = useMemo(() => {
    if (hasOrganizationAccess) {
      return null;
    }

    return [{ id: ViewIdModel.create.id, icon: "q4i-add-4pt", label: "ADD NEW", onClick: handleCreate }];
  }, [hasOrganizationAccess, handleCreate]);

  return (
    <div id={ViewIdModel.id}>
      <AdminUserTable
        id={ViewIdModel.table.id}
        items={users}
        error={error}
        loading={loading}
        page={currentPage}
        pageRefs={pageRefs}
        placeholderProps={{
          image: AddUserImage,
          actions: [
            {
              id: ViewIdModel.placeholderCreate.id,
              theme: ButtonTheme.Q4Blue,
              icon: "q4i-add-4pt",
              label: "Add User",
              onClick: handleCreate,
            },
          ],
        }}
        toolbarActions={actions}
        tableProps={{ onRowClicked: handleRowClick }}
        onError={handleError}
        onPageChange={handlePageChange}
        searchProps={{
          value: searchTerm,
          onInputChange: handleSearchChange,
        }}
      />
    </div>
  );
};

export const Users = memo(UsersBase);
