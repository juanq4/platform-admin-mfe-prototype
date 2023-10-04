import { EntityBase } from "./entity.definition";
import type { Organization } from "./organization.definition";

export enum UserApplications {
  Desktop = "desktop",
  Platform = "platform",
}

export class User extends EntityBase {
  organizationId: Organization["id"];
  active?: boolean;
  email: string;
  firstName: string;
  lastName: string;
  friendlyName?: string;
  title?: string;
  roles?: string[];
  search?: string;
  emailApp?: UserApplications;

  constructor(user?: Partial<User>) {
    super(user);
    Object.assign(this, user);
    this.active = this.active ?? true;
    this.search = this.search ?? `${this.id} ${this.email} ${this.firstName} ${this.lastName} ${this.friendlyName}`;
  }
}

export type UserWithTeams = User & {
  teams?: string;
};
