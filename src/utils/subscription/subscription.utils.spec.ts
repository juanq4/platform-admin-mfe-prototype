import { getSubscriptionErrors } from "./subscription.utils";

describe("getSubscriptionErrors", () => {
  it("7394983: returns user is not active", () => {
    expect(getSubscriptionErrors(false, true)).toBe("user is not active");
  });

  it("7394984: returns organization is not active", () => {
    expect(getSubscriptionErrors(true, false)).toBe("organization is not active");
  });
});
