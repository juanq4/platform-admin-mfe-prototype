import { MockedProvider } from "@apollo/client/testing";
import { isEmpty, SelectClassName, ToastContainer } from "@q4/nimbus-ui";
import { OrganizationType, Permission } from "@q4/platform-definitions";
import { createMemoryHistory } from "history";
import React from "react";
import { generatePath, Router } from "react-router-dom";
import { CombinedError } from "urql";
import { Auth0HookMock, MockAuth0Token } from "../../__mocks__/contexts/Auth0Context.mock";
import { MockOrganization1 } from "../../__mocks__/data/organizations.mock";
import { MockUserWithId, MockUserNoRolesWithId } from "../../__mocks__/data/users.mock";
import { AdminContent } from "../../components/AdminContent/AdminContent.component";
import { OrganizationDetailsMode } from "../../components/AdminContent/Organizations/Details/OrganizationDetails.definition";
import type { UserEditViewIdModel } from "../../components/AdminContent/User/Edit/UserEdit.definition";
import { AccessRouteMap, PermissionCollection, Role } from "../../configurations/access.configuration";
import { OrganizationClaim } from "../../configurations/q4-platform-common.configuration";
import type { TupleOf } from "../../definitions/typescript.definition";
import type { User } from "../../definitions/user.definition";
// import { useClaims } from "../../hooks/useClaims/useClaims.hook";
import { useIdTokenClaims } from "../../hooks/useIdTokenClaims/useIdTokenClaims.hook";
import { useOrganizationQuery } from "../../hooks/useOrganization/useOrganization.hook";
import { useToastNotificationService } from "../../hooks/useToastNotificationService/useToastNotificationService.hook";
import { UserUpdateMessages } from "../../hooks/useUser/useUser.definition";
import { useUserQuery } from "../../hooks/useUser/useUser.hook";
import { UpdateUserDocument, useUpdateUserMutation } from "../../schemas/generated/graphql";
import { getOrganizationDetailsMode } from "../../utils/organization/organization.utils";
import { fireEvent, render, screen, waitFor } from "../../utils/testUtils";
import type { UsersEditSpecRouteConfig as RouteConfig } from "./usersEdit.definition";

const id = "bc5b65eb-c4e3-45ed-9e52-a02e77167c72";
const organizationId = "bc5b65eb-c4e3-45ed-9e52-a02e77167c21";

const mocks = [
  {
    request: {
      query: UpdateUserDocument,
      variables: MockUserWithId,
    },
    result: {
      data: {
        id,
        organizationId,
        __typename: "User",
      },
    },
  },
];

jest.mock("../../../hooks/useToastNotificationService/useToastNotificationService.hook");
const mockUseNotifications = useToastNotificationService as jest.Mock;
jest.mock("../../../hooks/useIdTokenClaims/useIdTokenClaims.hook");
const mockUseIdTokenClaims = useIdTokenClaims as jest.Mock;
jest.mock("../../../hooks/useClaims/useClaims.hook");
const mockUseClaims = useClaims as jest.Mock;
jest.mock("../../../hooks/useUser/useUser.hook");
const mockUseUserQuery = useUserQuery as jest.Mock;
jest.mock("../../../hooks/useOrganization/useOrganization.hook");
const mockUseOrganizationQuery = useOrganizationQuery as jest.Mock;
jest.mock("../../../utils/organization/organization.utils");
const mockGetOrganizationDetailsMode = getOrganizationDetailsMode as jest.Mock;
jest.mock("../../../schemas/generated/graphql");
const mockUseUpdateUserMutation = useUpdateUserMutation as jest.Mock;

const testCount = 13;
const Q4ClientRole = "Q4 Client Team [DEV]";

