import { MediaDeviceSize, mockResizeWindow, NavigationClassName } from "@q4/nimbus-ui";
import { BrowserRouter } from "react-router-dom";
import type { UserContextState } from "../../contexts";
import { UserContext } from "../../contexts";
import { Organization } from "../../definitions";
import { act, render, screen, waitFor } from "../../utils/testUtils";
import { SideNavigation } from "./SideNavigation.component";
import { ViewIdModel } from "./SideNavigation.definition";

describe("SideNavigation", () => {
  const orgs = [
    new Organization({ id: "newId1", name: "New Organization", identifiers: ["NOW.TSX"] }),
    new Organization({ id: "newId2", name: "New Royal Organization", identifiers: ["NRO.TSX"] }),
  ];
  const usrContext: Partial<UserContextState> = {
    linkedOrganizations: orgs,
    managedOrganization: orgs[0],
  };

  test("7391331: [Given] no props are provided [Expect] the component to render", () => {
    const { container } = render(
      <BrowserRouter>
        <SideNavigation
          routes={[]}
          showMobileNavigation={false}
          onToggleMobileNavigation={jest.fn()}
          showManagedOrgSelector={false}
        />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  test("7391332: [Given] the user updates the window width [Expect] the correct body width", () => {
    [MediaDeviceSize.medium.min, MediaDeviceSize.extraLarge.min, MediaDeviceSize.extraSmall.max].forEach((size) => {
      act(() => {
        mockResizeWindow(size);
      });

      expect(window.innerWidth).toBe(size);
    });
  });

  test("7391333: [Given] the user has a viewport <= 768px [Expect] side navigation to be be transitioned by default", () => {
    const { rerender } = render(
      <UserContext.Provider value={usrContext}>
        <BrowserRouter>
          <SideNavigation
            routes={[]}
            showMobileNavigation={false}
            onToggleMobileNavigation={jest.fn()}
            showManagedOrgSelector={false}
          />
        </BrowserRouter>
      </UserContext.Provider>,
    );

    act(() => {
      mockResizeWindow(MediaDeviceSize.extraSmall.max);
    });

    const navbar = screen.getByTestId(ViewIdModel.navigation.id);
    expect(navbar).toBeVisible();

    expect(navbar).toHaveClass(NavigationClassName.BaseWithHiddenModifier);

    rerender(
      <UserContext.Provider value={usrContext}>
        <BrowserRouter>
          <SideNavigation
            routes={[]}
            showMobileNavigation={true}
            onToggleMobileNavigation={jest.fn()}
            showManagedOrgSelector={false}
          />
        </BrowserRouter>
      </UserContext.Provider>,
    );

    expect(navbar).toHaveClass(NavigationClassName.BaseWithVisibleModifier);
  });

  test("7391334: [Given] navigation is collapsed [Expect] the change is handled", async () => {
    const handler = jest.fn();
    render(
      <BrowserRouter>
        <SideNavigation
          routes={[]}
          showMobileNavigation={false}
          onToggleMobileNavigation={jest.fn()}
          onCollapse={handler}
          showManagedOrgSelector={false}
        />
      </BrowserRouter>,
    );
    const navbar = screen.getByTestId(ViewIdModel.navigation.id);
    navbar.classList.add("nui-navigation--collapsed");
    await waitFor(() => expect(handler).toHaveBeenCalled());
  });
});
