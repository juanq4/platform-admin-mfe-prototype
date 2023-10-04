import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useUser } from "../../../contexts";
import { getOrganizationLabelWithTicker } from "../../../utils";
import { OrganizationSwitcher } from "./OrganizationSwitcher.component";

jest.mock("../../../contexts");
jest.mock("../../../utils");

const label = "my-org";

describe("OrganizationSwitcher", () => {
  beforeAll(() => {
    (useUser as jest.Mock).mockReturnValue({});
    (getOrganizationLabelWithTicker as jest.Mock).mockReturnValue(label);
  });

  test("10816183: [When] I click the button containing the organization label [Then] the onClick callback is called", () => {
    const onClick = jest.fn();
    render(<OrganizationSwitcher onClick={onClick} />);

    // TODO: Remove hidden: true when Nimbus button is accessible
    fireEvent.click(screen.getByRole("button", { name: label, hidden: true }));

    expect(onClick).toHaveBeenCalled();
  });
});
