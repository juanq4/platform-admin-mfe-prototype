import type { Organization } from "../../../../../../definitions/organization.definition";
import type { User } from "../../../../../../definitions/user.definition";

export interface RoleSelectorProps {
  id: string;
  organization: Organization;
  user: User;
  handleUserChange: <T>(key: keyof User) => (value: T) => void;
  disabled?: boolean;
}
