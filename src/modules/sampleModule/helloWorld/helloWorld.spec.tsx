import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import React from "react";
import { HelloWorld } from "./helloWorld.component";

describe("HelloWorld", () => {
  it("renders component", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <HelloWorld />
      </MockedProvider>,
    );
    const helloWorldElement = screen.getByText("Hello World");

    expect(helloWorldElement).toBeVisible();
    expect(helloWorldElement).toHaveStyle({ backgroundStyle: "" });
  });
});
