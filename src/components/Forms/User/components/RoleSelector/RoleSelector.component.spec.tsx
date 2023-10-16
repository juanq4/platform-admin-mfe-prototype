import { SelectClassName, StyleGuide } from "@q4/nimbus-ui";
import { Entitlement } from "@q4/platform-definitions";
import type { ReactElement } from "react";
import React from "react";
import {
  MockCorporateOrganization,
  MockAgencyOrganization,
  MockAdminOrganization,
} from "../../../../../__mocks__/data/organizations.mock";
import { MockNoRolesUser } from "../../../../../__mocks__/data/users.mock";
import { PermissionCollection, AppRole } from "../../../../../configurations/access.configuration";
import { fireEvent, render, screen } from "../../../../../utils/testUtils";
import { AdminUserFormIdModel } from "../../AdminUserForm.definition";
import { RoleSelector } from "./RoleSelector.component";

jest.mock("../../../../hooks/useClaims");
const mockUseClaims = useClaims as jest.Mock;

const idModel = new AdminUserFormIdModel("mockFormId");
const defaultRoleSelectorProps = {
  id: idModel.role.id,
  handleUserChange: jest.fn(),
};

describe("User Role Selector", () => {
  beforeEach(() => {
    mockUseClaims.mockReturnValue({ permissions: PermissionCollection.CrudAll, entitlements: [] });
  });

  const getRolesSelectOptions = () => {
    const select = screen.getByTestId(idModel.role.select.id);
    fireEvent.click(select);
    fireEvent.keyDown(select, { key: "Down" });
    return Array.from(document.querySelectorAll(`.${SelectClassName.Portal} .${SelectClassName.Option}`)).map(
      (selectOption) => selectOption.textContent,
    );
  };

  const customRender = (children: ReactElement) => {
    render(children, {}, StyleGuide.V1);
  };

  test("9514264: [Given] I am adding a user to an organization that has the desktop entitlement [And] has type corporate [Then] the 'Desktop User' option is available", () => {
    customRender(
      <RoleSelector
        {...defaultRoleSelectorProps}
        organization={{ ...MockCorporateOrganization, entitlements: [Entitlement.Desktop] }}
        user={MockNoRolesUser}
      />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toContain(AppRole.DesktopUser);
  });

  test("9514265: [Given] I am adding a user to an organization that doesn't have the desktop entitlement [Then] the 'Desktop User' option is not available", () => {
    customRender(
      <RoleSelector {...defaultRoleSelectorProps} organization={MockCorporateOrganization} user={MockNoRolesUser} />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(AppRole.DesktopUser);
  });

  test("9514266: [Given] I am adding a user to an organization that is not type 'corporate' [Then] the 'Desktop User' option is not available", () => {
    customRender(
      <RoleSelector {...defaultRoleSelectorProps} organization={MockAgencyOrganization} user={MockNoRolesUser} />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(AppRole.DesktopUser);
  });

  test("9568393: [Given] I am adding a user to an organization that is type 'admin' [Then] the 'Desktop User' option is available", () => {
    customRender(<RoleSelector {...defaultRoleSelectorProps} organization={MockAdminOrganization} user={MockNoRolesUser} />);

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toContain(AppRole.DesktopUser);
  });

  test("9535624: [Given] I am adding a user to an organization that does have the CRM entitlement [And] does have type corporate [Then] the 'CRM User' option is available", () => {
    customRender(
      <RoleSelector
        {...defaultRoleSelectorProps}
        organization={{ ...MockCorporateOrganization, entitlements: [Entitlement.Crm] }}
        user={MockNoRolesUser}
      />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toContain(AppRole.CrmUser);
  });

  test("9561929: [Given] I am adding a user to an organization that does not have the CRM entitlement [Then] the 'CRM User' option is not available", () => {
    customRender(
      <RoleSelector
        {...defaultRoleSelectorProps}
        organization={{ ...MockCorporateOrganization, entitlements: [] }}
        user={MockNoRolesUser}
      />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(AppRole.CrmUser);
  });

  test("9568392: [Given] I am adding a user to an organization that does not have type corporate [Then] the 'CRM User' option is not available", () => {
    customRender(
      <RoleSelector
        {...defaultRoleSelectorProps}
        organization={{ ...MockAgencyOrganization, entitlements: [Entitlement.Crm] }}
        user={MockNoRolesUser}
      />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(AppRole.CrmUser);
  });

  // Engagement Analytics User
  test("9870712: [Given] I am managing a user under a corporate organization organization [And] the organization has the engagement analytics entitlement [Then] the 'Engagement Analytics User' option is available", () => {
    customRender(
      <RoleSelector
        {...defaultRoleSelectorProps}
        organization={{ ...MockCorporateOrganization, entitlements: [Entitlement.EngagementAnalytics] }}
        user={MockNoRolesUser}
      />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toContain(AppRole.EngagementAnalyticsUser);
  });

  test("9871417: [Given] I am adding a user to an organization that has the engagement analytics starter entitlement [And] has type corporate [Then] the 'Engagement Analytics User' option is available", () => {
    customRender(
      <RoleSelector
        {...defaultRoleSelectorProps}
        organization={{ ...MockCorporateOrganization, entitlements: [Entitlement.EngagementAnalyticsStarter] }}
        user={MockNoRolesUser}
      />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toContain(AppRole.EngagementAnalyticsUser);
  });

  test("9925729: [Given] I am adding a user to an organization that has the engagement analytics base entitlement [And] has type corporate [Then] the 'Engagement Analytics User' option is available", () => {
    customRender(
      <RoleSelector
        {...defaultRoleSelectorProps}
        organization={{ ...MockCorporateOrganization, entitlements: [Entitlement.EngagementAnalyticsBase] }}
        user={MockNoRolesUser}
      />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toContain(AppRole.EngagementAnalyticsUser);
  });

  test("9871418: [Given] I am adding a user to an organization that doesn't have the engagement analytics entitlement [Then] the 'Engagement Analytics User' option is not available", () => {
    customRender(
      <RoleSelector {...defaultRoleSelectorProps} organization={MockCorporateOrganization} user={MockNoRolesUser} />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(AppRole.EngagementAnalyticsUser);
  });

  test("9871419: [Given] I am adding a user to an organization that is type 'agency' [Then] the 'Engagement Analytics User' option is not available", () => {
    customRender(
      <RoleSelector {...defaultRoleSelectorProps} organization={MockAgencyOrganization} user={MockNoRolesUser} />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(AppRole.EngagementAnalyticsUser);
  });

  test("9871420: [Given] I am adding a user to an organization that is type 'admin' [Then] the 'Engagement Analytics User' option is available", () => {
    mockUseClaims.mockReturnValue({
      permissions: [...PermissionCollection.CrudAll],
      entitlements: [],
    });

    customRender(<RoleSelector {...defaultRoleSelectorProps} organization={MockAdminOrganization} user={MockNoRolesUser} />);

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toContain(AppRole.EngagementAnalyticsUser);
  });

  // Meeting Scheduler User
  test("9871421: [Given] I am adding a user to an organization that has the meeting scheduler entitlement [And] has type corporate [Then] the 'Meeting Scheduler' option is available", () => {
    customRender(
      <RoleSelector
        {...defaultRoleSelectorProps}
        organization={{ ...MockCorporateOrganization, entitlements: [Entitlement.MeetingScheduler] }}
        user={MockNoRolesUser}
      />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toContain(AppRole.MeetingSchedulerUser);
  });

  test("9871422: [Given] I am adding a user to an organization that doesn't have the meeting scheduler entitlement [Then] the 'Meeting Scheduler' option is not available", () => {
    customRender(
      <RoleSelector {...defaultRoleSelectorProps} organization={MockCorporateOrganization} user={MockNoRolesUser} />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(AppRole.MeetingSchedulerUser);
  });

  test("9871423: [Given] I am adding a user to an organization that is type 'agency' [Then] the 'Meeting Scheduler' option is not available", () => {
    customRender(
      <RoleSelector {...defaultRoleSelectorProps} organization={MockAgencyOrganization} user={MockNoRolesUser} />,
    );

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).not.toContain(AppRole.MeetingSchedulerUser);
  });

  test("9871424: [Given] I am adding a user to an organization that is type 'admin' [Then] the 'Meeting Scheduler' option is available", () => {
    mockUseClaims.mockReturnValue({
      permissions: [...PermissionCollection.CrudAll],
      entitlements: [],
    });

    customRender(<RoleSelector {...defaultRoleSelectorProps} organization={MockAdminOrganization} user={MockNoRolesUser} />);

    const selectOptions = getRolesSelectOptions();
    expect(selectOptions).toContain(AppRole.MeetingSchedulerUser);
  });
});
