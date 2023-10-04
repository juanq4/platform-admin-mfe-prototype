import { render } from "../../../utils/testUtils";
import { AppError } from "./AppError.component";

describe("AppError", () => {
  it("7386736: renders component", () => {
    const { container } = render(<AppError />);
    expect(container).toMatchSnapshot();
  });
});
