import { createContext, useState } from "react";
import type { Organization, User } from "../../../definitions";
import { Team } from "../../../definitions";
import type { AdminDataContextProps, AdminDataContextState } from "./data.definition";

export const AdminDataContext = createContext<Partial<AdminDataContextState>>({});

export const AdminDataProvider = (props: AdminDataContextProps): JSX.Element => {
  const [team, setTeam] = useState<Team>(new Team({}));
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [organization, setOrganization] = useState<Organization>();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [cachedVariables, setCachedVariables] = useState(null);

  return (
    <AdminDataContext.Provider
      value={{
        team,
        teams,
        users,
        organization,
        organizations,
        cachedVariables,
        setTeam,
        setTeams,
        setUsers,
        setOrganization,
        setOrganizations,
        setCachedVariables,
      }}
    >
      {props.children}
    </AdminDataContext.Provider>
  );
};
