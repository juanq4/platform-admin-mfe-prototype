import "./AdminUserTable.scss";
import { memo, useMemo, useRef } from "react";
import { EntityTable } from "../../EntityTable/EntityTable.component";
import type { EntityTableColumnDef } from "../../EntityTable/EntityTable.definition";
import type { StatusCellProps } from "../../EntityTable/components/StatusCell/StatusCell.definition";
import { mapIdToStatusCell } from "../../EntityTable/components/StatusCell/StatusCell.utils";
import type { AdminUserTableProps } from "./AdminUserTable.definition";
import {
  AdminUserTableCellRenderer,
  AdminUserTableClassName,
  AdminUserTableHeader,
  AdminUserTableIdModel,
  AdminUserTableDefault,
} from "./AdminUserTable.definition";

const AdminUserTableBase = (props: AdminUserTableProps): JSX.Element => {
  const { id, tableProps = {}, omitColumns, showCheckbox, ...entityTableProps } = props;

  const columnDefs = useRef<EntityTableColumnDef[]>([
    {
      field: "email",
      headerName: AdminUserTableHeader.Email,
      minWidth: 220,
      flex: 1,
      headerCheckboxSelection: showCheckbox,
      checkboxSelection: showCheckbox,
      showDisabledCheckboxes: true,
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
  ]);

  const idModel = useMemo(() => new AdminUserTableIdModel(id), [id]);
  const { columnDefs: additionalColumns = [], components, ...restTableProps } = tableProps;

  const columns = useMemo(() => {
    const filteredColumns = columnDefs.current.filter((col) => !(omitColumns || []).includes(col.field));
    return [...filteredColumns, ...additionalColumns];
  }, [additionalColumns, omitColumns]);

  return (
    <div id={idModel.id} className={AdminUserTableClassName.Base}>
      <EntityTable
        id={idModel.entityTable.id}
        title={AdminUserTableDefault.ToolbarTitle}
        tableProps={{
          columnDefs: columns,
          components: {
            [AdminUserTableCellRenderer.StatusCell]: (params: StatusCellProps) =>
              mapIdToStatusCell(params, idModel.statusCellList),
            ...components,
          },
          ...restTableProps,
        }}
        {...entityTableProps}
      />
    </div>
  );
};

export const AdminUserTable = memo(AdminUserTableBase);
