import { Permission } from "@q4/platform-definitions";
import { memo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AccessSwitch } from "../../components/AccessSwitch/AccessSwitch.component";
import { ConditionalRoute } from "../../components/ConditionalRoute/ConditionalRoute.component";
import { NotFoundError } from "../../components/Errors/NotFoundError/NotFoundError.component";
import { MfeApp } from "../../components/MfeApp/MfeApp.component";
import { MfeKey } from "../../components/MfeApp/MfeApp.definition";
import { NotificationPreferences } from "../../components/NotificationPreferences/NotificationPreferences.component";
import { AppRoutePath, AdminRoutePath } from "../../configurations";
import { useUser } from "../../contexts";
import { useAccess } from "../../hooks/useAccess/useAccess.hook";
import { Admin } from "../../modules/Admin/Admin.view";
import { PurchaseIntent } from "../../views/PurchaseIntent/PurchaseIntent.view";
import type { RoutesBaseProps } from "./Routes.definition";

const Home = () => <MfeApp id={MfeKey.Home} />;
const EventManagementApp = () => <MfeApp id={MfeKey.EventManagementApp} />;
const Insight = () => <MfeApp id={MfeKey.Insight} />;
const Request = () => <MfeApp id={MfeKey.Request} />;
const EngagementAnalytics = () => <MfeApp id={MfeKey.EngagementAnalytics} />;
const MeetingScheduler = () => <MfeApp id={MfeKey.MeetingScheduler} />;
const Earnings = () => <MfeApp id={MfeKey.Earnings} />;
const Crm = () => <MfeApp id={MfeKey.CRM} />;
const Workflow = () => <MfeApp id={MfeKey.Workflow} />;

const RoutesBase = (props: RoutesBaseProps): JSX.Element => {
  const { entitlements, permissions, features } = props;

  const access = useAccess();
  const user = useUser();

  return (
    <Switch>
      <ConditionalRoute path={[AdminRoutePath.Home, `${AppRoutePath.Default}/*`]} isExposed={access.hasAdmin}>
        <AccessSwitch entitlements={entitlements} permissions={permissions} features={features}>
          <Route component={Admin} />
        </AccessSwitch>
      </ConditionalRoute>
      <ConditionalRoute
        isExposed={access.hasHome}
        exact
        path={[AppRoutePath.Home, `${AppRoutePath.Home}/*`]}
        component={Home}
      />
      <ConditionalRoute
        isExposed={access.hasInsight}
        exact
        path={[AppRoutePath.Insight, `${AppRoutePath.Insight}/*`]}
        component={Insight}
      />
      <ConditionalRoute
        isExposed={access.hasWebsite}
        exact
        path={[AppRoutePath.Request, `${AppRoutePath.Request}/*`]}
        component={Request}
      />
      <ConditionalRoute
        isExposed={access.hasEngagementAnalytics}
        exact
        path={[AppRoutePath.EngagementAnalytics, `${AppRoutePath.EngagementAnalytics}/*`]}
        component={EngagementAnalytics}
      />
      <ConditionalRoute
        isExposed={access.hasMeetingScheduler}
        exact
        path={[AppRoutePath.MeetingScheduler, `${AppRoutePath.MeetingScheduler}/*`]}
        component={MeetingScheduler}
      />
      <ConditionalRoute
        isExposed={access.hasEarningsManagement}
        exact
        path={[AppRoutePath.Earnings, `${AppRoutePath.Earnings}/*`]}
        component={Earnings}
      />
      <ConditionalRoute
        isExposed={access.hasNotificationPreferences}
        exact
        path={AppRoutePath.Notifications}
        component={NotificationPreferences}
      />
      <ConditionalRoute
        isExposed={access.hasWorkflow}
        exact
        path={[AppRoutePath.Workflow, `${AppRoutePath.Workflow}/*`]}
        component={Workflow}
      />
      <ConditionalRoute isExposed={access.hasCRM} exact path={[AppRoutePath.CRM, `${AppRoutePath.CRM}/*`]} component={Crm} />
      <ConditionalRoute
        isExposed={access.hasEventManagementApp}
        exact
        path={[AppRoutePath.EventManagement, `${AppRoutePath.EventManagement}/*`]}
        component={EventManagementApp}
      />
      <Route exact path={AppRoutePath.PurchaseIntent} component={PurchaseIntent} />

      {access.hasAdmin && user.isImpersonatingClient === false && (
        <>
          <>{permissions.includes(Permission.ReadUsers) && <Redirect from="/" to="/admin/users" />}</>
          <>{permissions.includes(Permission.ReadOrgs) && <Redirect from="/" to="/admin/organizations" />}</>
        </>
      )}
      {access.hasHome && <Redirect from="/" to={AppRoutePath.Home} />}
      {access.hasInsight && <Redirect from="/" to={AppRoutePath.Insight} />}
      {access.hasWebsite && <Redirect from="/" to={AppRoutePath.Request} />}
      {access.hasEngagementAnalytics && <Redirect from="/" to={AppRoutePath.EngagementAnalytics} />}
      {access.hasMeetingScheduler && <Redirect from="/" to={AppRoutePath.MeetingScheduler} />}
      {access.hasEarningsManagement && <Redirect from="/" to={AppRoutePath.Earnings} />}
      {access.hasEventManagementApp && <Redirect from="/" to={AppRoutePath.EventManagement} />}
      {access.hasWorkflow && <Redirect from="/" to={AppRoutePath.Workflow} />}
      <Route component={NotFoundError} />
    </Switch>
  );
};

export const Routes = memo(RoutesBase);
