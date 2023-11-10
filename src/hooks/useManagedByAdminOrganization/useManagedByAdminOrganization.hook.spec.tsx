import { MockAdminOrganization, MockOrganization1 } from "../../__mocks__/data/organizations.mock";
import type { Organization } from "../../definitions/organization.definition";
import { useOrganizationsQuery } from "../../schemas/generated/graphql";
import { renderHook } from "../../utils/testUtils";
import { useManagedByAdminOrganization } from "./useManagedByAdminOrganization.hook";

jest.mock("../../schemas/generated/graphql");
const mockUseOrganizationsQuery = useOrganizationsQuery as jest.Mock;

const organizationsQueryHook = {
  loading: false,
  error: null,
  data: { organizations: { items: [MockAdminOrganization] } },
  operation: null,
  stale: null,
} as unknown as ReturnType<typeof useOrganizationsQuery>;

const renderuseManagedByAdminOrganizationHook = (organization: Organization) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wrapper = ({ children }: any) => children;

  const { result } = renderHook(
    () => {
      return useManagedByAdminOrganization(organization);
    },
    { wrapper },
  );

  return result.current;
};

describe("useManagedByAdminOrganization", () => {
  beforeEach(() => {
    mockUseOrganizationsQuery.mockReturnValue(organizationsQueryHook);
  });

  test("8563184: [Given] organization has a delegate which is an Admin Organization Type [Then] expect to return 'true'", () => {
    expect(
      renderuseManagedByAdminOrganizationHook({ ...MockOrganization1, delegateOrganizationIds: [MockAdminOrganization.id] })
        .isManagedByAdmin,
    ).toBe(true);
  });

  test("8563185: [Given] organization doesn't have a delegate which is an Admin Organization Type [Then] expect to return 'false'", () => {
    expect(renderuseManagedByAdminOrganizationHook({ ...MockOrganization1 }).isManagedByAdmin).toBe(false);
  });

  test("8563186: [Given] user calls 'adminOrganizations' within hook [Then] expect to return details of those admin orgs", () => {
    expect(
      renderuseManagedByAdminOrganizationHook({ ...MockOrganization1, delegateOrganizationIds: [MockAdminOrganization.id] })
        .adminOrganizations,
    ).toEqual([MockAdminOrganization]);
  });
});
