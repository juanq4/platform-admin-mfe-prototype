import { Entitlement } from "@q4/platform-definitions";
import { mockFlags } from "jest-launchdarkly-mock";
import React from "react";
import { NimbusConfig } from "../../__mocks__/contexts/NimbusConfig.mock";
import { getAppWrapper } from "../../__mocks__/utils/wrappers";
import { FeatureFlag } from "../../configurations/feature.configuration";
import { getOrganizationDetailsMode } from "../../utils/organization/organization.utils";
import { fireEvent, render, screen } from "../../utils/testUtils";
import { OrganizationDetailsMode } from "../AdminContent/Organizations/Details/OrganizationDetails.definition";
import { Entitlements } from "./Entitlements.component";
import { EntitlementsIdModel } from "./Entitlements.definition";
import type { EntitlementsProps } from "./Entitlements.definition";

jest.mock("../../../contexts/session/useSession.hook");
const mockUseClaims = useClaims as jest.Mock;

jest.mock("../../../utils/organization/organization.utils");
const mockGetOrganizationDetailsMode = getOrganizationDetailsMode as jest.Mock;

describe("Entitlements Component", () => {
  const getSitesByOrg = jest.fn();
  const handleAdd = jest.fn();
  const handleRemove = jest.fn();
  const idModel = new EntitlementsIdModel("mockEntitlements");
  const studioEntitlement = Entitlement.Studio;

  const nullProps: EntitlementsProps = {
    organizationId: null,
    entitlements: null,
    sitesByOrgResp: null,
    orgSubdomain: null,
    onOrgSubdomainChange: null,
    getSitesByOrg: null,
    onAdd: null,
    onRemove: null,
  };

  const mockProps: EntitlementsProps = {
    id: idModel.id,
    organizationId: null,
    entitlements: [],
    sitesByOrgResp: null,
    orgSubdomain: null,
    onOrgSubdomainChange: null,
    getSitesByOrg,
    onAdd: handleAdd,
    onRemove: handleRemove,
  };

  const mockWithEntitlementProps = {
    ...mockProps,
    entitlements: [studioEntitlement],
  };

  function addEntitlement() {
    const menuButton = screen.getByTestId(idModel.menuButton.id);
    fireEvent.click(menuButton);
    const menu = screen.getByTestId(idModel.menu.id);
    expect(menu).toBeInTheDocument();
    const studioAddButton = screen.getByTestId(idModel.menuAddStudio.id);
    fireEvent.click(studioAddButton);
    expect(menu).not.toBeInTheDocument();
    expect(handleAdd).toBeCalledWith(studioEntitlement);
  }

  function removeButtonWithConfirmationModal() {
    const studioTab = screen.getByTestId(idModel.studioTab);
    const sitesTable = screen.getByTestId(idModel.sitesTable.id);
    expect(studioTab).toBeInTheDocument();
    expect(sitesTable).toBeInTheDocument();
    const trashButton = screen.getByTestId(idModel.studioTabRemove.id);
    fireEvent.click(trashButton);
    const messageModal = screen.getByTestId(idModel.removeMessage.id);
    expect(messageModal).toBeInTheDocument();
    return { messageModal, studioTab, sitesTable };
  }

  function removeEntitlement() {
    const { messageModal } = removeButtonWithConfirmationModal();
    const confirmButton = screen.getByTestId(idModel.removeMessageConfirm.id);
    fireEvent.click(confirmButton);
    expect(handleRemove).toBeCalledWith(studioEntitlement);
    expect(messageModal).not.toBeInTheDocument();
  }

  beforeAll(() => {
    mockGetOrganizationDetailsMode.mockReturnValue(OrganizationDetailsMode.Edit);
    mockUseClaims.mockReturnValue({});
  });

  test("7386002: [Given] no props are provided [Expect] the component to render", () => {
    render(
      <NimbusConfig.ConfigProvider>
        <Entitlements {...nullProps} />
      </NimbusConfig.ConfigProvider>,
      {
        container: getAppWrapper(),
      },
    );
    const rootElement = screen.queryByTestId("root");
    expect(rootElement).toMatchSnapshot();
  });

  test("1728217: [Given] the user tries to add the Studio entitlement [Expect] Studio tab and Sites table to appear", () => {
    const { rerender } = render(<Entitlements {...mockProps} />);
    addEntitlement();
    rerender(<Entitlements {...mockWithEntitlementProps} />);
    const studioTab = screen.getByTestId(idModel.studioTab);
    const sitesTable = screen.getByTestId(idModel.sitesTable.id);
    expect(studioTab).toBeInTheDocument();
    expect(sitesTable).toBeInTheDocument();
  });

  test("1728218: [Given] the user clicks the trash can on an existing Studio entitlement [Expect] message modal to appear [And] when Cancel button is clicked [Expect] modal to close and Studio tab and Sites table to still exist", () => {
    render(<Entitlements {...mockWithEntitlementProps} />);
    const { messageModal, studioTab, sitesTable } = removeButtonWithConfirmationModal();
    const cancelButton = screen.getByTestId(idModel.removeMessageCancel.id);
    fireEvent.click(cancelButton);
    expect(messageModal).not.toBeInTheDocument();
    expect(studioTab).toBeInTheDocument();
    expect(sitesTable).toBeInTheDocument();
  });

  test("1728219: [Given] the user clicks the trash can on an existing Studio entitlement [Expect] message modal to appear [And] when X (close button) is clicked [Expect] modal to close and Studio tab and Sites table to still exist", () => {
    render(<Entitlements {...mockWithEntitlementProps} />);
    const { messageModal, studioTab, sitesTable } = removeButtonWithConfirmationModal();
    const closeButton = screen.getByTestId(idModel.removeMessage.exit.id);
    fireEvent.click(closeButton);
    expect(messageModal).not.toBeInTheDocument();
    expect(studioTab).toBeInTheDocument();
    expect(sitesTable).toBeInTheDocument();
  });

  test("1728220: [Given] the user clicks the trash can on an existing Studio entitlement [Expect] message modal to appear [And] when Confirm button is clicked [Expect] modal to close and Studio tab and Sites table to be removed", () => {
    const { rerender } = render(<Entitlements {...mockWithEntitlementProps} />);
    const studioTab = screen.getByTestId(idModel.studioTab);
    const sitesTable = screen.getByTestId(idModel.sitesTable.id);
    removeEntitlement();
    rerender(<Entitlements {...mockProps} />);
    expect(studioTab).not.toBeInTheDocument();
    expect(sitesTable).not.toBeInTheDocument();
  });

  test("1737328: [Given] the user adds the Studio entitlement [And] then removes it [Expect] Studio tab and Sites table to appear and also be removed", () => {
    const { rerender } = render(<Entitlements {...mockProps} />);
    addEntitlement();
    rerender(<Entitlements {...mockWithEntitlementProps} />);
    const studioTab = screen.getByTestId(idModel.studioTab);
    const sitesTable = screen.getByTestId(idModel.sitesTable.id);
    expect(studioTab).toBeInTheDocument();
    expect(sitesTable).toBeInTheDocument();
    removeEntitlement();
    rerender(<Entitlements {...mockProps} />);
    expect(studioTab).not.toBeInTheDocument();
    expect(sitesTable).not.toBeInTheDocument();
  });

  test("5520487: [Given] an administrator is on the organization details page [And] The Meeting Scheduler feature flag is on [Expect] Meeting Scheduler to be an entitlement option", () => {
    mockFlags({
      [FeatureFlag.MeetingScheduler]: true,
    });

    render(<Entitlements {...mockProps} />);
    const menuButton = screen.getByTestId(idModel.menuButton.id);
    fireEvent.click(menuButton);
    const menu = screen.getByTestId(idModel.menu.id);
    expect(menu).toBeInTheDocument();

    const schedulerAddButton = screen.getByTestId(idModel.menuAddMeetingScheduler.id);
    expect(schedulerAddButton).toBeInTheDocument();
  });

  test("5520488: [Given] an administrator is on the organization details page [And] The Meeting Scheduler feature flag is off [Expect] Meeting Scheduler not to be an entitlement option", () => {
    mockFlags({
      [FeatureFlag.MeetingScheduler]: false,
    });

    render(<Entitlements {...mockProps} />);
    const menuButton = screen.getByTestId(idModel.menuButton.id);
    fireEvent.click(menuButton);
    const menu = screen.getByTestId(idModel.menu.id);
    expect(menu).toBeInTheDocument();

    const schedulerAddButton = screen.queryByTestId(idModel.menuAddMeetingScheduler.id);
    expect(schedulerAddButton).not.toBeInTheDocument();
  });
});
