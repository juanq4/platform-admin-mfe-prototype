import { EngagementAnalyticsTier, Entitlement } from "@q4/platform-definitions";
import React from "react";
import { fireEvent, render, screen } from "../../../../utils/testUtils";
import { EngagementAnalyticsTierSelectorComponent } from "./EngagementAnalyticsTierSelector.component";
import type { EngagementAnalyticsTierSelectorProps } from "./EngagementAnalyticsTierSelector.definition";
import {
  EngagementAnalyticsTierFriendlyNames,
  EngagementAnalyticsTierSelectorIdModel,
  StringConstants,
} from "./EngagementAnalyticsTierSelector.definition";

describe("Entitlements Component", () => {
  const idModel = new EngagementAnalyticsTierSelectorIdModel("mockEntitlements");
  const handleTierSelect = jest.fn();
  const engagementAnalyticsEntitlement = Entitlement.EngagementAnalyticsStarter;

  const mockProps: EngagementAnalyticsTierSelectorProps = {
    id: idModel.id,
    entitlements: [engagementAnalyticsEntitlement],
    onTierSelect: handleTierSelect,
  };

  function customRender(props: EngagementAnalyticsTierSelectorProps = mockProps) {
    return render(<EngagementAnalyticsTierSelectorComponent {...props} />);
  }

  test("8098687: Given that I am an administrator of Capital Connect [And] I can see a list of Engagement Analytics entitlement tiers to select from [Then] I can see an option for the Legacy tier as disabled [And] I can see an option for the Starter tier as enabled [And] I can see an option for the Base tier as enabled", async () => {
    customRender();

    expect(await screen.findByText(StringConstants.title)).toBeVisible();
    expect(await screen.findByText(EngagementAnalyticsTierFriendlyNames.Legacy)).toBeVisible();
    expect(await screen.findByText(EngagementAnalyticsTierFriendlyNames.Starter)).toBeVisible();
    expect(await screen.findByText(EngagementAnalyticsTierFriendlyNames.Base)).toBeVisible();
  });

  test("8098688: [Given] that I am an administrator of Capital Connect [And] I can see a list of Engagement Analytics entitlement tiers to select from [Then] I can see an option for the Legacy tier as disabled [And] I can see an option for the Starter tier as enabled [And] I can see an option for the Base tier as enabled", () => {
    customRender();

    expect(screen.getByRole("radio", { name: EngagementAnalyticsTierFriendlyNames.Legacy })).toBeDisabled();
    expect(screen.getByRole("radio", { name: EngagementAnalyticsTierFriendlyNames.Starter })).toBeEnabled();
    expect(screen.getByRole("radio", { name: EngagementAnalyticsTierFriendlyNames.Base })).toBeEnabled();
  });

  test("8098689: [Given] that I am an administrator of Capital Connect [And] the organization is already entitled for Engagement Analytics Legacy tier [And] I can see a list of Engagement Analytics entitlement tiers to select from [Then] I can see that the disabled Legacy tier option is pre-selected", () => {
    customRender({
      ...mockProps,
      entitlements: [EngagementAnalyticsTier.EngagementAnalytics],
    });

    expect(screen.getByRole("radio", { name: EngagementAnalyticsTierFriendlyNames.Legacy })).toBeDisabled();
    expect(screen.getByRole("radio", { name: EngagementAnalyticsTierFriendlyNames.Legacy })).toBeChecked();
  });

  test("8098690, 8098691: [Given] that I am an administrator of Capital Connect [And] I can see a list of Engagement Analytics entitlement tiers to select from [When] I select a tier different from the one that the organization is already entitled to [Then] the newly selected tier is shown as selected [And] the previously selected tier is shown as deselected", () => {
    const { rerender } = customRender({
      ...mockProps,
      entitlements: [EngagementAnalyticsTier.EngagementAnalyticsBase],
    });
    const expectedChange = EngagementAnalyticsTier.EngagementAnalyticsStarter;

    expect(screen.getByRole("radio", { name: EngagementAnalyticsTierFriendlyNames.Base })).toBeChecked();
    expect(screen.getByRole("radio", { name: EngagementAnalyticsTierFriendlyNames.Starter })).not.toBeChecked();

    fireEvent.click(screen.getByText(EngagementAnalyticsTierFriendlyNames.Starter));

    expect(handleTierSelect).toBeCalledWith(expectedChange);

    rerender(<EngagementAnalyticsTierSelectorComponent {...mockProps} entitlements={[expectedChange]} />);

    expect(screen.getByRole("radio", { name: EngagementAnalyticsTierFriendlyNames.Base })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: EngagementAnalyticsTierFriendlyNames.Starter })).toBeChecked();
  });
});
