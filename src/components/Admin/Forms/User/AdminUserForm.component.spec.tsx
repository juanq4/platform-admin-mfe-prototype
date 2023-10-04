import { SelectClassName, StyleGuide } from "@q4/nimbus-ui";
import { Entitlement, OrganizationType } from "@q4/platform-definitions";
import React from "react";
import type { AdminUserFormProps } from "..";
import { AdminUserFormErrorTextboxTheme, AdminUserFormIdModel } from "..";
import {
  MockOrganization1,
  MockOrganization12,
  MockOrganization7,
  MockUser,
  MockUser1,
  MockUser14,
  MockUser2,
} from "../../../../__mocks__";
import { PermissionCollection, Role } from "../../../../configurations";
import { UserApplications, User } from "../../../../definitions";
import type { OrganizationQueryResponse } from "../../../../hooks";
import { useClaims } from "../../../../hooks/useClaims/useClaims.hook";
import { useOrganizationQuery } from "../../../../hooks/useOrganization/useOrganization.hook";
import { getRoles } from "../../../../utils";
import { fireEvent, render, screen, waitFor } from "../../../../utils/testUtils";
import { AdminUserForm } from "./AdminUserForm.component";
import { AdminUserFormLabel, AdminUserFormMode, AdminUserFormWording } from "./AdminUserForm.definition";
import { getAdminFormUser } from "./AdminUserForm.utils";

jest.mock("../../../../hooks/useOrganization/useOrganization.hook");
const mockUseOrganizationQuery = useOrganizationQuery as jest.Mock;
jest.mock("../../../../hooks/useClaims/useClaims.hook");
const mockUseClaims = useClaims as jest.Mock;

jest.mock("react-router-dom", () => {
  const orginal = jest.requireActual("react-router-dom");
  return {
    ...orginal,
    useHistory: () => ({
      location: { pathname: "/" },
    }),
  };
});

