import { render, screen } from "../../utils/testUtils";
import { accountErrorTitle } from "./AccountErrorModal/AccountErrorModal.definition";
import { AppFallback } from "./AppFallback.component";
import { subscriptionErrorTitle } from "./SubscriptionErrorModal/SubscriptionErrorModal.definition";

describe("AppFallback", () => {
  it("7386731: renders AppError component", () => {
    render(<AppFallback />);
    expect(screen.getByText("Oops! Something went wrong.")).toBeVisible();
  });

  it("7386732: renders AccountErrorModal component", () => {
    render(<AppFallback error={new Error("Account")} />);
    expect(screen.getByText(accountErrorTitle)).toBeVisible();
  });

  it("7386733: renders SubscriptionErrorModal component", () => {
    render(<AppFallback error={new Error("Subscription")} />);
    expect(screen.getByText(subscriptionErrorTitle)).toBeVisible();
  });
});
