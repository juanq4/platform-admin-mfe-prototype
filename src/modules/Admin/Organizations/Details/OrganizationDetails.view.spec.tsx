/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
import { SelectClassName, ToastContainer } from "@q4/nimbus-ui";
import { Entitlement, OrganizationRegion, OrganizationType, Permission } from "@q4/platform-definitions";
import { mockFlags, resetLDMocks } from "jest-launchdarkly-mock";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { select } from "react-select-event";
import {
  MockOrganization12,
  MockOrganization1,
  MockOrganization2,
  MockOrganization7,
  MockOrganization13,
  MockOrganization14,
  MockOrganization16,
  MockOrganization17,
  MockOrganization19,
  MockAdminOrganization,
  MockOrganization3,
} from "../../../../__mocks__/data/organizations.mock";
import { MockUser } from "../../../../__mocks__/data/users.mock";
import { OrganizationFeatureManagementLanguage } from "../../../../components/Admin/FeatureManagement/FeatureManagement.definition";
import { OrganizationTeamsLanguage } from "../../../../components/Admin/Teams/Teams.definition";
import { AccessRouteMap } from "../../../../configurations/access.configuration";
import { FeatureFlag } from "../../../../configurations/feature.configuration";
import { AdminRoutePath } from "../../../../configurations/navigation.configuration";
import { AdminEditProvider, AdminEditContext } from "../../../../contexts/admin/edit/edit.context";
import type { AdminEditContextProps } from "../../../../contexts/admin/edit/edit.definition";
import { OrganizationEditState } from "../../../../definitions/organization.definition";
import type { Team } from "../../../../definitions/team.definition";
import { useClaims } from "../../../../hooks/useClaims/useClaims.hook";
import {
  OrganizationCreateMessage,
  OrganizationEditMessage,
} from "../../../../hooks/useOrganization/useOrganization.definition";
import {
  useOrganizationQuery,
  useOrganizationsLazyQuery,
  useOrganizationCreate,
  useOrganizationUpdate,
  useSitesByOrganizationsLazyQuery,
} from "../../../../hooks/useOrganization/useOrganization.hook";
import { QueryPaginationDefault } from "../../../../hooks/useQuery/useQuery.definition";
import { useToastNotificationService } from "../../../../hooks/useToastNotificationService/useToastNotificationService.hook";
import {
  useEntitySearchQuery,
  useTeamsQuery,
  useUsersByOrgQuery,
  useUsersQuery,
} from "../../../../schemas/generated/graphql";
import {
  getOrganizationEditRoute,
  getOrganizationViewRoute,
  capitalize,
  getOrganizationEditUserNewRoute,
  getOrganizationEditLinkedOrganizationsRoute,
} from "../../../../utils/organization/organization.utils";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "../../../../utils/testUtils";
import { Admin } from "../../Admin.view";
import {
  OrganizationCurrencyLabel,
  OrganizationDetailsTitle,
  OrganizationDetailsViewIdModel as ViewIdModel,
} from "./OrganizationDetails.definition";

jest.mock("../../../../hooks/useToastNotificationService/useToastNotificationService.hook");
const mockUseToastNotificationService = useToastNotificationService as jest.Mock;
jest.mock("../../../../hooks/useOrganization/useOrganization.hook");
const mockUseOrganizationQuery = useOrganizationQuery as jest.Mock;
const mockUseOrganizationsLazyQuery = useOrganizationsLazyQuery as jest.Mock;
const mockUseOrganizationCreate = useOrganizationCreate as jest.Mock;
const mockUseOrganizationUpdate = useOrganizationUpdate as jest.Mock;
const mockUseSitesByOrganizationsLazyQuery = useSitesByOrganizationsLazyQuery as jest.Mock;
jest.mock("../../../../schemas/generated/graphql");
const mockUseUsersQuery = useUsersQuery as jest.Mock;

jest.mock("../../../../contexts/admin/edit/edit.context");
const mockAdminEditProvider = AdminEditProvider as jest.Mock;
jest.mock("../../../../schemas/generated/graphql");
const mockUseTeamsQuery = useTeamsQuery as jest.Mock;
const mockUseEntitySearchQuery = useEntitySearchQuery as jest.Mock;
mockUseEntitySearchQuery.mockReturnValue({
  refetch: () =>
    Promise.resolve({
      data: {
        entitySearch: {
          items: [],
        },
      },
    }),
});

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

jest.mock("../../../../hooks/useClaims/useClaims.hook");
const mockUseClaims = useClaims as jest.Mock;

jest.mock("../../../../hooks/admin/useTable/useTable.hook");

const queryOrganizations = jest.fn();

const mockUserByOrg = useUsersByOrgQuery as jest.Mock;

function linkedOrgsMock(mock = MockOrganization12, items = [...Array(10).keys()].map(() => mock)) {
  return [
    {
      fetching: false,
      error: null,
      data: { organizations: { items } },
      stale: false,
      operation: null,
    },
    queryOrganizations,
  ] as unknown as ReturnType<typeof useOrganizationsLazyQuery>;
}