describe("AdminUserForm", () => {
  const { id: organizationId } = MockOrganization1;
  const idModel = new AdminUserFormIdModel("mockFormId");
  const mockedMessage = "Mocked Message.";

  afterEach(() => {
    mockUseOrganizationQuery.mockReset();
    mockUseClaims.mockReset();
  });

  afterAll(() => {
    mockUseOrganizationQuery.mockRestore();
    mockUseClaims.mockRestore();
  });

  const orgQueryHookFn = jest.fn();

  function getOrgQueryHook(
    organization: OrganizationQueryResponse["organization"] = MockOrganization1,
    isAdmin?: boolean,
  ): ReturnType<typeof useOrganizationQuery> {
    const updated = { ...organization, isAdmin };

    return [
      {
        fetching: false,
        error: null,
        data: { organization: updated },
        stale: null,
      },
      orgQueryHookFn,
    ];
  }

  const organizationQueryHookDefault = getOrgQueryHook();

  const allPermissions = PermissionCollection.CrudAll;

  const handleSave = jest.fn();

  const mockProps: AdminUserFormProps = {
    id: idModel.id,
    user: new User(),
    organizationId,
    title: null,
    primaryActionLabel: "update user",
    mode: null,
    showAddAnotherUser: true,
    loading: false,
    onChange: jest.fn(),
    onClose: jest.fn(),
    onSave: handleSave,
  };

  function getRolesSelectOptions() {
    const select = screen.getByTestId(idModel.role.select.id);
    fireEvent.click(select);
    fireEvent.keyDown(select, { key: "Down" });
    return Array.from(document.querySelectorAll(`.${SelectClassName.Portal} .${SelectClassName.Option}`)).map(
      (selectOption) => selectOption.textContent,
    );
  }

  const validateUserCannotEdit = () => {
    expect(screen.getByRole("textbox", { name: AdminUserFormLabel.EmailAddress })).toHaveAttribute("readonly");
    expect(screen.getByRole("textbox", { name: `${AdminUserFormLabel.FirstName} Required` })).toHaveAttribute("readonly");
    expect(screen.getByRole("textbox", { name: `${AdminUserFormLabel.LastName} Required` })).toHaveAttribute("readonly");
    expect(screen.getByRole("textbox", { name: AdminUserFormLabel.OrganizationName })).toHaveAttribute("readonly");
    expect(screen.getByRole("textbox", { name: AdminUserFormLabel.Friendly })).toHaveAttribute("readonly");
    expect(screen.getByRole("textbox", { name: AdminUserFormLabel.Title })).toHaveAttribute("readonly");
    // Note: this expect invocation on the role selector component is invalid; the textbox element returned always has readonly set to true even when role is selectable
    //   expect(screen.getByRole("textbox", { name: `${AdminUserFormLabel.UserRole} Select ${userRole}` })).toHaveAttribute("readonly");
  };

  const validateUserCanEdit = () => {
    expect(screen.getByRole("textbox", { name: AdminUserFormLabel.EmailAddress })).toHaveAttribute("readonly");
    expect(screen.getByRole("textbox", { name: AdminUserFormLabel.OrganizationName })).toHaveAttribute("readonly");
    expect(screen.getByRole("textbox", { name: `${AdminUserFormLabel.FirstName} Required` })).not.toHaveAttribute(
      "readonly",
    );
    expect(screen.getByRole("textbox", { name: `${AdminUserFormLabel.LastName} Required` })).not.toHaveAttribute("readonly");
    expect(screen.getByRole("textbox", { name: AdminUserFormLabel.Friendly })).not.toHaveAttribute("readonly");
    expect(screen.getByRole("textbox", { name: AdminUserFormLabel.Title })).not.toHaveAttribute("readonly");
  };

  function customRender(
    props: AdminUserFormProps,
    organizationQueryHookMock = organizationQueryHookDefault,
    permissions = allPermissions,
  ): ReturnType<typeof render> {
    mockUseOrganizationQuery.mockReturnValue(organizationQueryHookMock);
    mockUseClaims.mockReturnValue({ permissions });
    return render(<AdminUserForm {...props} />, null, StyleGuide.V1);
  }

  it("renders without props", () => {
    customRender({
      id: null,
      user: null,
      organizationId: null,
      title: null,
      primaryActionLabel: null,
      mode: null,
      showAddAnotherUser: null,
      onChange: null,
      onClose: null,
      onSave: null,
    });
  });

  test("1269264: [Given] I am on the Admin User Form [Expect] the user to be set to active", () => {
    customRender(mockProps);
    const active = screen.getByTestId(idModel.active.id);
    expect(active).toBeInTheDocument();
    const activeInput = screen.getByTestId(idModel.active.input) as HTMLInputElement;
    expect(activeInput.value).toBeTruthy();
  });

  test("1271139: [Given] I am on the Admin User Form [And] the organization's isAdmin flag is 'true' [Expect] all roles to be populated", () => {
    const orgQueryHook = getOrgQueryHook(MockOrganization1, true);
    const expected = getRoles({ isAdmin: true, type: OrganizationType.CORP, entitlements: [] }, allPermissions).filter(
      (role) => role !== Role.AgencyUser,
    );
    customRender(mockProps, orgQueryHook);
    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toStrictEqual(expected);
  });

  test("2641942: [Given] I am on the Admin User Form [And] the organization's isAdmin flag is 'false' [Expect] corporate to be populated", () => {
    const orgQueryHook = getOrgQueryHook(MockOrganization1, false);
    const expected = getRoles({ isAdmin: false, type: OrganizationType.CORP, entitlements: [] }, allPermissions).filter(
      (role) => role !== Role.AgencyUser,
    );
    customRender(mockProps, orgQueryHook);
    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toStrictEqual(expected);
  });

  test("2641943: [Given] I am on the Admin User Form [And] the organization's isAdmin flag is 'null' [Expect] corporate to be populated", () => {
    const orgQueryHook = getOrgQueryHook(MockOrganization1, null);
    const expected = getRoles({ isAdmin: null, type: OrganizationType.CORP, entitlements: [] }, allPermissions).filter(
      (role) => role !== Role.AgencyUser,
    );
    customRender(mockProps, orgQueryHook);
    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toStrictEqual(expected);
  });

  test("2939229: [Given] I am on the Admin User Form [And]  I am a Corporate Admin user for the Q4 Corporation [When] I edit a user [Expect] that i cannot assign the Q4 Admin or Q4 Support roles", () => {
    const isAdmin = true;
    const userPermissions = PermissionCollection.CrudUsers;
    const orgQueryHook = getOrgQueryHook(MockOrganization1, isAdmin);
    const expected = getRoles({ isAdmin, type: OrganizationType.CORP, entitlements: [] }, userPermissions).filter(
      (role) => role !== Role.AgencyUser,
    );

    customRender(mockProps, orgQueryHook, userPermissions);
    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toStrictEqual(expected);
  });

  test("2956577: [Given] I am on the Admin User Form [And] I am a Q4 Admin user for the Q4 Corporation [When] I edit a user [Expect] that I can assign the Q4 Admin or Q4 Support roles", () => {
    const isAdmin = true;
    const userPermissions = PermissionCollection.CrudAll;
    const orgQueryHook = getOrgQueryHook(MockOrganization1, isAdmin);
    const expected = getRoles({ isAdmin, type: OrganizationType.CORP, entitlements: [] }, userPermissions).filter(
      (role) => role !== Role.AgencyUser,
    );

    customRender(mockProps, orgQueryHook, userPermissions);
    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toStrictEqual(expected);
  });

  test("1269265: [Given] I am on the Admin User Form [And] the organization is returned successfully [Expect] the organization name to be present", () => {
    customRender(mockProps);
    const organization = screen.getByTestId(idModel.organizationName.id);
    expect(organization).toBeInTheDocument();

    const organizationInput = screen.getByTestId(idModel.organizationName.input) as HTMLInputElement;
    expect(organizationInput.value).toBe(MockOrganization1.name);
  });

  test("1269266: [Given] I am on the Admin User Form [And] the organization is not returned [Expect] the organization id to be present", () => {
    const orgQueryHook = getOrgQueryHook(null);
    customRender(mockProps, orgQueryHook);
    const organization = screen.getByTestId(idModel.organizationName.id);
    expect(organization).toBeInTheDocument();

    const organizationInput = screen.getByTestId(idModel.organizationName.input) as HTMLInputElement;
    expect(organizationInput.value).toBe(organizationId);
  });

  test("1269267: [Given] I am on the Admin User Form [And] nothing is filled in [When] the I click the 'add new' button [Expect] the required fields to show an error message", () => {
    customRender(mockProps);
    const addUserButton = screen.getByTestId(idModel.saveUser.id);
    fireEvent.click(addUserButton);

    const emailField = screen.getByTestId(idModel.emailField.error);
    const firstNameField = screen.getByTestId(idModel.firstNameField.error);
    const lastNameField = screen.getByTestId(idModel.lastNameField.error);
    expect(emailField).toBeInTheDocument();
    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();

    const email = screen.getByTestId(idModel.email.id);
    const firstName = screen.getByTestId(idModel.firstName.id);
    const lastName = screen.getByTestId(idModel.lastName.id);
    const textBoxClassName = `nui-textbox--${AdminUserFormErrorTextboxTheme}`;
    expect(email).toHaveClass(textBoxClassName);
    expect(firstName).toHaveClass(textBoxClassName);
    expect(lastName).toHaveClass(textBoxClassName);

    expect(handleSave).toBeCalledTimes(0);
  });

  test("1269268: [Given] I am on the Admin User Form [And] nothing is filled in [When] the I click the 'create another user' button [Expect] the required fields to show an error message", () => {
    customRender(mockProps);
    const addUserButton = screen.getByTestId(idModel.addAnotherUser.id);
    fireEvent.click(addUserButton);

    const emailField = screen.getByTestId(idModel.emailField.error);
    const firstNameField = screen.getByTestId(idModel.firstNameField.error);
    const lastNameField = screen.getByTestId(idModel.lastNameField.error);
    expect(emailField).toBeInTheDocument();
    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();

    const email = screen.getByTestId(idModel.email.id);
    const firstName = screen.getByTestId(idModel.firstName.id);
    const lastName = screen.getByTestId(idModel.lastName.id);
    const textBoxClassName = `nui-textbox--${AdminUserFormErrorTextboxTheme}`;
    expect(email).toHaveClass(textBoxClassName);
    expect(firstName).toHaveClass(textBoxClassName);
    expect(lastName).toHaveClass(textBoxClassName);

    expect(handleSave).toBeCalledTimes(0);
  });

  test("1269269: [Given] I am on the Admin User Form [When] 'add user' is clicked [And] success is 'true' [Expect] the onSave to be called", async () => {
    const success = true;
    handleSave.mockResolvedValue({ success, message: mockedMessage });
    customRender({ ...mockProps, user: MockUser });
    const addUserButton = screen.getByTestId(idModel.saveUser.id);
    fireEvent.click(addUserButton);
    expect(handleSave).toBeCalledTimes(1);
    expect(handleSave).toBeCalledWith(getAdminFormUser(MockUser, organizationId));

    await waitFor(() => {
      expect(mockProps.onClose).toBeCalledTimes(+success);
    });
  });

  test("1269270: [Given] I am on the Admin User Form [When] 'add user' is clicked [And] success is 'false' [Expect] the onSave not to be called", async () => {
    const success = false;
    handleSave.mockResolvedValue({ success, message: mockedMessage });
    customRender({ ...mockProps, user: MockUser });
    const addUserButton = screen.getByTestId(idModel.saveUser.id);
    fireEvent.click(addUserButton);
    expect(handleSave).toBeCalledTimes(1);
    expect(handleSave).toBeCalledWith(getAdminFormUser(MockUser, organizationId));

    await waitFor(() => {
      expect(mockProps.onClose).toBeCalledTimes(+success);
    });
  });

  test("1269271: [Given] I am on the Admin User Form [When] 'create another user' is clicked [And] success is 'true' [Expect] the onSave to be called", async () => {
    const success = true;
    handleSave.mockResolvedValue({ success, message: mockedMessage });
    customRender({ ...mockProps, user: MockUser });
    const addUserButton = screen.getByTestId(idModel.addAnotherUser.id);
    fireEvent.click(addUserButton);
    expect(handleSave).toBeCalledTimes(1);
    expect(handleSave).toBeCalledWith(getAdminFormUser(MockUser, organizationId));

    await waitFor(() => {
      expect(mockProps.onChange).toBeCalledTimes(+success);
    });
    if (success) {
      expect(mockProps.onChange).toBeCalledWith(new User({ roles: MockUser.roles }));
    }

    expect(mockProps.onClose).toBeCalledTimes(0);
  });

  test("1269272: [Given] I am on the Admin User Form [When] 'create another user' is clicked [And] success is 'false' [Expect] the onSave to be not called", async () => {
    const success = false;
    handleSave.mockResolvedValue({ success, message: mockedMessage });
    customRender({ ...mockProps, user: MockUser });
    const addUserButton = screen.getByTestId(idModel.addAnotherUser.id);
    fireEvent.click(addUserButton);
    expect(handleSave).toBeCalledTimes(1);
    expect(handleSave).toBeCalledWith(getAdminFormUser(MockUser, organizationId));

    await waitFor(() => {
      expect(mockProps.onChange).toBeCalledTimes(+success);
    });
    if (success) {
      expect(mockProps.onChange).toBeCalledWith(new User({ roles: MockUser.roles }));
    }

    expect(mockProps.onClose).toBeCalledTimes(0);
  });

  test("2958438: [Given] I am on the user edit view [Then] expect that the Email field is set to read-only [And] the Email field label is not labeled as required", () => {
    const email = "bobby@testman.com";
    const user = new User({
      firstName: "Bobby",
      lastName: "Testman",
      email,
    });
    customRender({ ...mockProps, mode: AdminUserFormMode.Edit, user });
    const emailInput: HTMLInputElement = screen.queryByTestId(idModel.email.input);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe(email);
    expect(emailInput).toHaveAttribute("readonly");
  });

  test("2968331: [Given] I am on the user edit view [Then] expect that the Email field is set to read-only [And] the Email field label is not labeled as required", () => {
    customRender({ ...mockProps, mode: AdminUserFormMode.Create });
    const emailInput: HTMLInputElement = screen.queryByTestId(idModel.email.input);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe("");
    expect(emailInput).not.toHaveAttribute("readonly");
  });

  test("3469258: [Given] I am on the user edit view [When] I have filled out the user form, including some roles, and click create another user [And] the user is created successfully [Expect] The previously selected roles to stay selected for the new blank user", async () => {
    handleSave.mockResolvedValue({ success: true, message: mockedMessage });
    const user = MockUser2;
    customRender({ ...mockProps, user, mode: AdminUserFormMode.Create });

    const emailInput1: HTMLInputElement = screen.queryByTestId(idModel.email.input);
    expect(emailInput1.value).toBe(user.email);

    const createAnotherUserButton = screen.getByTestId(idModel.addAnotherUser.id);
    fireEvent.click(createAnotherUserButton);

    await waitFor(() => {
      expect(mockProps.onChange).toBeCalledWith(new User({ roles: user.roles }));
    });

    user.roles.forEach((role, idx) => {
      const chip = screen.getByTestId(idModel.role.chips.list.getModelId(idx).label);
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveTextContent(role);
    });
  });

  test("4380774: [Given] I am on the user edit view [When] the user is loading [Expect] a spinner to show", () => {
    customRender({ ...mockProps, loading: true });
    expect(screen.getByTestId(idModel.loadingSpinner.id)).toBeVisible();
  });

  test("4382147: [Given] That I am a Q4 Admin user [When] I am editing a user profile [And] I enter an invalid user ID in the URL [Then] I will be presented with a 404 error page", () => {
    customRender({ ...mockProps, user: null });
    expect(screen.getByTestId(idModel.notFound.id)).toBeVisible();
  });

  test("5513884: [Given] An authenticated user with permission q4graph:manage:users [When] adding a new user to an agency type organization [Then] I am able to select the option of ‘Agency User’ in the role field", () => {
    const orgQueryHook = getOrgQueryHook(MockOrganization12);
    customRender({ ...mockProps, mode: AdminUserFormMode.Create }, orgQueryHook);
    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toHaveLength(2);
    expect(selectOptions).toContain(Role.AgencyUser);
  });

  test("5513885: [Given] An authenticated user with permission q4graph:manage:users [When] adding a new user to an agency type organization [Then] the Q4 Admin, Q4 Client Team, Q4 Support, Corporate Admin or Corporate Support role options are not visible", () => {
    const orgQueryHook = getOrgQueryHook(MockOrganization12);
    customRender({ ...mockProps, mode: AdminUserFormMode.Create }, orgQueryHook);
    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(Role.Q4Admin);
    expect(selectOptions).not.toContain(Role.Q4ManageClientRole);
    expect(selectOptions).not.toContain(Role.Q4Support);
    expect(selectOptions).not.toContain(Role.CorporateAdmin);
    expect(selectOptions).not.toContain(Role.CorporateSupport);
  });

  test("5514507: [Given] An authenticated user with permission q4graph:manage:users [When] editing a user in an agency type organization [Then] I am able to select the option of 'Agency User' in the role field", () => {
    const orgQueryHook = getOrgQueryHook(MockOrganization12);
    const props = {
      ...mockProps,
      user: new User({ organizationId: MockOrganization12.id, roles: [Role.CorporateSupport] }),
    };

    customRender({ ...props, mode: AdminUserFormMode.Edit }, orgQueryHook);
    const selectOptions = getRolesSelectOptions();

    expect(selectOptions).toContain(Role.AgencyUser);
  });

  test("5514508: [Given] An authenticated user with permission q4graph:manage:users [When] editing a user in an agency type organization [Then] the Q4 Admin, Q4 Client Team, Q4 Support, Corporate Admin or Corporate Support role options are not visible", () => {
    const orgQueryHook = getOrgQueryHook(MockOrganization12);
    const props = {
      ...mockProps,
      user: new User({ organizationId: MockOrganization12.id, roles: [Role.CorporateSupport] }),
    };

    customRender({ ...props, mode: AdminUserFormMode.Edit }, orgQueryHook);
    const selectOptions = getRolesSelectOptions();

    expect(selectOptions).not.toContain(Role.Q4Admin);
    expect(selectOptions).not.toContain(Role.Q4ManageClientRole);
    expect(selectOptions).not.toContain(Role.Q4Support);
    expect(selectOptions).not.toContain(Role.CorporateAdmin);
    expect(selectOptions).not.toContain(Role.CorporateSupport);
  });

  test("5871784: [Given] That I have the q4graph:manage:users permission [And] I am on the edit user page under the Q4 admin org [Then] I can see “Q4 Support” as a role option", () => {
    const isAdmin = true;
    const orgQueryHook = getOrgQueryHook(MockOrganization7, isAdmin);
    customRender({ ...mockProps, mode: AdminUserFormMode.Edit }, orgQueryHook, PermissionCollection.CrudUsers);
    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toContain(Role.Q4Support);
  });

  test("5871785: [Given] That I have the q4graph:manage:users permission [And] I am on the edit user page under an external organization [Then] I cannot see “Q4 Support” as a role option", () => {
    const orgQueryHook = getOrgQueryHook(MockOrganization1);
    customRender({ ...mockProps, mode: AdminUserFormMode.Edit }, orgQueryHook, PermissionCollection.CrudUsers);
    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(Role.Q4Support);
  });

  test("5871801: [Given] That I have the q4graph:manage:users permission [And] I am on the add user page under the Q4 admin org [Then] I can see “Q4 Support” as a role option", () => {
    const isAdmin = true;
    const orgQueryHook = getOrgQueryHook(MockOrganization7, isAdmin);
    customRender({ ...mockProps, mode: AdminUserFormMode.Create }, orgQueryHook, PermissionCollection.CrudUsers);
    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toContain(Role.Q4Support);
  });

  test("5871851: [Given] That I have the q4graph:manage:users permission [And] I am on the add user page under an external organization [Then] I cannot see “Q4 Support” as a role option", () => {
    const orgQueryHook = getOrgQueryHook(MockOrganization1);
    customRender({ ...mockProps, mode: AdminUserFormMode.Create }, orgQueryHook, PermissionCollection.CrudUsers);
    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(Role.Q4Support);
  });

  test("7865955: [Given] That I have the q4graph:manage:users permission [And] I am on the add user page of an org with Desktop entitlement [Then] I expect to see 'send a Desktop Welcome email' checkbox", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization1, entitlements: [Entitlement.Desktop] });
    customRender({ ...mockProps, mode: AdminUserFormMode.Create }, orgQueryHook, PermissionCollection.CrudUsers);

    const desktopWelcomeEmail = screen.getByRole("checkbox", { name: AdminUserFormWording.WelcomeEmailLabel });
    expect(desktopWelcomeEmail).toBeVisible();
  });

  test("7865956: [Given] That I have the q4graph:manage:users permission [And] I am on the add user page of an org with 'NO' Desktop entitlement [Then] I expect to not see 'send a Desktop Welcome email' checkbox", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization1, entitlements: [] });
    customRender({ ...mockProps, mode: AdminUserFormMode.Create }, orgQueryHook, PermissionCollection.CrudUsers);

    const desktopWelcomeEmail = screen.queryByRole("checkbox", {
      name: AdminUserFormWording.WelcomeEmailLabel,
    });
    expect(desktopWelcomeEmail).not.toBeInTheDocument();
  });

  test("7882737: [Given] That I have the q4graph:manage:users permission [And] I am on the edit user page of an org with Desktop entitlement [Then] I expect to not see 'send a Desktop Welcome email' checkbox", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization1, entitlements: [] });
    customRender({ ...mockProps, mode: AdminUserFormMode.Edit }, orgQueryHook, PermissionCollection.CrudUsers);

    const desktopWelcomeEmail = screen.queryByRole("checkbox", {
      name: AdminUserFormWording.WelcomeEmailLabel,
    });
    expect(desktopWelcomeEmail).not.toBeInTheDocument();
  });

  test("7865957: [Given] the 'send a Desktop Welcome email' checkbox is checked [Then] expect 'desktop' to be in payload", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization1, entitlements: [Entitlement.Desktop] });
    const user = { ...MockUser2, emailApp: UserApplications.Desktop };

    handleSave.mockResolvedValue({ success: true, message: mockedMessage });
    customRender({ ...mockProps, user, mode: AdminUserFormMode.Create }, orgQueryHook, PermissionCollection.CrudUsers);

    const desktopWelcomeEmail = screen.getByRole("checkbox", { name: AdminUserFormWording.WelcomeEmailLabel });
    expect(desktopWelcomeEmail).toBeVisible();

    expect(desktopWelcomeEmail).toBeChecked();

    const addUserButton = screen.getByTestId(idModel.saveUser.id);
    fireEvent.click(addUserButton);

    expect(handleSave).toBeCalledTimes(1);

    expect(handleSave).toBeCalledWith(expect.objectContaining({ emailApp: UserApplications.Desktop }));
  });

  test("7865958: [Given] the 'send a Desktop Welcome email' checkbox is unchecked [Then] expect 'platform' to be in payload", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization1, entitlements: [Entitlement.Desktop] });
    const user = { ...MockUser2, emailApp: UserApplications.Platform };

    handleSave.mockResolvedValue({ success: true, message: mockedMessage });
    customRender({ ...mockProps, user, mode: AdminUserFormMode.Create }, orgQueryHook, PermissionCollection.CrudUsers);

    const desktopWelcomeEmail = screen.getByRole("checkbox", { name: AdminUserFormWording.WelcomeEmailLabel });
    expect(desktopWelcomeEmail).toBeVisible();

    expect(desktopWelcomeEmail).not.toBeChecked();

    const addUserButton = screen.getByTestId(idModel.saveUser.id);
    fireEvent.click(addUserButton);

    expect(handleSave).toBeCalledTimes(1);

    expect(handleSave).toBeCalledWith(expect.objectContaining({ emailApp: UserApplications.Platform }));
  });

  test("8951394: [Given] an authenticated user without q4graph:manage:users:q4-admin permission [When] adding new user under admin org [Then] expect Q4 Admin role to be not visible in User role dropdown", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization7 }, true);
    customRender({ ...mockProps, mode: AdminUserFormMode.Create }, orgQueryHook, PermissionCollection.CrudUsers);

    const selectOptions = getRolesSelectOptions();

    expect(selectOptions).not.toContain(Role.Q4Admin);
  });

  test("8240018: [Given] an authenticated user without q4graph:manage:users:q4-admin permission can view user profile with Q4 Admin role [Then] expect all input fields to be in disabled state", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization7 }, true);
    customRender(
      { ...mockProps, user: { ...MockUser1 }, mode: AdminUserFormMode.Edit },
      orgQueryHook,
      PermissionCollection.CrudUsers,
    );

    validateUserCannotEdit();
  });

  test("8240019: [Given] an authenticated user without q4graph:manage:users:q4-admin permission can view user profile with Q4 Admin role [Then] expect UPDATE USER button to be in disabled state", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization7 }, true);
    customRender(
      { ...mockProps, user: { ...MockUser1 }, mode: AdminUserFormMode.Edit },
      orgQueryHook,
      PermissionCollection.CrudUsers,
    );

    // expect(screen.getByTestId(idModel.saveUser.id).closest("button")).toBeDisabled();
    expect(screen.getByRole("button", { name: mockProps.primaryActionLabel })).toBeDisabled();
  });

  test("8240162: [Given] an authenticated user without q4graph:manage:users:q4-admin permission can view user profile with Q4 Admin role [Then] expect Deactivate/Activate toggle to be in disabled state", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization7 }, true);
    customRender(
      { ...mockProps, user: { ...MockUser1 }, mode: AdminUserFormMode.Edit },
      orgQueryHook,
      PermissionCollection.CrudUsers,
    );

    expect(screen.getByRole("checkbox", { name: "DEACTIVATED ACTIVE" }).closest("label")).toHaveClass(
      "nui-toggle--disabled",
    );
  });

  test("8271315: [Given] an authenticated user without q4graph:manage:users:q4-admin permission [When] adding new user under admin org [Then] expect Q4 Client Team role to be not visible in User role dropdown", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization7 }, true);
    customRender({ ...mockProps, mode: AdminUserFormMode.Create }, orgQueryHook, PermissionCollection.CrudUsers);

    const selectOptions = getRolesSelectOptions();

    expect(selectOptions).not.toContain(Role.Q4ManageClientRole);
  });

  test("8271316: [Given] an authenticated user without q4graph:manage:users:q4-admin permission can view user profile with Q4 Client Team role [Then] expect all input fields to be in disabled state", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization7 }, true);
    customRender(
      { ...mockProps, user: { ...MockUser14 }, mode: AdminUserFormMode.Edit },
      orgQueryHook,
      PermissionCollection.CrudUsers,
    );

    validateUserCannotEdit();
  });

  test("8271317: [Given] an authenticated user without q4graph:manage:users:q4-admin permission can view user profile with Q4 Client Team role [Then] expect UPDATE USER button to be in disabled state", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization7 }, true);
    customRender(
      { ...mockProps, user: { ...MockUser14 }, mode: AdminUserFormMode.Edit },
      orgQueryHook,
      PermissionCollection.CrudUsers,
    );

    expect(screen.getByRole("button", { name: mockProps.primaryActionLabel })).toBeDisabled();
  });

  test("8271318: [Given] an authenticated user without q4graph:manage:users:q4-admin permission can view user profile with Q4 Client Team role [Then] expect Deactivate/Activate toggle to be in disabled state", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization7 }, true);
    customRender(
      { ...mockProps, user: { ...MockUser14 }, mode: AdminUserFormMode.Edit },
      orgQueryHook,
      PermissionCollection.CrudUsers,
    );

    expect(screen.getByRole("checkbox", { name: "DEACTIVATED ACTIVE" }).closest("label")).toHaveClass(
      "nui-toggle--disabled",
    );
  });

  test("8027143: [Given] a user's roles are being managed [And] the user's organization has a corporate type [And] the user's organization has the studio entitlement [Then] the 'Website Management User' role is enabled", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization1, entitlements: [Entitlement.Studio] });

    customRender({ ...mockProps, mode: AdminUserFormMode.Edit }, orgQueryHook, PermissionCollection.CrudUsers);

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toContain(Role.WebsiteManagementUser);
  });

  test("8027144: [Given] a user's roles are being managed [And] the user's organization has a corporate type [And] the user's organization does not have the studio entitlement [Then] the 'Website Management User' role is not visible", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization1, entitlements: [] });

    customRender({ ...mockProps, mode: AdminUserFormMode.Edit }, orgQueryHook, PermissionCollection.CrudUsers);

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(Role.WebsiteManagementUser);
  });

  test("9101699: [Given] a user's roles are being managed [And] the user's organization has a corporate type [And] the user's organization has the studio and earnings entitlement [Then] the 'Earnings Contributor' role is enabled", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization1, entitlements: [Entitlement.Studio, Entitlement.Earnings] });

    customRender({ ...mockProps, mode: AdminUserFormMode.Edit }, orgQueryHook, PermissionCollection.CrudUsers);

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toContain(Role.EarningsContributor);
  });

  test("9101700: [Given] a user's roles are being managed [And] the user's organization has a corporate type [And] the user's organization does not have the earnings entitlement [Then] the 'Earnings Contributor' role is not visible", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization1, entitlements: [Entitlement.Studio] });

    customRender({ ...mockProps, mode: AdminUserFormMode.Edit }, orgQueryHook, PermissionCollection.CrudUsers);

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(Role.EarningsContributor);
  });

  test("9109395: [Given] a user's roles are being managed [And] the user's organization has a corporate type [And] the user's organization does not have the studio entitlement [Then] the 'Earnings Contributor' role is not visible", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization1, entitlements: [Entitlement.Earnings] });

    customRender({ ...mockProps, mode: AdminUserFormMode.Edit }, orgQueryHook, PermissionCollection.CrudUsers);

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(Role.EarningsContributor);
  });

  test("4765046: [Given] authenticated user with q4graph:manage:users:q4-client-teams permissions is creating new user under Q4 Inc. org  [And] Q4 Client Team role is tagged to new user  [When] Add User is clicked [Then] user is created with Q4 Client Team role", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization7 }, true);
    handleSave.mockResolvedValue({ success: true, message: mockedMessage });

    customRender(
      { ...mockProps, user: MockUser14, mode: AdminUserFormMode.Create },
      orgQueryHook,
      PermissionCollection.ManageClientTeamUsers,
    );

    const saveButton = screen.getByRole("button", { name: mockProps.primaryActionLabel });
    fireEvent.click(saveButton);

    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({
        active: true,
        email: MockUser14.email,
        firstName: MockUser14.firstName,
        friendlyName: MockUser14.friendlyName,
        id: MockUser14.id,
        lastName: MockUser14.lastName,
        roles: [Role.Q4ManageClientRole],
      }),
    );
  });

  test("8586778: [Given] authenticated user with q4graph:manage:users:q4-admin permissions views the users details of an existing Q4 Admin user under Q4 Inc. org [When] The user details page finishes loading [Then] all fields are enabled for editing", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization7 }, true);
    const permissionCollection = [...PermissionCollection.CrudUsers, ...PermissionCollection.ManageUsersAdmin];
    customRender({ ...mockProps, user: { ...MockUser1 }, mode: AdminUserFormMode.Edit }, orgQueryHook, permissionCollection);

    validateUserCanEdit();
  });

  test("8586779: [Given] authenticated user with q4graph:manage:users:q4-client-teams permissions views the users details of an existing Q4 Admin user under Q4 Inc. org [When] The user details page finishes loading [Then] all fields are disabled for editing", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization7 }, true);
    const permissionCollection = [...PermissionCollection.CrudUsers, ...PermissionCollection.ManageClientTeamUsers];
    customRender({ ...mockProps, user: { ...MockUser1 }, mode: AdminUserFormMode.Edit }, orgQueryHook, permissionCollection);

    validateUserCannotEdit();
  });

  test("8586780: [Given] authenticated user with q4graph:manage:users:q4-client-teams permissions views the users details of an existing Q4 Client Team user under Q4 Inc. org [When] The user details page finishes loading [Then] all fields are enabled for editing", () => {
    const orgQueryHook = getOrgQueryHook({ ...MockOrganization7 }, true);
    const permissionCollection = [...PermissionCollection.CrudUsers, ...PermissionCollection.ManageClientTeamUsers];
    customRender(
      { ...mockProps, user: { ...MockUser14 }, mode: AdminUserFormMode.Edit },
      orgQueryHook,
      permissionCollection,
    );

    validateUserCanEdit();
  });
});
