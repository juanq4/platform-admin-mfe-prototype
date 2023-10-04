import { MockOrganization1, MockUser } from "../../../../../../__mocks__";
import { AdminRoutePath } from "../../../../../../configurations";
import { getOrganizationEditRoute } from "../../../../../../utils";
import { testUserCreate } from "../../../../utils";
import { OrganizationsUserCreateViewIdModel } from "./OrganizationsUserCreate.definition";

const organizationId = MockOrganization1.id;

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
      id: MockOrganization1.id,
    }),
  };
});

jest.mock("./OrganizationsUserCreate.definition", () => {
  const orginal = jest.requireActual("./OrganizationsUserCreate.definition");
  return {
    ...orginal,
    OrganizationUserCreateDefaultUser: MockUser,
  };
});

testUserCreate(
  "Organizations User Create",
  AdminRoutePath.OrganizationsUserCreate,
  OrganizationsUserCreateViewIdModel,
  getOrganizationEditRoute(organizationId),
  mockHistoryPush,
  ["1269259", "1269260", "1269261", "1269262", "1269263", "1271141", "2688609", "2688610"],
);
