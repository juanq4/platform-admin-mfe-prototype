import "./AdminContent.scss";
import {
  Banner,
  BannerControlType,
  BannerSize,
  Brand,
  Button,
  ButtonTheme,
  Layout,
  LayoutHeight,
  LayoutPadding,
  LayoutTheme,
  useV1Brand,
} from "@q4/nimbus-ui";
import type { Tab } from "@q4/nimbus-ui";
import { Permission } from "@q4/platform-definitions";
import React, { memo, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { FeatureFlag } from "../../configurations/feature.configuration";
import { AdminDataProvider } from "../../contexts/data/data.context";
import { AdminEditProvider } from "../../contexts/edit/edit.context";
import { AdminLoadingProvider } from "../../contexts/loading/loading.context";
import { useUser } from "../../contexts/user/user.hook";
import { useClaims } from "../../hooks/useClaims/useClaims.hook";
import { useFeatureFlags } from "../../hooks/useFeatureFlags/useFeatureFlags.hook";
import { mapRoutesByPermission } from "../../utils/permission/permission.utils";
import { RouteTabs } from "../RouteTabs/RouteTabs.component";
import { Routes } from "../Routes/Routes.component";
import {
  AdminViewClassName,
  AdminViewTabs,
  AdminViewDefault,
  AdminViewIdModel as ViewIdModel,
} from "./AdminContent.definition";

const Component = (): JSX.Element => {
  useV1Brand(Brand.Classic);
  const claims = useClaims();
  const features = useFeatureFlags();
  const history = useHistory();
  const { onSetAdminClientSelector } = useUser();

  const tabs = useMemo(() => {
    const getPath = (x: Tab) => x.value;
    return mapRoutesByPermission(AdminViewTabs, claims.permissions, features, claims.entitlements, getPath);
  }, [claims.entitlements, features, claims.permissions]);

  const adminClientSelectorFeatureEnabled = features?.[FeatureFlag.AdminClientAccountAccess];
  const showClientSelectorButton =
    claims.permissions?.includes(Permission.ImpersonateClient) && adminClientSelectorFeatureEnabled;

  return (
    <Layout
      className={AdminViewClassName.Base}
      id={ViewIdModel.id}
      padding={LayoutPadding.None}
      flex={false}
      height={LayoutHeight.Viewport}
    >
      <Banner
        id={ViewIdModel.banner.id}
        className={AdminViewClassName.Banner}
        badgeIcon={AdminViewDefault.Icon}
        title={AdminViewDefault.Title}
        size={BannerSize.Medium}
        alignChildrenWithBadge
        controls={[
          {
            children: showClientSelectorButton && (
              <Button
                className={AdminViewClassName.BannerButton}
                onClick={() => onSetAdminClientSelector(true)}
                theme={ButtonTheme.DarkSlate}
                label={AdminViewDefault.GoToClientAccountLabel}
              />
            ),
            type: BannerControlType.Element,
          },
        ]}
      >
        <RouteTabs currentPath={history?.location?.pathname} items={tabs} onRouteChange={history.push} />
      </Banner>
      <Layout
        id={ViewIdModel.content.id}
        className={AdminViewClassName.Content}
        theme={LayoutTheme.White}
        flex={false}
        padding={LayoutPadding.None}
      >
        {/* @jm fixme should move to Admin component */}
        <AdminLoadingProvider>
          <AdminDataProvider>
            <AdminEditProvider>
              <Routes entitlements={claims.entitlements} features={features} permissions={claims.permissions} />
            </AdminEditProvider>
          </AdminDataProvider>
        </AdminLoadingProvider>
      </Layout>
    </Layout>
  );
};

export const AdminContent = memo(Component);
