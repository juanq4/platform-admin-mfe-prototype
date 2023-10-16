import { isEmpty } from "@q4/nimbus-ui";
import { OrganizationType } from "@q4/platform-definitions";
import { OrganizationDetailsMode } from "../../components/AdminContent/Organizations/Details/OrganizationDetails.definition";
import { PermissionCollection, Q4Role, AppRole, CorporateRoles } from "../../configurations/access.configuration";
import { RoutePathIdLabel, AdminRoutePath } from "../../configurations/navigation.configuration";
import { getRoles } from "./getRoles";
import { OrganizationsUserEditDefault as ViewDefaults } from "./organization.definition";
import {
  capitalize,
  buildOrganizationTypeOptions,
  getOrganizationEditRoute,
  getOrganizationsUserEditReturnUrl,
  getOrganizationDetailsMode,
  getOrganizationLabelWithTicker,
  buildOrganizationCurrencyOptions,
} from "./organization.utils";

const {
  CrudUsers,
  CrudOrganizations,
  CrudAll,
  ManageClientTeamUsers,
  ManageUsersAdmin,
  ManageEventManagement,
  AccessEventManagement,
} = PermissionCollection;

describe("getRoles", () => {
  test("7425280: [Given] isOrgAdmin is set to 'true' [And] the user permissions are q4graph:read:users, q4graph:manage:users, q4graph:read:organizations, q4graph:manage:organizations [Expect] the roles to be 'Q4 Support [DEV], Event Management Admin, Desktop User, Engagement Analytics User, Meeting Scheduler User, EventMan User'", () => {
    const roles = getRoles({ isAdmin: true }, CrudAll);
    expect(roles).toStrictEqual([
      Q4Role.Q4Support,
      AppRole.EventManagementAdmin,
      AppRole.DesktopUser,
      AppRole.EngagementAnalyticsUser,
      AppRole.MeetingSchedulerUser,
      AppRole.EventManagementUser,
    ]);
  });

  test("7425281: [Given] isOrgAdmin is set to 'true' [And] the user permissions are q4graph:manage:users:q4-client-teams [Expect] the roles to be 'Q4 Client Team [DEV]'", () => {
    const roles = getRoles({ isAdmin: true }, ManageClientTeamUsers);
    expect(roles).toContain(Q4Role.Q4ManageClientRole);
  });

  test("7425282: [Given] isOrgAdmin is set to 'true' [And] the user permissions are q4graph:manage:users:q4-admin [Expect] the roles to be 'Q4 Admin [DEV]'", () => {
    const roles = getRoles({ isAdmin: true }, ManageUsersAdmin);
    expect(roles).toContain(Q4Role.Q4Admin);
  });

  test("7425286: [Given] isOrgAdmin is set to 'true' [And] the user permissions are q4graph:read:users, q4graph:manage:users [Expect] the roles to be 'Q4 Support [DEV], Desktop User, Engagement Analytics User, Meeting Scheduler User, Event Management User'", () => {
    const roles = getRoles({ isAdmin: true }, CrudUsers);
    expect(roles).toStrictEqual([
      Q4Role.Q4Support,
      AppRole.EventManagementAdmin,
      AppRole.DesktopUser,
      AppRole.EngagementAnalyticsUser,
      AppRole.MeetingSchedulerUser,
      AppRole.EventManagementUser,
    ]);
  });

  test(`7425292: [Given] organization type is ${OrganizationType.CORP} [And] the user permissions are q4graph:read:organizations, q4graph:manage:organizations [Expect] the roles to be 'Corporate Admin [DEV], Corporate Support [DEV], Event Management User'`, () => {
    const roles = getRoles({ type: OrganizationType.CORP }, CrudOrganizations);
    expect(roles).toStrictEqual([...CorporateRoles, AppRole.EventManagementUser]);
  });

  test(`7425293: [Given] organization type is ${OrganizationType.CORP} [And] the user permissions are  [Expect] the roles to be 'Corporate Admin [DEV], Corporate Support [DEV], Event Management User'`, () => {
    const roles = getRoles({ type: OrganizationType.CORP }, []);
    expect(roles).toStrictEqual([...CorporateRoles, AppRole.EventManagementUser]);
  });

  test(`7425294: [Given] organization type is ${OrganizationType.CORP} [And] the user permissions are undefined [Expect] the roles to be 'Corporate Admin [DEV], Corporate Support [DEV], Event Management User'`, () => {
    const roles = getRoles({ type: OrganizationType.CORP }, null);
    expect(roles).toStrictEqual([...CorporateRoles, AppRole.EventManagementUser]);
  });

  test(`7425295: [Given] organization type is ${OrganizationType.CORP} [And] the user permissions are q4graph:read:users, q4graph:manage:users, q4graph:read:organizations, q4graph:manage:organizations [Expect] the roles to be 'Corporate Admin [DEV], Corporate Support [DEV], Event Management User'`, () => {
    const roles = getRoles({ type: OrganizationType.CORP }, CrudAll);
    expect(roles).toStrictEqual([...CorporateRoles, AppRole.EventManagementUser]);
  });

  test(`7425296: [Given] organization type is ${OrganizationType.CORP} [And] the user permissions are q4graph:read:organizations, q4graph:manage:organizations [Expect] the roles to be 'Corporate Admin [DEV], Corporate Support [DEV], Event Management User'`, () => {
    const roles = getRoles({ type: OrganizationType.CORP }, CrudOrganizations);
    expect(roles).toStrictEqual([...CorporateRoles, AppRole.EventManagementUser]);
  });

  test(`7425297: [Given] organization type is ${OrganizationType.CORP} [And] the user permissions are  [Expect] the roles to be 'Corporate Admin [DEV], Corporate Support [DEV], Event Management User'`, () => {
    const roles = getRoles({ type: OrganizationType.CORP }, []);
    expect(roles).toStrictEqual([...CorporateRoles, AppRole.EventManagementUser]);
  });

  test(`7425298: [Given] organization type is ${OrganizationType.CORP} [And] the user permissions are undefined [Expect] the roles to be 'Corporate Admin [DEV], Corporate Support [DEV], Event Management User'`, () => {
    const roles = getRoles({ type: OrganizationType.CORP }, null);
    expect(roles).toStrictEqual([...CorporateRoles, AppRole.EventManagementUser]);
  });

  test(`9101701: [Given] organization type is ${OrganizationType.ADMIN} [And] the user permissions are q4graph:manage:users:q4-client-teams [Expect] the roles to contain 'Earnings Admin' and 'Earnings Viewer'`, () => {
    const roles = getRoles({ type: OrganizationType.ADMIN }, ManageClientTeamUsers);
    expect(roles).toContain(AppRole.EarningsAdmin);
    expect(roles).toContain(AppRole.EarningsViewer);
  });

  test(`11022472: [Given] organization type is ${OrganizationType.ADMIN} [And] the user permissions are q4graph:manage:users:q4-client-teams [Expect] the roles to contain 'Event Management Admin'`, () => {
    const roles = getRoles({ type: OrganizationType.ADMIN }, ManageEventManagement);
    expect(roles).toContain(AppRole.EventManagementAdmin);
  });

  test(`11051723: [Given] organization type is ${OrganizationType.ADMIN} [And] the user permissions are event-management::access:app [Expect] the roles to contain 'Event Management Admin' and 'Event Management Admin'`, () => {
    const roles = getRoles({ type: OrganizationType.ADMIN }, AccessEventManagement);
    expect(roles).toContain(AppRole.EventManagementAdmin);
    expect(roles).toContain(AppRole.EventManagementUser);
  });

  test(`9101702: [Given] creating a user against an organization [And] organization type is ${OrganizationType.AGENCY} [Expect] the roles to contain 'Earnings Contributor'`, () => {
    const roles = getRoles({ isAdmin: false, type: OrganizationType.AGENCY }, []);
    expect(roles).toContain(AppRole.EarningsContributor);
  });
});

