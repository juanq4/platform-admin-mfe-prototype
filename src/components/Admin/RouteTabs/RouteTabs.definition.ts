import { IdModelBase } from "@q4/nimbus-ui";
import type { TabsProps } from "@q4/nimbus-ui";
import type { Key } from "react";
import type { useHistory } from "react-router-dom";

export interface RouteTabsProps extends Omit<TabsProps, "selected" | "onChange"> {
  currentPath: string;
  onRouteChange: ReturnType<typeof useHistory>["push"];
}

export class RouteTabsIdModel extends IdModelBase {
  constructor(id: string, index?: Key, postfix?: string) {
    super(id, index, postfix);
  }
}
