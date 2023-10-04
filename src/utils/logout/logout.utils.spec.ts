import { useAuth0 } from "@auth0/auth0-react";
import { isUserLoggedOutKey } from "../../trunk/AuthWrapper/AuthWrapper.definition";
import { logoutAndUpdateLocalStorage } from "./logout.utils";

jest.mock("@auth0/auth0-react");
const mockedUseAuth0 = useAuth0 as jest.Mock;

const logout = jest.fn();

describe("logoutAndUpdateLocalStorage", () => {
  it("7393073: sets local storage isUserLoggedOut key to true calls auth0 logout function", () => {
    mockedUseAuth0.mockReturnValue({ logout });

    logoutAndUpdateLocalStorage(logout);

    expect(localStorage.getItem(isUserLoggedOutKey)).toEqual("true");
    expect(logout).toBeCalled;
  });
});