describe("getOrganizationsUserEditReturnUrl", () => {
  const mockOrganizationId = "mockOrganizationId";
  const mockOrganizationsEditRoute = getOrganizationEditRoute(mockOrganizationId);
  function getMockQuery(routes: string[]): string {
    if (isEmpty(routes)) return null;
    const query = routes.map((x) => `${RoutePathIdLabel.ReturnUrl}=${x}`).join("&");
    return `?${query}`;
  }

  test("7425314: [Given] there is an organizationId [And] returnUrl is 'undefined' [Then] expect the return url to be '/organizations/edit/mockOrganizationId'", () => {
    const mockQuery = getMockQuery(null);
    const value = getOrganizationsUserEditReturnUrl(mockOrganizationId, mockQuery, OrganizationDetailsMode.Edit);
    expect(value).toBe(mockOrganizationsEditRoute);
  });

  test("7425316: [Given] there is an organizationId [And] returnUrl is '/users' [Then] expect the return url to be '/users'", () => {
    const mockQuery = getMockQuery([ViewDefaults.ReturnUrl.Users]);
    const value = getOrganizationsUserEditReturnUrl(mockOrganizationId, mockQuery, OrganizationDetailsMode.Edit);
    expect(value).toBe(ViewDefaults.ReturnUrl.Users);
  });

  test("7425317: [Given] there is an organizationId [And] returnUrl is '/users', '/organizations' [Then] expect the return url to be '/users'", () => {
    const mockQuery = getMockQuery([ViewDefaults.ReturnUrl.Users, AdminRoutePath.Organizations]);
    const value = getOrganizationsUserEditReturnUrl(mockOrganizationId, mockQuery, OrganizationDetailsMode.Edit);
    expect(value).toBe(ViewDefaults.ReturnUrl.Users);
  });

  test("7425318: [Given] there is an organizationId [And] returnUrl is '/organizations' [Then] expect the return url to be '/organizations/edit/mockOrgananizationId'", () => {
    const mockQuery = getMockQuery([AdminRoutePath.Organizations]);
    const value = getOrganizationsUserEditReturnUrl(mockOrganizationId, mockQuery, OrganizationDetailsMode.Edit);
    expect(value).toBe(mockOrganizationsEditRoute);
  });
});

