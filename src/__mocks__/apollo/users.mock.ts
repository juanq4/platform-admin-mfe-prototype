import { GET_USERS_QUERY } from "../../schemas";
import { MockOrganization12, MockUsers } from "../data";

export const getUsersMock = {
  request: {
    query: GET_USERS_QUERY,
    variables: { pageSize: 0, organizationId: MockOrganization12.id },
  },
  result: {
    data: {
      users: {
        items: MockUsers,
      },
    },
  },
};
