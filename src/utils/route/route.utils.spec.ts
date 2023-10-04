import { PermissionCollection, AdminRoutePath, AppRoutePath } from "../../configurations";
import { getDefaultRedirectRoute, getOrganizationRouteBasedOnPermission, isRoute } from "./route.utils";

describe("getDefaultRedirectRoute", () => {
  const { ReadUsers, CrudUsers, ReadOrganizations, CrudOrganizations, ReadAll, CrudAll } = PermissionCollection;

  test("7403040: [Given] the user has permissions: 'undefined' [Expect] '/' to be returned", () => {
    const defaultRoute = getDefaultRedirectRoute(null);
    expect(defaultRoute).toBe(AppRoutePath.Default);
  });

  test("7403041: [Given] the user has permissions: '' [Expect] '/' to be returned", () => {
    const defaultRoute = getDefaultRedirectRoute([]);
    expect(defaultRoute).toBe(AppRoutePath.Default);
  });

  test("7403042: [Given] the user has permissions: 'q4graph:read:users' [Expect] '/' to be returned", () => {
    const defaultRoute = getDefaultRedirectRoute(ReadUsers);
    expect(defaultRoute).toBe(AppRoutePath.Default);
  });

  test("7403043: [Given] the user has permissions: 'q4graph:read:users, q4graph:manage:users' [Expect] '/' to be returned", () => {
    const defaultRoute = getDefaultRedirectRoute(CrudUsers);
    expect(defaultRoute).toBe(AppRoutePath.Default);
  });

  test("7403044: [Given] the user has permissions: 'q4graph:read:organizations' [Expect] '/admin' to be returned", () => {
    const defaultRoute = getDefaultRedirectRoute(ReadOrganizations);
    expect(defaultRoute).toBe(AdminRoutePath.Home);
  });

  test("7403045: [Given] the user has permissions: 'q4graph:read:organizations, q4graph:manage:organizations' [Expect] '/admin' to be returned", () => {
    const defaultRoute = getDefaultRedirectRoute(CrudOrganizations);
    expect(defaultRoute).toBe(AdminRoutePath.Home);
  });

  test("7403046:", () => {
    const defaultRoute = getDefaultRedirectRoute(ReadAll);
    expect(defaultRoute).toBe(AdminRoutePath.Home);
  });

  test("7403047:", () => {
    const defaultRoute = getDefaultRedirectRoute(CrudAll);
    expect(defaultRoute).toBe(AdminRoutePath.Home);
  });
});

describe("isRoute", () => {
  it("7394151: returns true", () => {
    Object.values(AppRoutePath).forEach((route) => expect(isRoute(route)).toBeTruthy);
    Object.values(AdminRoutePath).forEach((route) => expect(isRoute(route)).toBeTruthy);
  });

  it("7394982: returns false", () => {
    expect(isRoute("/test")).toBeFalsy;
  });
});

describe("Organization Route Based On Permisson", () => {
  const mockOrganizationId = "mockId";

  test("5530628: [Given] a user has the permission to edit an organization [Expect] route returned to be the Organization edit route", () => {
    const mockPermissions = PermissionCollection.CrudOrganizations;
    const expectedRoute = `/admin/organizations/edit/${mockOrganizationId}`;

    const defaultRoute = getOrganizationRouteBasedOnPermission(mockPermissions, mockOrganizationId);
    expect(defaultRoute).toStrictEqual(expectedRoute);
  });

  test("5530629: [Given] a user has the permission to view an organization [Expect] route returned to be the Organization view route", () => {
    const mockPermissions = PermissionCollection.ReadOrganizations;
    const expectedRoute = `/admin/organizations/view/${mockOrganizationId}`;

    const defaultRoute = getOrganizationRouteBasedOnPermission(mockPermissions, mockOrganizationId);
    expect(defaultRoute).toStrictEqual(expectedRoute);
  });
});
