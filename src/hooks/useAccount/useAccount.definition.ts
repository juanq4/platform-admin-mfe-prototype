import type { Organization, User } from "../../definitions";

export interface AccountHookProps {
  organizationId?: Organization["id"];
}

export type AccountHookModel = [account: Pick<Organization, "entitlements" | "active" | "name" | "type">, user: User];
