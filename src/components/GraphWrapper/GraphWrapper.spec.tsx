import { Auth0HookMock } from "../../__mocks__/contexts/Auth0Context.mock";
import { render, screen } from "../../utils/testUtils";
import { GraphWrapper } from "./GraphWrapper.component";

Auth0HookMock();

describe("GraphWrapper", () => {
  const mockChildId = "MockChild";

  it("7387810: renders children", () => {
    render(
      <GraphWrapper>
        <div id={mockChildId} />,
      </GraphWrapper>,
    );

    const child = screen.getByTestId(mockChildId);
    expect(child).toBeInTheDocument();
  });
});
