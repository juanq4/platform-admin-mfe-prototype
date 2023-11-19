import { render, screen } from "@testing-library/react";
import React from "react";
import { ApolloWrapper } from "./ApolloWrapper.component";

describe("ApolloWrapper", () => {
  it("renders children", () => {
    render(<ApolloWrapper>Test</ApolloWrapper>);
    expect(screen.getByText("Test")).toBeVisible();
  });
});