export function testUserEdit(
  componentMessage: string,
  routeConfig: RouteConfig[],
  viewIdModel: typeof UserEditViewIdModel,
  mockPush: jest.Mock,
  mockUser: User,
  testIds: TupleOf<string, typeof testCount>,
): void {
  describe(componentMessage, () => {
    const organizationId = mockUser.organizationId;
    const mockOrganization = { ...MockOrganization1, organizationId };
    const mockAuth0Token = {
      ...MockAuth0Token,
    };
    const mockUserClaim = {
      organizationId,
    };

    Auth0HookMock({
      user: {
        [OrganizationClaim]: mockUser.organizationId,
      },
    });

    const updateUserMutation = jest.fn();
    const defaultUserQueryInputData = {
      variables: { id: mockUser.organizationId, userId: mockUser.id },
      pause: false,
    };

    const userUpdateUserMutationReponse = (success: boolean) => {
      // const updateUser = success ? MockUserWithId : null;
      const error = success ? null : new CombinedError({});
      return [
        updateUserMutation,
        {
          loading: false,
          error,
          data: {
            id,
            organizationId,
          },
        },
      ];
    };

    const userMockGetReponse = (user: User) => {
      return [
        {
          fetching: false,
          error: null,
          data: { user },
          stale: null,
        },
        jest.fn(),
      ] as ReturnType<typeof useUserQuery>;
    };

    beforeEach(() => {
      mockUseIdTokenClaims.mockReturnValue(mockAuth0Token);
      mockGetOrganizationDetailsMode.mockReturnValue(OrganizationDetailsMode.Edit);
      mockUseNotifications.mockReturnValue({
        current: {
          success: jest.fn(),
          error: jest.fn(),
          dismiss: jest.fn(),
        },
      });
    });

    function customRender(
      permissions: Permission[],
      route: RouteConfig["route"],
      routeQuery: RouteConfig["routeQuery"],
      returnRoute = "",
      success = true,
      user = mockUser,
      isAdmin = false,
      type = OrganizationType.CORP,
    ): void {
      mockUseClaims.mockReturnValue({ ...mockUserClaim, permissions });
      mockUseUpdateUserMutation.mockReturnValue(userUpdateUserMutationReponse(success));
      mockUseOrganizationQuery.mockReturnValue([
        {
          fetching: false,
          error: null,
          data: {
            organization: { ...mockOrganization, isAdmin, type },
          },
          stale: null,
        },
        jest.fn(),
      ]);
      mockUseUserQuery.mockReturnValue(userMockGetReponse(user));
      mockUseUpdateUserMutation.mockResolvedValue({ success: true, message: UserUpdateMessages.Success });

      const history = createMemoryHistory();
      history.push({
        pathname: isEmpty(routeQuery) ? route : generatePath(route, routeQuery),
        search: `returnUrl=${returnRoute}`,
        state: { background: "test" },
      });

      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router history={history}>
            <AdminContent />
            <ToastContainer />
          </Router>
        </MockedProvider>,
      );
    }
    // #endregion

    routeConfig.forEach((config) => {
      const { route, routeQuery, returnRoute } = config;
      const requiredPermissions = [
        ...AccessRouteMap[route].permissionCondition.permissions,
        ...PermissionCollection.CrudOrganizations,
      ];

      it(`7395565: should have ${testCount} test ids`, () => {
        expect(testIds?.length).toBe(testCount);
      });

      test(`${testIds[0]}: [Given] I am on the ${componentMessage} [And] don't have the required permissions [Expect] the view not to render`, () => {
        const permissions: Permission[] = null;
        customRender(permissions, route, routeQuery);
        const userForm = screen.queryByTestId(viewIdModel.id);
        expect(userForm).not.toBeInTheDocument();
      });

      test(`${testIds[1]}: [Given] I am on the ${componentMessage} [And] have the required permissions [Expect] the view to render`, () => {
        customRender(requiredPermissions, route, routeQuery);
        const userForm = screen.getByTestId(viewIdModel.id);
        expect(userForm).toBeInTheDocument();
      });

      test(`${testIds[2]}: [Given] I am on the ${componentMessage} [And] I click the modal close button [Expect] to be redirected to the correct route`, async () => {
        customRender(requiredPermissions, route, routeQuery, returnRoute);
        const exitButton = screen.getByTestId(viewIdModel.form.modal.exitIcon);
        expect(exitButton).toBeInTheDocument();

        fireEvent.click(exitButton);
        await waitFor(() => {
          expect(mockPush).toBeCalledTimes(1);
        });
        expect(mockPush).toBeCalledWith(returnRoute);
      });

      test(`${testIds[3]}: [Given] I am on the ${componentMessage} [Expect] the 'Create another user' not to be visible`, () => {
        return (() => {
          customRender(requiredPermissions, route, routeQuery);
          const add = screen.getByTestId(viewIdModel.form.addAnotherUser.id);
          expect(add).toBeInTheDocument();
          expect(add.classList.toString()).toMatch(/hidden/);
        })();
      });

      test(`${testIds[4]}: [Given] I am on the ${componentMessage} [Expect] the user load function to be called`, () => {
        return (() => {
          customRender(requiredPermissions, route, routeQuery);
          const add = screen.getByTestId(viewIdModel.form.saveUser.id);
          expect(add).toBeInTheDocument();
          expect(mockUseUserQuery).toBeCalled();
          expect(mockUseUserQuery).toBeCalledWith(defaultUserQueryInputData);
        })();
      });

      //TODO: unskip when admin module is refactored
      test.skip(`${testIds[5]}: [Given] I am on the ${componentMessage} [And] I click 'Update user' button [Expect] the update function to be called`, () => {
        return (async () => {
          const success = jest.fn();
          mockUseNotifications.mockReturnValue({ current: { success, dismiss: jest.fn() } });
          customRender(requiredPermissions, route, routeQuery);
          const add = screen.getByTestId(viewIdModel.form.saveUser.id);
          expect(add).toBeInTheDocument();

          fireEvent.click(add);
          await waitFor(() => {
            expect(updateUserMutation).toBeCalledTimes(1);
          });
          expect(updateUserMutation).toBeCalledWith(MockUserWithId);

          await waitFor(() => {
            expect(success).toBeCalledWith(UserUpdateMessages.Success);
          });
        })();
      });

      //TODO: unskip when admin module is refactored
      test.skip(`${testIds[6]}: [Given] I am on the ${componentMessage} [When] trying to update a user information [And] the save succeeds [Expect] to be redirected users page`, () => {
        return (async () => {
          updateUserMutation.mockResolvedValue({
            data: {
              id,
              organizationId,
              __typename: "User",
            },
          });
          customRender(requiredPermissions, route, routeQuery, returnRoute);
          const add = screen.getByTestId(viewIdModel.form.saveUser.id);
          expect(add).toBeInTheDocument();
          fireEvent.click(add);
          await waitFor(() => {
            expect(mockPush).toBeCalledTimes(1);
          });
          expect(mockPush).toBeCalledWith(returnRoute);
        })();
      });

      test(`${testIds[7]}: [Given] The user goes view an existing user on the ${componentMessage} [Expect] all the user information to be populated on the edit view`, () => {
        return (() => {
          customRender(requiredPermissions, route, routeQuery);
          const add = screen.getByTestId(viewIdModel.form.saveUser.id);
          expect(add).toBeInTheDocument();
          expect(mockUseUserQuery).toBeCalled();
          expect(mockUseUserQuery).toBeCalledWith(defaultUserQueryInputData);

          const firstName = mockUser.firstName;
          const lastName = mockUser.lastName;
          const email = mockUser.email;
          const friendlyName = mockUser.friendlyName;
          const title = mockUser.title;
          const roles = mockUser.roles;

          const firstNameInput = screen.queryByTestId(viewIdModel.form.firstName.input) as HTMLInputElement;
          expect(firstNameInput.value).toBe(firstName);
          const lastNameInput = screen.queryByTestId(viewIdModel.form.lastName.input) as HTMLInputElement;
          expect(lastNameInput.value).toBe(lastName);
          const emailInput = screen.queryByTestId(viewIdModel.form.email.input) as HTMLInputElement;
          expect(emailInput.value).toBe(email);
          const friendlyNameInput = screen.queryByTestId(viewIdModel.form.friendlyName.input) as HTMLInputElement;
          expect(friendlyNameInput.value).toBe(friendlyName);
          const titleInput = screen.queryByTestId(viewIdModel.form.title.input) as HTMLInputElement;
          expect(titleInput.value).toBe(title);
          const rolesInput = screen.queryByTestId(viewIdModel.form.role.chips.id) as HTMLInputElement;
          roles.forEach((role) => {
            expect(rolesInput.innerHTML.toString()).toContain(role);
          });
        })();
      });

      //TODO: unskip when admin module is refactored
      test.skip(`${testIds[8]}: [Given] I am on the ${componentMessage} [When] trying to update a user [And] the update was successful [Expect] a success toast message to appear`, () => {
        return (async () => {
          const success = jest.fn();
          mockUseNotifications.mockReturnValue({ current: { success, dismiss: jest.fn() } });
          customRender(requiredPermissions, route, routeQuery, returnRoute);
          const add = screen.getByTestId(viewIdModel.form.saveUser.id);
          expect(add).toBeInTheDocument();
          fireEvent.click(add);

          await waitFor(() => {
            expect(success).toBeCalledWith(UserUpdateMessages.Success);
          });

          expect(mockPush).toBeCalledWith(returnRoute);
        })();
      });

      //TODO: unskip when admin module is refactored
      test.skip(`${testIds[9]}: [Given] I am on the ${componentMessage} [When] trying to update a user [And] the update fails [Expect] a fail toast message to appear`, () => {
        return (async () => {
          const error = jest.fn();
          mockUseNotifications.mockReturnValue({ current: { error, dismiss: jest.fn() } });
          customRender(requiredPermissions, route, routeQuery);
          updateUserMutation.mockResolvedValue({ success: false, message: UserUpdateMessages.Failed });

          const add = screen.getByTestId(viewIdModel.form.saveUser.id);
          expect(add).toBeInTheDocument();
          fireEvent.click(add);
          await waitFor(() => {
            expect(error).toBeCalledWith(UserUpdateMessages.Failed);
          });

          expect(mockPush).toBeCalledTimes(0);
        })();
      });

      // FIXME: PLATFORM-2075 update to single test each
      [
        { testId: testIds[10], isAdmin: false, type: OrganizationType.AGENCY },
        { testId: testIds[11], isAdmin: false, type: OrganizationType.AGENCY },
        { testId: testIds[12], isAdmin: false, type: OrganizationType.AGENCY },
      ].forEach((testCase) => {
        const { isAdmin, testId, type } = testCase;
        const expectedRoles = ["Agency User [DEV]", "Earnings Contributor"];

        test(`${testId}: [Given] I am on the ${componentMessage} [And] the organization's isAdmin flag is '${isAdmin}' [Expect] the roles to equal "${expectedRoles.join(
          ", ",
        )}"`, () => {
          customRender(requiredPermissions, route, routeQuery, returnRoute, true, MockUserNoRolesWithId, isAdmin, type);
          const select = screen.getByTestId(viewIdModel.form.role.select.id);
          fireEvent.click(select);
          fireEvent.keyDown(select, { key: "Down" });
          const selectOptions = Array.from(
            document.querySelectorAll(`.${SelectClassName.Portal} .${SelectClassName.Option}`),
          ).map((x) => x.textContent);

          expect(selectOptions).toStrictEqual(expectedRoles);
        });
      });

      test("4750763: [Given] a user with q4graph:manage:users permission open Add User page under Agency type org [When] User role dropdown is opened [Then] expect Agency User role to be present", () => {
        const isAdmin = false;
        const permissions = [Permission.ManageUsers, ...PermissionCollection.CrudOrganizations, ...requiredPermissions];
        customRender(
          permissions,
          route,
          routeQuery,
          returnRoute,
          true,
          MockUserNoRolesWithId,
          isAdmin,
          OrganizationType.AGENCY,
        );

        const select = screen.getByTestId(viewIdModel.form.role.select.id);
        fireEvent.click(select);
        fireEvent.keyDown(select, { key: "Down" });
        const selectOptions = Array.from(
          document.querySelectorAll(`.${SelectClassName.Portal} .${SelectClassName.Option}`),
        ).map((x) => x.textContent);
        expect(selectOptions.includes(Role.AgencyUser)).toBeTruthy();
      });

      //TODO: unskip when admin module is refactored
      test.skip("4750764: [Given] a user with q4graph:manage:users permission open Add User page under Corporate type org [When] User role dropdown is opened [Then] expect Agency User role to be not present", () => {
        const isAdmin = false;

        const permissions = [Permission.ManageUsers, ...requiredPermissions];
        customRender(
          permissions,
          route,
          routeQuery,
          returnRoute,
          true,
          MockUserNoRolesWithId,
          isAdmin,
          OrganizationType.CORP,
        );

        const select = screen.getByTestId(viewIdModel.form.role.select.id);
        fireEvent.click(select);
        fireEvent.keyDown(select, { key: "Down" });
        const selectOptions = Array.from(
          document.querySelectorAll(`.${SelectClassName.Portal} .${SelectClassName.Option}`),
        ).map((option) => option.textContent);
        expect(selectOptions.includes(Role.AgencyUser)).toBeFalsy();
      });

      //TODO: unskip when admin module is refactored
      test.skip("4750765: [Given] a user with q4graph:manage:users permission selects Agency User role under Agency type org [When] Save Organization button is clicked [Then] expect new user created and tagged with Agency User role", async () => {
        const isAdmin = false;

        const permissions = [
          Permission.ManageUsers,
          ...PermissionCollection.CrudOrganizations,
          ...PermissionCollection.CrudUsers,
          ...requiredPermissions,
        ];

        customRender(
          permissions,
          route,
          routeQuery,
          returnRoute,
          true,
          MockUserNoRolesWithId,
          isAdmin,
          OrganizationType.AGENCY,
        );
        const select = screen.getByTestId(viewIdModel.form.role.select.id);
        fireEvent.click(select);
        fireEvent.keyDown(select, { key: "Down" });

        const selectOption = Array.from(
          document.querySelectorAll(`.${SelectClassName.Portal} .${SelectClassName.Option}`),
        ).find((option) => option.textContent === Role.AgencyUser);
        fireEvent.click(selectOption);

        const saveBtn = screen.getByTestId(viewIdModel.form.saveUser.id);
        expect(saveBtn).toBeInTheDocument();

        fireEvent.click(saveBtn);
        await waitFor(() => {
          expect(updateUserMutation).toBeCalledTimes(1);
        });
        expect(updateUserMutation).toBeCalledWith({ ...mockUser, roles: [Role.AgencyUser] });
      });

      test("4765045: [Given] authenticated user with q4graph:manage:users:q4-client-teams permissions is creating new user under Q4 Inc. org [When] User Role dropdown is opened [Then] expect Q4 Client Team role to be visible in the dropdown list", () => {
        const isAdmin = true;
        const permissions = [
          Permission.ManageUsersClientTeam,
          ...PermissionCollection.CrudOrganizations,
          ...requiredPermissions,
        ];
        customRender(
          permissions,
          route,
          routeQuery,
          returnRoute,
          true,
          MockUserNoRolesWithId,
          isAdmin,
          OrganizationType.ADMIN,
        );

        const select = screen.getByTestId(viewIdModel.form.role.select.id);
        fireEvent.click(select);
        fireEvent.keyDown(select, { key: "Down" });
        const selectOptions = Array.from(
          document.querySelectorAll(`.${SelectClassName.Portal} .${SelectClassName.Option}`),
        ).map((el) => el.textContent);
        expect(selectOptions.find((el) => el === Q4ClientRole)).toStrictEqual(Q4ClientRole);
      });
    });
  });
}
