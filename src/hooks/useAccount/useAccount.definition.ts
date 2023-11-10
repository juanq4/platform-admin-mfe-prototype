import type { Organization } from "../../definitions/organization.definition";
import type { User } from "../../definitions/user.definition";

export interface AccountHookProps {
  organizationId?: Organization["id"];
}

export type AccountHookModel = [account: Pick<Organization, "entitlements" | "active" | "name" | "type">, user: User];
