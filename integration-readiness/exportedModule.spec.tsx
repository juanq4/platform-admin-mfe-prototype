/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { MfeProps } from "@q4/platform-definitions";
import { render } from "@testing-library/react";
import React from "react";
import { Admin } from "../src/components/AdminContent/AdminContent.component";

describe("SampleModule", () => {
  let defaultSampleModuleProps: MfeProps;
  let consoleErrorMock: jest.SpyInstance;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  beforeEach(() => {
    defaultSampleModuleProps = {
      context: {
        userId: "seed-user-id",
        organization: {
          id: "org",
          name: "org",
          entitlements: [],
          identifiers: [],
          q4SecurityId: "",
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

  afterAll(() => {
    consoleErrorMock.mockReset();
  });

  describe("Mfe Props", () => {
    it("throws when userId is missing from context", () => {
      defaultSampleModuleProps.context!.userId = "";
      expect(() => render(<Admin {...defaultSampleModuleProps} />)).toThrowError("userId is missing from context");
    });

    it("throws when roles is missing from context", () => {
      (defaultSampleModuleProps.context!.roles as unknown) = null;
      expect(() => render(<Admin {...defaultSampleModuleProps} />)).toThrowError("roles is missing from context");
    });

    it("throws when name is missing from organization", () => {
      defaultSampleModuleProps.context!.organization.name = "";
      expect(() => render(<Admin {...defaultSampleModuleProps} />)).toThrowError("name is missing from organization");
    });

    it("throws when id is missing from organization", () => {
      defaultSampleModuleProps.context!.organization.id = "";
      expect(() => render(<Admin {...defaultSampleModuleProps} />)).toThrowError("id is missing from organization");
    });

    it("throws when entitlements is missing from organization", () => {
      (defaultSampleModuleProps.context!.organization.entitlements as unknown) = null;
      expect(() => render(<Admin {...defaultSampleModuleProps} />)).toThrowError(
        "entitlements is missing from organization",
      );
    });

    it("throws when identifiers is missing from organization", () => {
      (defaultSampleModuleProps.context!.organization.identifiers as unknown) = null;
      expect(() => render(<Admin {...defaultSampleModuleProps} />)).toThrowError("identifiers is missing from organization");
    });

    it("throws when token is missing", () => {
      defaultSampleModuleProps.token = "";
      expect(() => render(<Admin {...defaultSampleModuleProps} />)).toThrowError("token is missing");
    });
  });

  // if BEM css is used, verify the namespace is defined
  it("contains class name as namespace", () => {
    const { container } = render(<Admin {...defaultSampleModuleProps} />);

    expect(container.firstElementChild).toHaveClass("seed__container");
  });
});
