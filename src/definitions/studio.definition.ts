export interface StudioApiResponse {
  subdomain: string;
  siteName: string;
  defaultDomain: string;
}

export interface StudioApiModel {
  organizationId: string;
}

export interface Studio {
  studioSiteId: string;
  liveLink: string;
}

export interface OrganizationSiteFilter {
  active: SiteFilterActive;
  live: SiteFilterLive;
  status: SiteFilterStatus;
}

export enum SiteFilterStatus {
  all = "all",
  implementations = "implementations",
  live = "live",
  old = "old",
}

export enum SiteFilterActive {
  active = "active",
  inactive = "inactive",
  all = "all",
}

export enum SiteFilterLive {
  live = "live",
  notlive = "notlive",
  all = "all",
}
