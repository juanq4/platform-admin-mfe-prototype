import React from "react";
import { BroadcastEventType, useBroadcast, useUser } from "../../../contexts";
import { fireEvent, render, screen, waitFor } from "../../../utils/testUtils";
import { AccountSwitcherConfirmationModal } from "./AccountSwitcherConfirmationModal.component";
import { AccoundSwitcherConfirmationModalText } from "./AccountSwitcherConfirmationModal.defintion";

jest.mock("../../../contexts");
const mockedUseUser = useUser as jest.Mock;
const mockedBroadcast = useBroadcast as jest.Mock;

const mockedPostMessage = jest.fn();

describe("AccountSwitcherConfirmationModal", () => {
  beforeAll(() => {
    mockedUseUser.mockReturnValue({ onManagedOrganizationIdChange: jest.fn() });
    mockedBroadcast.mockReturnValue({ postMessage: mockedPostMessage });
  });

  test("10856034: [Given] the Return to account selection button is click [Then] it should send Account Switched event to broadcast channel", async () => {
    render(<AccountSwitcherConfirmationModal visible={true} onCloseRequest={jest.fn()} organizationName={"Test Inc."} />);
    expect(await screen.findByText(AccoundSwitcherConfirmationModalText.Title)).toBeVisible();

    const button = screen.getByRole("button", { name: AccoundSwitcherConfirmationModalText.Return });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedPostMessage).toHaveBeenCalledWith(BroadcastEventType.AccountSwitched);
    });
  });
});
