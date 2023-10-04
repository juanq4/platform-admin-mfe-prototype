import type { UserContextState } from "../../contexts";
import { MockOrganization1, MockUser2 } from "../data";

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
