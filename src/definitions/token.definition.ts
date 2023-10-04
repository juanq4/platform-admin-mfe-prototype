const tokenNamespace = "https://connect.q4inc.com";

export const TokenClaim = {
  /**
   * @description When the user is impersonating, this will be the ID of the organization that user belongs to. Otherwise, it will be undefined.
   */
  DelegateOrganizationId: `${tokenNamespace}/delegateOrganizationId`,
  Email: `${tokenNamespace}/email`,
  Entitlements: `${tokenNamespace}/entitlements`,

  /**
   * @deprecated Use NewClaimOrganizationId or DelegateOrganizationId
   * @description This is the organization ID of the impersonated client when impersonating. When not impersonating, it is undefined.
   */
  ManagedOrganizationId: `${tokenNamespace}/managedOrganizationId`,

  /**
   * @deprecated Use NewClaimOrganizationId or DelegateOrganizationId
   * @description This is always the organization that the user belongs to.
   */
  OrganizationId: `${tokenNamespace}/organization`,

  /**
   * @description When the user is impersonating, this will be the client organization's ID. Otherwise it will be the ID of the organization that user belongs to.
   */
  NewClaimOrganizationId: `${tokenNamespace}/organizationId`,
  UserId: `${tokenNamespace}/user`,
  Permissions: `${tokenNamespace}/permissions`,
};
