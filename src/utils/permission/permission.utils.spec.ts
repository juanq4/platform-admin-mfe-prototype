import { isEmpty } from "@q4/nimbus-ui";
import { Entitlement, Permission } from "@q4/platform-definitions";
import { LDContextMock } from "../../__mocks__/contexts/LDContextMock.mock";
import type { PermissionCondition } from "../../configurations/access.configuration";
import { PermissionCollection, PermissionRule } from "../../configurations/access.configuration";
import type { Features } from "../../configurations/feature.configuration";
import { FeatureFlag } from "../../configurations/feature.configuration";
import { AppRoutePath, AdminRoutePath } from "../../configurations/navigation.configuration";
import { mapRoutesByPermission, hasRequiredPermission } from "./permission.utils";

type HasRequiredPermissionTestCase = {
  id: string;
  permissions: Permission[];
  required: PermissionCondition;
  expected: boolean;
  features?: Partial<Features>;
};

const { ReadUsers, CrudUsers, ReadOrganizations } = PermissionCollection;

function getMockLDFlags(adminUserManagement: boolean): Partial<Features> {
  return {
    ...LDContextMock.flags,
    [FeatureFlag.AdminUserManagement]: adminUserManagement,
  };
}

describe("mapRoutesByPermission", () => {
  const mockAllEntitlements = [Entitlement.Studio, Entitlement.EngagementAnalytics, Entitlement.Earnings];
  const mockAllPermissions = Object.values(Permission);
  const appRoutes = Object.values(AppRoutePath);
  const adminRoutes = Object.values(AdminRoutePath);
  const allRoutes = [...adminRoutes, ...appRoutes];
  const getPath = (route: string): string => route;

  test("7394147: [Given] no values are passed [Then] expect an empty array to be returned", () => {
    const filteredRoutes = mapRoutesByPermission(null, null, null, null, null);
    expect(filteredRoutes).toStrictEqual([]);
  });

  test("7394148: [Given] only routes as assigned [Then] expect all the paths to be returned", () => {
    const filteredRoutes = mapRoutesByPermission(allRoutes, null, null, null, null);
    expect(filteredRoutes).toStrictEqual(allRoutes);
  });

  test("7403778: [Given] all permissions are assigned [And] the admin-user-management is 'true' [Then] expect the admin routes [And] unprotected routes to be returned", () => {
    const LDAdminUserManagementMock = getMockLDFlags(true);
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      mockAllPermissions,
      LDAdminUserManagementMock,
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("7403779: [Given] all User permissions are assigned [And] the admin-user-management is 'true' [Then] expect the admin User routes [And] unprotected routes to be returned", () => {
    const LDAdminUserManagementMock = getMockLDFlags(false);
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      mockAllPermissions,
      LDAdminUserManagementMock,
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("7403780: [Given] all permissions are assigned [And] the admin-user-management is 'false' [Then] expect the admin routes [And] unprotected routes to be returned", () => {
    const LDAdminUserManagementMock = getMockLDFlags(true);
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      CrudUsers,
      LDAdminUserManagementMock,
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("7403781: [Given] all User permissions are assigned [And] the admin-user-management is 'false' [Then] expect the admin User routes [And] unprotected routes to be returned", () => {
    const LDAdminUserManagementMock = getMockLDFlags(false);
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      CrudUsers,
      LDAdminUserManagementMock,
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("7394149: [Given] no permissions [And] feature flags are assigned [Then] expect only unprotected routes to be returned", () => {
    const filteredRoutes = mapRoutesByPermission(allRoutes, null, null, mockAllEntitlements, getPath);
    expect(filteredRoutes).toMatchSnapshot();
  });

  test(`7394150: [Given] no permissions are assigned [And] the ${FeatureFlag.AdminUserManagement} is 'true' [Then] expect only unprotected routes to be returned`, () => {
    const filteredRoutes = mapRoutesByPermission(allRoutes, null, getMockLDFlags(true), mockAllEntitlements, getPath);
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("7403782: [Given] the user has the permission 'q4graph:read:organizations' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.ReadOrgs],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("7403783: [Given] the user has the permission 'q4graph:manage:organizations' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.ManageOrgs],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("7403784: [Given] the user has the permission 'q4graph:read:users' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.ReadUsers],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("7403785: [Given] the user has the permission 'q4graph:manage:users' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.ManageUsers],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("7403786: [Given] the user has the permission 'q4graph:manage:users:q4-client-teams' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.ManageUsersClientTeam],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("7403787: [Given] the user has the permission 'q4graph:read:agency:linked-organizations' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.ReadLinkedOrgs],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("7403788: [Given] the user has the permission 'q4graph:manage:agency:linked-organizations' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.ManageLinkedOrgs],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("7403789: [Given] the user has the permission 'q4graph:manage:users:q4-admin' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.ManageUsersAdmin],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("8008391: [Given] the user has the permission 'earnings::access:app' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.AccessEarnings],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("8008392: [Given] the user has the permission 'earnings::create:plan' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.EarningsPlanCreate],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("8008393: [Given] the user has the permission 'earnings::delete:plan' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.EarningsPlanDelete],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("8008394: [Given] the user has the permission 'earnings::update:plan' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.EarningsPlanUpdate],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("8008395: [Given] the user has the permission 'earnings::read:plan' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.EarningsPlanRead],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  test("8008396: [Given] the user has the permission 'earnings::contribute:plan' are assigned [Then] expect the routes to match", () => {
    const filteredRoutes = mapRoutesByPermission(
      allRoutes,
      [Permission.EarningsPlanContribute],
      getMockLDFlags(true),
      mockAllEntitlements,
      getPath,
    );
    expect(filteredRoutes).toMatchSnapshot();
  });

  const testCases4 = ["7404282", "7404432", "7404433", "7404434", "7404435", "7404436", "7404437", "7405508"];
  const entitlementAssignedRouteMessage = "the entitlement assigned routes to be returned.";
  const adminRouteMessage = "the admin routes to be returned.";
  const unprotectedRouteMessage = "the unprotected routes to be returned.";

  // FIXME: PLATFORM-2075 update to single test each
  [
    {
      entitlements: mockAllEntitlements,
      permissions: mockAllPermissions,
      flag: true,
      message: `the admin routes [And] ${entitlementAssignedRouteMessage}`,
    },
    {
      entitlements: mockAllEntitlements,
      permissions: mockAllPermissions,
      flag: false,
      message: `the admin routes [And] ${entitlementAssignedRouteMessage}`,
    },
    { entitlements: null, permissions: mockAllPermissions, flag: true, message: adminRouteMessage },
    {
      entitlements: null,
      permissions: mockAllPermissions,
      flag: false,
      message: `unprotected routes [And] ${adminRouteMessage}`,
    },
    { entitlements: mockAllEntitlements, permissions: null, flag: true, message: entitlementAssignedRouteMessage },
    { entitlements: mockAllEntitlements, permissions: null, flag: false, message: entitlementAssignedRouteMessage },
    { entitlements: null, permissions: null, flag: true, message: unprotectedRouteMessage },
    { entitlements: null, permissions: null, flag: false, message: entitlementAssignedRouteMessage },
  ].forEach((testCase, index) => {
    const { entitlements, permissions, flag, message } = testCase;
    const entitlementMessage = isEmpty(entitlements) ? "no" : "has all";
    const permissionMessage = isEmpty(permissions) ? "no" : "all";

    test(`${testCases4[index]}: [Given] the user has ${permissionMessage} permissions, ${entitlementMessage} entitlements [And] featureFlag is set to '${flag}' [Then] expect ${message}`, () => {
      const filteredRoutes = mapRoutesByPermission(allRoutes, permissions, getMockLDFlags(flag), entitlements, getPath);
      expect(filteredRoutes).toMatchSnapshot();
    });
  });
});

describe("hasRequiredPermission No FeatureFlag Provided On Permission Conditions", () => {
  const emptyTestCases: HasRequiredPermissionTestCase[] = [
    { id: "7405509", permissions: null, required: null, expected: true },
    { id: "7405659", permissions: [], required: null, expected: true },
    { id: "7405660", permissions: null, required: { rule: null, permissions: null }, expected: true },
    { id: "7405661", permissions: [], required: { rule: null, permissions: null }, expected: true },
  ];

  const testCases: HasRequiredPermissionTestCase[] = [
    { id: "7405662", permissions: null, required: { rule: null, permissions: ReadUsers }, expected: false },
    { id: "7405663", permissions: null, required: { rule: PermissionRule.And, permissions: ReadUsers }, expected: false },
    { id: "7405664", permissions: null, required: { rule: PermissionRule.Or, permissions: ReadUsers }, expected: false },
    { id: "7405665", permissions: null, required: { rule: PermissionRule.Not, permissions: ReadUsers }, expected: true },
    { id: "7405666", permissions: [], required: { rule: null, permissions: ReadUsers }, expected: false },
    { id: "7405667", permissions: [], required: { rule: PermissionRule.And, permissions: ReadUsers }, expected: false },
    { id: "7405668", permissions: [], required: { rule: PermissionRule.Or, permissions: ReadUsers }, expected: false },
    { id: "7405669", permissions: [], required: { rule: PermissionRule.Not, permissions: ReadUsers }, expected: true },
    { id: "7405670", permissions: ReadUsers, required: { rule: null, permissions: CrudUsers }, expected: false },
    {
      id: "7405671",
      permissions: ReadUsers,
      required: { rule: PermissionRule.And, permissions: CrudUsers },
      expected: false,
    },
    { id: "7405672", permissions: ReadUsers, required: { rule: PermissionRule.Or, permissions: CrudUsers }, expected: true },
    {
      id: "7405673",
      permissions: ReadUsers,
      required: { rule: PermissionRule.Not, permissions: CrudUsers },
      expected: false,
    },
    { id: "7405674", permissions: CrudUsers, required: { rule: null, permissions: CrudUsers }, expected: true },
    {
      id: "7405675",
      permissions: CrudUsers,
      required: { rule: PermissionRule.And, permissions: CrudUsers },
      expected: true,
    },
    { id: "7405676", permissions: CrudUsers, required: { rule: PermissionRule.Or, permissions: CrudUsers }, expected: true },
    {
      id: "7405677",
      permissions: CrudUsers,
      required: { rule: PermissionRule.Not, permissions: CrudUsers },
      expected: false,
    },
  ];

  // FIXME: PLATFORM-2075 update to single test each
  [...emptyTestCases, ...testCases].forEach((testCase) => {
    const { id, permissions, required, expected } = testCase;
    test(`${id}: [Given] the user has permissions: '${permissions?.join(
      ", ",
    )}' [And] the required permissions are: '${required?.permissions?.join(
      ", ",
    )}' [Then] expect '${expected}' to be returned`, () => {
      const hasAccess = hasRequiredPermission(permissions, required);
      if (expected) {
        expect(hasAccess).toBeTruthy();
      } else {
        expect(hasAccess).toBeFalsy();
      }
      expect(hasAccess).toBe(expected);
    });
  });
});

describe("hasRequiredPermission FeatureFlag Provided On Permission Condition", () => {
  const AdminFeatureTrue = getMockLDFlags(true);
  const AdminFeatureFalse = getMockLDFlags(false);

  const testCases: HasRequiredPermissionTestCase[] = [
    { id: "7405678", permissions: null, required: null, features: AdminFeatureTrue, expected: true },
    { id: "7405679", permissions: [], required: null, features: AdminFeatureTrue, expected: true },
    {
      id: "7405680",
      permissions: null,
      required: { rule: null, permissions: null, featureFlag: null },
      features: AdminFeatureTrue,
      expected: true,
    },
    {
      id: "7405681",
      permissions: [],
      required: { rule: null, permissions: null, featureFlag: null },
      features: AdminFeatureTrue,
      expected: true,
    },
    {
      id: "7405682",
      permissions: [],
      required: { rule: PermissionRule.And, permissions: ReadUsers, featureFlag: FeatureFlag.AdminUserManagement },
      features: AdminFeatureTrue,
      expected: false,
    },
    {
      id: "7405683",
      permissions: [],
      required: { rule: PermissionRule.And, permissions: ReadUsers, featureFlag: FeatureFlag.AdminUserManagement },
      features: AdminFeatureFalse,
      expected: true,
    },
    {
      id: "7405684",
      permissions: ReadUsers,
      required: { rule: PermissionRule.And, permissions: ReadUsers, featureFlag: FeatureFlag.AdminUserManagement },
      features: AdminFeatureTrue,
      expected: true,
    },
    {
      id: "7405687",
      permissions: ReadUsers,
      required: { rule: PermissionRule.And, permissions: ReadUsers, featureFlag: FeatureFlag.AdminUserManagement },
      features: AdminFeatureFalse,
      expected: true,
    },
    {
      id: "7405688",
      permissions: ReadUsers,
      required: { rule: PermissionRule.And, permissions: ReadOrganizations, featureFlag: FeatureFlag.AdminUserManagement },
      features: AdminFeatureTrue,
      expected: false,
    },
    {
      id: "7405689",
      permissions: ReadUsers,
      required: { rule: PermissionRule.And, permissions: ReadOrganizations, featureFlag: FeatureFlag.AdminUserManagement },
      features: AdminFeatureFalse,
      expected: true,
    },
    { id: "7405690", permissions: ReadUsers, required: null, features: AdminFeatureFalse, expected: true },
    { id: "7405691", permissions: ReadUsers, required: null, features: AdminFeatureFalse, expected: true },
  ];

  // FIXME: PLATFORM-2075 update to single test each
  testCases.forEach((test, index) => {
    const { id, permissions, required, features, expected } = test;
    it(`${id}: HasRequiredPermissions With Feature Flag [Test Number ${index}]`, () => {
      const hasAccess = hasRequiredPermission(permissions, required, features);
      expect(hasAccess).toBe(expected);
    });
  });
});
