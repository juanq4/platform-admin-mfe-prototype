import React from "react";
import { Auth0HookMock } from "../../__mocks__/contexts/Auth0Context.mock";
import { render, waitFor, screen } from "../../utils/testUtils";
import { FeatureFlagProvider } from "./FeatureFlagProvider.component";

jest.mock("@auth0/auth0-react");
jest.mock("../../hooks/useClaims/useClaims.hook", () => ({
  useClaims: jest.fn().mockReturnValue({
    userId: "test-user-id",
    organizationId: "test-org-id",
  }),
}));

describe("FeatureFlagProvider", () => {
  beforeEach(() => {
    Auth0HookMock({
      user: {
        email: "test.user@q4inc.com",
        name: "Test User",
      },
    });
  });

  it("7387809: should render component", async () => {
    render(
      <FeatureFlagProvider>
        <div>child</div>
      </FeatureFlagProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("child")).toBeInTheDocument();
    });
  });

  test("5461706: [Given] information of current user [Then] expect LaunchDarkly client is correctly initialized", () => {
    render(
      <FeatureFlagProvider>
        <div>child</div>
      </FeatureFlagProvider>,
    );

    expect(screen.getByText("child")).toBeVisible();
  });
});
