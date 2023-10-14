import { arrayIndexFound, isEmpty, isNullOrWhiteSpace } from "@q4/nimbus-ui";
import type { OrganizationCurrency, OrganizationRegion, OrganizationType } from "@q4/platform-definitions";
import type { Entitlement } from "../components";
import { EntityBase } from "./entity.definition";
import type { Team } from "./team.definition";

export enum OrganizationLinkedStatus {
  LINKED = "Already Linked",
  MANAGED = "Agency Managed",
}

export interface OrganizationStudioDetails {
  subdomain: string;
}

export interface OrganizationTypeOption {
  label: string;
  value: OrganizationType;
}

export interface OrganizationCurrencyOption {
  label: string;
  value: OrganizationCurrency;
}

export interface OrganizationTeamIdOption {
  label: string;
  value: Organization["id"];
  team: Team["name"];
}

export type OrganizationStockInfo = {
  q4SecurityId: string;
  ticker: string;
  exchange: string;
};

export interface OrganizationStockOption {
  label: string;
  value: OrganizationStockInfo;
}

export class Organization extends EntityBase {
  active?: boolean;
  name?: string;
  identifiers?: string[];
  entitlements?: Entitlement[];
  isAdmin?: boolean;
  studio?: OrganizationStudioDetails;
  type?: OrganizationType | string;
  managedBy?: Organization["id"];
  q4SecurityId?: string;
  delegateOrganizationIds?: Organization["id"][];
  region?: OrganizationRegion;
  currency?: OrganizationCurrency;

  constructor(organization?: Partial<Organization>) {
    const { active, identifiers, entitlements, name, q4SecurityId: securityId, ...rest } = organization || {};
    super(rest);

    this.active = active ?? true;
    this.identifiers = identifiers ?? [];
    this.entitlements = entitlements ?? [];
    this.name = !name || isNullOrWhiteSpace(name) ? "" : name;
    this.q4SecurityId = securityId ?? null;

    Object.assign(this, rest);
  }
}

export class OrganizationEditState extends Organization {
  ticker: string;
  exchange: string;

  constructor(organization?: Organization) {
    super(organization);
    this.setTickerAndExchange();
  }

  private setTickerAndExchange?(): void {
    if (isEmpty(this.identifiers)) return;

    const identifierStr = this.identifiers[0] || "";
    const lastDotIdx = identifierStr.lastIndexOf(".");

    if (arrayIndexFound(lastDotIdx)) {
      this.ticker = identifierStr.slice(0, lastDotIdx);
      this.exchange = identifierStr.slice(lastDotIdx + 1);
    }
  }
}

export interface LinkedOrganization extends Organization {
  isDisabled?: boolean;
}

export type OrganizationLinkedOption = OrganizationTypeOption & OrganizationEditState;
export type OrganizationTeamOption = OrganizationTeamIdOption & Organization;
