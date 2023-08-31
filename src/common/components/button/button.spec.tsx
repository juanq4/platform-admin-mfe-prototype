import { render, screen } from "@testing-library/react";
import React from "react";
import { Button } from "./button.component";

describe("Button", () => {
  it("renders component", () => {
    render(<Button />);
    const buttonElement = screen.getByText("text");
    expect(buttonElement).toBeVisible();
  });
});
