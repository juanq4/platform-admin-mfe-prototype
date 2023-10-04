import { render, screen } from "../../../utils/testUtils";
import { AccountErrorModal } from "./AccountErrorModal.component";

describe("AccountErrorModal", () => {
  it("7386735: renders component", () => {
    const { container } = render(<AccountErrorModal />);
    expect(container).toMatchSnapshot();
  });

  describe("Error Pages", () => {
    test("4326940: [Given] authenticated user sees account issues error modal [Then] expect 'Logout' button to be present on the error modal", () => {
      render(<AccountErrorModal />);
      expect(screen.getByText("Log out")).toBeVisible();
    });
  });
});
