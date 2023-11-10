import { ChipClassName, SelectClassName, ToastContainer } from "@q4/nimbus-ui";
import { OrganizationType } from "@q4/platform-definitions";
import React from "react";
import {
  MockOrganization1,
  MockOrganizations,
  MockOrganization2,
  MockOrganization3,
  MockOrganization4,
  MockAgencyOrganization,
  MockAdminOrganization,
  MockOrganization9,
  MockQ4IncCorpOrganization,
  MockOrganization12,
} from "../../../../../__mocks__/data/organizations.mock";
import { OrganizationEditState, OrganizationLinkedStatus } from "../../../../../definitions/organization.definition";
import { useLinkOrganizations } from "../../../../../hooks/_apollo/useOrganization/useOrganization.hook";
import { useManagedByAdminOrganization } from "../../../../../hooks/useManagedByAdminOrganization/useManagedByAdminOrganization.hook";
import { OrganizationsLinkMessage } from "../../../../../hooks/useOrganization/useOrganization.definition";
import type { useOrganizationsQuery } from "../../../../../hooks/useOrganization/useOrganization.hook";
import {
  OrganizationsWithManagedByQuery,
  useOrganizationQuery,
} from "../../../../../hooks/useOrganization/useOrganization.hook";
import { useToastNotificationService } from "../../../../../hooks/useToastNotificationService/useToastNotificationService.hook";
import { fireEvent, render, screen, waitFor, within } from "../../../../../utils/testUtils";
import { OrganizationsLink } from "./OrganizationsLink.component";
import {
  OrganizationLinkAdminWording,
  OrganizationLinkAgencyWording,
  OrganizationsLinkViewIdModel,
} from "./OrganizationsLink.definition";

jest.mock("../../../../../hooks/_apollo/useOrganization/useOrganization.hook");
const mockUseLinkOrganizations = useLinkOrganizations as jest.Mock;
jest.mock("../../../../../hooks/useToastNotificationService/useToastNotificationService.hook");
const mockUseToastNotificationService = useToastNotificationService as jest.Mock;
jest.mock("../../../../../hooks/useOrganization/useOrganization.hook");
const mockOrganizationsWithManagedByQuery = OrganizationsWithManagedByQuery as jest.Mock;
const mockUseOrganizationQuery = useOrganizationQuery as jest.Mock;
jest.mock("../../../../../hooks/useManagedByAdminOrganization/useManagedByAdminOrganization.hook");
const mockUseManagedByAdminOrganization = useManagedByAdminOrganization as jest.Mock;

const { id: mockOrganizationId, name: mockOrganizationName } = MockOrganization1;
const idModel = OrganizationsLinkViewIdModel;
const returnRoute = `/organizations/edit/${mockOrganizationId}`;

const mockHistoryPush = jest.fn();
const mockLinkOrganizations = jest.fn((): Promise<unknown> => Promise.resolve({ data: [] }));

jest.mock("../../../../../hooks/useClaims/useClaims.hook");
jest.mock("react-router-dom", () => {
  const orginal = jest.requireActual("react-router-dom");
  return {
    ...orginal,
    useHistory: () => ({
      location: { pathname: "/" },
      push: mockHistoryPush,
    }),
    useParams: () => ({
      id: mockOrganizationId,
    }),
  };
});

const organizationsQueryHook = [
  {
    fetching: false,
    error: null,
    data: { organizations: { items: MockOrganizations } },
    operation: null,
    stale: null,
  },
  jest.fn(),
] as unknown as ReturnType<typeof useOrganizationsQuery>;
const organizationQueryReturn = [
  {
    fetching: false,
    error: null,
    data: { organization: MockOrganization1 },
    stale: null,
  },
  jest.fn(),
] as unknown as ReturnType<typeof useOrganizationQuery>;
const organizationsQueryWithManagedHook = [
  {
    fetching: false,
    error: null,
    data: {
      organizations: {
        items: [
          { ...MockOrganization2, delegateOrganizationIds: [mockOrganizationId] },
          { ...MockOrganization3, delegateOrganizationIds: [mockOrganizationId] },
          { ...MockOrganization4, delegateOrganizationIds: [MockAgencyOrganization?.id] },
        ],
      },
    },
    operation: null,
    stale: null,
  },
  jest.fn(),
] as unknown as ReturnType<typeof useOrganizationsQuery>;

