import { Permission } from "@q4/platform-definitions";
import { memo, useContext } from "react";
import { Route } from "react-router";
import { Redirect, useLocation } from "react-router-dom";
import { OrganizationsLink } from "../../../modules/Admin/Organizations/Details/Link/OrganizationsLink.view";
import { OrganizationDetails } from "../../../modules/Admin/Organizations/Details/OrganizationDetails.view";
import { OrganizationTeamCreate } from "../../../modules/Admin/Organizations/Details/Team/Create/OrganizationTeamCreate.view";
import { OrganizationTeamEdit } from "../../../modules/Admin/Organizations/Details/Team/Edit/OrganizationTeamEdit.view";
import { OrganizationsUserEdit } from "../../../modules/Admin/Organizations/Details/User/Edit/OrganizationsUserEdit.view";
import { Organizations } from "../../../modules/Admin/Organizations/Organizations.view";
import { OrganizationsUserCreate } from "../../../modules/Admin/User/Create/OrganizationsUserCreate.view";
import { UsersCreate } from "../../../modules/Admin/User/Create/UsersCreate.view";
import { UsersEdit } from "../../../modules/Admin/User/Edit/UserEdit.view";
import { Users } from "../../../modules/Admin/User/Users.view";
import { getDefaultAdminRoute } from "../../../utils/route/route.utils";
import { AccessSwitch } from "../../AccessSwitch/AccessSwitch.component";
import { ConditionalRoute } from "../../ConditionalRoute/ConditionalRoute.component";
import { NotFoundError } from "../../Errors/NotFoundError/NotFoundError.component";
import type { AccessSwitchProps } from "../../component.definition";
import { AdminLoadingSpinner } from "../LoadingSpinner/LoadingSpinner.component";
import { AdminRoutesIdModel } from "./Routes.definition";

const AdminRoutesBase = (props: AccessSwitchProps): JSX.Element => {
  const [loading] = useContext(AdminLoadingContext);
  const { entitlements, features, permissions } = props;

  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const background = location?.state && location?.state?.background;

  return (
    <>
      <AdminLoadingSpinner id={AdminRoutesIdModel.loadingSpinner.id} loading={loading} />
      <AccessSwitch
        entitlements={entitlements}
        features={features}
        permissions={permissions}
        location={background || location}
      >
        <Route exact path={AdminRoutePath.Organizations} component={Organizations} />
        <Route exact path={AdminRoutePath.OrganizationsCreate} component={OrganizationDetails} />
        <Route exact path={AdminRoutePath.OrganizationsEdit} component={OrganizationDetails} />
        <Route exact path={AdminRoutePath.OrganizationsView} component={OrganizationDetails} />
        <Route exact path={AdminRoutePath.OrganizationsUserCreate} component={OrganizationsUserCreate} />
        <Route path={AdminRoutePath.OrganizationsUserEdit} component={OrganizationsUserEdit} />
        <Route exact path={AdminRoutePath.OrganizationsTeamCreate} component={OrganizationTeamCreate} />
        <Route exact path={AdminRoutePath.OrganizationsTeamEdit} component={OrganizationTeamEdit} />
        <ConditionalRoute
          isExposed={permissions?.includes(Permission.ManageLinkedOrgs)}
          exact
          path={AdminRoutePath.OrganizationsEditLinkedOrganizations}
          component={OrganizationsLink}
        />
        <Route exact path={AdminRoutePath.Users} component={Users} />
        <Route exact path={AdminRoutePath.UsersCreate} component={UsersCreate} />
        <Route path={AdminRoutePath.UsersEdit} component={UsersEdit} />
        <Redirect exact from={AdminRoutePath.Home} to={getDefaultAdminRoute(permissions)} />
        <Route component={() => <NotFoundError id={AdminRoutesIdModel.notFound.id} />} />
      </AccessSwitch>
      {/* If react-router-dom location contains background state then open the below routes as a modal  */}
      {background && (
        <AccessSwitch entitlements={entitlements} features={features} permissions={permissions}>
          <Route path={AdminRoutePath.OrganizationsUserEdit} component={OrganizationsUserEdit} />
          <Route path={AdminRoutePath.UsersEdit} component={UsersEdit} />
          <Route path={AdminRoutePath.OrganizationsUserCreate} component={OrganizationsUserCreate} />
          <Route path={AdminRoutePath.UsersCreate} component={UsersCreate} />

          <Route path={AdminRoutePath.OrganizationsCreate} component={OrganizationDetails} />
          <Route path={AdminRoutePath.OrganizationsEdit} component={OrganizationDetails} />
          <Route path={AdminRoutePath.OrganizationsView} component={OrganizationDetails} />
        </AccessSwitch>
      )}
    </>
  );
};

export const AdminRoutes = memo(AdminRoutesBase);
