import type { UserContextState } from "../../contexts/user/user.definition";
import { MockOrganization1 } from "../data/organizations.mock";
import { MockUser2 } from "../data/users.mock";

export const UserContextMock: UserContextState = {
  userId: MockUser2.id,
  organizationId: MockOrganization1.id,
  user: MockUser2,
  organization: MockOrganization1,
  isManagedOrganizationLoading: false,
  isImpersonatingClient: undefined,
  managedOrganizationId: null,
  onManagedOrganizationIdChange: jest.fn(),
  adminShowClientSelector: false,
  onSetAdminClientSelector: jest.fn(),
  setClaims: jest.fn(),
};
