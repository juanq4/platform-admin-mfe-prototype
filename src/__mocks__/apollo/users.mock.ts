import { GET_USERS_QUERY } from "../../schemas/users/users.shema";
import { MockOrganization12 } from "../data/organizations.mock";
import { MockUsers } from "../data/users.mock";

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
