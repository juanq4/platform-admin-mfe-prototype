import { TabsClassName, ConfigProvider as NimbusConfig, StyleGuide } from "@q4/nimbus-ui";
import React from "react";
import { AdminRoutePath } from "../../configurations/navigation.configuration";
import { fireEvent, render, screen } from "../../utils/testUtils";
import { AdminViewTabs } from "../AdminContent/AdminContent.definition";
import { RouteTabs } from "./RouteTabs.component";

describe("Route Tabs Component", () => {
  it("7386718: renders with no props", () => {
    render(<RouteTabs currentPath={null} onRouteChange={null} items={null} />);
  });

  test("1269157: [Given] the first tab is selected [And] the user clicks the same tab [Expect] the same tab to be selected", () => {
    const handleRouteChange = jest.fn();
    const initialTab = AdminViewTabs?.[0];
    const { id, value: path } = initialTab;

    render(
      <NimbusConfig styleGuide={StyleGuide.V1}>
        <RouteTabs currentPath={path} onRouteChange={handleRouteChange} items={AdminViewTabs} />
      </NimbusConfig>,
    );

    const tab = screen.getByTestId(id);
    fireEvent.click(tab);

    expect(handleRouteChange).toBeCalledTimes(0);
    expect(tab).toHaveClass(TabsClassName.ItemWithSelectedModifier);
  });

  test("1269158: [Given] the first tab is selected [And] the user clicks the second tab [Expect] the second tab to be selected", () => {
    const handleRouteChange = jest.fn();
    const initialTab = AdminViewTabs?.[0];
    const { value: path } = initialTab;
    const { rerender } = render(
      <NimbusConfig styleGuide={StyleGuide.V1}>
        <RouteTabs currentPath={path} onRouteChange={handleRouteChange} items={AdminViewTabs} />
      </NimbusConfig>,
    );

    const newTab = AdminViewTabs?.[1];
    const { id: newId, value: newPath } = newTab;

    const tab = screen.getByTestId(newId);
    fireEvent.click(tab);
    rerender(
      <NimbusConfig styleGuide={StyleGuide.V1}>
        <RouteTabs currentPath={newPath} onRouteChange={handleRouteChange} items={AdminViewTabs} />
      </NimbusConfig>,
    );

    expect(tab).toHaveClass(TabsClassName.ItemWithSelectedModifier);
    expect(handleRouteChange).toBeCalledTimes(1);
    expect(handleRouteChange).toBeCalledWith(newPath);
  });

  test("1269159: [Given] the user goes to an invalid route [Expect] the first tab not to be selected", () => {
    const mockRoute = `${AdminRoutePath.Home}/mockAdminRoute`;

    const handleRouteChange = jest.fn();
    render(<RouteTabs currentPath={mockRoute} onRouteChange={handleRouteChange} items={AdminViewTabs} />);

    const initialTab = AdminViewTabs?.[0];
    const tab = screen.getByTestId(initialTab?.id);

    expect(tab).not.toHaveClass(TabsClassName.ItemWithSelectedModifier);
    expect(handleRouteChange).toBeCalledTimes(0);
  });
});
