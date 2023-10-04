import "./EditTeamTables.component.scss";
import { isEmpty, isNullOrWhiteSpace, Origin } from "@q4/nimbus-ui";
import type { IHeaderParams } from "@q4/nimbus-ui/dist/dependencies/agGrid/community";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { EntityTablePaginationDirection } from "../../../../../../../components";
import type { EntityTableColumnDef } from "../../../../../../../components/Admin/EntityTable/EntityTable.definition";
import { AdminOrganizationTable } from "../../../../../../../components/Admin/Tables/organization";
import { AdminUserTable, AdminUserTableHeader } from "../../../../../../../components/Admin/Tables/user";
import type { Organization, User } from "../../../../../../../definitions";
import { QueryPaginationDefault, usePagination } from "../../../../../../../hooks";
import type { OrganizationsQueryVariables, UsersQueryVariables } from "../../../../../../../hooks";
import { WideTableWrapper } from "../../OrganizationsTeam.style";
import { AddUsersTeamsFormLanguage } from "../AddUsersForm/AddUsersTeamsForm.definition";
import { CustomInfoIcon } from "../AddUsersForm/AddUsersTeamsForm.style";
import type { EditTeamTablesProps } from "./EditTeamTables.definition";
import { EditTeamTablesIdModel, EditTeamTablesLanguage } from "./EditTeamTables.definition";

