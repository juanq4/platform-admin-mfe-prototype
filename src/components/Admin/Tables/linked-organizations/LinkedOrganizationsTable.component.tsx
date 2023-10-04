import { memo, useMemo, useRef } from "react";
import { AdminOrganizationsTableCellRenderer } from "../../../../modules/Admin/Details/Organizations.definition";
import type { EntityTableColumnDef } from "../../EntityTable/";
import { EntityTable } from "../../EntityTable/";
import type { LinkedOrganizationsTableProps } from "./LinkedOrganizationTable.definition";
import {
  AdminLinkedTableHeader,
  LinkedOrganizationTableDefault,
  LinkedOrganizationTableIdModel,
} from "./LinkedOrganizationTable.definition";

const LinkedOrganizationTableBase = (props: LinkedOrganizationsTableProps): JSX.Element => {
  const { id, tableProps = {}, ...entityTableProps } = props;
  const idModel = useMemo(() => new LinkedOrganizationTableIdModel(id), [id]);

  const columnDefs = useRef<EntityTableColumnDef[]>([
    {
      field: "name",
      headerName: AdminLinkedTableHeader.OrganizationName,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "ticker",
      headerName: AdminLinkedTableHeader.StockTicker,
      maxWidth: 150,
      minWidth: 150,
      valueFormatter: function getTicker(params) {
        return `${params.data.ticker} | ${params.data.exchange}`;
      },
    },
    {
      field: "active",
      headerName: AdminLinkedTableHeader.Status,
      maxWidth: 150,
      minWidth: 150,
      cellRenderer: AdminOrganizationsTableCellRenderer.StatusCell,
    },
    {
      field: "id",
      headerName: AdminLinkedTableHeader.OrgID,
      minWidth: 150,
      cellRenderer: AdminOrganizationsTableCellRenderer.OrgIdCell,
    },
    {
      field: "id",
      headerName: AdminLinkedTableHeader.Actions,
      maxWidth: 120,
      minWidth: 120,
      cellRenderer: AdminOrganizationsTableCellRenderer.UnlinkOrganizationCell,
    },
  ]);

  const { components, ...restTableProps } = tableProps;
  return (
    <div id={idModel.id}>
      <EntityTable
        id={idModel.entityTable.id}
        title={LinkedOrganizationTableDefault.ToolbarTitle}
        tableProps={{
          columnDefs: [...columnDefs.current],
          components,
          ...restTableProps,
        }}
        {...entityTableProps}
      />
    </div>
  );
};

export const LinkedOrganizationTable = memo(LinkedOrganizationTableBase);
