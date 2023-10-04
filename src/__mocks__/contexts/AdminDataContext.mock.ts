import type { AdminDataContextState } from "../../contexts";
import { MockOrganization12, MockOrganizations, MockTeam3, MockTeams, MockUsers } from "../data";

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
