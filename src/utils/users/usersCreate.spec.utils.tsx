import { SelectClassName, ToastContainer } from "@q4/nimbus-ui";
import { OrganizationType } from "@q4/platform-definitions";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CombinedError } from "urql";
import { Auth0HookMock, MockAuth0Token } from "../../__mocks__/contexts/Auth0Context.mock";
import { MockOrganization1 } from "../../__mocks__/data/organizations.mock";
import { MockUser } from "../../__mocks__/data/users.mock";
import { AdminContent } from "../../components/AdminContent/AdminContent.component";
import { OrganizationDetailsMode } from "../../components/AdminContent/Organizations/Details/OrganizationDetails.definition";
import type { UsersCreateViewIdModel } from "../../components/AdminContent/User/Create/UsersCreate.definition";
import { getAdminFormUser } from "../../components/Forms/User/AdminUserForm.utils";
import { AccessRouteMap, PermissionCollection } from "../../configurations/access.configuration";
import type { AdminRoutePath } from "../../configurations/navigation.configuration";
import { OrganizationClaim } from "../../configurations/q4-platform-common.configuration";
import type { TupleOf } from "../../definitions/typescript.definition";
// // import { useClaims } from "../../hooks/useClaims/useClaims.hook";
import { useIdTokenClaims } from "../../hooks/useIdTokenClaims/useIdTokenClaims.hook";
import { useOrganizationQuery } from "../../hooks/useOrganization/useOrganization.hook";
import { useUserCreate } from "../../hooks/useUser/useUser.hook";
import { getOrganizationDetailsMode } from "../organization/organization.utils";
import { fireEvent, render, screen, waitFor } from "../testUtils";

jest.mock("../../../hooks/useClaims/useClaims.hook");
const mockUseClaims = useClaims as jest.Mock;
jest.mock("../../../hooks/useIdTokenClaims/useIdTokenClaims.hook");
const mockUseIdTokenClaims = useIdTokenClaims as jest.Mock;
jest.mock("../../../hooks/useUser/useUser.hook");
const mockUseUserCreate = useUserCreate as jest.Mock;
jest.mock("../../../hooks/useOrganization/useOrganization.hook");
const mockUseOrganizationQuery = useOrganizationQuery as jest.Mock;
jest.mock("../../../utils/organization/organization.utils");
const mockGetOrganizationDetailsMode = getOrganizationDetailsMode as jest.Mock;

const testCount = 8;
const mockAuth0Token = {
  ...MockAuth0Token,
  organizationId: MockOrganization1.id,
};

const mockAuth0Claims = {
  organizationId: MockOrganization1.id,
};

Auth0HookMock({
  user: {
    [OrganizationClaim]: MockOrganization1.id,
  },
});

