import { GET_TEAM, GET_TEAMS, DELETE_TEAM, UPDATE_TEAM } from "../../schemas/teams/teams.schema";
import { MockOrganization12, MockOrganization2, MockOrganization1 } from "../data/organizations.mock";
import { MockTeam3, MockTeam1, MockTeam2, MockTeam6, MockTeam7, MockTeam4, MockTeam5 } from "../data/teams.mock";

export const getTeamMock = {
  request: {
    query: GET_TEAM,
    variables: { id: MockTeam3.id, organizationId: MockOrganization12.id },
  },
  result: {
    data: {
      accessGroup: MockTeam3,
    },
  },
};

export const getTeamsMock = {
  request: {
    query: GET_TEAMS,
    variables: { pageSize: 0, organizationId: MockOrganization12.id },
  },
  result: jest.fn(() => ({
    data: {
      accessGroups: { items: [MockTeam1, MockTeam2, MockTeam3], count: 3 },
    },
  })),
};

export const removeTeamMock = {
  request: {
    query: DELETE_TEAM,
    variables: { id: MockTeam3.id, organizationId: MockOrganization12.id },
  },
  result: {
    data: {
      deleteAccessGroup: true,
    },
  },
};

const unsetDeprecatedProps = (obj: object) => {
  Object.keys(obj).forEach((key) => obj[key as keyof typeof obj] === undefined && delete obj[key as keyof typeof obj]);

  return obj;
};

export const updateTeamMock = [
  {
    request: {
      query: UPDATE_TEAM,
      variables: unsetDeprecatedProps({ ...MockTeam3, managedOrganizationIds: undefined, userIds: undefined }),
    },
    result: {
      data: {
        updateAccessGroup: MockTeam3,
      },
    },
  },
  {
    request: {
      query: UPDATE_TEAM,
      variables: unsetDeprecatedProps({
        ...MockTeam3,
        managedOrganizationIds: undefined,
        userIds: undefined,
        managedOrgDeltas: { add: [], remove: [] },
      }),
    },
    result: {
      data: {
        updateAccessGroup: MockTeam3,
      },
    },
  },
  {
    request: {
      query: UPDATE_TEAM,
      variables: unsetDeprecatedProps({
        ...MockTeam3,
        managedOrganizationIds: undefined,
        userIds: undefined,
        userDeltas: { add: [], remove: [] },
      }),
    },
    result: {
      data: {
        updateAccessGroup: MockTeam3,
      },
    },
  },
  {
    request: {
      query: UPDATE_TEAM,
      variables: unsetDeprecatedProps({
        ...MockTeam6,
        managedOrganizationIds: undefined,
        userIds: undefined,
        managedOrgDeltas: { add: [], remove: [] },
      }),
    },
    result: {
      data: {
        updateAccessGroup: MockTeam6,
      },
    },
  },
  {
    request: {
      query: UPDATE_TEAM,
      variables: unsetDeprecatedProps({
        ...MockTeam7,
        managedOrganizationIds: undefined,
        userIds: undefined,
        managedOrgDeltas: { add: [], remove: [] },
      }),
    },
    result: {
      data: {
        updateAccessGroup: MockTeam7,
      },
    },
  },
  {
    request: {
      query: UPDATE_TEAM,
      variables: unsetDeprecatedProps({
        ...MockTeam4,
        managedOrganizationIds: undefined,
        userIds: undefined,
        managedOrgDeltas: {
          add: [MockOrganization2.id],
          remove: [MockOrganization1.id],
        },
      }),
    },
    result: {
      data: {
        updateAccessGroup: MockTeam4,
      },
    },
  },
  {
    request: {
      query: UPDATE_TEAM,
      variables: unsetDeprecatedProps({
        ...MockTeam3,
        managedOrganizationIds: undefined,
        userIds: undefined,
        name: `${MockTeam3.name}edit`,
        managedOrgDeltas: { add: [], remove: [] },
      }),
    },
    result: {
      data: {
        updateAccessGroup: { ...MockTeam3, name: `${MockTeam3.name}edit` },
      },
    },
  },
  {
    request: {
      query: UPDATE_TEAM,
      variables: unsetDeprecatedProps({
        ...MockTeam3,
        managedOrganizationIds: undefined,
        userIds: undefined,
        name: `${MockTeam3.name}edit`,
      }),
    },
    result: {
      data: {
        updateAccessGroup: { ...MockTeam3, name: `${MockTeam3.name}edit` },
      },
    },
  },
  {
    request: {
      query: UPDATE_TEAM,
      variables: unsetDeprecatedProps({
        ...MockTeam3,
        name: `${MockTeam3.name}fail`,
        managedOrgDeltas: { add: [], remove: [] },
      }),
    },
    result: { error: new Error() },
  },
  {
    request: {
      query: UPDATE_TEAM,
      variables: unsetDeprecatedProps({
        ...MockTeam5,
        managedOrganizationIds: undefined,
        userIds: undefined,
        managedOrgDeltas: { add: [], remove: [] },
      }),
    },
    result: { error: new Error("Error message") },
  },
];