const multiSelectDropdownOptions = (): NodeListOf<Element> =>
  document.querySelectorAll(`#${idModel.organizations.menu} .${SelectClassName.Option}`) as NodeListOf<Element>;

const selectedOptionChips = () => Array.from(document.querySelectorAll(`.${ChipClassName.Label}`)) as HTMLElement[];

const selectOption = (optionIndex: number, expectedChips: number) => {
  const selectionOptions = multiSelectDropdownOptions();
  fireEvent.click(selectionOptions[optionIndex]);

  const selectedChips = selectedOptionChips();
  expect(selectedChips).toHaveLength(expectedChips);
};

const multiSelectDropdownOptionCheckboxes = (): NodeListOf<HTMLInputElement> =>
  document.querySelectorAll(
    `#${idModel.organizations.menu} .${SelectClassName.OptionCheckbox}_input`,
  ) as NodeListOf<HTMLInputElement>;

const openOrganizationDropdown = () => {
  const mutliSelect = screen.getByTestId(idModel.organizations.id);
  expect(mutliSelect).toBeInTheDocument();
  fireEvent.click(mutliSelect);
  fireEvent.keyDown(mutliSelect, { key: "Down" });
};

describe("Organization Link View [Given] user with required permissions ", () => {
  beforeEach(() => {
    mockOrganizationsWithManagedByQuery.mockReturnValue(organizationsQueryHook);
    mockUseOrganizationQuery.mockReturnValue(organizationQueryReturn);
    mockUseManagedByAdminOrganization.mockReturnValue({
      isManagedByAdmin: false,
      adminOrganizations: [MockAdminOrganization],
    });

    mockUseLinkOrganizations.mockReturnValue([
      mockLinkOrganizations as never,
      { loading: false, called: true, client: null as never, reset: jest.fn() },
    ]);
  });

  const customRender = () =>
    render(
      <>
        <OrganizationsLink />
        <ToastContainer />
      </>,
    );

  it("7395557: renders without crashing", () => {
    customRender();
    const container = screen.getByTestId(idModel.modal.id);
    expect(container).toMatchSnapshot();
  });

  test("4765047: [Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission is on Link Organization page [Then] expect title text Link Organizations to be present", () => {
    customRender();

    const title = screen.getByTestId(idModel.modal.title.id);
    expect(within(title).getByText("Link Organizations")).toBeInTheDocument();
  });

  test("4765048: [Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission is on Link Organization page [Then] expect title text Link Organizations + Agency name to be present", () => {
    customRender();

    const modalContent = screen.getByTestId(idModel.modal.children);
    expect(within(modalContent).getByText(`Link Organizations • ${mockOrganizationName}`)).toBeInTheDocument();
  });

  test(`4765049: [Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission is on Link Organization page of an '${OrganizationType.AGENCY}' organization [Then] expect sub text to be correct`, () => {
    const agencyOrganizationQueryReturn = [
      {
        fetching: false,
        error: null,
        data: { organization: MockAgencyOrganization },
        stale: null,
      },
      jest.fn(),
    ] as unknown as ReturnType<typeof useOrganizationQuery>;
    mockUseOrganizationQuery.mockReturnValueOnce(agencyOrganizationQueryReturn);

    customRender();

    const modalContent = screen.getByTestId(idModel.modal.children);
    expect(within(modalContent).getByText(OrganizationLinkAgencyWording)).toBeInTheDocument();
    expect(screen.getByLabelText("more information")).toBeInTheDocument();
  });

  test(`8595010: [Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission is on Link Organization page of an '${OrganizationType.ADMIN}' organization [Then] expect sub text to be correct`, () => {
    const adminOrganizationQueryReturn = [
      {
        fetching: false,
        error: null,
        data: { organization: MockAdminOrganization },
        stale: null,
      },
      jest.fn(),
    ] as unknown as ReturnType<typeof useOrganizationQuery>;
    mockUseOrganizationQuery.mockReturnValueOnce(adminOrganizationQueryReturn);

    customRender();

    const modalContent = screen.getByTestId(idModel.modal.children);
    expect(within(modalContent).getByText(OrganizationLinkAdminWording)).toBeInTheDocument();
    expect(screen.queryByLabelText("more information")).not.toBeInTheDocument();
  });

  test("4765050: [Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission is on Link Organization page [Then] expect dropdown label name Select Organizations to be present", () => {
    customRender();

    const organizationsField = screen.getByTestId(idModel.organizationsField.id);
    expect(within(organizationsField).getByText("Select Organizations")).toBeInTheDocument();
  });

  test("4765051: [Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission is on Link Organization page [Then] expect dropdown placeholder name Select is present", () => {
    customRender();

    const mutliSelect = screen.getByTestId(idModel.organizations.id);
    expect(within(mutliSelect).getByText("Select")).toBeInTheDocument();
  });

  test("4765052: [[Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission is on Link Organization page [Then] expect Select Organizations dropdown to be in enabled state", () => {
    customRender();

    const mutliSelect = screen.getByTestId(idModel.organizations.id);
    expect(mutliSelect).toBeInTheDocument();
    expect(mutliSelect).toBeEnabled();
  });

  test("4765053: [Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission is on Link Organization page [Then] expect page exit icon X to be present in top right corner", () => {
    customRender();

    const exitButton = screen.getByTestId(idModel.modal.exit.id);
    expect(exitButton).toBeInTheDocument();
  });

  test(`4765054: [Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission is on Link Organization page [When] page exit icon X is clicked [Then] expect user to be navigated back to /organizations/edit/${mockOrganizationId}/linked-organization`, async () => {
    customRender();

    const exitButton = screen.getByTestId(idModel.modal.exit.id);
    expect(exitButton).toBeInTheDocument();
    fireEvent.click(exitButton);

    await waitFor(() => {
      expect(mockHistoryPush).toBeCalledTimes(1);
    });

    expect(mockHistoryPush).toBeCalledWith(returnRoute);
  });

  test("4765056: [Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission is on Link Organization page [When] Select Organization dropdown is clicked [Then] expect corporate type organization dropdown list to be visible", () => {
    customRender();

    openOrganizationDropdown();
    const multiSelectDropdown = document.querySelector(`.${SelectClassName.Portal}`) as HTMLElement;

    expect(multiSelectDropdown).toBeInTheDocument();
  });

  test("4765057: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission is on Link Organization page [When] Select Organizations dropdown is clicked [Then] expect checkboxes to be present for all organizations in the dropdown", () => {
    customRender();

    openOrganizationDropdown();

    const selectOptionCheckboxes = multiSelectDropdownOptionCheckboxes();

    expect(selectOptionCheckboxes.length).toStrictEqual(MockOrganizations.length);
  });

  test("4765462: [Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission clicks Select Organizations dropdown [Then] expect all organizations in the dropdown list are sorted alphabetically", () => {
    customRender();

    openOrganizationDropdown();

    const options = Array.from(
      document.querySelectorAll(`#${idModel.organizations.menu} .${SelectClassName.Option}`),
    ) as HTMLElement[];
    const optionsText = options.map((el) => el.textContent);
    const sortedMockData = MockOrganizations.sort((a, b) => a.name.localeCompare(b.name)).map((org) => org.name);

    expect(optionsText).toStrictEqual(sortedMockData);
  });

  test("4766217: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission clicks Select Organizations dropdown [When] multiple orgs are selected [Then] expect all selected organizations to be visible under the dropdown", () => {
    const expectValue1 = new OrganizationEditState(MockOrganization3);
    const expectValue2 = new OrganizationEditState(MockOrganization9);
    customRender();
    const expectedLinkedOrganizations = [
      `${expectValue1.name} | ${expectValue1.ticker}`,
      `${expectValue2.name} | ${expectValue2.ticker}`,
    ];

    openOrganizationDropdown();
    // Select first option
    selectOption(0, 1);
    // Select second option
    selectOption(1, 2);

    const options = Array.from(document.querySelectorAll(`.${ChipClassName.Label}`)) as HTMLElement[];
    const linkedOrganizationChips = options.map((el) => el.textContent);
    expect(linkedOrganizationChips).toEqual(expect.arrayContaining(expectedLinkedOrganizations));
  });

  test("4766621: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission successfully links Corporate org to an Agency [Then] expect linked Corporate org checkbox to be unchecked and disabled in Select Organizations dropdownx", () => {
    mockOrganizationsWithManagedByQuery.mockReturnValue(organizationsQueryWithManagedHook);
    customRender();

    openOrganizationDropdown();

    const multiSelectDropdownOptionCheckbox = document.querySelector(
      `#${idModel.organizations.menu} .${SelectClassName.Option}`,
    ) as HTMLElement;

    expect(multiSelectDropdownOptionCheckbox).toHaveClass(`${SelectClassName.Option}--is-disabled`);
  });

  test("4766620: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission successfully links Corporate org to an Agency [Then] expect linked Corporate org to be visible in Select Organizations dropdown", () => {
    mockOrganizationsWithManagedByQuery.mockReturnValue(organizationsQueryWithManagedHook);
    customRender();

    openOrganizationDropdown();
    const { getByText } = within(screen.getByTestId(idModel.organizations.menu));
    expect(getByText(MockOrganization2.name)).toBeInTheDocument();
  });

  test("4766218: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission clicks Select Organizations dropdown [And] multiple orgs are selected [When] selected orgs are removed [Then] expect removed orgs no longer present in the list", () => {
    customRender();

    openOrganizationDropdown();

    // Select first option
    selectOption(0, 1);
    // Unselect first option
    selectOption(0, 0);
  });

  test("4765468: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission clicks Select Organizations dropdown [And] already selected checkbox is unchecked [And] [Then] expect LINK ORGANIZATIONS button to be disabled", () => {
    customRender();

    openOrganizationDropdown();

    // Select first option
    selectOption(0, 1);
    // Unselect first option
    selectOption(0, 0);

    const linkOrganizationButton = screen.queryByTestId(idModel.save.id);
    expect(linkOrganizationButton).toBeDisabled();
  });

  test("4765467: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission clicks Select Organizations dropdown [When] checkbox is selected [Then] expect LINK ORGANIZATIONS button to be enabled", () => {
    customRender();

    openOrganizationDropdown();

    // Select first option
    selectOption(0, 1);

    const linkOrganizationButton = screen.queryByTestId(idModel.save.id);
    expect(linkOrganizationButton).toBeEnabled();
  });

  test("4765466: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission clicks Select Organizations dropdown [And] checkbox is selected [When] checkbox is selected again [Then] expect checkbox to be unchecked", () => {
    customRender();

    openOrganizationDropdown();

    // Select first option
    selectOption(0, 1);

    let selectOptionCheckboxes = multiSelectDropdownOptionCheckboxes();
    expect(selectOptionCheckboxes[0]).toBeChecked();

    // Unselect first option
    selectOption(0, 0);
    selectOptionCheckboxes = multiSelectDropdownOptionCheckboxes();
    expect(selectOptionCheckboxes[0]).not.toBeChecked();
  });

  test("4765465: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission clicks Select Organizations dropdown [When] multiple checkbox selection is made [Then] expect all selected entries to be highlighted", () => {
    customRender();

    const optionSelected = "nui-select__option--is-selected";
    openOrganizationDropdown();

    // Select first option
    selectOption(0, 1);
    // Select second option
    selectOption(1, 2);
    const selectOptions = multiSelectDropdownOptions();
    expect(selectOptions[0]).toHaveClass(optionSelected);
    expect(selectOptions[1]).toHaveClass(optionSelected);
  });

  test("4765464: Given] an authenticated user with q4graph:manage:agency:linked-organizations permission clicks Select Organizations dropdown [When] multiple checkbox selection is made [Then] expect all selected entries to be checked", () => {
    customRender();

    openOrganizationDropdown();

    // Select first option
    selectOption(0, 1);
    // Select second option
    selectOption(1, 2);
    const selectOptionCheckboxes = multiSelectDropdownOptionCheckboxes();
    expect(selectOptionCheckboxes[0]).toBeChecked();
    expect(selectOptionCheckboxes[1]).toBeChecked();
    expect(selectOptionCheckboxes[2]).not.toBeChecked();
  });

  test("4765463: [Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission clicks Select Organizations dropdown [When] user clicks single checkbox for selection [Then] expect selected checkbox to be checked", () => {
    customRender();

    openOrganizationDropdown();

    // Select first option
    selectOption(0, 1);

    const selectOptionCheckboxes = multiSelectDropdownOptionCheckboxes();
    expect(selectOptionCheckboxes[0]).toBeChecked();
  });

  test("4765459: [Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission is on Link Organization page [When] the Select Organizations dropdown is clicked [Then] expect vertical scroll bar to be present in the dropdown", () => {
    customRender();

    openOrganizationDropdown();

    const scrollbar = document.querySelector(".simplebar-scrollbar");
    expect(scrollbar).toBeInTheDocument();
  });

  test("4765055: [Given] an authenticated user with with q4graph:manage:agency:linked-organizations permission is on Link Organization page [Then] expect LINK ORGANIZATIONS button to be disabled", () => {
    customRender();

    const linkOrganizationButton = screen.queryByTestId(idModel.save.id);
    expect(linkOrganizationButton).toBeDisabled();
  });

  test("4766219: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission selects Corporate org from Select Organizations dropdown [When] Link Organization button is clicked [Then] success toast message", async () => {
    const success = jest.fn();
    const error = jest.fn();

    mockUseToastNotificationService.mockReturnValue({
      current: {
        success,
        error,
      } as never,
    });

    customRender();

    openOrganizationDropdown();

    // Select first option
    selectOption(0, 1);

    const linkOrganizationButton = screen.queryByTestId(idModel.save.id) as HTMLElement;
    expect(linkOrganizationButton).toBeInTheDocument();
    expect(linkOrganizationButton).toBeEnabled();
    fireEvent.click(linkOrganizationButton);

    expect(mockLinkOrganizations).toBeCalled();

    await waitFor(
      () => {
        expect(success).toBeCalledWith(OrganizationsLinkMessage.Success);
      },
      { timeout: 5000 },
    );
  });

  test("4766619: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission successfully links Corporate org to Agency [Then ] expect Edit Organization page to be displayed after organizations are linked", async () => {
    customRender();

    openOrganizationDropdown();

    // Select first option
    selectOption(0, 1);

    const linkOrganizationButton = screen.queryByTestId(idModel.save.id) as HTMLElement;
    expect(linkOrganizationButton).toBeInTheDocument();
    expect(linkOrganizationButton).toBeEnabled();
    fireEvent.click(linkOrganizationButton);

    await waitFor(() => {
      expect(mockHistoryPush).toBeCalledTimes(1);
    });

    expect(mockHistoryPush).toBeCalledWith(returnRoute);
  });

  test("5236881: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission can view corporate org not linked to an agency in Select Organizations dropdown [Then] expect Agency Managed text to be not present next to not linked org", () => {
    customRender();

    openOrganizationDropdown();

    const { queryByText } = within(screen.getByTestId(idModel.organizations.menu));
    expect(queryByText(OrganizationLinkedStatus.MANAGED)).not.toBeInTheDocument();
  });

  test("5003129: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission can view corporate org not linked to an agency in Select Organizations dropdown [Then] expect Already Linked text to be not present next to not linked org", () => {
    customRender();

    openOrganizationDropdown();

    const { queryByText } = within(screen.getByTestId(idModel.organizations.menu));
    expect(queryByText(OrganizationLinkedStatus.LINKED)).not.toBeInTheDocument();
  });

  test("5003128: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission can view corporate org linked to an another agency in Select Organizations dropdown [Then] expect Agency Managed text to be present next to linked org", () => {
    mockOrganizationsWithManagedByQuery.mockReturnValue(organizationsQueryWithManagedHook);
    customRender();

    openOrganizationDropdown();

    const { getByText } = within(screen.getByTestId(idModel.organizations.menu));
    expect(getByText(OrganizationLinkedStatus.MANAGED)).toBeInTheDocument();
  });

  test("5003127: [Given] an authenticated user with q4graph:manage:agency:linked-organizations permission can view corporate org linked to an agency in Select Organizations dropdown [Then] expect Already Linked text to be present next to linked org", () => {
    mockOrganizationsWithManagedByQuery.mockReturnValue(organizationsQueryWithManagedHook);
    customRender();

    openOrganizationDropdown();

    const { getAllByText } = within(screen.getByTestId(idModel.organizations.menu));
    expect(getAllByText(OrganizationLinkedStatus.LINKED).length).toBeGreaterThan(1);
  });

  test("8563924: [Given] User is on Link Organization page of an 'Admin' org [When] user searches the list of organizations [Then] any corporate organization’s that have been already linked to an existing Agency type org are available to be selected", () => {
    mockOrganizationsWithManagedByQuery.mockReturnValue(organizationsQueryWithManagedHook);

    mockUseOrganizationQuery.mockReturnValue([
      { ...organizationQueryReturn[0], data: { organization: MockAdminOrganization } },
    ]);

    customRender();

    openOrganizationDropdown();

    const multiSelectDropdownOptionCheckbox = document.querySelector(
      `#${idModel.organizations.menu} .${SelectClassName.Option}`,
    ) as HTMLElement;

    expect(multiSelectDropdownOptionCheckbox).not.toHaveClass(`${SelectClassName.Option}--is-disabled`);
  });

  test("8588546: [Given] I log in as an admin user with 'q4graph:manage:agency:linked-organizations' permission [And] I navigate to the Linked Organizations tab of an agency or admin type org [When] selecting from the managed organizations list [Then] 'Q4 Inc. (Corporate)' organization is excluded from the list", () => {
    const mockQueryHookData = [
      {
        fetching: false,
        error: null,
        data: {
          organizations: {
            items: [
              { ...MockOrganization2, managedBy: mockOrganizationId },
              { ...MockOrganization3, managedBy: mockOrganizationId },
              { ...MockOrganization4, managedBy: MockOrganization2?.id },
              { ...MockQ4IncCorpOrganization },
            ],
          },
        },
        operation: null,
        stale: null,
      },
      jest.fn(),
    ] as unknown as ReturnType<typeof useOrganizationsQuery>;
    mockOrganizationsWithManagedByQuery.mockReturnValue(mockQueryHookData);
    customRender();

    openOrganizationDropdown();

    const { queryAllByText } = within(screen.getByTestId(idModel.organizations.menu));
    expect(queryAllByText("Q4 Inc.").length).toBe(0);
  });

  test("8563925: [Given] User is on Link Organization page of an 'Agency' org [When] user searches the list of organizations [Then] any corporate organization’s that have been already linked to an existing 'Admin' type org are available to be selected", () => {
    const organizationsQueryWithAdminDelegateHook = [
      {
        fetching: false,
        error: null,
        data: {
          organizations: {
            items: [
              { ...MockOrganization2, delegateOrganizationIds: [MockAdminOrganization.id] },
              { ...MockOrganization3, delegateOrganizationIds: [MockAdminOrganization.id] },
              { ...MockOrganization4, delegateOrganizationIds: [MockAdminOrganization?.id] },
            ],
          },
        },
        operation: null,
        stale: null,
      },
      jest.fn(),
    ] as unknown as ReturnType<typeof useOrganizationsQuery>;
    mockOrganizationsWithManagedByQuery.mockReturnValue(organizationsQueryWithAdminDelegateHook);

    mockUseOrganizationQuery.mockReturnValue([
      { ...organizationQueryReturn[0], data: { organization: MockAgencyOrganization } },
    ]);
    customRender();

    openOrganizationDropdown();

    const multiSelectDropdownOptionCheckbox = document.querySelector(
      `#${idModel.organizations.menu} .${SelectClassName.Option}`,
    ) as HTMLElement;

    expect(multiSelectDropdownOptionCheckbox).not.toHaveClass(`${SelectClassName.Option}--is-disabled`);
  });

  test("8563926: [Given] User is on Link Organization page of the 'Agency' type org [When] I search the list of the organizations [Then] any corporate organization’s that have been already linked to an existing 'Agency' type org are not available to be selected", () => {
    mockOrganizationsWithManagedByQuery.mockReturnValue(organizationsQueryWithManagedHook);

    mockUseOrganizationQuery.mockReturnValue([
      { ...organizationQueryReturn[0], data: { organization: MockOrganization12 } },
    ]);
    customRender();

    openOrganizationDropdown();

    const multiSelectDropdownOptionCheckbox = document.querySelector(
      `#${idModel.organizations.menu} .${SelectClassName.Option}`,
    ) as HTMLElement;

    expect(multiSelectDropdownOptionCheckbox).toHaveClass(`${SelectClassName.Option}--is-disabled`);
    const { queryAllByText } = within(screen.getByTestId(idModel.organizations.menu));
    expect(queryAllByText("Q4 Inc.").length).toBe(0);
  });
});
