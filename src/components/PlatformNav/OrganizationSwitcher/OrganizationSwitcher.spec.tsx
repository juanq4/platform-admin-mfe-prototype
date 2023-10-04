import { OrganizationType } from "@q4/platform-definitions";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useUser } from "../../../contexts";
import { AccoundSwitcherConfirmationModalText } from "../../../trunk/TopNavigation/components/AccountSwitcherConfirmationModal.defintion";
import { getOrganizationLabelWithTicker } from "../../../utils";
import { OrganizationSwitcher } from "./OrganizationSwitcher.component";

jest.mock("../../../contexts");
jest.mock("../../../utils");

const label = "test • 123";

describe("OrganizationSwitcher", () => {
  beforeAll(() => {
    (useUser as jest.Mock).mockReturnValue({
      organization: {
        type: OrganizationType.CORP,
      },
    });
    (getOrganizationLabelWithTicker as jest.Mock).mockReturnValue(label);
  });

  describe("Unit Tests", () => {
    test("10688459: [Given] the organization switcher is visible [Then] the organization name and ticker are visible", () => {
      render(<OrganizationSwitcher />);
      expect(screen.getByRole("button", { name: label })).toBeVisible();
    });
  });

  describe("Integration Tests", () => {
    test("10816181: [When] I click the Organization Switcher button [Then] the confirmation modal is visible", async () => {
      render(<OrganizationSwitcher />);
      fireEvent.click(screen.getByRole("button", { name: label }));
      expect(await screen.findByText(AccoundSwitcherConfirmationModalText.Title)).toBeVisible();
    });

    test("10816182: [When] I close the confirmation modal [Then] the confirmation modal is not visible", () => {
      render(<OrganizationSwitcher />);
      fireEvent.click(screen.getByRole("button", { name: label }));
      fireEvent.click(screen.getByRole("button", { name: AccoundSwitcherConfirmationModalText.Cancel }));

      expect(screen.queryByText(AccoundSwitcherConfirmationModalText.Title)).not.toBeInTheDocument();
    });
  });
});
