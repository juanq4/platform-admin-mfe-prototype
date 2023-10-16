import { OrganizationRegion, type MfeProps, OrganizationCurrency } from "@q4/platform-definitions";
import { createMemoryHistory } from "history";

export const DefaultMfeProps: MfeProps = {
  context: {
    userId: "home-user-id",
    organization: {
      id: "org",
      name: "org",
      entitlements: [],
      identifiers: [],
      q4SecurityId: "",
      region: OrganizationRegion.EUROPE,
      currency: OrganizationCurrency.CHF,
    },
    role: [],
    roles: [],
    entitlements: [],
    claims: {
      __raw: "token",
      email: "home_user@q4inc.com",
      email_verified: false,
      name: "home user",
      nickname: "home",
    },
  },
  token: "token",
  history: createMemoryHistory(),
  onError: () => undefined,
  permissions: [],
  brand: "classic",
  user: {
    active: true,
    email: "home_user@q4inc.com",
    firstName: "home",
    friendlyName: "user",
    id: "user-id",
    lastName: "user",
    title: "",
  },
};
