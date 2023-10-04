import React from "react";
import { render, screen } from "../../utils/testUtils";
import { ApplicationTierBadge } from "./ApplicationTierBadge.component";

describe("ApplicationTierBadge", () => {
  test("11541031: [Given] the tier name [Then] renders the badge with this name", () => {
    const tierName = "basic";
    render(<ApplicationTierBadge name={tierName} />);
    expect(screen.queryByText(tierName)).toBeVisible();
  });
});
