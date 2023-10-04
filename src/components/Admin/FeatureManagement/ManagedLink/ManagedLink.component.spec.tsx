/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { MockOrganization12 } from "../../../../__mocks__";
import { PermissionCollection } from "../../../../configurations/access.configuration";
import { useClaims } from "../../../../hooks/useClaims/useClaims.hook";
import { useOrganizationQuery } from "../../../../hooks/useOrganization/useOrganization.hook";
import { getOrganizationEditRoute, getOrganizationViewRoute } from "../../../../utils/organization/organization.utils";
import { render, waitFor, screen, fireEvent } from "../../../../utils/testUtils";
import { ManagedLink } from "./ManagedLink.component";

jest.mock("../../../../hooks/useClaims/useClaims.hook");
const mockUseClaims = useClaims as jest.Mock;

jest.mock("../../../../hooks/useOrganization/useOrganization.hook");
const mockUseOrganizationQuery = useOrganizationQuery as jest.Mock;

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => {
  const orginal = jest.requireActual("react-router-dom");
  return {
    ...orginal,
    useHistory: () => ({
      location: { pathname: "/" },
      push: mockHistoryPush,
    }),
  };
});
describe("ManagedLink.component", () => {
  afterEach(() => {
    mockUseOrganizationQuery.mockReset();
  });

  afterAll(() => {
    mockUseOrganizationQuery.mockRestore();
  });

  function customRender() {
    mockUseOrganizationQuery.mockReturnValue([
      {
        fetching: false,
        error: undefined,
        data: { organization: { ...MockOrganization12 } },
        stale: false,
      },
      jest.fn(),
    ]);

    return render(<ManagedLink id="test-managed-link" managedByOrganizationId={MockOrganization12.id!} />);
  }

  test("5003134: [Given] an authenticated user with q4graph:read:organizations permission opens edit screen for corporate org [And] corporate org is linked to an agency [Then] expect button label name Agency Managed Test & Co, Inc. to be visible", async () => {
    mockUseClaims.mockReturnValue({ permissions: PermissionCollection.ReadOrganizations });
    customRender();

    await waitFor(() => {
      expect(screen.getByTestId("test-managed-link")).toBeVisible();
    });

    expect(mockUseOrganizationQuery).toHaveBeenCalledWith({
      variables: { id: MockOrganization12.id },
    });
    expect(screen.getByText(`Agency Managed • ${MockOrganization12.name}`)).toBeVisible();
  });

  test("5530626: [Given] a user has the permission to edit an organization [Expect] they may access the Edit Organization page", () => {
    mockUseClaims.mockReturnValue({ permissions: PermissionCollection.CrudOrganizations });
    customRender();
    const agencyManagedButton = screen.getByText(`Agency Managed • ${MockOrganization12.name}`);
    expect(agencyManagedButton).toBeVisible();

    fireEvent.click(agencyManagedButton);

    expect(mockHistoryPush).toBeCalledTimes(1);
    expect(mockHistoryPush).toBeCalledWith(getOrganizationEditRoute(MockOrganization12.id));
  });

  test("5530627: [Given] a user has the permission to view an organization [Expect] they may access the View Organization page", () => {
    mockUseClaims.mockReturnValue({ permissions: PermissionCollection.ReadOrganizations });
    customRender();
    const agencyManagedButton = screen.getByText(`Agency Managed • ${MockOrganization12.name}`);
    expect(agencyManagedButton).toBeVisible();

    fireEvent.click(agencyManagedButton);

    expect(mockHistoryPush).toBeCalledTimes(1);
    expect(mockHistoryPush).toBeCalledWith(getOrganizationViewRoute(MockOrganization12.id));
  });
});
