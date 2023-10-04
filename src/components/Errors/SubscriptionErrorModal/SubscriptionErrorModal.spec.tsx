import { render, screen } from "../../../utils/testUtils";
import { SubscriptionErrorModal } from "./SubscriptionErrorModal.component";

describe("SubscriptionErrorModal", () => {
  it("7386738: renders component", () => {
    const { container } = render(<SubscriptionErrorModal />);
    expect(container).toMatchSnapshot();
  });

  describe("Error Pages", () => {
    test("4326943: [Given] authenticated user sees inactive subscription error modal due to deactivated organization or deactivated user [Then] expect 'Logout' button to be present on the error modal", () => {
      render(<SubscriptionErrorModal />);
      expect(screen.getByText("Log out")).toBeVisible();
    });
  });
});
