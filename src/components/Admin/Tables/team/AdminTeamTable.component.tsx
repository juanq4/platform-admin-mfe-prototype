import React, { memo, useMemo, useRef } from "react";
import type { Team } from "../../../../definitions/team.definition";
import { EntityTable } from "../../EntityTable/EntityTable.component";
import type { EntityTableColumnDef } from "../../EntityTable/EntityTable.definition";
import {
  AdminTeamTableClassName,
  AdminTeamTableDefault,
  AdminTeamTableEntityKey,
  AdminTeamTableHeader,
  AdminTeamTableIdModel,
} from "./AdminTeamTable.definition";
import type { AdminTeamTableEntity, AdminTeamTableProps } from "./AdminTeamTable.definition";

const AdminTeamTableBase = (props: AdminTeamTableProps): JSX.Element => {
  const { id, items, tableProps, ...entityTableProps } = props;

  const idModel = useMemo(() => new AdminTeamTableIdModel(id), [id]);

  const columnDefs = useRef<EntityTableColumnDef[]>([
    {
      field: AdminTeamTableEntityKey.Name,
      headerName: AdminTeamTableHeader.Name,
      minWidth: 150,
      sort: "asc",
    },
    {
      field: AdminTeamTableEntityKey.UserCount,
      headerName: AdminTeamTableHeader.UserCount,
      minWidth: 150,
    },
    {
      field: AdminTeamTableEntityKey.OrgCount,
      headerName: AdminTeamTableHeader.OrgCount,
      minWidth: 150,
    },
    {
      field: AdminTeamTableEntityKey.Id,
      headerName: AdminTeamTableHeader.TeamID,
      minWidth: 150,
    },
  ]);

  const teams: AdminTeamTableEntity[] = useMemo(() => {
    return (items || []).map((team) => {
      const { id: teamId, managedOrganizationIds, name, userIds } = (team || {}) as Team;

      return {
        [AdminTeamTableEntityKey.Id]: teamId,
        [AdminTeamTableEntityKey.Name]: name,
        [AdminTeamTableEntityKey.OrgCount]: (managedOrganizationIds || []).length,
        [AdminTeamTableEntityKey.UserCount]: (userIds || []).length,
      };
    });
  }, [items]);

  return (
    <div id={idModel.id} className={AdminTeamTableClassName.Base}>
      <EntityTable
        id={idModel.entityTable.id}
        {...entityTableProps}
        items={teams}
        title={AdminTeamTableDefault.ToolbarTitle}
        tableProps={{
          columnDefs: columnDefs.current,
          ...tableProps,
        }}
      />
    </div>
  );
};

export const AdminTeamTable = memo(AdminTeamTableBase);
