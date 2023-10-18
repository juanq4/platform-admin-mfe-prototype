import { Permission } from "@q4/platform-definitions";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Auth0HookMock, MockAuth0Token } from "../../__mocks__/contexts/Auth0Context.mock";
import { UserContextMock } from "../../__mocks__/contexts/UserContext.mock";
import { FeatureFlag } from "../../configurations/feature.configuration";
import { AdminRoutePath } from "../../configurations/navigation.configuration";
import { useSession } from "../../contexts/session/useSession.hook";
import { UserContext } from "../../contexts/user/user.context";
import { useFeatureFlags } from "../../hooks/useFeatureFlags/useFeatureFlags.hook";
import { useIdTokenClaims } from "../../hooks/useIdTokenClaims/useIdTokenClaims.hook";
import { fireEvent, render, screen } from "../../utils/testUtils";
import { AdminContent } from "./AdminContent.component";
import { AdminViewDefault } from "./AdminContent.definition";

jest.mock("../../hooks/useIdTokenClaims/useIdTokenClaims.hook");
const mockUseIdTokenClaims = useIdTokenClaims as jest.Mock;
jest.mock("../../contexts/session/useSession.hook");
const mockUseSession = useSession as jest.Mock;
jest.mock("../../hooks/useFeatureFlags/useFeatureFlags.hook");
const mockUseFeatureFlags = useFeatureFlags as jest.Mock;
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => {
  const orginal = jest.requireActual("react-router-dom");
  return {
    ...orginal,
    useHistory: () => ({
      location: { pathname: "/" },
      push: mockHistoryPush,
    }),
  };
});

Auth0HookMock();

const userContextMock = { ...UserContextMock };

describe("Users View", () => {
  beforeEach(() => {
    mockUseIdTokenClaims.mockReturnValue(MockAuth0Token);
    mockUseSession.mockReturnValue({ permissions: [Permission.ManageOrgs, Permission.ImpersonateClient] });
    mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.AdminClientAccountAccess]: true });
  });

  function customRender(mockUserContext = userContextMock) {
    return render(
      <MemoryRouter initialEntries={[AdminRoutePath.Organizations]}>
        <UserContext.Provider value={mockUserContext}>
          <AdminContent />
          {/* <ClientAccounts /> @jm fixme this is a push route now */}
        </UserContext.Provider>
      </MemoryRouter>,
    );
  }

  test("8683990: [Given] the 'client account access feature' flag is on [And] the user has permission to impersonate clients [Then] the Client Account button is visible", () => {
    customRender();

    expect(screen.getByText(AdminViewDefault.GoToClientAccountLabel)).toBeVisible();
  });

  test("8683991: [Given] the 'client account access' feature flag is off [Then] the Client Account button is not visible", () => {
    mockUseFeatureFlags.mockReturnValue({ [FeatureFlag.AdminClientAccountAccess]: false });
    customRender();

    expect(screen.queryByRole("button", { name: AdminViewDefault.GoToClientAccountLabel })).not.toBeInTheDocument();
  });

  test("8824448: [Given] the user does not have permission to impersonate clients [Then] the Client Account button is not visible", () => {
    mockUseSession.mockReturnValue({ permissions: [Permission.ManageOrgs] });
    customRender();

    expect(screen.queryByRole("button", { name: AdminViewDefault.GoToClientAccountLabel })).not.toBeInTheDocument();
  });

  test("8684271: [Given] Client Account button is clicked [Then] user should see Client Accounts screen", () => {
    customRender(userContextMock);

    const clientSelectorButton = screen.getByText(AdminViewDefault.GoToClientAccountLabel);
    expect(clientSelectorButton).toBeInTheDocument();
    fireEvent.click(clientSelectorButton);

    expect(userContextMock.onSetAdminClientSelector).toBeCalledWith(true);
  });
});
