import React from "react";
import { BrowserRouter } from "react-router-dom";
import { EngagementAnalyticsLink, Q4DesktopLink, WebsiteLink } from "../../../../configurations";
import { fireEvent, render, screen } from "../../../../utils/testUtils";
import { DiscoverLink } from "./DiscoverLink.component";

describe("Discover Link", () => {
  test("11472386: [Given] the Website Management link is visible in the Discover section [Then] expect correct UI", () => {
    render(
      <BrowserRouter>
        <DiscoverLink route={WebsiteLink} onClick={jest.fn} />
      </BrowserRouter>,
    );

    expect(screen.getByRole("img", { name: WebsiteLink?.label })).toBeVisible();
    expect(screen.getByText(WebsiteLink?.description)).toBeVisible();
  });

  test("11472387: [Given] the Engagement Analytics link is visible in the Discover section [Then] expect correct UI", () => {
    render(
      <BrowserRouter>
        <DiscoverLink route={EngagementAnalyticsLink} onClick={jest.fn} />
      </BrowserRouter>,
    );

    expect(screen.getByRole("img", { name: EngagementAnalyticsLink?.label })).toBeVisible();
    expect(screen.getByText(EngagementAnalyticsLink?.description)).toBeVisible();
  });

  test("11472388: [Given] the Desktop link is visible in the Discover section [Then] expect correct UI", () => {
    render(
      <BrowserRouter>
        <DiscoverLink route={Q4DesktopLink} onClick={jest.fn} />
      </BrowserRouter>,
    );

    expect(screen.getByRole("img", { name: Q4DesktopLink?.label })).toBeVisible();
    expect(screen.getByText(Q4DesktopLink?.description)).toBeVisible();
  });

  test("11472389: [Given] a Discover link is clicked [Then] the path is opened in a new window", () => {
    const originalWindowOpen = window.open;
    window.open = jest.fn();

    render(
      <BrowserRouter>
        <DiscoverLink route={WebsiteLink} onClick={jest.fn} />
      </BrowserRouter>,
    );
    const link = screen.getByTestId(WebsiteLink.id);
    fireEvent.click(link);

    expect(window.open).toHaveBeenCalledWith(WebsiteLink.websiteLink, "_blank");

    // Restore the original window.open method
    window.open = originalWindowOpen;
  });
});
