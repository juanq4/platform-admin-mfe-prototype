import { IdModelBase, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { Team } from "../../../../definitions/team.definition";
import type { QueryPaginationVariablesBase } from "../../../../hooks/useQuery/useQuery.definition";
import type { EntityTableProps } from "../../EntityTable/EntityTable.definition";
import { EntityTableIdModel } from "../../EntityTable/EntityTable.definition";

export const AdminTeamTableDefault = {
  ToolbarTitle: "Teams",
};

export enum AdminTeamTableClassName {
  Base = "admin-teams-table",
}

export enum AdminTeamTableEntityKey {
  Id = "id",
  Name = "name",
  OrgCount = "orgCount",
  UserCount = "userCount",
}

export interface AdminTeamTableEntity {
  id: string;
  name: Team["name"];
  orgCount: number;
  userCount: number;
}

export type AdminTeamTableProps = Partial<EntityTableProps<Partial<Team>, QueryPaginationVariablesBase["page"]>> &
  Pick<EntityTableProps<Partial<Team>, QueryPaginationVariablesBase["page"]>, "items" | "error" | "loading" | "onError">;

export enum AdminTeamTableHeader {
  Name = "TEAM NAME",
  UserCount = "# OF USERS",
  OrgCount = "# OF ORGS",
  TeamID = "TEAM ID",
}

export class AdminTeamTableIdModel extends IdModelBase {
  entityTable: EntityTableIdModel;

  constructor(id: string, index?: React.Key, postfix?: string) {
    super(id, index, postfix);

    if (isNullOrWhiteSpace(this.id)) {
      this.entityTable = new EntityTableIdModel(null);

      return;
    }

    this.entityTable = new EntityTableIdModel(`${this.id}EntityTable`);
  }
}