describe("Organization Edit View", () => {
  const mockSetEntity = jest.fn();

  const mockOrganization1 = new OrganizationEditState(MockOrganization1);
  const mockOrganization2 = new OrganizationEditState(MockOrganization2);
  const mockOrganization7 = new OrganizationEditState(MockOrganization7);
  const mockOrganization12 = new OrganizationEditState(MockOrganization12);
  const mockOrganization13 = new OrganizationEditState(MockOrganization13);
  const mockOrganization14 = new OrganizationEditState(MockOrganization14);
  const mockOrganization16 = new OrganizationEditState(MockOrganization16);
  const mockOrganization17 = new OrganizationEditState(MockOrganization17);
  const mockOrganization19 = new OrganizationEditState(MockOrganization19);
  const mockAdminOrganization = new OrganizationEditState(MockAdminOrganization);

  const success = jest.fn();
  const error = jest.fn();
  const dismiss = jest.fn();

  beforeEach(() => {
    cleanup();
    mockUseToastNotificationService.mockReturnValue({ current: { success, error, dismiss } as never });
    mockUseOrganizationQuery.mockReset();
    mockUseOrganizationsLazyQuery.mockReset();
    mockUseOrganizationCreate.mockReset();
    mockUseOrganizationUpdate.mockReset();
    mockUseSitesByOrganizationsLazyQuery.mockReset();
    mockUseUsersQuery.mockReset();
    mockAdminEditProvider.mockReset();
    mockUseTeamsQuery.mockReset();

    mockFlags({
      [FeatureFlag.AgencyTeams]: true,
    });

    mockUserByOrg.mockReturnValue({
      data: { usersByOrganization: { records: [], totalPages: 1, totalItems: 0, currentPage: 1 } },
      loading: false,
      refetch: jest.fn(),
      error: undefined,
    });
  });

  afterEach(() => {
    mockUseOrganizationQuery.mockReset();
    mockUseOrganizationsLazyQuery.mockReset();
    mockUseOrganizationCreate.mockReset();
    mockUseOrganizationUpdate.mockReset();
    mockUseSitesByOrganizationsLazyQuery.mockReset();
    mockUseUsersQuery.mockReset();
    mockAdminEditProvider.mockReset();
    mockUseToastNotificationService.mockReset();
    resetLDMocks();
  });

  afterAll(() => {
    mockUseOrganizationQuery.mockRestore();
    mockUseOrganizationsLazyQuery.mockRestore();
    mockUseOrganizationCreate.mockRestore();
    mockUseOrganizationUpdate.mockRestore();
    mockUseSitesByOrganizationsLazyQuery.mockRestore();
    mockUseUsersQuery.mockRestore();
    mockAdminEditProvider.mockRestore();
    mockUseToastNotificationService.mockRestore();
  });

  enum EditRouteIndex {
    Create,
    Edit,
    View,
  }

  const mockPermissions = [
    AccessRouteMap[AdminRoutePath.OrganizationsCreate].permissionCondition?.permissions,
    AccessRouteMap[AdminRoutePath.OrganizationsEdit].permissionCondition?.permissions,
    AccessRouteMap[AdminRoutePath.OrganizationsView].permissionCondition?.permissions,
  ];

  const teamsMock: Team[] = [
    {
      id: "1",
      name: "The Gamblers",
      organizationId: MockOrganization1.id,
      userIds: ["1", "2"],
      managedOrganizationIds: [MockOrganization2.id, MockOrganization3.id],
    },
    {
      id: "2",
      name: "The Ramblers",
      organizationId: MockOrganization1.id,
      userIds: ["3", "4"],
      managedOrganizationIds: [MockOrganization2.id, MockOrganization3.id],
    },
  ];

  const mockHookDefault = {
    index: EditRouteIndex.Create,
    context: mockOrganization1,
    organizationQueryReturn: [
      {
        fetching: false,
        error: null,
        data: { organization: mockOrganization1 },
        stale: null,
      },
      queryOrganizations,
    ] as unknown as ReturnType<typeof useOrganizationQuery>,
    organizationsLazyQueryHook: [
      {
        fetching: false,
        error: null,
        data: { organizations: { items: [mockOrganization12] } },
        stale: null,
        operation: null,
      },
      queryOrganizations,
    ] as unknown as ReturnType<typeof useOrganizationsLazyQuery>,
    organizationPostReturn: [
      {
        fetching: false,
        error: null,
        stale: null,
      },
      queryOrganizations,
    ] as unknown as ReturnType<typeof useOrganizationCreate>,
    organizationPutReturn: [
      {
        fetching: false,
        error: null,
        stale: null,
      },
      queryOrganizations,
    ] as unknown as ReturnType<typeof useOrganizationUpdate>,
    sitesByOrgReturn: [
      {
        fetching: false,
        operation: null,
        data: {
          organizationSites: {
            items: [
              { subdomain: "MockSubdomain", siteName: "MockSitename" },
              { subdomain: "MockSubdomain2", siteName: "MockSitename2" },
            ],
            count: 2,
          },
        },
      },
      queryOrganizations,
    ] as unknown as ReturnType<typeof useSitesByOrganizationsLazyQuery>,
    teamsReturn: {
      fetching: false,
      error: new Error(),
      data: {
        accessGroups: {
          items: teamsMock,
        },
      },
    } as unknown as ReturnType<typeof useTeamsQuery>,
    permissions: mockPermissions[0],
    mockEditRoute: getOrganizationEditRoute(mockOrganization1.id),
    mockViewRoute: getOrganizationViewRoute(mockOrganization1.id),
  };

  const linkedOrgButtonText = "Link Organizations";
  const { linkedOrganizationsTable } = ViewIdModel.featureManagement.organizations;

  function customRender(props?: Partial<typeof mockHookDefault>) {
    const propsWithDefaults = { ...mockHookDefault, ...props };

    const {
      index,
      organizationQueryReturn,
      organizationsLazyQueryHook,
      organizationPostReturn,
      organizationPutReturn,
      sitesByOrgReturn,
      teamsReturn,
      context,
      permissions: permissionsProp,
      mockEditRoute,
      mockViewRoute,
    } = propsWithDefaults;

    const permissions = permissionsProp || mockPermissions[index];

    mockUseClaims.mockReturnValue({ permissions });
    mockUseOrganizationQuery.mockReturnValue(organizationQueryReturn);
    mockUseOrganizationsLazyQuery.mockReturnValue(organizationsLazyQueryHook);
    mockUseOrganizationCreate.mockReturnValue(organizationPostReturn);
    mockUseOrganizationUpdate.mockReturnValue(organizationPutReturn);
    mockUseSitesByOrganizationsLazyQuery.mockReturnValue(sitesByOrgReturn);
    mockUseUsersQuery.mockReturnValue([{ loading: false }, jest.fn()]);
    mockUseTeamsQuery.mockReturnValue(teamsReturn);
    mockAdminEditProvider.mockImplementation((props: AdminEditContextProps) => {
      const { Provider } = AdminEditContext;
      // eslint-disable-next-line testing-library/no-node-access
      return <Provider value={{ entity: context, setEntity: mockSetEntity }}>{props.children}</Provider>;
    });

    return render(
      (() => {
        return (
          <MemoryRouter
            initialEntries={[AdminRoutePath.OrganizationsCreate, mockEditRoute, mockViewRoute]}
            initialIndex={index}
          >
            <Admin />
            <ToastContainer />
          </MemoryRouter>
        );
      })(),
    );
  }

  function clickOnLinkedToggle() {
    const toggle = screen.getByTestId(ViewIdModel.featureManagement.linkedOrganizationsToggle.id);
    expect(toggle).toBeVisible();
    fireEvent.click(toggle);
  }

  function clickOnToggleElement(id: string) {
    const element = screen.getByTestId(id);
    expect(element).toBeVisible();
    fireEvent.click(element);
  }

  async function createOrg(organization = mockOrganization1): Promise<OrganizationEditState> {
    const { name, exchange, ticker } = organization;

    mockUseEntitySearchQuery.mockReturnValue({
      refetch: () => Promise.resolve(getEntitySearchResult(ticker, exchange)),
    });
    expect(mockSetEntity).toBeCalled();
    expect(mockUseOrganizationQuery).toBeCalled();
    expect(mockUseOrganizationQuery).toBeCalledWith({ variables: { id: undefined }, pause: true });

    const nameInput = screen.queryByTestId(ViewIdModel.name.input) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: name } });
    expect(nameInput.value).toBe(name);

    if (ticker && exchange) {
      await selectStockTicker(`${ticker} | ${exchange}`);
    }

    if (organization.type) {
      await select(screen.getByTestId(ViewIdModel.type.id), capitalize(organization.type), {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        container: document.getElementById("root")!,
      });
    }

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    const organizationCreatedThroughUI = new OrganizationEditState(organization);
    organizationCreatedThroughUI.q4SecurityId = "entity-id";
    delete organizationCreatedThroughUI.id;
    delete organizationCreatedThroughUI.studio;
    delete organizationCreatedThroughUI.delegateOrganizationIds;
    organizationCreatedThroughUI.identifiers = [];

    return organizationCreatedThroughUI;
  }

  function updateOrg(organization = mockOrganization1): void {
    expect(mockSetEntity).toBeCalledTimes(1);
    expect(mockUseOrganizationQuery).toBeCalled();
    expect(mockUseOrganizationQuery).toBeCalledWith({ variables: { id: organization.id }, pause: true });

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });
  }

  function validateOrg(organization = mockOrganization1): void {
    const { name, ticker, exchange } = organization;

    const nameInput = screen.queryByTestId(ViewIdModel.name.input) as HTMLInputElement;
    expect(nameInput.value).toBe(name);

    expect(screen.getByText(`${ticker} | ${exchange}`)).toBeVisible();
  }

  function validateAddUserPlaceholder() {
    const toggleButtons = screen.getByTestId(ViewIdModel.featureManagement.sectionToggle.id);
    const entitlementTab = screen.queryByTestId(ViewIdModel.featureManagement.entitlements.id);

    const userToggleButton = screen.getByTestId(ViewIdModel.featureManagement.userToggle.id);
    const entitlementToggleButton = screen.getByTestId(ViewIdModel.featureManagement.entitlementToggle.id);

    expect(toggleButtons).toBeInTheDocument();
    expect(entitlementTab).toBeInTheDocument();

    expect(userToggleButton).toBeInTheDocument();
    expect(entitlementToggleButton).toBeInTheDocument();

    fireEvent.click(userToggleButton);
    expect(screen.queryByText("All users")).toBeVisible();
    expect(entitlementTab).not.toBeInTheDocument();

    const addUserButton = screen.getByText("ADD NEW").parentElement;
    expect(addUserButton).toBeInTheDocument();
    return { addUserButton };
  }

  function addEntitlement(entitlementButtonId: string) {
    const addEntitlement = screen.getByTestId(ViewIdModel.featureManagement.entitlements.menuButton.id);
    fireEvent.click(addEntitlement);
    const menu = screen.getByTestId(ViewIdModel.featureManagement.entitlements.menu.id);
    expect(menu).toBeVisible();

    const engagementAnalyticsButton = screen.getByTestId(entitlementButtonId);
    expect(engagementAnalyticsButton).toBeVisible();
    fireEvent.click(engagementAnalyticsButton);
    expect(menu).not.toBeVisible();
  }

  function prepareToRemoveEntitlement(entitlementTabId: string, entitlementTabRemoveId: string) {
    expectEntitlementTabToBeVisible(entitlementTabId);

    const entitlementTab = screen.getByTestId(entitlementTabId);
    const trashButton = screen.getByTestId(entitlementTabRemoveId);

    expectEntitlementTrashButtonToBeVisible(entitlementTabId, entitlementTabRemoveId);
    fireEvent.click(trashButton);

    expectWarningMessageToRemoveEntitlement();

    return entitlementTab;
  }

  function removeEntitlementAndConfirm(entitlementTabId: string, entitlementTabRemoveId: string) {
    const engagementAnalyticsTab = prepareToRemoveEntitlement(entitlementTabId, entitlementTabRemoveId);

    confirmToRemoveEntitlement();

    return engagementAnalyticsTab;
  }

  function removeEntitlementAndCancel(entitlementTabId: string, entitlementTabRemoveId: string) {
    const engagementAnalyticsTab = prepareToRemoveEntitlement(entitlementTabId, entitlementTabRemoveId);

    cancelRemoveEntitlement();

    return engagementAnalyticsTab;
  }

  function checkForEntitlement(entitlementTabId: string) {
    const entitlementTab = screen.getByTestId(entitlementTabId);
    expect(entitlementTab).toBeVisible();
  }

  function expectEntitlementTabToBeVisible(entitlementTabId: string) {
    const featureManagement = screen.getByTestId(ViewIdModel.featureManagement.id);
    expect(featureManagement).toBeVisible();

    const entitlementTab = screen.queryByTestId(ViewIdModel.featureManagement.entitlements.id);
    expect(entitlementTab).toBeVisible();

    checkForEntitlement(entitlementTabId);
  }

  function expectLinkedOrganizationsTabToBeVisible() {
    const featureManagement = screen.getByTestId(ViewIdModel.featureManagement.id);
    expect(featureManagement).toBeVisible();

    const linkedOrganizationsTab = screen.queryByTestId(ViewIdModel.featureManagement.organizations.id);
    expect(linkedOrganizationsTab).toBeVisible();

    return linkedOrganizationsTab;
  }

  function expectTeamsTabToBeVisible() {
    const featureManagement = screen.getByTestId(ViewIdModel.featureManagement.id);
    expect(featureManagement).toBeVisible();

    const teamsTab = screen.queryByTestId(ViewIdModel.featureManagement.teams.id);
    expect(teamsTab).toBeVisible();

    return teamsTab;
  }

  function expectEntitlementTrashButtonToBeVisible(entitlementTabId: string, entitlementTabRemoveId: string) {
    fireEvent.mouseOver(screen.getByTestId(entitlementTabId));
    expect(screen.getByTestId(entitlementTabRemoveId)).toBeVisible();
  }

  function expectWarningMessageToRemoveEntitlement() {
    const messageModal = screen.getByTestId(ViewIdModel.featureManagement.entitlements.removeMessage.id);
    expect(messageModal).toBeVisible();
  }

  function confirmToRemoveEntitlement() {
    const confirmButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.removeMessageConfirm.id);
    fireEvent.click(confirmButton);
  }

  function cancelRemoveEntitlement() {
    const cancelButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.removeMessageCancel.id);
    fireEvent.click(cancelButton);
  }

  const customRenderEditRoute = (mockOrg = mockOrganization1) => {
    customRender({
      index: EditRouteIndex.Edit,
      organizationQueryReturn: [
        {
          fetching: false,
          error: null,
          data: { organization: mockOrg },
          stale: null,
        },
        jest.fn(),
      ],
      context: null,
    });
  };

  const customRenderEditRouteWithReadLinkedOrg = (
    mockOrg = mockOrganization12,
    organizationsLazyQueryHook?: ReturnType<typeof useOrganizationsLazyQuery>,
  ) => {
    customRender({
      index: EditRouteIndex.Edit,
      organizationQueryReturn: [
        {
          fetching: false,
          error: undefined,
          data: { organization: mockOrg },
          stale: false,
        },
        jest.fn(),
      ],
      context: undefined,
      permissions: [...mockPermissions[1], Permission.ReadLinkedOrgs],
      ...(!!organizationsLazyQueryHook ? { organizationsLazyQueryHook } : {}),
    });
  };

  const customRenderEditRouteWithEditLinkedOrg = (mockOrg = mockOrganization12) => {
    customRender({
      index: EditRouteIndex.Edit,
      organizationQueryReturn: [
        {
          fetching: false,
          error: undefined,
          data: { organization: mockOrg },
          stale: false,
        },
        jest.fn(),
      ],
      context: undefined,
      permissions: [...mockPermissions[1], Permission.ManageLinkedOrgs],
    });
  };

  const customRenderEditRouteForUpdate = (
    mockOrg = mockOrganization1,
    update = jest.fn().mockResolvedValue({ success: true, data: mockOrganization1 }),
  ) => {
    customRender({
      index: EditRouteIndex.Edit,
      organizationQueryReturn: [
        {
          ...mockHookDefault.organizationQueryReturn[0],
          data: { organization: mockOrg },
        },
        jest.fn(),
      ],
      organizationPutReturn: [mockHookDefault.organizationPutReturn[0], update],
      context: null,
    });
  };

  async function selectStockTicker(label: string): Promise<void> {
    const selector = screen.queryByTestId(ViewIdModel.symbol.id);
    expect(selector).toBeVisible();

    const input = screen.getByTestId(`${ViewIdModel.symbol.id}Input`);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "sys" } });
    expect(input).toHaveValue("sys");

    const selectMenu = screen.getByTestId("OrganizationsDetailsViewSymbolSelectMenu");
    expect(selectMenu).toBeInTheDocument();

    await waitFor(() => {
      const loadingText = screen.queryByText("Loading...");
      expect(loadingText).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(label));
  }

  async function selectCurrency(label: string): Promise<void> {
    await select(screen.getByTestId(ViewIdModel.currency.id), label, {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      container: document.getElementById("root")!,
    });
  }

  function selectRegion(regionRadioButtonInputId: string) {
    const regionInput = screen.queryByTestId(regionRadioButtonInputId) as HTMLInputElement;
    expect(regionInput).toBeInTheDocument();
    fireEvent.click(regionInput);
  }

  function getEntitySearchResult(symbol: string, exchange: string) {
    return {
      data: {
        entitySearch: {
          items: [
            {
              entityId: "entity-id",
              entityName: "entity-name",
              symbol,
              exchange,
            },
          ],
        },
      },
    };
  }

  it("7395558: renders with crashing", () => {
    customRender();
  });

  test("7627503: [Given] I am viewing the Create Organization or Edit Organization page [Then] I am able to select a ticker from a provided list via search selector dropdown", async () => {
    mockUseEntitySearchQuery.mockReturnValue({
      refetch: () => Promise.resolve(getEntitySearchResult("SYS", "NAD")),
    });

    customRender();

    const selector = screen.queryByTestId(ViewIdModel.symbol.id);
    expect(selector).toBeVisible();

    const input = screen.getByTestId(`${ViewIdModel.symbol.id}Input`);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "sys" } });
    expect(input).toHaveValue("sys");

    const selectMenu = screen.getByTestId(`${ViewIdModel.symbol.id}Menu`);
    expect(selectMenu).toBeInTheDocument();

    await waitFor(() => {
      const loadingText = screen.queryByText("Loading...");
      expect(loadingText).not.toBeInTheDocument();
    });

    const selectOptions = Array.from(document.querySelectorAll(`.${SelectClassName.Option}`)).map((x) => x.textContent);
    expect(selectOptions).toContain("SYS | NAD");
  });

  test("7627504: [Given] I am viewing the Create Organization page [And] I select a ticker from the provided list via search selector dropdown [And] I have filled out all other required fields [When]I press the 'Create Organization' button [Then] The organization is successfully created", async () => {
    mockUseEntitySearchQuery.mockReturnValue({
      refetch: () => Promise.resolve(getEntitySearchResult("SYS", "NAD")),
    });

    const { id } = mockOrganization1;
    const post = jest.fn().mockResolvedValue({ success: true, data: { id } });

    customRender({
      organizationPostReturn: [mockHookDefault.organizationPostReturn[0], post],
    });

    const { name } = mockOrganization1;
    const nameInput = screen.queryByTestId(ViewIdModel.name.input) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: name } });

    await select(screen.getByTestId(ViewIdModel.type.id), "Corporate", {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      container: document.getElementById("root")!,
    });

    await selectStockTicker("SYS | NAD");

    await selectCurrency(OrganizationCurrencyLabel.USD);
    selectRegion(ViewIdModel.regionNorthAmericaRadioButton.input);

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    expect(post).toBeCalledTimes(1);
    expect(post).toHaveBeenCalledWith(
      expect.objectContaining({
        q4SecurityId: "entity-id",
        ticker: "SYS",
        exchange: "NAD",
      }),
    );
  });

  test("7627505: [Given] I am viewing the Edit Organization page [And] I select a ticker from the provided list via search selector dropdown [And] I have filled out all other required fields [When]I press the 'Save Organization' button [Then] The organization is successfully edited or saved", async () => {
    mockUseEntitySearchQuery.mockReturnValue({
      refetch: () => Promise.resolve(getEntitySearchResult("SYS", "NAD")),
    });
    const update = jest.fn().mockResolvedValue({ success: true, data: mockOrganization16 });
    customRenderEditRouteForUpdate(mockOrganization16, update);

    await selectStockTicker("SYS | NAD");

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(
      expect.objectContaining({
        q4SecurityId: "entity-id",
        ticker: "SYS",
        exchange: "NAD",
      }),
    );
  });

  test("4633531: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission is on /admin/organizations/edit page [And] user selects Agency as organization type [When] user saves org details [Then] org created with Agency type", async () => {
    const { id } = mockOrganization12;
    const post = jest.fn().mockResolvedValue({ success: true, data: { id } });
    customRender({
      organizationPostReturn: [mockHookDefault.organizationPostReturn[0], post],
      permissions: mockPermissions[0],
    });
    await createOrg(mockOrganization12);
    await waitFor(() => {
      const typeInput = screen.getByTestId(ViewIdModel.type.id) as HTMLInputElement;
      expect(within(typeInput).getByText(capitalize(OrganizationType.AGENCY))).toBeInTheDocument();
    });
  });

  test("4633532: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission is on /admin/organizations/edit page [When] user creates new Agency type organization [Then] expect Organization Type (Required) dropdown to in editable state", async () => {
    const { id } = mockOrganization12;
    const post = jest.fn().mockResolvedValue({ success: true, data: { id } });
    customRender({
      organizationPostReturn: [mockHookDefault.organizationPostReturn[0], post],
      permissions: mockPermissions[0],
    });
    await createOrg(mockOrganization12);
    await waitFor(() => {
      const typeInput = screen.getByTestId(ViewIdModel.type.id) as HTMLInputElement;
      expect(typeInput.disabled).toBeFalsy();
    });
  });

  test("1257050: [Given] I am on the Admin Organization Create view [And] I don't have the required permissions [Expect] the page doesn't load", () => {
    customRender({ index: 0, permissions: [] });

    const viewElement = screen.queryByTestId(ViewIdModel.id);
    expect(viewElement).not.toBeInTheDocument();
  });

  test("1257051: [Given] I am on the Admin Organization Edit view [And] I don't have the required permissions [Expect] the page doesn't load", () => {
    customRender({ index: 1, permissions: [] });

    const viewElement = screen.queryByTestId(ViewIdModel.id);
    expect(viewElement).not.toBeInTheDocument();
  });

  test("1229509: [Given] I am on the Admin Organization edit view [When] trying to create a new organization [And] the save succeeds [Expect] to be redirected to the edit page", async () => {
    window.history.replaceState = jest.fn();

    const { id } = mockOrganization1;
    const post = jest.fn().mockResolvedValue({ success: true, data: { id } });

    customRender({
      organizationPostReturn: [mockHookDefault.organizationPostReturn[0], post],
    });

    await selectCurrency(OrganizationCurrencyLabel.USD);
    selectRegion(ViewIdModel.regionNorthAmericaRadioButton.input);

    await waitFor(async () => {
      const organizationCreatedThroughUI = await createOrg();
      expect(post).toBeCalledWith(organizationCreatedThroughUI);
    });

    await waitFor(() => {
      expect(mockSetEntity).toBeCalledTimes(2);
      expect(screen.getByText(OrganizationDetailsTitle.Edit)).toBeInTheDocument();
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", `/admin/organizations/edit/${id}`);
    });
  });

  test("1257054: [Given] I am on the Admin Organization edit view [When] I click on the 'X' [Expect] to be redirected to the organizations view", () => {
    customRender();

    const closeButton = screen.getByTestId(ViewIdModel.modal.exitIcon);
    fireEvent.click(closeButton);

    expect(mockHistoryPush).toBeCalledTimes(1);
    expect(mockHistoryPush).toBeCalledWith(AdminRoutePath.Organizations);
  });

  test("1257044: [Given] I am on the Admin Organization edit view [When] trying to create a new organization [And] no name is provided [Expect] an error message to appear below", async () => {
    const org = { ...mockOrganization1, name: "" };
    const fieldId = ViewIdModel.nameField.error;
    mockUseEntitySearchQuery.mockReturnValue({
      refetch: () => Promise.resolve(getEntitySearchResult(org.ticker, org.exchange)),
    });
    const post = jest.fn().mockResolvedValue({ success: false });
    customRender({
      organizationPostReturn: [mockHookDefault.organizationPostReturn[0], post],
    });
    await createOrg(org);
    expect(post).toBeCalledTimes(0);

    await waitFor(() => {
      const errorMessage = screen.getByTestId(fieldId);
      expect(errorMessage).toBeInTheDocument();
    });
    expect(mockSetEntity).toBeCalledTimes(1);
  });

  test("11415575: [Given] I am on the Admin Organization edit view [When] trying to edit an organization [And] no region is provided [Expect] an error message to appear below", async () => {
    const org = { ...mockOrganization19 };
    const fieldId = ViewIdModel.regionField.error;
    mockUseEntitySearchQuery.mockReturnValue({
      refetch: () => Promise.resolve(getEntitySearchResult(org.ticker, org.exchange)),
    });
    const post = jest.fn().mockResolvedValue({ success: false });
    customRender({
      organizationPostReturn: [mockHookDefault.organizationPostReturn[0], post],
    });

    await createOrg(org);
    expect(post).toBeCalledTimes(0);

    await waitFor(() => {
      const errorMessage = screen.getByTestId(fieldId);
      expect(errorMessage).toBeInTheDocument();
    });
    expect(mockSetEntity).toBeCalledTimes(1);
  });

  test("11415574: [Given] I am on the Admin Organization edit view [When] trying to create a new organization [And] no currency is selected [Expect] an error message to appear below", async () => {
    const org = { ...mockOrganization19, region: OrganizationRegion.NORTH_AMERICA };
    const fieldId = ViewIdModel.currencyField.error;
    mockUseEntitySearchQuery.mockReturnValue({
      refetch: () => Promise.resolve(getEntitySearchResult(org.ticker, org.exchange)),
    });
    const post = jest.fn().mockResolvedValue({ success: false });
    customRender({
      organizationPostReturn: [mockHookDefault.organizationPostReturn[0], post],
    });

    await createOrg(org);
    expect(post).toBeCalledTimes(0);

    await waitFor(() => {
      const errorMessage = screen.getByTestId(fieldId);
      expect(errorMessage).toBeInTheDocument();
    });
    expect(mockSetEntity).toBeCalledTimes(1);
  });

  test.skip("4633529: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission is on /admin/organizations/edit  page [When] user try to save organization details without selecting organization type [Then] expect validation error message", async () => {
    const org = { ...mockOrganization12, type: undefined };
    const fieldId = ViewIdModel.nameField.error;
    mockUseEntitySearchQuery.mockReturnValue({
      refetch: () => Promise.resolve(getEntitySearchResult(org.ticker, org.exchange)),
    });
    const post = jest.fn().mockResolvedValue({ success: false });
    customRender({
      organizationPostReturn: [mockHookDefault.organizationPostReturn[0], post],
    });
    await createOrg(org);
    expect(post).toBeCalledTimes(0);

    await waitFor(() => {
      const errorMessage = screen.getByTestId(fieldId);
      expect(errorMessage).toBeInTheDocument();
    });
    expect(mockSetEntity).toBeCalledTimes(1);
  });

  test("1269199: [Given] I am on the Admin Organization edit view [When] trying to create a new organization [Expect] the organization id field to not be present", () => {
    const post = jest.fn().mockResolvedValue({ success: false });
    customRender({
      organizationPostReturn: [mockHookDefault.organizationPostReturn[0], post],
    });
    const idField = screen.queryByTestId(ViewIdModel.organizationId.id);
    expect(idField).not.toBeInTheDocument();
  });

  test("1229510: [Given] I am on the Admin Organization edit view [When] trying to create a new organization [And] the save fails [Expect] a failure toast message to appear", async () => {
    const post = jest.fn().mockResolvedValue({ success: false });

    customRender({
      organizationPostReturn: [mockHookDefault.organizationPostReturn[0], post],
    });

    await selectCurrency(OrganizationCurrencyLabel.USD);
    selectRegion(ViewIdModel.regionNorthAmericaRadioButton.input);

    await waitFor(async () => {
      const organizationCreatedThroughUI = await createOrg();
      expect(post).toBeCalledWith(organizationCreatedThroughUI);
    });

    await waitFor(() => {
      expect(error).toBeCalledWith(`${OrganizationCreateMessage.Failed}: undefined`);
    });

    expect(mockSetEntity).toBeCalledTimes(1);
  });

  test("3422620: [Given] I am on the Admin Organization edit view [When] trying to create a new organization [And] the save succeeds [Expect] a success toast message to appear", async () => {
    const post = jest.fn().mockResolvedValue({ success: true, data: { id: MockOrganization1.id } });

    customRender({
      organizationPostReturn: [mockHookDefault.organizationPostReturn[0], post],
    });

    await selectCurrency(OrganizationCurrencyLabel.USD);
    selectRegion(ViewIdModel.regionNorthAmericaRadioButton.input);

    await waitFor(async () => {
      const organizationCreatedThroughUI = await createOrg();
      expect(post).toBeCalledWith(organizationCreatedThroughUI);
    });

    await waitFor(() => {
      expect(success).toBeCalledWith(OrganizationCreateMessage.Success);
    });

    expect(mockSetEntity).toBeCalledTimes(2);
  });

  test("1229511: [Given] I am on the Admin Organization edit view [When] the organization has been saved [Expect] all the information to be populated on the organization edit view", () => {
    customRender({ index: EditRouteIndex.Edit });
    expect(mockUseOrganizationQuery).toBeCalled();
    expect(mockUseOrganizationQuery).toBeCalledWith({ variables: { id: mockOrganization1.id }, pause: true });
    validateOrg();
  });

  test("3422899: [Given] I am on the Admin Organization edit view [When] trying to edit an existing organization [And] the save fails [Expect] a failed toast message to appear", async () => {
    const update = jest.fn().mockResolvedValue({ success: false });

    customRender({
      index: EditRouteIndex.Edit,
      organizationPutReturn: [mockHookDefault.organizationPutReturn[0], update],
    });

    expect(mockUseOrganizationQuery).toBeCalled();
    expect(mockUseOrganizationQuery).toBeCalledWith({ variables: { id: mockOrganization1.id }, pause: true });
    validateOrg();

    updateOrg(mockOrganization1);
    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(mockOrganization1);

    await waitFor(() => {
      expect(error).toBeCalledWith(`${OrganizationEditMessage.Failed}: undefined`);
    });

    expect(mockSetEntity).toBeCalledTimes(1);
  });

  test("3422900: [Given] I am on the Admin Organization edit view [When] trying to edit an existing organization [And] the save succeeds [Expect] a success toast message to appear", async () => {
    const update = jest.fn().mockResolvedValue({ success: true, data: { id: MockOrganization1.id } });

    customRender({
      index: EditRouteIndex.Edit,
      organizationPutReturn: [mockHookDefault.organizationPutReturn[0], update],
    });

    expect(mockUseOrganizationQuery).toBeCalled();
    expect(mockUseOrganizationQuery).toBeCalledWith({ variables: { id: mockOrganization1.id }, pause: true });
    validateOrg();

    updateOrg(mockOrganization1);
    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(mockOrganization1);

    await waitFor(() => {
      expect(success).toBeCalledWith(OrganizationEditMessage.Success);
    });

    expect(mockSetEntity).toBeCalledTimes(2);
  });

  test("4216071: [Given] I am an authenticated Q4 Admin user [And] I am on Admin organization Edit view [Then] expect the toggle to activate/deactivate organization to be hidden", () => {
    const mockUsers = Array.from(Array(QueryPaginationDefault.PageSize)).map((_, id) => ({
      ...MockUser,
      roles: [RoleLabel.Q4Admin],
      id: id.toString(),
    }));

    mockUseUsersQuery.mockReturnValue([
      {
        loading: false,
        data: {
          users: {
            items: mockUsers,
          },
        },
      },
      jest.fn(),
    ]);

    customRender({
      index: EditRouteIndex.Edit,
      context: mockOrganization7,
      mockEditRoute: getOrganizationEditRoute(mockOrganization7.id),
    });

    const toggle = screen.getByTestId(`${ViewIdModel.featureManagement.userToggle.id}--status`);
    expect(toggle).toHaveClass("nui-toggle--disabled");
  });

  test("4215540: [Given] I am an authenticated Q4 Support user [And] I am on Admin organization Edit view [Then] expect the toggle to activate/deactivate organization to be hidden", () => {
    const mockUsers = Array.from(Array(QueryPaginationDefault.PageSize)).map((_, id) => ({
      ...MockUser,
      roles: [RoleLabel.Q4Support],
      id: id.toString(),
    }));

    mockUseUsersQuery.mockReturnValue([
      {
        loading: false,
        data: {
          users: {
            items: mockUsers,
          },
        },
      },
      jest.fn(),
    ]);

    customRender({
      index: EditRouteIndex.Edit,
      context: mockOrganization7,
      mockEditRoute: getOrganizationEditRoute(mockOrganization7.id),
    });

    const toggle = screen.getByTestId(`${ViewIdModel.featureManagement.userToggle.id}--status`);
    expect(toggle).toHaveClass("nui-toggle--disabled");
  });

  test("1229512: [Given] The user goes view an existing organization on the Admin Organization edit view [Expect] all the information to be populated on the edit view", () => {
    customRender({
      index: EditRouteIndex.Edit,
      context: null,
    });
    expect(mockUseOrganizationQuery).toBeCalled();
    expect(mockUseOrganizationQuery).toBeCalledWith({ variables: { id: mockOrganization1.id }, pause: false });
    validateOrg();
  });

  test("1269200: [Given] The user goes view an existing organization on the Admin Organization edit view [Expect] the organization id field to be visible", () => {
    customRender({
      index: EditRouteIndex.Edit,
      context: null,
    });
    expect(mockUseOrganizationQuery).toBeCalled();
    expect(mockUseOrganizationQuery).toBeCalledWith({ variables: { id: mockOrganization1.id }, pause: false });

    const idField = screen.queryByTestId(ViewIdModel.organizationId.id);
    expect(idField).toBeInTheDocument();
  });

  test("1229513: [Given] The user has created an organization [And] goes to the view a different organization on the Admin Organization edit view [Expect] all the correct information to be populated on the edit view", () => {
    customRender({
      index: EditRouteIndex.Edit,
      context: mockOrganization2,
    });
    expect(mockUseOrganizationQuery).toBeCalled();
    expect(mockUseOrganizationQuery).toBeCalledWith({ variables: { id: mockOrganization1.id }, pause: false });
    validateOrg();
  });

  test("1269274: [Given] I am on the Admin Organization edit view [And] I click the 'Add User' button [Expect] to be redirected to admin users new view", () => {
    customRender({
      index: EditRouteIndex.Edit,
      context: null,
    });
    mockUseUsersQuery.mockReturnValue([{ loading: false }, jest.fn()]);
    const { addUserButton } = validateAddUserPlaceholder();
    fireEvent.click(addUserButton);

    expect(mockHistoryPush).toBeCalledTimes(1);
    expect(mockHistoryPush).toBeCalledWith(
      expect.objectContaining({
        pathname: getOrganizationEditUserNewRoute(mockOrganization1.id),
        state: expect.objectContaining({
          background: expect.objectContaining({
            pathname: `/admin/organizations/edit/${mockOrganization1.id}`,
          }),
        }),
      }),
    );
  });

  test("1269275: [Given] The user goes view an existing organization on the Admin Organization edit view [And] view the users tab [Expect] the Add User Button and Add User Image to be visible if no users", () => {
    customRender({
      index: EditRouteIndex.Edit,
      context: null,
    });
    mockUseUsersQuery.mockReturnValue([{ loading: false }, jest.fn()]);
    validateAddUserPlaceholder();
  });

  test("1269276: [Given] I am on the Admin Organization edit view [When] trying to create a new organization [Expect] the Add User Button and Add User Image to not be present", () => {
    const post = jest.fn().mockResolvedValue({ success: false });
    customRender({
      organizationPostReturn: [mockHookDefault.organizationPostReturn[0], post],
    });
    const addUserButton = screen.queryByTestId(ViewIdModel.featureManagement.addUser.id);
    expect(addUserButton).not.toBeInTheDocument();

    const AddUserImageId = screen.queryByTestId(ViewIdModel.featureManagement.users.entityTable.placeholder.id);
    expect(AddUserImageId).not.toBeInTheDocument();
  });

  test("1728221: [Given] The user views an existing organization on the Admin Organization edit view [And] tries to add the Studio entitlement but the entitlement already exists [Expect] error toast to appear [And] only one Studio tab to be visible", async () => {
    customRender({ index: EditRouteIndex.Edit });

    const addEntitlement = screen.getByTestId(ViewIdModel.featureManagement.entitlements.menuButton.id);
    fireEvent.click(addEntitlement);
    let menu = screen.getByTestId(ViewIdModel.featureManagement.entitlements.menu.id);
    expect(menu).toBeInTheDocument();

    let studioAddButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.menuAddStudio.id);
    fireEvent.click(studioAddButton);
    expect(menu).not.toBeInTheDocument();

    const studioTab = screen.getByTestId(ViewIdModel.featureManagement.entitlements.studioTab);
    expect(studioTab).toBeInTheDocument();

    fireEvent.click(addEntitlement);
    menu = screen.getByTestId(menu.id);
    expect(menu).toBeInTheDocument();
    studioAddButton = screen.getByTestId(studioAddButton.id);
    expect(studioAddButton).toBeInTheDocument();
    fireEvent.click(studioAddButton);

    await waitFor(() => {
      expect(error).toBeCalledWith(OrganizationEditMessage.EntitlementAlreadyAdded);
    });

    expect(screen.getByTestId(ViewIdModel.featureManagement.entitlements.studioTab)).toBeInTheDocument();
  });

  test("1728222: [Given] The user views an existing organization on the Admin Organization edit view [Expect] Entitlement/User toggle buttons to be visible [And] switch between tabs when toggled", () => {
    customRender({ index: EditRouteIndex.Edit });

    mockUseUsersQuery.mockReturnValue([{ loading: false }, jest.fn()]);

    const toggleButtons = screen.getByTestId(ViewIdModel.featureManagement.sectionToggle.id);
    let entitlementTab = screen.queryByTestId(ViewIdModel.featureManagement.entitlements.id);

    const userToggleButton = screen.getByTestId(ViewIdModel.featureManagement.userToggle.id);
    const entitlementToggleButton = screen.getByTestId(ViewIdModel.featureManagement.entitlementToggle.id);

    expect(toggleButtons).toBeInTheDocument();
    expect(entitlementTab).toBeInTheDocument();

    expect(userToggleButton).toBeInTheDocument();
    expect(entitlementToggleButton).toBeInTheDocument();

    fireEvent.click(userToggleButton);
    expect(screen.queryByText("All users")).toBeVisible();
    expect(entitlementTab).not.toBeInTheDocument();

    fireEvent.click(entitlementToggleButton);
    // Refetching component as swapable unmounts
    entitlementTab = screen.getByTestId(entitlementTab.id);
    expect(entitlementTab).toBeInTheDocument();
  });

  test("1737329: [Given] The user views an existing organization on the Admin Organization edit view and adds the Studio entitlement [Expect] studio entitlement to be added [And] Studio tab to appear", () => {
    customRender({ index: EditRouteIndex.Edit });

    const featureManagement = screen.getByTestId(ViewIdModel.featureManagement.id);
    expect(featureManagement).toBeInTheDocument();
    const entitlementTab = screen.queryByTestId(ViewIdModel.featureManagement.entitlements.id);
    expect(entitlementTab).toBeInTheDocument();
    const menuButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.menuButton.id);
    fireEvent.click(menuButton);
    const menu = screen.getByTestId(ViewIdModel.featureManagement.entitlements.menu.id);
    expect(menu).toBeInTheDocument();
    const studioAddButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.menuAddStudio.id);
    fireEvent.click(studioAddButton);
    expect(menu).not.toBeInTheDocument();

    const studioTab = screen.getByTestId(ViewIdModel.featureManagement.entitlements.studioTab);
    expect(studioTab).toBeInTheDocument();
  });

  test("1737330: [Given] The user views an existing organization on the Admin Organization edit view [And] clicks the trash can on an existing Studio entitlement [Expect] Studio entitlement tab to be removed", () => {
    const studioEntitlement = Entitlement.Studio;
    const mockOrg = { ...mockOrganization1, entitlements: [studioEntitlement] };
    customRender({
      index: EditRouteIndex.Edit,
      organizationQueryReturn: [
        {
          fetching: false,
          error: null,
          data: { organization: mockOrg },
          stale: null,
        },
        jest.fn(),
      ],
      context: null,
    });

    const featureManagement = screen.getByTestId(ViewIdModel.featureManagement.id);
    expect(featureManagement).toBeInTheDocument();

    const entitlementTab = screen.queryByTestId(ViewIdModel.featureManagement.entitlements.id);
    expect(entitlementTab).toBeInTheDocument();

    const studioTab = screen.getByTestId(ViewIdModel.featureManagement.entitlements.studioTab);
    expect(studioTab).toBeInTheDocument();
    const trashButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.studioTabRemove.id);
    fireEvent.click(trashButton);
    const messageModal = screen.getByTestId(ViewIdModel.featureManagement.entitlements.removeMessage.id);
    expect(messageModal).toBeInTheDocument();
    const confirmButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.removeMessageConfirm.id);
    fireEvent.click(confirmButton);

    expect(studioTab).not.toBeInTheDocument();
  });

  //TODO: there is currently a bug in ecs which is returning all users. skipping test until fixed https://q4websystems.atlassian.net/browse/PLATFORM-3415
  test.skip("2632716: [Given] The user views an existing organization on the Admin Organization edit view [And] clicks on the user tab [And] users exists [Expect] user table to show", () => {
    customRender({ index: EditRouteIndex.Edit });

    const mockUsers = Array.from(Array(QueryPaginationDefault.PageSize)).map((val, id) => ({
      ...MockUser,
      id: id.toString(),
    }));

    mockUseUsersQuery.mockReturnValue([
      {
        loading: false,
        data: {
          users: {
            items: mockUsers,
          },
        },
      },
      jest.fn(),
    ]);
    const toggleButtons = screen.getByTestId(ViewIdModel.featureManagement.sectionToggle.id);
    const entitlementTab = screen.queryByTestId(ViewIdModel.featureManagement.entitlements.id);

    const userToggleButton = screen.getByTestId(ViewIdModel.featureManagement.userToggle.id);
    const entitlementToggleButton = screen.getByTestId(ViewIdModel.featureManagement.entitlementToggle.id);

    expect(toggleButtons).toBeInTheDocument();
    expect(entitlementTab).toBeInTheDocument();

    expect(userToggleButton).toBeInTheDocument();
    expect(entitlementToggleButton).toBeInTheDocument();

    fireEvent.click(userToggleButton);
    const userTab = screen.getByTestId(ViewIdModel.featureManagement.users.id);
    expect(userTab).toBeInTheDocument();
    expect(entitlementTab).not.toBeInTheDocument();

    const userTable = screen.getByTestId(ViewIdModel.featureManagement.users.entityTable.id);
    expect(userTable).toBeInTheDocument();

    const pagination = screen.getByTestId(ViewIdModel.featureManagement.users.entityTable.pagination.id);
    expect(pagination).toBeInTheDocument();

    const paginationPrevious = screen.getByTestId(ViewIdModel.featureManagement.users.entityTable.pagination.previous.id);
    expect(paginationPrevious).toBeDisabled();

    const paginationNext = screen.getByTestId(ViewIdModel.featureManagement.users.entityTable.pagination.next.id);
    expect(paginationNext).toBeEnabled();
  });

  test("3610415: [Given] I am on the Organization Edit view [And] the Organization has no primary site set [And] has a list of sites [When] I add a new Studio entitlement [Expect] the first site in the site list to be added as the Organization's primary site", () => {
    const put = jest.fn().mockResolvedValue({ success: true, data: mockOrganization1 });
    customRender({
      index: EditRouteIndex.Edit,
      organizationPutReturn: [mockHookDefault.organizationPutReturn[0], put],
      context: null,
    });

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    expect(put).toBeCalledTimes(1);
    expect(put).toBeCalledWith(mockOrganization1);

    const featureManagement = screen.getByTestId(ViewIdModel.featureManagement.id);
    expect(featureManagement).toBeInTheDocument();
    const entitlementTab = screen.queryByTestId(ViewIdModel.featureManagement.entitlements.id);
    expect(entitlementTab).toBeInTheDocument();
    const menuButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.menuButton.id);
    fireEvent.click(menuButton);
    const menu = screen.getByTestId(ViewIdModel.featureManagement.entitlements.menu.id);
    expect(menu).toBeInTheDocument();
    const studioAddButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.menuAddStudio.id);
    fireEvent.click(studioAddButton);
    expect(menu).not.toBeInTheDocument();

    const studioTab = screen.getByTestId(ViewIdModel.featureManagement.entitlements.studioTab);
    expect(studioTab).toBeInTheDocument();
    const studioSitesTable = screen.getByTestId(ViewIdModel.featureManagement.entitlements.sitesTable.id);
    expect(studioSitesTable).toBeInTheDocument();

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    const firstSubdomain = mockHookDefault.sitesByOrgReturn[0].data.organizationSites.items[0].subdomain;

    expect(put).toBeCalledTimes(2);
    expect(put).toBeCalledWith({
      ...mockOrganization1,
      entitlements: [Entitlement.Studio],
      studio: { subdomain: firstSubdomain },
    });
  });

  test("3610416: [Given] I am on the Organization Edit view [And] the Organization has a primary site set [When] I remove the Studio entitlement [Expect] the Organization's primary site to be null", () => {
    const mockOrg = { ...mockOrganization1, entitlements: [Entitlement.Studio], studio: { subdomain: "mockSubdomain" } };
    const put = jest.fn().mockResolvedValue({ success: true, data: mockOrg });
    customRender({
      index: EditRouteIndex.Edit,
      organizationQueryReturn: [
        {
          ...mockHookDefault.organizationQueryReturn[0],
          data: { organization: mockOrg },
        },
        jest.fn(),
      ],
      organizationPutReturn: [mockHookDefault.organizationPutReturn[0], put],
      context: null,
    });

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    expect(put).toBeCalledTimes(1);
    expect(put).toBeCalledWith(mockOrg);

    const studioTab = screen.getByTestId(ViewIdModel.featureManagement.entitlements.studioTab);
    expect(studioTab).toBeInTheDocument();
    const trashButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.studioTabRemove.id);
    fireEvent.click(trashButton);
    const messageModal = screen.getByTestId(ViewIdModel.featureManagement.entitlements.removeMessage.id);
    expect(messageModal).toBeInTheDocument();
    const confirmButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.removeMessageConfirm.id);
    fireEvent.click(confirmButton);

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    expect(put).toBeCalledTimes(2);
    expect(put).toBeCalledWith({
      ...mockOrg,
      entitlements: [],
      studio: {
        subdomain: null,
      },
    });
  });

  test("3485992: [Given] the user is on the Organization Edit view [And] the user has the q4graph:manage:organizations permission [And] the user clicks on the Add Entitlements button [Then] they can see the option to add the Engagement Analytics entitlement", () => {
    customRender({ index: EditRouteIndex.Edit });

    const addEntitlement = screen.getByTestId(ViewIdModel.featureManagement.entitlements.menuButton.id);
    fireEvent.click(addEntitlement);
    const menu = screen.getByTestId(ViewIdModel.featureManagement.entitlements.menu.id);
    expect(menu).toBeVisible();

    const engagementAnalyticsButton = screen.getByTestId(
      ViewIdModel.featureManagement.entitlements.menuAddEngagementAnalytics.id,
    );
    expect(engagementAnalyticsButton).toBeVisible();
  });

  test("3485993: [Given] the user has clicked the option to add the Engagement Analytics entitlement [Then] the user can see the Engagement Analytics entitlement enabled in the Entitlement Toolbar", () => {
    customRender({ index: EditRouteIndex.Edit });
    addEntitlement(ViewIdModel.featureManagement.entitlements.menuAddEngagementAnalytics.id);
    checkForEntitlement(ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab);
  });

  test("3485994: [Given] the user has added the Engagement Analytics entitlement [When] the user clicks the Save button on the Organizations Edit view [Then] the Engagement Analytics entitlement is added to the Organization", () => {
    const engagementAnalyticsEntitlement = Entitlement.EngagementAnalytics;
    const mockOrg = { ...mockOrganization1, entitlements: [engagementAnalyticsEntitlement] };
    const update = jest.fn().mockResolvedValue({ success: true, data: mockOrganization1 });
    customRenderEditRouteForUpdate(mockOrg, update);

    addEntitlement(ViewIdModel.featureManagement.entitlements.menuAddEngagementAnalytics.id);
    checkForEntitlement(ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab);

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(mockOrg);

    checkForEntitlement(ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab);
  });

  test("3485995: [Given] the user has clicked the option to add the Engagement Analytics entitlement [And] the Engagement Analytics entitlement is already enabled for the organization [Then] the user can see a failure toast message that the entitlement is already enabled", async () => {
    customRender({ index: EditRouteIndex.Edit });

    addEntitlement(ViewIdModel.featureManagement.entitlements.menuAddEngagementAnalytics.id);
    checkForEntitlement(ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab);
    addEntitlement(ViewIdModel.featureManagement.entitlements.menuAddEngagementAnalytics.id);

    await waitFor(() => {
      expect(error).toBeCalledWith(OrganizationEditMessage.EntitlementAlreadyAdded);
    });

    await waitFor(() => {
      expect(screen.getByTestId(ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab)).toBeVisible();
    });
  });

  test("3485996: [Given] the user is on the Organizations Edit view [And] the user has the q4graph:manage:organizations permission [And] the organization has the Engagement Analytics entitlement enabled [When] the user hovers on the Engagement Analytics Entitlement Toolbar tab [Then] the user can see an option to remove the entitlement", () => {
    const engagementAnalytics = Entitlement.EngagementAnalytics;
    const mockOrg = { ...mockOrganization1, entitlements: [engagementAnalytics] };

    customRenderEditRoute(mockOrg);
    expectEntitlementTabToBeVisible(ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab);
    expectEntitlementTrashButtonToBeVisible(
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab,
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTabRemove.id,
    );
  });

  test("3485997: [Given] the user can see an option to remove the Engagement Analytics entitlement [When] the user clicks the option [Then] the user can see a warning Message to remove the entitlement", () => {
    const engagementAnalytics = Entitlement.EngagementAnalytics;
    const mockOrg = { ...mockOrganization1, entitlements: [engagementAnalytics] };

    customRenderEditRoute(mockOrg);
    expectEntitlementTabToBeVisible(ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab);
    const trashButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.engagementAnalyticsTabRemove.id);
    expectEntitlementTrashButtonToBeVisible(
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab,
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTabRemove.id,
    );

    fireEvent.click(trashButton);

    expectWarningMessageToRemoveEntitlement();
  });

  test(`3485998: [Given] the user can see a warning Message to remove the entitlement ${Entitlement.EngagementAnalytics} [When] the user clicks the option to confirm removal [Then] the user can no longer see the Engagement Analytics entitlement enabled in the Entitlement Toolbar`, () => {
    const mockOrg = { ...mockOrganization1, entitlements: [Entitlement.EngagementAnalytics] };

    customRenderEditRoute(mockOrg);

    const engagementAnalyticsTab = removeEntitlementAndConfirm(
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab,
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTabRemove.id,
    );

    expect(engagementAnalyticsTab).not.toBeVisible();
  });

  test(`3485998: [Given] the user can see a warning Message to remove the entitlement ${Entitlement.EngagementAnalyticsBase} [When] the user clicks the option to confirm removal [Then] the user can no longer see the Engagement Analytics entitlement enabled in the Entitlement Toolbar`, () => {
    const mockOrg = { ...mockOrganization1, entitlements: [Entitlement.EngagementAnalyticsBase] };

    customRenderEditRoute(mockOrg);

    const engagementAnalyticsTab = removeEntitlementAndConfirm(
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab,
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTabRemove.id,
    );

    expect(engagementAnalyticsTab).not.toBeVisible();
  });

  test(`3485998: [Given] the user can see a warning Message to remove the entitlement ${Entitlement.EngagementAnalyticsStarter} [When] the user clicks the option to confirm removal [Then] the user can no longer see the Engagement Analytics entitlement enabled in the Entitlement Toolbar`, () => {
    const mockOrg = { ...mockOrganization1, entitlements: [Entitlement.EngagementAnalyticsStarter] };

    customRenderEditRoute(mockOrg);

    const engagementAnalyticsTab = removeEntitlementAndConfirm(
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab,
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTabRemove.id,
    );

    expect(engagementAnalyticsTab).not.toBeVisible();
  });

  test(`3485999: [Given] the user can see a warning Message to remove the entitlement ${Entitlement.EngagementAnalytics} [When] the user clicks the option to cancel removal [Then] the user can still see the Engagement Analytics entitlement enabled in the Entitlement Toolbar`, () => {
    const mockOrg = { ...mockOrganization1, entitlements: [Entitlement.EngagementAnalytics] };

    customRenderEditRoute(mockOrg);

    const engagementAnalyticsTab = removeEntitlementAndCancel(
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab,
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTabRemove.id,
    );

    expect(engagementAnalyticsTab).toBeVisible();
  });

  test(`3485999: [Given] the user can see a warning Message to remove the entitlement ${Entitlement.EngagementAnalyticsBase} [When] the user clicks the option to cancel removal [Then] the user can still see the Engagement Analytics entitlement enabled in the Entitlement Toolbar`, () => {
    const mockOrg = { ...mockOrganization1, entitlements: [Entitlement.EngagementAnalyticsBase] };

    customRenderEditRoute(mockOrg);

    const engagementAnalyticsTab = removeEntitlementAndCancel(
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab,
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTabRemove.id,
    );

    expect(engagementAnalyticsTab).toBeVisible();
  });

  test(`3485999: [Given] the user can see a warning Message to remove the entitlement ${Entitlement.EngagementAnalyticsStarter} [When] the user clicks the option to cancel removal [Then] the user can still see the Engagement Analytics entitlement enabled in the Entitlement Toolbar`, () => {
    const mockOrg = { ...mockOrganization1, entitlements: [Entitlement.EngagementAnalyticsStarter] };

    customRenderEditRoute(mockOrg);

    const engagementAnalyticsTab = removeEntitlementAndCancel(
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab,
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTabRemove.id,
    );

    expect(engagementAnalyticsTab).toBeVisible();
  });

  test(`3486001: [Given] the user is on the Organization Edit view [And] the organization has both Studio and Engagement Analytics entitlements enabled ${Entitlement.EngagementAnalytics} [When] the Engagement Analytics entitlement is removed [Then] the Studio entitlement should remain`, async () => {
    const studioEntitlement = Entitlement.Studio;
    const mockOrg = { ...mockOrganization1, entitlements: [studioEntitlement, Entitlement.EngagementAnalytics] };

    customRenderEditRoute(mockOrg);

    removeEntitlementAndConfirm(
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab,
      ViewIdModel.featureManagement.entitlements.engagementAnalyticsTabRemove.id,
    );

    await waitFor(() => {
      expect(screen.getByTestId(ViewIdModel.featureManagement.entitlements.studioTab)).toBeVisible();
      expect(
        screen.queryByTestId(ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab),
      ).not.toBeInTheDocument();
    });
  });

  test("3486000: [Given] the user has removed the Engagement Analytics entitlement [When] the user clicks the Save button on the Organizations Edit view [Then] the Engagement Analytics entitlement is removed from the organization", () => {
    const update = jest.fn().mockResolvedValue({ success: true, data: mockOrganization1 });
    customRenderEditRouteForUpdate(mockOrganization1, update);
    addEntitlement(ViewIdModel.featureManagement.entitlements.menuAddEngagementAnalytics.id);
    const engagementAnalyticsTab = screen.getByTestId(ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab);
    expect(engagementAnalyticsTab).toBeVisible();

    const trashButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.engagementAnalyticsTabRemove.id);
    fireEvent.click(trashButton);

    expectWarningMessageToRemoveEntitlement();
    confirmToRemoveEntitlement();

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(mockOrganization1);
    expect(engagementAnalyticsTab).not.toBeVisible();
  });

  test("3486002: [Given] the user is on the Organization Edit view [And] the organization has both Studio and Engagement Analytics entitlements enabled [When] the Studio entitlement is removed [Then] the Engagement Analytics entitlement should remain", () => {
    const engagementAnalytics = Entitlement.EngagementAnalytics;
    const studioEntitlement = Entitlement.Studio;
    const mockOrg = { ...mockOrganization1, entitlements: [engagementAnalytics, studioEntitlement] };

    customRenderEditRoute(mockOrg);

    expectEntitlementTabToBeVisible(ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab);
    const studioTab = screen.getByTestId(ViewIdModel.featureManagement.entitlements.studioTab);
    expect(studioTab).toBeVisible();

    const trashButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.studioTabRemove.id);
    fireEvent.mouseOver(screen.getByTestId(ViewIdModel.featureManagement.entitlements.studioTab));
    expect(trashButton).toBeVisible();
    fireEvent.click(trashButton);

    expectWarningMessageToRemoveEntitlement();
    confirmToRemoveEntitlement();

    expect(studioTab).not.toBeVisible();

    const engagementAnalyticsTab = screen.getByTestId(ViewIdModel.featureManagement.entitlements.engagementAnalyticsTab);
    expect(engagementAnalyticsTab).toBeVisible();
  });

  test("4633526: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission is on /admin/organizations/edit page [Then] expect dropdown field with Organization Type (Required) label name visible", () => {
    customRender({
      permissions: mockPermissions[0],
    });
    const field = screen.getByTestId(ViewIdModel.typeField.id);
    expect(within(field).getByText("Organization Type")).toBeInTheDocument();
    expect(within(field).getByText("Required")).toBeInTheDocument();
  });

  test("4633527: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission is on /admin/organizations/edit page [Then] expect Organization Type (Required) dropdown field to have no default populated value", () => {
    customRender({
      permissions: mockPermissions[0],
    });
    const typeInput = screen.getByTestId(ViewIdModel.type.id) as HTMLInputElement;
    expect(typeInput.value).toBeFalsy();
  });

  test("4633528: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission is on /admin/organizations/edit page [When] Organization Type (Required) dropdown is expanded [Then] expect dropdown to contain values with name Agency and Corp", () => {
    customRender({
      permissions: mockPermissions[0],
    });
    const typeInput = screen.getByTestId(ViewIdModel.type.id);
    fireEvent.click(typeInput);
    fireEvent.keyDown(typeInput, { key: "Down" });
    const options: HTMLOptionElement[] = Array.from(
      document.querySelectorAll(`.${SelectClassName.Portal} .${SelectClassName.Option}`),
    ) as HTMLOptionElement[];
    const targetOptionAgency = options.find((option) => option.textContent === capitalize(OrganizationType.AGENCY));
    expect(targetOptionAgency).toBeInTheDocument();
    const targetOptionCorp = options.find((option) => option.textContent === capitalize(OrganizationType.CORP));
    expect(targetOptionCorp).toBeInTheDocument();
    const targetOptionAdmin = options.find((option) => option.textContent === capitalize(OrganizationType.ADMIN));
    expect(targetOptionAdmin).toBe(undefined);
  });

  test("4633533: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission is on /admin/organizations/edit page [When] user creates new Agency type organization [Then] expect Users to be the default selected tab", async () => {
    customRenderEditRouteWithEditLinkedOrg();

    await waitFor(() => {
      const feature = screen.getByTestId(ViewIdModel.featureManagement.id) as HTMLElement;
      expect(feature).toBeVisible();
    });

    expect(screen.queryByText("All users")).toBeVisible();
  });

  test("4750740: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission is viewing Agency type org info [Then] expect Linked Organizations tab to be visible", () => {
    customRenderEditRouteWithReadLinkedOrg();
    expect(screen.getByTestId(ViewIdModel.featureManagement.linkedOrganizationsToggle.id)).toBeVisible();
  });

  test("4750741: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission is viewing Agency type org info [When] user clicks Linked Organizations tab [Then] expect table title name to be Linked Organizations", async () => {
    customRenderEditRouteWithReadLinkedOrg();

    clickOnLinkedToggle();

    await waitFor(() => {
      const tab = expectLinkedOrganizationsTabToBeVisible() as HTMLElement;
      expect(within(tab).getByText("Linked Organizations")).toBeVisible();
    });
  });

  test("4750742: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission is viewing Agency type org info [When] user clicks Linked Organizations tab [Then] expect + LINK ORGANIZATIONS button to be visible", async () => {
    customRenderEditRouteWithEditLinkedOrg();
    clickOnLinkedToggle();

    await waitFor(() => {
      expectLinkedOrganizationsTabToBeVisible();
    });

    const table = screen.getByTestId(linkedOrganizationsTable.id);
    expect(table).toBeVisible();
    expect(within(table).getByText(linkedOrgButtonText)).toBeVisible();
  });

  test("4750743: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission is viewing Agency type org info [When] user clicks + LINK ORGANIZATIONS button [Then] expect URL to be /admin/organizations/edit/:id/linked-organizations", async () => {
    customRenderEditRouteWithEditLinkedOrg();
    clickOnLinkedToggle();

    await waitFor(() => {
      expectLinkedOrganizationsTabToBeVisible();
    });

    const table = screen.getByTestId(linkedOrganizationsTable.id);
    const button = within(table).getByText(linkedOrgButtonText) as HTMLButtonElement;
    fireEvent.click(button);

    expect(mockHistoryPush).toHaveBeenCalledWith(getOrganizationEditLinkedOrganizationsRoute(mockOrganization12.id));
  });

  test("4795941: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission is viewing Agency type org info [When] user clicks Linked Organizations tab [Then] expect + LINK ORGANIZATIONS button to be not visible", async () => {
    customRenderEditRouteWithReadLinkedOrg();
    clickOnLinkedToggle();

    await waitFor(() => {
      expectLinkedOrganizationsTabToBeVisible();
    });

    const table = screen.getByTestId(linkedOrganizationsTable.id);
    expect(within(table).queryByText(linkedOrgButtonText)).not.toBeInTheDocument();
  });

  test("4833296: [Given] I am a user of the organization edit view [When] existing organization being edited [Then] I can see an Organization Type field [And] the field is read only", () => {
    customRenderEditRouteForUpdate();
    expect(screen.getByTestId(ViewIdModel.type.id)).toBeVisible();
    expect(screen.getByTestId(ViewIdModel.type.input)).toBeDisabled();
  });

  test('4833773: [Given] I am a user of the organization edit view [When] existing organization being edited [And] the organization is of type "agency" [Then] I can see the Organization Type as "Agency"', () => {
    customRenderEditRouteForUpdate(mockOrganization12);
    const select = screen.getByTestId(ViewIdModel.type.id);
    expect(mockOrganization12.type).toBe(OrganizationType.AGENCY);
    expect(within(select).getByText(capitalize(OrganizationType.AGENCY))).toBeInTheDocument();
  });

  test('8283856: [Given] I am a user of the organization edit view [When] existing organization being edited [And] the organization is of type "admin" [Then] I can see the Organization Type as "Admin"', () => {
    customRenderEditRouteForUpdate(mockAdminOrganization);
    const select = screen.getByTestId(ViewIdModel.type.id);
    expect(mockAdminOrganization.type).toBe(OrganizationType.ADMIN);
    expect(within(select).getByText(capitalize(OrganizationType.ADMIN))).toBeInTheDocument();
  });

  test('4833774: [Given] I am a user of the organization edit view [When] existing organization being edited [And] the organization is of type "corporate" [Then] I can see the Organization Type as "Corporate"', () => {
    customRenderEditRouteForUpdate(mockOrganization1);
    const select = screen.getByTestId(ViewIdModel.type.id);
    expect(mockOrganization1.type).toBe(OrganizationType.CORP);
    expect(within(select).getByText(capitalize(OrganizationType.CORP))).toBeInTheDocument();
  });

  test('4833775: [Given] I am a user of the organization edit view [When] existing organization being edited [And] the organization type is null [Then] I can see the Organization Type as "Corporate" [And] the organization type is saved as "Corporate" when I save my organization edits', () => {
    const mockData = { ...mockOrganization13, type: OrganizationType.CORP };
    const update = jest.fn().mockResolvedValue({ success: true, data: mockData });

    customRenderEditRouteForUpdate(mockOrganization13, update);

    const select = screen.getByTestId(ViewIdModel.type.id);

    expect(mockOrganization13.type).toBe(null);
    expect(within(select).getByText(capitalize(OrganizationType.CORP))).toBeInTheDocument();

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(mockData);
  });

  test("5003131: [Given] an authenticated user with q4graph:read:organizations permission opens edit screen for corporate org [And] corporate org is not linked to an agency [Then] expect button to be not visible", async () => {
    const mockData = { ...mockOrganization14, delegateOrganizationIds: [] };
    customRenderEditRouteWithReadLinkedOrg(mockData);

    await waitFor(() => {
      expect(screen.getByTestId(ViewIdModel.featureManagement.id)).toBeVisible();
    });

    expect(screen.queryByTestId(ViewIdModel.featureManagement.managedLink.id)).not.toBeInTheDocument();
  });

  test("5003132: [Given] an authenticated user with q4graph:read:organizations permission opens edit screen for corporate org [And] corporate org is linked to an agency [Then] expect managing agency button to be visible", async () => {
    customRenderEditRouteWithReadLinkedOrg(mockOrganization14);

    await waitFor(() => {
      expect(screen.getByTestId(ViewIdModel.featureManagement.id)).toBeVisible();
    });

    expect(screen.queryByTestId(ViewIdModel.featureManagement.managedLink.id)).toBeVisible();
  });

  test("5003133: [Given] an authenticated user with q4graph:read:organizations permission opens edit screen for corporate org [And] corporate org is linked to an agency [Then] expect managing agency button to be enabled", async () => {
    customRenderEditRouteWithReadLinkedOrg(mockOrganization14);

    await waitFor(() => {
      expect(screen.getByTestId(ViewIdModel.featureManagement.id)).toBeVisible();
    });

    expect(screen.queryByTestId(ViewIdModel.featureManagement.managedLink.id)).toBeEnabled();
  });

  test("5003135: [Given] an authenticated user with q4graph:read:organizations can see the agency that manages a corporate org [When] button is clicked [Then] expect edit org screen of managing agency to be visible", async () => {
    customRenderEditRouteWithReadLinkedOrg(mockOrganization14);

    await waitFor(() => {
      expect(screen.getByTestId(ViewIdModel.featureManagement.id)).toBeVisible();
    });

    const managedButton = screen.queryByTestId(ViewIdModel.featureManagement.managedLink.id) as HTMLButtonElement;
    expect(managedButton).toBeVisible();
    fireEvent.click(managedButton);

    expect(mockHistoryPush).toHaveBeenCalledWith(getOrganizationEditRoute(mockOrganization14.delegateOrganizationIds?.[0]));
  });

  test("5006141: [Given] an authenticated user with q4graph:manage:organizations permission is editing Agency type org [Then] expect Entitlements tab to be not visible", async () => {
    customRenderEditRoute(mockOrganization12);

    await waitFor(() => {
      expect(screen.getByTestId(ViewIdModel.featureManagement.id)).toBeVisible();
    });

    expect(screen.queryByTestId(ViewIdModel.featureManagement.entitlementToggle.id)).not.toBeInTheDocument();
  });

  test("5006142: [Given] an authenticated user with q4graph:manage:organizations permission is editing Corporate type org [Then] expect Entitlements tab to be visible", async () => {
    customRenderEditRoute(mockOrganization1);

    await waitFor(() => {
      expect(screen.getByTestId(ViewIdModel.featureManagement.id)).toBeVisible();
    });

    expect(screen.getByTestId(ViewIdModel.featureManagement.entitlementToggle.id)).toBeVisible();
  });

  test("XXXXXXX: [Given] That I am a Q4 Support User [When]I access Admin [And] I click on an organization [Then] I am taken to the ‘View Organization’ page of that organization [And] I am able to view all the information pertaining to that organization, including Organization name, Stock ticker, Organization Type, Status (deactivated/active), Entitlements, Users", () => {
    const studioEntitlement = Entitlement.Studio;
    const mockOrg = { ...mockOrganization1, entitlements: [studioEntitlement] };
    customRender({
      index: EditRouteIndex.View,
      organizationQueryReturn: [
        {
          fetching: false,
          error: null,
          data: { organization: mockOrg },
          stale: null,
        },
        jest.fn(),
      ],
      context: null,
      permissions: mockPermissions[2],
    });

    const nameInput = screen.queryByTestId(ViewIdModel.nameField.id);
    const stockTickerInput = screen.queryByTestId(ViewIdModel.stockField.id);
    const typeInput = screen.queryByTestId(ViewIdModel.typeField.id);
    const statusToggle = screen.queryByTestId(ViewIdModel.featureManagement.userToggle.id);

    expect(nameInput).toBeInTheDocument();
    expect(stockTickerInput).toBeInTheDocument();
    expect(typeInput).toBeInTheDocument();
    expect(statusToggle).toBeInTheDocument();

    const entitlementTab = screen.queryByTestId(ViewIdModel.featureManagement.entitlements.id);
    expect(entitlementTab).toBeInTheDocument();

    const studioTab = screen.getByTestId(ViewIdModel.featureManagement.entitlements.studioTab);
    expect(studioTab).toBeInTheDocument();

    const userToggleButton = screen.getByTestId(ViewIdModel.featureManagement.userToggle.id);

    expect(userToggleButton).toBeInTheDocument();

    fireEvent.click(userToggleButton);
    expect(screen.queryByText("All users")).toBeVisible();
    expect(entitlementTab).not.toBeInTheDocument();
  });

  test("5003123: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission is viewing Agency org with > 10 linked orgs [And] Linked Organizations tab is open [When] NEXT button is clicked [Then] expect PREVIOUS button to be enabled", async () => {
    customRenderEditRouteWithReadLinkedOrg(mockOrganization12, linkedOrgsMock());
    clickOnLinkedToggle();

    await waitFor(() => {
      expectLinkedOrganizationsTabToBeVisible();
    });

    const { next, previous } = linkedOrganizationsTable.entityTable.pagination;
    const nextBtn = screen.getByTestId(next.id);
    fireEvent.click(nextBtn);

    const previousBtn = screen.getByTestId(previous.id);
    expect(previousBtn).toBeEnabled();
  });

  test("5003124: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission is viewing Agency org [And] Linked Organizations tab is open on the second page [When] PREVIOUS button is clicked [Then] expect previous set of records to be po", async () => {
    const page1Mock = linkedOrgsMock();
    const page2Mock = linkedOrgsMock({ ...MockOrganization1 });

    customRenderEditRouteWithReadLinkedOrg(mockOrganization12, page1Mock);

    clickOnLinkedToggle();

    mockUseOrganizationsLazyQuery.mockReturnValue(page2Mock);

    await waitFor(() => {
      expectLinkedOrganizationsTabToBeVisible();
    });

    const { next, previous } = linkedOrganizationsTable.entityTable.pagination;

    const nextBtn = screen.getByTestId(next.id);
    fireEvent.click(nextBtn);

    mockUseOrganizationsLazyQuery.mockReturnValue(page1Mock);

    const previousBtn = screen.getByTestId(previous.id);
    fireEvent.click(previousBtn);

    const orgCellIdModel = ViewIdModel.featureManagement.organizations.orgIdCellList.getModelId(mockOrganization12.id);
    const rows = screen.getAllByTestId(orgCellIdModel?.value);
    expect(rows.length).toEqual(10);
  });

  test("5003122: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission is viewing Agency org [And] Linked Organizations tab is open on the first page [When] NEXT button is clicked [Then] expect new set of records", async () => {
    customRenderEditRouteWithReadLinkedOrg(mockOrganization12, linkedOrgsMock());

    mockUseOrganizationsLazyQuery.mockReturnValue(linkedOrgsMock({ ...mockOrganization12, active: false }));

    clickOnLinkedToggle();

    await waitFor(() => {
      expectLinkedOrganizationsTabToBeVisible();
    });

    const { next } = linkedOrganizationsTable.entityTable.pagination;

    const nextBtn = screen.getByTestId(next.id);
    fireEvent.click(nextBtn);

    const orgCellIdModel = ViewIdModel.featureManagement.organizations.orgIdCellList.getModelId(mockOrganization12.id);
    const rows = screen.getAllByTestId(orgCellIdModel?.value);
    expect(rows.length).toEqual(10);
  });

  test("5003121: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission is viewing Agency org [And] Linked Organizations tab is open on the first page [Then] expect NEXT pagination control to be enabled", async () => {
    customRenderEditRouteWithReadLinkedOrg(mockOrganization12, linkedOrgsMock());

    clickOnLinkedToggle();

    await waitFor(() => {
      expectLinkedOrganizationsTabToBeVisible();
    });

    const { next } = linkedOrganizationsTable.entityTable.pagination;
    const nextBtn = screen.getByTestId(next.id);

    expect(nextBtn).toBeEnabled();
  });

  test("5003120: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission is viewing Agency org [And] Linked Organizations tab is open on the first page [Then] expect PREVIOUS pagination control to be disabled", async () => {
    customRenderEditRouteWithReadLinkedOrg(mockOrganization12, linkedOrgsMock());

    clickOnLinkedToggle();

    await waitFor(() => {
      expectLinkedOrganizationsTabToBeVisible();
    });

    const { previous } = linkedOrganizationsTable.entityTable.pagination;
    const previousBtn = screen.getByTestId(previous.id);

    expect(previousBtn).toBeDisabled();
  });

  test("5003118: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission is viewing Agency org [And] Linked Organizations tab is open on the second page [Then] expect pagination controls to be visible", async () => {
    customRenderEditRouteWithReadLinkedOrg(mockOrganization12, linkedOrgsMock());

    clickOnLinkedToggle();

    await waitFor(() => {
      expectLinkedOrganizationsTabToBeVisible();
    });

    const { next } = linkedOrganizationsTable.entityTable.pagination;
    const nextBtn = screen.getByTestId(next.id);

    expect(nextBtn).toBeVisible();
  });

  test("5003117: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission is viewing Agency org with <= 10 linked orgs [And] Linked Organizations tab is open on the first page [Then] expect no pagination controls to be visible", async () => {
    customRenderEditRouteWithReadLinkedOrg(mockOrganization12, linkedOrgsMock(mockOrganization12, [MockOrganization1]));
    clickOnLinkedToggle();

    await waitFor(() => {
      expectLinkedOrganizationsTabToBeVisible();
    });

    const { pagination } = linkedOrganizationsTable.entityTable;
    expect(() => screen.getByTestId(pagination.id)).toThrow("Unable to find an element");
  });

  test("5002343: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission open 'Linked Organizations' tab for Agency org [Then] expect search input to be visible", () => {
    customRenderEditRouteWithReadLinkedOrg(mockOrganization12, linkedOrgsMock());
    clickOnLinkedToggle();

    const search = screen.getByTestId(linkedOrganizationsTable.entityTable.search.id);
    expect(search).toBeInTheDocument();
  });

  test("5002347: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission see search input for Agency org [Then] expect search input to be enabled", () => {
    customRenderEditRouteWithReadLinkedOrg(mockOrganization12, linkedOrgsMock());
    clickOnLinkedToggle();

    const search = screen.getByTestId(linkedOrganizationsTable.entityTable.search.id);
    expect(search).toBeEnabled();
  });

  test("5002344:[Given] an authenticated user with q4graph:read:agency:linked-organizations permission see search input for Agency org [Then] expect place holder text 'Search' to be visible", () => {
    customRenderEditRouteWithReadLinkedOrg(mockOrganization12, linkedOrgsMock());
    clickOnLinkedToggle();

    const input = screen.getByTestId(linkedOrganizationsTable.entityTable.search.input);
    expect(input).toHaveAttribute("placeholder", "Search");
  });

  test("5002348:[Given] an authenticated user with q4graph:read:agency:linked-organizations permission enter >=3 search characters in search input [Then] expect all linked orgs matching the search criteria to be populated", async () => {
    const items = [...Array(5).keys()].map((i) => {
      return { ...mockOrganization12, name: `test${i}` };
    });

    customRenderEditRouteWithReadLinkedOrg(mockOrganization12, linkedOrgsMock(mockOrganization12, items));
    clickOnLinkedToggle();

    await waitFor(() => {
      expectLinkedOrganizationsTabToBeVisible();
    });

    const searchTerm = "test1";

    mockUseOrganizationsLazyQuery.mockReturnValue(
      linkedOrgsMock(
        mockOrganization12,
        items.filter((org) => org.name.includes(searchTerm)),
      ),
    );

    const searchInput = screen.getByTestId(linkedOrganizationsTable.entityTable.search.input);
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    expect((searchInput as HTMLInputElement).value).toBe(searchTerm);
    expect(queryOrganizations).toBeCalledTimes(3);
    expect(queryOrganizations).toBeCalledWith({
      variables: { searchTerm, page: null, delegateOrganizationId: mockOrganization12.id },
    });

    const orgCellIdModel = ViewIdModel.featureManagement.organizations.orgIdCellList.getModelId(mockOrganization12.id);

    const rows = screen.getAllByTestId(orgCellIdModel?.id);
    expect(rows.length).toEqual(1);
  });

  test("5002350: [Given] an authenticated user with q4graph:read:agency:linked-organizations permission has applied search term [When] search term is deleted [Then] expect table to reset and show all available orgs", async () => {
    const items = [...Array(5).keys()].map((i) => {
      return { ...mockOrganization12, name: `test${i}` };
    });

    customRenderEditRouteWithReadLinkedOrg(mockOrganization12, linkedOrgsMock(mockOrganization12, items));
    clickOnLinkedToggle();

    await waitFor(() => {
      expectLinkedOrganizationsTabToBeVisible();
    });

    const searchTerm = "test1";

    const searchInput = screen.getByTestId(linkedOrganizationsTable.entityTable.search.input);
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    expect((searchInput as HTMLInputElement).value).toBe(searchTerm);
    expect(queryOrganizations).toBeCalledTimes(3);
    expect(queryOrganizations).toBeCalledWith({
      variables: { searchTerm, page: null, delegateOrganizationId: mockOrganization12.id },
    });

    fireEvent.change(searchInput, { target: { value: "" } });

    expect(queryOrganizations).toBeCalledTimes(4);
    expect(queryOrganizations).toBeCalledWith({
      variables: { searchTerm, page: null, delegateOrganizationId: mockOrganization12.id },
    });

    const orgCellIdModel = ViewIdModel.featureManagement.organizations.orgIdCellList.getModelId(mockOrganization12.id);

    const rows = screen.getAllByTestId(orgCellIdModel?.id);
    expect(rows.length).toEqual(5);
  });

  test("5387344: [Given] I am a user of organization edit view [And] the organization is of type agency [And] the feature flag for “CC Admin - Agency Teams” is enabled [Then] I can see the Teams tab", () => {
    customRenderEditRoute(mockOrganization12);
    expect(screen.getByText(OrganizationFeatureManagementLanguage.Teams)).toBeVisible();
  });

  test("5394251: [Given] I am a user of organization edit view [And] the organization is of type agency [And] the feature flag for “CC Admin - Agency Teams” is not enabled [Then] I cannot see the Teams tab", () => {
    mockFlags({
      [FeatureFlag.AgencyTeams]: false,
    });

    customRenderEditRoute(mockOrganization12);
    expect(screen.queryByText(OrganizationFeatureManagementLanguage.Teams)).not.toBeInTheDocument();
  });

  test("5387961, 5387962: [Given] I am a user of the organization edit view [And] I can see the “Add Team” button [When] I hover over the button [Then] I can see a tooltip that says “Create a new team to provide a group of users with access to specific organizations”", async () => {
    customRenderEditRoute(mockOrganization12);

    clickOnToggleElement(ViewIdModel.featureManagement.teamsToggle.id);

    await waitFor(() => {
      expectTeamsTabToBeVisible();
    });

    const addTeamElement = screen.getByText(OrganizationTeamsLanguage.ADD);

    expect(addTeamElement).toBeVisible();

    fireEvent.mouseOver(addTeamElement);

    await waitFor(() => {
      expect(screen.getByText(OrganizationTeamsLanguage.ADD_TOOLTIP)).toBeVisible();
    });
  });

  test("5387963: [Given] I am a user of the organization edit view [And] the organization is not of type Agency [Then] I cannot see a tab for 'Teams'", () => {
    customRenderEditRoute(mockOrganization1);
    expect(screen.queryByText(OrganizationFeatureManagementLanguage.Teams)).not.toBeInTheDocument();
  });

  test("5511024, 5510709: [Given] I am a user of the Organization Edit view [And] I can see the teams tab [Then] a request to fetch organization access groups for the organization is invoked", async () => {
    customRenderEditRoute(mockOrganization12);

    clickOnToggleElement(ViewIdModel.featureManagement.teamsToggle.id);

    await waitFor(() => {
      expectTeamsTabToBeVisible();
    });

    expect(mockUseTeamsQuery).toHaveBeenCalled();
  });

  test("7635928: [Given] I am viewing the Create Organization page [And] I leave the ticker selection blank [And] I have filled out all other required fields [When]I press the 'Create Organization' button [Then] The organization is successfully created", async () => {
    const { id } = mockOrganization1;
    const post = jest.fn().mockResolvedValue({ success: true, data: { id } });

    customRender({
      organizationPostReturn: [mockHookDefault.organizationPostReturn[0], post],
    });

    const { name } = mockOrganization1;
    const nameInput = screen.queryByTestId(ViewIdModel.name.input) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: name } });

    await select(screen.getByTestId(ViewIdModel.type.id), "Corporate", {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      container: document.getElementById("root")!,
    });

    await selectCurrency(OrganizationCurrencyLabel.USD);
    selectRegion(ViewIdModel.regionNorthAmericaRadioButton.input);

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    expect(post).toBeCalledTimes(1);
  });

  test("7627506: [Given] I am viewing the Edit Organization page [And] I leave the ticker selection blank [And] I have filled out all other required fields [When]I press the 'Save Organization' button [Then] The organization is successfully edited/saved", () => {
    const update = jest.fn().mockResolvedValue({ success: true, data: mockOrganization16 });
    customRenderEditRouteForUpdate(mockOrganization16, update);

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(mockOrganization16);
  });

  test("7627507: [Given] I am viewing the 'View Organization' or 'Edit Organization' page [And] A ticker/exchange is applied for this org [Then] The organization ticker/exchange is displayed in the search selector dropdown", async () => {
    customRenderEditRouteForUpdate(mockOrganization17);

    await waitFor(() => {
      expect(screen.getByText("SPX | ACT")).toBeVisible();
    });
  });

  test("7627657: [Given] I am viewing the Create Organization or Edit Organization page [And] I attempt to enter a free text value in the ticker search selector dropdown [Then] The ticker value defaults to no selection", () => {
    mockUseEntitySearchQuery.mockReturnValue({
      refetch: () => Promise.resolve(getEntitySearchResult("SYS", "NAD")),
    });
    const update = jest.fn().mockResolvedValue({ success: true, data: mockOrganization16 });
    customRenderEditRouteForUpdate(mockOrganization16, update);

    const selector = screen.queryByTestId(ViewIdModel.symbol.id);
    expect(selector).toBeVisible();

    const input = screen.getByTestId(`${ViewIdModel.symbol.id}Input`);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "sys" } });
    expect(input).toHaveValue("sys");

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    expect(update).toHaveBeenCalledWith(mockOrganization16);
  });

  test("8529415: [Given] I am viewing the Edit Organization page for an organization of type 'Admin' [Then] expect 'Team' and 'Linked Organization' tabs to be shown", () => {
    customRender({
      index: EditRouteIndex.Edit,
      organizationQueryReturn: [
        {
          fetching: false,
          error: null,
          data: { organization: mockAdminOrganization },
          stale: null,
        },
        jest.fn(),
      ] as unknown as ReturnType<typeof useOrganizationQuery>,
      context: undefined,
    });

    const teamsToggleButton0 = screen.queryByTestId(ViewIdModel.featureManagement.teamsToggle.id);
    expect(teamsToggleButton0).toBeInTheDocument();

    const teamsToggleButton = screen.queryByRole("button", { name: OrganizationFeatureManagementLanguage.Teams });
    expect(teamsToggleButton).toBeInTheDocument();

    const linkedOrganizationsToggleButton = screen.queryByRole("button", {
      name: OrganizationFeatureManagementLanguage.LinkedOrganizations,
    });
    expect(linkedOrganizationsToggleButton).toBeInTheDocument();
  });

  test("8550493: [Given] my user does not have the 'q4graph:manage:organizations' [When] I view Organization Details page for an organization [Then] the stock ticker field is populated with expected value", () => {
    const mockOrg = { ...mockOrganization17 };
    customRender({
      index: EditRouteIndex.View,
      organizationQueryReturn: [
        {
          fetching: false,
          error: null,
          data: { organization: mockOrg },
          stale: null,
        },
        jest.fn(),
      ],
      context: null,
      permissions: mockPermissions[2],
    });

    const selector = screen.queryByTestId(ViewIdModel.symbol.id);
    expect(selector).toBeVisible();
    expect(screen.queryByText("SPX | ACT")).toBeVisible();
  });

  test("8550494: [Given] my user does not have the 'q4graph:manage:organizations' [When] I view Organization Details page for an organization [Then] the stock ticker field is disabled", () => {
    const mockOrg = { ...mockOrganization17 };
    customRender({
      index: EditRouteIndex.View,
      organizationQueryReturn: [
        {
          fetching: false,
          error: null,
          data: { organization: mockOrg },
          stale: null,
        },
        jest.fn(),
      ],
      context: null,
      permissions: mockPermissions[2],
    });

    const selector = screen.queryByTestId(ViewIdModel.symbol.id);
    expect(selector).toBeVisible();
    expect(selector).toHaveClass("nui-select--is-disabled");
  });

  test("11220109: [Given] the user has clicked the option to add the External Site Tracking entitlement [Then] the user can see the External Site Tracking entitlement enabled in the Entitlement Toolbar", () => {
    customRender({ index: EditRouteIndex.Edit });
    addEntitlement(ViewIdModel.featureManagement.entitlements.menuAddExternalSiteTracking.id);
    checkForEntitlement(ViewIdModel.featureManagement.entitlements.externalSiteTrackingTab);
  });

  test("11220110: [Given] the user has added the External Site Tracking entitlement [When] the user clicks the Save button on the Organizations Edit view [Then] the External Site Tracking entitlement is added to the Organization", () => {
    const externalSiteTrackingEntitlement = Entitlement.ExternalSiteTracking;
    const mockOrg = { ...mockOrganization1, entitlements: [externalSiteTrackingEntitlement] };
    const update = jest.fn().mockResolvedValue({ success: true, data: mockOrganization1 });
    customRenderEditRouteForUpdate(mockOrg, update);

    addEntitlement(ViewIdModel.featureManagement.entitlements.menuAddExternalSiteTracking.id);
    checkForEntitlement(ViewIdModel.featureManagement.entitlements.externalSiteTrackingTab);

    act(() => {
      const saveButton = screen.queryByTestId(ViewIdModel.save.id);
      fireEvent.click(saveButton);
    });

    expect(update).toBeCalledTimes(1);
    expect(update).toBeCalledWith(mockOrg);

    checkForEntitlement(ViewIdModel.featureManagement.entitlements.externalSiteTrackingTab);
  });

  test("11220112: [Given] the user has clicked the option to add the External Site Tracking entitlement [And] the External Site Tracking entitlement is already enabled for the organization [Then] the user can see a failure toast message that the entitlement is already enabled", async () => {
    customRender({ index: EditRouteIndex.Edit });

    addEntitlement(ViewIdModel.featureManagement.entitlements.menuAddExternalSiteTracking.id);
    checkForEntitlement(ViewIdModel.featureManagement.entitlements.externalSiteTrackingTab);
    addEntitlement(ViewIdModel.featureManagement.entitlements.menuAddExternalSiteTracking.id);

    await waitFor(() => {
      expect(error).toBeCalledWith(OrganizationEditMessage.EntitlementAlreadyAdded);
    });

    await waitFor(() => {
      expect(screen.getByTestId(ViewIdModel.featureManagement.entitlements.externalSiteTrackingTab)).toBeVisible();
    });
  });

  test("11220113: [Given] the user is on the Organizations Edit view [And] the user has the q4graph:manage:organizations permission [And] the organization has the External Site Tracking entitlement enabled [When] the user hovers on the External Site Tracking entitlement Toolbar tab [Then] the user can see an option to remove the entitlement", () => {
    const externalSiteTracking = Entitlement.ExternalSiteTracking;
    const mockOrg = { ...mockOrganization1, entitlements: [externalSiteTracking] };

    customRenderEditRoute(mockOrg);
    expectEntitlementTabToBeVisible(ViewIdModel.featureManagement.entitlements.externalSiteTrackingTab);
    expectEntitlementTrashButtonToBeVisible(
      ViewIdModel.featureManagement.entitlements.externalSiteTrackingTab,
      ViewIdModel.featureManagement.entitlements.externalSiteTrackingTabRemove.id,
    );
  });

  test("11220114: [Given] the user can see an option to remove the External Site Tracking entitlement [When] the user clicks the option [Then] the user can see a warning Message to remove the entitlement", () => {
    const externalSiteTracking = Entitlement.ExternalSiteTracking;
    const mockOrg = { ...mockOrganization1, entitlements: [externalSiteTracking] };

    customRenderEditRoute(mockOrg);
    expectEntitlementTabToBeVisible(ViewIdModel.featureManagement.entitlements.externalSiteTrackingTab);
    const trashButton = screen.getByTestId(ViewIdModel.featureManagement.entitlements.externalSiteTrackingTabRemove.id);
    expectEntitlementTrashButtonToBeVisible(
      ViewIdModel.featureManagement.entitlements.externalSiteTrackingTab,
      ViewIdModel.featureManagement.entitlements.externalSiteTrackingTabRemove.id,
    );

    fireEvent.click(trashButton);

    expectWarningMessageToRemoveEntitlement();
  });

  test("11220115: [Given] the user can see a warning Message to remove the entitlement External Site Tracking [When] the user clicks the option to confirm removal [Then] the user can no longer see the External Site Tracking entitlement enabled in the Entitlement Toolbar", () => {
    const mockOrg = { ...mockOrganization1, entitlements: [Entitlement.ExternalSiteTracking] };

    customRenderEditRoute(mockOrg);

    const externalSiteTrackingTab = removeEntitlementAndConfirm(
      ViewIdModel.featureManagement.entitlements.externalSiteTrackingTab,
      ViewIdModel.featureManagement.entitlements.externalSiteTrackingTabRemove.id,
    );

    expect(externalSiteTrackingTab).not.toBeVisible();
  });

  test("11220116: [Given] the user can see a warning Message to remove the entitlement External Site Tracking [When] the user clicks the option to cancel removal [Then] the user can still see the External Site Tracking entitlement enabled in the Entitlement Toolbar", () => {
    const mockOrg = { ...mockOrganization1, entitlements: [Entitlement.ExternalSiteTracking] };

    customRenderEditRoute(mockOrg);

    const externalSiteTrackingTab = removeEntitlementAndCancel(
      ViewIdModel.featureManagement.entitlements.externalSiteTrackingTab,
      ViewIdModel.featureManagement.entitlements.externalSiteTrackingTabRemove.id,
    );

    expect(externalSiteTrackingTab).toBeVisible();
  });
});
