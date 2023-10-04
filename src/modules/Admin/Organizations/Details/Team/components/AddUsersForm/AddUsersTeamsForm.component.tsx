import "./AddUsersTeamsForm.component.scss";
import { isEmpty, isNullOrWhiteSpace, Origin } from "@q4/nimbus-ui";
import type {
  RowClickedEvent,
  RowNode,
  IHeaderParams,
  RowDataChangedEvent,
} from "@q4/nimbus-ui/dist/dependencies/agGrid/community";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { EntityTableColumnDef } from "../../../../../../../components/Admin/EntityTable/EntityTable.definition";
import type { EntityTablePaginationDirection } from "../../../../../../../components/Admin/EntityTable/components/Pagination/Pagination.definition";
import { AdminUserTable } from "../../../../../../../components/Admin/Tables/user/AdminUserTable.component";
import { AdminUserTableHeader } from "../../../../../../../components/Admin/Tables/user/AdminUserTable.definition";
import type { User } from "../../../../../../../definitions";
import type { UsersQueryVariables } from "../../../../../../../hooks";
import { QueryPaginationDefault, usePagination } from "../../../../../../../hooks";
import { getUsersWithTeams, searchUserFromList } from "../../../../../../../utils";
import { EditTeamTablesLanguage } from "../EditTeamTables/EditTeamTables.definition";
import { AddUsersTeamsFormIdModel, AddUsersTeamsFormLanguage } from "./AddUsersTeamsForm.definition";
import type { AddUsersTeamsFormProps } from "./AddUsersTeamsForm.definition";
import { CustomInfoIcon } from "./AddUsersTeamsForm.style";

const AddUsersTeamsFormBase = (props: AddUsersTeamsFormProps): JSX.Element => {
  const { id, users, teams, selectedUsers, isLoading, error, onUsersError, onUserSelect, onUserRemove } = props;

  const idModel = useMemo(() => new AddUsersTeamsFormIdModel(id), [id]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const pageState = useState<UsersQueryVariables["page"]>(null);
  const [pageData, setPageData] = useState<User[]>([]);

  const teamsColumn = useRef<EntityTableColumnDef>({
    field: "teams",
    headerName: AdminUserTableHeader.Teams,
    width: 170,
    wrapText: true,
    autoHeight: true,
  });

  const usersFiltered = useMemo(() => {
    const usersWithTeams = getUsersWithTeams(users, teams);
    if (isEmpty(users)) {
      return [];
    }
    if (isNullOrWhiteSpace(searchTerm)) {
      return usersWithTeams;
    }

    return searchUserFromList(users, searchTerm);
  }, [searchTerm, users, teams]);

  const handleIsRowSelectable = useMemo(() => {
    return (params: RowNode) => {
      return !!params.data && !isLoading;
    };
  }, [isLoading]);

  const handleDataChange = useCallback(
    (event: RowDataChangedEvent) => {
      event.api.forEachNode((node: RowNode) => node.setSelected(!!node.data && selectedUsers.includes(node.data.id)));
    },
    [selectedUsers],
  );

  const customHeaderComponent = useMemo(() => {
    return {
      agColumnHeader: (props: IHeaderParams): JSX.Element => {
        return (
          <>
            {props.displayName}
            {props.displayName === AdminUserTableHeader.Teams && (
              <CustomInfoIcon
                id={idModel.teamsInfo.id}
                tooltipProps={{
                  label: AddUsersTeamsFormLanguage.Teams,
                  position: Origin.Bottom,
                }}
              />
            )}
          </>
        );
      },
    };
  }, [idModel.teamsInfo.id]);

  function handleCheckedUser(event: RowClickedEvent) {
    if (event.node.isSelected()) onUserSelect && onUserSelect(event.data.id);
    else onUserRemove && onUserRemove(event.data.id);
  }

  // #region Users Pagination Hook
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

  const { currentPage, pageRefs, handlePageChange, handleReset } = usePagination({
    items: pageData,
    pageSize: QueryPaginationDefault.PageSize,
    pageState: pageState,
    validKey,
    generateRef,
  });

  const handleOnPageChange = useCallback(
    (pageRef: UsersQueryVariables["page"], page: number, direction: EntityTablePaginationDirection) => {
      handlePageChange(pageRef, page, direction);

      const startIndex = (page - 1) * QueryPaginationDefault.PageSize;
      const portion = usersFiltered.slice(startIndex, startIndex + QueryPaginationDefault.PageSize);

      setPageData(portion);
    },
    [handlePageChange, usersFiltered],
  );

  useEffect(() => {
    if (isEmpty(usersFiltered)) {
      setPageData(null);
      return;
    }

    handleReset();
    handleOnPageChange(null, 1, 0);
  }, [handleOnPageChange, handleReset, usersFiltered]);

  function handleSearchChange(searchTerm: string) {
    setSearchTerm(searchTerm);
  }
  // #region End

  return (
    <div id={idModel.id} className="add-users-teams-form">
      <AdminUserTable
        id={idModel.table.id}
        items={pageData}
        error={error}
        showCheckbox
        loading={isLoading}
        page={currentPage}
        pageRefs={(usersFiltered || []).length > QueryPaginationDefault.PageSize ? pageRefs : null}
        onPageChange={handleOnPageChange}
        omitColumns={["organizationId"]}
        placeholderProps={{
          subtitle: isEmpty(users) ? EditTeamTablesLanguage.NoUsers : EditTeamTablesLanguage.NoResults,
        }}
        tableProps={{
          columnDefs: [teamsColumn.current],
          rowSelection: "multiple",
          suppressRowClickSelection: true,
          components: customHeaderComponent,
          isRowSelectable: handleIsRowSelectable,
          onRowSelected: handleCheckedUser,
          onRowDataChanged: handleDataChange,
        }}
        searchProps={{
          value: searchTerm,
          onInputChange: handleSearchChange,
        }}
        onError={onUsersError}
      />
    </div>
  );
};

export const AddUsersTeamsForm = memo(AddUsersTeamsFormBase);