export function testUserCreate(
  componentMessage: string,
  route: AdminRoutePath,
  viewIdModel: typeof UsersCreateViewIdModel,
  returnRoute: string,
  mockPush: jest.Mock,
  testIds: TupleOf<string, typeof testCount>,
): void {
  describe(componentMessage, () => {
    const mockPost = jest.fn();
    const getMockPostReponse = (success: boolean) => {
      const createUser = success ? MockUser : null;
      const error = success ? null : new CombinedError({});

      return [
        {
          fetching: false,
          error,
          data: { createUser },
          stale: null,
        },
        mockPost,
      ] as ReturnType<typeof useUserCreate>;
    };

    beforeEach(() => {
      mockUseIdTokenClaims.mockReturnValue(mockAuth0Token);
      mockGetOrganizationDetailsMode.mockReturnValue(OrganizationDetailsMode.Edit);
    });

    const requiredPermissions = [
      ...AccessRouteMap[route].permissionCondition.permissions,
      ...PermissionCollection.CrudOrganizations,
    ];

    function customRender(permissions = requiredPermissions, success = true, isAdmin = false, isAgency = false): void {
      mockUseClaims.mockReturnValue({ ...mockAuth0Claims, permissions });
      mockUseUserCreate.mockReturnValue(getMockPostReponse(success));
      mockUseOrganizationQuery.mockReturnValue([
        {
          fetching: false,
          error: null,
          data: {
            organization: {
              ...MockOrganization1,
              isAdmin,
              type: isAgency ? OrganizationType.AGENCY : OrganizationType.CORP,
            },
          },
          stale: null,
        },
        jest.fn(),
      ]);
      mockPost.mockResolvedValue({ success: true });

      render(
        <MemoryRouter initialEntries={[route]}>
          <AdminContent />
          <ToastContainer />
        </MemoryRouter>,
      );
    }

    it(`7395565: should have ${testCount} test ids`, () => {
      expect(testIds?.length).toBe(testCount);
    });

    test(`${testIds[0]}: [Given] I am on the ${componentMessage} [And] don't have the required permissions [Expect] the view not to render`, () => {
      customRender(null);
      const element = screen.queryByTestId(viewIdModel.id);
      expect(element).not.toBeInTheDocument();
    });

    test(`${testIds[1]}: [Given] I am on the ${componentMessage} [And] have the required permissions [Expect] the view to render`, () => {
      customRender();
      const element = screen.getByTestId(viewIdModel.id);
      expect(element).toBeInTheDocument();
    });

    test(`${testIds[2]}: [Given] I am on the ${componentMessage} [And] I click the modal close button [Expect] to be redirected to the correct route`, async () => {
      customRender();
      const exit = screen.getByTestId(viewIdModel.form.modal.exitIcon);
      expect(exit).toBeInTheDocument();

      fireEvent.click(exit);
      await waitFor(() => {
        expect(mockPush).toBeCalledTimes(1);
      });
      expect(mockPush).toBeCalledWith(returnRoute);
    });

    test(`${testIds[3]}: [Given] I am on the ${componentMessage} [And] I click 'create another user' [Expect] the user to be created`, () => {
      return (async () => {
        customRender();
        const add = screen.getByTestId(viewIdModel.form.addAnotherUser.id);
        expect(add).toBeInTheDocument();

        fireEvent.click(add);
        await waitFor(() => {
          expect(mockPost).toBeCalledTimes(1);
        });
        expect(mockPost).toBeCalledWith(getAdminFormUser(MockUser, MockOrganization1.id));
      })();
    });

    test(`${testIds[4]}: [Given] I am on the ${componentMessage} [And] I click 'add user' [Expect] the user to be created`, () => {
      return (async () => {
        customRender(requiredPermissions);
        const add = screen.getByTestId(viewIdModel.form.saveUser.id);
        expect(add).toBeInTheDocument();

        fireEvent.click(add);
        await waitFor(() => {
          expect(mockPost).toBeCalledTimes(1);
        });
        expect(mockPost).toBeCalledWith(getAdminFormUser(MockUser, MockOrganization1.id));
      })();
    });

    // FIXME: PLATFORM-2075 update to single test each
    [
      { testId: testIds[5], isAdmin: false, isAgency: true },
      { testId: testIds[6], isAdmin: false, isAgency: true },
      { testId: testIds[7], isAdmin: false, isAgency: true },
    ].forEach((testCase) => {
      const { isAdmin, testId, isAgency } = testCase;
      const expectedRoles = ["Agency User [DEV]", "Earnings Contributor"];
      test(`${testId}: [Given] I am on the ${componentMessage} [And] the organization's isAdmin flag is '${isAdmin}' [Expect] the roles to equal "${expectedRoles.join(
        ", ",
      )}"`, () => {
        customRender(requiredPermissions, true, isAdmin, isAgency);
        const select = screen.getByTestId(viewIdModel.form.role.select.id);
        fireEvent.click(select);
        fireEvent.keyDown(select, { key: "Down" });
        const selectOptions = Array.from(
          document.querySelectorAll(`.${SelectClassName.Portal} .${SelectClassName.Option}`),
        ).map((x) => x.textContent);
        expect(selectOptions).toStrictEqual(expectedRoles);
      });
    });
  });
}
