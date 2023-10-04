import React from "react";
import { render } from "../../utils/testUtils";
import { BroadcastProvider } from "./broadcast.context";
import { shellChannelName } from "./broadcast.context.definition";

describe("Broadcast Context", () => {
  test("10893608: [When] broadcast provider is initialized [Then] shell broadcast channel is created", () => {
    render(<BroadcastProvider />);
    expect(BroadcastChannel).toHaveBeenCalledWith(shellChannelName);
  });
});
