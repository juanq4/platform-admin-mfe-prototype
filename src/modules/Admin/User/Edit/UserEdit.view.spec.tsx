import { MockUserWithId } from "../../../../__mocks__/data/users.mock";
import { AdminRoutePath } from "../../../../configurations/navigation.configuration";
import type { UsersEditSpecRouteConfig as RouteConfig } from "../../../../utils/users/usersEdit.definition";
import { UserEditViewDefault, UserEditViewIdModel } from "./UserEdit.definition";

jest.mock("../../../../hooks/useToastNotificationService/useToastNotificationService.hook");

const routes: RouteConfig[] = [
  {
    route: AdminRoutePath.UsersEdit,
    returnRoute: UserEditViewDefault.ReturnPath,
  },
];

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => {
  const orginal = jest.requireActual("react-router-dom");
  return {
    ...orginal,
    useHistory: () => ({
      location: { pathname: "/" },
      push: mockHistoryPush,
    }),
    useParams: () => ({
      userId: MockUserWithId.id,
    }),
  };
});

// FIXME: PLATFORM-2075 update to single test each
testUserEdit("Users Edit View", routes, UserEditViewIdModel, mockHistoryPush, MockUserWithId, [
  "1794231",
  "1794896",
  "1794897",
  "1794898",
  "1794899",
  "1794900",
  "1794901",
  "1794902",
  "1794904",
  "1794905",
  "1794903",
  "2688605",
  "2688606",
]);
