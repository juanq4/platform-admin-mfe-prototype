import { MockUser1, MockUser2, MockUser3 } from "../../__mocks__/data/users.mock";
import { getInitials, getLoggedInUserName, searchUserFromList } from "./user.utils";

describe("getLoggedInUserName", () => {
  const email = "mock.user@q4inc.com";

  test("12182054: [Given] user has nickname and last name [Then] expect nickname and lastname to be returned", () => {
    expect(
      getLoggedInUserName({
        email,
        nickname: "Nick",
        given_name: "Nicholas",
        family_name: "Smith",
      }),
    ).toBe("Nick Smith");
  });

  test("12182055: [Given] user has nickname and no last name [Then] expect only nickname to be returned", () => {
    expect(
      getLoggedInUserName({
        email,
        nickname: "Nick",
        given_name: "Nicholas",
        family_name: "",
      }),
    ).toBe("Nick");
  });

  test("12182056: [Given] user has no nickname [And] has first name and last name [Then] expect first name and last name to be returned", () => {
    expect(
      getLoggedInUserName({
        email,
        nickname: "",
        given_name: "Nicholas",
        family_name: "Smith",
      }),
    ).toBe("Nicholas Smith");
  });

  test("12182057: [Given] user has no nickname [And] has first name but no last name [Then] expect first name to be returned", () => {
    expect(
      getLoggedInUserName({
        email,
        nickname: "",
        given_name: "Nicholas",
        family_name: "",
      }),
    ).toBe("Nicholas");
  });

  test("12182058: [Given] user has no names at all [Then] expect no name to be returned", () => {
    expect(
      getLoggedInUserName({
        email,
        nickname: "",
        given_name: "",
        family_name: "",
      }),
    ).toBe("");
  });
});

describe("getInitials", () => {
  test("12182059: [Given] user has name [Then] expect initials", () => {
    expect(getInitials("Nick Smith")).toBe("NS");
  });

  test("12182060: [Given] user has no name [Then] expect no initials", () => {
    expect(getInitials("")).toBe("");
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
