import type { BaseComponentWithChildrenProps } from "@q4/nimbus-ui";
import type { Dispatch, SetStateAction } from "react";
import type { Organization } from "../../definitions/organization.definition";
import type { Team } from "../../definitions/team.definition";
import type { User } from "../../definitions/user.definition";

export type AdminDataContextProps = Pick<BaseComponentWithChildrenProps, "children" | "key">;

interface CacheVariables {
  userList?: {
    organizationId?: string;
    page?: string[];
    searchTerm?: string;
    pageSize?: number;
  };
}

export interface AdminDataContextState {
  team: Team;
  teams: Team[];
  organization: Organization;
  organizations: Organization[];
  users: User[];
  cachedVariables?: CacheVariables;
  setTeam: Dispatch<SetStateAction<Team | null>>;
  setTeams: Dispatch<SetStateAction<Team[]>>;
  setOrganization: Dispatch<SetStateAction<Organization | null>>;
  setOrganizations: Dispatch<SetStateAction<Organization[]>>;
  setUsers: Dispatch<SetStateAction<User[]>>;
  setCachedVariables?: Dispatch<SetStateAction<CacheVariables>>;
}
