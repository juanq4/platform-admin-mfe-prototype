import { OrganizationType } from "@q4/platform-definitions";
import { GET_ORGANIZATION, GET_ORGANIZATIONS } from "../../schemas";
import { MockOrganization12, MockOrganizations } from "../data";

export const getOrganizationAgencyMock = {
  request: {
    query: GET_ORGANIZATION,
    variables: { id: MockOrganization12.id },
  },
  result: {
    data: {
      organization: {
        ...MockOrganization12,
        studio: {
          subdomain: "",
        },
        managedBy: "agency-111111-22222",
      },
    },
  },
};

export const getOrganizationsMock = [
  {
    request: {
      query: GET_ORGANIZATIONS,
      variables: { pagesize: 0 },
    },
    result: {
      data: {
        organizations: {
          items: MockOrganizations,
        },
      },
    },
  },
  {
    request: {
      query: GET_ORGANIZATIONS,
      variables: {
        pageSize: 0,
        managedBy: MockOrganization12.id,
        delegateOrganizationId: MockOrganization12.id,
        type: OrganizationType.CORP,
      },
    },
    result: {
      data: {
        organizations: {
          items: MockOrganizations,
        },
      },
    },
  },
];
