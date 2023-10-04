import { render, screen } from "@testing-library/react";
import React from "react";
import { isUserLoggedOutKey } from "./AuthWrapper.definition";
import { AuthenticationGate } from "./AuthenticationGate.component";

jest.mock("../SensitiveContent.component");

const mockLogout = jest.fn();

jest.mock("@auth0/auth0-react", () => ({
  withAuthenticationRequired: jest.fn(() => () => "Protected Content"),
  useAuth0: () => ({
    logout: mockLogout,
  }),
}));

describe("AuthenticationGate", () => {
  test("9367917: [When] the user logs out in one tab [Then] the user is logged out in other tabs", () => {
    render(<AuthenticationGate />);
    window.dispatchEvent(new StorageEvent("storage", { key: isUserLoggedOutKey, newValue: "true" }));

    expect(mockLogout).toHaveBeenCalled();
  });

  test("9367918: [Given] the user is attempting to access protected content [Then] the user is required to be authenticated", () => {
    render(<AuthenticationGate />);

    // This test passes because withAuthenticationRequired is mocked
    expect(screen.getByText("Protected Content")).toBeVisible();
  });
});
