import type { AdminDataContextState } from "../../contexts/admin/data/data.definition";
import { MockOrganization12, MockOrganizations } from "../data/organizations.mock";
import { MockTeam3, MockTeams } from "../data/teams.mock";
import { MockUsers } from "../data/users.mock";

export const AdminDataContextMock: AdminDataContextState = {
  team: MockTeam3,
  teams: MockTeams,
  organization: MockOrganization12,
  organizations: MockOrganizations,
  users: MockUsers,
  setTeam: jest.fn(),
  setTeams: jest.fn(),
  setOrganization: jest.fn(),
  setOrganizations: jest.fn(),
  setUsers: jest.fn(),
};