describe("capitalize()", () => {
  test("7394144: [Given] a string [Then] return it with first letter in upper case", () => {
    const expected = ["Agency", "Corporate"];
    ["agency", "corporate"].forEach((_, idx) => expect(capitalize(expected[idx])));
  });
});

describe("buildOrganiztionTypeOptions()", () => {
  test("7394145: [Given] it is called [Then] return organization type options in correct shape", () => {
    expect(buildOrganizationTypeOptions()).toEqual([
      {
        label: "Agency",
        value: "agency",
      },
      {
        label: "Corporate",
        value: "corporate",
      },
      {
        label: "Admin",
        value: "admin",
      },
    ]);
  });
});

describe("buildOrganiztionCurrencyOptions()", () => {
  test("11403312: [Given] buildOrganiztionCurrencyOptions() is called [Then] return organization currency options in correct shape", () => {
    expect(buildOrganizationCurrencyOptions()).toEqual([
      {
        label: "United States Dollar (USD)",
        value: "USD",
      },
      {
        label: "Swiss Franc (CHF)",
        value: "CHF",
      },
      {
        label: "Danish Krone (DKK)",
        value: "DKK",
      },
      {
        label: "Euro (EUR)",
        value: "EUR",
      },
      {
        label: "British Pound Sterling (GBP)",
        value: "GBP",
      },
      {
        label: "Norwegian Krone (NOK)",
        value: "NOK",
      },
      {
        label: "Swedish Krona (SEK)",
        value: "SEK",
      },
    ]);
  });
});

describe("hasOrgDetailsModePermission()", () => {
  test("7394146: [Given] it is called [Then] return correct Organization Details mode given users permissions", () => {
    const orgId = "123";

    // null case
    expect(getOrganizationDetailsMode([], orgId)).toEqual(null);
    expect(getOrganizationDetailsMode([], null)).toEqual(null);

    // view mode
    expect(getOrganizationDetailsMode(PermissionCollection.ReadOrganizations, orgId)).toEqual(
      OrganizationDetailsMode.component,
    );
    expect(getOrganizationDetailsMode(PermissionCollection.ReadOrganizations, null)).toEqual(
      OrganizationDetailsMode.component,
    );

    // edit mode
    expect(getOrganizationDetailsMode(PermissionCollection.CrudOrganizations, orgId)).toEqual(OrganizationDetailsMode.Edit);

    // create mode
    expect(getOrganizationDetailsMode(PermissionCollection.CrudOrganizations, null)).toEqual(OrganizationDetailsMode.Create);
  });
});

describe("getOrganizationLabelWithTicker", () => {
  test("8999782: [Given] the organization does not have any identifiers [Then] the ticker is not included in the label", () => {
    const name = "myOrg";
    const organization = { name };

    expect(getOrganizationLabelWithTicker(organization)).toEqual(name);
  });
});
