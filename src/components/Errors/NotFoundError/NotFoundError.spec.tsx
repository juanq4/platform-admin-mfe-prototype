import React from "react";
import { render, screen } from "../../../utils/testUtils";
import { NotFoundError } from "./NotFoundError.component";
import { noAccessErrorSubtitle, notFoundErrorTitle } from "./NotFoundError.definition";

jest.mock("react-router-dom", () => {
  const orginal = jest.requireActual("react-router-dom");
  return {
    ...orginal,
    useHistory: () => ({
      location: { pathname: "/app/admin" },
      goBack: jest.fn(),
    }),
  };
});

const button = "Go Back";

describe("NotFoundError", () => {
  it("7386737: renders", () => {
    render(<NotFoundError />);

    expect(screen.getByText(notFoundErrorTitle)).toBeVisible();
    expect(screen.getByText(noAccessErrorSubtitle)).toBeVisible();
  });

  describe("Error Pages", () => {
    test("4326933: [Given] authenticated user lands on error/restricted page after navigating to invalid/restricted URL [Then] expect 'Go Back' button to be visible", () => {
      Object.defineProperty(document, "referrer", {
        configurable: true,
        value: "test",
      });

      render(<NotFoundError />);

      expect(screen.getByText(button)).toBeVisible();
    });

    test("4326934: [Given] authenticated user lands on error/restricted page after direct access to invalid/restricted URL [Then] expect 'Go Back' button to be not visible", () => {
      render(<NotFoundError />);

      expect(screen.queryByText(button)).toBeNull;
    });
  });
});
