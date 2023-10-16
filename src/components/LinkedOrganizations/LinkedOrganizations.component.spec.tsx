import type { ApolloClient } from "@apollo/client";
import { ToastContainer } from "@q4/nimbus-ui";
import { Permission } from "@q4/platform-definitions";
import type { GridReadyEvent } from "ag-grid-community";
import React from "react";
import {
  MockOrganization1,
  MockOrganization12,
  MockOrganization2,
  MockOrganization3,
} from "../../__mocks__/data/organizations.mock";
import { OrganizationEditState } from "../../definitions/organization.definition";
import { useUnlinkOrganizations } from "../../hooks/_apollo/useOrganization/useOrganization.hook";
import { OrganizationUnlinkMessage } from "../../hooks/useOrganization/useOrganization.definition";
import { useOrganizationsLazyQuery } from "../../hooks/useOrganization/useOrganization.hook";
import { useTable } from "../../hooks/useTable/useTable.hook";
import { useToastNotificationService } from "../../hooks/useToastNotificationService/useToastNotificationService.hook";
import { fireEvent, render, screen, waitFor, within } from "../../utils/testUtils";
import { AdminLinkedTableHeader } from "../Tables/linked-organizations/LinkedOrganizationTable.definition";
import { LinkedOrganizations } from "./LinkedOrganizations.component";
import { OrganizationsIdModel } from "./LinkedOrganizations.definition";

jest.mock("../../../hooks/useTable/useTable.hook");

jest.mock("../../../hooks/_apollo/useOrganization/useOrganization.hook");
const mockUseUnlinkOrganizations = useUnlinkOrganizations as jest.Mock;
jest.mock("../../../hooks/useOrganization/useOrganization.hook");
const mockUseOrganizationsLazyQuery = useOrganizationsLazyQuery as jest.Mock;
jest.mock("../../../contexts/session/useSession.hook");
const mockUseClaims = useClaims as jest.Mock;
jest.mock("../../../hooks/useToastNotificationService/useToastNotificationService.hook");
const mockUseToastNotificationService = useToastNotificationService as jest.Mock;

let mockHandleGridReady: (grid: GridReadyEvent) => void;

const defaultItems = [
  { ...MockOrganization2, managedBy: MockOrganization12.id },
  { ...MockOrganization3, managedBy: MockOrganization12.id },
];

const organizationsQueryWithManagedHook = (mockItems = defaultItems) =>
  [
    {
      fetching: false,
      error: null,
      data: {
        organizations: {
          items: mockItems,
        },
      },
      operation: null,
      stale: null,
    },
    jest.fn(),
  ] as unknown as ReturnType<typeof useOrganizationsLazyQuery>;

const idModel = new OrganizationsIdModel("mockOrganization");

const validateTable = async () => {
  await waitFor(() => {
    expect(mockHandleGridReady).toBeCalled();
  });
};

