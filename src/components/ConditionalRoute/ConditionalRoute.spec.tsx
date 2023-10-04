import { MemoryRouter } from "react-router-dom";
import { render, screen } from "../../utils/testUtils";
import { ConditionalRoute } from "./ConditionalRoute.component";

describe("ConditionalRoute", () => {
  it("7386729: is conditionally rendered", () => {
    const path = "/path";
    const text = "hello world";
    const content = () => text;

    const { rerender } = render(
      <MemoryRouter initialEntries={[path]}>
        <ConditionalRoute isExposed={false} render={content} path={path} />
      </MemoryRouter>,
    );
    expect(screen.queryByText(text)).not.toBeInTheDocument();

    rerender(
      <MemoryRouter initialEntries={[path]}>
        <ConditionalRoute isExposed={true} render={content} path={path} />
      </MemoryRouter>,
    );
    expect(screen.getByText(text)).toBeVisible();
  });
});
