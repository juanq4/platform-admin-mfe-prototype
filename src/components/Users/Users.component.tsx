import { Button, ButtonTheme, isNullOrWhiteSpace, PlaceholderContent, Text, TextPreset } from "@q4/nimbus-ui";
import type { RowClickedEvent } from "@q4/nimbus-ui/dist/dependencies/agGrid/community";
import { memo, useCallback, useMemo, useState } from "react";
import { generatePath, useHistory, useLocation } from "react-router-dom";
import AddUserImage from "../../assets/icons/addUserImage.svg";
import ErrorImage from "../../assets/icons/adminError.svg";
import { AdminRoutePath, RoutePathIdLabel } from "../../configurations/navigation.configuration";
import { QueryPaginationDefault } from "../../hooks/useQuery/useQuery.definition";
import { useUsersByOrgQuery } from "../../schemas/generated/graphql";
import type { StatusCellProps } from "../EntityTable/components/StatusCell/StatusCell.definition";
import { StatusCellListId } from "../EntityTable/components/StatusCell/StatusCell.definition";
import { mapIdToStatusCell } from "../EntityTable/components/StatusCell/StatusCell.utils";
import { EntityTableV2 } from "../EntityTableV2/EntityTableV2.component";
import { AdminUserTableHeader, AdminUserTableCellRenderer } from "../Tables/user/AdminUserTable.definition";
import type { OrganizationUsersProps } from "./Users.defintion";
import { UsersTableId } from "./Users.defintion";

const ToolbarComponent = ({ onCreateUser }: Pick<OrganizationUsersProps, "onCreateUser">): JSX.Element => (
  <>
    <Text preset={TextPreset.Title}>All users</Text>
    <Button label="ADD NEW" icon="q4i-add-4pt" onClick={onCreateUser} />
  </>
);

const EmptyStateComponent = ({ onCreateUser }: Pick<OrganizationUsersProps, "onCreateUser">): JSX.Element => (
  <PlaceholderContent
    image={AddUserImage}
    actions={[
      {
        theme: ButtonTheme.Q4Blue,
        icon: "q4i-add-4pt",
        label: "Add User",
        onClick: onCreateUser,
      },
    ]}
  />
);

const ErrorStateComponent = ({ handleError, loading }: { handleError: () => void; loading: boolean }): JSX.Element => (
  <PlaceholderContent
    image={ErrorImage}
    title="Failed To Load Data"
    subtitle="Please click refresh to try again."
    actions={[
      {
        label: "REFRESH",
        loading,
        onClick: handleError,
      },
    ]}
  />
);

const columnDefs = [
  {
    field: "email",
    headerName: AdminUserTableHeader.Email,
    minWidth: 220,
    flex: 1,
  },
  {
    field: "firstName",
    headerName: AdminUserTableHeader.FirstName,
    maxWidth: 150,
    minWidth: 150,
  },
  {
    field: "lastName",
    headerName: AdminUserTableHeader.LastName,
    maxWidth: 150,
    minWidth: 150,
  },
  {
    field: "friendlyName",
    headerName: AdminUserTableHeader.FriendlyName,
    maxWidth: 150,
    minWidth: 150,
  },
  {
    field: "active",
    headerName: AdminUserTableHeader.Status,
    maxWidth: 120,
    minWidth: 120,
    cellRenderer: AdminUserTableCellRenderer.StatusCell,
  },
  {
    field: "roles",
    headerName: AdminUserTableHeader.Role,
    maxWidth: 140,
    minWidth: 140,
  },
  {
    field: "organizationId",
    headerName: AdminUserTableHeader.Organization,
    maxWidth: 300,
    minWidth: 300,
  },
];

const Users = (props: OrganizationUsersProps): JSX.Element => {
  const { organizationId, onCreateUser } = props;
  const history = useHistory();
  const location = useLocation();

  const [page, setPage] = useState(1);

  const {
    data,
    previousData: cachedData,
    loading,
    refetch,
    error,
  } = useUsersByOrgQuery({
    variables: {
      organizationId,
      pagination: { page, pageSize: QueryPaginationDefault.PageSize },
    },
    fetchPolicy: "cache-and-network",
  });

  const users = useMemo(
    () => (loading ? cachedData?.usersByOrganization?.records : data?.usersByOrganization?.records) || [],
    [data?.usersByOrganization?.records, loading, cachedData?.usersByOrganization?.records],
  );
  const totalPages = useMemo(
    () => (loading ? cachedData?.usersByOrganization?.totalPages : data?.usersByOrganization?.totalPages) || 1,
    [data?.usersByOrganization?.totalPages, loading, cachedData?.usersByOrganization?.totalPages],
  );
  const totalItems = useMemo(
    () => (loading ? cachedData?.usersByOrganization?.totalItems : data?.usersByOrganization?.totalItems) || 0,
    [data?.usersByOrganization?.totalItems, loading, cachedData?.usersByOrganization?.totalItems],
  );

  const handleRowClick = useCallback(
    (event: RowClickedEvent) => {
      if (isNullOrWhiteSpace(event?.data?.id) || isNullOrWhiteSpace(event?.data?.organizationId)) return;

      history.push({
        pathname: generatePath(AdminRoutePath.OrganizationsUserEdit, {
          [RoutePathIdLabel.Id]: event.data.organizationId,
          [RoutePathIdLabel.UserId]: event.data.id,
        }),
        state: { background: location, show: "userEditModal" },
      });
    },
    [history, location],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page);
    },
    [setPage],
  );

  return (
    <EntityTableV2
      id={UsersTableId}
      tableProps={{
        columnDefs,
        loading: false,
        rowData: users,
        components: {
          [AdminUserTableCellRenderer.StatusCell]: (params: StatusCellProps) =>
            mapIdToStatusCell(params, new StatusCellListId("edit-organization-users-table")),
        },
        onRowClicked: handleRowClick,
      }}
      totalPages={totalPages}
      totalItems={totalItems}
      currentPage={page}
      loading={loading}
      showError={!!error}
      toolbarComponent={<ToolbarComponent onCreateUser={onCreateUser} />}
      emptyStateComponent={<EmptyStateComponent onCreateUser={onCreateUser} />}
      errorStateComponent={<ErrorStateComponent loading={loading} handleError={refetch} />}
      handlePageChange={handlePageChange}
    />
  );
};

export const OrganizationUsers = memo(Users);
