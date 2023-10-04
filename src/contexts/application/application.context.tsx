import { isTieredEntitlement } from "@q4/platform-sdk-definitions";
import { createContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import type { Application } from "../../configurations/application.configuration";
import { Applications } from "../../configurations/application.configuration";
import { useClaims } from "../../hooks/useClaims/useClaims.hook";
import { getAppEntitlementInUse } from "../../utils";
import type { ApplicationProviderProps, ApplicationState } from "./application.definition";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ApplicationContext = createContext<ApplicationState>(undefined!);

export const ApplicationProvider = (props: ApplicationProviderProps): JSX.Element => {
  const { routes, children } = props;

  const location = useLocation();
  const { entitlements: userEntitlements } = useClaims();

  const application = useMemo(() => {
    const route = routes.find((route) => location.pathname.includes(route.path));
    if (route) {
      document.title = `${route?.label} - Q4 Platform`;
    } else {
      document.title = "Q4 Platform";
    }

    const application = Applications[route?.id as Application];
    const currentEntitlement = getAppEntitlementInUse(userEntitlements, application?.entitlements);
    const { tierName } = isTieredEntitlement(currentEntitlement);

    return {
      ...application,
      tier: tierName,
    };
  }, [location, routes, userEntitlements]);

  return <ApplicationContext.Provider value={application}>{children}</ApplicationContext.Provider>;
};
