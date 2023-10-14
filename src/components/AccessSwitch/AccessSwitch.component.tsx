import { Children, memo, useMemo } from "react";
import { Switch } from "react-router-dom";
import { mapRoutesByPermission } from "../../utils/permission/permission.utils";
import type { AccessSwitchProps, AccessSwitchRoute } from "./AccessSwitch.definition";

const AccessSwitchBase = (props: AccessSwitchProps): JSX.Element => {
  const { children, features, permissions, entitlements, ...rest } = props;

  const routes = useMemo(() => {
    const originalRoutes = Children.toArray(children) as AccessSwitchRoute[];

    const getPath = (route: AccessSwitchRoute): string => {
      const pathProp = route?.props?.path as string | string[]; // type assertion is needed until this TS issue is resolved for ReadOnly arrays: https://github.com/microsoft/TypeScript/issues/17002
      if (Array.isArray(pathProp)) {
        return pathProp[0];
      }
      return pathProp;
    };
    return mapRoutesByPermission(originalRoutes, permissions, features, entitlements, getPath);
  }, [children, entitlements, features, permissions]);

  return <Switch {...rest}>{routes}</Switch>;
};

export const AccessSwitch = memo(AccessSwitchBase);
