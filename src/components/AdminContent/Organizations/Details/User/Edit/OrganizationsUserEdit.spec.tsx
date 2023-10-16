import { MockUserWithId } from "../../../../../../__mocks__/data/users.mock";
import { AdminRoutePath, RoutePathIdLabel } from "../../../../../../configurations/navigation.configuration";
import { OrganizationsUserEditDefault } from "../../../../../../utils/organization/organization.definition";
import { getOrganizationEditRoute } from "../../../../../../utils/organization/organization.utils";
import { OrganizationsUserEditViewIdModel } from "./OrganizationsUserEdit.definition";

const { organizationId } = MockUserWithId;

jest.mock("../../../../../hooks/useToastNotificationService/useToastNotificationService.hook");

const routes: RouteConfig[] = [
  {
    route: AdminRoutePath.OrganizationsUserEdit,
    returnRoute: getOrganizationEditRoute(organizationId),
  },
  {
    route: AdminRoutePath.OrganizationsUserEdit,
    routeQuery: {
      [RoutePathIdLabel.Id]: organizationId,
      [RoutePathIdLabel.UserId]: "mockUserId",
    },
    returnRoute: OrganizationsUserEditDefault.ReturnUrl.Users,
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
      id: organizationId,
      userId: MockUserWithId.id,
    }),
  };
});

// FIXME: PLATFORM-2075 update to single test each
testUserEdit("Organizations User Edit View", routes, OrganizationsUserEditViewIdModel, mockHistoryPush, MockUserWithId, [
  "1794906",
  "1794907",
  "1794908",
  "1794909",
  "1794910",
  "1794911",
  "1794912",
  "1794913",
  "1794915",
  "1794916",
  "1794914",
  "2656738",
  "2661291",
]);
