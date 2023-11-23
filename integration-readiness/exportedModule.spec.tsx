/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { OrganizationRegion, type MfeProps, OrganizationCurrency } from "@q4/platform-definitions";
import { render } from "@testing-library/react";
import React from "react";
import Admin from "../src/modules/Admin/Admin.component";

describe("Exported module", () => {
  let defaultModuleProps: MfeProps;
  let consoleErrorMock: jest.SpyInstance;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorMock.mockReset();
  });

  beforeEach(() => {
    defaultModuleProps = {
      context: {
        userId: "seed-user-id",
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
          email: "seed_user@q4inc.com",
          email_verified: false,
          name: "seed user",
          nickname: "seed",
        },
      },
      token: "token",
      history: {} as History,
      onError: () => {
        return;
      },
      permissions: [],
      brand: "peacock",
      user: {
        active: true,
        email: "seed_user@q4inc.com",
        firstName: "seed",
        friendlyName: "user",
        id: "user-id",
        lastName: "user",
        title: "",
      },
    };
  });

  describe("Admin", () => {
    it("throws when userId is missing from context", () => {
      defaultModuleProps.context!.userId = "";
      expect(() => render(<Admin {...defaultModuleProps} />)).toThrowError("userId is missing from context");
    });

    it("throws when roles is missing from context", () => {
      (defaultModuleProps.context!.roles as unknown) = null;
      expect(() => render(<Admin {...defaultModuleProps} />)).toThrowError("roles is missing from context");
    });

    it("throws when name is missing from organization", () => {
      defaultModuleProps.context!.organization.name = "";
      expect(() => render(<Admin {...defaultModuleProps} />)).toThrowError("name is missing from organization");
    });

    it("throws when id is missing from organization", () => {
      defaultModuleProps.context!.organization.id = "";
      expect(() => render(<Admin {...defaultModuleProps} />)).toThrowError("id is missing from organization");
    });

    it("throws when entitlements is missing from organization", () => {
      (defaultModuleProps.context!.organization.entitlements as unknown) = null;
      expect(() => render(<Admin {...defaultModuleProps} />)).toThrowError("entitlements is missing from organization");
    });

    it("throws when identifiers is missing from organization", () => {
      (defaultModuleProps.context!.organization.identifiers as unknown) = null;
      expect(() => render(<Admin {...defaultModuleProps} />)).toThrowError("identifiers is missing from organization");
    });

    it("throws when token is missing", () => {
      defaultModuleProps.token = "";
      expect(() => render(<Admin {...defaultModuleProps} />)).toThrowError("token is missing");
    });
  });
});
