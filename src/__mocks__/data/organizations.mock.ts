import { Entitlement, OrganizationCurrency, OrganizationRegion, OrganizationType } from "@q4/platform-definitions";
import { Organization } from "../../definitions";

export const MockOrganization1 = new Organization({
  active: true,
  id: "0ec5d308-8736-42e1-92eb-077889af8a7d",
  name: "UGI Corporation",
  identifiers: ["ABX.XNYS"],
  entitlements: [],
  type: OrganizationType.CORP,
  currency: OrganizationCurrency.USD,
  region: OrganizationRegion.NORTH_AMERICA,
});
export const MockOrganization2 = new Organization({
  active: true,
  id: "bb420769-2a66-44ff-9631-4aaa4de40b01",
  name: "MedReLeaf Inc.",
});
export const MockOrganization3 = new Organization({
  active: true,
  id: "1446f546-39e5-4aec-8c60-04b52a4a8fab",
  name: "C.H. Robinson Worldwide, Inc.",
  identifiers: ["CHR.XNYS"],
});
export const MockOrganization4 = new Organization({
  active: true,
  id: "ca332ab4-e664-4504-bfde-ed86db35bd7d",
  name: "Ritchie Bros. Auctioneers",
});
export const MockOrganization5 = new Organization({
  active: true,
  id: "45e80fa5-da8e-4a92-83fe-892ebadce60a",
  name: "Valvoline Inc",
});
export const MockOrganization6 = new Organization({
  active: true,
  id: "dd55e16d-23f2-4454-adbf-5e486ccd7ae0",
  name: "Finning International Inc.",
});
export const MockOrganization7 = new Organization({
  active: true,
  id: "1093454e-cde4-4ddb-8eb7-dbbda52919ef",
  name: "Q4 Inc",
  isAdmin: true,
});
export const MockOrganization8 = new Organization({
  active: true,
  id: "6427c40f-8349-4c43-ad95-b0ba5ec907b8",
  name: "Sellas Life Sciences",
});
export const MockOrganization9 = new Organization({
  active: true,
  id: "972ad416-ce01-430c-8c99-7022860697c9",
  name: "Cars.com",
  identifiers: ["CAR.XNYS"],
});
export const MockOrganization10 = new Organization({
  active: true,
  id: "e7b39d33-b90e-4f5a-8fec-7177288e523c",
  name: "Real Matters",
});
export const MockOrganization11 = new Organization({
  active: true,
  id: "21230be5-0300-461b-87cd-2ade4d23fd1d",
  name: "Continental Building Products, Inc.",
});
export const MockOrganization12 = new Organization({
  active: true,
  id: "09cf9cf0-6622-4801-a3cd-30e7a4b11a2a",
  name: "Test & Co, Inc.",
  identifiers: ["TEC.TECS"],
  entitlements: [],
  type: OrganizationType.AGENCY,
});
export const MockOrganization13 = new Organization({
  active: true,
  id: "7f6ba8d8-fd4c-4911-bfb3-722c2e9fa37b",
  name: "Test & Co, Inc.",
  identifiers: ["TEC.TECS"],
  entitlements: [],
  type: null,
  region: OrganizationRegion.NORTH_AMERICA,
  currency: OrganizationCurrency.USD,
});
export const MockOrganization14 = new Organization({
  active: true,
  id: "b0efb333-6e1a-486b-ab5b-801b7e0039b2",
  name: "Fancy Test & Co, Inc.",
  identifiers: ["FTC.FTCS"],
  entitlements: [],
  type: OrganizationType.CORP,
  managedBy: MockOrganization12.id,
  delegateOrganizationIds: [MockOrganization12.id],
});
export const MockOrganization15 = new Organization({
  active: false,
  id: "b0efb333-6e1a-486b-ab5b-801b7e0039fe",
  name: "Inactive & Co, Inc.",
  identifiers: ["INA.ACT"],
  entitlements: [],
  type: OrganizationType.CORP,
  managedBy: MockOrganization12.id,
  delegateOrganizationIds: [MockOrganization12.id],
});

export const MockOrganization16 = new Organization({
  active: true,
  id: "d94e3ff6-9d23-48ed-a97d-dc2f6c443232",
  name: "Neo Test Inc.",
  type: OrganizationType.CORP,
  region: OrganizationRegion.NORTH_AMERICA,
  currency: OrganizationCurrency.USD,
});

export const MockOrganization17 = new Organization({
  active: true,
  id: "6477495d-393b-484c-b82d-c282848df2ce",
  name: "Space Ship Inc.",
  type: OrganizationType.CORP,
  identifiers: ["SPX.ACT"],
});

export const MockOrganization18 = new Organization({
  active: true,
  id: "09cf9cf0-6622-4801-a3cd-30e7a4b22pp8",
  name: "Admin Org",
  identifiers: ["ADM.IN"],
  entitlements: [],
  type: OrganizationType.ADMIN,
});

export const MockOrganization19 = new Organization({
  active: true,
  id: "0ec5d308-8736-42e1-92eb-077889af8a7z",
  name: "Test Inc.",
  identifiers: ["ABC.XYZA"],
  entitlements: [],
  type: OrganizationType.CORP,
});

export const MockQ4IncCorpOrganization = new Organization({
  active: true,
  id: "afca4bc6-b6d8-4b61-bbad-6418e5e2f25b",
  isAdmin: false,
  name: "Q4 Inc.",
  identifiers: ["QFOR.TSX"],
  entitlements: ["studio"],
  type: OrganizationType.CORP,
});

export const MockCorporateOrganization = new Organization({
  active: true,
  id: "0ec5d308-8736-42e1-92eb-077889af8a7d",
  name: "Corporate Org",
  identifiers: ["CORP.IN"],
  entitlements: [],
  type: OrganizationType.CORP,
  isAdmin: false,
});

export const MockOrganizations = [
  MockOrganization1,
  MockOrganization2,
  MockOrganization3,
  MockOrganization4,
  MockOrganization5,
  MockOrganization6,
  MockOrganization7,
  MockOrganization8,
  MockOrganization9,
  MockOrganization10,
];

export const MockOrganizationWithEntitlements = new Organization({
  active: true,
  id: "1093454e-cde4-4ddb-8eb7-dbbda52919ef",
  name: "Q4 Inc",
  entitlements: [Entitlement.Studio],
});

export const MockAdminOrganization = new Organization({
  active: true,
  id: "09cf9cf0-6622-4801-a3cd-30e7a4b22pp8",
  name: "Admin Org",
  identifiers: ["ADM.IN"],
  entitlements: [],
  type: OrganizationType.ADMIN,
});

export const MockAgencyOrganization = new Organization({
  active: true,
  id: "09cf9cf0-6622-4801-a3cd-30e7a4b11a11",
  name: "Agency Org",
  identifiers: ["AGE.NCY"],
  entitlements: [],
  type: OrganizationType.AGENCY,
});
