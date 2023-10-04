import { isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { RowClickedEvent } from "@q4/nimbus-ui/dist/dependencies/agGrid/community";
import { Permission } from "@q4/platform-definitions";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { generatePath, useHistory, useLocation } from "react-router-dom";
import type { CopyCellProps, StatusCellProps, EntityTableColumnDef, TypeCellProps } from "../../../components";
import { EntityTable } from "../../../components/Admin/EntityTable/EntityTable.component";
import { mapIdToCopyCell } from "../../../components/Admin/EntityTable/components/CopyCell/CopyCell.utils";
import { mapIdToStatusCell } from "../../../components/Admin/EntityTable/components/StatusCell/StatusCell.utils";
import { mapIdToTypeCell } from "../../../components/Admin/EntityTable/components/TypeCell/TypeCell.utils";
import { AdminRoutePath, RoutePathIdLabel } from "../../../configurations";
import { useAdminLoadingContext } from "../../../contexts";
import type { Organization } from "../../../definitions";
import { QueryPaginationDefault, useClaims, usePagination, useSearch } from "../../../hooks";
import type { OrganizationsQueryVariables } from "../../../hooks";
import { OrganizationDetailsMode } from "../../../modules/Admin/Organizations/Details/OrganizationDetails.definition";
import { useOrganizationsLazyQuery } from "../../../schemas/generated/graphql";
import { getOrganizationDetailsMode } from "../../../utils";
import {
  AdminOrganizationsTableCellRenderer,
  AdminOrganizationsToolbarActions,
  AdminOrganizationsViewClassName,
  AdminOrganizationsViewIdModel as ViewIdModel,
  OrganizationsTableHeader,
} from "./Organizations.definition";

const OrganizationsBase = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();

  const columnDefs = useRef<EntityTableColumnDef[]>([
    {
      field: "name",
      headerName: OrganizationsTableHeader.Name,
      minWidth: 220,
      flex: 1,
    },
    {
      field: "active",
      headerName: OrganizationsTableHeader.Status,
      maxWidth: 128,
      minWidth: 128,
      cellRenderer: AdminOrganizationsTableCellRenderer.StatusCell,
    },
    {
      field: "type",
      headerName: OrganizationsTableHeader.Type,
      maxWidth: 128,
      minWidth: 128,
      cellRenderer: AdminOrganizationsTableCellRenderer.TypeCell,
    },
    {
      field: "id",
      headerName: OrganizationsTableHeader.Orgid,
      maxWidth: 330,
      minWidth: 330,
      cellRenderer: AdminOrganizationsTableCellRenderer.OrgIdCell,
    },
  ]);

  const pageState = useState<OrganizationsQueryVariables["page"]>(null);
  const [page] = pageState;

  const [handleOrganizationsQuery, { data: response, loading: organizationLoading, error }] = useOrganizationsLazyQuery();
  const organizations = useMemo(() => response?.organizations?.items ?? [], [response]);

  // #region Pagination Hook
  const validKey = useCallback((lastOrganization: Organization): boolean => {
    const { id } = lastOrganization || {};

    return !isNullOrWhiteSpace(id);
  }, []);

  const generateRef = useCallback(
    (lastOrganization: Organization): OrganizationsQueryVariables["page"] => {
      if (!validKey(lastOrganization)) return null;

      const { id } = lastOrganization;
      return [id];
    },
    [validKey],
  );

  const {
    currentPage,
    pageRefs,
    handlePageChange: handlePageChangeBase,
    handleReset,
  } = usePagination({
    items: organizations,
    pageSize: QueryPaginationDefault.PageSize,
    pageState,
    validKey,
    generateRef,
  });
  // #endregion

  // #region Search Hook
  const handleQuery = useCallback(
    (updatedPage: string[], updatedTerm: string) => {
      handleOrganizationsQuery({ variables: { page: updatedPage, searchTerm: updatedTerm, pageSize: 10 } });
    },
    [handleOrganizationsQuery],
  );

  const { searchTerm, sanitizedSearchTerm, handlePageChange, handleSearchChange } = useSearch({
    page,
    handleReset,
    handlePageChangeBase,
    handleQuery,
  });
  // #endregion

  // #region Loading Hook
  const [loading] = useAdminLoadingContext(ViewIdModel.id, organizationLoading);
  // #endregion

  const claims = useClaims();

  const toolbarActions = useMemo(() => {
    const canCreateOrganizations = claims.permissions.includes(Permission.ManageOrgs);
    return canCreateOrganizations
      ? [
          {
            id: ViewIdModel.addNew.id,
            icon: "q4i-add-4pt",
            label: AdminOrganizationsToolbarActions.CreateNewLabel,
            onClick: () =>
              history.push({
                pathname: AdminRoutePath.OrganizationsCreate,
                state: { background: location, show: "organizationCreateModal" },
              }),
          },
        ]
      : undefined;
  }, [claims.permissions, history, location]);

  const handleRowClick = useCallback(
    (event: RowClickedEvent) => {
      if (isNullOrWhiteSpace(event?.data?.id)) return;

      if (getOrganizationDetailsMode(claims.permissions, event.data.id) == OrganizationDetailsMode.Edit) {
        history.push({
          pathname: generatePath(AdminRoutePath.OrganizationsEdit, { [RoutePathIdLabel.Id]: event.data.id }),
          state: { background: location, show: "orgnizationEditModal" },
        });
      } else {
        history.push({
          pathname: generatePath(AdminRoutePath.OrganizationsView, { [RoutePathIdLabel.Id]: event.data.id }),
          state: { background: location, show: "orgnizationViewModal" },
        });
      }
    },
    [claims.permissions, history, location],
  );

  const handleError = useCallback(() => {
    handleQuery(page, sanitizedSearchTerm);
  }, [page, sanitizedSearchTerm, handleQuery]);

  return (
    <div id={ViewIdModel.id} className={AdminOrganizationsViewClassName.Base}>
      <EntityTable
        id={ViewIdModel.entityTable.id}
        title="All organizations"
        items={organizations}
        loading={loading}
        error={error}
        tableProps={{
          columnDefs: columnDefs.current,
          components: {
            [AdminOrganizationsTableCellRenderer.OrgIdCell]: (params: CopyCellProps) =>
              mapIdToCopyCell(params, ViewIdModel.orgIdCellList),
            [AdminOrganizationsTableCellRenderer.StatusCell]: (params: StatusCellProps) =>
              mapIdToStatusCell(params, ViewIdModel.statusCellList),
            [AdminOrganizationsTableCellRenderer.TypeCell]: (params: TypeCellProps) =>
              mapIdToTypeCell(params, ViewIdModel.typeCellList),
          },
          onRowClicked: handleRowClick,
        }}
        toolbarActions={toolbarActions}
        page={currentPage}
        pageRefs={pageRefs}
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

export const Organizations = memo(OrganizationsBase);
