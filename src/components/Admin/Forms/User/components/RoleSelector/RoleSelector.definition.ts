import type { Organization, User } from "../../../../../../definitions";

export interface RoleSelectorProps {
  id: string;
  organization: Organization;
  user: User;
  handleUserChange: <T>(key: keyof User) => (value: T) => void;
  disabled?: boolean;
}
