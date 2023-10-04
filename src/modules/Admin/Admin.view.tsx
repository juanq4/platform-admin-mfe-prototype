import "./Admin.view.scss";
import {
  Banner,
  BannerControlType,
  BannerSize,
  Brand,
  Button,
  ButtonTheme,
  ConfigProvider as NimbusConfig,
  Layout,
  LayoutHeight,
  LayoutPadding,
  LayoutTheme,
  StyleGuide,
  useV1Brand,
} from "@q4/nimbus-ui";
import type { Tab } from "@q4/nimbus-ui";
import { Permission } from "@q4/platform-definitions";
import { memo, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { RouteTabs } from "../../components/Admin/RouteTabs";
import { AdminRoutes } from "../../components/Admin/Routes";
import { FeatureFlag } from "../../configurations";
import { AdminLoadingProvider, AdminEditProvider, AdminDataProvider, useUser } from "../../contexts";
import { useAccount, useClaims, useFeatureFlags } from "../../hooks";
import { mapRoutesByPermission } from "../../utils";
import { AdminViewClassName, AdminViewTabs, AdminViewDefault, AdminViewIdModel as ViewIdModel } from "./Admin.definition";

const AdminBase = (): JSX.Element => {
  useV1Brand(Brand.Classic);
  const claims = useClaims();
  const features = useFeatureFlags();
  const [{ entitlements }] = useAccount();
  const history = useHistory();
  const { permissions } = useClaims();
  const { onSetAdminClientSelector } = useUser();

  const tabs = useMemo(() => {
    const getPath = (x: Tab) => x.value;
    return mapRoutesByPermission(AdminViewTabs, claims.permissions, features, entitlements, getPath);
  }, [entitlements, features, claims.permissions]);

  const adminClientSelectorFeatureEnabled = features?.[FeatureFlag.AdminClientAccountAccess];
  const showClientSelectorButton = permissions?.includes(Permission.ImpersonateClient) && adminClientSelectorFeatureEnabled;

  return (
    <NimbusConfig styleGuide={StyleGuide.V1}>
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
          <AdminLoadingProvider>
            <AdminDataProvider>
              <AdminEditProvider>
                <AdminRoutes entitlements={entitlements} features={features} permissions={claims.permissions} />
              </AdminEditProvider>
            </AdminDataProvider>
          </AdminLoadingProvider>
        </Layout>
      </Layout>
    </NimbusConfig>
  );
};

export const Admin = memo(AdminBase);
