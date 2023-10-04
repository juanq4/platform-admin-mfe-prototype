import type { IdToken } from "@auth0/auth0-react";
import type { BaseComponentWithChildrenProps } from "@q4/nimbus-ui";
import type { Organization, User } from "../../definitions";

export interface UserContextState {
  // TODO: remove uncertainty in IDs
  claims?: IdToken;
  userId?: string;
  organizationId?: string;
  currentOrganizationId?: string;
  user: Partial<User>;
  organization: Organization;
  adminShowClientSelector: boolean;
  isManagedOrganizationLoading: boolean;
  isImpersonatingClient?: boolean;
  managedOrganizationId: string | null;
  onManagedOrganizationIdChange: (id: string) => void;
  onSetAdminClientSelector: (value: boolean) => void;
  setClaims: (claims: IdToken) => void;
}

export type UserProviderProps = Pick<BaseComponentWithChildrenProps, "children" | "key">;
