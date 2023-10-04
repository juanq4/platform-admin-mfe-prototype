import type { NavigationRoute } from "@q4/nimbus-ui";
import type { ReactNode } from "react";
import type { IApplication } from "../../configurations/application.configuration";

export interface ApplicationState extends IApplication {
  tier: string;
}

export interface ApplicationProviderProps {
  routes: NavigationRoute[];
  children: ReactNode;
}
