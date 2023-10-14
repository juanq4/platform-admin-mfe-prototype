import type { Organization } from "@q4/platform-definitions";
import { EntityBase } from "./entity.definition";
import type { User } from "./user.definition";

export class Team extends EntityBase {
  name: string;
  organizationId: Organization["id"];
  managedOrganizationIds: Organization["id"][];
  userIds: User["id"][];

  constructor(team?: Partial<Team>) {
    super(team);
    Object.assign(this, team);
    this.managedOrganizationIds = this.managedOrganizationIds ?? [];
    this.userIds = this.userIds ?? [];
  }
}
