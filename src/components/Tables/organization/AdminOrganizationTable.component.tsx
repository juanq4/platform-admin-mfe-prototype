import { memo, useMemo, useRef } from "react";
import { EntityTable } from "../../EntityTable/EntityTable.component";
import type { EntityTableColumnDef } from "../../EntityTable/EntityTable.definition";
import type { CopyCellProps } from "../../EntityTable/components/CopyCell/CopyCell.definition";
import { mapIdToCopyCell } from "../../EntityTable/components/CopyCell/CopyCell.utils";
import type { StatusCellProps } from "../../EntityTable/components/StatusCell/StatusCell.definition";
import { mapIdToStatusCell } from "../../EntityTable/components/StatusCell/StatusCell.utils";
import type { TickerCellProps } from "../../EntityTable/components/TickerCell/TickerCell.definition";
import { mapIdToTickerCell } from "../../EntityTable/components/TickerCell/TickerCell.utils";
import type { AdminOrganizationTableProps } from "./AdminOrganizationTable.definition";
import {
  AdminOrganizationTableDefault,
  AdminOrganizationsTableCellRenderer,
  AdminOrganizationsTableClassName,
  AdminOrganizationTableIdModel,
  AdminOrganizationsTableHeader,
  AdminOrganizationsTableFields,
} from "./AdminOrganizationTable.definition";

const AdminOrganizationTableBase = (props: AdminOrganizationTableProps): JSX.Element => {
  const { id, tableProps = {}, ...entityTableProps } = props;

  const columnDefs = useRef<EntityTableColumnDef[]>([
    {
      field: AdminOrganizationsTableFields.Name,
      headerName: AdminOrganizationsTableHeader.Name,
      minWidth: 220,
      flex: 1,
    },
    {
      field: AdminOrganizationsTableFields.Ticker,
      headerName: AdminOrganizationsTableHeader.Ticker,
      maxWidth: 128,
      minWidth: 128,
      cellRenderer: AdminOrganizationsTableCellRenderer.TickerCell,
    },
    {
      field: AdminOrganizationsTableFields.Active,
      headerName: AdminOrganizationsTableHeader.Status,
      maxWidth: 128,
      minWidth: 128,
      cellRenderer: AdminOrganizationsTableCellRenderer.StatusCell,
    },
    {
      field: AdminOrganizationsTableFields.Id,
      headerName: AdminOrganizationsTableHeader.Orgid,
      maxWidth: 330,
      minWidth: 330,
      cellRenderer: AdminOrganizationsTableCellRenderer.OrgIdCell,
    },
  ]);
  const idModel = useMemo(() => new AdminOrganizationTableIdModel(id), [id]);
  const { columnDefs: additionalColumns = [], components, ...restTableProps } = tableProps;

  const columns = useMemo(() => [...columnDefs.current, ...additionalColumns], [additionalColumns]);

  return (
    <div id={idModel.id} className={AdminOrganizationsTableClassName.Base}>
      <EntityTable
        id={idModel.entityTable.id}
        title={AdminOrganizationTableDefault.ToolbarTitle}
        tableProps={{
          columnDefs: columns,
          components: {
            [AdminOrganizationsTableCellRenderer.TickerCell]: (params: TickerCellProps) =>
              mapIdToTickerCell(params, idModel.tickerCellList),
            [AdminOrganizationsTableCellRenderer.OrgIdCell]: (params: CopyCellProps) =>
              mapIdToCopyCell(params, idModel.orgIdCellList),
            [AdminOrganizationsTableCellRenderer.StatusCell]: (params: StatusCellProps) =>
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

export const AdminOrganizationTable = memo(AdminOrganizationTableBase);
