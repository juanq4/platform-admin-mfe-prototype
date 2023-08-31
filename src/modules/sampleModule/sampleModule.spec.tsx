import type { MfeProps } from "@q4/platform-definitions";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import pckg from "../../../package.json";
import { SampleModule } from "./sampleModule.component";

describe("App", () => {
  let defaultSampleModuleProps: MfeProps;

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

  it("renders module", () => {
    render(<SampleModule {...defaultSampleModuleProps} />);
    expect(screen.getByText("Hello World")).toBeVisible();
  });

  it("4216073: [Given] a MFE Seed version number, [Then] expect the version is appended to the head in the source.", async () => {
    const { container } = render(<SampleModule {...defaultSampleModuleProps} />);

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const meta = container.parentElement?.parentElement?.querySelector(`meta[name="${pckg.name}-version"]`);
      expect(meta).toHaveAttribute("content", pckg.version);
    });
  });

  it("4216610: [Given] a MFE Seed version tag exists in document, [Then] next component render will not create new version tag.", async () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    let wrap = render(<SampleModule {...defaultSampleModuleProps} />);

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      const meta = wrap.container.parentElement?.parentElement?.querySelector(`meta[name="${pckg.name}-version"]`);
      expect(meta).toBeInTheDocument();
    });
    wrap.unmount();

    wrap = render(<SampleModule {...defaultSampleModuleProps} />);

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      const meta = wrap.container.parentElement?.parentElement?.querySelectorAll(`meta[name="${pckg.name}-version"]`);
      expect(meta?.item(0)).toHaveAttribute("content", pckg.version);
    });
  });
});
