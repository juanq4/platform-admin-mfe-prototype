import { Entitlement, OrganizationType } from "@q4/platform-definitions";
import { Organization, User } from "../../definitions";
import { getAccountErrors } from "./account.utils";

const claims = {
  organizationId: "organization id",
  userId: "user id",
  email: "email",
  entitlements: [Entitlement.Studio],
};

const user = new User({
  firstName: "Bobby",
  lastName: "Testman",
  roles: ["role"],
});

const corporateOrg = new Organization({
  type: OrganizationType.CORP,
});

const agency = new Organization({
  type: OrganizationType.AGENCY,
});

describe("getAccountErrors", () => {
  it("7393067: returns missing organizationId claim", () => {
    expect(getAccountErrors({ ...claims, organizationId: null }, user, corporateOrg)).toBe("missing organizationId claim");
  });

  it("7393068: returns missing userId claim", () => {
    expect(getAccountErrors({ ...claims, userId: null }, user, corporateOrg)).toBe("missing userId claim");
  });

  it("7393069: returns missing email claim", () => {
    expect(getAccountErrors({ ...claims, email: null }, user, corporateOrg)).toBe("missing email claim");
  });

  it("7393070: returns missing entitlements claim", () => {
    expect(getAccountErrors({ ...claims, entitlements: null }, user, corporateOrg)).toBe("missing entitlements claim");
  });

  it("7393071: does not return missing entitlements claim for agency type organization", () => {
    expect(getAccountErrors({ ...claims, entitlements: null }, user, agency)).toBe(null);
  });

  it("7393072: returns missing user roles", () => {
    expect(getAccountErrors(claims, { ...user, roles: [] }, corporateOrg)).toBe("missing user roles");
  });
});
