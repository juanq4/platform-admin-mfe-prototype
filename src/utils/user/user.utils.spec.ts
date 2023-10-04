import { MockUser1, MockUser2, MockUser3 } from "../../__mocks__";
import { getLoggedInUserName, searchUserFromList } from "./user.utils";

describe("getLoggedInUserName", () => {
  const email = "mock.user@q4inc.com";

  it("7394985: returns the given name and family name inital when the user has a nick name, which is the local part of the email address, and has family name and given name", () => {
    expect(
      getLoggedInUserName({
        email,
        nickname: "mock.user",
        given_name: "mock",
        family_name: "user",
      }),
    ).toBe("mock u.");
  });

  it("7394986: returns the given name and family name inital when the user has no nick name and has family name and given name", () => {
    expect(
      getLoggedInUserName({
        given_name: "mock",
        family_name: "user",
      }),
    ).toBe("mock u.");
  });

  it("7394987: returns the users email when the user has no nick name, given name or family name", () => {
    expect(getLoggedInUserName({ email })).toBe(email);
  });
});

describe("searchUserFromList()", () => {
  test("8878758: [Given] an invoke with users without search field [Then] it should not throw error", () => {
    const { search: _, ...user1 } = { ...MockUser1 };
    const user2 = { ...MockUser2 };

    expect(() => searchUserFromList([user1, user2], "peter")).not.toThrow();
  });

  test("8878759: [Given] an invoke [Then] it should include users that match searchTerm based search field", () => {
    const users = [{ ...MockUser1 }, { ...MockUser3 }];
    const actual = searchUserFromList(users, "Anthony");
    expect(actual).toHaveLength(1);
    expect(actual[0]).toEqual(users[1]);
  });
});
