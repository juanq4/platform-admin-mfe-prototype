import { Permission } from "@q4/platform-definitions";
import React, { memo, useContext } from "react";
import { Route } from "react-router";
import { Redirect, useLocation } from "react-router-dom";
import { AdminRoutePath } from "../../configurations/navigation.configuration";
import { AdminLoadingContext } from "../../contexts/loading/loading.context";
import { getDefaultAdminRoute } from "../../utils/route/route.utils";
import { AccessSwitch } from "../AccessSwitch/AccessSwitch.component";
import type { AccessSwitchProps } from "../AccessSwitch/AccessSwitch.definition";
import { OrganizationsLink } from "../AdminContent/Organizations/Details/Link/OrganizationsLink.component";
import { OrganizationDetails } from "../AdminContent/Organizations/Details/OrganizationDetails.component";
import { OrganizationTeamCreate } from "../AdminContent/Organizations/Details/Team/Create/OrganizationTeamCreate.component";
import { OrganizationTeamEdit } from "../AdminContent/Organizations/Details/Team/Edit/OrganizationTeamEdit.component";
import { OrganizationsUserEdit } from "../AdminContent/Organizations/Details/User/Edit/OrganizationsUserEdit.component";
import { Organizations } from "../AdminContent/Organizations/Organizations.component";
import { OrganizationsUserCreate } from "../AdminContent/User/Create/OrganizationsUserCreate.component";
import { UsersCreate } from "../AdminContent/User/Create/UsersCreate.component";
import { UsersEdit } from "../AdminContent/User/Edit/UserEdit.component";
import { Users } from "../AdminContent/User/Users.component";
import { ConditionalRoute } from "../ConditionalRoute/ConditionalRoute.component";
import { NotFoundError } from "../Errors/NotFoundError/NotFoundError.component";
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
