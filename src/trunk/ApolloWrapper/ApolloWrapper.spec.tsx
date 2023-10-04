import { render, screen } from "../../utils/testUtils";
import { ApolloWrapper } from "./ApolloWrapper.component";

describe("ApolloWrapper", () => {
  it("7386723: renders children", () => {
    render(
      <ApolloWrapper>
        <div>Test</div>,
      </ApolloWrapper>,
    );
    expect(screen.getByText("Test")).toBeVisible();
  });
});
