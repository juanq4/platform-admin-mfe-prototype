import React from "react";
import { BroadcastEventType, useBroadcast, useUser } from "../../contexts";
import { act, render, screen, waitFor } from "../../utils/testUtils";
import { ImpersonationGate } from "./ImpersonationGate.component";
import { AccountSwitchedModal } from "./ImpersonationGate.definition";

jest.mock("../../contexts");
const mockedUseUser = useUser as jest.Mock;
const mockedBroadcast = useBroadcast as jest.Mock;

describe("ImpersonationGate", () => {
  const testContent = "Test Content";
  const organizationName = "Test Inc.";
  const ticker = "AMC";

  let eventHandler: ((evt: unknown) => void) | undefined = undefined;
  const mockBroadcastObject = {
    addEventListener: (_: string, handler: () => void) => {
      eventHandler = handler;
    },
    removeEventListener: jest.fn(),
  };

  beforeAll(() => {
    mockedUseUser.mockReturnValue({ organization: { name: organizationName, identifiers: [`${ticker}.MFE`] } });
    mockedBroadcast.mockReturnValue(mockBroadcastObject);
  });

  afterEach(() => {
    eventHandler = undefined;
  });

  test("10857526: [Given] the component is rendered [When] received account switched event from broadcast channel [Then] it should show account switched modal with correct organization name", async () => {
    render(
      <ImpersonationGate>
        <div>{testContent}</div>
      </ImpersonationGate>,
    );

    await waitFor(() => {
      expect(eventHandler).toBeDefined();
    });

    act(() => {
      eventHandler?.(BroadcastEventType.AccountSwitched);
    });

    expect(await screen.findByText(AccountSwitchedModal.title)).toBeVisible();

    expect(screen.getByText(`${organizationName} | ${ticker}`)).toBeVisible();
  });

  test("10857527: [Given] the component is rendered [Then] the child component is rendered correctly", () => {
    render(
      <ImpersonationGate>
        <div>{testContent}</div>
      </ImpersonationGate>,
    );

    expect(screen.getByText(testContent)).toBeVisible();
  });
});