const EditTeamTablesBase = (props: EditTeamTablesProps): JSX.Element => {
  const { id, organizationTable, usersTable, onEditOrganizations, onEditUsers } = props;
  const { items: organizations, ...restOrganizationTableProps } = organizationTable;
  const { items: users, ...restUsersTableProps } = usersTable;
  const idModel = useMemo(() => new EditTeamTablesIdModel(id), [id]);

  const organizationPageState = useState<OrganizationsQueryVariables["page"]>(null);
  const [organizationsPageData, setOrganizationsPageData] = useState<Organization[]>([]);
  const [organizationsSearchTerm, setOrganizationSearchTerm] = useState<string>("");

  const usersPageState = useState<UsersQueryVariables["page"]>(null);
  const [usersPageData, setUsersPageData] = useState<User[]>([]);
  const [usersSearchTerm, setUsersSearchTerm] = useState<string>("");

  const teamsColumn = useRef<EntityTableColumnDef>({
    field: "teams",
    headerName: AdminUserTableHeader.Teams,
    width: 170,
    wrapText: true,
    autoHeight: true,
  });

  const organizationsFiltered = useMemo(() => {
    if (isEmpty(organizations)) {
      return [];
    }
    if (isNullOrWhiteSpace(organizationsSearchTerm)) {
      return organizations;
    }

    return organizations.filter((org: Organization) =>
      org.name.toLowerCase().includes(organizationsSearchTerm.trim().toLowerCase()),
    );
  }, [organizationsSearchTerm, organizations]);

  const usersFiltered = useMemo(() => {
    if (isEmpty(users)) {
      return [];
    }
    if (isNullOrWhiteSpace(usersSearchTerm)) {
      return users;
    }

    return users.filter((user: User) => user.search.toLowerCase().includes(usersSearchTerm.trim().toLowerCase()));
  }, [usersSearchTerm, users]);

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

  // #region Organizations Pagination Hook
  const validOrganizationKey = useCallback((lastOrganization: Organization): boolean => {
    const { id } = lastOrganization || {};

    return !isNullOrWhiteSpace(id);
  }, []);

  const generateOrganizationRef = useCallback(
    (lastOrganization: Organization): OrganizationsQueryVariables["page"] => {
      if (!validOrganizationKey(lastOrganization)) return null;

      const { id } = lastOrganization;
      return [id];
    },
    [validOrganizationKey],
  );

  const {
    currentPage: currentOrganizationsPage,
    pageRefs: organizationsPageRefs,
    handlePageChange: handleOrganizationsPageChangeBase,
    handleReset: handleOrganizationsReset,
  } = usePagination({
    items: organizationsPageData,
    pageSize: QueryPaginationDefault.PageSize,
    pageState: organizationPageState,
    validKey: validOrganizationKey,
    generateRef: generateOrganizationRef,
  });

  const handleOnOrganizationPageChange = useCallback(
    (pageRef: OrganizationsQueryVariables["page"], page: number, direction: EntityTablePaginationDirection) => {
      handleOrganizationsPageChangeBase(pageRef, page, direction);

      const startIndex = (page - 1) * QueryPaginationDefault.PageSize;
      const portion = organizationsFiltered.slice(startIndex, startIndex + QueryPaginationDefault.PageSize);

      setOrganizationsPageData(portion);
    },
    [handleOrganizationsPageChangeBase, organizationsFiltered],
  );

  useEffect(() => {
    if (isEmpty(organizationsFiltered)) {
      setOrganizationsPageData(null);
      return;
    }

    handleOrganizationsReset();
    handleOnOrganizationPageChange(null, 1, 0);
  }, [handleOnOrganizationPageChange, handleOrganizationsReset, organizationsFiltered]);

  function handleOrganizationSearchChange(searchTerm: string) {
    setOrganizationSearchTerm(searchTerm);
  }
  // #region End

  // #region Users Pagination Hook
  const validUserKey = useCallback((lastUser: User): boolean => {
    const { id } = lastUser || {};

    return !isNullOrWhiteSpace(id);
  }, []);

  const generateUserRef = useCallback(
    (lastUser: User): UsersQueryVariables["page"] => {
      if (!validUserKey(lastUser)) return null;

      const { id, organizationId: orgId } = lastUser;

      return [id, orgId];
    },
    [validUserKey],
  );

  const {
    currentPage: currentUsersPage,
    pageRefs: usersPageRefs,
    handlePageChange: handleUserPageChangeBase,
    handleReset: handleUsersReset,
  } = usePagination({
    items: usersPageData,
    pageSize: QueryPaginationDefault.PageSize,
    pageState: usersPageState,
    validKey: validUserKey,
    generateRef: generateUserRef,
  });

  const handleOnUsersPageChange = useCallback(
    (pageRef: UsersQueryVariables["page"], page: number, direction: EntityTablePaginationDirection) => {
      handleUserPageChangeBase(pageRef, page, direction);

      const startIndex = (page - 1) * QueryPaginationDefault.PageSize;
      const portion = usersFiltered.slice(startIndex, startIndex + QueryPaginationDefault.PageSize);

      setUsersPageData(portion);
    },
    [handleUserPageChangeBase, usersFiltered],
  );

  useEffect(() => {
    if (isEmpty(usersFiltered)) {
      setUsersPageData(null);
      return;
    }

    handleUsersReset();
    handleOnUsersPageChange(null, 1, 0);
  }, [handleOnUsersPageChange, handleUsersReset, usersFiltered]);

  function handleUsersSearchChange(searchTerm: string) {
    setUsersSearchTerm(searchTerm);
  }
  // #region End

  return (
    <>
      <WideTableWrapper className="edit-team-name-form" width="1-of-1">
        <AdminOrganizationTable
          id={idModel.orgsTable.id}
          title={EditTeamTablesLanguage.OrgsTitle}
          items={organizationsPageData}
          page={currentOrganizationsPage}
          pageRefs={(organizationsFiltered || []).length > QueryPaginationDefault.PageSize ? organizationsPageRefs : null}
          onPageChange={handleOnOrganizationPageChange}
          placeholderProps={{
            subtitle: isEmpty(organizations) ? EditTeamTablesLanguage.NoOrganizations : EditTeamTablesLanguage.NoResults,
          }}
          {...restOrganizationTableProps}
          toolbarActions={[
            {
              id: idModel.editOrganizations.id,
              label: EditTeamTablesLanguage.OrgsButton,
              onClick: onEditOrganizations,
            },
          ]}
          searchProps={{
            value: organizationsSearchTerm,
            onInputChange: handleOrganizationSearchChange,
          }}
        />
        <AdminUserTable
          id={idModel.usersTable.id}
          title={EditTeamTablesLanguage.UsersTitle}
          items={usersPageData}
          page={currentUsersPage}
          pageRefs={(usersFiltered || []).length > QueryPaginationDefault.PageSize ? usersPageRefs : null}
          onPageChange={handleOnUsersPageChange}
          omitColumns={["organizationId"]}
          tableProps={{
            columnDefs: [teamsColumn.current],
            components: customHeaderComponent,
          }}
          {...restUsersTableProps}
          placeholderProps={{
            subtitle: isEmpty(users) ? EditTeamTablesLanguage.NoUsers : EditTeamTablesLanguage.NoResults,
          }}
          toolbarActions={[
            {
              id: idModel.editUser.id,
              label: EditTeamTablesLanguage.UsersButton,
              onClick: onEditUsers,
            },
          ]}
          searchProps={{
            value: usersSearchTerm,
            onInputChange: handleUsersSearchChange,
          }}
        />
      </WideTableWrapper>
    </>
  );
};

export const EditTeamTablesForm = memo(EditTeamTablesBase);
