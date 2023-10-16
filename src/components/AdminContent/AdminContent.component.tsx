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
import { useSession } from "../../contexts/session/useSession.hook";
import { useUser } from "../../contexts/user/user.hook";
import { useAccount } from "../../hooks/useAccount/useAccount.hook";
import { useFeatureFlags } from "../../hooks/useFeatureFlags/useFeatureFlags.hook";
import { mapRoutesByPermission } from "../../utils/permission/permission.utils";
import { RouteTabs } from "../RouteTabs/RouteTabs.component";
import { AdminRoutes } from "../Routes/Routes.component";
import {
  AdminViewClassName,
  AdminViewTabs,
  AdminViewDefault,
  AdminViewIdModel as ViewIdModel,
} from "./AdminContent.definition";

const Component = (): JSX.Element => {
  useV1Brand(Brand.Classic);
  const session = useSession();
  const features = useFeatureFlags();
  const [{ entitlements }] = useAccount();
  const history = useHistory();
  const { onSetAdminClientSelector } = useUser();

  const tabs = useMemo(() => {
    const getPath = (x: Tab) => x.value;
    return mapRoutesByPermission(AdminViewTabs, session.permissions, features, entitlements, getPath);
  }, [entitlements, features, session.permissions]);

  const adminClientSelectorFeatureEnabled = features?.[FeatureFlag.AdminClientAccountAccess];
  const showClientSelectorButton =
    session.permissions?.includes(Permission.ImpersonateClient) && adminClientSelectorFeatureEnabled;

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
              <AdminRoutes entitlements={entitlements} features={features} permissions={session.permissions} />
            </AdminEditProvider>
          </AdminDataProvider>
        </AdminLoadingProvider>
      </Layout>
    </Layout>
  );
};

export const AdminContent = memo(Component);
