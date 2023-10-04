import { createSerializer } from "@emotion/jest";
import { Browser, Device, OS } from "@q4/nimbus-ui";
import * as nimbus from "@q4/nimbus-ui";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "../../utils/testUtils";
import { Notifications } from "./Notifications.component";

expect.addSnapshotSerializer(createSerializer());

describe("Notifications ", () => {
  const deviceConfigHookSpy = jest.spyOn(nimbus, "useDeviceConfig");
  const mockDeviceConfig = {
    device: Device.Desktop,
    os: OS.Windows,
    osVersion: "10",
    browser: Browser.Chrome,
    browserVersion: "100",
  };

  beforeEach(() => {
    deviceConfigHookSpy.mockReturnValue(mockDeviceConfig);
  });

  it("7390814: renders component", () => {
    const { container } = render(
      <BrowserRouter>
        <Notifications />
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it("7390815: renders desktop label", () => {
    render(
      <BrowserRouter>
        <Notifications />
      </BrowserRouter>,
    );
    expect(screen.getByText("Only show unread")).toBeVisible();
  });

  it.skip("7390816: renders mobile label", () => {
    deviceConfigHookSpy.mockReturnValue({
      ...mockDeviceConfig,
      device: Device.Mobile,
      os: OS.Android,
    });
    render(
      <BrowserRouter>
        <Notifications />
      </BrowserRouter>,
    );
    expect(screen.getByText("Unread only")).toBeVisible();
  });

  it("7390817: renders title", () => {
    render(
      <BrowserRouter>
        <Notifications title={<div>test</div>} />
      </BrowserRouter>,
    );
    expect(screen.getByText("test")).toBeVisible();
  });

  it("7390818: renders footer", () => {
    render(
      <BrowserRouter>
        <Notifications footer={<div>test</div>} />
      </BrowserRouter>,
    );
    expect(screen.getByText("test")).toBeVisible();
  });
});
