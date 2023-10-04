import { MockUser } from "../../../../__mocks__/";
import { AdminRoutePath } from "../../../../configurations";
import { testUserCreate } from "../../utils";
import { UsersCreateReturnRoute, UsersCreateViewIdModel } from "./UsersCreate.definition";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => {
  const orginal = jest.requireActual("react-router-dom");
  return {
    ...orginal,
    useHistory: () => ({
      location: { pathname: "/" },
      push: mockHistoryPush,
    }),
  };
});

jest.mock("./UsersCreate.definition", () => {
  const orginal = jest.requireActual("./UsersCreate.definition");
  return {
    ...orginal,
    UsersCreateDefaultUser: MockUser,
  };
});

testUserCreate(
  "Users Create View",
  AdminRoutePath.UsersCreate,
  UsersCreateViewIdModel,
  UsersCreateReturnRoute,
  mockHistoryPush,
  ["1269254", "1269255", "1269256", "1269257", "1269258", "1271140", "2688607", "2688608"],
);
