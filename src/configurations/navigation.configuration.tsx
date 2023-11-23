export enum AdminRoutePath {
  Home = "/app/admin",
  Users = "/app/admin/users",
  UsersCreate = "/app/admin/users/edit",
  UsersEdit = "/app/admin/users/edit/:userId",
  Organizations = "/app/admin/organizations",
  OrganizationsCreate = "/app/admin/organizations/add",
  OrganizationsEdit = "/app/admin/organizations/edit/:id",
  OrganizationsView = "/app/admin/organizations/view/:id",
  OrganizationsEditLinkedOrganizations = "/app/admin/organizations/edit/:id/linked-organizations",
  OrganizationsUserCreate = "/app/admin/organizations/edit/:id/user/add",
  OrganizationsUserEdit = "/app/admin/organizations/edit/:id/user/edit/:userId",
  OrganizationsUserEditWithReturnUrl = "/app/admin/organizations/edit/:id/user/edit/:userId/?returnUrl=:returnUrl",
  OrganizationsTeamCreate = "/app/admin/organizations/edit/:id/team/add",
  OrganizationsTeamEdit = "/app/admin/organizations/edit/:id/team/:teamId/edit",
}

export enum RoutePathIdLabel {
  Id = "id",
  UserId = "userId",
  ReturnUrl = "returnUrl",
  TeamId = "teamId",
}
