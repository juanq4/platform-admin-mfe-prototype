import { ArrayNotFoundIndex, ComponentSizeModifier, Tabs, TabsTheme } from "@q4/nimbus-ui";
import React, { memo, useCallback, useMemo } from "react";
import type { RouteTabsProps } from "./RouteTabs.definition";
import { RouteTabsIdModel } from "./RouteTabs.definition";

const RouteTabsBase = (props: RouteTabsProps): JSX.Element => {
  const { id, currentPath, items, onRouteChange } = props;
  const idModel = new RouteTabsIdModel(id);

  const findTabIndex = useCallback(
    (path: string): number => items?.findIndex((x) => x.value === path) ?? ArrayNotFoundIndex,
    [items],
  );

  const currentTab = useMemo(() => {
    return findTabIndex(currentPath);
  }, [currentPath, findTabIndex]);

  function handleTabChange(_index: number, path: string) {
    onRouteChange?.(path);
  }

  return (
    <Tabs
      id={idModel.id}
      theme={TabsTheme.Slate}
      size={ComponentSizeModifier.Compact}
      selected={currentTab}
      items={items}
      onChange={handleTabChange}
    />
  );
};

export const RouteTabs = memo(RouteTabsBase);