describe("Linked organization table Component", () => {
  beforeEach(() => {
    mockUseUnlinkOrganizations.mockReturnValue([jest.fn(), {}]);
    mockUseClaims.mockReturnValue({ permissions: Permission.ManageLinkedOrgs });
    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsQueryWithManagedHook());
  });

  const customRender = () =>
    render(
      (() => {
        mockHandleGridReady = useTable().handleGridReady;

        return (
          <>
            <LinkedOrganizations
              id={idModel.id}
              key={idModel.id}
              organization={new OrganizationEditState(MockOrganization12)}
            />
            <ToastContainer />
          </>
        );
      })(),
    );

  it("7386717: renders without crashing", () => {
    customRender();

    const container = screen.getByTestId(idModel.id);
    expect(container).toMatchSnapshot();
  });

  test("5000978: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission is editing Delegate org with linked orgs [Then] expect unlink org icon to be visible for all linked orgs", async () => {
    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await waitFor(() => {
      return screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    expect(unlinkOrganizationButtons?.[1]).toBeInTheDocument();
    expect(unlinkOrganizationButtons.length).toEqual(2);
  });

  test("5000979: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission is editing Delegate org with linked orgs [When] unlink org icon is clicked [Then] expect confirmation message is visible", async () => {
    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await waitFor(() => {
      return screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    expect(unlinkOrganizationButtons.length).toEqual(2);

    fireEvent.click(unlinkOrganizationButtons[0] as HTMLButtonElement);

    const confirmationModal = screen.getByTestId(idModel.unlinkOrganizationModal.id);
    expect(confirmationModal).toBeInTheDocument();
  });

  test("5001528: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission is editing Delegate org with linked orgs [When] unlink org icon is clicked [Then] expect title Remove linked organization? is visible in confirmation message", async () => {
    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await waitFor(() => {
      return screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    fireEvent.click(unlinkOrganizationButtons[0] as HTMLButtonElement);

    const confirmationModal = screen.getByTestId(idModel.unlinkOrganizationModal.id);
    expect(within(confirmationModal).getByText("Remove linked organization?")).toBeInTheDocument();
  });

  test(`5001711: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission click unlink icon [Then] expect Are you sure you want to remove ${MockOrganization2.name} as a linked corporate organization to ${MockOrganization12.name}? text to be visible`, async () => {
    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await waitFor(() => {
      return screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    fireEvent.click(unlinkOrganizationButtons[0] as HTMLButtonElement);

    const confirmationModal = screen.getByTestId(idModel.unlinkOrganizationModal.id);
    expect(confirmationModal).toHaveTextContent(
      `Are you sure you want to remove ${MockOrganization2.name} as a linked corporate organization to ${MockOrganization12.name}?`,
    );
  });

  test(`5002330: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission click unlink icon [Then]  expect All ${MockOrganization12.name} users will lose access organization to ${MockOrganization12.name}. text to be visible`, async () => {
    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await waitFor(() => {
      return screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    fireEvent.click(unlinkOrganizationButtons[0] as HTMLButtonElement);

    const confirmationModal = screen.getByTestId(idModel.unlinkOrganizationModal.id);
    expect(confirmationModal).toHaveTextContent(
      `All ${MockOrganization12.name} users will lose access to the ${MockOrganization2.name} organization.`,
    );
  });

  test("5002331: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission click unlink icon [Then] expect REMOVE button to be visible in confirmation message", async () => {
    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await waitFor(() => {
      return screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    fireEvent.click(unlinkOrganizationButtons[0] as HTMLButtonElement);

    const removeButton = screen.getByTestId(idModel.unlinkOrganizationModal.removeOrganization.id);
    expect(removeButton).toBeInTheDocument();
  });

  test("5002334: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission click unlink icon  [Then] expect CANCEL button to be visible in confirmation message", async () => {
    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await waitFor(() => {
      return screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    fireEvent.click(unlinkOrganizationButtons[0] as HTMLButtonElement);

    const cancelButton = screen.getByTestId(idModel.unlinkOrganizationModal.cancelUnlink.id);
    expect(cancelButton).toBeInTheDocument();
  });

  test("5002333: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission click unlink icon  [Then] expect X icon to be visible in the confirmation message", async () => {
    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await waitFor(() => {
      return screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    fireEvent.click(unlinkOrganizationButtons[0] as HTMLButtonElement);

    const closeButton = screen.getByTestId(idModel.unlinkOrganizationModal.closeButton.id);
    expect(closeButton).toBeInTheDocument();
  });

  test("5002332: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission see confirmation message to remove org [When] CANCEL button is clicked [Then] expect confirmation message to not visible", async () => {
    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await waitFor(() => {
      return screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    fireEvent.click(unlinkOrganizationButtons[0] as HTMLButtonElement);

    const confirmationModal = screen.getByTestId(idModel.unlinkOrganizationModal.id);
    expect(confirmationModal).toBeInTheDocument();

    const cancelButton = screen.getByTestId(idModel.unlinkOrganizationModal.cancelUnlink.id);
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
  });

  test("5002335: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission see confirmation message to remove org [When] X icon is clicked  [Then] expect confirmation message to not visible", async () => {
    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await waitFor(() => {
      return screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    fireEvent.click(unlinkOrganizationButtons[0] as HTMLButtonElement);

    const confirmationModal = screen.getByTestId(idModel.unlinkOrganizationModal.id);
    expect(confirmationModal).toBeInTheDocument();

    const closeButton = screen.getByTestId(idModel.unlinkOrganizationModal.closeButton.id);
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    expect(confirmationModal).not.toBeInTheDocument();
  });

  test("5002336: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission see confirmation message to remove org [When] REMOVE button is clicked [Then] expect toast message Linked organization removed successfully to be visible", async () => {
    mockUseUnlinkOrganizations.mockReturnValue([
      jest.fn(),
      {
        loading: false,
        called: true,
        client: null as unknown as ApolloClient<object>,
        reset: jest.fn(),
      },
    ]);
    const success = jest.fn();

    mockUseToastNotificationService.mockReturnValue({
      current: {
        success,
      },
    });

    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await screen.findAllByTestId(idModel.unlinkOrganizationButton.id);

    fireEvent.click(unlinkOrganizationButtons[0] as HTMLButtonElement);

    const confirmationModal = screen.getByTestId(idModel.unlinkOrganizationModal.id);
    expect(confirmationModal).toBeInTheDocument();

    const removeButton = screen.getByTestId(idModel.unlinkOrganizationModal.removeOrganization.id);
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton);

    await waitFor(
      () => {
        expect(success).toBeCalledWith(OrganizationUnlinkMessage.Success);
      },
      { timeout: 5000 },
    );
  });

  test("5002341: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission click REMOVE button in confirmation message [And] remove API fails [Then] expect toast message Unable to remove linked organization. Please try again", async () => {
    const mockErrorMessage = "Mock Failure";
    mockUseUnlinkOrganizations.mockReturnValue([
      jest.fn(),
      {
        error: {
          message: mockErrorMessage,
          graphQLErrors: [],
          clientErrors: [],
          networkError: null,
          extraInfo: "",
          name: "",
        },
        loading: false,
        called: true,
        client: null as unknown as ApolloClient<object>,
        reset: jest.fn(),
      },
    ]);
    const error = jest.fn();

    mockUseToastNotificationService.mockReturnValue({
      current: {
        error,
      },
    });

    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await waitFor(() => {
      return screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    fireEvent.click(unlinkOrganizationButtons[0] as HTMLButtonElement);

    const removeButton = screen.getByTestId(idModel.unlinkOrganizationModal.removeOrganization.id);
    expect(removeButton).toBeInTheDocument();
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(error).toBeCalledWith(OrganizationUnlinkMessage.Failed);
    });
  });

  test("5002342: [Given] user with q4graph:read:agency:linked-organizations permission is editing an Agency org with linked orgs [Then] expect unlink org icon to be disabled", async () => {
    mockUseClaims.mockReturnValue({ permissions: Permission.ReadLinkedOrgs });

    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await waitFor(() => {
      return screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    expect(unlinkOrganizationButtons[0]).toBeDisabled();
    expect(unlinkOrganizationButtons[1]).toBeDisabled();
  });

  test("5002340: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission click REMOVE button in warning message [Then] expect buttons in confirmation modal to be disabled", async () => {
    mockUseUnlinkOrganizations.mockReturnValue([
      jest.fn(),
      {
        loading: true,
        called: true,
        client: null as unknown as ApolloClient<object>,
        reset: jest.fn(),
      },
    ]);

    customRender();

    await validateTable();

    const unlinkOrganizationButtons = await waitFor(() => {
      return screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    fireEvent.click(unlinkOrganizationButtons[0] as HTMLButtonElement);

    const removeButton = screen.getByTestId(idModel.unlinkOrganizationModal.removeOrganization.id);
    expect(removeButton).toBeDisabled();

    const cancelButton = screen.getByTestId(idModel.unlinkOrganizationModal.cancelUnlink.id);
    expect(cancelButton).toBeDisabled();

    const closeButton = screen.getByTestId(idModel.unlinkOrganizationModal.closeButton.id);
    expect(closeButton).toBeDisabled();
  });

  test("4750762: [Given] Corporate org is successfully linked to an Delegate org [And ] an authenticated user with q4graph:read:agency:linked-organizations permission views Delegate org [And] Linked Organizations tab is open [When] org is copied [Then] expect ID to copie", () => {
    return (async () => {
      Object.assign(navigator, {
        clipboard: {
          writeText: () => new Promise((r) => r(true)),
        },
      });
      jest.spyOn(navigator.clipboard, "writeText");

      customRender();

      await validateTable();

      await waitFor(() => {
        screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
      });

      const organizationId = MockOrganization2.id;

      const copyButtonId = `mockOrganizationOrgId-${organizationId}CopyButton`;

      const copyButton = screen.getByTestId(copyButtonId);
      expect(copyButton).toBeInTheDocument();

      fireEvent.click(copyButton);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(organizationId);
    })();
  });

  test("4750746: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission is viewing an Delegate org [And] Linked Organizations tab is open [Then] expect ORGANIZATION NAME, STOCK TICKER, STATUS & ORG ID columns in table", async () => {
    customRender();

    await validateTable();

    expect(await screen.findByText(AdminLinkedTableHeader.OrganizationName)).toBeVisible();
    expect(screen.getByText(AdminLinkedTableHeader.StockTicker)).toBeVisible();
    expect(screen.getByText(AdminLinkedTableHeader.Status)).toBeVisible();
    expect(screen.getByText(AdminLinkedTableHeader.OrgID)).toBeVisible();
  });

  test("5002352:[Given] an authenticated user with q4graph:read:agency:linked-organizations permission enter search term which does not match any linked orgs [Then] expect No data available message to be visible", async () => {
    const queryOrganizations = jest.fn();

    const organizationsQueryWithNoResultsHook = [
      {
        fetching: false,
        error: null,
        data: {
          organizations: {
            items: [],
          },
        },
        operation: null,
        stale: null,
      },
      queryOrganizations,
    ] as unknown as ReturnType<typeof useOrganizationsLazyQuery>;

    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsQueryWithNoResultsHook);
    customRender();

    await validateTable();

    const searchTerm = "non existent data";

    const searchInput = screen.getByTestId(idModel.linkedOrganizationsTable.entityTable.search.input);
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    expect((searchInput as HTMLInputElement).value).toBe(searchTerm);

    const orgCellIdModel = idModel.orgIdCellList.getModelId(MockOrganization12.id);

    expect(() => screen.getAllByTestId(orgCellIdModel?.id)).toThrow("Unable to find an element");
  });

  test("4750756: [Given] Corporate org is successfully linked to Delegate org [And ] authenticated user with q4graph:read:agency:linked-organizations permission views an Delegate org [And] Linked Organizations tab is open  [Then] expect new org name to be visible", async () => {
    const items = [...Array(10).keys()].map(() => {
      return {
        ...MockOrganization1,
        managedBy: MockOrganization12.id,
      };
    });
    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsQueryWithManagedHook(items));
    customRender();

    await validateTable();

    await waitFor(() => {
      screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    const table = screen.getByTestId(idModel.linkedOrganizationsTable.id);
    expect(table).toBeVisible();

    await waitFor(() => {
      const rows = screen.getAllByText("UGI Corporation");
      expect(rows.length).toBe(10);
    });
  });

  test("4750757:[Given] Corporate org is successfully linked to an Delegate org [And ] authenticated user with q4graph:read:agency:linked-organizations permission views Delegate org  [When] Linked Organizations tab is open [Then] expect ticker for org visible t", async () => {
    const items = [...Array(10).keys()].map(() => {
      return {
        ...MockOrganization1,
        managedBy: MockOrganization12.id,
      };
    });
    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsQueryWithManagedHook(items));
    customRender();

    await validateTable();

    await waitFor(() => {
      screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    const table = screen.getByTestId(idModel.linkedOrganizationsTable.id);
    expect(table).toBeVisible();

    await waitFor(() => {
      const rows = screen.getAllByText("ABX | XNYS");
      expect(rows.length).toBe(10);
    });
  });

  test("4750758: [Given] Corporate org is successfully linked to an Delegate org [And ] authenticated user with q4graph:read:agency:linked-organizations permission views Delegate org  [When] Linked Organizations tab is open [Then] expect Statusof linked org to be visible", async () => {
    const items = [...Array(10).keys()].map(() => {
      return {
        ...MockOrganization1,
        managedBy: MockOrganization12.id,
      };
    });
    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsQueryWithManagedHook(items));
    customRender();

    await validateTable();

    await waitFor(() => {
      screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    const table = screen.getByTestId(idModel.linkedOrganizationsTable.id);
    expect(table).toBeVisible();

    await waitFor(() => {
      const rows = screen.getAllByText("Active");
      expect(rows.length).toBe(10);
    });
  });

  test("4750759: [Given] Corporate org is successfully linked to an Delegate org [And ] authenticated user with q4graph:read:agency:linked-organizations permission views Delegate org  [When] Linked Organizations tab is open [Then] expect id of new org to be visible", async () => {
    const items = [...Array(10).keys()].map(() => {
      return {
        ...MockOrganization1,
        managedBy: MockOrganization12.id,
      };
    });
    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsQueryWithManagedHook(items));
    customRender();

    await validateTable();

    await waitFor(() => {
      screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
    });

    const table = screen.getByTestId(idModel.linkedOrganizationsTable.id);
    expect(table).toBeVisible();

    await waitFor(() => {
      const rows = screen.getAllByText(MockOrganization1.id);
      expect(rows.length).toBe(10);
    });
  });

  test("5003119: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission is viewing Delegate org [And] Linked Organizations tab is open on the first page [Then] expect only 10 linked orgs per page to be visible", () => {
    return (async () => {
      const items = [...Array(10).keys()].map(() => {
        return {
          ...MockOrganization1,
          managedBy: MockOrganization12.id,
        };
      });
      mockUseOrganizationsLazyQuery.mockReturnValue(organizationsQueryWithManagedHook(items));
      customRender();

      await validateTable();

      await waitFor(() => {
        screen.getAllByTestId(idModel.unlinkOrganizationButton.id);
      });

      await waitFor(() => {
        const orgCellIdModel = idModel.orgIdCellList.getModelId(MockOrganization1.id);
        const rows = screen.getAllByTestId(orgCellIdModel?.value);
        expect(rows.length).toEqual(10);
      });
    })();
  });
});
